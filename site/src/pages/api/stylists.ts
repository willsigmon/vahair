/**
 * GET /api/stylists
 * Returns all stylists (calendars) from Acuity
 */

import type { APIRoute } from 'astro';
import {
  getCalendars,
  isAcuityConfigured,
  withCache,
  stylistsCacheKey,
  CacheTTL,
  transformCalendar,
  type Stylist,
  type ApiResponse,
} from '../../lib/acuity';

// Fallback stylists when API unavailable
const fallbackStylists: Stylist[] = [
  {
    id: 7785532,
    name: 'Virginia',
    image: '/images/virginia.jpg',
    description: 'Owner & Stylist',
    bookingUrl: 'https://vahair.as.me/?calendarID=7785532',
  },
  {
    id: 8172243,
    name: 'Kim',
    image: '/images/kim.jpg',
    description: 'Stylist',
    bookingUrl: 'https://vahair.as.me/?calendarID=8172243',
  },
  {
    id: 13454517,
    name: 'Alyssa',
    image: '/images/placeholder-stylist.svg',
    description: 'Stylist',
    bookingUrl: 'https://vahair.as.me/?calendarID=13454517',
  },
];

export const GET: APIRoute = async () => {
  try {
    if (!isAcuityConfigured()) {
      return new Response(
        JSON.stringify({
          data: fallbackStylists,
          cached: false,
          error: 'API not configured - using fallback data',
        } satisfies ApiResponse<Stylist[]>),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const result = await withCache(
      stylistsCacheKey(),
      async () => {
        const calendars = await getCalendars();
        return calendars.map(transformCalendar);
      },
      CacheTTL.STYLISTS
    );

    return new Response(
      JSON.stringify({
        data: result.data,
        cached: result.cached,
        cachedAt: result.cachedAt,
      } satisfies ApiResponse<Stylist[]>),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching stylists:', error);

    return new Response(
      JSON.stringify({
        data: fallbackStylists,
        cached: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      } satisfies ApiResponse<Stylist[]>),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
