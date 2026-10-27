import { presentationTokens } from '../../../presentation/tokens'

/** Presentation profile; PDF uses 0.75 pt per CSS px. No automatic font shrinking. */
export const slideTokens = {
  canvas: { width: 1040, height: 720 },
  type: { display: 64, title: 42, result: 28, heading: 26, body: 24, supporting: 20, label: 17, source: 12 },
  spacing: { margin: 48, headerBottom: 158, bodyBottom: 586, footerTop: 664, gap: 24 },
  limits: { comparisonRows: 3, traceRows: 3, processSteps: 4, strategyItems: 3, timelineRows: 5 },
  colors: presentationTokens.colors,
} as const

export const themeVariables = {
  ...Object.fromEntries(Object.entries(slideTokens.colors).map(([k,v]) => [`--ds-${k}`,v])),
  ...Object.fromEntries(Object.entries(slideTokens.type).map(([k,v]) => [`--ds-${k}`,`${v}px`])),
}

export function assertCount(name: string, items: unknown[], min: number, max: number) {
  if (!Array.isArray(items) || items.length < min || items.length > max)
    throw new Error(`${name}: ${min}~${max} items required; split the slide instead of shrinking text`)
}
export function assertText(name: string, value: string, max: number) {
  if (typeof value !== 'string' || !value.trim() || [...value].length > max)
    throw new Error(`${name}: nonempty text <= ${max} characters required`)
}
