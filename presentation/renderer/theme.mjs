/**
 * 렌더러용 테마 상수 — presentation/tokens.ts 의 미러.
 *
 * build.mjs 는 빌드 단계 없이 돌아가는 plain ESM 이라 .ts 를 직접 import 할 수 없다.
 * 그래서 값을 손으로 옮겨 적는데, 어긋나면 조용히 색이 달라진다.
 * src/presentation/renderer-theme.test.ts 가 tokens.ts 와 이 파일을 대조해 드리프트를 막는다.
 *
 * pptxgenjs 규칙: HEX 는 '#' 없이 6자리. 8자리(알파)도 안 된다.
 */

/** 캔버스 — A4 가로. LAYOUT_WIDE(13.333×7.5)를 쓰면 실측 덱과 어긋난다 */
export const CANVAS = { w: 10.83, h: 7.5 }

export const COLOR = {
  navy900: '092E49',
  navy700: '124568',
  blue600: '006FBD',
  blue500: '0290D5',
  blue300: '76B1E1',
  blue100: 'DFEDF6',
  taupe500: '918976',
  orange700: 'B85610',
  orange500: 'D9641A',
  orange400: 'F58220',
  orange100: 'FDE3CA',
  gray900: '1F2937',
  gray500: '6B7684',
  gray200: 'E5E8EB',
  white: 'FFFFFF',
}

/**
 * 글자 크기 — JDC 제안요약서 PDF 6쪽 실측값(pt).
 * 이전 렌더러는 42pt 제목 등 16:9 시절 값을 쓰고 있었다.
 */
export const PT = {
  chip: 18,
  title: 24,
  subheadEn: 8,
  sectionNo: 54,
  cardTitle: 18,
  stepLabel: 16,
  tagline: 12,
  body: 12,
  small: 10,
  footer: 7,
}

export const FONT = 'Pretendard'

/** 안전 여백 — 실측 본문 영역 기준 (캔버스 % ) */
export const SAFE = { x: 3.4, top: 3.3, bottom: 4.5 }

// ── 단위 변환: 측정값이 전부 캔버스 % 라서 % 로 쓰고 인치로 바꾼다 ──
export const px = (pct) => +(CANVAS.w * pct / 100).toFixed(4)
export const py = (pct) => +(CANVAS.h * pct / 100).toFixed(4)

/** %(x, y, w, h) → pptxgenjs 인치 좌표 */
export const box = (x, y, w, h) => ({ x: px(x), y: py(y), w: px(w), h: py(h) })

/**
 * 그린 것을 기록한다. QA 가 이 목록으로 넘침·겹침·여백·대비를 검사한다.
 * PPTX 를 다시 열어 읽는 것보다 그릴 때 받아두는 쪽이 정확하다 —
 * 의도한 글자 크기와 굵기를 그대로 알 수 있기 때문이다.
 */
let recording = null
export function startRecording() { recording = [] ; return recording }
export function stopRecording() { const r = recording; recording = null; return r ?? [] }
const record = (entry) => { if (recording) recording.push(entry) }

/**
 * 텍스트 한 줄. 좌표는 캔버스 % 로 받는다.
 * margin:0 은 필수 — pptxgenjs 텍스트 박스 기본 여백이 들어가면 측정값과 어긋난다.
 */
export function text(slide, value, pos, opts = {}) {
  const { size = PT.body, bold = false, color = COLOR.gray900, align = 'left', valign = 'top', ...rest } = opts
  // 서식 조각 배열은 조각마다 색이 다르다. 묶어서 기본색으로 기록하면 거짓 양성이 난다.
  // 넘침은 전체 문자열로, 대비는 조각별로 봐야 한다.
  if (Array.isArray(value)) {
    const plain = value.map((v) => v.text ?? '').join('')
    record({ kind: 'text', text: plain, ...pos, size, bold, color, measureOnly: true })
    for (const run of value) {
      if (!String(run.text ?? '').trim()) continue
      record({ kind: 'text', text: run.text, ...pos, size: run.options?.fontSize ?? size,
        bold: run.options?.bold ?? bold, color: run.options?.color ?? color, contrastOnly: true })
    }
  } else {
    record({ kind: 'text', text: String(value), ...pos, size, bold, color })
  }
  slide.addText(value, {
    ...box(pos.x, pos.y, pos.w, pos.h),
    fontFace: FONT, fontSize: size, bold, color,
    align, valign, margin: 0, fit: 'shrink',
    ...rest,
  })
}

/** 채움 사각형 */
export function rect(slide, pptx, pos, fill, line) {
  record({ kind: 'rect', ...pos, fill })
  slide.addShape(pptx.ShapeType.rect, {
    ...box(pos.x, pos.y, pos.w, pos.h),
    fill: { color: fill },
    line: line ? { color: line, width: 1 } : { color: fill },
  })
}

/**
 * 원. 중심을 캔버스 %(cx, cy)로 주고 지름은 캔버스 폭 % 로 준다.
 * 실측 덱의 원은 지름 중앙값이 폭의 11.2% 였다.
 * 지름은 인치 기준이라 x·y 모두 d/2 만큼 당겨야 정원이 중심에 온다.
 */
export function circle(slide, pptx, cx, cy, dPct, fill, line) {
  const d = px(dPct)
  slide.addShape(pptx.ShapeType.ellipse, {
    x: +(px(cx) - d / 2).toFixed(4),
    y: +(py(cy) - d / 2).toFixed(4),
    w: d, h: d,
    fill: { color: fill },
    line: line ? { color: line, width: 2 } : { color: fill },
  })
}
