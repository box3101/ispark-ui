import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import UiFileUpload from './UiFileUpload.vue'
import UiFileList from './UiFileList.vue'
import type { FileItem } from './UiFileList.vue'

const meta = {
  title: 'Components/Data/UiFileUpload',
  component: UiFileUpload,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
파일 선택 버튼 컴포넌트. 파일 선택 시 \`upload\` 이벤트로 원본 \`File\` 객체를 전달한다.

## 설계 원칙
- **UI만 담당** — API 호출은 부모 컴포넌트가 처리
- **UiFileList와 조합** — 파일 목록 표시 + 업로드 버튼을 함께 사용
- 같은 파일 재선택 가능 (내부에서 input 초기화)

## API
- **Props**: \`loading\`, \`accept\`, \`label\`, \`disabled\`
- **Events**: \`upload\` — 파일 선택 시 \`File\` 객체 전달
        `,
      },
    },
  },
  argTypes: {
    loading: {
      description: '업로드 진행 중 상태 — true이면 "업로드 중..." 표시 + 클릭 비활성',
      table: { category: 'State', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      control: 'boolean',
    },
    accept: {
      description: '허용 파일 형식 (HTML input accept 속성)',
      table: { category: 'Config', type: { summary: 'string' }, defaultValue: { summary: 'undefined' } },
      control: 'text',
    },
    label: {
      description: '버튼 라벨 텍스트',
      table: { category: 'Content', type: { summary: 'string' }, defaultValue: { summary: "'+ 파일 추가'" } },
      control: 'text',
    },
    disabled: {
      description: '비활성화',
      table: { category: 'State', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      control: 'boolean',
    },
  } as never,
} satisfies Meta<typeof UiFileUpload>

export default meta
type Story = StoryObj<typeof meta>

// Controls로 모든 props 조작
export const Playground: Story = {
  args: {
    loading: false,
    accept: undefined,
    label: '+ 파일 추가',
    disabled: false,
  },
  render: (args) => ({
    components: { UiFileUpload },
    setup: () => ({ args }),
    template: '<UiFileUpload v-bind="args" />',
  }),
}

// 기본 상태
export const Default: Story = {
  render: () => ({
    components: { UiFileUpload },
    setup() {
      const onUpload = (file: File) => {
        alert(`선택된 파일: ${file.name} (${(file.size / 1024).toFixed(1)}KB)`)
      }
      return { onUpload }
    },
    template: '<UiFileUpload @upload="onUpload" />',
  }),
}

// 업로드 중 상태
export const Loading: Story = {
  render: () => ({
    components: { UiFileUpload },
    template: '<UiFileUpload :loading="true" />',
  }),
}

// 이미지만 허용
export const ImageOnly: Story = {
  render: () => ({
    components: { UiFileUpload },
    template: '<UiFileUpload accept="image/*" label="+ 이미지 추가" />',
  }),
}

// 비활성화
export const Disabled: Story = {
  render: () => ({
    components: { UiFileUpload },
    template: '<UiFileUpload :disabled="true" />',
  }),
}

// UiFileList + UiFileUpload 조합
export const WithFileList: Story = {
  render: () => ({
    components: { UiFileList, UiFileUpload },
    setup() {
      const files = ref<FileItem[]>([
        { id: 1, filename: '보고서.pdf', path: 'report.pdf', mimetype: 'application/pdf' },
      ])
      const loading = ref(false)
      let nextId = 2
      const getUrl = (path: string) => `#${path}`
      const onDelete = (file: FileItem) => {
        files.value = files.value.filter(f => f.id !== file.id)
      }
      const onUpload = (file: File) => {
        loading.value = true
        // 업로드 시뮬레이션
        setTimeout(() => {
          files.value.push({
            id: nextId++,
            filename: file.name,
            path: file.name,
            mimetype: file.type,
          })
          loading.value = false
        }, 1000)
      }
      return { files, loading, getUrl, onDelete, onUpload }
    },
    template: `
      <div style="max-width: 400px;">
        <UiFileList :files="files" :get-url="getUrl" @delete="onDelete" />
        <UiFileUpload :loading="loading" @upload="onUpload" style="margin-top: 8px;" />
      </div>
    `,
  }),
}
