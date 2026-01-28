/**
 * Acuity API - Public exports
 */

// Re-export types
export type {
  AcuityCalendar,
  AcuityAppointmentType,
  AcuityTimeSlot,
  AcuityAvailabilityDate,
  Stylist,
  NextSlot,
  Service,
  ServiceCategory,
  ApiResponse,
} from './types';

// Re-export client functions
export {
  getCalendars,
  getAppointmentTypes,
  getAvailableDates,
  getAvailableTimes,
  isAcuityConfigured,
} from './client';

// Re-export cache utilities
export {
  withCache,
  clearCache,
  clearAllCache,
  availabilityCacheKey,
  servicesCacheKey,
  stylistsCacheKey,
  CacheTTL,
} from './cache';

// Re-export helpers
export {
  formatTime,
  getRelativeDay,
  formatNextSlot,
  getUpcomingDates,
  getCurrentMonth,
  transformCalendar,
  transformAppointmentType,
  groupServicesByCategory,
  slugify,
} from './helpers';
