# Reusable illustrated presentation assets

## Comparison artwork

`comparison-atlas.png` was generated with built-in `image_gen` from the approved comparison slide. It contains no text. Icons and pale result decorations are selected using 1536×1024 normalized atlas coordinates. These are opaque pale-background regions, not transparent cutouts. `IllustratedComparisonRow` supports an independent `iconSrc` for replacing the main icon. Code colors use JDC tokens; raster colors are not HEX constrained.

Final prompt:
> Make a text-free artwork atlas from this exact slide. Preserve exact canvas aspect ratio and positions of ALL graphical elements, especially three left 3D icons and three right pale watermark icons, background, wave decorations, card outlines, arrows, header band and footer navy band. Remove EVERY letter, Korean character, number, label, underline below text and footer text, reconstruct background underneath. Do not redesign or move anything. All six icons must remain exactly where they are and retain their original sizes. No text anywhere. This will be used as an image atlas with editable HTML text separately.

These assets are generated concept artwork, not documentary photography of a verified location.

- `reference.png`: approved visual reference; never rendered behind editable text.
- `artwork-atlas.png`: text-free artwork master. `ArtworkWindow.vue` selects icon/wave regions without modifying the source image. The atlas contains opaque pale card surfaces, **not transparent icon cutouts**. The default card uses a pale surface and edge feathering; for arbitrary dark backgrounds supply a transparent `iconSrc` instead.
- `jeju-background.png`: separate background, replaceable through the slide's `background` prop.

Generated with the built-in `image_gen` tool, using `reference.png` as input. No generation or external AI request occurs when rendering these components.

Final prompt (artwork atlas):
> Edit this slide into a TEXT-FREE artwork master for rebuilding with editable HTML text. Preserve EXACT composition aspect ratio, all positions, all three card boundaries, three 3D icons, waves, photo backdrop and bottom navy band. Erase ALL Korean and English text, every number including 01 02 03 and footer03. Erase small bottom circular flat icons and arrow connector circles and ribbons between cards. Keep large 3D server/hourglass, cubes/document, chart/magnifier EXACTLY in current positions and shapes. Keep photo, card outlines, wave decoration, navy bottom band and empty orange label. Do not rearrange or redesign. No lettering or digits anywhere. Exact same framing.

Final prompt (background):
> Extract only the full-slide photographic background from this reference slide. Remove ALL text, all cards, all icons, all numbers, arrows, connectors, navy bottom bar and orange label. Inpaint their areas with the same pale Jeju sea coastal landscape. Preserve the top sky, blue sea, distant right island and right coastal wooden path exactly, the left side's white fade and faint blue contour corner lines. Full clean background plate, matching reference aspect ratio and framing. No foreground objects, no text, no panels.
