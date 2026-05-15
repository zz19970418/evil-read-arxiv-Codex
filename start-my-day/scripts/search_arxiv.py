#!/usr/bin/env python3
"""
arXiv + Semantic Scholar 娣峰悎鏋舵瀯璁烘枃鎼滅储鑴氭湰
鐢ㄤ簬 start-my-day skill锛屾悳绱㈡渶杩戜竴涓湀鍜屾渶杩戜竴骞寸殑鏋佺伀銆佹瀬鐑棬銆佹瀬浼樿川璁烘枃
"""

import xml.etree.ElementTree as ET
import json
import re
import os
import sys
import time
import logging
import hashlib
from datetime import datetime, timedelta
from typing import List, Dict, Set, Optional, Tuple
from pathlib import Path
import urllib.request
import urllib.parse

logger = logging.getLogger(__name__)

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


def title_to_note_filename(title: str) -> str:
    """灏嗚鏂囨爣棰樿浆鎹负 Obsidian 绗旇鏂囦欢鍚嶏紙涓?generate_note.py 淇濇寔涓€鑷达級銆?

    浣跨敤涓?paper-analyze/scripts/generate_note.py 瀹屽叏鐩稿悓鐨勮鍒欙紝
    纭繚 start-my-day 鐢熸垚鐨?wikilink 璺緞鑳芥纭寚鍚?paper-analyze 鍒涘缓鐨勬枃浠躲€?
    """
    filename = re.sub(r'[ /\\:*?"<>|]+', '_', title).strip('_')
    return filename

try:
    import requests
    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False
    logger.warning("requests library not found, using urllib for Semantic Scholar API")


RATE_LIMIT_HIT = False


def _cache_path(cache_dir: Optional[Path], key: str, suffix: str) -> Optional[Path]:
    if not cache_dir:
        return None
    digest = hashlib.sha256(key.encode("utf-8")).hexdigest()[:24]
    return cache_dir / f"{digest}.{suffix}"


def _read_cache(path: Optional[Path], ttl_seconds: int) -> Optional[str]:
    if not path or not path.exists():
        return None
    if ttl_seconds > 0 and time.time() - path.stat().st_mtime > ttl_seconds:
        return None
    return path.read_text(encoding="utf-8")


def _write_cache(path: Optional[Path], content: str) -> None:
    if not path:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def _cooldown_path(cache_dir: Optional[Path], service: str, key: str) -> Optional[Path]:
    if not cache_dir:
        return None
    digest = hashlib.sha256(key.encode("utf-8")).hexdigest()[:16]
    return cache_dir / "cooldowns" / f"{service}-{digest}.json"


def _cooldown_remaining(cache_dir: Optional[Path], service: str, key: str) -> int:
    path = _cooldown_path(cache_dir, service, key)
    if not path or not path.exists():
        return 0
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        until = float(data.get("until", 0))
    except Exception:
        return 0
    return max(0, int(until - time.time()))


def _set_cooldown(cache_dir: Optional[Path], service: str, key: str, seconds: int) -> None:
    path = _cooldown_path(cache_dir, service, key)
    if not path:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "service": service,
        "key": key,
        "until": time.time() + max(1, seconds),
        "seconds": max(1, seconds),
        "created_at": datetime.now().isoformat(timespec="seconds"),
    }
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


def _collect_priority_keywords(config: Dict, per_domain: int = 2, max_keywords: int = 12) -> List[str]:
    domains = config.get("research_domains", {}) if config else {}
    ranked = sorted(
        domains.items(),
        key=lambda item: item[1].get("priority", 0),
        reverse=True,
    )
    keywords: List[str] = []
    seen = set()
    for _domain_name, domain_config in ranked:
        for kw in domain_config.get("keywords", [])[:per_domain]:
            normalized = kw.strip()
            if not normalized:
                continue
            key = normalized.lower()
            if key in seen:
                continue
            seen.add(key)
            keywords.append(normalized)
            if len(keywords) >= max_keywords:
                return keywords
    return keywords


def _retry_after_seconds(error: Exception, default: int) -> int:
    if HAS_REQUESTS and hasattr(error, "response") and error.response is not None:
        retry_after = error.response.headers.get("Retry-After")
        if retry_after:
            try:
                return max(default, int(retry_after))
            except ValueError:
                return default
    return default


def _fetch_text(
    url: str,
    timeout: int = 60,
    headers: Optional[Dict[str, str]] = None,
    cache_dir: Optional[Path] = None,
    cache_ttl_seconds: int = 0,
    cache_suffix: str = "txt",
) -> str:
    """Fetch a URL as UTF-8 text, preferring requests for more reliable CA handling on Windows."""
    headers = headers or {"User-Agent": "StartMyDay-PaperFetcher/1.0"}
    cache_file = _cache_path(cache_dir, url, cache_suffix)
    cached = _read_cache(cache_file, cache_ttl_seconds)
    if cached is not None:
        logger.info("[cache] Using cached response for %s", url[:90])
        return cached

    if HAS_REQUESTS:
        response = requests.get(url, headers=headers, timeout=timeout)
        response.raise_for_status()
        response.encoding = response.encoding or "utf-8"
        _write_cache(cache_file, response.text)
        return response.text

    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=timeout) as response:
        text = response.read().decode("utf-8")
        _write_cache(cache_file, text)
        return text


def _is_rate_limit_error(error: Exception) -> bool:
    if HAS_REQUESTS and hasattr(error, "response") and error.response is not None:
        return error.response.status_code == 429
    error_msg = str(error)
    return "429" in error_msg or "Too Many Requests" in error_msg


def _write_output(output: Dict, output_path: str) -> None:
    json_str = json.dumps(output, ensure_ascii=False, indent=2, default=str)
    if output_path == '-' or output_path == '/dev/stdout':
        sys.stdout.write(json_str)
        sys.stdout.write('\n')
        return

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(json_str)
    logger.info("Results saved to: %s", output_path)
    try:
        sys.stdout.write(json_str)
        sys.stdout.write('\n')
    except UnicodeEncodeError:
        sys.stdout.buffer.write(json_str.encode("utf-8", errors="replace"))
        sys.stdout.buffer.write(b"\n")

# ---------------------------------------------------------------------------
# API 閰嶇疆
# ---------------------------------------------------------------------------
ARXIV_NS = {
    'atom': 'http://www.w3.org/2005/Atom',
    'arxiv': 'http://arxiv.org/schemas/atom'
}

SEMANTIC_SCHOLAR_API_URL = "https://api.semanticscholar.org/graph/v1/paper/search"
SEMANTIC_SCHOLAR_FIELDS = "title,abstract,publicationDate,citationCount,influentialCitationCount,url,authors,authors.affiliations,externalIds"
EUROPE_PMC_API_URL = "https://www.ebi.ac.uk/europepmc/webservices/rest/search"
PUBMED_ESEARCH_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
PUBMED_ESUMMARY_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
CROSSREF_WORKS_URL = "https://api.crossref.org/works"
UNPAYWALL_API_URL = "https://api.unpaywall.org/v2"

# 榛樿鍒嗙被鍏抽敭璇嶆槧灏勶紙褰撻厤缃腑鏃犵敤鎴疯嚜瀹氫箟鍏抽敭璇嶆椂浣跨敤锛?
ARXIV_CATEGORY_KEYWORDS = {
    "cs.AI": "artificial intelligence",
    "cs.LG": "machine learning",
    "cs.CL": "computational linguistics natural language processing",
    "cs.CV": "computer vision",
    "cs.MM": "multimedia",
    "cs.MA": "multi-agent systems",
    "cs.RO": "robotics"
}

# ---------------------------------------------------------------------------
# 璇勫垎甯搁噺  鈥斺€?淇敼鏉冮噸鏃跺彧闇€缂栬緫杩欓噷
# ---------------------------------------------------------------------------

# 鍚勭淮搴﹀師濮嬭瘎鍒嗙殑婊″垎鍊硷紙褰掍竴鍖栧熀鍑嗭級
SCORE_MAX = 3.0

# 鐩稿叧鎬ц瘎鍒嗭細鍏抽敭璇嶅湪鏍囬 / 鎽樿涓尮閰嶇殑鍔犲垎
RELEVANCE_TITLE_KEYWORD_BOOST = 0.5
RELEVANCE_SUMMARY_KEYWORD_BOOST = 0.3
RELEVANCE_CATEGORY_MATCH_BOOST = 1.0

# 鏂拌繎鎬ч槇鍊硷紙澶╋級 -> 瀵瑰簲璇勫垎
RECENCY_THRESHOLDS = [
    (30, 3.0),
    (90, 2.0),
    (180, 1.0),
]
RECENCY_DEFAULT = 0.0

# 鐑棬搴︼細楂樺奖鍝嶅姏寮曠敤鏁板綊涓€鍖栧埌 0-SCORE_MAX
# 鍚箟锛氳揪鍒版寮曠敤鏁版椂瑙嗕负婊″垎
POPULARITY_INFLUENTIAL_CITATION_FULL_SCORE = 100

# 缁煎悎鎺ㄨ崘璇勫垎鏉冮噸锛堟櫘閫氳鏂囷級
WEIGHTS_NORMAL = {
    'relevance': 0.40,
    'recency': 0.20,
    'popularity': 0.30,
    'quality': 0.10,
}
# 缁煎悎鎺ㄨ崘璇勫垎鏉冮噸锛堥珮褰卞搷鍔涜鏂囷細鎻愰珮鐑棬搴︼紝闄嶄綆鏂拌繎鎬э級
WEIGHTS_HOT = {
    'relevance': 0.35,
    'recency': 0.10,
    'popularity': 0.45,
    'quality': 0.10,
}

