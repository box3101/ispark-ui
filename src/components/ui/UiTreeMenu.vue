<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import UiIcon from './UiIcon.vue'
import UiInput from './UiInput.vue'
import UiButton from './UiButton.vue'
import UiTooltip from './UiTooltip.vue'

export interface TreeMenuItem {
  id: string
  label: string
  icon?: string
  disabled?: boolean
  children?: TreeMenuItem[]
}
export type TreeMenuVariant = 'basic' | 'minimal' | 'hierarchy'
const props = withDefaults(defineProps<{
  items: TreeMenuItem[]
  modelValue?: string
  title?: string
  searchable?: boolean
  /** basic: 헤더 강조 / minimal: 간결한 메뉴 / hierarchy: 아이콘과 곡선 연결선 */
  variant?: TreeMenuVariant
  defaultExpandedIds?: string[]
}>(), { title: '메뉴 목록', searchable: true, variant: 'basic', defaultExpandedIds: () => [] })
const emit = defineEmits<{
  'update:modelValue': [id: string]
  select: [item: TreeMenuItem]
}>()
const query = ref('')
const expanded = ref(new Set(props.defaultExpandedIds))
const focused = ref(props.modelValue)
const tree = ref<HTMLElement>()
const keyword = computed(() => query.value.trim().toLocaleLowerCase())
function filter(items: TreeMenuItem[]): TreeMenuItem[] {
  return items.flatMap(item => {
    if (item.label.toLocaleLowerCase().includes(keyword.value)) return [item]
    const children = item.children ? filter(item.children) : []
    return children.length ? [{ ...item, children }] : []
  })
}
const filtered = computed(() => keyword.value ? filter(props.items) : props.items)
interface Row { item: TreeMenuItem; level: number; parent?: string; stems: boolean[]; last: boolean; position: number; count: number }
const rows = computed(() => {
  const result: Row[] = []
  function walk(items: TreeMenuItem[], level = 1, parent?: string, stems: boolean[] = []) {
    items.forEach((item, index) => {
      const last = index === items.length - 1
      result.push({ item, level, parent, stems, last, position: index + 1, count: items.length })
      if (item.children?.length && isOpen(item.id)) walk(item.children, level + 1, item.id, [...stems, !last])
    })
  }
  walk(filtered.value)
  return result
})
function isOpen(id: string) { return !!keyword.value || expanded.value.has(id) }
function toggle(id: string) {
  if (keyword.value) return
  if (expanded.value.has(id)) expanded.value.delete(id)
  else expanded.value.add(id)
}
function expandAll() {
  function walk(items: TreeMenuItem[]) {
    for (const item of items) if (item.children?.length) { expanded.value.add(item.id); walk(item.children) }
  }
  walk(props.items)
}
function collapseAll() { expanded.value.clear() }
function activate(row: Row) {
  if (row.item.disabled) return
  focused.value = row.item.id
  if (row.item.children?.length) toggle(row.item.id)
  else { emit('update:modelValue', row.item.id); emit('select', row.item) }
}
const enabled = computed(() => rows.value.filter(row => !row.item.disabled))
watch(enabled, value => {
  if (!value.some(row => row.item.id === focused.value)) focused.value = value[0]?.item.id
}, { immediate: true })
async function focusRow(id?: string) {
  if (!id) return
  focused.value = id
  await nextTick()
  Array.from(tree.value?.querySelectorAll<HTMLElement>('[role="treeitem"]') ?? [])
    .find(element => element.dataset.id === id)?.focus()
}
function onKey(event: KeyboardEvent, row: Row) {
  const index = enabled.value.findIndex(entry => entry.item.id === row.item.id)
  let target: string | undefined
  switch (event.key) {
    case 'ArrowDown': target = enabled.value[Math.min(index + 1, enabled.value.length - 1)]?.item.id; break
    case 'ArrowUp': target = enabled.value[Math.max(index - 1, 0)]?.item.id; break
    case 'Home': target = enabled.value[0]?.item.id; break
    case 'End': target = enabled.value.at(-1)?.item.id; break
    case 'ArrowRight':
      if (row.item.children?.length) {
        if (!isOpen(row.item.id)) expanded.value.add(row.item.id)
        else target = rows.value.find(entry => entry.parent === row.item.id && !entry.item.disabled)?.item.id
      }
      break
    case 'ArrowLeft':
      if (row.item.children?.length && isOpen(row.item.id) && !keyword.value) expanded.value.delete(row.item.id)
      else target = enabled.value.find(entry => entry.item.id === row.parent)?.item.id
      break
    case 'Enter': case ' ': activate(row); break
    default: return
  }
  event.preventDefault()
  if (target) void focusRow(target)
}
</script>

