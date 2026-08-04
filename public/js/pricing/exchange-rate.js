const CACHE_KEY = 'spaceGlassUsdRate';
const DEFAULT_FALLBACK_RATE = 43.5;
const DEFAULT_MARKUP = 0.8;
const CACHE_MS = 24 * 60 * 60 * 1000;
const NBU_URL =
  'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json';

export async function getUsdRate(options = {}) {
  const markup = Number(options.markup ?? DEFAULT_MARKUP);
  const fallbackRate = Number(options.fallbackRate ?? DEFAULT_FALLBACK_RATE);
  const cacheHours = Number(options.cacheHours ?? 24);
  const maxAge = cacheHours * 60 * 60 * 1000;

  let cached = null;
  try {
    cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
  } catch {}

  if (
    cached &&
    Number(cached.nbuRate) > 0 &&
    Date.now() - Number(cached.updatedAt || 0) < maxAge
  ) {
    return {
      nbuRate: Number(cached.nbuRate),
      markup,
      workingRate: Number(cached.nbuRate) + markup,
      date: cached.date,
      source: 'cache',
    };
  }

  try {
    const response = await fetch(NBU_URL, {
      headers: { accept: 'application/json' },
    });

    if (!response.ok) throw new Error(`NBU HTTP ${response.status}`);
    const data = await response.json();
    const usd = Array.isArray(data)
      ? data.find((item) => String(item.cc).toUpperCase() === 'USD')
      : null;

    const nbuRate = Number(usd?.rate);
    if (!Number.isFinite(nbuRate) || nbuRate <= 0) {
      throw new Error('Invalid NBU rate');
    }

    const value = {
      nbuRate,
      markup,
      workingRate: nbuRate + markup,
      date: usd?.exchangedate || new Date().toLocaleDateString('uk-UA'),
      source: 'nbu',
      updatedAt: Date.now(),
    };

    localStorage.setItem(CACHE_KEY, JSON.stringify(value));
    return value;
  } catch (error) {
    if (cached && Number(cached.nbuRate) > 0) {
      return {
        nbuRate: Number(cached.nbuRate),
        markup,
        workingRate: Number(cached.nbuRate) + markup,
        date: cached.date,
        source: 'stale-cache',
      };
    }

    return {
      nbuRate: fallbackRate,
      markup,
      workingRate: fallbackRate + markup,
      date: new Date().toLocaleDateString('uk-UA'),
      source: 'fallback',
    };
  }
}
