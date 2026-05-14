import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { ref, defineComponent, h, nextTick } from 'vue'
import UiTab from './UiTab.vue'
import type { TabItem } from './UiTab.vue'

const tabs: TabItem[] = [
  { label: '개요', value: 'overview' },
  { label: '활동', value: 'activity' },
  { label: '설정', value: 'settings' },
]

describe('UiTab', () => {
  // 1. role=tablist + 각 탭 role=tab + aria-selected
  it('role 구조: tablist + tab + aria-selected', () => {
    const { container } = render(UiTab, {
      props: { modelValue: 'overview', tabs },
    })
    expect(container.querySelector('[role="tablist"]')).not.toBeNull()
    const tabEls = container.querySelectorAll('[role="tab"]')
    expect(tabEls.length).toBe(3)
    expect(tabEls[0].getAttribute('aria-selected')).toBe('true')
    expect(tabEls[1].getAttribute('aria-selected')).toBe('false')
  })

  // 2. 클릭 시 update:modelValue + change emit
  it('탭 클릭: update:modelValue + change emit', async () => {
    const onUpdate = vi.fn()
    const onChange = vi.fn()
    const { container } = render(UiTab, {
      props: {
        modelValue: 'overview',
        tabs,
        'onUpdate:modelValue': onUpdate,
        onChange,
      },
    })
    const second = container.querySelectorAll('[role="tab"]')[1] as HTMLButtonElement
    await fireEvent.click(second)
    expect(onUpdate).toHaveBeenCalledWith('activity')
    expect(onChange).toHaveBeenCalledWith('activity')
  })

  // 3. 현재 탭 클릭 시 emit 안 됨
  it('현재 탭 클릭: 같은 값이라 emit 미발생', async () => {
    const onUpdate = vi.fn()
    const { container } = render(UiTab, {
      props: {
        modelValue: 'overview',
        tabs,
        'onUpdate:modelValue': onUpdate,
      },
    })
    const first = container.querySelectorAll('[role="tab"]')[0]
    await fireEvent.click(first)
    expect(onUpdate).not.toHaveBeenCalled()
  })

  // 4. disabled 탭 클릭 차단
  it('disabled=true: 클릭 emit 안 됨 + aria-disabled', async () => {
    const onUpdate = vi.fn()
    const withDisabled: TabItem[] = [
      { label: '개요', value: 'overview' },
      { label: '활동', value: 'activity', disabled: true },
    ]
    const { container } = render(UiTab, {
      props: {
        modelValue: 'overview',
        tabs: withDisabled,
        'onUpdate:modelValue': onUpdate,
      },
    })
    const second = container.querySelectorAll('[role="tab"]')[1] as HTMLButtonElement
    expect(second.disabled).toBe(true)
    expect(second.getAttribute('aria-disabled')).toBe('true')
    await fireEvent.click(second)
    expect(onUpdate).not.toHaveBeenCalled()
  })

  // 5. tabindex roving — 활성 탭 0, 나머지 -1
  it('tabindex roving: 활성 0 / 비활성 -1', () => {
    const { container } = render(UiTab, {
      props: { modelValue: 'activity', tabs },
    })
    const tabEls = container.querySelectorAll('[role="tab"]')
    expect(tabEls[0].getAttribute('tabindex')).toBe('-1')
    expect(tabEls[1].getAttribute('tabindex')).toBe('0')
    expect(tabEls[2].getAttribute('tabindex')).toBe('-1')
  })

  // 6. ArrowRight — 다음 탭으로 이동 + emit
  it('ArrowRight: 다음 탭으로 이동 + emit', async () => {
    const Wrapper = defineComponent({
      setup() {
        const v = ref('overview')
        return () => h(UiTab, {
          modelValue: v.value,
          tabs,
          'onUpdate:modelValue': (x: string) => (v.value = x),
        })
      },
    })
    const { container } = render(Wrapper)
    const tablist = container.querySelector('[role="tablist"]') as HTMLElement
    await fireEvent.keyDown(tablist, { key: 'ArrowRight' })
    await nextTick()
    const active = container.querySelector('[aria-selected="true"]')!
    expect(active.textContent).toContain('활동')
  })

  // 7. ArrowLeft — wrap around (첫 탭에서 누르면 마지막 탭으로)
  it('ArrowLeft: 첫 탭에서 누르면 마지막 탭으로 wrap', async () => {
    const Wrapper = defineComponent({
      setup() {
        const v = ref('overview')
        return () => h(UiTab, {
          modelValue: v.value,
          tabs,
          'onUpdate:modelValue': (x: string) => (v.value = x),
        })
      },
    })
    const { container } = render(Wrapper)
    const tablist = container.querySelector('[role="tablist"]') as HTMLElement
    await fireEvent.keyDown(tablist, { key: 'ArrowLeft' })
    await nextTick()
    const active = container.querySelector('[aria-selected="true"]')!
    expect(active.textContent).toContain('설정')
  })

  // 8. ArrowRight — disabled 탭 skip
  it('ArrowRight: disabled 탭 자동 skip', async () => {
    const withDisabled: TabItem[] = [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b', disabled: true },
      { label: 'C', value: 'c' },
    ]
    const Wrapper = defineComponent({
      setup() {
        const v = ref('a')
        return () => h(UiTab, {
          modelValue: v.value,
          tabs: withDisabled,
          'onUpdate:modelValue': (x: string) => (v.value = x),
        })
      },
    })
    const { container } = render(Wrapper)
    const tablist = container.querySelector('[role="tablist"]') as HTMLElement
    await fireEvent.keyDown(tablist, { key: 'ArrowRight' })
    await nextTick()
    // B를 skip하고 C로 이동
    const active = container.querySelector('[aria-selected="true"]')!
    expect(active.textContent).toContain('C')
  })

  // 9. Home / End 키 — 첫/끝 활성 탭으로
  it('Home/End: 첫/끝 활성 탭으로 이동 (disabled skip)', async () => {
    const Wrapper = defineComponent({
      setup() {
        const v = ref('activity')
        return () => h(UiTab, {
          modelValue: v.value,
          tabs,
          'onUpdate:modelValue': (x: string) => (v.value = x),
        })
      },
    })
    const { container } = render(Wrapper)
    const tablist = container.querySelector('[role="tablist"]') as HTMLElement

    await fireEvent.keyDown(tablist, { key: 'End' })
    await nextTick()
    expect(container.querySelector('[aria-selected="true"]')!.textContent).toContain('설정')

    await fireEvent.keyDown(tablist, { key: 'Home' })
    await nextTick()
    expect(container.querySelector('[aria-selected="true"]')!.textContent).toContain('개요')
  })

  // 10. count 배지 렌더
  it('count prop 지정 시 카운트 배지 렌더', () => {
    const withCount: TabItem[] = [
      { label: '받은편지함', value: 'inbox', count: 12 },
      { label: '보낸편지함', value: 'sent' },
    ]
    const { container } = render(UiTab, {
      props: { modelValue: 'inbox', tabs: withCount },
    })
    const badge = container.querySelector('.ui-tab-item-count')!
    expect(badge.textContent).toBe('12')
  })
})
