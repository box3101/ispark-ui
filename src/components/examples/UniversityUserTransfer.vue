<script setup lang="ts">
import { computed, ref } from 'vue'
import UiTransfer from '../ui/UiTransfer.vue'
import UiInput from '../ui/UiInput.vue'
import UiButton from '../ui/UiButton.vue'

const universities = [
  { id: 'foundation', name: '한국사학진흥재단' },
  { id: 'garam', name: '가람대학교' },
  { id: 'narae', name: '나래대학교' },
  { id: 'gaon', name: '가온대학교' },
  { id: 'hanbit', name: '한빛대학교' },
]
const users = [
  { id: 'kim', label: '김민수', email: 'minsu@example.com', university: 'foundation' },
  { id: 'lee', label: '이서연', email: 'seoyeon@example.com', university: 'foundation' },
  { id: 'park', label: '박지훈', email: 'jihoon@example.com', university: 'foundation' },
  { id: 'jung', label: '정하늘', email: 'haneul@example.com', university: 'garam' },
  { id: 'choi', label: '최유진', email: 'yujin@example.com', university: 'garam' },
  { id: 'han', label: '한도윤', email: 'doyun@example.com', university: 'narae' },
  { id: 'yoon', label: '윤서진', email: 'seojin@example.com', university: 'gaon' },
]
const items = users.map(user => ({ ...user, description: `${user.email} · ${universities.find(university => university.id === user.university)!.name}` }))
const university = ref('foundation')
const query = ref('')
const selected = ref(['jung', 'han'])
const saved = ref([...selected.value])
const notice = ref('')
const visibleUniversities = computed(() => universities.filter(item => item.name.includes(query.value.trim())))
const sourceFilter = computed(() => {
  const ids = new Set(users.filter(user => university.value === 'all' || user.university === university.value).map(user => user.id))
  return (item: { id: string }) => ids.has(item.id)
})
const activeName = computed(() => universities.find(item => item.id === university.value)?.name ?? '전체 대학')
const dirty = computed(() => [...selected.value].sort().join(',') !== [...saved.value].sort().join(','))
function save() { saved.value = [...selected.value]; notice.value = '예시 화면에 선택 상태를 저장했습니다. 서버에는 전송하지 않습니다.' }
function cancel() { selected.value = [...saved.value]; notice.value = '마지막 저장 상태로 되돌렸습니다.' }
</script>

<template>
  <section class="university-transfer">
    <h1>관리자 지정</h1>
    <p class="description">대학을 선택한 후 사용자를 추가하세요. 대학을 바꿔도 선택한 사용자는 유지됩니다.</p>
    <div class="assignment-layout">
      <section class="university-pane" aria-label="대학 목록">
        <header><h2>대학 목록</h2><span>{{ universities.length }}</span></header>
        <div class="university-search"><UiInput v-model="query" label="대학 검색" label-hidden type="search" placeholder="대학 검색" /></div>
        <div class="university-list" role="group" aria-label="대학 필터">
          <button type="button" :aria-pressed="university === 'all'" @click="university = 'all'">전체 대학</button>
          <button v-for="item in visibleUniversities" :key="item.id" type="button" :aria-pressed="university === item.id" @click="university = item.id">{{ item.name }}</button>
          <p v-if="!visibleUniversities.length" class="empty">검색 결과가 없습니다.</p>
        </div>
      </section>
      <div class="users-transfer">
        <UiTransfer v-model="selected" :items="items" :source-filter="sourceFilter" :source-title="`${activeName} 사용자`" target-title="선택한 사용자" searchable :list-height="320" @change="notice = ''" />
      </div>
    </div>
    <footer>
      <span>선택한 사용자 <strong>{{ selected.length }}명</strong><span v-if="dirty" class="unsaved"> · 저장 전 변경사항</span></span>
      <div class="footer-actions"><UiButton variant="secondary" :disabled="!dirty" @click="cancel">취소</UiButton><UiButton :disabled="!dirty" @click="save">저장</UiButton></div>
    </footer>
    <p v-if="notice" class="description" role="status">{{ notice }}</p>
  </section>
</template>

<style scoped>
.university-transfer { width: min(1200px, calc(100vw - 64px)); color: var(--color-text-primary); }
h1 { margin: 0 0 8px; font-size: 18px; font-weight: 700; }
.description { margin: 0 0 20px; font-size: 13px; color: var(--color-text-secondary); }
.assignment-layout { display: grid; grid-template-columns: minmax(180px, 240px) minmax(0, 1fr); gap: 16px; align-items: stretch; }
.university-pane { display: flex; flex-direction: column; min-width: 0; border: 1px solid var(--color-border); border-radius: 6px; overflow: hidden; background: var(--color-bg-elevated); }
.university-pane header { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 12px; background: var(--color-background); border-bottom: 1px solid var(--color-border); }
.university-pane h2 { font-size: 13px; font-weight: 700; margin: 0; }
.university-pane header span { font-size: 12px; color: var(--color-text-secondary); }
.university-search { padding: 12px; }
.university-list { flex: 1; min-height: 0; max-height: 370px; overflow: auto; padding: 4px 0; }
.university-list button { display: block; width: 100%; min-height: 36px; padding: 8px 12px; border: 0; border-left: 3px solid transparent; background: transparent; color: inherit; text-align: left; font-size: 13px; cursor: pointer; }
.university-list button:hover { background: var(--color-background); }
.university-list button[aria-pressed='true'] { background: color-mix(in srgb, var(--color-primary) 8%, var(--color-bg-elevated)); border-left-color: var(--color-primary); color: var(--color-primary); font-weight: 600; }
.university-list button:focus-visible { outline: 2px solid var(--color-primary); outline-offset: -2px; }
.users-transfer { min-width: 0; }
.empty { padding: 12px; font-size: 13px; color: var(--color-text-secondary); }
footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin: 16px 0; font-size: 13px; }
footer strong { color: var(--color-primary); }
.unsaved { color: var(--color-text-secondary); }
.footer-actions { display: flex; gap: 8px; margin-left: auto; }
@media (max-width: 760px) { .assignment-layout { grid-template-columns: minmax(0, 1fr); } .university-list { max-height: 180px; } }
</style>
