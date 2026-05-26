# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Antex MedDirectory** — a single-page health facility finder for Addis Ababa, Ethiopia. Vanilla HTML/CSS/JS, no build step, no framework, no package.json. Three files total:

| File | Role |
|------|------|
| `index.html` | Full page markup, all modals, overlays, and static sections |
| `styles.css` | All styling; CSS custom properties as design tokens |
| `script.js` | All behaviour; one giant `DOMContentLoaded` closure (~3 000 lines) |

## Deployment

No build. Edit files → push to `main` → GitHub Pages serves them.

```bash
git add -A && git commit -m "..." && git push
```

Cache-bust by bumping query-string versions in `index.html`:
```html
<link rel="stylesheet" href="styles.css?v=4.5" />
<script src="script.js?v=4.5"></script>
```

Bump both versions together whenever CSS or JS changes.

## script.js Architecture

Everything lives inside a single `document.addEventListener("DOMContentLoaded", function() { … })`. Variables declared at the top of that callback are accessible everywhere inside it — this is the intentional shared state pattern.

### Key shared-state variables (top of DOMContentLoaded)
```javascript
var hasNewNews = false;          // flip to show red dot on News tab
var openNearMeWheel = null;      // set by Near Me wheel IIFE; called by tab/hero button
var _nearMeCategoryFilter = "";  // set by wheel selection before GPS fires
var _nearMeSpecialtyFilter = ""; // set by specialty drill-down inside the wheel
```

### Named sections (in order)
1. **Facility data** (`const facilities = [...]`) — 89 objects, IDs 1–89, lines 8–1741
2. **DOM references** — all `getElementById` calls centralised here
3. **Helpers** — `getFacilityTypeInfo`, `getFacilityInitials`, `getFacilityGradient`, `capitalize`, `ensureHttp`, `socialSvg`
4. **`SPECIALTY_TYPES` constant** — single source of truth used by sub-tabs, filter dropdown, and Near Me wheel
5. **`runFilter()`** — reads all filter dropdowns and returns a filtered `facilities` array
6. **`buildFacilityCard(facility)`** — returns HTML string for one card (no DOM writes)
7. **`renderPage(append)`** — writes a page of cards to `#resultsGrid`; manages Show More/Less button
8. **`renderResults(results)`** — sets `_allResults`/`_curPage`, delegates to `renderPage`
9. **`buildSpecialtySubTabs()` / `filterBySpecialtyType(val)`** — specialty chip row logic
10. **`buildStatPills()`** — creates category pill buttons; Specialty Centers pill triggers sub-tabs instead of direct render
11. **`initNearMe(lat, lng)`** — filters by `_nearMeCategoryFilter` + `_nearMeSpecialtyFilter`, builds Leaflet map, renders nearby cards
12. **IIFEs** (execute immediately, use closure scope):
    - Top nav (About/News/Quiz/Contact panels)
    - Hero search autocomplete
    - Near Me category wheel (`openNearMeWheel` assigned here)
    - Hero Near Me button
    - Stat pills arrow scroll
13. **INIT** — `buildStatPills()` then `renderResults(facilities)` at the very bottom

### Globally exposed functions (callable from inline `onclick`)
- `window.openCorrectionModal(facilityName)` — opens the correction request modal
- `window.selectSpecialtyType(val)` — programmatically activates a specialty chip

### Critical gotcha — array `subCity`
Some facilities have multiple branches, so `subCity` can be a string **or** an array. Always guard:
```javascript
const sc = Array.isArray(f.subCity) ? f.subCity[0] : f.subCity;
```
Same applies to `f.area` and `f.location`.

## Facility Data Schema

```javascript
{
  id: Number,
  name: String,
  facilityType: "general" | "speciality" | "medical_plaza" | "diagnostic" |
                "ambulance" | "homecare" | "telemedicine" | "pharmacy" | "financing",
  specialty: String,                  // primary specialty label
  specialtyCategory: String|Array,    // used by sub-filters for "speciality" type
  specialServices: String,
  subCity: String|Array,              // can be array for multi-branch facilities
  area: String|Array,
  location: String|Array,
  map: String|Array,                  // Google Maps URL(s)
  contact: String,                    // "/" separated phone numbers
  telegram: String,
  website: String,
  email: String,
  availability: String,
  // Optional social/app fields:
  facebook, instagram, linkedin, tiktok, twitter, youtube,
  whatsapp, booking, bookingLabel, ios_app, android_app,
  accentColor, monogram           // override gradient avatar colour / initials
}
```

`facilityType: "medical_plaza"` is treated as a sub-type of `"speciality"` throughout the filter logic — always include it when querying specialty centers:
```javascript
f.facilityType === "speciality" || f.facilityType === "medical_plaza"
```

## CSS Design Tokens (`:root`)

Primary colours: `--navy` `#0A2647`, `--teal` `#1B98E0`.  
Font: `--font` (Poppins).  
Border-radius scale: `--radius-sm` → `--radius-full`.  
Shadow scale: `--shadow-sm` → `--shadow-xl`.

Responsive breakpoints: 1024px, 768px (stat-pills arrows hidden), 640px, 520px (tabs compact), 480px (Near Me wheel shrinks).

## Adding a New Facility

Append an object to the `facilities` array in `script.js`. Use the next sequential `id`. Match existing `facilityType` values exactly (case-sensitive). Re-bump the `script.js?v=` query string.

## Near Me Wheel Flow

1. User clicks Near Me tab **or** hero 📍 button → `openNearMeWheel()` is called
2. Wheel shows 5 radial category options; JS computes `--tx`/`--ty` CSS vars for radial positioning
3. If user taps 🏨 Specialty Center → specialty drill-down list appears inside the same modal
4. User optionally picks a specialty → sets `_nearMeSpecialtyFilter`
5. User taps **Locate Me** → `activateTab("nearme", false)` (bypasses wheel interception), then `nearMeBtn.click()` triggers GPS → `initNearMe(lat, lng)`
