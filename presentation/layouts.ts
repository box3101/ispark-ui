export const presentationLayouts = {
  cover: { id: 'cover', intent: 'single-message', maxHeadlineLines: 2, maxBodyWords: 18 },
  section: { id: 'section', intent: 'chapter-transition', maxHeadlineLines: 2, maxBodyWords: 12 },
  threePillars: { id: 'three-pillars', intent: 'three-parallel-concepts', items: 3 },
  comparison: { id: 'comparison', intent: 'before-after', items: 2 },
  process: { id: 'process', intent: 'sequence', itemsMin: 3, itemsMax: 6 },
  architecture: { id: 'architecture', intent: 'systems-and-data-flow' },
  evidence: { id: 'evidence', intent: 'claim-and-verifiable-proof' },
} as const
export type PresentationLayoutId = keyof typeof presentationLayouts
