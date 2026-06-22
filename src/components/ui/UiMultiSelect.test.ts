import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { ref, defineComponent, h, nextTick } from 'vue'
import UiMultiSelect from './UiMultiSelect.vue'

const opts = [
  { label: '옵션 A', value: 'a' },
  { label: '옵션 B', value: 'b' },
  { label: '옵션 C', value: 'c' },
]

// 드롭다운 옵션은 radix-vue Popover Portal에 있어 jsdom에서 open 전까지 마운트되지 않는다.
// → 토글/선택 상호작용은 UiMultiSelect.stories.ts의 play(Default/Toggle/NumericValues)로 검증.
// 여기서는 trigger에 항상 렌더되는 라벨 로직과 id/aria만 단위 검증한다.
describe('UiMultiSelect', () => {
  // 1. 미선택 → placeholder 표시
  it('선택이 없으면 placeholder 표시', () => {
    render(UiMultiSelect, {
      props: { options: opts, modelValue: [], placeholder: '항목 선택' },
    })
    expect(screen.getByRole('button').textContent).toContain('항목 선택')
  })

  // 2. maxLabels 이하 → 라벨을 ', '로 나열
  it('maxLabels 이하 선택은 라벨을 콤마로 나열', () => {
    render(UiMultiSelect, {
      props: { options: opts, modelValue: ['a', 'b'], maxLabels: 2 },
    })
    expect(screen.getByRole('button').textContent).toContain('옵션 A, 옵션 B')
  })

  // 3. maxLabels 초과 → "첫번째 외 N건" 축약
  it('maxLabels 초과 선택은 "외 N건"으로 축약', () => {
    render(UiMultiSelect, {
      props: { options: opts, modelValue: ['a', 'b', 'c'], maxLabels: 2 },
    })
    expect(screen.getByRole('button').textContent).toContain('옵션 A 외 2건')
  })

  // 4. 외부 modelValue 변경 → trigger 라벨 동기화 (prop → display)
  it('외부 modelValue prop 변경 시 트리거 라벨 동기화', async () => {
    const Wrapper = defineComponent({
      setup() {
        const v = ref<Array<string | number>>(['a'])
        return () =>
          h('div', [
            h(UiMultiSelect, { modelValue: v.value, options: opts }),
            h('button', { onClick: () => (v.value = ['a', 'b']), id: 'switch' }, 'switch'),
          ])
      },
    })
    render(Wrapper)
    await nextTick()
    expect(screen.getAllByRole('button')[0]?.textContent).toContain('옵션 A')
    await screen.getByText('switch').click()
    await new Promise((r) => setTimeout(r, 0))
    expect(screen.getAllByRole('button')[0]?.textContent).toContain('옵션 A, 옵션 B')
  })

  // 5. id 미지정 시 useId로 자동 부여
  it('id prop 없어도 trigger에 id 자동 생성', () => {
    render(UiMultiSelect, { props: { options: opts } })
    const trigger = screen.getByRole('button')
    expect(trigger.getAttribute('id')).toBeTruthy()
    expect(trigger.getAttribute('id')).toContain('ui-multi-select-')
  })

  // 6. 숫자 value 라벨 매칭 (String 비교로 정상 표시)
  it('숫자 value도 라벨 매칭', () => {
    render(UiMultiSelect, {
      props: {
        options: [
          { label: '월', value: 1 },
          { label: '화', value: 2 },
        ],
        modelValue: [2],
      },
    })
    expect(screen.getByRole('button').textContent).toContain('화')
  })
})
