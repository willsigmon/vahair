/**
 * Acuity Scheduling API Client
 * Uses Basic Authentication with User ID and API Key
 */

import type {
  AcuityCalendar,
  AcuityAppointmentType,
  AcuityTimeSlot,
  AcuityAvailabilityDate,
} from './types';

const ACUITY_BASE_URL = 'https://acuityscheduling.com/api/v1';

/** Get Basic Auth header from env vars */
function getAuthHeader(): string {
  const userId = import.meta.env.ACUITY_USER_ID;
  const apiKey = import.meta.env.ACUITY_API_KEY;

  if (!userId || !apiKey) {
    throw new Error('Missing ACUITY_USER_ID or ACUITY_API_KEY environment variables');
  }

  const credentials = Buffer.from(`${userId}:${apiKey}`).toString('base64');
  return `Basic ${credentials}`;
}

/** Make authenticated request to Acuity API */
async function acuityFetch<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${ACUITY_BASE_URL}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: getAuthHeader(),
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Acuity API error ${response.status}: ${errorText}`);
  }

  return response.json();
}

// ─────────────────────────────────────────────────────────────
// API Methods
// ─────────────────────────────────────────────────────────────

/** Get all calendars (stylists) */
export async function getCalendars(): Promise<AcuityCalendar[]> {
  return acuityFetch<AcuityCalendar[]>('/calendars');
}

/** Get all appointment types (services) */
export async function getAppointmentTypes(): Promise<AcuityAppointmentType[]> {
  return acuityFetch<AcuityAppointmentType[]>('/appointment-types');
}

/** Get available dates for a calendar and appointment type */
export async function getAvailableDates(
  calendarId: number,
  appointmentTypeId: number,
  month: string // YYYY-MM
): Promise<AcuityAvailabilityDate[]> {
  return acuityFetch<AcuityAvailabilityDate[]>('/availability/dates', {
    calendarID: calendarId.toString(),
    appointmentTypeID: appointmentTypeId.toString(),
    month,
  });
}

/** Get available time slots for a specific date */
export async function getAvailableTimes(
  calendarId: number,
  appointmentTypeId: number,
  date: string // YYYY-MM-DD
): Promise<AcuityTimeSlot[]> {
  return acuityFetch<AcuityTimeSlot[]>('/availability/times', {
    calendarID: calendarId.toString(),
    appointmentTypeID: appointmentTypeId.toString(),
    date,
  });
}

/** Check if Acuity API is configured */
export function isAcuityConfigured(): boolean {
  return !!(import.meta.env.ACUITY_USER_ID && import.meta.env.ACUITY_API_KEY);
}
