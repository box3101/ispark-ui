# ISPark Editable PPTX Renderer (prototype)

Run from the repository root:

```bash
cd presentation/renderer
npm install
node build.mjs ../decks/jdc ../decks/jdc/deck.pptx
```

- Creates editable text and shape objects; does not rasterize slide contents.
- Renders cover, section and three-pillars layout from the existing JDC intermediate specifications.
- Actual official logos and licensed stone-wall photography are **not** bundled.
- This is an original PptxGenJS renderer inspired by GenOffice's design/build/audit workflow, not a GenOffice code copy.
- The renderer is a separate npm project so existing `ispark-ui` package dependencies are unchanged.
- To verify visual output, render the PPTX to PNG and audit clipping and collisions before submitting.
