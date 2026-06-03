<template>
  <div class="ui-markdown-toolbar">
    <!-- 제목 그룹 -->
    <div class="ui-markdown-toolbar__group">
      <button
        type="button"
        class="ui-markdown-toolbar__btn"
        :class="{ 'is-active': editor?.isActive('heading', { level: 1 }) }"
        :disabled="sourceMode || !editor"
        title="제목 1"
        @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        H1
      </button>
      <button
        type="button"
        class="ui-markdown-toolbar__btn"
        :class="{ 'is-active': editor?.isActive('heading', { level: 2 }) }"
        :disabled="sourceMode || !editor"
        title="제목 2"
        @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        H2
      </button>
      <button
        type="button"
        class="ui-markdown-toolbar__btn"
        :class="{ 'is-active': editor?.isActive('heading', { level: 3 }) }"
        :disabled="sourceMode || !editor"
        title="제목 3"
        @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        H3
      </button>
    </div>

    <div class="ui-markdown-toolbar__divider" />

    <!-- 서식 그룹 -->
    <div class="ui-markdown-toolbar__group">
      <button
        type="button"
        class="ui-markdown-toolbar__btn"
        :class="{ 'is-active': editor?.isActive('bold') }"
        :disabled="sourceMode || !editor"
        title="굵게"
        @click="editor?.chain().focus().toggleBold().run()"
      >
        <UiIcon name="bold" :size="16" />
      </button>
      <button
        type="button"
        class="ui-markdown-toolbar__btn"
        :class="{ 'is-active': editor?.isActive('italic') }"
        :disabled="sourceMode || !editor"
        title="기울임"
        @click="editor?.chain().focus().toggleItalic().run()"
      >
        <UiIcon name="italic" :size="16" />
      </button>
    </div>

    <div class="ui-markdown-toolbar__divider" />

    <!-- 리스트 그룹 -->
    <div class="ui-markdown-toolbar__group">
      <button
        type="button"
        class="ui-markdown-toolbar__btn"
        :class="{ 'is-active': editor?.isActive('bulletList') }"
        :disabled="sourceMode || !editor"
        title="순서 없는 목록"
        @click="editor?.chain().focus().toggleBulletList().run()"
      >
        <UiIcon name="list" :size="16" />
      </button>
      <button
        type="button"
        class="ui-markdown-toolbar__btn"
        :class="{ 'is-active': editor?.isActive('orderedList') }"
        :disabled="sourceMode || !editor"
        title="순서 있는 목록"
        @click="editor?.chain().focus().toggleOrderedList().run()"
      >
        <UiIcon name="list-ordered" :size="16" />
      </button>
    </div>

    <div class="ui-markdown-toolbar__divider" />

    <!-- 코드·테이블·링크 그룹 -->
    <div class="ui-markdown-toolbar__group">
      <button
        type="button"
        class="ui-markdown-toolbar__btn"
        :class="{ 'is-active': editor?.isActive('codeBlock') }"
        :disabled="sourceMode || !editor"
        title="코드 블록"
        @click="editor?.chain().focus().toggleCodeBlock().run()"
      >
        <UiIcon name="code" :size="16" />
      </button>
      <button
        type="button"
        class="ui-markdown-toolbar__btn"
        :disabled="sourceMode || !editor"
        title="표 삽입 (3x3)"
        @click="onInsertTable"
      >
        <UiIcon name="table" :size="16" />
      </button>
      <button
        type="button"
        class="ui-markdown-toolbar__btn"
        :class="{ 'is-active': editor?.isActive('link') }"
        :disabled="sourceMode || !editor"
        title="링크"
        @click="onToggleLink"
      >
        <UiIcon name="link" :size="16" />
      </button>
    </div>

    <!-- 우측 정렬 spacer -->
    <div class="ui-markdown-toolbar__spacer" />

    <!-- 소스 모드 토글 -->
    <button
      type="button"
      class="ui-markdown-toolbar__btn"
      :class="{ 'is-active': sourceMode }"
      title="마크다운 소스 보기"
      @click="$emit('toggle-source')"
    >
      <UiIcon name="file-code" :size="16" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import UiIcon from './UiIcon.vue'

const props = defineProps<{
  editor: Editor | undefined
  sourceMode: boolean
}>()

defineEmits<{
  'toggle-source': []
}>()

/** 3x3 테이블 삽입 (헤더 행 포함) */
function onInsertTable() {
  props.editor
    ?.chain()
    .focus()
    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
    .run()
}

/** 링크 토글 — window.prompt 사용 */
function onToggleLink() {
  if (!props.editor) return

  // 이미 링크가 활성화되어 있으면 해제
  if (props.editor.isActive('link')) {
    props.editor.chain().focus().unsetLink().run()
    return
  }

  const url = window.prompt('URL을 입력하세요')

  // 취소 (null)
  if (url === null) return

  // 빈 문자열 → 링크 해제
  if (url === '') {
    props.editor.chain().focus().unsetLink().run()
    return
  }

  props.editor.chain().focus().setLink({ href: url }).run()
}
</script>

<style lang="scss" scoped>
.ui-markdown-toolbar {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px 8px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  border-radius: $border-radius-base $border-radius-base 0 0;
  flex-wrap: wrap;
}

.ui-markdown-toolbar__group {
  display: flex;
  align-items: center;
  gap: 2px;
}

.ui-markdown-toolbar__divider {
  width: 1px;
  height: 20px;
  background: var(--color-border);
  margin: 0 4px;
}

.ui-markdown-toolbar__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 6px;
  border: none;
  border-radius: $border-radius-sm;
  background: transparent;
  color: $color-text-primary;
  cursor: pointer;
  @include typo($body-small-bold);
  transition: background $transition-fast, color $transition-fast;

  &:hover:not(:disabled) {
    background: var(--color-background);
  }

  &.is-active {
    background: var(--color-primary);
    color: #fff;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.ui-markdown-toolbar__spacer {
  flex: 1;
}
</style>
