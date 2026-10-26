import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent } from 'vue'
import ProposalBadge from './ProposalBadge.vue'
import { iconConcepts, iconSetMeta, type IconSetId } from './icon-sets.data'

const SET_IDS: IconSetId[] = ['phosphor', 'material', 'fa']

/** viewBox 문자열에서 가로세로 비율을 뽑는다 — 1이 아니면 정사각 그리드가 아니다 */
const aspect = (viewBox: string) => {
  const [, , w, h] = viewBox.split(/\s+/).map(Number)
  return w / h
}

const wrap = 'padding:28px;background:#ffffff;color:#1f2937;font-family:Pretendard,sans-serif'

// ============================================
// 세트별 배지 한 줄 — 6개를 나란히 놓고 시각적 크기가 고르게 보이는지 본다
// ============================================
const SetRow = defineComponent({
  components: { ProposalBadge },
  props: {
    setId: { type: String as () => IconSetId, required: true },
    tone: { type: String as () => 'orange' | 'blue', default: 'orange' },
    size: { type: Number, default: 82 },
  },
  setup: () => ({ iconConcepts, iconSetMeta, aspect }),
  template: `<section style="margin-bottom:34px">
    <header style="display:flex;align-items:baseline;gap:10px;margin-bottom:14px">
      <h3 style="margin:0;font-size:17px">{{ iconSetMeta[setId].title }}</h3>
      <small style="color:#6b7684">★{{ iconSetMeta[setId].stars }} · {{ iconSetMeta[setId].grid }} · {{ iconSetMeta[setId].license }}</small>
    </header>
    <div style="display:flex;gap:26px;flex-wrap:wrap">
      <div v-for="c in iconConcepts" :key="c.key" style="text-align:center;min-width:104px">
        <ProposalBadge :glyph="c.sets[setId]" :tone="tone" :size="size" />
        <div style="margin-top:9px;font-size:13px;font-weight:650">{{ c.label }}</div>
        <div style="margin-top:2px;font-size:11px;color:#8b95a1">{{ c.sets[setId].name }}</div>
      </div>
    </div>
  </section>`,
})

const Comparison = defineComponent({
  components: { SetRow },
  props: {
    tone: { type: String as () => 'orange' | 'blue', default: 'orange' },
    size: { type: Number, default: 82 },
  },
  setup: () => ({ SET_IDS }),
  template: `<div style="${wrap}">
    <SetRow v-for="id in SET_IDS" :key="id" :set-id="id" :tone="tone" :size="size" />
  </div>`,
})

const meta = {
  title: 'Presentation/Icon Set Comparison',
  component: Comparison,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          '제안 장표용 아이콘 세트 후보 3종을 같은 배지 위에서 비교한다.',
          '',
          '각 세트의 원본 SVG를 저장소에서 그대로 가져와 `viewBox`와 `path`만 추출했다.',
          '좌표계를 보정하지 않았으므로 세트별 그리드 차이가 그대로 드러난다.',
          '',
          '**보는 법** — 배지 6개를 가로로 훑으면서 글리프의 시각적 무게가 고른지 확인한다.',
          'Font Awesome은 높이 512 고정에 폭이 448~640으로 변하는 타이포그래피 그리드라',
          '같은 배지에 넣어도 아이콘마다 차지하는 면적이 최대 1.43배까지 벌어진다.',
          '',
          '비교가 끝나면 선택한 세트만 남기고 `icon-sets.data.ts`와 이 스토리는 삭제한다.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['orange', 'blue'] },
    size: { control: { type: 'range', min: 40, max: 120, step: 2 } },
  },
  args: { tone: 'orange', size: 82 },
} satisfies Meta<typeof Comparison>

export default meta
type Story = StoryObj<typeof meta>

/** 세 세트를 같은 배지·같은 크기로 쌓아서 비교 */
export const BadgeComparison: Story = {}

// ============================================
// 그리드 정합 — 글리프가 정사각 박스를 얼마나 채우는지 눈으로 확인
// ============================================
export const GridAlignment: Story = {
  name: 'Grid Alignment (비율 차이)',
  parameters: {
    docs: {
      description: {
        story:
          '점선 박스는 배지 안쪽의 정사각 영역이다. 글리프가 박스를 채우는 정도가 세트 안에서 고를수록 좋다. 비율이 1.00이 아니면 정사각 그리드가 아니라는 뜻이다.',
      },
    },
  },
  render: () => ({
    setup: () => ({ iconConcepts, iconSetMeta, SET_IDS, aspect }),
    template: `<div style="${wrap}">
      <div v-for="id in SET_IDS" :key="id" style="margin-bottom:30px">
        <h3 style="margin:0 0 12px;font-size:17px">{{ iconSetMeta[id].title }}</h3>
        <div style="display:flex;gap:18px;flex-wrap:wrap">
          <div v-for="c in iconConcepts" :key="c.key" style="text-align:center">
            <div style="width:76px;height:76px;border:1px dashed #b9c1ca;border-radius:8px;display:flex;align-items:center;justify-content:center;background:#fff">
              <svg :viewBox="c.sets[id].viewBox" width="54" height="54" aria-hidden="true">
                <path v-for="(d,i) in c.sets[id].paths" :key="i" :d="d" fill="#1f2937" />
              </svg>
            </div>
            <div style="margin-top:6px;font-size:11px;color:#8b95a1">{{ c.sets[id].viewBox }}</div>
            <div
              style="font-size:12px;font-weight:700"
              :style="{ color: Math.abs(aspect(c.sets[id].viewBox) - 1) < 0.001 ? '#1f7a4d' : '#c2410c' }"
            >{{ aspect(c.sets[id].viewBox).toFixed(2) }}</div>
          </div>
        </div>
      </div>
    </div>`,
  }),
}

