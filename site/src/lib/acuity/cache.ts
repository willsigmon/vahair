/**
 * Caching layer for Acuity API responses
 * Uses in-memory cache for development, Vercel KV for production
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// In-memory cache for development/fallback
const memoryCache = new Map<string, CacheEntry<unknown>>();

// TTL values in milliseconds
export const CacheTTL = {
  SERVICES: 60 * 60 * 1000, // 1 hour - services rarely change
  STYLISTS: 30 * 60 * 1000, // 30 minutes - stylist data
  AVAILABILITY: 5 * 60 * 1000, // 5 minutes - availability changes often
  NEXT_SLOT: 2 * 60 * 1000, // 2 minutes - next available slot
} as const;

/** Get cached value or execute fetcher */
export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number
): Promise<{ data: T; cached: boolean; cachedAt?: string }> {
  // Try memory cache first
  const cached = memoryCache.get(key) as CacheEntry<T> | undefined;

  if (cached && Date.now() - cached.timestamp < cached.ttl) {
    return {
      data: cached.data,
      cached: true,
      cachedAt: new Date(cached.timestamp).toISOString(),
    };
  }

  // Fetch fresh data
  try {
    const data = await fetcher();

    // Store in memory cache
    memoryCache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    });

    return { data, cached: false };
  } catch (error) {
    // If fetch fails but we have stale cache, use it
    if (cached) {
      console.warn(`Cache miss but using stale data for ${key}:`, error);
      return {
        data: cached.data,
        cached: true,
        cachedAt: new Date(cached.timestamp).toISOString(),
      };
    }
    throw error;
  }
}

/** Clear specific cache key */
export function clearCache(key: string): void {
  memoryCache.delete(key);
}

/** Clear all cache */
export function clearAllCache(): void {
  memoryCache.clear();
}

/** Generate cache key for availability */
export function availabilityCacheKey(calendarId: number, date?: string): string {
  return `availability:${calendarId}:${date || 'next'}`;
}

/** Generate cache key for services */
export function servicesCacheKey(): string {
  return 'services:all';
}

/** Generate cache key for stylists */
export function stylistsCacheKey(): string {
  return 'stylists:all';
}