# Semantic Scholar 閫熺巼闄愬埗绛夊緟鏃堕棿锛堢锛?
S2_RATE_LIMIT_WAIT = 60
S2_CATEGORY_REQUEST_INTERVAL = 12
ARXIV_RATE_LIMIT_WAIT = 30

# Semantic Scholar API Key锛堝彲閫夛紝浠庨厤缃枃浠惰鍙栵級
S2_API_KEY = None


def load_research_config(config_path: str) -> Dict:
    """
    浠?YAML 鏂囦欢鍔犺浇鐮旂┒鍏磋叮閰嶇疆
    
    Args:
        config_path: 閰嶇疆鏂囦欢璺緞
        
    Returns:
        鐮旂┒閰嶇疆瀛楀吀
    """
    import yaml
    
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            config = yaml.safe_load(f)
        # 璇诲彇 Semantic Scholar API Key锛堝鏋滈厤缃簡锛?
        global S2_API_KEY
        S2_API_KEY = config.get('semantic_scholar_api_key')
        return config
    except Exception as e:
        logger.error("Error loading config: %s", e)
        # 杩斿洖榛樿閰嶇疆
        return {
            "research_domains": {
                "large-language-models": {
                    "keywords": [
                        "pre-training", "foundation model", "model architecture",
                        "large language model", "LLM", "transformer"
                    ],
                    "arxiv_categories": ["cs.AI", "cs.LG", "cs.CL"],
                    "priority": 5
                }
            },
            "excluded_keywords": ["3D", "review", "workshop", "survey"]
        }


def calculate_date_windows(target_date: Optional[datetime] = None, days: int = 30) -> Tuple[datetime, datetime, datetime, datetime]:
    """
    璁＄畻涓や釜鏃堕棿绐楀彛锛氭渶杩慛澶╁拰杩囧幓涓€骞达紙闄ゅ幓鏈€杩慛澶╋級

    Args:
        target_date: 鍩哄噯鏃ユ湡锛屽鏋滀负 None 鍒欎娇鐢ㄥ綋鍓嶆棩鏈?
        days: 鏈€杩戞悳绱㈢獥鍙ｇ殑澶╂暟锛堥粯璁?0锛?

    Returns:
        (window_recent_start, window_recent_end, window_1y_start, window_1y_end)
    """
    if target_date is None:
        target_date = datetime.now()

    window_recent_start = target_date - timedelta(days=days)
    window_recent_end = target_date

    window_1y_start = target_date - timedelta(days=365)
    window_1y_end = target_date - timedelta(days=days + 1)

    return window_recent_start, window_recent_end, window_1y_start, window_1y_end


def search_arxiv_by_date_range(
    categories: List[str],
    start_date: datetime,
    end_date: datetime,
    max_results: int = 200,
    max_retries: int = 3,
    cache_dir: Optional[Path] = None,
    cache_ttl_seconds: int = 0
) -> List[Dict]:
    global RATE_LIMIT_HIT
    """
    浣跨敤 arXiv API 鎼滅储鎸囧畾鏃ユ湡鑼冨洿鍐呯殑璁烘枃
    
    Args:
        categories: arXiv 鍒嗙被鍒楄〃
        start_date: 寮€濮嬫棩鏈?
        end_date: 缁撴潫鏃ユ湡
        max_results: 鏈€澶х粨鏋滄暟
        max_retries: 鏈€澶ч噸璇曟鏁?
        
    Returns:
        璁烘枃鍒楄〃
    """
    # 鏋勫缓鍒嗙被鏌ヨ
    category_query = "+OR+".join([f"cat:{cat}" for cat in categories])
    
    # 鏋勫缓鏃ユ湡鑼冨洿鏌ヨ (arXiv 浣跨敤 YYYYMMDD 鏍煎紡)
    date_query = f"submittedDate:[{start_date.strftime('%Y%m%d')}0000+TO+{end_date.strftime('%Y%m%d')}2359]"
    
    # 缁勫悎鏌ヨ
    full_query = f"({category_query})+AND+{date_query}"
    
    # 鏋勫缓 URL
    url = (
        f"https://export.arxiv.org/api/query?"
        f"search_query={full_query}&"
        f"max_results={max_results}&"
        f"sortBy=submittedDate&"
        f"sortOrder=descending"
    )
    
    logger.info("[arXiv] Searching papers from %s to %s", start_date.date(), end_date.date())
    logger.debug("[arXiv] URL: %s...", url[:120])

    cooldown = _cooldown_remaining(cache_dir, "arxiv", full_query)
    if cooldown > 0:
        RATE_LIMIT_HIT = True
        logger.warning("[arXiv] Cooldown active for %ds; skipping broad category query", cooldown)
        return []
    
    for attempt in range(max_retries):
        try:
            xml_content = _fetch_text(
                url,
                timeout=60,
                cache_dir=cache_dir,
                cache_ttl_seconds=cache_ttl_seconds,
                cache_suffix="xml",
            )
            papers = parse_arxiv_xml(xml_content)
            logger.info("[arXiv] Found %d papers", len(papers))
            return papers
        except Exception as e:
            if _is_rate_limit_error(e):
                RATE_LIMIT_HIT = True
                _set_cooldown(cache_dir, "arxiv", full_query, _retry_after_seconds(e, ARXIV_RATE_LIMIT_WAIT * 4))
            logger.warning("[arXiv] Error (attempt %d/%d): %s", attempt + 1, max_retries, e)
            if attempt < max_retries - 1:
                wait_time = _retry_after_seconds(e, ARXIV_RATE_LIMIT_WAIT) if _is_rate_limit_error(e) else (2 ** attempt) * 2
                logger.info("[arXiv] Retrying in %d seconds...", wait_time)
                time.sleep(wait_time)
            else:
                logger.error("[arXiv] Failed after %d attempts", max_retries)
                return []
    
    return []


def search_arxiv_by_keywords(
    keywords: List[str],
    start_date: datetime,
    end_date: datetime,
    max_results: int = 100,
    max_retries: int = 3,
    cache_dir: Optional[Path] = None,
    cache_ttl_seconds: int = 0
) -> List[Dict]:
    global RATE_LIMIT_HIT
    """
    浣跨敤鍏抽敭璇嶇洿鎺ユ悳绱?arXiv 璁烘枃锛堜笉闄愬垎绫伙級

    Args:
        keywords: 鎼滅储鍏抽敭璇嶅垪琛?
        start_date: 寮€濮嬫棩鏈?
        end_date: 缁撴潫鏃ユ湡
        max_results: 鏈€澶х粨鏋滄暟
        max_retries: 鏈€澶ч噸璇曟鏁?

    Returns:
        璁烘枃鍒楄〃
    """
    # 鏋勫缓鍏抽敭璇嶆煡璇?(鍦?title 鍜?abstract 涓悳绱?
    keyword_parts = []
    for kw in keywords:
        kw = kw.strip()
        if not kw:
            continue
        # 濡傛灉鍏抽敭璇嶅寘鍚┖鏍硷紝鐢ㄥ紩鍙峰寘瑁硅繘琛岀簿纭尮閰?
        if ' ' in kw:
            keyword_parts.append(f'ti:"{kw}"+OR+abs:"{kw}"')
        else:
            keyword_parts.append(f"ti:{kw}+OR+abs:{kw}")

    if not keyword_parts:
        return []

    keyword_query = "+OR+".join([f"({p})" for p in keyword_parts])

    # 鏋勫缓鏃ユ湡鑼冨洿鏌ヨ
    date_query = f"submittedDate:[{start_date.strftime('%Y%m%d')}0000+TO+{end_date.strftime('%Y%m%d')}2359]"

    full_query = f"({keyword_query})+AND+{date_query}"

    url = (
        f"https://export.arxiv.org/api/query?"
        f"search_query={urllib.parse.quote(full_query, safe='+:')}&"
        f"max_results={max_results}&"
        f"sortBy=relevance&"
        f"sortOrder=descending"
    )

    logger.info("[arXiv] Keyword search: %s", keywords)
    logger.debug("[arXiv] URL: %s...", url[:150])

    cooldown = _cooldown_remaining(cache_dir, "arxiv", full_query)
    if cooldown > 0:
        RATE_LIMIT_HIT = True
        logger.warning("[arXiv] Cooldown active for %ds; skipping keyword query", cooldown)
        return []

    for attempt in range(max_retries):
        try:
            xml_content = _fetch_text(
                url,
                timeout=60,
                cache_dir=cache_dir,
                cache_ttl_seconds=cache_ttl_seconds,
                cache_suffix="xml",
            )
            papers = parse_arxiv_xml(xml_content)
            logger.info("[arXiv] Keyword search found %d papers", len(papers))
            return papers
        except Exception as e:
            if _is_rate_limit_error(e):
                RATE_LIMIT_HIT = True
                _set_cooldown(cache_dir, "arxiv", full_query, _retry_after_seconds(e, ARXIV_RATE_LIMIT_WAIT * 4))
            logger.warning("[arXiv] Keyword search error (attempt %d/%d): %s", attempt + 1, max_retries, e)
            if attempt < max_retries - 1:
                wait_time = _retry_after_seconds(e, ARXIV_RATE_LIMIT_WAIT) if _is_rate_limit_error(e) else (2 ** attempt) * 2
                logger.info("[arXiv] Retrying in %d seconds...", wait_time)
                time.sleep(wait_time)
            else:
                logger.error("[arXiv] Keyword search failed after %d attempts", max_retries)
                return []

    return []


