import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import UiFileList from './UiFileList.vue'
import type { FileItem } from './UiFileList.vue'

const sampleFiles: FileItem[] = [
  { id: 1, filename: '출생증명서.pdf', path: 'sample1.pdf', mimetype: 'application/pdf' },
  { id: 2, filename: 'KakaoTalk_photo.jpg', path: 'sample2.jpg', mimetype: 'image/jpeg' },
  { id: 3, filename: '체험단.txt', path: 'sample3.txt', mimetype: 'text/plain' },
]

const meta = {
  title: 'Components/Data/UiFileList',
  component: UiFileList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
파일 목록 표시 컴포넌트. 이미지 파일은 미리보기 썸네일, 일반 파일은 📎 아이콘으로 표시한다.

## 사용 패턴
- \`UiFileUpload\`와 함께 사용하여 파일 첨부 UI 구성
- \`getUrl\` 함수로 파일 경로를 URL로 변환 (서버 환경에 따라 다름)
- \`deletable\` 을 \`false\`로 설정하면 읽기 전용 목록

## API
- **Props**: \`files\` (필수), \`getUrl\` (필수), \`deletable\` (기본: true)
- **Events**: \`delete\` — 삭제 버튼 클릭 시 해당 FileItem 전달
        `,
      },
    },
  },
  argTypes: {
    files: {
      description: '파일 목록 배열',
      table: { category: 'Data', type: { summary: 'FileItem[]' } },
      control: false,
    },
    getUrl: {
      description: '파일 경로를 URL로 변환하는 함수',
      table: { category: 'Data', type: { summary: '(path: string) => string' } },
      control: false,
    },
    deletable: {
      description: '삭제 버튼 표시 여부',
      table: { category: 'State', type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
      control: 'boolean',
    },
  } as never,
} satisfies Meta<typeof UiFileList>

export default meta
type Story = StoryObj<typeof meta>

// 기본 — 이미지 + 일반 파일 혼합
export const Default: Story = {
  render: () => ({
    components: { UiFileList },
    setup() {
      const files = ref([...sampleFiles])
      const getUrl = (path: string) => `https://via.placeholder.com/400x200?text=${path}`
      const onDelete = (file: FileItem) => {
        files.value = files.value.filter(f => f.id !== file.id)
      }
      return { files, getUrl, onDelete }
    },
    template: `
      <div style="max-width: 400px;">
        <UiFileList :files="files" :get-url="getUrl" @delete="onDelete" />
      </div>
    `,
  }),
}

// 읽기 전용 — 삭제 버튼 없음
export const ReadOnly: Story = {
  render: () => ({
    components: { UiFileList },
    setup() {
      const files = ref([...sampleFiles])
      const getUrl = (path: string) => `https://via.placeholder.com/400x200?text=${path}`
      return { files, getUrl }
    },
    template: `
      <div style="max-width: 400px;">
        <UiFileList :files="files" :get-url="getUrl" :deletable="false" />
      </div>
    `,
  }),
}

// 빈 목록 — 아무것도 렌더하지 않음
export const Empty: Story = {
  render: () => ({
    components: { UiFileList },
    setup() {
      const getUrl = (path: string) => path
      return { getUrl }
    },
    template: `
      <div style="max-width: 400px; padding: 16px; background: #f9fafb; border-radius: 8px;">
        <p style="font-size: 13px; color: #9ca3af;">파일이 없으면 아무것도 렌더하지 않습니다:</p>
        <UiFileList :files="[]" :get-url="getUrl" />
      </div>
    `,
  }),
}

// 일반 파일만
export const TextFilesOnly: Story = {
  render: () => ({
    components: { UiFileList },
    setup() {
      const files = ref<FileItem[]>([
        { id: 1, filename: '보고서_2026.pdf', path: 'report.pdf', mimetype: 'application/pdf' },
        { id: 2, filename: '회의록.docx', path: 'meeting.docx', mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
      ])
      const getUrl = (path: string) => `#${path}`
      const onDelete = (file: FileItem) => {
        files.value = files.value.filter(f => f.id !== file.id)
      }
      return { files, getUrl, onDelete }
    },
    template: `
      <div style="max-width: 400px;">
        <UiFileList :files="files" :get-url="getUrl" @delete="onDelete" />
      </div>
    `,
  }),
}
