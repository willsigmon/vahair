# SEO & Metadata

## Current Site Meta Information

### Homepage

```html
<title>Virginia & Co. Hair Studio</title>
<meta name="description" content="[Not explicitly defined - needs to be added]">
```

### Recommended Meta Tags

```html
<!-- Primary Meta Tags -->
<title>Virginia & Co. Hair Studio | Rolesville, NC Hair Salon</title>
<meta name="title" content="Virginia & Co. Hair Studio | Rolesville, NC Hair Salon">
<meta name="description" content="Expert hair services in downtown Rolesville, NC. Cuts, color, highlights, Brazilian blowouts & more. Book online with Virginia or Kim today.">
<meta name="keywords" content="hair salon, Rolesville NC, haircut, hair color, highlights, foils, Brazilian blowout, waxing, Virginia Page">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.vahair.studio/">
<meta property="og:title" content="Virginia & Co. Hair Studio | Rolesville, NC">
<meta property="og:description" content="Expert hair services in downtown Rolesville. Cuts, color, highlights & more. Book online today.">
<meta property="og:image" content="[hero-image-url]">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://www.vahair.studio/">
<meta property="twitter:title" content="Virginia & Co. Hair Studio | Rolesville, NC">
<meta property="twitter:description" content="Expert hair services in downtown Rolesville. Cuts, color, highlights & more. Book online today.">
<meta property="twitter:image" content="[hero-image-url]">

<!-- Geo -->
<meta name="geo.region" content="US-NC">
<meta name="geo.placename" content="Rolesville">
<meta name="geo.position" content="35.9232013;-78.4577758">
<meta name="ICBM" content="35.9232013, -78.4577758">
```

---

## Structured Data (JSON-LD)

Add to homepage for rich search results:

```json
{
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "name": "Virginia & Co. Hair Studio",
  "alternateName": "Virginia Page & Co. Hair Studio",
  "url": "https://www.vahair.studio",
  "logo": "[logo-url]",
  "image": "[hero-image-url]",
  "telephone": "+1-919-671-8353",
  "email": "vacohairstudio@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "104 South Main Street",
    "addressLocality": "Rolesville",
    "addressRegion": "NC",
    "postalCode": "27571",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 35.9232013,
    "longitude": -78.4577758
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Tuesday",
      "opens": "10:15",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Wednesday",
      "opens": "10:15",
      "closes": "16:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Thursday",
      "opens": "10:30",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Friday",
      "opens": "10:00",
      "closes": "14:00"
    }
  ],
  "sameAs": [
    "[instagram-url]",
    "[facebook-url]",
    "[youtube-url]"
  ],
  "priceRange": "$$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Credit Card"
}
```

---

## Page-Specific Titles & Descriptions

| Page | Title | Description |
|------|-------|-------------|
| Home | Virginia & Co. Hair Studio \| Rolesville, NC | Expert hair services in downtown Rolesville. Cuts, color, highlights & more. Book online today. |
| About | About Us \| Virginia & Co. Hair Studio | Meet Virginia and Kim - over 40 years combined experience bringing out your best look in Rolesville, NC. |
| Services | Hair Services & Pricing \| Virginia & Co. Hair Studio | Haircuts from $30, color from $75, Brazilian blowouts & more. View our full service menu and pricing. |
| Contact | Contact & Hours \| Virginia & Co. Hair Studio | Visit us at 104 South Main Street, Rolesville NC. Open Tue-Fri. Call (919) 671-8353 or email us. |
| Appointments | Book Online \| Virginia & Co. Hair Studio | Schedule your next hair appointment online. Choose your stylist and service for instant booking. |

---

## Robots.txt Recommendation

```
User-agent: *
Allow: /

Sitemap: https://www.vahair.studio/sitemap.xml
```

---

## Google Business Profile

Ensure these details match on Google Business:
- Business name: Virginia & Co. Hair Studio
- Category: Hair Salon
- Address: 104 South Main Street, Rolesville, NC 27571
- Phone: (919) 671-8353
- Website: https://www.vahair.studio
- Hours: As listed above
- Appointment URL: https://app.acuityscheduling.com/schedule.php?owner=38274584
