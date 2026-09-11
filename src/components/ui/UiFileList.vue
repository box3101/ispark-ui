<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import UiIcon from './UiIcon.vue'

export interface FileItem {
  id: number
  filename: string
  path: string
  mimetype: string
  /** 파일 크기 (bytes). 생략하면 형식만 표시 */
  size?: number
}
const props = withDefaults(defineProps<{
  files: FileItem[]
  getUrl: (path: string) => string
  deletable?: boolean
  layout?: 'list' | 'grid'
}>(), { deletable: true, layout: 'list' })
defineEmits<{ delete: [file: FileItem] }>()
const failedImages = reactive(new Set<string>())
const items = computed(() => props.files.map(file => ({
  file, url: props.getUrl(file.path), image: file.mimetype.startsWith('image/'),
  format: file.filename.includes('.') ? file.filename.split('.').pop()!.toUpperCase() : (file.mimetype.split('/')[1] || 'FILE').toUpperCase(),
})))
watch(() => items.value.map(item => item.url), () => failedImages.clear())
function formatSize(size?: number) {
  if (size === undefined || !Number.isFinite(size) || size < 0) return ''
  if (size < 1024) return `${size} B`
  const unit = Math.min(Math.floor(Math.log(size) / Math.log(1024)), 3)
  return `${Number((size / 1024 ** unit).toFixed(1))} ${['B', 'KB', 'MB', 'GB'][unit]}`
}
</script>

<template>
  <ul v-if="files.length" class="ui-file-list" :class="`ui-file-list--${layout}`" aria-label="첨부파일">
    <li v-for="{ file, url, image, format } in items" :key="file.id" class="ui-file-item" :class="{ 'ui-file-item--image': image }">
      <a :href="url" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true"
        class="ui-file-item__preview" :class="{ 'ui-file-item__preview--pdf': format === 'PDF' }">
        <img v-if="image && !failedImages.has(url)" :key="url" :src="url" class="ui-file-item__img" :alt="file.filename" @error="failedImages.add(url)" />
        <UiIcon v-else class="ui-file-item__icon" :name="image ? 'image' : 'file-text'" :size="24" />
      </a>
      <div class="ui-file-item__info">
        <a :href="url" target="_blank" rel="noopener noreferrer" class="ui-file-item__name" :title="file.filename">{{ file.filename }}</a>
        <span class="ui-file-item__meta">{{ format }}<template v-if="formatSize(file.size)"> · {{ formatSize(file.size) }}</template></span>
      </div>
      <div class="ui-file-item__actions">
        <a :href="url" :download="file.filename" target="_blank" rel="noopener noreferrer" class="ui-file-item__download" :aria-label="`${file.filename} 다운로드`" title="다운로드"><UiIcon name="download" :size="18" /></a>
        <button v-if="deletable" class="ui-file-item__delete" type="button" aria-label="파일 삭제" :title="`${file.filename} 삭제`" @click="$emit('delete', file)"><UiIcon name="x" :size="18" /></button>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.ui-file-list { display: flex; flex-direction: column; gap: 8px; width: 100%; margin: 0; padding: 0; list-style: none; }
.ui-file-item {
  display: flex; align-items: center; gap: 14px; min-width: 0; min-height: 72px; box-sizing: border-box;
  padding: 12px 14px; border: 1px solid $color-border-light; border-radius: 8px; background: #fff;
  transition: background $transition-fast;
  &:hover { background: #f8fafc; }
}
.ui-file-item__preview {
  display: flex; align-items: center; justify-content: center; flex: 0 0 44px; height: 44px;
  overflow: hidden; border-radius: 6px; background: #eff6ff; color: #3b82f6;
  &--pdf { background: #fff1f2; color: $color-danger; }
}
.ui-file-item__img { width: 100%; height: 100%; object-fit: cover; display: block; }
.ui-file-item__info { display: flex; flex: 1; flex-direction: column; gap: 4px; min-width: 0; }
.ui-file-item__name {
  @include typo($body-small);
  font-weight: 600; color: $color-text-primary; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-decoration: none;
  &:hover { text-decoration: underline; }
}
.ui-file-item__meta { font-size: 12px; line-height: 18px; color: $color-text-muted; }
.ui-file-item__actions { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
.ui-file-item__download, .ui-file-item__delete {
  display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 0;
  border: 0; border-radius: 6px; background: transparent; color: $color-text-muted; cursor: pointer;
  transition: background $transition-fast, color $transition-fast;
}
.ui-file-item__download:hover { background: $color-border-light; color: $color-text-primary; }
.ui-file-item__delete:hover { background: rgba($color-danger, .08); color: $color-danger; }
a:focus-visible, button:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 3px; }
.ui-file-list--grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); gap: 12px;
  .ui-file-item { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 12px 4px; padding: 8px; }
  .ui-file-item__preview { grid-column: 1 / -1; width: 100%; height: auto; aspect-ratio: 16 / 10; }
  .ui-file-item__info { padding: 0 2px 4px; }
}
@media (max-width: 400px) {
  .ui-file-item { padding: 10px; gap: 10px; }
  .ui-file-item__actions { gap: 0; }
}
</style>
