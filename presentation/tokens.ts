/** ISPark presentation tokens, independent from Vue runtime. */
export const presentationTokens = {
  canvas: { width: 13.333, height: 7.5, unit: 'in', aspectRatio: '16:9' },
  typography: { family: 'Pretendard', fallback: 'Arial', titlePt: 32, headingPt: 24, bodyPt: 18, footnotePt: 10 },
  spacing: { marginXIn: 0.65, marginYIn: 0.45, gapIn: 0.22 },
  colors: { ivory: '#F7F5F0', navy: '#13263F', copper: '#C65B35', slate: '#83909B', white: '#FFFFFF' },
  imageRules: { coverMaxRatio: 0.4, sectionMaxRatio: 0.3, contentMaxRatio: 0.12 },
} as const
export type PresentationTokens = typeof presentationTokens
