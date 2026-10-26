import type { Meta, StoryObj } from '@storybook/vue3'
import ProposalIcon from './ProposalIcon.vue'
import { proposalIcons } from '../../presentation/icons/icon-map'

const wrap = 'padding:28px;background:#ffffff;color:#1f2937;font-family:Pretendard,sans-serif'

const meta = {
  title: 'Presentation/Proposal Icon System',
  component: ProposalIcon,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          '제안 장표용 아이콘 배지. **이름이 아니라 개념을 받는다** — `concept="data-migration"` 처럼.',
          '장표에서 필요한 건 "database 아이콘"이 아니라 "데이터 이관"이고, 글리프는 갈아끼울 수 있어야 하기 때문이다.',
          '',
          '**글리프** — Phosphor Icons(MIT) fill 웨이트. 전부 256 정사각 그리드라 여러 개를 나란히 놓아도 크기가 고르다.',
          'Font Awesome 은 높이 512 / 폭 448~640 가변이라 같은 배지에서 최대 1.43배까지 벌어진다.',
          'path 명령 수도 평균 34로 가장 단순해(Material Symbols 56, Font Awesome 35) 투사 거리에서 덜 뭉개진다.',
          '',
          '**디자인 토큰** — 색은 `presentation/tokens.ts`를 따른다. `orange500` · `blue600` 위에서만 흰 글리프가 비텍스트 대비 3:1을 넘는다.',
          '',
          '> 이전 구현은 lucide 선 아이콘에 연한 배경을 썼다. 장표와 명암이 반대라 투사하면 글리프가 날아갔고,',
          '> lucide 에는 fill 웨이트 자체가 없어 세트를 바꾸지 않으면 해결이 안 되는 문제였다.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    concept: { control: 'select', options: proposalIcons.map((c) => c.key) },
    variant: { control: 'inline-radio', options: ['hero', 'path', 'inline'] },
    tone: { control: 'inline-radio', options: [undefined, 'orange', 'blue'] },
    size: { control: { type: 'range', min: 24, max: 120, step: 2 } },
  },
  args: { concept: 'data-migration', variant: 'hero', size: 82 },
} satisfies Meta<typeof ProposalIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

// ============================================
// 어휘 전체 — 개념 24종
// ============================================
export const IconLanguage: Story = {
  name: 'Icon Language (어휘 24종)',
  parameters: {
    docs: {
      description: {
        story:
          '제안서 표준 목차에서 필요한 개념을 모아둔 것이다. 톤은 개념마다 정해져 있다 — 주황은 실행·강점, 파랑은 이해·검증. `tone`을 넘기면 덮어쓸 수 있다.',
      },
    },
  },
  render: () => ({
    components: { ProposalIcon },
    setup: () => ({ proposalIcons }),
    template: `<div style="${wrap}">
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(124px,1fr));gap:22px 12px">
        <div v-for="c in proposalIcons" :key="c.key" style="text-align:center">
          <ProposalIcon :concept="c.key" :size="72" />
          <div style="margin-top:9px;font-size:13px;font-weight:650">{{ c.label }}</div>
          <code style="font-size:10px;color:#6b7684">{{ c.key }}</code>
          <div style="font-size:10px;color:#9aa3ad">{{ c.glyph }}</div>
        </div>
      </div>
    </div>`,
  }),
}

// ============================================
// variant 3종
// ============================================
export const Variants: Story = {
  name: 'Variants (hero · path · inline)',
  parameters: {
    docs: {
      description: {
        story:
          'hero는 카드 헤더, path는 소형 배지, inline은 배경 없이 본문에 섞이는 용도다. inline은 바탕이 없어 글리프가 직접 대비를 책임지므로 `orange700` 단계를 쓴다. 장표의 번호 닷(step)은 계획 [12]에서 다룬다.',
      },
    },
  },
  render: () => ({
    components: { ProposalIcon },
    template: `<div style="${wrap}">
      <div v-for="t in ['orange','blue']" :key="t" style="display:flex;gap:30px;align-items:center;margin-bottom:22px">
        <div v-for="v in ['hero','path','inline']" :key="v" style="text-align:center">
          <ProposalIcon concept="quality" :variant="v" :tone="t" :size="v === 'hero' ? 82 : v === 'path' ? 56 : 40" />
          <div style="margin-top:8px;font-size:12px;color:#6b7684">{{ t }} · {{ v }}</div>
        </div>
      </div>
    </div>`,
  }),
}

// ============================================
// 실제 장표 맥락
// ============================================
export const OnSlide: Story = {
  name: 'On Slide (카드 5칸)',
  parameters: {
    docs: {
      description: {
        story: '제안 장표의 5칸 강점 카드 배치다. 카드 톤은 개념에 정해진 톤을 그대로 따른다.',
      },
    },
  },
  render: () => ({
    components: { ProposalIcon },
    setup: () => ({ cards: ['understanding', 'strategy', 'quality', 'organization', 'performance'] }),
    template: `<div style="${wrap}">
      <div style="display:flex;gap:14px">
        <article
          v-for="k in cards" :key="k"
          style="flex:1;padding:22px 16px;border-radius:10px;text-align:center;border:1px solid #e5e8eb;background:#ffffff"
        >
          <ProposalIcon :concept="k" :size="64" />
          <h4 style="margin:12px 0 0;font-size:14px">{{ k }}</h4>
        </article>
      </div>
    </div>`,
  }),
}
