"""Render emitted PDFs again (not the source HTML) for final visual review."""
from pathlib import Path
import json
import sys
import pymupdf
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parents[2]
out = root / 'tmp/pdfs/final'
out.mkdir(parents=True, exist_ok=True)
paths = [Path(p).resolve() for p in sys.argv[1:]] if len(sys.argv)>1 else list((root / 'output/pdf').glob('*.pdf'))
for path in paths:
    doc = pymupdf.open(path)
    thumbs = []
    fonts = set()
    for i, page in enumerate(doc):
        assert abs(page.rect.width - 780) < 1 and abs(page.rect.height - 540) < 1
        for font in page.get_fonts(full=True):
            fonts.add(font[3])
            if font[2] == 'Type3':
                assert doc.xref_get_key(font[0], 'CharProcs')[0] != 'null', 'Missing embedded glyphs'
            else:
                assert doc.extract_font(font[0])[3], f'Unembedded font: {font}'
        pix = page.get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5))
        pix.save(str(out / f'{path.stem}-{i+1}.png'))
        im = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
        im.thumbnail((390, 270))
        tile = Image.new('RGB', (410, 300), '#e5e8eb')
        tile.paste(im, (10, 10))
        ImageDraw.Draw(tile).text((12, 283), str(i+1), fill='black')
        thumbs.append(tile)
    sheet = Image.new('RGB', (820, 300*((len(thumbs)+1)//2)), 'white')
    for i, im in enumerate(thumbs):
        sheet.paste(im, ((i % 2)*410, (i//2)*300))
    sheet.save(out / f'{path.stem}-contact.png')
    print(json.dumps({'file': path.name, 'pages': len(doc), 'fonts': sorted(fonts), 'allFontsEmbedded': True}))
