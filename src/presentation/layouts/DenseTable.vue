<script setup lang="ts">
import { computed } from 'vue'

/**
 * 조밀한 표. 실측 덱의 표 9개 크기는 16×9, 6×4, 10×3, 8×3, 7×2, 3×5, 7×3, 5×7, **16×10** 이었다.
 *
 * 16행 10열짜리를 A4 가로에 얹으려면 일반 표 스타일로는 안 된다.
 * 행 수에 따라 글자와 여백을 같이 줄이고, 머리행을 고정 톤으로 묶어
 * 눈이 열을 따라갈 수 있게 한다.
 */
export type Cell = string | { text: string; emphasis?: boolean }

const props = withDefaults(
  defineProps<{
    columns: string[]
    rows: Cell[][]
    /** 돋보이게 할 열 (0부터) — 보통 '우리 제안' 열 */
    highlightColumn?: number
    /** 행을 묶는 구분 — { after: 행번호, label: '소계' } */
    groupBreaks?: number[]
    caption?: string
  }>(),
  { groupBreaks: () => [] },
)

/** 행이 많아질수록 글자·여백을 함께 줄인다 */
const scale = computed(() => {
  const n = props.rows.length
  if (n <= 6) return { font: 1.15, pad: 0.72 }
  if (n <= 10) return { font: 1.0, pad: 0.52 }
  if (n <= 14) return { font: 0.9, pad: 0.38 }
  return { font: 0.82, pad: 0.28 }
})

const cellOf = (c: Cell) => (typeof c === 'string' ? { text: c, emphasis: false } : c)
</script>

<template>
  <div class="dense-table" :style="{ '--font': scale.font + 'cqw', '--pad': scale.pad + 'cqw' }">
    <table>
      <thead>
        <tr>
          <th v-for="(c, i) in columns" :key="c" scope="col" :class="{ 'is-highlight': i === highlightColumn }">
            {{ c }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, r) in rows" :key="r" :class="{ 'is-break': groupBreaks.includes(r) }">
          <component
            v-for="(cell, i) in row" :key="i"
            :is="i === 0 ? 'th' : 'td'"
            :scope="i === 0 ? 'row' : undefined"
            :class="{ 'is-highlight': i === highlightColumn, 'is-emphasis': cellOf(cell).emphasis, 'is-rowhead': i === 0 }"
          >{{ cellOf(cell).text }}</component>
        </tr>
      </tbody>
    </table>
    <p v-if="caption" class="caption">{{ caption }}</p>
  </div>
</template>

<style lang="scss" scoped>
.dense-table {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

table {
  width: 100%;
  flex: 1;
  border-collapse: collapse;
  table-layout: fixed;
}

th,
td {
  padding: var(--pad) 0.7cqw;
  border: 1px solid #e5e8eb;
  font-size: var(--font);
  line-height: 1.32;
  text-align: left;
  vertical-align: middle;
  word-break: keep-all;
}

thead th {
  background: #092e49;
  color: #ffffff;
  font-weight:var(--weight-bold);
  text-align: center;
  border-color: #092e49;
}

tbody .is-rowhead {
  background: #dfedf6;
  color: #092e49;
  font-weight:var(--weight-bold);
}

tbody td { color: #1f2937; }

/* 행 묶음 경계 — 행이 많을수록 눈이 미끄러진다 */
tbody .is-break > * { border-top: 0.2cqw solid #092e49; }

.is-highlight { background: #fde3ca; border-color: #f58220; }
thead .is-highlight { background: #b85610; border-color: #b85610; }
tbody .is-highlight.is-rowhead { background: #fde3ca; color: #b85610; }

.is-emphasis { font-weight:var(--weight-bold); color: #b85610; }

.caption {
  flex: none;
  margin: 0.6cqw 0 0;
  font-size: 0.92cqw;
  color: #6b7684;
}
</style>
