# Redesigned reservation flow

Reserve actions on homepage and Fleet now open `/booking?vehicle=ID` within the redesign. The selected vehicle's original description and specifications, local image and published reference rates are retained.

1. Vehicle overview: photograph, description, six specifications, rate summary.
2. Reservation: original six pick-up/return locations, dates, 08:00–17:00 times in 30-minute intervals, minimum 24-hour rental, six original extras and quantity limits, contact details and email verification, optional extended driver/address fields, coupon and notes.
3. Review: trip, contact, extras, optional driver details, two links to original policy PDFs with acknowledgements.
4. Preview completion: explicitly states that no reservation or confirmation email was created. A labeled link offers the existing live booking site.

Renter input is kept only in the page's form/memory; there are no booking API requests, payment inputs, fabricated totals, emails or confirmation numbers. Only the existing non-personal trip search is read from sessionStorage. Use sample details.

To make this production-ready, the company must supply an approved booking integration for availability/rates, extras pricing, taxes/fees, coupons, renter/driver validation, reservation creation, confirmation/email and error handling. Original same-origin sessionStorage cannot be transferred to another domain. The public fleet endpoint was previously found to expose nested customer data and must not be reused. Optional driver fields and the free-text country calling code / referral fields need final validation against the approved integration. Additional vehicle gallery photographs are not present in the sanitized local dataset.
