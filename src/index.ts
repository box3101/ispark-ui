// ispark-ui 라이브러리 엔트리
// 외부에서 사용할 컴포넌트와 글로벌 스타일을 export

// 글로벌 스타일 (CSS 변수, 아이콘 클래스, reset) — consumer가 './style.css' import 시 함께 적용
import './styles/main.scss'

// 컴포넌트
export { default as UiButton } from './components/ui/UiButton.vue'
export { default as UiInput } from './components/ui/UiInput.vue'
export { default as UiSelect } from './components/ui/UiSelect.vue'
export type { SelectOption } from './components/ui/UiSelect.vue'
export { default as UiModal } from './components/ui/UiModal.vue'
export { default as UiTable } from './components/ui/UiTable.vue'
export type { TableColumn } from './components/ui/UiTable.vue'

// 디자인 토큰 (TypeScript 타입 + 옵션 키 배열)
// SIZES / INPUT_SIZES / SHAPES + Size / InputSize / Shape 타입
export * from './design-tokens'
