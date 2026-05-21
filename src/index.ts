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
export { default as UiEmpty } from './components/ui/UiEmpty.vue'
export { default as UiBadge } from './components/ui/UiBadge.vue'
export type { BadgeVariant, BadgeSize } from './components/ui/UiBadge.vue'
export { default as UiBadgeGroup } from './components/ui/UiBadgeGroup.vue'
export { default as UiLoading } from './components/ui/UiLoading.vue'
export { default as UiToggle } from './components/ui/UiToggle.vue'
export { default as UiCheckbox } from './components/ui/UiCheckbox.vue'
export { default as UiRadio } from './components/ui/UiRadio.vue'
export { default as UiTextarea } from './components/ui/UiTextarea.vue'
export { default as UiTooltip } from './components/ui/UiTooltip.vue'
export { default as UiPagination } from './components/ui/UiPagination.vue'
export { default as UiDropdownMenu } from './components/ui/UiDropdownMenu.vue'
export type { DropdownMenuItemDef } from './components/ui/UiDropdownMenu.vue'
export { default as UiTab } from './components/ui/UiTab.vue'
export type { TabItem } from './components/ui/UiTab.vue'
export { default as UiToast } from './components/ui/UiToast.vue'
export { default as UiDatePicker } from './components/ui/UiDatePicker.vue'
export { default as UiDateRangePicker } from './components/ui/UiDateRangePicker.vue'
export type { DateRange } from './components/ui/UiDateRangePicker.vue'
export { default as UiAccordion } from './components/ui/UiAccordion.vue'
export type { AccordionItemDef } from './components/ui/UiAccordion.vue'

// Toast composable — 어디서든 openToast() 호출
export { openToast, closeToast } from './composables/useToast'
export type {
  ToastType,
  ToastPlacement,
  ToastOptions,
  ToastItem,
} from './composables/useToast'

// 디자인 토큰 (TypeScript 타입 + 옵션 키 배열)
// SIZES / INPUT_SIZES / SHAPES + Size / InputSize / Shape 타입
export * from './design-tokens'
