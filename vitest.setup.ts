import { setProjectAnnotations } from '@storybook/vue3'
import * as previewAnnotations from './.storybook/preview'

// 전역 데코레이터/파라미터를 Vitest에서도 적용 (테마, 글로벌 스타일 등)
setProjectAnnotations(previewAnnotations)
