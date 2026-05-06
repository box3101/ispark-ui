// 값의 단일 소스는 src/styles/tokens/_size.scss
// 여기서는 prop 타입 안전성과 Storybook argTypes용 키 배열만 export

// 액션 컴포넌트용(UiButton 등) — xs(24px) ~ lg(40px)
export const SIZES = ['xs', 'sm', 'md', 'lg'] as const
export type Size = (typeof SIZES)[number]

// 폼 입력 컴포넌트용(UiInput, UiTextarea 등)
// — xs는 입력에 너무 작아 제외, auth(44px)는 로그인 폼 전용
export const INPUT_SIZES = ['sm', 'md', 'lg', 'auth'] as const
export type InputSize = (typeof INPUT_SIZES)[number]
