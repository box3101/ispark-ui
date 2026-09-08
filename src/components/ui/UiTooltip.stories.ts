import type { Meta, StoryObj } from '@storybook/vue3'
import { onBeforeUnmount, onMounted } from 'vue'
import UiTooltip from './UiTooltip.vue'
import UiButton from './UiButton.vue'

const meta = {
  title: 'Components/Overlay/UiTooltip',
  component: UiTooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
ispark-ui 표준 툴팁 — radix-vue \`Tooltip\` 프리미티브 래핑. 접근성/포커스/ESC 닫기/포지셔닝 위임.

## 스타일
라이트 테마. 기존 다크(#5c6677 / 10px)는 글자가 작고 색이 어중간해 흐릿하다는 지적으로 교체했다.

- 배경 \`--ui-tooltip-bg\` (#fff) · 본문 \`$color-text-heading\` · 대비 16.4:1
- \`$font-size-sm\` **12px** (기존 \`$font-size-xs\` 10px 은 캡션용 토큰이라 본문에 부적합)
- 0.5px \`$color-border\` 보더 + shadow — 라이트는 페이지 배경과 명도가 가까워 경계가 필요하다

### 화살표를 다룰 때 주의할 것
- **\`transform\` 을 주면 안 된다.** radix 가 방향을 \`rotate(180deg)\` / \`rotate(±90deg)\` 로 잡는데
  덮어쓰면 화살표가 뒤집힌다. 크기는 \`TooltipArrow\` 의 \`width\`/\`height\` prop 으로 바꾼다.
- svg 는 기본 \`overflow: hidden\` 이라 \`stroke\` 바깥 절반이 잘린다 → \`overflow: visible\` 필수.
  0.5px stroke 는 서브픽셀이라 사실상 안 보인다.
- 밑변(툴팁과 맞닿는 변)에 보이던 선의 정체는 화살표 stroke 가 아니라 **툴팁 본체의 보더** 였다.
  화살표는 툴팁 바깥에 붙는데 그 자리에도 보더가 지나가기 때문. 두 가지로 처리한다.
  (1) \`stroke-dasharray: 0 30 36.06\` — 폴리곤 첫 변(밑변 30)은 건너뛰고 두 빗변만 그린다
  (2) 폴리곤을 \`translateY(-1.5)\` 로 툴팁 쪽에 밀어 넣어 흰 채움으로 보더 구간을 덮는다.
  transform 을 svg 가 아니라 **폴리곤**에 주는 이유는, 이미 회전된 좌표계 안에서 적용돼야
  4방향 모두 "툴팁 쪽"으로 움직이기 때문이다 (실측: top/bottom/left 모두 겹침 1.05px).
- 배경은 \`--ui-tooltip-bg\` 하나로 관리한다. 화살표가 \`TooltipContent\` 의 자식이라
  이 변수를 상속받으므로 배경만 바꾸면 화살표 fill 이 따라온다.

## 언제 사용하나
- 아이콘 버튼의 의미 안내 (icon-only)
- 짧은 부가 설명 (긴 글은 모달/패널 사용)
- 비활성 요소의 비활성 사유 안내

## API
- **\`content\`** \`string\` — 본문 텍스트. \`#content\` 슬롯 지정 시 무시
- **\`side\`** \`'top' | 'right' | 'bottom' | 'left'\` — 표시 위치 (기본 top). 공간 부족 시 radix 자동 flip
- **\`sideOffset\`** \`number\` — trigger와의 간격 (기본 6px)
- **\`align\`** \`'start' | 'center' | 'end'\` — 정렬 (기본 center)
- **\`delayDuration\`** \`number\` — hover 표시 지연 ms (기본 200)
- **\`showArrow\`** \`boolean\` — 화살표 표시 (기본 true)
- \`arrowWidth\` / \`arrowHeight\` \`number\` — 화살표 크기 (기본 14 / 7).
  **CSS \`transform\` 으로 키우면 안 된다** — radix 가 방향 회전에 쓰는 속성이라 화살표가 뒤집힌다
- \`defaultOpen\` \`boolean\` — 처음부터 열린 상태. 문서/시각 회귀 테스트용
- **\`fontSize\`** \`string\` — 본문 글자 크기 override (예: \`'11px'\`)
- **\`contentClass\`** \`string\` — radix portal 박스에 추가 클래스 (페이지 스타일 override)

## 슬롯
- **default** — trigger 영역 (호버 대상). \`as-child\` 패턴 — 자식 1개를 그대로 trigger로
- **content** — 본문 커스텀. 텍스트만 필요하면 \`content\` prop 사용

## 접근성
- radix-vue가 처리: role="tooltip" + aria-describedby + 포커스 시 표시 + ESC 닫기
- \`prefers-reduced-motion: reduce\` 시 fade-in 정지

## 디자인 토큰
- 배경: \`$color-text-dark\` (#5c6677) — 짙은 회색 토속
- z-index: \`$z-toast\` (500) — 모달 위에 표시 가능
        `,
      },
    },
  },
  argTypes: {
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    delayDuration: { control: { type: 'number', min: 0, max: 1000, step: 50 } },
    sideOffset: { control: { type: 'number', min: 0, max: 20 } },
    showArrow: { control: 'boolean' },
  },
} satisfies Meta<typeof UiTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    content: '저장하지 않은 변경 사항이 있습니다.',
    side: 'top',
    align: 'center',
    sideOffset: 6,
    delayDuration: 200,
    showArrow: true,
  },
  render: (args) => ({
    components: { UiTooltip, UiButton },
    setup: () => ({ args }),
    template: `
      <UiTooltip v-bind="args">
        <UiButton variant="primary">호버 해보세요</UiButton>
      </UiTooltip>
    `,
  }),
}

