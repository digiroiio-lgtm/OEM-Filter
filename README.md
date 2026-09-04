# OEM Filter Manufacturer

Premium, static B2B site for OEM Filter Manufacturer: an OEM and private-label
filtration manufacturer serving distributors, importers, wholesalers and
aftermarket brands worldwide.

Design language: industrial editorial (black / off-white / industrial yellow),
oversized headlines, mega-menu navigation and a component-based CSS design
system. No build step is required — the site is plain HTML/CSS/JS.

## Structure

- `index.html` — homepage (16-section layout: hero, filter categories,
  solutions by industry, OEM & private label, buyer proof, numbers, cross
  reference search, manufacturing, R&D, testing lab, certifications,
  insights, export markets, final RFQ)
- `styles.css` — design tokens and the full component system (header,
  mega menus, sliders, product tabs, process rail, cert grid, RFQ forms)
- `js/main.js` — header/mega-menu behavior, mobile drawer, reveal/count-up
  animation, sliders, product tabs, process rail, cross-reference search UI,
  RFQ form handling
- `js/mega-data.js` — mega-menu right-panel content data
- Commercial pages: `/air-filters/`, `/oil-filters/`, `/fuel-filters/`,
  `/cabin-air-filters/` (plus product-family sub-pages), `/oem-solutions/`
  (plus 8 program sub-pages), `/private-label-filters/` (plus 4 category
  sub-pages), `/applications/` (5 industry sub-pages), `/aftermarket/`
  `/filter-cross-reference/`
- E-E-A-T / trust pages: `/about/`, `/manufacturing/`, `/factory/`,
  `/research-development/`, `/testing-laboratory/`, `/quality-control/`,
  `/certifications/`, `/technical-library/`, `/export-markets/`, `/contact/`
- `sitemap.xml`, `robots.txt`

## Content and data policy

- No copy, photography, logos or claims are copied from any third-party
  reference site.
- Statistics ("By the Numbers" section) are left as unverified placeholders
  until real figures are supplied — the acceptance rule for this site is
  that unverified statistics are never published.
- Certifications are published only with a certifying body, certificate
  number, validity date and supporting document. Until verified, cert
  cards show "documentation pending" rather than a fabricated badge.
- Customer/buyer proof is shown as anonymized segments, not named logos,
  until a verified, permitted customer relationship exists.
- Product and process imagery is a labeled placeholder (`.visual-ph`)
  pending real photography — swap in real assets before launch.

## Known gaps / backlog

- Real verified statistics, certifications and customer logos need to be
  supplied and swapped into the relevant sections.
- Product/process photography needs to replace the `.visual-ph` placeholders.
- The RFQ form currently shows a client-side confirmation only; wire
  `action="/request-a-quote/"` to a production endpoint (email, CRM or
  serverless function) before launch.
- The cross-reference search is a UI shell over a static message; connect
  it to a real part-number database for production use.
- Technical library articles are linked but not yet written.
