import type { Meta, StoryObj } from '@storybook/vue3'
import { defineComponent } from 'vue'
import {
  enterprisePalette,
  deckEvidence,
  ciReference,
  ciComplianceFindings,
  contrastRatio,
  contrastVerdict,
} from './enterprise-palette'

const wrap = 'padding:28px;background:#fff;color:#1F2937;font-family:Pretendard Variable,Pretendard,sans-serif'
const TONE = { pass: '#1f7a4d', warn: '#b45309', fail: '#b91c1c' }

/**
 * 밝은 색은 배경으로 쓰이므로 본문색을 얹었을 때를, 짙은 색은 전경으로 쓰이므로
 * 흰 배경에 올렸을 때를 잰다. 반대로 재면 배경색마다 '부적합'이 떠서 쓸모가 없다.
 */
const pairFor = (hex: string) =>
  contrastRatio(hex, '#FFFFFF') < 2
    ? { against: '#1F2937', label: '본문색 올렸을 때' }
    : { against: '#FFFFFF', label: '흰 배경에 올렸을 때' }

const Palette = defineComponent({
  setup: () => ({ enterprisePalette, contrastRatio, contrastVerdict, TONE, pairFor }),
  template: `<div style="${wrap}">
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px">
      <article v-for="s in enterprisePalette" :key="s.token" style="border:1px solid #E5E8EB;border-radius:10px;overflow:hidden">
        <div :style="{ background: s.hex, height: '68px', borderBottom: '1px solid #E5E8EB' }"></div>
        <div style="padding:11px 13px">
          <div style="display:flex;justify-content:space-between;align-items:baseline">
            <strong style="font-size:13px">
              {{ s.token }}
              <span
                v-if="s.fromCI"
                title="JDC 공식 CI 값 그대로"
                style="margin-left:4px;padding:1px 5px;border-radius:3px;background:#006FBD;color:#fff;font-size:10px;vertical-align:1px"
              >CI</span>
            </strong>
            <code style="font-size:12px;color:#6B7684">{{ s.hex }}</code>
          </div>
          <p style="margin:5px 0 0;font-size:12px">{{ s.role }}</p>
          <p style="margin:6px 0 0;font-size:11px;color:#8b95a1;line-height:1.45">{{ s.source }}</p>
          <p style="margin:7px 0 0;font-size:11px">
            <span style="color:#6B7684">{{ pairFor(s.hex).label }}</span>
            <b :style="{ color: TONE[contrastVerdict(contrastRatio(s.hex, pairFor(s.hex).against)).tone] }">
              {{ contrastRatio(s.hex, pairFor(s.hex).against).toFixed(2) }} ·
              {{ contrastVerdict(contrastRatio(s.hex, pairFor(s.hex).against)).label }}
            </b>
          </p>
        </div>
      </article>
    </div>
  </div>`,
})

