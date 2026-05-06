// 값의 단일 소스는 src/styles/tokens/_size.scss
// 여기서는 prop 타입 안전성과 Storybook argTypes용 키 배열만 export
export const SIZES = ['xs', 'sm', 'md', 'lg'] as const
export type Size = (typeof SIZES)[number]
