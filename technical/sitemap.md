# Site Structure & Sitemap

## Current Pages (from Squarespace sitemap)

| Page | URL | Status | Notes |
|------|-----|--------|-------|
| Home | `/` or `/home` | Active | Main landing page |
| About | `/about` | Active | Team bios |
| Services | `/services` | Active | Current pricing |
| Contact | `/contact` | Active | Hours & location |
| Appointments | `/appointments` | Active | Booking embed/link |
| Schedule | `/schedule-1` | Legacy? | Duplicate of appointments |
| Services Old | `/services-old` | Legacy | Should be removed |

---

## Recommended Site Structure (New Build)

```
/                      # Homepage
├── /about             # Team & story
├── /services          # Full service menu with pricing
├── /contact           # Location, hours, contact form
├── /book              # Acuity embed (or /appointments)
└── /sitemap.xml       # Auto-generated
```

**Remove from new build:**
- `/schedule-1` (duplicate)
- `/services-old` (outdated)
- `/home` (use `/` as canonical)

---

## Navigation Menu

**Primary Nav:**
1. About
2. Services
3. Contact
4. Book Now (CTA button styling)

**Footer Nav:**
- About
- Services
- Contact
- Book Now
- [Social icons]

---

## Redirects Needed (If Keeping Domain)

```
/home → / (301)
/schedule-1 → /book (301)
/services-old → /services (301)
/appointments → /book (301) [if renaming]
```

---

## Sitemap.xml Template

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.vahair.studio/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.vahair.studio/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.vahair.studio/services</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.vahair.studio/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.vahair.studio/book</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

---

## External Links

| Destination | URL | Where Used |
|-------------|-----|------------|
| Acuity Booking | https://app.acuityscheduling.com/schedule.php?owner=38274584 | Book Now buttons |
| Instagram | [TBD] | Social icons |
| Facebook | [TBD] | Social icons |
| YouTube | [TBD] | Social icons |
| Google Maps | [Generated from address] | Contact page |