// ============================================
// 실제 장표 맥락 — 5칸 카드 행에 얹어 본다
// ============================================
export const OnSlide: Story = {
  name: 'On Slide (카드 5칸)',
  parameters: {
    docs: {
      description: {
        story:
          '제안 장표의 5칸 강점 카드 배치를 재현했다. 배지만 떼어 보면 괜찮아도 카드에 얹으면 크기 차이가 눈에 띈다. 카드 톤은 장표와 같이 앞 3칸 주황 / 뒤 2칸 파랑으로 나눴다.',
      },
    },
  },
  render: () => ({
    components: { ProposalBadge },
    setup: () => ({ iconConcepts, iconSetMeta, SET_IDS }),
    template: `<div style="${wrap}">
      <div v-for="id in SET_IDS" :key="id" style="margin-bottom:30px">
        <h3 style="margin:0 0 12px;font-size:17px">{{ iconSetMeta[id].title }}</h3>
        <div style="display:flex;gap:14px">
          <article
            v-for="(c,n) in iconConcepts.slice(0,5)" :key="c.key"
            :style="{
              flex:'1',padding:'22px 16px',borderRadius:'10px',textAlign:'center',
              border:'1px solid ' + (n<3 ? '#f0cda6' : '#bcd4ea'),
              background: n<3 ? '#fdf4e9' : '#f0f6fc'
            }"
          >
            <ProposalBadge :glyph="c.sets[id]" :tone="n < 3 ? 'orange' : 'blue'" :size="64" />
            <h4 style="margin:12px 0 0;font-size:14px">{{ c.label }}</h4>
          </article>
        </div>
      </div>
    </div>`,
  }),
}

// ============================================
// 투사 거리 테스트 — 장표는 모니터가 아니라 빔프로젝터로 본다
// ============================================
export const ProjectionTest: Story = {
  name: 'Projection Test (거리·흐림)',
  parameters: {
    docs: {
      description: {
        story: [
          '제안 발표장에서 아이콘은 3~10m 떨어진 자리에서 읽힌다.',
          '같은 글리프를 82 / 48 / 28 / 18px로 줄여 보면, 세부가 많은 글리프부터 먼저 뭉개진다.',
          '`blur` 컨트롤은 빔프로젝터의 초점 흐림을 흉내 낸다 — 켜고 18px 열을 보면 차이가 분명해진다.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['orange', 'blue'] },
    blur: { control: { type: 'range', min: 0, max: 2, step: 0.2 } },
  },
  args: { tone: 'orange', blur: 0.6 },
  render: (args) => ({
    components: { ProposalBadge },
    setup: () => ({ args, iconConcepts, iconSetMeta, SET_IDS, SIZES: [82, 48, 28, 18] }),
    template: `<div style="${wrap}">
      <div v-for="id in SET_IDS" :key="id" style="margin-bottom:26px">
        <h3 style="margin:0 0 10px;font-size:16px">{{ iconSetMeta[id].title }}</h3>
        <div style="display:flex;gap:30px;align-items:flex-end">
          <div v-for="s in SIZES" :key="s">
            <div
              style="display:flex;gap:8px;align-items:center;min-height:86px"
              :style="{ filter: args.blur ? 'blur(' + args.blur + 'px)' : 'none' }"
            >
              <ProposalBadge v-for="c in iconConcepts" :key="c.key" :glyph="c.sets[id]" :tone="args.tone" :size="s" />
            </div>
            <div style="margin-top:6px;font-size:11px;color:#8b95a1">{{ s }}px</div>
          </div>
        </div>
      </div>
    </div>`,
  }),
}

// ============================================
// variant 3종 — hero / path / inline
// ============================================
export const Variants: Story = {
  name: 'Variants (hero · path · inline)',
  parameters: {
    docs: {
      description: {
        story:
          'hero는 카드 헤더, path는 소형 배지, inline은 배경 없이 본문에 섞이는 용도다. 장표의 번호 닷(step)은 계획 [12]에서 따로 다룬다.',
      },
    },
  },
  render: () => ({
    components: { ProposalBadge },
    setup: () => ({ iconConcepts, iconSetMeta, SET_IDS }),
    template: `<div style="${wrap}">
      <div v-for="id in SET_IDS" :key="id" style="margin-bottom:26px">
        <h3 style="margin:0 0 12px;font-size:17px">{{ iconSetMeta[id].title }}</h3>
        <div style="display:flex;gap:30px;align-items:center">
          <div v-for="v in ['hero','path','inline']" :key="v" style="text-align:center">
            <ProposalBadge :glyph="iconConcepts[0].sets[id]" :variant="v" :size="v === 'hero' ? 82 : v === 'path' ? 56 : 40" />
            <div style="margin-top:8px;font-size:12px;color:#6b7684">{{ v }}</div>
          </div>
        </div>
      </div>
    </div>`,
  }),
}
