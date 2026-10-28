"""Read-only alpha validation; never modifies image pixels."""
from pathlib import Path
import json
from PIL import Image
root=Path('public/presentation/illustrated/icons')
expected=['legacy-server','system-blocks','analytics-review','data-migration','workflow-design','performance-target']
expected += [j['id'] for j in json.loads((root/'expansion-generation.json').read_text(encoding='utf8'))['jobs']]
expected += [j['id'] for j in json.loads((root/'roles-common-generation.json').read_text(encoding='utf8'))['jobs']]
report=[]
for key in expected:
 with Image.open(root/f'{key}.png') as im:
  assert 'A' in im.getbands(), f'{key}: no alpha'
  alpha=im.getchannel('A');hist=alpha.histogram();fraction=hist[0]/(im.width*im.height)
  assert 0.1<fraction<0.95, f'{key}: suspicious transparency'
  amin,amax=alpha.getextrema()
  assert amin==0 and amax>=250, f'{key}: insufficient alpha range'
  # Generated soft shadows can retain alpha=1 (0.4%) at an outer pixel.
  assert all(alpha.getpixel(p)<=2 for p in [(0,0),(im.width-1,0),(0,im.height-1),(im.width-1,im.height-1)]), f'{key}: opaque corner'
  report.append(dict(id=key,size=im.size,transparentFraction=round(fraction,3),visibleBounds=alpha.getbbox()))
out=Path('output/pdf/asset-library');out.mkdir(parents=True,exist_ok=True)
(out/'alpha-qa.json').write_text(json.dumps(report,indent=2),encoding='utf8')
print(json.dumps(report))