export const Default: Story = {
  args: {
    content: '편집하기',
  },
  render: (args) => ({
    components: { UiTooltip, UiButton },
    setup: () => ({ args }),
    template: `
      <UiTooltip v-bind="args">
        <UiButton variant="ghost" icon-only aria-label="편집">✏️</UiButton>
      </UiTooltip>
    `,
  }),
}

// 4방향 비교
export const FourSides: Story = {
  render: () => ({
    components: { UiTooltip, UiButton },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, auto); gap: 60px; padding: 40px;">
        <UiTooltip content="top 방향" side="top">
          <UiButton variant="outline">Top</UiButton>
        </UiTooltip>
        <UiTooltip content="right 방향" side="right">
          <UiButton variant="outline">Right</UiButton>
        </UiTooltip>
        <UiTooltip content="bottom 방향" side="bottom">
          <UiButton variant="outline">Bottom</UiButton>
        </UiTooltip>
        <UiTooltip content="left 방향" side="left">
          <UiButton variant="outline">Left</UiButton>
        </UiTooltip>
      </div>
    `,
  }),
}

// content 슬롯 — rich text (아이콘, 줄바꿈, 강조 등)
export const RichContent: Story = {
  render: () => ({
    components: { UiTooltip, UiButton },
    template: `
      <UiTooltip side="right">
        <UiButton variant="primary">상세 안내</UiButton>
        <template #content>
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">📝 변경 사항</div>
            <div style="font-size: 11px; opacity: 0.9; line-height: 1.6;">
              저장 시 자동 백업이 생성됩니다.<br/>
              <span style="color: #fbbf24;">⚠ 충돌 시 수동 병합 필요</span>
            </div>
          </div>
        </template>
      </UiTooltip>
    `,
  }),
}

// 비활성 버튼에 사유 안내 — 가장 흔한 패턴
export const DisabledHint: Story = {
  render: () => ({
    components: { UiTooltip, UiButton },
    template: `
      <UiTooltip content="관리자 권한이 필요합니다." side="top">
        <span style="display: inline-block;">
          <UiButton variant="primary" disabled>삭제</UiButton>
        </span>
      </UiTooltip>
    `,
  }),
}

// 짧은 지연 vs 긴 지연 비교
export const DelayVariants: Story = {
  render: () => ({
    components: { UiTooltip, UiButton },
    template: `
      <div style="display: flex; gap: 16px; padding: 40px;">
        <UiTooltip content="즉시 표시" :delay-duration="0">
          <UiButton variant="outline">delay 0ms</UiButton>
        </UiTooltip>
        <UiTooltip content="기본 200ms" :delay-duration="200">
          <UiButton variant="outline">delay 200ms</UiButton>
        </UiTooltip>
        <UiTooltip content="긴 호버 후 표시" :delay-duration="800">
          <UiButton variant="outline">delay 800ms</UiButton>
        </UiTooltip>
      </div>
    `,
  }),
}

// 시나리오 스토리 전용 CSS — Vue 런타임 템플릿은 <style> 태그를 제거하므로 head 에 직접 주입
const SPEC_SCENARIOS_CSS = `
.tt-spec { padding: 20px; background: #f6f7f9; font-family: Pretendard, system-ui, sans-serif; min-height: 100vh; }
.tt-spec h2 { margin: 0 0 4px; font-size: 16px; color: #111; }
.tt-lead { margin: 0 0 18px; font-size: 13px; color: #6f7a93; }
.tt-lead kbd, .tt-desc kbd { padding: 1px 5px; border: 1px solid #cfd6e4; border-radius: 4px; background: #fff; font-size: 11px; }
.tt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px; }
.tt-card { background: #fff; border: 1px solid #e3e7ee; border-radius: 8px; padding: 14px; }
.tt-card h4 { margin: 0 0 6px; font-size: 13px; color: #111; }
.tt-badge { margin-left: 6px; padding: 1px 6px; border-radius: 999px; background: #eef1f6; color: #6f7a93; font-size: 10px; font-weight: 700; }
.tt-desc { margin: 0 0 10px; font-size: 11px; color: #8a94a6; line-height: 1.5; }
.tt-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.tt-flip-strip { position: sticky; top: 0; z-index: 5; margin: -20px -20px 14px; padding: 2px 20px 8px; background: #fffbe6; border-bottom: 1px solid #f0e2a8; }
.tt-flip-strip .tt-flip-label { font-size: 11px; color: #8a7a30; margin: 0 0 4px; }
.tt-clip { height: 56px; overflow: hidden; border: 1px dashed #d33; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
.tt-card-dark { background: #1e2124; border-color: #333; }
.tt-card-dark h4 { color: #fff; }
.tt-card-dark .tt-desc { color: #9aa4b2; }
`

// ============================================
// 🔽 스펙 검증용 시나리오 — Floating UI 전환 방향 확정 후 정리 예정
// ============================================
// 요구 스펙 대비 "현재 구현(radix-vue)"이 어디까지 만족하는지 눈으로 확인하는 용도.
// 각 카드 제목 옆 배지는 코드가 아니라 사람이 직접 확인해야 하는 항목을 표시한다.
export const SpecScenarios: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
요구 스펙 대비 현재 구현 상태를 확인하는 시나리오 모음.

각 카드의 트리거에 **마우스를 올리거나 Tab 으로 포커스**해서 확인한다.
        `,
      },
    },
  },
  render: () => ({
    components: { UiTooltip, UiButton },
    setup: () => {
      const longText =
        '이 툴팁은 240px 를 넘는 긴 문장이다. nowrap 이면 한 줄로 뻗어 화면을 뚫고 나가고, 정상이라면 여러 줄로 접혀야 한다.'

      let styleEl: HTMLStyleElement | null = null
      onMounted(() => {
        styleEl = document.createElement('style')
        styleEl.dataset.uiTooltipSpec = ''
        styleEl.textContent = SPEC_SCENARIOS_CSS
        document.head.appendChild(styleEl)
      })
      onBeforeUnmount(() => {
        styleEl?.remove()
        styleEl = null
      })

      return { longText }
    },
    template: `
      <div class="tt-spec">
        <div class="tt-flip-strip">
          <p class="tt-flip-label">
            2. 공간 부족 시 자동 flip — 뷰포트 최상단. side="top" 이지만 위 공간이 없으므로 bottom 으로 뒤집혀야 한다
          </p>
          <UiTooltip content="위 공간이 없으니 아래로 뒤집혀야 한다" side="top">
            <UiButton variant="secondary">최상단 트리거</UiButton>
          </UiTooltip>
        </div>

        <h2>UiTooltip · 스펙 시나리오</h2>
        <p class="tt-lead">트리거에 마우스를 올리거나 <kbd>Tab</kbd> 으로 포커스해서 확인하세요.</p>

        <div class="tt-grid">
          <section class="tt-card">
            <h4>1. 방향 4종 <span class="tt-badge">현재 side prop</span></h4>
            <div class="tt-row">
              <UiTooltip content="top" side="top"><UiButton variant="secondary">top</UiButton></UiTooltip>
              <UiTooltip content="right" side="right"><UiButton variant="secondary">right</UiButton></UiTooltip>
              <UiTooltip content="bottom" side="bottom"><UiButton variant="secondary">bottom</UiButton></UiTooltip>
              <UiTooltip content="left" side="left"><UiButton variant="secondary">left</UiButton></UiTooltip>
            </div>
          </section>

          <section class="tt-card">
            <h4>3. overflow:hidden 컨테이너 <span class="tt-badge">포털 확인</span></h4>
            <p class="tt-desc">부모가 overflow:hidden 이다. 툴팁이 잘리면 포털이 동작하지 않는 것.</p>
            <div class="tt-clip">
              <UiTooltip content="잘리지 않고 컨테이너 밖으로 나와야 한다" side="top">
                <UiButton variant="secondary">clip 안쪽</UiButton>
              </UiTooltip>
            </div>
          </section>

          <section class="tt-card">
            <h4>4. maxWidth 240px + 줄바꿈 <span class="tt-badge">nowrap 금지</span></h4>
            <div class="tt-row">
              <UiTooltip :content="longText" side="bottom">
                <UiButton variant="secondary">긴 텍스트</UiButton>
              </UiTooltip>
            </div>
          </section>

          <section class="tt-card">
            <h4>5. 트리거 색상별 툴팁 <span class="tt-badge">항상 dark 동일해야</span></h4>
            <p class="tt-desc">아웃라인/솔리드 어떤 트리거든 툴팁 스타일은 같아야 한다.</p>
            <div class="tt-row">
              <UiTooltip content="dark 고정"><UiButton variant="primary">primary</UiButton></UiTooltip>
              <UiTooltip content="dark 고정"><UiButton variant="primary-line">primary-line</UiButton></UiTooltip>
              <UiTooltip content="dark 고정"><UiButton variant="secondary">secondary</UiButton></UiTooltip>
              <UiTooltip content="dark 고정"><UiButton variant="danger">danger</UiButton></UiTooltip>
            </div>
          </section>

          <section class="tt-card tt-card-dark">
            <h4>6. 어두운 배경 위 elevation <span class="tt-badge">0.5px border + shadow</span></h4>
            <p class="tt-desc">어두운 배경에서 툴팁이 묻히지 않아야 한다.</p>
            <div class="tt-row">
              <UiTooltip content="어두운 배경 위에서도 경계가 보여야 한다">
                <UiButton variant="secondary">어두운 배경</UiButton>
              </UiTooltip>
            </div>
          </section>

          <section class="tt-card">
            <h4>7. arrow on / off</h4>
            <div class="tt-row">
              <UiTooltip content="화살표 있음" :show-arrow="true"><UiButton variant="secondary">arrow true</UiButton></UiTooltip>
              <UiTooltip content="화살표 없음" :show-arrow="false"><UiButton variant="secondary">arrow false</UiButton></UiTooltip>
            </div>
          </section>

          <section class="tt-card">
            <h4>8. 지연 <span class="tt-badge">목표 open 500 / close 0</span></h4>
            <p class="tt-desc">현재는 delayDuration 하나뿐이라 닫힘 지연을 따로 줄 수 없다.</p>
            <div class="tt-row">
              <UiTooltip content="기본 200ms"><UiButton variant="secondary">기본(200)</UiButton></UiTooltip>
              <UiTooltip content="500ms 지연" :delay-duration="500"><UiButton variant="secondary">500</UiButton></UiTooltip>
              <UiTooltip content="지연 없음" :delay-duration="0"><UiButton variant="secondary">0</UiButton></UiTooltip>
            </div>
          </section>

          <section class="tt-card">
            <h4>9. 키보드 — focus 표시 / Esc 닫기</h4>
            <p class="tt-desc"><kbd>Tab</kbd> 으로 포커스 시 떠야 하고, <kbd>Esc</kbd> 로 닫혀야 한다.</p>
            <div class="tt-row">
              <UiTooltip content="Tab 으로 포커스하면 떠야 한다"><UiButton variant="secondary">포커스 대상 A</UiButton></UiTooltip>
              <UiTooltip content="Esc 로 닫혀야 한다"><UiButton variant="secondary">포커스 대상 B</UiButton></UiTooltip>
            </div>
          </section>
        </div>
      </div>
    `,
  }),
}

// 열린 상태 고정 — 화살표/보더 접합부를 hover 없이 확인한다 (시각 회귀용)
export const AlwaysOpen: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { UiTooltip, UiButton },
    template: `
      <div style="display:grid;grid-template-columns:repeat(2,220px);gap:90px 60px;padding:90px 40px;background:#fff;">
        <UiTooltip content="top 방향" side="top" default-open><UiButton variant="secondary">top</UiButton></UiTooltip>
        <UiTooltip content="right 방향" side="right" default-open><UiButton variant="secondary">right</UiButton></UiTooltip>
        <UiTooltip content="bottom 방향" side="bottom" default-open><UiButton variant="secondary">bottom</UiButton></UiTooltip>
        <UiTooltip content="left 방향" side="left" default-open><UiButton variant="secondary">left</UiButton></UiTooltip>
      </div>
    `,
  }),
}
