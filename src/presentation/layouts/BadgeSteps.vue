<script setup lang="ts">
import ProposalIcon from '../ProposalIcon.vue'

/**
 * 큰 번호 원 + 단계. 실측 덱에 원(OVAL)이 67개 있었고
 * 지름 중앙값이 **캔버스 폭의 11.2%** 였다 — 꽤 크다.
 *
 * 화살표는 의외로 적었다(12개). 단계를 화살표로 잇기보다
 * 번호 원을 크게 박아 순서를 읽게 하는 쪽이다.
 * 아래에 레일(직선 36개)을 깔아 연결감을 준다.
 */
export type Step = {
  title: string
  note?: string
  icon?: string
  /** 이 단계에서 나오는 산출물·확인 항목 */
  outputs?: string[]
}

withDefaults(
  defineProps<{
    steps: Step[]
    railLabel?: string
  }>(),
  {},
)
</script>

<template>
  <div class="steps" :style="{ '--n': steps.length }">
    <div class="rail" aria-hidden="true" />

    <article v-for="(s, i) in steps" :key="s.title">
      <div class="badge">
        <span class="no">{{ String(i + 1).padStart(2, '0') }}</span>
      </div>

      <div class="body">
        <header>
          <ProposalIcon v-if="s.icon" :concept="s.icon" variant="inline" :size="18" />
          <strong>{{ s.title }}</strong>
        </header>
        <p v-if="s.note">{{ s.note }}</p>

        <ul v-if="s.outputs?.length">
          <li v-for="o in s.outputs" :key="o">{{ o }}</li>
        </ul>
      </div>
    </article>

    <span v-if="railLabel" class="rail-label">{{ railLabel }}</span>
  </div>
</template>

<style lang="scss" scoped>
.steps {
  position: relative;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(var(--n), minmax(0, 1fr));
  gap: 1cqw;
  padding-top: 1cqw;
}

/* 단계를 잇는 레일 — 실측 덱도 직선으로 연결감을 준다 */
.rail {
  position: absolute;
  top: 3.8cqw;
  left: 5%;
  right: 5%;
  height: 0.18cqw;
  background: #dfedf6;
}

article {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8cqw;
  min-width: 0;
}

/* 지름 = 캔버스 폭의 ~11% (실측 중앙값) */
.badge {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.6cqw;
  height: 5.6cqw;
  border-radius: 50%;
  background: #ffffff;
  border: 0.3cqw solid #006fbd;

  .no {
    font-size: 2cqw;
    font-weight:var(--weight-bold);
    color: #006fbd;
    font-variant-numeric: tabular-nums;
  }
}

article:last-child .badge { border-color: #d9641a; .no { color: #b85610; } }

.body {
  flex: 1;
  min-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.45cqw;
  padding: 0.9cqw 1cqw;
  border: 1px solid #e5e8eb;
  background: #ffffff;
  text-align: center;

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.45cqw;

    > .proposal-glyph { color: #006fbd; }
    strong { font-size: 1.3cqw; font-weight:var(--weight-bold); color: #092e49; word-break: keep-all; }
  }

  p { margin: 0; font-size: 1cqw; color: #6b7684; line-height: 1.4; word-break: keep-all; }
}

ul {
  margin: 0.3cqw 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.3cqw;

  li {
    padding: 0.4cqw 0.5cqw;
    background: #dfedf6;
    font-size: 0.92cqw;
    font-weight:var(--weight-bold);
    color: #092e49;
    word-break: keep-all;
  }
}

.rail-label {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.95cqw;
  font-weight:var(--weight-bold);
  color: #6b7684;
}
</style>
