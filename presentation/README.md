# ISPark PPT Design System (v1 draft)

A presentation-focused design specification alongside the existing Vue component library. This folder is not exported as a whole. A reviewed subset is public:

```ts
import { PresentationSlide, presentationLayouts, checkSlideContent, setPresentationAssetBase } from '@leechanyong/ispark-ui/presentation'
import '@leechanyong/ispark-ui/presentation.css' // layout styles + Pretendard
```

- Public layouts (v1): `section-cover`, `parallel-message-cards`, `focus-process`. Field specs live in `src/presentation/public/catalog.ts`.
- Pass an optional six-digit HEX `accentColor` to `PresentationSlide` to tint the section-cover gradient and the takeaway band in cards and processes.
- Assets ship under `dist/presentation/`. Serve them from the app and call `setPresentationAssetBase('<base>/')`.

## Fixed rules
- 1040×720 canvas (780×540pt PDF, `slideTokens.canvas`); approved color, font-size and spacing tokens
- Choose layout by content relationship, not visual decoration
- Cover image <= 40%, section <= 30%, ordinary content <= 12%
- Official logos only; do not recreate logos with image generation
- Use separate editable text/shapes in slides; photography stays an image
- Validate numerical and capability claims against evidence
- Do not invent RFP facts, credentials, or project metrics

## Example
```ts
import { jdcExampleSlides, validatePresentationSlide } from './index'
for (const slide of jdcExampleSlides) {
  console.log(validatePresentationSlide(slide))
}
```

## Scope and limits
`validatePresentationSlide` checks structural constraints and claim flags. It does NOT render PPTX or detect visual overflow, contrast, logo accuracy, or typography issues. Those require a future render-and-inspect pipeline.

## Next phase
1. Create editable PPTX masters and layout renderer
2. Add pixel-based snapshot/overflow tests
3. Verify brand logos and JDC RFP-approved language
4. Document layouts in Storybook independently from production Vue components
