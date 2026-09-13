# PKV Gold layout audit

## Repro and root causes

- [x] Hero text clipping: the display title had an intrinsic width larger than its content column; the hero also owned the animation clip boundary.
- [x] Calculator clipping: the instrument grid used a hard `minmax(480px, 1.22fr)` minimum before the tablet breakpoint.
- [x] Section clipping: several scenes use `overflow: hidden`, which can hide transformed content rather than only decorative media.
- [x] Horizontal overflow: document width is currently stable at the audited desktop size, but the title and calculator intrinsic widths were unsafe at narrower widths.
- [x] Vertical overflow: pinned scenes and fixed navigation were reviewed against viewport height and mobile bottom navigation.
- [x] Image overflow: hero media may be clipped for composition, but text no longer shares that clipping boundary.
- [x] Typography overflow: display headings did not have a separate reveal wrapper and safe inline width.
- [x] Animation-mask overflow: the hero scene itself was masked; the mask now belongs to the hero background layer.
- [x] Viewport width calculations: centralized page gutters now use the available content width instead of mixed fixed values.
- [x] Scrollbar width issues: layout uses `100%`/available width rather than `100vw` for content.
- [x] Mobile breakpoints: mobile is a single-column composition with natural scrolling.
- [x] Tablet layout: the calculator and hero switch before their intrinsic minimums are reached.
- [x] Desktop layout: editorial two-column composition remains intact with bounded content.
- [x] Pinned scene dimensions: formula/process pinning is desktop-only and released on mobile.
- [x] Fixed/absolute elements: navigation, bottom navigation, hero footer, and map tags were checked for safe insets.
- [x] CTA overflow: CTA rows use bounded widths and wrap/stack at narrow breakpoints.
- [x] Navigation overflow: mobile hides the desktop CTA and keeps menu hit areas above 44px.
- [x] Accessibility: headings, labels, focus states, tabs, controls, and landmarks remain semantic.
- [x] Reduced motion: ScrollTrigger is bypassed and CSS motion is reduced while content remains visible.

## Verification

- Desktop computed-layout audit: no document horizontal overflow; title intrinsic width exceeded its parent before the fix.
- Production build: passed.
- Lint: passed.