<template>
  <section class="ui-tree-menu" :class="`variant-${variant}`">
    <header class="tree-header">
      <h2>{{ title }}</h2>
      <div class="tree-actions">
        <UiTooltip content="전체 펼치기">
          <UiButton variant="ghost" icon-only aria-label="전체 펼치기" :disabled="!!keyword" @click="expandAll">
            <template #icon-left><UiIcon name="chevrons-down" :size="16" aria-hidden="true" /></template>
          </UiButton>
        </UiTooltip>
        <UiTooltip content="전체 접기">
          <UiButton variant="ghost" icon-only aria-label="전체 접기" :disabled="!!keyword" @click="collapseAll">
            <template #icon-left><UiIcon name="chevrons-up" :size="16" aria-hidden="true" /></template>
          </UiButton>
        </UiTooltip>
      </div>
    </header>
    <div v-if="searchable" class="tree-search">
      <UiInput v-model="query" label="메뉴 검색" label-hidden placeholder="메뉴 검색" type="search" size="md" />
    </div>
    <div class="tree-scroll">
      <div ref="tree" role="tree" :aria-label="title">
        <div v-for="row in rows" :key="row.item.id" class="tree-row"
          :class="{ selected: modelValue === row.item.id, disabled: row.item.disabled }"
          role="treeitem" :data-id="row.item.id"
          :aria-level="row.level" :aria-posinset="row.position" :aria-setsize="row.count"
          :aria-expanded="row.item.children?.length ? isOpen(row.item.id) : undefined"
          :aria-selected="modelValue === row.item.id" :aria-disabled="row.item.disabled || undefined"
          :tabindex="focused === row.item.id && !row.item.disabled ? 0 : -1"
          @click="activate(row)" @focus="focused = row.item.id" @keydown="onKey($event, row)">
          <span v-for="(_, index) in row.stems" :key="index" class="tree-indent"
            :class="{ stem: index < row.stems.length - 1 && row.stems[index + 1], branch: index === row.stems.length - 1, continuing: index === row.stems.length - 1 && !row.last }" aria-hidden="true" />
          <span class="tree-content">
            <UiIcon v-if="row.item.children?.length" :name="isOpen(row.item.id) ? 'chevron-down' : 'chevron-right'" :size="14" class="tree-chevron" aria-hidden="true" />
            <span v-else class="tree-chevron" />
            <UiIcon v-if="variant === 'hierarchy'" :name="row.item.icon || (row.item.children?.length ? (isOpen(row.item.id) ? 'folder-open' : 'folder') : 'file-text')" :size="16" class="tree-item-icon" aria-hidden="true" />
            <span class="tree-label">{{ row.item.label }}</span>
          </span>
        </div>
      </div>
      <p v-if="!rows.length" class="tree-empty" role="status">{{ keyword ? '검색 결과가 없습니다.' : '등록된 메뉴가 없습니다.' }}</p>
    </div>
  </section>
</template>

<style scoped>
.ui-tree-menu { display: flex; flex-direction: column; width: 100%; min-width: 0; height: 100%; overflow: hidden; border: 1px solid var(--color-border); border-radius: 10px; background: var(--color-bg-elevated); color: var(--color-text-primary); }
.tree-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 12px 12px 20px; }
.tree-header h2 { margin: 0; font-size: 15px; font-weight: 700; }
.tree-actions { display: flex; gap: 2px; }
.tree-search { padding: 0 16px 12px; }
.tree-scroll { flex: 1; min-height: 0; overflow: auto; padding: 4px 12px 20px; }
.tree-row { display: flex; align-items: stretch; min-height: 36px; border-radius: 6px; cursor: pointer; outline: none; font-size: 13px; }
.tree-content { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; padding: 7px 8px; border-radius: 6px; }
.tree-row:hover:not(.disabled) .tree-content { background: var(--color-background); }
.tree-row.selected .tree-content, .tree-row.selected:hover .tree-content { background: color-mix(in srgb, var(--color-primary) 9%, var(--color-bg-elevated)); color: var(--color-primary); font-weight: 600; }
.tree-row:focus-visible .tree-content { outline: 2px solid var(--color-primary); outline-offset: -2px; }
.tree-chevron { width: 14px; flex-shrink: 0; color: var(--color-text-secondary); }
.tree-item-icon { flex-shrink: 0; color: var(--color-text-secondary); }
.selected .tree-item-icon { color: inherit; }
.tree-label { overflow-wrap: anywhere; }
.tree-row.disabled { opacity: .45; cursor: not-allowed; }
.tree-indent { position: relative; flex: 0 0 20px; }
.tree-indent.stem::before, .tree-indent.continuing::before { content: ''; position: absolute; top: 0; bottom: 0; left: 10px; border-left: 1px solid var(--color-border); }
.tree-indent.branch::after { content: ''; position: absolute; top: 0; left: 10px; width: 10px; height: 18px; border-left: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); border-bottom-left-radius: 10px; }
.tree-empty { margin: 24px 8px; text-align: center; color: var(--color-text-secondary); font-size: 13px; }
.variant-basic, .variant-minimal { border-radius: 6px; }
.variant-basic .tree-header { background: var(--color-background); border-bottom: 1px solid var(--color-border); margin-bottom: 12px; }
.variant-basic .tree-indent::before, .variant-basic .tree-indent::after,
.variant-minimal .tree-indent::before, .variant-minimal .tree-indent::after { content: none; }
</style>
