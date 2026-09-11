import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, onBeforeUnmount } from 'vue'
import UiFileUpload from './UiFileUpload.vue'
import UiFileList from './UiFileList.vue'
import type { FileItem } from './UiFileList.vue'

const meta = {
  title: 'Components/Data/UiFileUpload', component: UiFileUpload, tags: ['autodocs'],
  parameters: { layout: 'padded', docs: { description: { component: `버튼형과 드래그형 파일 선택 UI입니다. 실제 서버 업로드는 부모 화면에서 처리합니다.

- **variant**: button (기본) / dropzone. 파일은 한 번에 하나씩 추가합니다.
- **loading / disabled**: 파일 선택과 드롭을 차단합니다.
- **accept**: 확장자(.pdf,.jpg) 또는 MIME(image/*) 목록. 선택과 드롭에 동일하게 적용합니다.
- **maxSize**: 최대 bytes. 생략하면 용량 제한 없음. 서버에서도 파일 검증이 필요합니다.
- **label**: 버튼 문구. **hint**: 드래그 영역 안내. **error**: 서버 오류 등 외부 메시지.
- **upload(file)**: 검사를 통과한 원본 File 전달. **reject(message)**: 검사 실패 메시지 전달.
- 같은 파일을 다시 선택할 수 있습니다. 단일 파일 선택 API를 유지합니다.
- With File List는 로컬 미리보기 예제이며 서버에 파일을 전송하지 않습니다.` } } },
  args: { variant: 'button', loading: false, disabled: false, label: '파일 추가' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['button', 'dropzone'] },
    loading: { control: 'boolean' }, disabled: { control: 'boolean' },
    accept: { control: 'text' }, maxSize: { control: { type: 'number', min: 0 } },
    label: { control: 'text' }, hint: { control: 'text' }, error: { control: 'text' },
  },
  render: args => ({
    components: { UiFileUpload },
    setup() { const selected = ref(''); return { args, selected, onUpload: (file: File) => { selected.value = file.name } } },
    template: '<div style="max-width:720px;margin:24px auto"><UiFileUpload v-bind="args" @upload="onUpload" /><p v-if="selected" role="status" style="font-size:13px;color:#64748b">선택한 파일: {{ selected }}</p></div>',
  }),
} satisfies Meta<typeof UiFileUpload>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {}
export const Default: Story = {}
export const Loading: Story = { args: { loading: true } }
export const ImageOnly: Story = { args: { accept: 'image/*', label: '이미지 추가' } }
export const Disabled: Story = { args: { disabled: true } }
export const Dropzone: Story = { args: { variant: 'dropzone', accept: '.pdf,.jpg,.jpeg,.png', maxSize: 10 * 1024 * 1024, hint: 'PDF, JPG, PNG · 최대 10 MB' } }
export const DropzoneLoading: Story = { args: { ...Dropzone.args, loading: true } }
export const DropzoneDisabled: Story = { args: { ...Dropzone.args, disabled: true } }
export const Error: Story = { args: { ...Dropzone.args, error: '파일 크기가 10 MB를 초과했습니다.' } }
export const WithFileList: Story = {
  args: { ...Dropzone.args },
  render: args => ({
    components: { UiFileUpload, UiFileList },
    setup() {
      const files = ref<FileItem[]>([{ id: 1, filename: '프로젝트 보고서.pdf', path: '/file-list/sample.pdf', mimetype: 'application/pdf' }])
      const loading = ref(false)
      let nextId = 2
      let timer: ReturnType<typeof setTimeout> | undefined
      const urls = new Set<string>()
      const onDelete = (file: FileItem) => {
        files.value = files.value.filter(item => item.id !== file.id)
        if (urls.delete(file.path)) URL.revokeObjectURL(file.path)
      }
      const onUpload = (file: File) => {
        loading.value = true
        timer = setTimeout(() => {
          const path = URL.createObjectURL(file)
          urls.add(path)
          files.value.push({ id: nextId++, filename: file.name, path, mimetype: file.type, size: file.size })
          loading.value = false
        }, 600)
      }
      onBeforeUnmount(() => { clearTimeout(timer); urls.forEach(url => URL.revokeObjectURL(url)) })
      return { args, files, loading, onUpload, onDelete, getUrl: (path: string) => path }
    },
    template: `<section style="max-width:720px;margin:24px auto">
      <h2 style="display:flex;align-items:center;gap:10px;margin:0 0 20px;font-size:20px">첨부파일 <span style="padding:2px 9px;background:#eff6ff;color:#2563eb;border-radius:12px;font-size:14px">{{ files.length }}</span></h2>
      <UiFileUpload v-bind="args" :loading="loading || args.loading" @upload="onUpload" />
      <UiFileList :files="files" :get-url="getUrl" @delete="onDelete" style="margin-top:12px" />
    </section>`,
  }),
}
