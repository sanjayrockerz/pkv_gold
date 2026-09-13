# PKV Gold frontend architecture

## Design source map

| Stitch source | React module | Assets | Interaction / responsive note |
| --- | --- | --- | --- |
| Fixed header | `components/navigation/Navigation.tsx` | Font assets from Google Fonts | Desktop CTA; mobile menu |
| Scene 01 — Hero / The Gold | `components/sections/Hero/Hero.tsx` | `public/images/gold-hero.jpg` | Full-width image, stacked mobile layout |
| Scene 02 — The Question | `components/sections/Question/Question.tsx` | None | Editorial text block |
| Scene 03 — Gold Value Calculator | `components/sections/Calculator/CalculatorSection.tsx` | None | Karat buttons and weight slider |
| Scene 04 — Measurement | `components/sections/Measurement/Measurement.tsx` | None | Static readout; animation seam reserved |
| Scene 05 — Purity | `components/sections/Purity/Purity.tsx` | None | Static composition meter; animation seam reserved |
| Scene 06 — Formula | `components/sections/Formula/Formula.tsx` | None | Static formula; animation seam reserved |
| Scene 07 — Process | `components/sections/Process/Process.tsx` | Material Symbols | Four-step audit list |
| Scene 08 — Trust | `components/sections/Trust/Trust.tsx` | None | Testimonial presentation |
| Scene 09 — Sanctuary | `components/sections/Location/Location.tsx` | `public/images/location.jpg` | Maps, phone, WhatsApp actions |
| Scenes 10/11 — Final CTA + footer | `components/sections/FinalCTA/FinalCTA.tsx` | None | Telephone CTA and legal footer |
| Fixed mobile navigation | `components/navigation/BottomNavigation.tsx` | Material Symbols | Mobile-only navigation |

## Data and behavior seams

- `lib/constants.ts` owns contact data, imagery paths, and configured benchmark values.
- `lib/calculator.ts` owns pure valuation calculation and Indian rupee formatting.
- `components/calculator/GoldValueCalculator.tsx` owns calculator state and presentation.
- `components/ui/*` owns repeated presentational primitives without business state.
- Motion is intentionally not wired in Phase 0. Future animation can attach at section seams without changing content or calculator behavior.
