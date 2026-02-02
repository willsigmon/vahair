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

// ─────────────────────────────────────────────────────────────
// Date/Time Formatting
// ─────────────────────────────────────────────────────────────

/** Format time for display (e.g., "2:00 PM") */
export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/** Get relative day text (Today, Tomorrow, or day name) */
export function getRelativeDay(isoString: string): string {
  const date = new Date(isoString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Reset time for comparison
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());

  if (dateOnly.getTime() === todayOnly.getTime()) {
    return 'Today';
  }
  if (dateOnly.getTime() === tomorrowOnly.getTime()) {
    return 'Tomorrow';
  }

  // Return day name for upcoming week
  const daysUntil = Math.ceil((dateOnly.getTime() - todayOnly.getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntil <= 7) {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  // Otherwise return formatted date
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }

  return dates;
}

/** Get current month in YYYY-MM format */
export function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
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
