// 값의 단일 소스는 src/styles/tokens/_size.scss
// 여기서는 prop 타입 안전성과 Storybook argTypes용 키 배열만 export

/** 액션 컴포넌트용(UiButton 등) — xxs(24) / xs(26) / sm(30) / md(32) / lg(34) / xlg(36) */
export const SIZES = ['xxs', 'xs', 'sm', 'md', 'lg', 'xlg'] as const
export type Size = (typeof SIZES)[number]

/** 폼 입력(UiInput 등) — sm(30) / md(32) / lg(34) / xlg(36) / auth(44). xs·xxs 제외 */
export const INPUT_SIZES = ['sm', 'md', 'lg', 'xlg', 'auth'] as const
export type InputSize = (typeof INPUT_SIZES)[number]

/**
 * 셀렉트 트리거(UiSelect) —
 * xs(26)는 DatePicker 내부 년/월 등 좁은 영역용.
 * xlg(36) / auth(44) 포함.
 */
export const SELECT_SIZES = ['xs', 'sm', 'md', 'lg', 'xlg', 'auth'] as const
export type SelectSize = (typeof SELECT_SIZES)[number]