def search_semantic_scholar_hot_papers(
    query: str,
    start_date: datetime,
    end_date: datetime,
    top_k: int = 20,
    request_limit: int = 25,
    max_retries: int = 2,
    cache_dir: Optional[Path] = None,
    cache_ttl_seconds: int = 0
) -> List[Dict]:
    global RATE_LIMIT_HIT
    """
    浣跨敤 Semantic Scholar API 鎼滅储鎸囧畾鏃堕棿鑼冨洿鍐呯殑楂樺奖鍝嶅姏璁烘枃

    Args:
        query: 鎼滅储鍏抽敭璇?
        start_date: 寮€濮嬫棩鏈?
        end_date: 缁撴潫鏃ユ湡
        top_k: 杩斿洖鍓?K 绡囬珮褰卞搷鍔涜鏂?
        max_retries: 鏈€澶ч噸璇曟鏁?
        
    Returns:
        鎸夐珮褰卞搷鍔涘紩鐢ㄦ暟鎺掑簭鐨勮鏂囧垪琛?
    """
    # 鏋勫缓鏃ユ湡鑼冨洿 (Semantic Scholar 浣跨敤 YYYY-MM-DD:YYYY-MM-DD 鏍煎紡)
    date_range = f"{start_date.strftime('%Y-%m-%d')}:{end_date.strftime('%Y-%m-%d')}"
    
    # 鏋勫缓璇锋眰鍙傛暟
    params = {
        "query": query,
        "publicationDateOrYear": date_range,
        "limit": max(top_k, min(request_limit, 100)),
        "fields": SEMANTIC_SCHOLAR_FIELDS
    }
    
    headers = {
        "User-Agent": "StartMyDay-PaperFetcher/1.0"
    }
    if S2_API_KEY:
        headers["x-api-key"] = S2_API_KEY
    
    logger.info("[S2] Searching hot papers from %s to %s", start_date.date(), end_date.date())
    logger.info("[S2] Query: '%s'", query)
    query_string = urllib.parse.urlencode(params)
    cache_key = f"{SEMANTIC_SCHOLAR_API_URL}?{query_string}"
    cooldown = _cooldown_remaining(cache_dir, "s2", query)
    if cooldown > 0:
        RATE_LIMIT_HIT = True
        logger.warning("[S2] Cooldown active for '%s' (%ds); skipping", query, cooldown)
        return []
    
    for attempt in range(max_retries):
        try:
            cache_file = _cache_path(cache_dir, cache_key, "json")
            cached = _read_cache(cache_file, cache_ttl_seconds)
            if cached is not None:
                logger.info("[cache] Using cached Semantic Scholar response for '%s'", query)
                data = json.loads(cached)
            elif HAS_REQUESTS:
                response = requests.get(
                    SEMANTIC_SCHOLAR_API_URL,
                    params=params,
                    headers=headers,
                    timeout=15
                )
                response.raise_for_status()
                data = response.json()
                _write_cache(cache_file, json.dumps(data, ensure_ascii=False))
            else:
                # 浣跨敤 urllib
                query_string = urllib.parse.urlencode(params)
                url = f"{SEMANTIC_SCHOLAR_API_URL}?{query_string}"
                req = urllib.request.Request(url, headers=headers)
                with urllib.request.urlopen(req, timeout=15) as response:
                    data = json.loads(response.read().decode('utf-8'))
                _write_cache(cache_file, json.dumps(data, ensure_ascii=False))
            
            papers = data.get("data", [])
            if not papers:
                logger.info("[S2] No papers found")
                return []
            
            # 鏈湴浜屾杩囨护涓庢帓搴?
            valid_papers = []
            for p in papers:
                # 杩囨护鎺夋病鏈夋爣棰樻垨鎽樿鐨勬棤鏁堟潯鐩?
                if not p.get("title") or not p.get("abstract"):
                    continue
                
                # 澶勭悊鍙兘鐨?None 鍊?
                inf_cit = p.get("influentialCitationCount") or 0
                cit = p.get("citationCount") or 0
                
                p["influentialCitationCount"] = inf_cit
                p["citationCount"] = cit
                
                # 鏍囪鏉ユ簮
                p["source"] = "semantic_scholar"
                p["hot_score"] = inf_cit  # 浣跨敤楂樺奖鍝嶅姏寮曠敤鏁颁綔涓虹儹搴﹀垎鏁?

                # 鎻愬彇 affiliation 淇℃伅
                if p.get('authors') and not p.get('affiliations'):
                    affiliations = []
                    for a in p['authors']:
                        for affil in (a.get('affiliations') or []):
                            name = affil.get('name', '') if isinstance(affil, dict) else str(affil)
                            if name and name not in affiliations:
                                affiliations.append(name)
                    p['affiliations'] = affiliations
                
                valid_papers.append(p)
            
            # 鎸夐珮褰卞搷鍔涘紩鐢ㄦ暟鍊掑簭鎺掑垪
            sorted_papers = sorted(
                valid_papers,
                key=lambda x: x["influentialCitationCount"],
                reverse=True
            )
            
            logger.info("[S2] Found %d valid papers, returning top %d", len(sorted_papers), top_k)
            return sorted_papers[:top_k]
            
        except Exception as e:
            error_msg = str(e)
            logger.warning("[S2] Error (attempt %d/%d): %s", attempt + 1, max_retries, e)
            
            # 妫€鏌ユ槸鍚︽槸 429 閿欒锛圱oo Many Requests锛?
            is_rate_limit = False
            if HAS_REQUESTS and hasattr(e, 'response') and e.response is not None:
                is_rate_limit = e.response.status_code == 429
            else:
                is_rate_limit = "429" in error_msg or "Too Many Requests" in error_msg
            
            if is_rate_limit:
                RATE_LIMIT_HIT = True
                _set_cooldown(cache_dir, "s2", query, _retry_after_seconds(e, S2_RATE_LIMIT_WAIT * 5))

            if attempt < max_retries - 1:
                # 瀵逛簬 429 閿欒锛屼娇鐢ㄦ洿闀跨殑绛夊緟鏃堕棿
                if is_rate_limit:
                    wait_time = _retry_after_seconds(e, S2_RATE_LIMIT_WAIT)
                    logger.warning("[S2] Rate limit hit. Waiting %d seconds...", wait_time)
                else:
                    wait_time = (2 ** attempt) * 2
                    logger.info("[S2] Retrying in %d seconds...", wait_time)
                time.sleep(wait_time)
            else:
                logger.error("[S2] Failed after %d attempts", max_retries)
                return []
    
    return []


def search_hot_papers_from_categories(
    categories: List[str],
    start_date: datetime,
    end_date: datetime,
    top_k_per_category: int = 5,
    request_limit: int = 25,
    max_queries: int = 3,
    config: Optional[Dict] = None,
    cache_dir: Optional[Path] = None,
    cache_ttl_seconds: int = 0
) -> List[Dict]:
    """
    涓哄涓?arXiv 鍒嗙被鎼滅储楂樺奖鍝嶅姏璁烘枃

    Args:
        categories: arXiv 鍒嗙被鍒楄〃
        start_date: 寮€濮嬫棩鏈?
        end_date: 缁撴潫鏃ユ湡
        top_k_per_category: 姣忎釜鍒嗙被杩斿洖鐨勮鏂囨暟
        config: 鐮旂┒閰嶇疆锛堢敤浜庢彁鍙栫敤鎴疯嚜瀹氫箟鍏抽敭璇嶏級

    Returns:
        鍚堝苟鍚庣殑楂樺奖鍝嶅姏璁烘枃鍒楄〃
    """
    all_hot_papers = []
    seen_arxiv_ids = set()

    # 浠庨厤缃腑鎻愬彇鐢ㄦ埛鑷畾涔夌殑鎼滅储鍏抽敭璇嶏紙鏇寸簿鍑嗭級
    user_queries = []
    if config:
        domains = config.get('research_domains', {})
        for domain_name, domain_config in domains.items():
            keywords = domain_config.get('keywords', [])
            # 鍙栨瘡涓煙鐨勫墠3涓叧閿瘝缁勫悎涓烘煡璇?
            if keywords:
                query = ' '.join(keywords[:3])
                user_queries.append(query)

    # 濡傛灉娌℃湁鐢ㄦ埛鍏抽敭璇嶏紝鍥為€€鍒板垎绫诲叧閿瘝
    if not user_queries:
        user_queries = [ARXIV_CATEGORY_KEYWORDS.get(cat, cat) for cat in categories]

    # 鍘婚噸鏌ヨ
    seen_queries = set()
    unique_queries = []
    for q in user_queries:
        q_lower = q.lower()
        if q_lower not in seen_queries:
            seen_queries.add(q_lower)
            unique_queries.append(q)

    for query_index, query in enumerate(unique_queries[:max_queries], start=1):

        try:
            papers = search_semantic_scholar_hot_papers(
                query=query,
                start_date=start_date,
                end_date=end_date,
                top_k=top_k_per_category,
                request_limit=request_limit,
                cache_dir=cache_dir,
                cache_ttl_seconds=cache_ttl_seconds,
            )
        except Exception as e:
            logger.warning("[S2] Query '%s' failed: %s 鈥?skipping", query, e)
            papers = []

        # 鍘婚噸锛堝熀浜?arXiv ID锛?
        for p in papers:
            # 瀹夊叏鍦颁粠 externalIds 瀛楀吀涓彁鍙?ArXiv 缂栧彿
            arxiv_id = p.get("externalIds", {}).get("ArXiv") if p.get("externalIds") else None
            
            # 缁熶竴鍐欏叆 arxiv_id 瀛楁锛屾柟渚挎渶鍚?Step 3 鐨勫叏灞€鍘婚噸
            p["arxiv_id"] = arxiv_id
            
            if arxiv_id and arxiv_id not in seen_arxiv_ids:
                seen_arxiv_ids.add(arxiv_id)
                all_hot_papers.append(p)
            elif not arxiv_id:
                # 娌℃湁 arXiv ID 鐨勪篃淇濈暀锛堝彲鑳芥槸鍏朵粬鏉ユ簮鐨勮鏂囷級
                all_hot_papers.append(p)
        
        if query_index < min(len(unique_queries), max_queries):
            time.sleep(S2_CATEGORY_REQUEST_INTERVAL)
    
    # 鏈€缁堟寜褰卞搷鍔涘紩鐢ㄦ暟鎺掑簭
    all_hot_papers.sort(key=lambda x: x.get("influentialCitationCount", 0), reverse=True)
    
    return all_hot_papers


