<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import UiIcon from './UiIcon.vue'

const props = withDefaults(defineProps<{
  loading?: boolean
  accept?: string
  label?: string
  disabled?: boolean
  variant?: 'button' | 'dropzone'
  /** 파일당 최대 bytes. 생략하면 제한 없음 */
  maxSize?: number
  /** 드래그 영역 보조 문구 */
  hint?: string
  /** 서버 업로드 실패 등 외부 오류 메시지 */
  error?: string
}>(), { loading: false, label: '파일 추가', disabled: false, variant: 'button' })
const emit = defineEmits<{
  upload: [file: File]
  /** 클라이언트 검사 실패. 파일은 upload 이벤트로 전달하지 않음 */
  reject: [message: string]
}>()
const input = ref<HTMLInputElement>()
const localError = ref('')
const dragDepth = ref(0)
const blocked = computed(() => props.disabled || props.loading)
const message = computed(() => props.error || localError.value)
const id = useId()
const hintText = computed(() => props.hint ?? [
  props.accept?.split(',').map(value => value.trim().replace(/^\./, '').toUpperCase()).join(', '),
  props.maxSize === undefined ? '' : `최대 ${Number((props.maxSize / 1024 / 1024).toFixed(2))} MB`,
].filter(Boolean).join(' · '))
watch(blocked, () => { dragDepth.value = 0 })
watch(() => [props.accept, props.maxSize], () => { localError.value = '' })
function reject(message: string) { localError.value = message; emit('reject', message) }
function selectFiles(files: File[]) {
  if (blocked.value || !files.length) return
  localError.value = ''
  if (files.length > 1) return reject('파일은 한 번에 하나씩 추가해 주세요.')
  const file = files[0]!
  const types = props.accept?.toLowerCase().split(',').map(value => value.trim()).filter(Boolean) ?? []
  const matches = types.length === 0 || types.some(type => {
    if (type === '*/*') return true
    if (type.startsWith('.')) return file.name.toLowerCase().endsWith(type)
    if (type.endsWith('/*')) return file.type.toLowerCase().startsWith(type.slice(0, -1))
    return file.type.toLowerCase() === type
  })
  if (!matches) return reject('허용되지 않는 파일 형식입니다.')
  if (props.maxSize !== undefined && file.size > props.maxSize) return reject(`파일 크기가 ${Number((props.maxSize / 1024 / 1024).toFixed(2))} MB를 초과했습니다.`)
  emit('upload', file)
}
function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  selectFiles(Array.from(target.files ?? []))
  target.value = ''
}
function onDrop(event: DragEvent) {
  dragDepth.value = 0
  if (props.variant === 'dropzone') selectFiles(Array.from(event.dataTransfer?.files ?? []))
}
function onDragEnter(event: DragEvent) {
  if (!blocked.value && props.variant === 'dropzone' && Array.from(event.dataTransfer?.types ?? []).includes('Files')) dragDepth.value++
}
</script>

<template>
  <div class="ui-file-upload-field" :class="{ 'ui-file-upload-field--dropzone': variant === 'dropzone' }">
    <input ref="input" type="file" hidden :accept="accept" :disabled="blocked" @change="onChange" />
    <button type="button" class="ui-file-upload" :class="{
      'ui-file-upload--dropzone': variant === 'dropzone',
      'ui-file-upload--disabled': blocked,
      'ui-file-upload--dragging': dragDepth > 0,
      'ui-file-upload--error': Boolean(message),
    }" :disabled="blocked" :aria-busy="loading" :aria-describedby="[hintText && variant === 'dropzone' ? `${id}-hint` : '', message ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined"
      @click="input?.click()" @dragenter.prevent="onDragEnter" @dragover.prevent
      @dragleave.prevent="dragDepth = Math.max(0, dragDepth - 1)" @drop.prevent="onDrop">
      <span class="ui-file-upload__icon"><UiIcon :name="loading ? 'loader-circle' : variant === 'dropzone' ? 'cloud-upload' : 'upload'" :size="variant === 'dropzone' ? 28 : 18" :class="{ 'ui-file-upload__spinner': loading }" /></span>
      <span v-if="loading">업로드 중...</span>
      <span v-else-if="variant === 'dropzone'" class="ui-file-upload__prompt">파일을 끌어 놓거나 <span>클릭하여 추가</span></span>
      <span v-else>{{ label }}</span>
      <span v-if="variant === 'dropzone' && hintText" :id="`${id}-hint`" class="ui-file-upload__hint">{{ hintText }}</span>
    </button>
    <p v-if="message" :id="`${id}-error`" class="ui-file-upload__error" role="alert"><UiIcon name="circle-alert" :size="16" />{{ message }}</p>
  </div>
</template>

<style lang="scss" scoped>
.ui-file-upload-field { display: inline-flex; flex-direction: column; gap: 8px; max-width: 100%; }
.ui-file-upload-field--dropzone { display: flex; width: 100%; }
.ui-file-upload {
  display: inline-flex; align-items: center; justify-content: center; align-self: flex-start; gap: 8px;
  min-height: 36px; padding: 8px 12px; box-sizing: border-box;
  border: 1px solid $color-border; border-radius: 8px; background: var(--color-bg-elevated);
  font-family: inherit; @include typo($body-small); color: $color-text-primary; cursor: pointer;
  transition: border-color $transition-fast, background $transition-fast;
  &:hover:not(:disabled) { border-color: var(--color-primary); background: $color-background; }
  &:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 3px; }
  &--dropzone {
    width: 100%; min-height: 190px; flex-direction: column; gap: 12px; padding: 24px 16px;
    border-style: dashed; background: #f8fbff; border-color: #bfdbfe;
    .ui-file-upload__icon { display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 10px; background: #eaf2ff; color: var(--color-primary); }
  }
  &--dragging:not(:disabled) { border-color: var(--color-primary); background: #eff6ff; }
  &--error { border-color: $color-danger; }
  &--disabled { background: $color-background; color: $color-text-muted; opacity: .6; cursor: not-allowed; }
}
.ui-file-upload__icon { display: inline-flex; flex-shrink: 0; }
.ui-file-upload__prompt { font-weight: 500; span { color: var(--color-primary); } }
.ui-file-upload__hint { color: $color-text-muted; font-size: 12px; font-weight: 400; }
.ui-file-upload__error { display: flex; align-items: flex-start; gap: 6px; margin: 0; color: $color-danger; font-size: 12px; line-height: 20px; }
.ui-file-upload__spinner { animation: ui-upload-spin 1s linear infinite; }
@keyframes ui-upload-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .ui-file-upload__spinner { animation: none; } }
</style>
