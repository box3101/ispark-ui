<template>
  <div v-if="files.length > 0" class="ui-file-list">
    <div
      v-for="file in files"
      :key="file.id"
      :class="isImage(file.mimetype) ? 'ui-file-item ui-file-item--image' : 'ui-file-item'"
    >
      <!-- 이미지 파일 -->
      <template v-if="isImage(file.mimetype)">
        <a :href="getUrl(file.path)" target="_blank" class="ui-file-item__preview">
          <img :src="getUrl(file.path)" class="ui-file-item__img" :alt="file.filename" />
        </a>
        <div class="ui-file-item__info">
          <span class="ui-file-item__name">{{ file.filename }}</span>
          <button
            v-if="deletable"
            class="ui-file-item__delete"
            type="button"
            aria-label="파일 삭제"
            @click="$emit('delete', file)"
          >
            <UiIcon name="x" :size="12" />
          </button>
        </div>
      </template>

      <!-- 일반 파일 -->
      <template v-else>
        <span class="ui-file-item__icon" aria-hidden="true">📎</span>
        <a :href="getUrl(file.path)" target="_blank" class="ui-file-item__name">{{ file.filename }}</a>
        <button
          v-if="deletable"
          class="ui-file-item__delete"
          type="button"
          aria-label="파일 삭제"
          @click="$emit('delete', file)"
        >
          <UiIcon name="x" :size="12" />
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiIcon from './UiIcon.vue'

/** 파일 아이템 인터페이스 */
export interface FileItem {
  id: number
  filename: string
  path: string
  mimetype: string
}

interface Props {
  /** 파일 목록 */
  files: FileItem[]
  /** 파일 URL 생성 함수 */
  getUrl: (path: string) => string
  /** 삭제 버튼 표시 여부 */
  deletable?: boolean
}

withDefaults(defineProps<Props>(), {
  deletable: true,
})

defineEmits<{
  delete: [file: FileItem]
}>()

function isImage(mimetype: string) {
  return mimetype.startsWith('image/')
}
</script>

<style lang="scss" scoped>
.ui-file-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.ui-file-item {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm;
  background: $color-border-light;
  border-radius: $border-radius-base;

  &--image {
    flex-direction: column;
    align-items: stretch;
    padding: 0;
    overflow: hidden;
  }
}

.ui-file-item__preview {
  display: block;
  cursor: pointer;
}

.ui-file-item__img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  display: block;
  border-radius: $border-radius-base $border-radius-base 0 0;
}

.ui-file-item__info {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm 10px;
}

.ui-file-item__icon {
  font-size: 20px;
  flex-shrink: 0;
}

.ui-file-item__name {
  flex: 1;
  min-width: 0;
  @include typo($body-small);
  color: $color-text-primary;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.ui-file-item__delete {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  border-radius: $border-radius-sm;
  cursor: pointer;
  color: $color-text-muted;
  flex-shrink: 0;
  transition: background $transition-fast, color $transition-fast;

  &:hover {
    background: rgba($color-danger, 0.08);
    color: $color-danger;
  }
}
</style>
