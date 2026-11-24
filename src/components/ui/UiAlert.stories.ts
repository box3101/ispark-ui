import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import UiAlert from './UiAlert.vue'
import UiButton from './UiButton.vue'
const meta = {
  title: 'Components/Feedback/UiAlert', component: UiAlert, tags: ['autodocs'],
  parameters: { layout: 'padded', docs: { description: { component: '페이지 안에 표시하는 안내 배너입니다. variant: info·success·warning·error·neutral. title·description 또는 기본 슬롯으로 내용을 구성합니다. dismissible로 닫기 버튼, v-model로 표시 상태, actions 슬롯으로 액션을 제어합니다. 기본 role은 status이며 긴급 알림만 alert로 지정하세요.\n\n정렬은 **첫 줄 기준**입니다. 아이콘·제목 줄·액션 버튼·닫기 버튼을 모두 같은 높이의 첫 줄 안에서 가운데로 맞춥니다. 한 줄 알럿은 전부 가운데 정렬로 보이고, 여러 줄 알럿은 첫 줄에 나란히 선 뒤 설명이 아래로 이어집니다.\n\n- `actionsPlacement`: `end`(기본, 오른쪽) / `bottom`(글자 아래, 본문이 길거나 버튼이 여러 개일 때). 알럿 폭이 480px 이하면 자동으로 아래로 내려갑니다.\n- `elevated`: 화면 위에 떠 있는 알럿(상단 고정 배너 등)용 그림자.' } } },
  args: { title: '안내', description: '데이터는 매일 장 마감 후 갱신됩니다.', variant: 'info', dismissible: false, actionsPlacement: 'end', elevated: false },
  argTypes: { actionsPlacement: { control: 'inline-radio', options: ['end', 'bottom'] } },
} satisfies Meta<typeof UiAlert>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {}
export const AllVariants: Story = {
  render: () => ({ components: { UiAlert }, template: `<div style="display: grid; gap: 12px;">
    <UiAlert title="안내" description="데이터는 매일 장 마감 후 갱신됩니다." />
    <UiAlert variant="success" title="완료" description="변경사항을 저장했습니다." />
    <UiAlert variant="warning" title="주의" description="아직 검증되지 않은 데이터입니다." />
    <UiAlert variant="error" title="오류" description="데이터를 불러오지 못했습니다." />
    <UiAlert variant="neutral" description="서비스 점검 일정을 확인해 주세요." />
  </div>` }),
}
export const Dismissible: Story = {
  render: () => ({
    components: { UiAlert, UiButton },
    setup() { const visible = ref(true); return { visible } },
    template: `<div style="display: grid; gap: 12px;"><UiAlert v-model="visible" dismissible title="안내" description="닫은 후 다시 표시할 수 있습니다." /><UiButton v-if="!visible" variant="outline" @click="visible = true">다시 표시</UiButton></div>`,
  }),
}

const longText = '공유 저장소에 다른 사용자가 저장한 최신 내용이 있습니다. 지금 화면에서 저장하지 못한 변경은 이 브라우저에 남아 있으며, 새로고침하면 최신 내용으로 바뀝니다. 필요한 변경은 먼저 내 변경 백업으로 내려받아 주세요.'

