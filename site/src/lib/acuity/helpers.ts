/**
 * Helper functions for date/time formatting and transformations
 */

import type {
  AcuityAppointmentType,
  AcuityCalendar,
  Service,
  ServiceCategory,
  Stylist,
  NextSlot,
} from './types';

/** Acuity scheduler base URL - Standalone account */
const ACUITY_BASE_BOOKING_URL = 'https://app.acuityscheduling.com/schedule.php?owner=38274584';

/**
 * Salon timezone (Rolesville, NC).
 *
 * Why this exists:
 * - Vercel/serverless often runs in UTC.
 * - Acuity returns ISO datetimes with offsets (e.g. -0500), but `Date` + `toLocale*`
 *   will convert into the server's timezone unless we explicitly set one.
 * - Without this, we can show obviously wrong times (e.g. 5:00 PM → 10:00 PM).
 */
const SALON_TIME_ZONE = 'America/New_York';

function formatYMD(date: Date, timeZone: string = SALON_TIME_ZONE): string {
  // en-CA yields YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function ymdToUtcMs(ymd: string): number {
  const [y, m, d] = ymd.split('-').map((n) => Number(n));
  return Date.UTC(y, (m || 1) - 1, d || 1);
}

// ─────────────────────────────────────────────────────────────
// Date/Time Formatting
// ─────────────────────────────────────────────────────────────

/** Format time for display (e.g., "2:00 PM") */
export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    timeZone: SALON_TIME_ZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/** Get relative day text (Today, Tomorrow, or day name) */
export function getRelativeDay(isoString: string): string {
  const date = new Date(isoString);

  const dateYMD = formatYMD(date);
  const todayYMD = formatYMD(new Date());

  // Use UTC-midnight math based on YYYY-MM-DD strings (timezone-safe).
  const daysUntil = Math.round(
    (ymdToUtcMs(dateYMD) - ymdToUtcMs(todayYMD)) / (1000 * 60 * 60 * 24)
  );

  if (daysUntil === 0) {
    return 'Today';
  }
  if (daysUntil === 1) {
    return 'Tomorrow';
  }

  // Return day name for upcoming week
  if (daysUntil <= 7) {
    return date.toLocaleDateString('en-US', { timeZone: SALON_TIME_ZONE, weekday: 'long' });
  }

  // Otherwise return formatted date
  return date.toLocaleDateString('en-US', {
    timeZone: SALON_TIME_ZONE,
    month: 'short',
    day: 'numeric',
  });
}

/** Create display text for next available slot */
export function formatNextSlot(isoString: string): NextSlot {
  const relativeText = getRelativeDay(isoString);
  const timeText = formatTime(isoString);

  return {
    datetime: isoString,
    displayText: `${relativeText} at ${timeText}`,
    relativeText,
  };
}

/** Get dates for the next N days */
export function getUpcomingDates(days: number): string[] {
  const dates: string[] = [];
  for (let i = 0; i < days; i++) {
    // Create a date for "now + i days" and format to salon-local YYYY-MM-DD.
    const date = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
    dates.push(formatYMD(date));
  }

  return dates;
}

/** Get current month in YYYY-MM format */
export function getCurrentMonth(): string {
  return formatYMD(new Date()).slice(0, 7);
}

// ─────────────────────────────────────────────────────────────
// Data Transformations
// ─────────────────────────────────────────────────────────────

/** Placeholder image for stylists without photos */
const PLACEHOLDER_IMAGE = '/images/placeholder-stylist.svg';

/** Transform Acuity calendar to Stylist */
export function transformCalendar(calendar: AcuityCalendar): Stylist {
  // Acuity returns image URLs starting with // (protocol-relative)
  let image = '';
  if (calendar.image && calendar.image !== 'false') {
    image = calendar.image.startsWith('//') ? `https:${calendar.image}` : calendar.image;
  }

  return {
    id: calendar.id,
    name: calendar.name,
    image: image || PLACEHOLDER_IMAGE,
    description: calendar.description || '',
    bookingUrl: `${ACUITY_BASE_BOOKING_URL}&calendarID=${calendar.id}`,
  };
}

/** Transform Acuity appointment type to Service */
export function transformAppointmentType(apt: AcuityAppointmentType): Service {
  return {
    id: apt.id,
    name: apt.name,
    description: apt.description || '',
    duration: apt.duration,
    price: apt.price ? `$${apt.price}` : 'Consultation',
    category: apt.category || 'Other',
    bookingUrl: apt.schedulingUrl || `${ACUITY_BASE_BOOKING_URL}&appointmentType=${apt.id}`,
  };
}

/** Group services by category */
export function groupServicesByCategory(services: Service[]): ServiceCategory[] {
  const categoryMap = new Map<string, Service[]>();

  services.forEach((service) => {
    const existing = categoryMap.get(service.category) || [];
    existing.push(service);
    categoryMap.set(service.category, existing);
  });

  // Convert to array and sort
  const categories: ServiceCategory[] = [];

  // Define preferred order
  const order = ['Haircuts', 'Color', 'Waxing', 'Other'];

  order.forEach((categoryName) => {
    const services = categoryMap.get(categoryName);
    if (services && services.length > 0) {
      categories.push({
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
        services,
      });
      categoryMap.delete(categoryName);
    }
  });

  // Add any remaining categories
  categoryMap.forEach((services, name) => {
    categories.push({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      services,
    });
  });

  return categories;
}

/** Slugify category name for URL */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}
