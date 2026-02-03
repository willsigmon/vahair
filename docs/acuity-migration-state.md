# Acuity Appointment Types Migration State

**Last Updated:** 2026-02-02
**Status:** IN PROGRESS

## Completed Services (3 of 12)

| # | Service | Duration | Price | Stylists | Status |
|---|---------|----------|-------|----------|--------|
| 1 | Children's Haircut | 30 min | $30 | Virginia + Kim | ✅ Created |
| 2 | Blowout/Style | 45 min | $45 | All 3 | ✅ Created |
| 3 | Root Touch Up | 60 min | $85 | Virginia + Alyssa | ✅ Created |

## Remaining Services (9 of 12)

| # | Service | Duration | Price | Stylists |
|---|---------|----------|-------|----------|
| 4 | All Over Color | 90 min | $110 | Virginia + Alyssa |
| 5 | Partial Highlights | 90 min | $120 | Virginia + Alyssa |
| 6 | Full Highlights | 120 min | $165 | Virginia + Alyssa |
| 7 | Balayage | 150 min | $195 | Alyssa only |
| 8 | Glaze/Gloss | 30 min | $40 | All 3 |
| 9 | Brazilian Blowout | 120 min | $300 | Virginia only |
| 10 | Deep Conditioning | 30 min | $35 | All 3 |
| 11 | Brow Wax | 15 min | $15 | All 3 |
| 12 | Lip Wax | 15 min | $10 | All 3 |

## Already Existing Services

- Consultation (50 min @ $45) - All 3 stylists
- Women's Haircut (45 min @ $55) - All 3 stylists
- Men's Haircut (30 min @ $35) - Virginia + Kim

## Calendar IDs

- **Virginia Watkins:** 13484734
- **Kim Latham:** 13484780
- **Alyssa Valdes:** 13484805
- **Owner ID:** 38274584

## Key URLs

- **Admin - Appointment Types:** https://secure.acuityscheduling.com/admin/appointment-types
- **Admin - Create New:** https://secure.acuityscheduling.com/admin/appointment-types/new
- **Public Scheduling:** https://app.acuityscheduling.com/schedule.php?owner=38274584

## Important Notes

1. **Private Checkbox:** Must be UNCHECKED for services to appear on public booking
2. **Form Field Names:**
   - Name: `appointmentType.name` (id: "name")
   - Duration: `appointmentType.duration` (id: "duration")
   - Price: `appointmentType.price` (id: "price")
   - Description: `appointmentType.description` (id: "description")
   - Private: `appointmentType.isPrivate` (checkbox)

3. **Calendar Selection Values:**
   - Select All: `appointment-type-calendar-select-all`
   - Virginia: `13484734`
   - Kim: `13484780`
   - Alyssa: `13484805`

## JavaScript Template for Creating Services

```javascript
// Fill form
document.getElementById('name').value = "SERVICE_NAME";
document.getElementById('duration').value = "MINUTES";
document.getElementById('price').value = "PRICE";
document.getElementById('description').value = "DESCRIPTION";

// Trigger input events
['name', 'duration', 'price', 'description'].forEach(id => {
  document.getElementById(id)?.dispatchEvent(new Event('input', { bubbles: true }));
});

// Ensure NOT Private
const privateCheckbox = document.querySelector('input[name="appointmentType.isPrivate"]');
if (privateCheckbox?.checked) privateCheckbox.click();

// Select calendars (use appropriate values)
document.querySelector('input[value="13484734"]')?.click(); // Virginia
document.querySelector('input[value="13484780"]')?.click(); // Kim
document.querySelector('input[value="13484805"]')?.click(); // Alyssa

// Click CREATE
Array.from(document.querySelectorAll('button')).find(b =>
  b.textContent.toLowerCase().includes('create')
)?.click();
```

## Resume Instructions

1. Open Acuity Admin: https://secure.acuityscheduling.com/admin/appointment-types/new
2. Continue from service #4 (All Over Color)
3. Use the JavaScript template above for each service
4. After all services created, verify on public scheduling page