def _fallback_query(config: Dict, focus_keywords: List[str] = None) -> str:
    keywords = focus_keywords or _collect_priority_keywords(config, per_domain=2, max_keywords=10)
    return " OR ".join(f'"{kw}"' if " " in kw else kw for kw in keywords)


def _parse_date(value: str) -> Optional[datetime]:
    if not value:
        return None
    clean = value.strip()
    for fmt in ("%Y-%m-%d", "%Y-%m", "%Y", "%Y %b", "%Y %B", "%b %Y", "%B %Y"):
        try:
            return datetime.strptime(clean[:10], fmt)
        except ValueError:
            continue
    year_match = re.search(r"\b(20\d{2}|19\d{2})\b", clean)
    if year_match:
        return datetime(int(year_match.group(1)), 1, 1)
    return None


def search_europe_pmc_papers(
    config: Dict,
    start_date: datetime,
    end_date: datetime,
    top_k: int = 20,
    focus_keywords: List[str] = None,
    cache_dir: Optional[Path] = None,
    cache_ttl_seconds: int = 0,
) -> List[Dict]:
    query = _fallback_query(config, focus_keywords)
    date_query = f'FIRST_PDATE:[{start_date.strftime("%Y-%m-%d")} TO {end_date.strftime("%Y-%m-%d")}]'
    full_query = f"({query}) AND {date_query}"
    params = {
        "query": full_query,
        "format": "json",
        "pageSize": str(min(top_k, 100)),
        "sort": "P_PDATE_D",
    }
    url = f"{EUROPE_PMC_API_URL}?{urllib.parse.urlencode(params)}"
    logger.info("[Europe PMC] Query: %s", full_query)
    try:
        data = json.loads(_fetch_text(url, timeout=30, cache_dir=cache_dir, cache_ttl_seconds=cache_ttl_seconds, cache_suffix="json"))
    except Exception as e:
        logger.warning("[Europe PMC] Search failed: %s", e)
        return []

    papers = []
    for item in data.get("resultList", {}).get("result", []):
        title = item.get("title") or ""
        abstract = item.get("abstractText") or ""
        if not title or not abstract:
            continue
        doi = item.get("doi") or ""
        pmid = item.get("pmid") or ""
        pmcid = item.get("pmcid") or ""
        url = item.get("fullTextUrlList", {}).get("fullTextUrl", [{}])[0].get("url") if item.get("fullTextUrlList") else ""
        if not url:
            url = f"https://europepmc.org/article/MED/{pmid}" if pmid else f"https://doi.org/{doi}" if doi else ""
        pub_date = item.get("firstPublicationDate") or item.get("pubYear") or ""
        authors = [a.strip() for a in (item.get("authorString") or "").split(",") if a.strip()]
        paper = {
            "title": title,
            "abstract": re.sub(r"<[^>]+>", " ", abstract),
            "summary": re.sub(r"<[^>]+>", " ", abstract),
            "publicationDate": pub_date,
            "published_date": _parse_date(pub_date),
            "authors": authors,
            "url": url,
            "source": "europe_pmc",
            "externalIds": {"DOI": doi, "PubMed": pmid, "PubMedCentral": pmcid},
            "citationCount": int(item.get("citedByCount") or 0),
            "influentialCitationCount": 0,
            "openAccessPdf": {"url": f"https://pmc.ncbi.nlm.nih.gov/articles/{pmcid}/pdf/" if pmcid else ""},
        }
        papers.append(paper)
    logger.info("[Europe PMC] Found %d usable papers", len(papers))
    return papers


def search_pubmed_papers(
    config: Dict,
    start_date: datetime,
    end_date: datetime,
    top_k: int = 20,
    focus_keywords: List[str] = None,
    cache_dir: Optional[Path] = None,
    cache_ttl_seconds: int = 0,
) -> List[Dict]:
    query = _fallback_query(config, focus_keywords)
    params = {
        "db": "pubmed",
        "term": f"({query}) AND ({start_date.strftime('%Y/%m/%d')}:{end_date.strftime('%Y/%m/%d')}[Date - Publication])",
        "retmode": "json",
        "retmax": str(min(top_k, 100)),
        "sort": "pub date",
    }
    url = f"{PUBMED_ESEARCH_URL}?{urllib.parse.urlencode(params)}"
    logger.info("[PubMed] Query: %s", params["term"])
    try:
        data = json.loads(_fetch_text(url, timeout=30, cache_dir=cache_dir, cache_ttl_seconds=cache_ttl_seconds, cache_suffix="json"))
    except Exception as e:
        logger.warning("[PubMed] ESearch failed: %s", e)
        return []

    ids = data.get("esearchresult", {}).get("idlist", [])
    if not ids:
        return []
    params = {
        "db": "pubmed",
        "id": ",".join(ids),
        "retmode": "json",
    }
    url = f"{PUBMED_ESUMMARY_URL}?{urllib.parse.urlencode(params)}"
    try:
        summary = json.loads(_fetch_text(url, timeout=30, cache_dir=cache_dir, cache_ttl_seconds=cache_ttl_seconds, cache_suffix="json"))
    except Exception as e:
        logger.warning("[PubMed] ESummary failed: %s", e)
        return []

    papers = []
    result = summary.get("result", {})
    for pmid in ids:
        item = result.get(pmid, {})
        title = item.get("title") or ""
        if not title:
            continue
        pub_date = item.get("pubdate") or ""
        authors = [a.get("name") for a in item.get("authors", []) if a.get("name")]
        doi = ""
        for article_id in item.get("articleids", []):
            if article_id.get("idtype") == "doi":
                doi = article_id.get("value") or ""
        papers.append({
            "title": title,
            "abstract": title,
            "summary": title,
            "publicationDate": pub_date,
            "published_date": _parse_date(pub_date),
            "authors": authors,
            "url": f"https://pubmed.ncbi.nlm.nih.gov/{pmid}/",
            "source": "pubmed",
            "externalIds": {"DOI": doi, "PubMed": pmid},
            "citationCount": 0,
            "influentialCitationCount": 0,
            "openAccessPdf": {"url": ""},
        })
    logger.info("[PubMed] Found %d usable papers", len(papers))
    return papers


def search_crossref_papers(
    config: Dict,
    start_date: datetime,
    end_date: datetime,
    top_k: int = 15,
    focus_keywords: List[str] = None,
    cache_dir: Optional[Path] = None,
    cache_ttl_seconds: int = 0,
) -> List[Dict]:
    query = " ".join(focus_keywords or _collect_priority_keywords(config, per_domain=1, max_keywords=8))
    params = {
        "query.bibliographic": query,
        "filter": f"from-pub-date:{start_date.strftime('%Y-%m-%d')},until-pub-date:{end_date.strftime('%Y-%m-%d')}",
        "rows": str(min(top_k, 50)),
        "sort": "published",
        "order": "desc",
    }
    url = f"{CROSSREF_WORKS_URL}?{urllib.parse.urlencode(params)}"
    logger.info("[Crossref] Query: %s", query)
    try:
        data = json.loads(_fetch_text(url, timeout=30, cache_dir=cache_dir, cache_ttl_seconds=cache_ttl_seconds, cache_suffix="json"))
    except Exception as e:
        logger.warning("[Crossref] Search failed: %s", e)
        return []

    papers = []
    for item in data.get("message", {}).get("items", []):
        title = (item.get("title") or [""])[0]
        abstract = re.sub(r"<[^>]+>", " ", item.get("abstract") or "")
        if not title:
            continue
        date_parts = item.get("published-print", item.get("published-online", item.get("published", {}))).get("date-parts", [[]])[0]
        pub_date = "-".join(f"{int(x):02d}" for x in date_parts) if date_parts else ""
        authors = []
        for author in item.get("author", []):
            name = " ".join(part for part in [author.get("given"), author.get("family")] if part)
            if name:
                authors.append(name)
        doi = item.get("DOI") or ""
        papers.append({
            "title": title,
            "abstract": abstract or title,
            "summary": abstract or title,
            "publicationDate": pub_date,
            "published_date": _parse_date(pub_date),
            "authors": authors,
            "url": item.get("URL") or (f"https://doi.org/{doi}" if doi else ""),
            "source": "crossref",
            "externalIds": {"DOI": doi},
            "citationCount": int(item.get("is-referenced-by-count") or 0),
            "influentialCitationCount": 0,
            "openAccessPdf": {"url": ""},
        })
    logger.info("[Crossref] Found %d usable papers", len(papers))
    return papers


