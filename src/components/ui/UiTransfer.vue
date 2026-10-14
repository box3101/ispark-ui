<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import UiButton from './UiButton.vue'
import UiCheckbox from './UiCheckbox.vue'
import UiInput from './UiInput.vue'
import UiIcon from './UiIcon.vue'
import UiTooltip from './UiTooltip.vue'

export interface TransferItem {
  id: string
  label: string
  description?: string
  disabled?: boolean
}
const props = withDefaults(defineProps<{
  items: TransferItem[]
  modelValue: string[]
  sourceTitle?: string
  targetTitle?: string
  searchable?: boolean
  showAllControls?: boolean
  disabled?: boolean
  listHeight?: number
  /** 왼쪽 후보 목록만 필터링. 오른쪽 선택 목록은 전체 items에서 유지합니다. */
  sourceFilter?: (item: TransferItem) => boolean
}>(), { sourceTitle: '추가 가능한 항목', targetTitle: '선택한 항목', searchable: false, showAllControls: false, disabled: false, listHeight: 280 })
const emit = defineEmits<{
  'update:modelValue': [ids: string[]]
  change: [ids: string[], direction: 'add' | 'remove', movedIds: string[]]
}>()
type Side = 'source' | 'target'
const queries = ref({ source: '', target: '' })
const checked = ref<Record<Side, Set<string>>>({ source: new Set(), target: new Set() })
const announcement = ref('')
const selected = computed(() => new Set(props.modelValue))
const panes = computed(() => (['source', 'target'] as const).map(side => {
  const items = props.items.filter(item => selected.value.has(item.id) === (side === 'target') && (side === 'target' || !props.sourceFilter || props.sourceFilter(item)))
  const query = queries.value[side].trim().toLocaleLowerCase()
  const visible = items.filter(item => `${item.label} ${item.description ?? ''}`.toLocaleLowerCase().includes(query))
  const enabled = visible.filter(item => !item.disabled)
  const checkedCount = enabled.filter(item => checked.value[side].has(item.id)).length
  return { side, title: side === 'source' ? props.sourceTitle : props.targetTitle, items, visible, enabled, checkedCount }
}))
watch(() => [props.items, props.modelValue], () => {
  for (const side of ['source', 'target'] as const) {
    checked.value[side] = new Set([...checked.value[side]].filter(id => props.items.some(item => item.id === id && !item.disabled) && selected.value.has(id) === (side === 'target')))
  }
}, { deep: true })
function check(side: Side, id: string, value: boolean) {
  if (value) checked.value[side].add(id)
  else checked.value[side].delete(id)
}
function checkAll(side: Side, value: boolean) {
  for (const item of panes.value.find(pane => pane.side === side)!.enabled) check(side, item.id, value)
}
const controls = computed(() => [
  { side: 'source' as Side, all: true, icon: 'chevrons-right', label: props.searchable ? '검색 결과 전체 추가' : '전체 추가' },
  { side: 'source' as Side, all: false, icon: 'chevron-right', label: '선택 항목 추가' },
  { side: 'target' as Side, all: false, icon: 'chevron-left', label: '선택 항목 제외' },
  { side: 'target' as Side, all: true, icon: 'chevrons-left', label: props.searchable ? '검색 결과 전체 제외' : '전체 제외' },
].filter(control => !control.all || props.showAllControls))
function movable(side: Side, all: boolean) {
  return panes.value.find(pane => pane.side === side)!.enabled.filter(item => all || checked.value[side].has(item.id))
}
function move(side: Side, all: boolean) {
  if (props.disabled) return
  const ids = movable(side, all).map(item => item.id)
  if (!ids.length) return
  const next = new Set(props.modelValue)
  for (const id of ids) {
    if (side === 'source') next.add(id)
    else next.delete(id)
    checked.value[side].delete(id)
  }
  emit('update:modelValue', [...next])
  emit('change', [...next], side === 'source' ? 'add' : 'remove', ids)
  announcement.value = `${ids.length}개 항목을 ${side === 'source' ? '추가' : '제외'}했습니다.`
}
</script>

