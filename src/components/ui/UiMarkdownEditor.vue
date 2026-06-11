<template>
  <div
    class="ui-markdown-editor"
    :class="{
      'is-focused': isFocused,
      'is-readonly': !editable,
      'is-source': isSourceMode,
    }"
  >
    <!-- 툴바 — editable 모드에서만 표시 -->
    <UiMarkdownToolbar
      v-if="editable"
      :editor="editor"
      :source-mode="isSourceMode"
      @toggle-source="toggleSource"
    />

    <!-- WYSIWYG 모드 -->
    <EditorContent
      v-show="!isSourceMode"
      class="ui-markdown-editor__content"
      :editor="editor"
    />

    <!-- 소스(마크다운) 모드 -->
    <textarea
      v-if="isSourceMode"
      ref="sourceRef"
      class="ui-markdown-editor__source"
      :value="sourceText"
      :readonly="!editable"
      @input="onSourceInput"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, nextTick } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { Markdown } from 'tiptap-markdown'
import { common, createLowlight } from 'lowlight'
import UiMarkdownToolbar from './UiMarkdownToolbar.vue'

const lowlight = createLowlight(common)

interface Props {
  modelValue?: string
  editable?: boolean
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  editable: true,
  placeholder: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isFocused = ref(false)
const isSourceMode = ref(false)
const sourceText = ref('')
const sourceRef = ref<HTMLTextAreaElement | null>(null)

const editor = useEditor({
  content: props.modelValue,
  editable: props.editable,
  extensions: [
    StarterKit.configure({
      codeBlock: false, // CodeBlockLowlight로 대체
    }),
    Table.configure({ resizable: false }),
    TableRow,
    TableHeader,
    TableCell,
    CodeBlockLowlight.configure({ lowlight }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: { rel: 'noopener noreferrer' },
    }),
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
    Markdown,
  ],
  onUpdate: ({ editor: ed }) => {
    const md = (ed.storage as any).markdown.getMarkdown() as string
    emit('update:modelValue', md)
  },
  onFocus: () => {
    isFocused.value = true
  },
  onBlur: () => {
    isFocused.value = false
  },
})

/** 외부에서 modelValue가 변경될 때 에디터 동기화 */
watch(
  () => props.modelValue,
  (newVal) => {
    if (!editor.value) return
    const currentMd = (editor.value.storage as any).markdown.getMarkdown() as string
    if (newVal !== currentMd) {
      editor.value.commands.setContent(newVal)
    }
  },
)

/** editable 변경 반영 */
watch(
  () => props.editable,
  (val) => {
    editor.value?.setEditable(val)
  },
)

/** 소스 모드 토글 */
function toggleSource() {
  if (!editor.value) return

  if (!isSourceMode.value) {
    // WYSIWYG → 소스: 에디터에서 마크다운 추출
    sourceText.value = (editor.value.storage as any).markdown.getMarkdown() as string
    isSourceMode.value = true
    nextTick(() => sourceRef.value?.focus())
  } else {
    // 소스 → WYSIWYG: 마크다운을 에디터에 반영
    editor.value.commands.setContent(sourceText.value)
    isSourceMode.value = false
    nextTick(() => editor.value?.commands.focus())
  }
}

/** 소스 textarea 입력 핸들러 */
function onSourceInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  sourceText.value = target.value
  emit('update:modelValue', target.value)
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style lang="scss" scoped>
.ui-markdown-editor {
  border: 1px solid var(--color-border);
  border-radius: $border-radius-base;
  background: var(--color-bg-elevated);
  transition: border-color $transition-base;

  &.is-focused {
    border-color: var(--color-primary);
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  &.is-readonly {
    border-color: transparent;
    background: transparent;

    &.is-focused {
      outline: none;
    }
  }
}

/* Tiptap 에디터 콘텐츠 영역 */
.ui-markdown-editor__content {
  :deep(.tiptap) {
    padding: 12px 16px;
    min-height: 120px;
    outline: none;
    @include typo($body-medium);
    color: $color-text-primary;

    > * + * {
      margin-top: 0.5em;
    }

    /* 제목 */
    h1 {
      @include typo($body-2xlarge-bold);
      color: $color-text-heading;
      margin-top: 1em;
    }

    h2 {
      @include typo($body-xlarge-bold);
      color: $color-text-heading;
      margin-top: 0.8em;
    }

    h3 {
      @include typo($body-large-bold);
      color: $color-text-heading;
      margin-top: 0.6em;
    }

    /* 굵게·기울임 */
    strong {
      font-weight: $font-weight-bold;
    }

    em {
      font-style: italic;
    }

    /* 리스트 */
    ul,
    ol {
      padding-left: 24px;
    }

    ul {
      list-style: disc;
    }

    ol {
      list-style: decimal;
    }

    li > p {
      margin: 0;
    }

    /* 코드 블록 */
    pre {
      background: #1e1e2e;
      color: #cdd6f4;
      border-radius: $border-radius-base;
      padding: 12px 16px;
      overflow-x: auto;
      font-family: $font-family-mono;
      @include typo($body-small);

      code {
        background: none;
        color: inherit;
        padding: 0;
        font-family: inherit;
        font-size: inherit;
      }
    }

    /* 인라인 코드 */
    code {
      background: var(--color-background);
      border-radius: 3px;
      padding: 2px 4px;
      font-family: $font-family-mono;
      font-size: 0.9em;
      color: var(--color-primary);
    }

    /* 테이블 */
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 8px 0;

      th,
      td {
        border: 1px solid var(--color-border);
        padding: 6px 10px;
        text-align: left;
        @include typo($body-small);
      }

      th {
        background: var(--color-surface);
        font-weight: $font-weight-bold;
        color: $color-text-heading;
      }

      td {
        color: $color-text-primary;
      }
    }

    /* 링크 */
    a {
      color: var(--color-primary);
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        color: var(--color-primary-hover);
      }
    }

    /* 인용문 */
    blockquote {
      border-left: 3px solid var(--color-border);
      padding-left: 12px;
      margin-left: 0;
      color: $color-text-secondary;
      font-style: italic;
    }

    /* 구분선 */
    hr {
      border: none;
      border-top: 1px solid var(--color-border);
      margin: 16px 0;
    }

    /* Placeholder */
    p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      float: left;
      color: var(--color-text-disabled);
      pointer-events: none;
      height: 0;
    }
  }
}

/* 소스(마크다운) 모드 textarea */
.ui-markdown-editor__source {
  display: block;
  width: 100%;
  min-height: 200px;
  padding: 12px 16px;
  border: none;
  outline: none;
  resize: vertical;
  background: var(--color-bg-elevated);
  color: $color-text-primary;
  font-family: $font-family-mono;
  @include typo($body-small);
  line-height: 1.6;
  border-radius: 0 0 $border-radius-base $border-radius-base;
}
</style>
