<script setup lang="ts">
import ProposalIcon from '../ProposalIcon.vue'

/**
 * 큰 블록 안에 작은 블록. 실측 덱의 밀도가 여기서 나온다.
 *
 * python-pptx 로 재 보니 그룹이 162개, **중첩 최대 깊이 5** 였다.
 * 도형 자체는 단순하다 — 사각 47.5% + 둥근사각 28.1% + 원 12.2% 로 88%다.
 * 화려한 SmartArt 가 아니라 **같은 박스를 겹겹이 쌓아서** 지면을 채운다.
 *
 * 우리 장표가 비어 보였던 이유도 이것이다. 카드 한 겹에서 멈췄다.
 */
export type SubItem = { text: string; strong?: boolean }
export type Block = {
  label: string
  title: string
  icon?: string
  tone?: 'navy' | 'orange'
  items: SubItem[]
  /** 블록 하단에 깔리는 결론 한 줄 */
  takeaway?: string
}

withDefaults(defineProps<{ blocks: Block[] }>(), {})
</script>

<template>
  <div class="blocks" :style="{ '--n': blocks.length }">
    <section v-for="b in blocks" :key="b.title" :class="`tone-${b.tone ?? 'navy'}`">
      <header>
        <ProposalIcon v-if="b.icon" :concept="b.icon" variant="hero" :tone="b.tone === 'orange' ? 'orange' : 'blue'" :size="40" />
        <div>
          <span class="label">{{ b.label }}</span>
          <strong class="title">{{ b.title }}</strong>
        </div>
      </header>

      <ul>
        <li v-for="(it, i) in b.items" :key="i" :class="{ 'is-strong': it.strong }">
          <i class="dot" />{{ it.text }}
        </li>
      </ul>

      <p v-if="b.takeaway" class="takeaway">{{ b.takeaway }}</p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.blocks {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(var(--n), minmax(0, 1fr));
  gap: 0.9cqw;
}

section {
  display: flex;
  flex-direction: column;
  min-width: 0;
  border: 1px solid #e5e8eb;
  background: #ffffff;
}

header {
  flex: none;
  display: flex;
  align-items: center;
  gap: 0.8cqw;
  padding: 0.9cqw 1cqw;
  border-bottom: 1px solid #e5e8eb;

  .label { display: block; font-size: 0.88cqw; font-weight:var(--weight-bold); color: #6b7684; }
  .title { display: block; font-size: 1.35cqw; font-weight:var(--weight-bold); color: #092e49; word-break: keep-all; }
}

ul {
  flex: 1;
  min-height: 0;
  margin: 0;
  padding: 0.7cqw;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4cqw;
}

li {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.55cqw;
  padding: 0.55cqw 0.75cqw;
  background: #f7f9fb;
  font-size: 1.02cqw;
  line-height: 1.4;
  color: #1f2937;
  word-break: keep-all;

  .dot {
    flex: none;
    width: 0.45cqw;
    height: 0.45cqw;
    border-radius: 50%;
    background: #76b1e1;
  }

  &.is-strong {
    font-weight:var(--weight-bold);
    color: #092e49;
    background: #dfedf6;

    .dot { background: #006fbd; }
  }
}

.takeaway {
  flex: none;
  margin: 0;
  padding: 0.75cqw 1cqw;
  background: #092e49;
  color: #ffffff;
  font-size: 1.02cqw;
  font-weight:var(--weight-bold);
  word-break: keep-all;
}

.tone-orange {
  header .title { color: #b85610; }

  li .dot { background: #f58220; }
  li.is-strong { background: #fde3ca; color: #b85610; .dot { background: #d9641a; } }

  .takeaway { background: #b85610; }
}
</style>
