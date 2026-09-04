# OEM Filter Manufacturer

Static, people-first B2B sourcing site for OEM, aftermarket and private-label
filtration programs. The homepage provides category discovery and a structured
RFQ flow for part numbers, applications, annual quantities and bulk uploads.

Open `index.html` in a browser to preview the site. The form currently provides
client-side validation and is ready to connect to the production RFQ endpoint.

## Front end

- `styles.css` — the whole design system: yellow/black/white editorial layout,
  a floating pill header that goes transparent over the hero, oversized
  two-tone display headings, bordered card grids and hairline rules.
- `script.js` — header scroll state, mobile navigation, the industry slider,
  segment tabs, the catalog search hand-off into the RFQ form, and RFQ
  validation.
- Pages: `index.html`, `oil-filters/`, `air-filters/`.

### Design tokens

Colours, spacing, type scale and motion easing all live in the `:root` block at
the top of `styles.css`. Changing a token there propagates across every page.

### Dropping in photography

The hero and the industry slider ship with generated tonal placeholders so the
site stands up with no binary assets. Point them at real images by setting one
custom property — everything else (overlays, veils, contrast) already accounts
for a photo being present:

```css
.hero { --hero-photo: url("assets/hero.jpg"); }
.industry-scene { --slide-photo: url("assets/agriculture.jpg"); }
```

Product thumbnails are inline SVG line-art defined once as `<symbol>`s at the
top of `index.html` and referenced with `<use>`.

### Typography

Display type is Inter Tight, loaded from Google Fonts, with a system grotesque
fallback stack so the layout holds if the webfont is unavailable.
