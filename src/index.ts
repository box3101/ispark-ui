// ispark-ui 라이브러리 엔트리
// 외부에서 사용할 컴포넌트와 글로벌 스타일을 export

// 글로벌 스타일 (CSS 변수, 아이콘 클래스, reset) — consumer가 './style.css' import 시 함께 적용
import './styles/main.scss'

// 컴포넌트
export { default as UiButton } from './components/ui/UiButton.vue'