def search_fallback_sources(
    sources: List[str],
    config: Dict,
    start_date: datetime,
    end_date: datetime,
    top_k: int = 20,
    focus_keywords: List[str] = None,
    cache_dir: Optional[Path] = None,
    cache_ttl_seconds: int = 0,
) -> List[Dict]:
    all_papers: List[Dict] = []
    for source in sources:
        if source in {"europe_pmc", "europepmc", "pmc"}:
            all_papers.extend(search_europe_pmc_papers(config, start_date, end_date, top_k, focus_keywords, cache_dir, cache_ttl_seconds))
        elif source == "pubmed":
            all_papers.extend(search_pubmed_papers(config, start_date, end_date, top_k, focus_keywords, cache_dir, cache_ttl_seconds))
        elif source == "crossref":
            all_papers.extend(search_crossref_papers(config, start_date, end_date, top_k, focus_keywords, cache_dir, cache_ttl_seconds))
        else:
            logger.warning("[fallback] Unknown source '%s'; skipping", source)
    return all_papers


def _external_id(paper: Dict, key: str) -> str:
    external = paper.get("externalIds") or {}
    return external.get(key) or external.get(key.lower()) or ""


def _pmc_pdf_url(pmcid: str) -> str:
    if not pmcid:
        return ""
    pmcid = str(pmcid).strip()
    if pmcid and not pmcid.upper().startswith("PMC"):
        pmcid = f"PMC{pmcid}"
    return f"https://pmc.ncbi.nlm.nih.gov/articles/{pmcid}/pdf/"


def _best_unpaywall_location(data: Dict) -> Dict:
    locations = []
    best = data.get("best_oa_location") or {}
    if best:
        locations.append(best)
    locations.extend(data.get("oa_locations") or [])
    for location in locations:
        pdf = location.get("url_for_pdf")
        if pdf:
            return {"pdf_url": pdf, "landing_url": location.get("url_for_landing_page") or pdf, "source": "unpaywall"}
    for location in locations:
        landing = location.get("url_for_landing_page")
        if landing:
            return {"pdf_url": "", "landing_url": landing, "source": "unpaywall"}
    return {}


def resolve_open_access_pdf(
    paper: Dict,
    unpaywall_email: str = "",
    cache_dir: Optional[Path] = None,
    cache_ttl_seconds: int = 0,
) -> Dict:
    existing_pdf = paper.get("pdf_url") or (paper.get("openAccessPdf") or {}).get("url") or ""
    pmcid = _external_id(paper, "PubMedCentral") or paper.get("pmcid") or ""
    if pmcid:
        pmc_pdf = _pmc_pdf_url(pmcid)
        if pmc_pdf:
            paper["pdf_url"] = pmc_pdf
            paper["oa_source"] = "pmc"
            paper.setdefault("openAccessPdf", {})["url"] = pmc_pdf
            return paper

    if existing_pdf:
        paper["pdf_url"] = existing_pdf
        paper.setdefault("openAccessPdf", {})["url"] = existing_pdf
        return paper

    doi = _external_id(paper, "DOI") or paper.get("doi") or ""
    if doi and unpaywall_email:
        url = f"{UNPAYWALL_API_URL}/{urllib.parse.quote(doi)}?{urllib.parse.urlencode({'email': unpaywall_email})}"
        try:
            data = json.loads(_fetch_text(url, timeout=20, cache_dir=cache_dir, cache_ttl_seconds=cache_ttl_seconds, cache_suffix="json"))
            location = _best_unpaywall_location(data)
            if location:
                paper["oa_source"] = location.get("source")
                if location.get("pdf_url"):
                    paper["pdf_url"] = location["pdf_url"]
                    paper.setdefault("openAccessPdf", {})["url"] = location["pdf_url"]
                if location.get("landing_url") and not paper.get("url"):
                    paper["url"] = location["landing_url"]
        except Exception as e:
            logger.warning("[Unpaywall] DOI %s lookup failed: %s", doi, e)
    return paper


def resolve_open_access_pdfs(
    papers: List[Dict],
    unpaywall_email: str = "",
    cache_dir: Optional[Path] = None,
    cache_ttl_seconds: int = 0,
) -> List[Dict]:
    if not papers:
        return papers
    for paper in papers:
        resolve_open_access_pdf(
            paper,
            unpaywall_email=unpaywall_email,
            cache_dir=cache_dir,
            cache_ttl_seconds=cache_ttl_seconds,
        )
    return papers


def parse_arxiv_xml(xml_content: str) -> List[Dict]:
    """
    瑙ｆ瀽 arXiv XML 缁撴灉
    
    Args:
        xml_content: XML 鍐呭
        
    Returns:
        璁烘枃鍒楄〃锛屾瘡绡囪鏂囧寘鍚?ID銆佹爣棰樸€佷綔鑰呫€佹憳瑕佺瓑淇℃伅
    """
    papers = []
    
    try:
        root = ET.fromstring(xml_content)
        
        # 鏌ユ壘鎵€鏈?entry 鍏冪礌
        for entry in root.findall('atom:entry', ARXIV_NS):
            paper = {}
            
            # 鎻愬彇 ID
            id_elem = entry.find('atom:id', ARXIV_NS)
            if id_elem is not None:
                paper['id'] = id_elem.text
                # 鎻愬彇 arXiv ID锛堜粠 URL 涓彁鍙栵級
                match = re.search(r'arXiv:(\d+\.\d+)', paper['id'])
                if match:
                    paper['arxiv_id'] = match.group(1)
                else:
                    match = re.search(r'/(\d+\.\d+)$', paper['id'])
                    if match:
                        paper['arxiv_id'] = match.group(1)
            
            # 鎻愬彇鏍囬
            title_elem = entry.find('atom:title', ARXIV_NS)
            if title_elem is not None:
                paper['title'] = title_elem.text.strip()
            
            # 鎻愬彇鎽樿
            summary_elem = entry.find('atom:summary', ARXIV_NS)
            if summary_elem is not None:
                paper['summary'] = summary_elem.text.strip()
            
            # 鎻愬彇浣滆€咃紙鍙婂彲閫夌殑 affiliation锛?
            authors = []
            affiliations = []
            for author in entry.findall('atom:author', ARXIV_NS):
                name_elem = author.find('atom:name', ARXIV_NS)
                if name_elem is not None:
                    authors.append(name_elem.text)
                affil_elem = author.find('arxiv:affiliation', ARXIV_NS)
                if affil_elem is not None and affil_elem.text:
                    affil = affil_elem.text.strip()
                    if affil and affil not in affiliations:
                        affiliations.append(affil)
            paper['authors'] = authors
            paper['affiliations'] = affiliations  # 鍙兘涓虹┖鍒楄〃
            
            # 鎻愬彇鍙戝竷鏃ユ湡
            published_elem = entry.find('atom:published', ARXIV_NS)
            if published_elem is not None:
                paper['published'] = published_elem.text
                # 瑙ｆ瀽鏃ユ湡
                try:
                    paper['published_date'] = datetime.fromisoformat(
                        paper['published'].replace('Z', '+00:00')
                    )
                except (ValueError, TypeError):
                    paper['published_date'] = None
            
            # 鎻愬彇鏇存柊鏃ユ湡
            updated_elem = entry.find('atom:updated', ARXIV_NS)
            if updated_elem is not None:
                paper['updated'] = updated_elem.text
            
            # 鎻愬彇鍒嗙被
            categories = []
            for category in entry.findall('atom:category', ARXIV_NS):
                term = category.get('term')
                if term:
                    categories.append(term)
            paper['categories'] = categories
            
            # 鎻愬彇 PDF 閾炬帴
            for link in entry.findall('atom:link', ARXIV_NS):
                if link.get('title') == 'pdf':
                    paper['pdf_url'] = link.get('href')
                    break
            
            # 鎻愬彇涓婚〉闈㈤摼鎺?
            if 'id' in paper:
                paper['url'] = paper['id']
            
            # 鏍囪鏉ユ簮
            paper['source'] = 'arxiv'
            
            papers.append(paper)
            
    except ET.ParseError as e:
        logger.error("Error parsing XML: %s", e)
        raise
    
    return papers