const meta = {
  title: 'Presentation/Foundation',
  component: Palette,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          '제안 발표용 **확정 팔레트**. 발주처 JDC 공식 CI를 주조로 삼고, 실제 제안서 3종의 색 분포와 투사 환경 대비비로 단계를 채웠다.',
          '',
          '색 값의 출처는 `presentation/tokens.ts` 하나다. 이 페이지는 거기에 역할과 근거를 붙여 보여 준다.',
          '`CI` 배지가 붙은 색은 CI 문서의 값을 **그대로** 쓴 것이고, 나머지는 CI 색상환 H=205°에서 파생했다.',
          '',
          '> 이전 ivory `#F7F5F0` / copper `#C65B35` 팔레트는 폐기했다. 실제 제안서 어디에도 없었고 발주처 CI와도 무관한 값이었다.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Palette>

export default meta
type Story = StoryObj<typeof meta>

export const ColorPalette: Story = { name: 'Color Palette' }

// ============================================
// 발주처 CI — 주조색의 출처이자 정합성 기준
// ============================================
export const CIReference: Story = {
  name: 'CI (발주처 기준)',
  parameters: {
    docs: {
      description: {
        story: [
          'JDC 공식 CI 값이다. 팔레트의 `blue-600` · `blue-500` · `blue-300` · `taupe-500`은 이 값을 **그대로** 쓴다.',
          '',
          '아래 정합성 점검이 중요하다 — 실제 제안서 220색 중 **CI 값과 정확히 일치하는 색이 하나도 없었다.**',
          '`#006FBD`에 대해 `#016EBC`(Δ2)·`#0070C0`(Δ3)가 나온 걸 보면, 사양값을 쓰지 않고 이미지에서 스포이드로 뜬 것으로 보인다.',
        ].join('\n'),
      },
    },
  },
  render: () => ({
    setup: () => ({ ciReference, ciComplianceFindings, contrastRatio, contrastVerdict, TONE }),
    template: `<div style="${wrap}">
      <h3 style="margin:0 0 12px;font-size:15px">JDC 공식 CI</h3>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:28px">
        <div v-for="c in ciReference" :key="c.hex" style="border:1px solid #E5E8EB;border-radius:8px;overflow:hidden;width:168px">
          <div :style="{ background:c.hex, height:'54px' }"></div>
          <div style="padding:9px 11px;font-size:11px;line-height:1.6">
            <strong style="font-size:12px">{{ c.role }}</strong>
            <code style="display:block;color:#6B7684">{{ c.hex }}</code>
            <span style="color:#8b95a1">CMYK {{ c.cmyk }}</span><br>
            <span style="color:#8b95a1">RGB {{ c.rgb }}</span>
            <div style="margin-top:4px">
              <b :style="{ color: TONE[contrastVerdict(contrastRatio(c.hex,'#FFFFFF')).tone] }">
                {{ contrastRatio(c.hex,'#FFFFFF').toFixed(2) }} · {{ contrastVerdict(contrastRatio(c.hex,'#FFFFFF')).label }}
              </b>
            </div>
          </div>
        </div>
      </div>

      <h3 style="margin:0 0 10px;font-size:15px">정합성 점검 — 실제 제안서가 CI를 따랐나</h3>
      <table style="border-collapse:collapse;font-size:12px;width:100%;max-width:760px">
        <tbody>
          <tr v-for="f in ciComplianceFindings" :key="f.ci" style="border-bottom:1px solid #EFF1F3">
            <td style="padding:9px 10px;white-space:nowrap">
              <span :style="{ display:'inline-block',width:'14px',height:'14px',background:f.ci,border:'1px solid #E5E8EB',borderRadius:'3px',verticalAlign:'-2px' }"></span>
              <code style="margin-left:6px">{{ f.ci }}</code>
            </td>
            <td style="padding:9px 10px;color:#4b5563">{{ f.note }}</td>
          </tr>
        </tbody>
      </table>
    </div>`,
  }),
}

// ============================================
// 근거 — 실제 제안서에서 센 색 분포
// ============================================
export const DeckEvidence: Story = {
  name: 'Evidence (실측 분포)',
  parameters: {
    docs: {
      description: {
        story:
          '제안서 3종의 모든 채움 색을 세어 색상(hue) 계열로 묶은 결과다. 비율은 덱마다 크게 다르지만 순서는 같다 — 파랑 계열이 유채색 중 1위, 주황·빨강이 강조, 초록·보라는 거의 없다.',
      },
    },
  },
  render: () => ({
    setup: () => ({ deckEvidence }),
    template: `<div style="${wrap}">
      <section v-for="d in deckEvidence" :key="d.deck" style="margin-bottom:26px">
        <h3 style="margin:0 0 3px;font-size:15px">{{ d.deck }}</h3>
        <p style="margin:0 0 10px;font-size:12px;color:#6B7684">고유 색상 {{ d.unique }}종</p>
        <div style="display:flex;height:30px;border-radius:6px;overflow:hidden;border:1px solid #E5E8EB">
          <div
            v-for="[name,pct] in d.families" :key="name"
            :title="name + ' ' + pct + '%'"
            :style="{
              width: pct + '%',
              background: { '남색·네이비':'#14395F','파랑·하늘':'#8FB4DB','무채색':'#C9CDD2','주황·호박':'#D9641A','빨강':'#B91C1C' }[name] || '#EFF1F3'
            }"
          ></div>
        </div>
        <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:7px;font-size:11px;color:#6B7684">
          <span v-for="[name,pct] in d.families" :key="name">{{ name }} {{ pct }}%</span>
        </div>
      </section>
    </div>`,
  }),
}

// ============================================
// 대비 — 투사 환경에서 읽히는 조합만 쓴다
// ============================================
export const ContrastMatrix: Story = {
  name: 'Contrast (투사 적합성)',
  parameters: {
    docs: {
      description: {
        story:
          '발표장은 모니터보다 대비가 떨어진다. 본문은 4.5:1, 배지 위 흰 글리프 같은 비텍스트 요소는 3:1이 하한이다. `orange-400 #F58220`은 실측값이지만 흰 글리프를 얹으면 2.59라 바탕으로는 못 쓴다 — 그래서 `orange-500 #D9641A`를 따로 뒀다.',
      },
    },
  },
  render: () => ({
    setup: () => {
      const bgs = ['#FFFFFF', '#0B2744', '#0070C0', '#D9641A', '#E3EDF7']
      const fgs = ['#FFFFFF', '#0B2744', '#1F2937', '#6B7684', '#F58220']
      return { bgs, fgs, contrastRatio, contrastVerdict, TONE }
    },
    template: `<div style="${wrap}">
      <table style="border-collapse:collapse;font-size:12px">
        <thead>
          <tr>
            <th style="padding:8px 10px;text-align:left;color:#6B7684">전경 \\ 배경</th>
            <th v-for="b in bgs" :key="b" style="padding:8px 10px">
              <div :style="{ background:b, width:'44px', height:'22px', border:'1px solid #E5E8EB', borderRadius:'4px', margin:'0 auto' }"></div>
              <code style="font-size:10px;color:#8b95a1">{{ b }}</code>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="f in fgs" :key="f">
            <td style="padding:8px 10px;white-space:nowrap">
              <span :style="{ display:'inline-block',width:'14px',height:'14px',background:f,border:'1px solid #E5E8EB',borderRadius:'3px',verticalAlign:'-2px' }"></span>
              <code style="margin-left:6px;font-size:11px">{{ f }}</code>
            </td>
            <td v-for="b in bgs" :key="b" style="padding:8px 10px;text-align:center;border:1px solid #EFF1F3">
              <b :style="{ color: TONE[contrastVerdict(contrastRatio(f,b)).tone] }">{{ contrastRatio(f,b).toFixed(2) }}</b>
              <div style="font-size:10px;color:#8b95a1">{{ contrastVerdict(contrastRatio(f,b)).label }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>`,
  }),
}
