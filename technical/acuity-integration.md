# Acuity Scheduling Integration Guide

> How to embed vahair's Acuity booking system into the website

## Account Details

| Item | Value |
|------|-------|
| **Booking URL** | https://app.acuityscheduling.com/schedule.php?owner=38274584 |
| **Account Owner** | Virginia Page & Co. Hair Studio |
| **Account Type** | Standalone (migrated from Squarespace-connected 2026-02-02) |
| **Owner ID** | 38274584 |
| **Timezone** | America/New_York |
| **Time Format** | 12-hour (AM/PM) |

---

## Integration Options

### Option 1: Inline Embed (Recommended)

Embed the full scheduler directly on your appointments page:

```html
<iframe
  src="https://app.acuityscheduling.com/schedule.php?owner=38274584"
  title="Schedule Appointment"
  width="100%"
  height="800"
  frameBorder="0"
></iframe>
```

**Responsive version:**
```html
<div style="width: 100%; max-width: 1000px; margin: 0 auto;">
  <iframe
    src="https://app.acuityscheduling.com/schedule.php?owner=38274584"
    title="Schedule Appointment"
    width="100%"
    height="800"
    frameBorder="0"
    style="border: none;"
  ></iframe>
</div>
```

---

### Option 2: Popup Widget

Add a floating "Book Now" button that opens scheduler in a modal:

```html
<!-- Add to <head> -->
<script src="https://embed.acuityscheduling.com/js/embed.js" type="text/javascript"></script>

<!-- Add button anywhere -->
<a href="https://app.acuityscheduling.com/schedule.php?owner=38274584" class="acuity-embed-button" style="
  background: #000;
  color: #fff;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
">Book Now</a>
```

---

### Option 3: Direct Links

Simple links to the booking page (opens in new tab):

```html
<!-- Generic booking -->
<a href="https://app.acuityscheduling.com/schedule.php?owner=38274584" target="_blank">Book an Appointment</a>

<!-- Specific stylist -->
<a href="https://app.acuityscheduling.com/schedule.php?owner=38274584&calendarID=13484734" target="_blank">Book with Virginia</a>
<a href="https://app.acuityscheduling.com/schedule.php?owner=38274584&calendarID=13484780" target="_blank">Book with Kim</a>
<a href="https://app.acuityscheduling.com/schedule.php?owner=38274584&calendarID=13484805" target="_blank">Book with Alyssa</a>

<!-- Specific service category -->
<a href="https://app.acuityscheduling.com/schedule.php?owner=38274584&appointmentType=category:Color" target="_blank">Book Color Service</a>
<a href="https://app.acuityscheduling.com/schedule.php?owner=38274584&appointmentType=category:Haircuts" target="_blank">Book Haircut</a>
<a href="https://app.acuityscheduling.com/schedule.php?owner=38274584&appointmentType=category:Waxing" target="_blank">Book Waxing</a>
```

---

## Stylist Direct Booking URLs

| Stylist | Calendar ID | Direct URL |
|---------|-------------|------------|
| Virginia | 13484734 | `https://app.acuityscheduling.com/schedule.php?owner=38274584&calendarID=13484734` |
| Kim | 13484780 | `https://app.acuityscheduling.com/schedule.php?owner=38274584&calendarID=13484780` |
| Alyssa | 13484805 | `https://app.acuityscheduling.com/schedule.php?owner=38274584&calendarID=13484805` |

---

## Service Category URLs

| Category | URL |
|----------|-----|
| All Services | `https://app.acuityscheduling.com/schedule.php?owner=38274584` |
| Color Services | `https://app.acuityscheduling.com/schedule.php?owner=38274584&appointmentType=category:Color` |
| Haircuts | `https://app.acuityscheduling.com/schedule.php?owner=38274584&appointmentType=category:Haircuts` |
| Waxing | `https://app.acuityscheduling.com/schedule.php?owner=38274584&appointmentType=category:Waxing` |

---

## Acuity Features Currently Enabled

- [x] Client phone number required
- [x] Clients can reschedule
- [x] Clients can cancel
- [x] SMS reminders
- [x] Recurring appointment option
- [x] Multiple time slot selection

---

## Customization in Acuity Admin

To customize the booking experience, log into Acuity admin and adjust:

1. **Appearance** - Colors, fonts, logo
2. **Intake Forms** - Client information fields
3. **Notifications** - Email/SMS templates
4. **Policies** - Cancellation, deposits, etc.

---

## Implementation Recommendation

For the new site, we use:

1. **Appointments page:** Full iframe embed
2. **Homepage:** "Book Now" button linking directly to Acuity
3. **Services page:** Link each service to its booking category
4. **About page:** Link each stylist bio to their direct booking URL

This gives clients multiple easy paths to booking while keeping all scheduling logic in Acuity (no need to maintain calendar on your site).