def calculate_relevance_score(
    paper: Dict,
    domains: Dict,
    excluded_keywords: List[str],
    focus_keywords: List[str] = None
) -> Tuple[float, Optional[str], List[str]]:
    """
    璁＄畻璁烘枃涓庣爺绌跺叴瓒ｇ殑鐩稿叧鎬ц瘎鍒?

    褰撴湁 focus_keywords 鏃讹紝浠?focus 鍖归厤涓轰富瀵硷紙楂樻潈閲嶏級锛?
    宸叉湁鍏磋叮鍩熶粎浣滀负鍙傝€冨姞鍒嗐€?

    Args:
        paper: 璁烘枃淇℃伅
        domains: 鐮旂┒棰嗗煙閰嶇疆
        excluded_keywords: 鎺掗櫎鍏抽敭璇?
        focus_keywords: 鐢ㄦ埛浠婃棩鍏虫敞鐨勫叧閿瘝

    Returns:
        (鐩稿叧鎬ц瘎鍒? 鍖归厤鐨勯鍩? 鍖归厤鐨勫叧閿瘝鍒楄〃)
    """
    focus_keywords = focus_keywords or []
    title = paper.get('title', '').lower()
    summary = paper.get('summary', '').lower() if 'summary' in paper else paper.get('abstract', '').lower()
    categories = set(paper.get('categories', []))

    # 妫€鏌ユ帓闄ゅ叧閿瘝
    for keyword in excluded_keywords:
        if keyword.lower() in title or keyword.lower() in summary:
            return 0, None, []

    # ---- Focus 鍏抽敭璇嶇嫭绔嬭瘎鍒嗭紙涓诲锛?----
    focus_score = 0.0
    focus_matched = []
    if focus_keywords:
        for fk in focus_keywords:
            fk_lower = fk.lower().strip()
            if not fk_lower:
                continue
            if fk_lower in title:
                focus_score += 2.0  # 鏍囬鍖归厤锛氶珮鍒?
                focus_matched.append(fk)
            elif fk_lower in summary:
                focus_score += 1.0  # 鎽樿鍖归厤锛氫腑鍒?
                focus_matched.append(fk)

    # ---- 宸叉湁鍏磋叮鍩熻瘎鍒嗭紙鍙傝€冿級 ----
    max_domain_score = 0
    best_domain = None
    domain_matched_keywords = []

    for domain_name, domain_config in domains.items():
        score = 0
        dm_keywords = []

        keywords = domain_config.get('keywords', [])
        keyword_hit = False
        for keyword in keywords:
            keyword_lower = keyword.lower()
            if keyword_lower in title:
                score += RELEVANCE_TITLE_KEYWORD_BOOST
                dm_keywords.append(keyword)
                keyword_hit = True
            elif keyword_lower in summary:
                score += RELEVANCE_SUMMARY_KEYWORD_BOOST
                dm_keywords.append(keyword)
                keyword_hit = True

        domain_categories = domain_config.get('arxiv_categories', [])
        for cat in domain_categories:
            if cat in categories:
                score += RELEVANCE_CATEGORY_MATCH_BOOST if keyword_hit else 0.1
                dm_keywords.append(cat)

        if not keyword_hit:
            score = min(score, 0.2)

        if score > max_domain_score:
            max_domain_score = score
            best_domain = domain_name
            domain_matched_keywords = dm_keywords

    # ---- 鍚堝苟璇勫垎 ----
    if focus_keywords:
        # Focus 妯″紡锛歠ocus 涓轰富锛屽煙鍖归厤涓鸿緟锛?.3 鏉冮噸锛?
        total_score = focus_score + max_domain_score * 0.3
        all_matched = focus_matched + [k for k in domain_matched_keywords if k not in focus_matched]
        matched_domain = best_domain if best_domain else ("鎼滅储缁撴灉" if focus_matched else None)
    else:
        # 鏅€氭ā寮忥細绾煙璇勫垎
        if max_domain_score < 0.3:
            return 0, None, []
        total_score = max_domain_score
        all_matched = domain_matched_keywords
        matched_domain = best_domain

    return total_score, matched_domain, all_matched


def calculate_recency_score(published_date: Optional[datetime]) -> float:
    """
    鏍规嵁鍙戝竷鏃ユ湡璁＄畻鏂拌繎鎬ц瘎鍒?
    
    Args:
        published_date: 鍙戝竷鏃ユ湡
        
    Returns:
        鏂拌繎鎬ц瘎鍒?(0-3)
    """
    if published_date is None:
        return 0
    
    now = datetime.now(published_date.tzinfo) if published_date.tzinfo else datetime.now()
    days_diff = (now - published_date).days
    
    for max_days, score in RECENCY_THRESHOLDS:
        if days_diff <= max_days:
            return score
    return RECENCY_DEFAULT


def calculate_quality_score(summary: str) -> float:
    """
    浠庢憳瑕佹帹鏂川閲忚瘎鍒?

    閲囩敤鏇寸粏绮掑害鐨勬寚鏍囷細寮哄垱鏂拌瘝鏉冮噸楂樹簬寮卞垱鏂拌瘝锛?
    閲忓寲缁撴灉鍜屽姣斿疄楠屼篃鍔犲垎銆?

    Args:
        summary: 璁烘枃鎽樿

    Returns:
        璐ㄩ噺璇勫垎 (0-3)
    """
    if not summary:
        return 0.0
    score = 0.0
    summary_lower = summary.lower()

    strong_innovation = [
        'state-of-the-art', 'sota', 'breakthrough', 'first',
        'surpass', 'outperform', 'pioneering'
    ]
    weak_innovation = [
        'novel', 'propose', 'introduce', 'new approach',
        'new method', 'innovative'
    ]
    method_indicators = [
        'framework', 'architecture', 'algorithm', 'mechanism',
        'pipeline', 'end-to-end'
    ]
    quantitative_indicators = [
        'outperforms', 'improves by', 'achieves', 'accuracy',
        'f1', 'bleu', 'rouge', 'beats', 'surpasses'
    ]
    experiment_indicators = [
        'experiment', 'evaluation', 'benchmark', 'ablation',
        'baseline', 'comparison'
    ]

    strong_count = sum(1 for ind in strong_innovation if ind in summary_lower)
    if strong_count >= 2:
        score += 1.0
    elif strong_count == 1:
        score += 0.7
    else:
        weak_count = sum(1 for ind in weak_innovation if ind in summary_lower)
        if weak_count > 0:
            score += 0.3

    if any(ind in summary_lower for ind in method_indicators):
        score += 0.5

    if any(ind in summary_lower for ind in quantitative_indicators):
        score += 0.8
    elif any(ind in summary_lower for ind in experiment_indicators):
        score += 0.4

    return min(score, SCORE_MAX)


def calculate_recommendation_score(
    relevance_score: float,
    recency_score: float,
    popularity_score: float,
    quality_score: float,
    is_hot_paper: bool = False
) -> float:
    """
    璁＄畻缁煎悎鎺ㄨ崘璇勫垎

    鏉冮噸瀹氫箟鍦ㄦā鍧楅《閮ㄥ父閲?WEIGHTS_NORMAL / WEIGHTS_HOT 涓€?
    瀵逛簬楂樺奖鍝嶅姏璁烘枃锛堟潵鑷?Semantic Scholar锛夛紝浣跨敤 WEIGHTS_HOT 鎻愰珮鐑棬搴︽潈閲嶃€?

    Args:
        relevance_score: 鐩稿叧鎬ц瘎鍒?(0-SCORE_MAX)
        recency_score: 鏂拌繎鎬ц瘎鍒?(0-SCORE_MAX)
        popularity_score: 鐑棬搴﹁瘎鍒?(0-SCORE_MAX)
        quality_score: 璐ㄩ噺璇勫垎 (0-SCORE_MAX)
        is_hot_paper: 鏄惁鏄珮褰卞搷鍔涜鏂?

    Returns:
        缁煎悎鎺ㄨ崘璇勫垎 (0-10)
    """
    scores = {
        'relevance': relevance_score,
        'recency': recency_score,
        'popularity': popularity_score,
        'quality': quality_score,
    }
    # 褰掍竴鍖栧埌 0-10 鍒?
    normalized = {k: (v / SCORE_MAX) * 10 for k, v in scores.items()}

    weights = WEIGHTS_HOT if is_hot_paper else WEIGHTS_NORMAL
    final_score = sum(normalized[k] * weights[k] for k in weights)

    return round(final_score, 2)