// 경우의 수 한눈에 보기 — 첫 줄 기준 정렬 확인용
export const AllCases: Story = {
  render: () => ({
    components: { UiAlert, UiButton },
    setup: () => ({ longText }),
    template: `<div style="display: grid; gap: 14px; max-width: 920px;">
      <h4 style="margin: 4px 0 0; font-size: 12px; color: #6f7a93;">① 제목만</h4>
      <UiAlert title="전략 생성 준비 중" />
      <h4 style="margin: 4px 0 0; font-size: 12px; color: #6f7a93;">② 제목 + 짧은 설명</h4>
      <UiAlert variant="neutral" title="현재 중점에 맞는 테마를 먼저 확정해 주세요." description="직접 추가하거나 저장된 전략을 편집할 수 있습니다." />
      <h4 style="margin: 4px 0 0; font-size: 12px; color: #6f7a93;">③ 제목 + 긴 설명 (여러 줄)</h4>
      <UiAlert variant="warning" title="공유 저장 충돌" :description="longText" />
      <h4 style="margin: 4px 0 0; font-size: 12px; color: #6f7a93;">④ 제목 + 버튼 (sm) — 한 줄이면 모두 가운데</h4>
      <UiAlert title="전략 생성 준비 중"><template #actions><UiButton size="sm" variant="outline">생성 중단</UiButton></template></UiAlert>
      <h4 style="margin: 4px 0 0; font-size: 12px; color: #6f7a93;">④ 설명 + 버튼 2개 (md)</h4>
      <UiAlert variant="info" description="다른 사용자의 저장 내용이 있습니다. 새로고침하면 최신 내용을 확인할 수 있습니다."><template #actions><UiButton variant="secondary">내 변경 백업</UiButton><UiButton>최신 내용 불러오기</UiButton></template></UiAlert>
      <h4 style="margin: 4px 0 0; font-size: 12px; color: #6f7a93;">⑤ 긴 설명 + 버튼 — 버튼은 첫 줄에 맞춤</h4>
      <UiAlert variant="warning" title="공유 저장 충돌" :description="longText"><template #actions><UiButton size="sm" variant="outline">다시 시도</UiButton></template></UiAlert>
      <h4 style="margin: 4px 0 0; font-size: 12px; color: #6f7a93;">⑤ 긴 설명 + 버튼 여러 개 — actionsPlacement="bottom"</h4>
      <UiAlert variant="warning" title="공유 저장 충돌" :description="longText" actions-placement="bottom"><template #actions><UiButton size="sm" variant="secondary">내 변경 백업</UiButton><UiButton size="sm">최신 내용 불러오기</UiButton></template></UiAlert>
      <h4 style="margin: 4px 0 0; font-size: 12px; color: #6f7a93;">⑥ 본문에 진행 정보 + 버튼</h4>
      <UiAlert title="요구사항 분석 중"><div>3 / 8 구간 · 약 1분 남음</div><div style="height: 6px; margin-top: 8px; border-radius: 3px; background: #dbe5fb;"><div style="width: 38%; height: 100%; border-radius: 3px; background: #3e63dd;"></div></div><template #actions><UiButton size="sm" variant="outline">생성 중단</UiButton></template></UiAlert>
      <h4 style="margin: 4px 0 0; font-size: 12px; color: #6f7a93;">⑦ 닫기 버튼 / 버튼 + 닫기</h4>
      <UiAlert dismissible variant="success" title="저장했습니다" description="변경사항이 반영되었습니다." />
      <UiAlert dismissible variant="error" title="이미지를 불러오지 못했습니다"><template #actions><UiButton size="sm" variant="outline">다시 시도</UiButton></template></UiAlert>
      <h4 style="margin: 4px 0 0; font-size: 12px; color: #6f7a93;">⑧ 좁은 폭 (360px) — 버튼 자동으로 아래</h4>
      <div style="width: 360px;"><UiAlert variant="info" description="다른 사용자의 저장 내용이 있습니다."><template #actions><UiButton size="sm" variant="secondary">내 변경 백업</UiButton><UiButton size="sm">최신 내용 불러오기</UiButton></template></UiAlert></div>
      <h4 style="margin: 4px 0 0; font-size: 12px; color: #6f7a93;">elevated — 화면 위 고정 배너</h4>
      <UiAlert elevated variant="warning" description="공유 저장에 실패했습니다. 내 변경은 이 브라우저에 남아 있습니다."><template #actions><UiButton variant="secondary">내 변경 백업</UiButton><UiButton>저장 재시도</UiButton></template></UiAlert>
    </div>`,
  }),
}
