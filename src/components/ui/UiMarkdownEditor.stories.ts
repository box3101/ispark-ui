import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import UiMarkdownEditor from './UiMarkdownEditor.vue'

const meta = {
  title: 'Components/Form/UiMarkdownEditor',
  component: UiMarkdownEditor,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Tiptap 기반 마크다운 WYSIWYG 에디터. 툴바로 서식 적용, 소스 모드 전환 지원.

## API — 핵심
- **\`modelValue\`** \`string\` — v-model (마크다운 문자열)
- **\`editable\`** \`boolean\` — 편집 가능 여부 (기본 \`true\`). \`false\`이면 읽기 전용(뷰어)
- **\`placeholder\`** \`string\` — 에디터 빈 상태 placeholder

## 동작
- **WYSIWYG 모드**: 툴바로 서식(굵게, 기울임, 코드, 표 등) 적용 가능
- **소스 모드**: 툴바 우측 \`</>\` 버튼으로 마크다운 원문 편집 가능
- **읽기 전용** (\`editable: false\`): 툴바 숨김, 렌더링만 표시
- \`update:modelValue\` emit — 마크다운 문자열로 업데이트
        `,
      },
    },
  },
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'v-model — 마크다운 문자열',
      table: { category: 'Data' },
    },
    editable: {
      control: 'boolean',
      description: '편집 가능 여부. false이면 읽기 전용 뷰어로 동작',
      table: { category: 'State', defaultValue: { summary: 'true' } },
    },
    placeholder: {
      control: 'text',
      description: '빈 상태일 때 표시되는 placeholder 텍스트',
      table: { category: 'Content' },
    },
  },
} satisfies Meta<typeof UiMarkdownEditor>

export default meta
type Story = StoryObj<typeof meta>

// ===== 샘플 마크다운 콘텐츠 =====
const SAMPLE_MARKDOWN = `# 마크다운 에디터

**볼드 텍스트**와 *이탤릭 텍스트*를 지원합니다.

## 목록

- 항목 1
- 항목 2
  - 중첩 항목
- 항목 3

## 코드 블록

\`\`\`typescript
const greet = (name: string) => {
  return \`안녕하세요, \${name}!\`
}
\`\`\`

인라인 코드: \`console.log('hello')\`

> 인용문도 지원합니다.
`

const TABLE_MARKDOWN = `## 비교표

| 기능 | 지원 여부 | 비고 |
|------|-----------|------|
| 굵게 | ✅ | **bold** |
| 기울임 | ✅ | *italic* |
| 코드 블록 | ✅ | 구문 강조 포함 |
| 표 | ✅ | 삽입/편집 가능 |
| 링크 | ✅ | 클릭 동작 설정 가능 |
| 이미지 | ❌ | 미지원 |

표 셀을 선택하면 툴바에 표 편집 옵션이 나타납니다.
`

// ===== 1. Playground — 모든 props를 Controls로 조작 =====
export const Playground: Story = {
  args: {
    modelValue: SAMPLE_MARKDOWN,
    editable: true,
    placeholder: '마크다운을 입력하세요...',
  },
  render: (args) => ({
    components: { UiMarkdownEditor },
    setup: () => {
      const value = ref(args.modelValue ?? '')
      return { args, value }
    },
    template: '<UiMarkdownEditor v-bind="args" v-model="value" style="min-height: 260px;" />',
  }),
}

// ===== 2. ReadOnly — editable: false, 뷰어 모드 =====
export const ReadOnly: Story = {
  name: '읽기 전용 (ReadOnly)',
  args: {
    editable: false,
    modelValue: TABLE_MARKDOWN,
  },
  render: (args) => ({
    components: { UiMarkdownEditor },
    setup: () => {
      const value = ref(args.modelValue ?? '')
      return { args, value }
    },
    template: '<UiMarkdownEditor v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      description: {
        story: '`editable: false` — 툴바가 숨겨지고 렌더링 전용 뷰어로 동작합니다. 표 콘텐츠 렌더링 예시.',
      },
    },
  },
}

// ===== 3. Empty — 빈 상태 + placeholder =====
export const Empty: Story = {
  name: '빈 상태 (Empty)',
  args: {
    modelValue: '',
    editable: true,
    placeholder: '내용을 입력하세요. **굵게**, *기울임*, `코드`, 표 등을 지원합니다.',
  },
  render: (args) => ({
    components: { UiMarkdownEditor },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<UiMarkdownEditor v-bind="args" v-model="value" style="min-height: 160px;" />',
  }),
  parameters: {
    docs: {
      description: {
        story: '초기 값이 없을 때 placeholder가 표시됩니다.',
      },
    },
  },
}

// ===== 4. WithTable — 표가 포함된 콘텐츠 =====
export const WithTable: Story = {
  name: '표 포함 (WithTable)',
  args: {
    editable: true,
    modelValue: TABLE_MARKDOWN,
  },
  render: (args) => ({
    components: { UiMarkdownEditor },
    setup: () => {
      const value = ref(args.modelValue ?? '')
      return { args, value }
    },
    template: '<UiMarkdownEditor v-bind="args" v-model="value" style="min-height: 300px;" />',
  }),
  parameters: {
    docs: {
      description: {
        story: '표(Table)가 포함된 마크다운 콘텐츠. 셀 클릭 시 툴바에 표 편집 메뉴가 활성화됩니다.',
      },
    },
  },
}