def filter_and_score_papers(
    papers: List[Dict],
    config: Dict,
    target_date: Optional[datetime] = None,
    is_hot_paper_batch: bool = False,
    focus_keywords: List[str] = None
) -> List[Dict]:
    """
    绛涢€夊拰璇勫垎璁烘枃

    Args:
        papers: 璁烘枃鍒楄〃
        config: 鐮旂┒閰嶇疆
        target_date: 鐩爣鏃ユ湡锛堢敤浜庤绠楁柊杩戞€э級
        is_hot_paper_batch: 鏄惁鏄珮褰卞搷鍔涜鏂囨壒娆?

    Returns:
        绛涢€夊拰璇勫垎鍚庣殑璁烘枃鍒楄〃
    """
    domains = config.get('research_domains', {})
    excluded_keywords = config.get('excluded_keywords', [])

    scored_papers = []

    for paper in papers:
        # 璁＄畻鐩稿叧鎬?
        relevance, matched_domain, matched_keywords = calculate_relevance_score(
            paper, domains, excluded_keywords, focus_keywords=focus_keywords or []
        )

        # 濡傛灉鐩稿叧鎬т负0锛岃烦杩?
        if relevance == 0:
            continue

        # 璁＄畻鏂拌繎鎬?
        if 'published_date' in paper:
            recency = calculate_recency_score(paper.get('published_date'))
        else:
            # 瀵逛簬 Semantic Scholar 鐨勮鏂囷紝浣跨敤 publicationDate
            pub_date_str = paper.get('publicationDate')
            if pub_date_str:
                pub_date = None
                for fmt in ('%Y-%m-%d', '%Y-%m', '%Y'):
                    try:
                        pub_date = datetime.strptime(pub_date_str, fmt)
                        break
                    except (ValueError, TypeError):
                        continue
                recency = calculate_recency_score(pub_date) if pub_date else 0
            else:
                recency = 0

        # 璁＄畻鐑棬搴?
        if is_hot_paper_batch:
            # 楂樺奖鍝嶅姏璁烘枃锛氫娇鐢?influentialCitationCount
            inf_cit = paper.get('influentialCitationCount', 0)
            popularity = min(
                inf_cit / (POPULARITY_INFLUENTIAL_CITATION_FULL_SCORE / SCORE_MAX),
                SCORE_MAX,
            )
        else:
            # 鏅€氳鏂囷紙鏃犲紩鐢ㄦ暟鎹級锛氬熀浜庢柊杩戞€х粰涓€涓腑闂寸儹闂ㄥ害
            # 鏈€杩?澶╃殑鏂拌鏂囧彲鑳芥湁鏇撮珮鐨?娼滃湪鐑害"
            if 'published_date' in paper and paper['published_date']:
                pub = paper['published_date']
                now = datetime.now(pub.tzinfo) if pub.tzinfo else datetime.now()
                days_old = (now - pub).days
                if days_old <= 7:
                    popularity = 2.0  # 闈炲父鏂扮殑璁烘枃鏈夋綔鍦ㄧ儹搴?
                elif days_old <= 14:
                    popularity = 1.5
                elif days_old <= 30:
                    popularity = 1.0
                else:
                    popularity = 0.5
            else:
                popularity = 0.5  # 鏃犳棩鏈熶俊鎭椂缁欎竴涓繚瀹堝€?

        # 璁＄畻璐ㄩ噺
        summary = paper.get('summary', '') if 'summary' in paper else paper.get('abstract', '')
        quality = calculate_quality_score(summary)

        # 璁＄畻缁煎悎鎺ㄨ崘璇勫垎
        recommendation_score = calculate_recommendation_score(
            relevance, recency, popularity, quality, is_hot_paper_batch
        )

        # 娣诲姞璇勫垎淇℃伅
        paper['scores'] = {
            'relevance': round(relevance, 2),
            'recency': round(recency, 2),
            'popularity': round(popularity, 2),
            'quality': round(quality, 2),
            'recommendation': recommendation_score
        }
        paper['matched_domain'] = matched_domain
        paper['matched_keywords'] = matched_keywords
        paper['is_hot_paper'] = is_hot_paper_batch

        scored_papers.append(paper)

    # 鎸夋帹鑽愯瘎鍒嗘帓搴?
    scored_papers.sort(key=lambda x: x['scores']['recommendation'], reverse=True)

    return scored_papers


