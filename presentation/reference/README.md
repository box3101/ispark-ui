# ISPark Presentation Gold Reference v2

Reference: User-approved JDC three-slide collage (cover, chapter divider, content overview), supplied 2026-10-24.

The normalized design geometry is in `jdc-golden-v2.json`. Zones are expressed as fractions of a 16:9 canvas, **approximate targets**, not ground-truth measured image coordinates.

## Visual approval gate

1. Render generated PPTX to PNG at 1600 x 900.
2. Compare reference and render side by side: title x/y, photo/white-space balance, card/diagram density, typography scale, footer positions.
3. Review Korean text at actual presentation size; do not accept simply because the package compiles.
4. Official client/proposer logos must be imported from verified brand assets; never synthesize with generative imagery.
5. Evaluate cover, section, content **separately**. The content slide should not reuse cover's full-bleed photo.
6. Fix visual discrepancies before claiming reference parity.

**Current status:** Layout geometry and QA acceptance requirements registered. The source collage is user-provided media in the conversation; it is *not* stored in the repository. Until approved source photos/logos are added and rendered output is manually inspected, the slides are not visually reference-matched.

## Reference directions
- Editorial typography, navy base and restrained orange emphasis.
- Jeju photo is an art-directed asset, never a stock texture filler.
- Real ISPark blue logo and JDC logo with source verification.
- Content layout needs purpose-built diagrams and clear factual hierarchy, not generic repeated cards.

## Rendered prototype review (2026-10-24)

An editable three-page JDC prototype was rendered locally with PptxGenJS and checked with the slide overflow test (pass). It is **not** visually equivalent to the approved three-slide collage. Photographs were cropped from a previous generated image as temporary imagery; logos were represented as editable text, not authentic brand assets. Before claiming design completion: use official assets, bring hero and body typography closer to reference, compare at equal resolution, and run visual QA.
