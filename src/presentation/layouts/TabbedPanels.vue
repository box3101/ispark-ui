<script setup lang="ts">
import ProposalIcon from '../ProposalIcon.vue'

/**
 * 탭 머리 + 패널. 실측 43장 중 11장에서 쓰인 구조다.
 *
 * python-pptx 로 재 보니 탭은 `ROUND_2_SAME_RECTANGLE`(위 두 모서리만 둥근 사각)
 * 35개였고, 폭 중앙값이 캔버스의 38.2%, 높이 4.3% 였다.
 * 폭 38%면 가로로 2~3개가 들어간다 — 그래서 패널도 2~3개를 기본으로 본다.
 *
 * 탭은 장식이 아니라 "이 영역이 무엇에 대한 답인지" 꼬리표를 붙이는 장치다.
 */
export type Panel = {
  tab: string
  icon?: string
  tone?: 'navy' | 'orange'
  /** 패널 안 항목. 각 항목이 다시 제목 + 설명을 갖는 중첩 구조 */
  items: { title: string; note?: string }[]
}

withDefaults(defineProps<{ panels: Panel[] }>(), {})
</script>

<template>
  <div class="tabbed" :style="{ '--n': panels.length }">
    <section v-for="p in panels" :key="p.tab" :class="`tone-${p.tone ?? 'navy'}`">
      <header class="tab">
        <ProposalIcon v-if="p.icon" :concept="p.icon" variant="inline" :size="16" />
        <span>{{ p.tab }}</span>
      </header>
      <div class="panel">
        <article v-for="it in p.items" :key="it.title">
          <strong>{{ it.title }}</strong>
          <p v-if="it.note">{{ it.note }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.tabbed {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(var(--n), minmax(0, 1fr));
  gap: 1cqw;
}

section {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* 실측 탭 치수: 폭 38% / 높이 4.3% */
.tab {
  flex: none;
  display: flex;
  align-items: center;
  gap: 0.5cqw;
  align-self: start;
  padding: 0.65cqw 1.4cqw;
  border-radius: 0.5cqw 0.5cqw 0 0;
  font-size: 1.15cqw;
  font-weight:var(--weight-bold);
  color: #ffffff;

  > .proposal-glyph { color: #ffffff; }
}

.panel {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5cqw;
  padding: 1cqw;
  border: 1px solid #e5e8eb;
  border-top-width: 0.22cqw;
  background: #ffffff;
}

/* 패널 안의 항목이 다시 블록 — 실측 덱의 그룹 깊이는 최대 5였다 */
article {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25cqw;
  padding: 0.7cqw 0.9cqw;
  background: #f7f9fb;
  border-left: 0.22cqw solid #dfedf6;

  strong { font-size: 1.22cqw; font-weight:var(--weight-bold); color: #092e49; word-break: keep-all; }
  p { margin: 0; font-size: 1cqw; line-height: 1.4; color: #6b7684; word-break: keep-all; }
}

.tone-navy {
  .tab { background: #092e49; }
  .panel { border-top-color: #092e49; }
}

.tone-orange {
  .tab { background: #b85610; }
  .panel { border-top-color: #d9641a; }

  article { background: #fdf5ee; border-left-color: #fde3ca; }
}
</style>