def main():
    """Run the paper search workflow."""
    global S2_CATEGORY_REQUEST_INTERVAL
    import argparse

    default_config = os.environ.get('OBSIDIAN_VAULT_PATH', '')
    if default_config:
        default_config = os.path.join(default_config, '99_System', 'Config', 'research_interests.yaml')

    parser = argparse.ArgumentParser(description='Search and filter arXiv papers with Semantic Scholar integration')
    parser.add_argument('--config', type=str,
                        default=default_config or None,
                        help='Path to research interests config file (or set OBSIDIAN_VAULT_PATH env var)')
    parser.add_argument('--output', type=str, default='arxiv_filtered.json',
                        help='Output JSON file path')
    parser.add_argument('--max-results', type=int, default=200,
                        help='Maximum number of results to fetch from arXiv')
    parser.add_argument('--top-n', type=int, default=10,
                        help='Number of top papers to return')
    parser.add_argument('--target-date', type=str, default=None,
                        help='Target date (YYYY-MM-DD) for filtering')
    parser.add_argument('--categories', type=str,
                        default='cs.AI,cs.LG,cs.CL,cs.CV,cs.MM,cs.MA,cs.RO',
                        help='Comma-separated list of arXiv categories')
    parser.add_argument('--skip-hot-papers', action='store_true',
                        help='Skip searching hot papers from Semantic Scholar')
    parser.add_argument('--focus', type=str, default='',
                        help='User-specified focus keywords for today (comma-separated)')
    parser.add_argument('--days', type=int, default=30,
                        help='Number of days to search back (default 30)')
    parser.add_argument('--cache-dir', type=str, default='.cache',
                        help='Directory for cached arXiv/Semantic Scholar responses')
    parser.add_argument('--cache-ttl-hours', type=int, default=24,
                        help='Reuse cached API responses younger than this many hours')
    parser.add_argument('--no-cache', action='store_true',
                        help='Disable HTTP response cache')
    parser.add_argument('--s2-interval', type=int, default=S2_CATEGORY_REQUEST_INTERVAL,
                        help='Seconds to wait between Semantic Scholar queries')
    parser.add_argument('--s2-request-limit', type=int, default=25,
                        help='Semantic Scholar API limit per query (lower is more rate-limit friendly)')
    parser.add_argument('--s2-max-queries', type=int, default=3,
                        help='Maximum number of Semantic Scholar keyword queries per run')
    parser.add_argument('--arxiv-mode', choices=['auto', 'keyword', 'category'], default='auto',
                        help='arXiv search mode: auto/keyword is faster and less likely to hit broad-query 429')
    parser.add_argument('--arxiv-max-retries', type=int, default=1,
                        help='Maximum arXiv retries per query; low default avoids repeated 429 loops')
    parser.add_argument('--fallback-sources', type=str, default='europe_pmc,pubmed,crossref',
                        help='Comma-separated fallback sources when arXiv has no recent papers')
    parser.add_argument('--fallback-top-k', type=int, default=20,
                        help='Maximum papers to fetch per fallback source')
    parser.add_argument('--no-fallback-sources', action='store_true',
                        help='Disable PubMed/Europe PMC/Crossref fallback searches')

    args = parser.parse_args()

    S2_CATEGORY_REQUEST_INTERVAL = args.s2_interval

    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s [%(levelname)s] %(message)s',
        datefmt='%H:%M:%S',
        stream=sys.stderr,
    )

    focus_keywords = [k.strip() for k in args.focus.split(',') if k.strip()] if args.focus else []
    if focus_keywords:
        logger.info("Focus keywords: %s", focus_keywords)

    if not args.config:
        logger.error("No config path specified. Use --config or OBSIDIAN_VAULT_PATH.")
        return 1

    logger.info("Loading config from: %s", args.config)
    config = load_research_config(args.config)
    cache_dir = None if args.no_cache else Path(args.cache_dir)
    cache_ttl_seconds = 0 if args.no_cache else args.cache_ttl_hours * 3600
    priority_keywords = _collect_priority_keywords(config, per_domain=2, max_keywords=12)
    unpaywall_email = (config.get("unpaywall_email") or config.get("email") or "").strip()

    # 瑙ｆ瀽鐩爣鏃ユ湡
    target_date = None
    if args.target_date:
        try:
            target_date = datetime.strptime(args.target_date, '%Y-%m-%d')
            logger.info("Target date: %s", args.target_date)
        except ValueError:
            logger.error("Invalid target date format: %s", args.target_date)
            return 1
    else:
        target_date = datetime.now()
        logger.info("Using current date: %s", target_date.strftime('%Y-%m-%d'))

    window_30d_start, window_30d_end, window_1y_start, window_1y_end = calculate_date_windows(target_date, days=args.days)
    logger.info("Date windows:")
    logger.info("  Recent %d days: %s to %s", args.days, window_30d_start.date(), window_30d_end.date())
    logger.info("  Past year (31-365 days): %s to %s", window_1y_start.date(), window_1y_end.date())

    # 瑙ｆ瀽鍒嗙被
    categories = args.categories.split(',')
    fallback_sources = [] if args.no_fallback_sources else [s.strip().lower() for s in args.fallback_sources.split(',') if s.strip()]

    all_scored_papers = []
    recent_papers = []
    hot_papers = []
    fallback_papers = []

    if focus_keywords:
        # ========== Focus 妯″紡锛氬叧閿瘝鎼滅储涓轰富 ==========
        logger.info("=" * 70)
        logger.info("Step 1 (Focus): Keyword-based arXiv search for: %s", focus_keywords)
        logger.info("=" * 70)

        focus_papers = search_arxiv_by_keywords(
            keywords=focus_keywords,
            start_date=window_30d_start,
            end_date=window_30d_end,
            max_results=args.max_results,
            max_retries=args.arxiv_max_retries,
            cache_dir=cache_dir,
            cache_ttl_seconds=cache_ttl_seconds,
        )

        if focus_papers:
            scored_focus = filter_and_score_papers(
                papers=focus_papers,
                config=config,
                target_date=target_date,
                is_hot_paper_batch=False,
                focus_keywords=focus_keywords
            )
            logger.info("Scored %d focus keyword papers", len(scored_focus))
            all_scored_papers.extend(scored_focus)
        else:
            logger.warning("No papers found for focus keywords")

        if not focus_papers and fallback_sources:
            logger.info("=" * 70)
            logger.info("Step 1b (Focus): Searching fallback sources: %s", ", ".join(fallback_sources))
            logger.info("=" * 70)
            fallback_papers = search_fallback_sources(
                sources=fallback_sources,
                config=config,
                start_date=window_30d_start,
                end_date=window_30d_end,
                top_k=args.fallback_top_k,
                focus_keywords=focus_keywords,
                cache_dir=cache_dir,
                cache_ttl_seconds=cache_ttl_seconds,
            )
            if fallback_papers:
                scored_fallback = filter_and_score_papers(
                    papers=fallback_papers,
                    config=config,
                    target_date=target_date,
                    is_hot_paper_batch=False,
                    focus_keywords=focus_keywords,
                )
                logger.info("Scored %d fallback papers for focus", len(scored_fallback))
                all_scored_papers.extend(scored_fallback)

        # Semantic Scholar 涔熸寜 focus 鎼滅储锛堣ˉ鍏呴珮寮曠敤璁烘枃锛?
        if not args.skip_hot_papers:
            logger.info("=" * 70)
            logger.info("Step 2 (Focus): Searching hot papers for focus keywords from Semantic Scholar")
            logger.info("=" * 70)

            focus_query = " ".join(focus_keywords)
            try:
                hot_papers = search_semantic_scholar_hot_papers(
                    query=focus_query,
                    start_date=window_1y_start,
                    end_date=window_1y_end,
                    top_k=20,
                    request_limit=args.s2_request_limit,
                    cache_dir=cache_dir,
                    cache_ttl_seconds=cache_ttl_seconds,
                )
            except Exception as e:
                logger.warning("Semantic Scholar focus search failed (non-fatal): %s", e)
                hot_papers = []

            if hot_papers:
                scored_hot = filter_and_score_papers(
                    papers=hot_papers,
                    config=config,
                    target_date=target_date,
                    is_hot_paper_batch=True,
                    focus_keywords=focus_keywords
                )
                logger.info("Scored %d hot papers for focus", len(scored_hot))
                all_scored_papers.extend(scored_hot)

    else:
        # ========== 鏅€氭ā寮忥細鎸夊叴瓒ｅ煙鎼滅储 ==========
        logger.info("=" * 70)
        logger.info("Step 1: Searching recent papers (last 30 days) from arXiv")
        logger.info("=" * 70)

        if args.arxiv_mode in ("auto", "keyword") and priority_keywords:
            logger.info("[arXiv] Using priority keyword mode to reduce broad-query 429 risk: %s", priority_keywords)
            recent_papers = search_arxiv_by_keywords(
                keywords=priority_keywords,
                start_date=window_30d_start,
                end_date=window_30d_end,
                max_results=min(args.max_results, 50),
                max_retries=args.arxiv_max_retries,
                cache_dir=cache_dir,
                cache_ttl_seconds=cache_ttl_seconds,
            )
        else:
            recent_papers = search_arxiv_by_date_range(
                categories=categories,
                start_date=window_30d_start,
                end_date=window_30d_end,
                max_results=args.max_results,
                max_retries=args.arxiv_max_retries,
                cache_dir=cache_dir,
                cache_ttl_seconds=cache_ttl_seconds,
            )

        if recent_papers:
            scored_recent = filter_and_score_papers(
                papers=recent_papers,
                config=config,
                target_date=target_date,
                is_hot_paper_batch=False,
            )
            logger.info("Scored %d recent papers", len(scored_recent))
            all_scored_papers.extend(scored_recent)
        else:
            logger.warning("No recent papers found")

        if not recent_papers and fallback_sources:
            logger.info("=" * 70)
            logger.info("Step 1b: Searching fallback sources: %s", ", ".join(fallback_sources))
            logger.info("=" * 70)
            fallback_papers = search_fallback_sources(
                sources=fallback_sources,
                config=config,
                start_date=window_30d_start,
                end_date=window_30d_end,
                top_k=args.fallback_top_k,
                focus_keywords=[],
                cache_dir=cache_dir,
                cache_ttl_seconds=cache_ttl_seconds,
            )
            if fallback_papers:
                scored_fallback = filter_and_score_papers(
                    papers=fallback_papers,
                    config=config,
                    target_date=target_date,
                    is_hot_paper_batch=False,
                )
                logger.info("Scored %d fallback papers", len(scored_fallback))
                all_scored_papers.extend(scored_fallback)

        # 鎼滅储杩囧幓涓€骞寸殑楂樺奖鍝嶅姏璁烘枃锛圫emantic Scholar锛?
        if not args.skip_hot_papers:
            logger.info("=" * 70)
            logger.info("Step 2: Searching hot papers (past year) from Semantic Scholar")
            logger.info("=" * 70)

            try:
                hot_papers = search_hot_papers_from_categories(
                    categories=categories,
                    start_date=window_1y_start,
                    end_date=window_1y_end,
                    top_k_per_category=5,
                    request_limit=args.s2_request_limit,
                    max_queries=args.s2_max_queries,
                    config=config,
                    cache_dir=cache_dir,
                    cache_ttl_seconds=cache_ttl_seconds,
                )
            except Exception as e:
                logger.warning("Semantic Scholar search failed (non-fatal): %s", e)
                hot_papers = []

            if hot_papers:
                scored_hot = filter_and_score_papers(
                    papers=hot_papers,
                    config=config,
                    target_date=target_date,
                    is_hot_paper_batch=True,
                )
                logger.info("Scored %d hot papers", len(scored_hot))
                all_scored_papers.extend(scored_hot)
            else:
                logger.warning("No hot papers found from Semantic Scholar")
        else:
            logger.info("Skipping hot paper search (disabled by user)")

    # ========== 绗笁姝ワ細鍚堝苟缁撴灉骞舵帓搴?==========
    logger.info("=" * 70)
    logger.info("Step 3: Merging and ranking results")
    logger.info("=" * 70)

    if all_scored_papers:
        logger.info("Resolving OA PDFs via PMC%s", " and Unpaywall" if unpaywall_email else "")
        resolve_open_access_pdfs(
            all_scored_papers,
            unpaywall_email=unpaywall_email,
            cache_dir=cache_dir,
            cache_ttl_seconds=cache_ttl_seconds,
        )
    
    # 鎸夋帹鑽愯瘎鍒嗘帓搴?
    all_scored_papers.sort(key=lambda x: x['scores']['recommendation'], reverse=True)
    
    # 鍘婚噸锛堜紭鍏?arXiv ID锛屽叾娆℃爣棰?normalize锛?
    seen_ids = set()
    seen_titles = set()
    unique_papers = []
    for p in all_scored_papers:
        arxiv_id = p.get('arxiv_id') or p.get('arxivId')
        if arxiv_id:
            if arxiv_id not in seen_ids:
                seen_ids.add(arxiv_id)
                unique_papers.append(p)
        else:
            # 娌℃湁 arXiv ID 鐨勶紝浣跨敤鏍囬鍘婚噸锛坣ormalize: 灏忓啓+鍘绘爣鐐癸級
            title = p.get('title', '')
            title_normalized = re.sub(r'[^a-z0-9\s]', '', title.lower()).strip()
            if title_normalized and title_normalized not in seen_titles:
                seen_titles.add(title_normalized)
                unique_papers.append(p)
    
    logger.info("Total unique papers after deduplication: %d", len(unique_papers))

    if len(unique_papers) == 0:
        logger.warning("No papers matched the criteria!")
        output = {
            'target_date': args.target_date or target_date.strftime('%Y-%m-%d'),
            'status': 'rate_limited' if RATE_LIMIT_HIT else 'empty',
            'rate_limited': RATE_LIMIT_HIT,
            'date_windows': {
                'recent_30d': {
                    'start': window_30d_start.strftime('%Y-%m-%d'),
                    'end': window_30d_end.strftime('%Y-%m-%d')
                },
                'past_year': {
                    'start': window_1y_start.strftime('%Y-%m-%d'),
                    'end': window_1y_end.strftime('%Y-%m-%d')
                }
            },
            'total_recent': len(recent_papers),
            'total_fallback': len(fallback_papers),
            'fallback_sources': fallback_sources,
            'total_hot': len(hot_papers),
            'total_unique': 0,
            'top_papers': []
        }
        _write_output(output, args.output)
        return 1

    # 鍙栧墠 N 绡?
    top_papers = unique_papers[:args.top_n]

    # 涓烘瘡绡囪鏂囪ˉ鍏?note_filename锛屼笌 generate_note.py 鐨勬枃浠跺悕瑙勫垯淇濇寔涓€鑷?
    # 杩欐牱 start-my-day 鐢熸垚鐨?wikilink 鍙互鐩存帴浣跨敤姝ゅ瓧娈碉紝鏃犻渶鑷鎺ㄦ柇
    for paper in top_papers:
        paper['note_filename'] = title_to_note_filename(paper.get('title', ''))

    # 鍑嗗杈撳嚭
    output = {
        'target_date': args.target_date or target_date.strftime('%Y-%m-%d'),
        'status': 'ok',
        'rate_limited': RATE_LIMIT_HIT,
        'date_windows': {
            'recent_30d': {
                'start': window_30d_start.strftime('%Y-%m-%d'),
                'end': window_30d_end.strftime('%Y-%m-%d')
            },
            'past_year': {
                'start': window_1y_start.strftime('%Y-%m-%d'),
                'end': window_1y_end.strftime('%Y-%m-%d')
            }
        },
        'total_recent': len(recent_papers),
        'total_fallback': len(fallback_papers),
        'fallback_sources': fallback_sources,
        'total_hot': len(hot_papers),
        'total_unique': len(unique_papers),
        'top_papers': top_papers
    }

    # Save results
    _write_output(output, args.output)

    logger.info("Top %d papers:", len(top_papers))
    for i, p in enumerate(top_papers, 1):
        hot_marker = " [HOT]" if p.get('is_hot_paper') else ""
        logger.info("  %d. %s... (Score: %s)%s", i, p.get('title', 'N/A')[:60], p['scores']['recommendation'], hot_marker)

    return 0


if __name__ == '__main__':
    sys.exit(main())