<template>
  <div class="ui-transfer" :class="{ 'is-disabled': disabled }">
    <section v-for="pane in panes" :key="pane.side" class="transfer-pane" :class="`pane-${pane.side}`" :aria-label="pane.title">
      <header class="pane-header"><h3>{{ pane.title }}</h3><span class="pane-count">{{ pane.items.length }}</span></header>
      <div v-if="searchable" class="pane-search">
        <UiInput v-model="queries[pane.side]" type="search" :label="`${pane.title} 검색`" label-hidden placeholder="검색어 입력" :disabled="disabled" />
      </div>
      <div class="pane-summary">
        <UiCheckbox :label="`${pane.title} 전체 선택`" label-hidden
          :model-value="pane.enabled.length > 0 && pane.checkedCount === pane.enabled.length"
          :indeterminate="pane.checkedCount > 0 && pane.checkedCount < pane.enabled.length"
          :disabled="disabled || !pane.enabled.length" @update:model-value="checkAll(pane.side, $event)" />
        <span>{{ pane.checkedCount }} / {{ pane.visible.length }}개 체크됨</span>
      </div>
      <ul class="pane-list" :style="{ height: `${listHeight}px` }" :aria-label="`${pane.title} 목록`">
        <li v-for="item in pane.visible" :key="item.id" class="transfer-row" :class="{ 'is-checked': checked[pane.side].has(item.id) }">
          <UiCheckbox :model-value="checked[pane.side].has(item.id)" :disabled="disabled || item.disabled" @update:model-value="check(pane.side, item.id, $event)">
            <slot name="item" :item="item" :side="pane.side">
              <span class="item-label">{{ item.label }}</span>
              <span v-if="item.description" class="item-description">{{ item.description }}</span>
            </slot>
          </UiCheckbox>
        </li>
        <li v-if="!pane.visible.length" class="pane-empty">{{ queries[pane.side].trim() ? '검색 결과가 없습니다.' : pane.side === 'target' ? '선택한 항목이 없습니다.' : '추가 가능한 항목이 없습니다.' }}</li>
      </ul>
    </section>
    <div class="transfer-controls" role="group" aria-label="항목 이동">
      <UiTooltip v-for="control in controls" :key="control.label" :content="control.label">
        <UiButton variant="ghost" icon-only :aria-label="control.label" :disabled="disabled || !movable(control.side, control.all).length" @click="move(control.side, control.all)">
          <template #icon-left><UiIcon :name="control.icon" :size="20" aria-hidden="true" /></template>
        </UiButton>
      </UiTooltip>
    </div>
    <span class="sr-only" role="status" aria-live="polite">{{ announcement }}</span>
  </div>
</template>

<style scoped>
.ui-transfer { display: grid; grid-template-columns: minmax(0, 1fr) 40px minmax(0, 1fr); gap: 12px; align-items: stretch; color: var(--color-text-primary); }
.transfer-pane { min-width: 0; overflow: hidden; border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-bg-elevated); }
.pane-source { grid-column: 1; grid-row: 1; }
.pane-target { grid-column: 3; grid-row: 1; }
.pane-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 12px; background: var(--color-background); border-bottom: 1px solid var(--color-border); }
.pane-header h3 { margin: 0; font-size: 13px; font-weight: 700; }
.pane-count { font-size: 12px; color: var(--color-text-secondary); }
.pane-search { padding: 12px 12px 0; }
.pane-summary { display: flex; align-items: center; gap: 8px; padding: 4px 12px; font-size: 12px; color: var(--color-text-secondary); border-bottom: 1px solid var(--color-border); }
.pane-list { overflow: auto; margin: 0; padding: 4px 0; list-style: none; }
.transfer-row { padding: 0 12px; }
.transfer-row:hover { background: var(--color-background); }
.transfer-row.is-checked { background: color-mix(in srgb, var(--color-primary) 8%, var(--color-bg-elevated)); }
.transfer-row :deep(.ui-checkbox) { display: flex; width: 100%; min-height: 36px; align-items: center; }
.transfer-row :deep(.ui-checkbox-label) { min-width: 0; overflow-wrap: anywhere; font-size: 13px; }
.item-label, .item-description { display: block; }
.item-description { margin-top: 2px; font-size: 12px; color: var(--color-text-secondary); }
.pane-empty { padding: 32px 12px; text-align: center; font-size: 13px; color: var(--color-text-secondary); }
.transfer-controls { grid-column: 2; grid-row: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 4px; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
@media (max-width: 480px) {
  .ui-transfer { grid-template-columns: minmax(0, 1fr); gap: 8px; }
  .pane-source { grid-column: 1; grid-row: 1; }
  .transfer-controls { grid-column: 1; grid-row: 2; flex-direction: row; }
  .transfer-controls :deep(svg) { transform: rotate(90deg); }
  .pane-target { grid-column: 1; grid-row: 3; }
}
</style>
