import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import UiFileList from './UiFileList.vue'
import type { FileItem } from './UiFileList.vue'

// 로컬 SVG 예제: 네트워크 연결 없이 미리보기 및 다운로드 가능
const landscape = (sky: string, hill: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400"><rect width="640" height="400" fill="${sky}"/><circle cx="490" cy="85" r="36" fill="#fff3c4"/><path d="M0 240L140 140 300 270 460 170 640 260V400H0Z" fill="${hill}"/><path d="M0 320Q160 200 340 320T640 280V400H0Z" fill="#458277"/></svg>`)}`
const previews = [landscape('#dbeafe', '#829d92'), landscape('#e0f2fe', '#7da580'), landscape('#ffdfba', '#9e8b91')]
const sampleFiles: FileItem[] = [
  { id: 1, filename: '출생증명서.pdf', path: 'sample.pdf', mimetype: 'application/pdf', size: 245760 },
  { id: 2, filename: 'KakaoTalk_photo.svg', path: previews[0], mimetype: 'image/svg+xml', size: 1843200 },
  { id: 3, filename: '체험단.txt', path: 'sample.txt', mimetype: 'text/plain', size: 12288 },
]
const getUrl = (path: string) => path.startsWith('data:') || path.startsWith('/') ? path : (path.endsWith('.pdf') ? '/file-list/sample.pdf' : '/file-list/sample.txt')
const meta = {
  title: 'Components/Data/UiFileList', component: UiFileList, tags: ['autodocs'],
  args: { files: sampleFiles, getUrl, deletable: true, layout: 'list' },
  parameters: {
    layout: 'padded',
    docs: { description: { component: `파일 아이콘·미리보기, 파일명, 형식과 크기를 표시하는 첨부파일 목록입니다.

- 기본은 목록형, \`layout="grid"\`로 썸네일 격자형을 사용합니다.
- \`FileItem.size\`는 선택 사항이며 bytes 단위입니다. 예제의 크기는 표시용 샘플 값입니다.
- \`getUrl\`로 파일 경로를 URL로 변환합니다. 다운로드는 브라우저 기본 링크를 사용하며 외부 도메인은 서버의 Content-Disposition 설정에 따라 새 탭에서 열릴 수 있습니다.
- 이미지를 불러오지 못하면 기본 이미지 아이콘을 표시합니다.
- \`deletable=false\`이면 삭제 버튼을 숨깁니다. 삭제 시 \`delete\` 이벤트로 FileItem을 전달합니다.
- \`UiFileUpload\`와 함께 사용할 수 있습니다.` } },
  },
  argTypes: {
    files: { control: false }, getUrl: { control: false },
    deletable: { control: 'boolean' },
    layout: { control: 'inline-radio', options: ['list', 'grid'] },
  },
  render: args => ({
    components: { UiFileList },
    setup() { const removed = ref<number[]>([]); return { args, removed, onDelete: (file: FileItem) => removed.value.push(file.id) } },
    template: '<div style="width:100%;max-width:720px;margin:24px auto"><UiFileList v-bind="args" :files="args.files.filter(f => !removed.includes(f.id))" @delete="onDelete" /></div>',
  }),
} satisfies Meta<typeof UiFileList>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { UiFileList },
    setup() {
      const removed = ref<number[]>([])
      const onDelete = (file: FileItem) => { removed.value.push(file.id) }
      return { args, removed, onDelete }
    },
    template: `<section style="width:100%;max-width:720px;margin:24px auto">
      <h2 style="display:flex;align-items:center;gap:10px;margin:0 0 8px;font-size:24px;font-weight:700;color:#202938">첨부파일 <span style="padding:2px 9px;border-radius:6px;background:#f1f5f9;font-size:16px">{{ args.files.filter(f => !removed.includes(f.id)).length }}</span></h2>
      <p style="margin:0 0 24px;color:#64748b;font-size:14px">등록된 파일을 확인하고 다운로드하세요.</p>
      <UiFileList v-bind="args" :files="args.files.filter(f => !removed.includes(f.id))" @delete="onDelete" />
    </section>`,
  }),
}
export const ReadOnly: Story = { args: { deletable: false } }
export const Empty: Story = { args: { files: [] } }
export const TextFilesOnly: Story = { args: { files: sampleFiles.filter(file => !file.mimetype.startsWith('image/')) } }
export const Gallery: Story = {
  args: { layout: 'grid', files: previews.map((path, i) => ({ id: i, filename: ['제주도_여행.svg', '풍경사진.svg', '노을.svg'][i]!, path, mimetype: 'image/svg+xml', size: [2516582, 1153434, 1992294][i] })) },
}
export const ImageFallback: Story = { args: { files: [{ id: 1, filename: '미리보기를_불러올_수_없는_사진.jpg', path: '/missing-file-preview.jpg', mimetype: 'image/jpeg' }] } }
export const Narrow: Story = {
  args: { files: [...sampleFiles, { id: 4, filename: '아주_긴_파일명도_레이아웃이_깨지지_않도록_말줄임으로_표시합니다.pdf', path: 'long.pdf', mimetype: 'application/pdf' }] },
  render: args => ({ components: { UiFileList }, setup() { const removed = ref<number[]>([]); return { args, removed, onDelete: (file: FileItem) => removed.value.push(file.id) } }, template: '<div style="width:100%;max-width:320px;margin:auto"><UiFileList v-bind="args" :files="args.files.filter(f => !removed.includes(f.id))" @delete="onDelete" /></div>' }),
}
