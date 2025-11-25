const MAX_CACHE_SIZE = 100; // max entries
const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutes

// Using Map so insertion order is preserved (helps implement simple LRU)
const cache = new Map();

/**
 * Get cached value by key.
 * Returns null if not found or expired.
 */
function getCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;

  const { data, expiresAt } = entry;
  if (Date.now() > expiresAt) {
    cache.delete(key);
    return null;
  }

  // Refresh recency for LRU behavior
  cache.delete(key);
  cache.set(key, entry);

  return data;
}

/**
 * Set value in cache with TTL.
 */
function setCache(key, data, ttlMs = DEFAULT_TTL_MS) {
  const expiresAt = Date.now() + ttlMs;
  cache.set(key, { data, expiresAt });

  // Enforce max size (delete oldest entry)
  if (cache.size > MAX_CACHE_SIZE) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
}

module.exports = {
  getCache,
  setCache
};
