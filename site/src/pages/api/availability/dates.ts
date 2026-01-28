/**
 * GET /api/availability/dates?calendarId=<id>&appointmentTypeId=<id>&month=<YYYY-MM>
 * Returns available dates for a calendar view
 */

import type { APIRoute } from 'astro';
import {
  getAvailableDates,
  isAcuityConfigured,
  withCache,
  availabilityCacheKey,
  CacheTTL,
  getCurrentMonth,
  type AcuityAvailabilityDate,
  type ApiResponse,
} from '../../../lib/acuity';

export const GET: APIRoute = async ({ url }) => {
  const calendarId = url.searchParams.get('calendarId');
  const appointmentTypeId = url.searchParams.get('appointmentTypeId');
  const month = url.searchParams.get('month') || getCurrentMonth();

  if (!calendarId || !appointmentTypeId) {
    return new Response(
      JSON.stringify({ error: 'Missing calendarId or appointmentTypeId parameter' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const calendarIdNum = parseInt(calendarId, 10);
  const appointmentTypeIdNum = parseInt(appointmentTypeId, 10);

  if (isNaN(calendarIdNum) || isNaN(appointmentTypeIdNum)) {
    return new Response(
      JSON.stringify({ error: 'Invalid calendarId or appointmentTypeId' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!isAcuityConfigured()) {
    return new Response(
      JSON.stringify({
        data: [],
        cached: false,
        error: 'API not configured',
      } satisfies ApiResponse<AcuityAvailabilityDate[]>),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const cacheKey = `${availabilityCacheKey(calendarIdNum, month)}:${appointmentTypeIdNum}`;

    const result = await withCache(
      cacheKey,
      async () => {
        return await getAvailableDates(calendarIdNum, appointmentTypeIdNum, month);
      },
      CacheTTL.AVAILABILITY
    );

    return new Response(
      JSON.stringify({
        data: result.data,
        cached: result.cached,
        cachedAt: result.cachedAt,
      } satisfies ApiResponse<AcuityAvailabilityDate[]>),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching available dates:', error);

    return new Response(
      JSON.stringify({
        data: [],
        cached: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      } satisfies ApiResponse<AcuityAvailabilityDate[]>),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
