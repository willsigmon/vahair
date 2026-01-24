# Rebuild Notes & Recommendations

> Notes for rebuilding vahair.studio off Squarespace

---

## Why Leave Squarespace?

Potential reasons to migrate:
- More control over hosting/performance
- Lower ongoing costs
- Custom functionality
- Better SEO control
- Ownership of codebase

---

## Platform Options

| Platform | Pros | Cons | Cost |
|----------|------|------|------|
| **Static (Next.js/Astro)** | Fast, cheap hosting, full control | Requires dev knowledge | ~$0-20/mo |
| **Webflow** | Visual builder, CMS, hosting | Monthly cost, learning curve | $14-39/mo |
| **WordPress** | Huge ecosystem, familiar | Security maintenance, slower | $5-30/mo |
| **Wix** | Easy, includes booking | Similar to Squarespace | $16-45/mo |
| **Custom HTML/CSS** | Simple, fast, cheap | Manual updates | ~$0-10/mo |

**Recommendation:** Static site (Astro or Next.js) deployed to Vercel/Netlify for best performance and cost.

---

## Must-Have Features

1. **Acuity Integration** - Embed or link to booking
2. **Mobile Responsive** - Most users book on phone
3. **Fast Loading** - Under 3s load time
4. **Contact Info** - Prominent phone/email
5. **Google Maps** - Embedded or linked
6. **Social Links** - Instagram especially important for salons
7. **SSL/HTTPS** - Security and SEO

---

## Nice-to-Have Features

1. **Gallery/Portfolio** - Show work samples
2. **Testimonials** - Social proof
3. **Blog** - SEO, updates, tips
4. **Online Store** - Product sales
5. **Gift Cards** - Via Acuity or separate
6. **Newsletter Signup** - Client retention

---

## Content Improvements

### Homepage
- [ ] Stronger hero headline (current is good but could be more specific)
- [ ] Add testimonial/review snippet
- [ ] Feature both stylists with photos
- [ ] Add quick service highlights

### About Page
- [ ] Consistent photo style for both stylists
- [ ] Add years in business (established date)
- [ ] Consider video introduction

### Services Page
- [ ] Add brief descriptions to each service
- [ ] Group related services visually
- [ ] Add "most popular" indicators
- [ ] Include duration estimates

### Contact Page
- [ ] Add contact form (even simple one)
- [ ] Include parking info
- [ ] Add accessibility information
- [ ] FAQ section for common questions

### New: Gallery Page
- [ ] Before/after transformations
- [ ] Color work showcase
- [ ] Categorized by service type

---

## Technical Requirements

### Domain
- Keep: vahair.studio
- Update DNS when ready to switch

### Hosting
- Vercel (free tier sufficient)
- Netlify (free tier sufficient)
- Cloudflare Pages (free tier)

### Performance Targets
- Lighthouse score: 90+
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Mobile-friendly: 100%

### SEO
- Implement all meta tags (see seo-metadata.md)
- Add structured data for HairSalon
- Submit sitemap to Google Search Console
- Set up Google Business Profile

---

## Migration Checklist

### Pre-Launch
- [ ] Build new site
- [ ] Test Acuity integration
- [ ] Test on mobile devices
- [ ] Verify all content accuracy
- [ ] Set up analytics (GA4 or Plausible)
- [ ] Configure email (if using contact form)

### Launch Day
- [ ] Update DNS records
- [ ] Wait for propagation (24-48h)
- [ ] Test live site
- [ ] Set up redirects from old URLs
- [ ] Submit new sitemap to Google

### Post-Launch
- [ ] Monitor for 404 errors
- [ ] Check Search Console for issues
- [ ] Verify Acuity bookings work
- [ ] Cancel Squarespace subscription (after confirmed working)

---

## Acuity Integration Summary

**Simplest approach:**
1. Homepage: "Book Now" button → `https://vahair.as.me`
2. Appointments page: Full iframe embed
3. Services page: Each service links to its Acuity category
4. About page: Each stylist links to their calendar

See `technical/acuity-integration.md` for full code examples.

---

## Questions to Resolve

1. **Gallery:** Want to add portfolio/gallery page?
2. **Store:** Selling products? Need e-commerce?
3. **Blog:** Want to publish content/tips?
4. **Reviews:** Pull from Google or manual display?
5. **Gift cards:** Through Acuity or separate system?
6. **Contact form:** Need one or phone/email sufficient?
7. **Analytics:** Google Analytics or privacy-focused alternative?

---

## Timeline Estimate

| Phase | Tasks | Duration |
|-------|-------|----------|
| Design | Wireframes, mockups | 1-2 days |
| Build | Code site, integrate Acuity | 2-3 days |
| Content | Add all text, images | 1 day |
| Testing | Mobile, forms, booking | 1 day |
| Launch | DNS, verification | 1 day |

**Total:** 5-8 days for a polished static site

---

## Notes

- Current site is clean and minimal - good foundation
- Acuity handles all booking complexity - don't reinvent
- Focus on speed and mobile experience
- Keep the brand voice ("If it makes you feel beautiful... Do It.")
