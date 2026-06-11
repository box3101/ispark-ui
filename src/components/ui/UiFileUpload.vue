<template>
  <label
    class="ui-file-upload"
    :class="{
      'ui-file-upload--disabled': disabled || loading,
    }"
  >
    <input
      type="file"
      hidden
      :accept="accept"
      :disabled="disabled || loading"
      @change="onChange"
    />
    {{ loading ? '업로드 중...' : label }}
  </label>
</template>

<script setup lang="ts">
interface Props {
  /** 업로드 중 상태 */
  loading?: boolean
  /** 허용 파일 형식 (예: 'image/*', '.pdf,.doc') */
  accept?: string
  /** 버튼 라벨 */
  label?: string
  /** 비활성화 */
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  loading: false,
  accept: undefined,
  label: '+ 파일 추가',
  disabled: false,
})

const emit = defineEmits<{
  /** 파일 선택 시 원본 File 객체 전달 */
  upload: [file: File]
}>()

function onChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    emit('upload', file)
  }
  // input 초기화 (같은 파일 재선택 가능)
  input.value = ''
}
</script>

<style lang="scss" scoped>
.ui-file-upload {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border: 1px dashed $color-border;
  border-radius: $border-radius-base;
  @include typo($body-small);
  color: $color-text-muted;
  cursor: pointer;
  transition: border-color $transition-fast, color $transition-fast;

  &:hover {
    border-color: $color-text-primary;
    color: $color-text-primary;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      border-color: $color-border;
      color: $color-text-muted;
    }
  }
}
</style>
