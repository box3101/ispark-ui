<script setup lang="ts">
import { computed, ref } from 'vue'
import UiButton from '../ui/UiButton.vue'
import UiInput from '../ui/UiInput.vue'
import UiSelect from '../ui/UiSelect.vue'
import UiIcon from '../ui/UiIcon.vue'
import UiTooltip from '../ui/UiTooltip.vue'

const university = ref('')
const status = ref<string | number>('all')
const applied = ref({ university: '', status: 'all' as string | number })
const notice = ref('')
const options = [
  { label: '전체', value: 'all' },
  { label: '진행 중', value: 'active' },
  { label: '완료', value: 'done' },
  { label: '대기', value: 'pending' },
]
const rows = [
  { name: '가람대학교', person: '김담당', department: '학생지원팀', status: 'active' },
  { name: '나래대학교', person: '이담당', department: '취업지원팀', status: 'done' },
  { name: '다온대학교', person: '박담당', department: '산학협력팀', status: 'pending' },
]
const filtered = computed(() => rows.filter(row =>
  row.name.includes(applied.value.university) &&
  (applied.value.status === 'all' || row.status === applied.value.status),
))
function search() {
  applied.value = { university: university.value.trim(), status: status.value }
  notice.value = ''
}
function reset() {
  university.value = ''
  status.value = 'all'
  search()
}
</script>

<template>
  <section class="university-list" aria-label="대학 및 담당자 목록 예시">
    <h1>대학 및 담당자</h1>
    <form class="search-panel" aria-label="대학 검색" @submit.prevent="search">
      <div class="search-field">
        <label for="university-name">대학명</label>
        <UiInput id="university-name" v-model="university" placeholder="대학명 입력" size="md" />
      </div>
      <div class="search-field">
        <label for="university-status">학교진행상태</label>
        <UiSelect id="university-status" v-model="status" :options="options" size="md" />
      </div>
      <div class="search-actions">
        <UiTooltip content="초기화">
          <UiButton variant="ghost" size="md" icon-only aria-label="초기화" @click="reset">
            <template #icon-left><UiIcon name="rotate-cw" :size="20" aria-hidden="true" /></template>
          </UiButton>
        </UiTooltip>
        <UiButton type="submit">
          <template #icon-left><i class="icon-search" aria-hidden="true" /></template>
          조회
        </UiButton>
      </div>
    </form>
    <div class="list-toolbar">
      <span role="status">총 <strong>{{ filtered.length }}</strong>건</span>
      <div class="list-actions">
        <UiButton variant="secondary" @click="notice = '엑셀 다운로드 UI 예시입니다. 실제 파일 다운로드는 서비스에서 연결합니다.'">
          <template #icon-left><i class="icon-download" aria-hidden="true" /></template>
          엑셀 다운로드
        </UiButton>
        <UiButton @click="notice = '등록 버튼 UI 예시입니다. 서비스의 등록 화면으로 연결합니다.'">
          <template #icon-left><i class="icon-plus" aria-hidden="true" /></template>
          등록
        </UiButton>
      </div>
    </div>
    <p v-if="notice" class="notice" role="status">{{ notice }}</p>
    <div class="table-scroll">
      <table>
        <caption class="sr-only">대학 및 담당자 샘플 데이터</caption>
        <thead><tr><th scope="col">대학명</th><th scope="col">담당자</th><th scope="col">부서</th><th scope="col">학교진행상태</th></tr></thead>
        <tbody>
          <tr v-for="row in filtered" :key="row.name">
            <td>{{ row.name }}</td><td>{{ row.person }}</td><td>{{ row.department }}</td>
            <td>{{ options.find(option => option.value === row.status)?.label }}</td>
          </tr>
          <tr v-if="!filtered.length"><td colspan="4" class="empty">검색 결과가 없습니다.</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.university-list { color: var(--color-text-primary); padding: 8px; }
h1 { margin: 0 0 20px; font-size: 18px; font-weight: 700; color: var(--color-text-heading, var(--color-text-primary)); }
.search-panel { display: flex; flex-wrap: wrap; align-items: center; gap: 16px 24px; padding: 16px; border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-background); }
.search-field { display: flex; align-items: center; gap: 12px; }
.search-field label { white-space: nowrap; font-size: 12px; color: var(--color-text-secondary); }
.search-field :deep(.ui-input-outer) { width: 240px; }
.search-field :deep(.ui-select-outer) { width: 160px; }
.search-actions, .list-actions { display: flex; align-items: center; gap: 8px; }
.search-actions { margin-left: auto; }
.list-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin: 20px 0 12px; font-size: 13px; }
.list-toolbar strong { color: var(--color-primary); }
.table-scroll { overflow-x: auto; }
table { width: 100%; min-width: 520px; border-collapse: collapse; font-size: 13px; text-align: left; }
th { background: var(--color-background); font-weight: 600; }
th, td { padding: 14px 16px; border-bottom: 1px solid var(--color-border); }
th { border-top: 1px solid var(--color-border); }
.empty { text-align: center; padding: 40px; color: var(--color-text-secondary); }
.notice { font-size: 13px; color: var(--color-text-secondary); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
@media (max-width: 640px) {
  .search-field { width: 100%; }
  .search-field label { width: 84px; flex-shrink: 0; }
  .search-field :deep(.ui-input-outer), .search-field :deep(.ui-select-outer) { width: auto; flex: 1; min-width: 0; }
  .search-actions { width: 100%; justify-content: flex-end; }
}
</style>
