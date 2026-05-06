// 값의 단일 소스는 src/styles/tokens/_shape.scss
export const SHAPES = ['rounded', 'pill', 'circle'] as const
export type Shape = (typeof SHAPES)[number]
