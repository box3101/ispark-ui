import{w as i,e as t,u as l,s as p,f as R}from"./index-CpO9RqPZ.js";import{r as s}from"./vue.esm-bundler-UBndlgVH.js";import{U as n}from"./UiSelect-0m-Wx2_9.js";import{S as Ee}from"./size-BPCnLhUJ.js";import"./index-yTw_IPk6.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const De={title:"Components/Form/UiSelect",component:n,tags:["autodocs"],args:{"onUpdate:modelValue":R(),onChange:R()},parameters:{docs:{description:{component:'\nispark-ui 표준 단일 선택 드롭다운. radix-vue `Select` 위에 디자인 토큰(`InputSize` / `shape`)과 라벨·에러·설명 영역을 얹은 폼 셀렉트.\n\n## 언제 사용하나\n- 옵션 약 5~30개 규모의 **단일 선택** 필드 (필터 / 카테고리 / 상태 등)\n- 폼 안에서 라벨 · 필수 · 에러 메시지가 일관된 스타일로 필요한 경우\n- 키보드 접근성 + SSR-safe id가 필요한 경우 (radix-vue + `useId`로 자동)\n\n## 제약\n- **단일 선택만** — 다중 선택은 미지원\n- **커스텀 아이템 슬롯 없음** — `options[].label` 텍스트로 고정 렌더 (배지·아이콘이 필요한 셀은 별도 컴포넌트 검토)\n- **검색·필터 미지원** — 옵션 30개를 크게 넘으면 검색형 컴포넌트를 권장\n- 드롭다운 패널 `max-height: 240px` 스크롤\n\n## 값 정규화\n- `options[].value`는 `string | number` 허용 — 내부적으로 string으로 normalize 해 radix-vue에 전달\n- `change` / `update:modelValue` payload는 **원본 타입으로 복원** (number 옵션이면 number 복원)\n- 빈 문자열 옵션이 존재하면 내부 토큰으로 우회 (radix-vue가 `:value=""` 거부) — 외부로는 `\'\'` 그대로 노출\n\n## 접근성\n- `role="combobox"` trigger + `<label htmlFor>` 자동 연결 (`id` prop 미지정 시 `useId()` 자동 부여)\n- 키보드: Space/Enter로 열기, ArrowUp/Down 옵션 이동, Enter 선택, Esc 닫기 (radix-vue 기본)\n- 에러: `aria-invalid="true"` + `aria-describedby`로 `role="alert"` 메시지 연결\n- 필수: `aria-required="true"` + 라벨 `*` (장식용, `aria-hidden`)\n\n## API 한눈에 보기\n- **Props**: 아래 Args 테이블 — Data / Field / Appearance / Behavior / Validation 그룹\n- **Slots**: 없음 (옵션 텍스트는 `options[].label`로 고정)\n- **Events**: `update:modelValue(value)` + `change(value)` 동시 emit, payload 동일\n\n## SelectOption 인터페이스\n```ts\ninterface SelectOption {\n  label: string           // 옵션 표시 텍스트\n  value: string | number  // 선택 시 emit 값 (number이면 number 복원)\n  disabled?: boolean      // 개별 옵션 비활성\n}\n```\n        '}}},argTypes:{modelValue:{control:"text",description:"v-model 바인딩 값. `options[].value`와 매칭. 빈 문자열/undefined일 때 placeholder 표시.",table:{category:"Data",type:{summary:"string | number"},defaultValue:{summary:"''"}}},options:{control:"object",description:"선택 가능한 옵션 배열. `{ label, value, disabled? }`. 숫자 `value`는 자동 round-trip(`change` payload에서 number 복원).",table:{category:"Data",type:{summary:"SelectOption[]"}}},placeholder:{control:"text",description:"`modelValue`가 비어있을 때 표시할 안내 텍스트.",table:{category:"Data",type:{summary:"string"},defaultValue:{summary:"'선택'"}}},label:{control:"text",description:"폼 라벨 텍스트. 지정 시 `<label for>`이 trigger의 `id`와 자동 연결.",table:{category:"Field",type:{summary:"string"}}},labelHidden:{control:"boolean",description:"label은 DOM에 유지하되 시각적으로만 숨김 (스크린리더 접근성 보존).",table:{category:"Field",type:{summary:"boolean"},defaultValue:{summary:"false"}}},required:{control:"boolean",description:'필수 필드 표시. 라벨 옆 `*` 추가 + trigger에 `aria-required="true"`. 검증 로직은 부모가 담당.',table:{category:"Field",type:{summary:"boolean"},defaultValue:{summary:"false"}}},id:{control:"text",description:"trigger의 명시적 `id`. 미지정 시 `useId()`로 자동 생성 (SSR 안전).",table:{category:"Field",type:{summary:"string"}}},desc:{control:"text",description:"필드 하단 보조 설명 (`aria-describedby`로 trigger와 연결). `errorMessage`가 있으면 숨김.",table:{category:"Field",type:{summary:"string"}}},size:{control:"inline-radio",options:Ee,description:"`xs`(24px · 인라인/캘린더 헤더) / `sm`(28px) / `md`(32px · 기본) / `lg`(40px) / `auth`(44px · 로그인 화면 전용) — 공용 토큰 `SelectSize`.",table:{category:"Appearance",type:{summary:"SelectSize"},defaultValue:{summary:"'md'"}}},shape:{control:"inline-radio",options:["rounded","pill"],description:"`rounded`(기본 6px) / `pill`(완전 라운드).",table:{category:"Appearance",type:{summary:"'rounded' | 'pill'"},defaultValue:{summary:"'rounded'"}}},disabled:{control:"boolean",description:"비활성 상태. trigger에 `disabled` + `aria-disabled` 부여, 드롭다운 열리지 않음.",table:{category:"Behavior",type:{summary:"boolean"},defaultValue:{summary:"false"}}},error:{control:"boolean",description:'에러 상태 강제. trigger에 `is-error` + `aria-invalid="true"`. `errorMessage`가 비어있어도 시각/접근성 에러 표시 가능.',table:{category:"Validation",type:{summary:"boolean"},defaultValue:{summary:"false"}}},errorMessage:{control:"text",description:'에러 메시지. 비어있지 않으면 `error: true` 자동 + 빨간 텍스트(`role="alert"`)로 렌더 + `aria-describedby`로 trigger와 연결. `desc`보다 우선.',table:{category:"Validation",type:{summary:"string"}}},"onUpdate:modelValue":{name:"update:modelValue",action:"update:modelValue",description:"v-model 업데이트 이벤트. 옵션 선택 시 emit. payload: `(value: string | number)` — 숫자 옵션이면 number 복원.",table:{category:"Events",type:{summary:"(value: string | number) => void"}}},onChange:{name:"change",action:"change",description:"선택 변경 이벤트. `update:modelValue`와 동시 emit. payload는 동일.",table:{category:"Events",type:{summary:"(value: string | number) => void"}}}}},c=[{label:"옵션 A",value:"a"},{label:"옵션 B",value:"b"},{label:"옵션 C",value:"c"}],u={args:{options:c,modelValue:"",placeholder:"선택해주세요",label:"",labelHidden:!1,required:!1,id:"",disabled:!1,size:"md",shape:"rounded",error:!1,errorMessage:"",desc:""},render:a=>({components:{UiSelect:n},setup:()=>{const e=s(a.modelValue??"");return{args:a,value:e}},template:'<UiSelect v-bind="args" v-model="value" />'})},g={args:{options:c,placeholder:"선택해주세요"},render:a=>({components:{UiSelect:n},setup:()=>{const e=s("");return{args:a,value:e}},template:'<UiSelect v-bind="args" v-model="value" />'}),play:async({canvasElement:a,args:e})=>{const r=i(a).getByRole("combobox");await t(r.getAttribute("aria-expanded")).toBe("false"),await l.click(r),await t(r.getAttribute("aria-expanded")).toBe("true"),await p.findByRole("option",{name:"옵션 A"}),await l.keyboard("{ArrowDown}"),await l.keyboard("{Enter}"),await t(e.onChange).toHaveBeenCalledWith("b"),await t(e["onUpdate:modelValue"]).toHaveBeenCalledWith("b"),await t(r.getAttribute("aria-expanded")).toBe("false")}},m={args:{options:c,placeholder:"선택해주세요",modelValue:"b"},render:a=>({components:{UiSelect:n},setup:()=>{const e=s(a.modelValue??"");return{args:a,value:e}},template:'<UiSelect v-bind="args" v-model="value" />'}),play:async({canvasElement:a})=>{const o=i(a).getByRole("combobox");await t(o.textContent).toContain("옵션 B"),await t(o.textContent).not.toContain("선택해주세요")}},v={args:{options:[{label:"1주일",value:7},{label:"1개월",value:30},{label:"3개월",value:90}],placeholder:"기간 선택"},render:a=>({components:{UiSelect:n},setup:()=>{const e=s("");return{args:a,value:e}},template:'<UiSelect v-bind="args" v-model="value" />'}),play:async({canvasElement:a,args:e})=>{const r=i(a).getByRole("combobox");await l.click(r);const d=await p.findByRole("option",{name:"1개월"});await l.click(d),await t(e.onChange).toHaveBeenCalledWith(30),await t(e["onUpdate:modelValue"]).toHaveBeenCalledWith(30)}},b={args:{options:c,placeholder:"키보드로 선택"},render:a=>({components:{UiSelect:n},setup:()=>{const e=s("");return{args:a,value:e}},template:'<UiSelect v-bind="args" v-model="value" />'}),play:async({canvasElement:a,args:e})=>{const r=i(a).getByRole("combobox");r.focus(),await t(r).toHaveFocus,await l.keyboard("[Space]"),await t(r.getAttribute("aria-expanded")).toBe("true"),await p.findByRole("listbox"),await l.keyboard("[ArrowDown][ArrowDown]"),await l.keyboard("[Enter]"),await t(e.onChange).toHaveBeenCalledWith("b"),await t(r.getAttribute("aria-expanded")).toBe("false");const d=e.onChange.mock.calls.length;await l.keyboard("[Space]"),await t(r.getAttribute("aria-expanded")).toBe("true"),await l.keyboard("[Escape]"),await t(r.getAttribute("aria-expanded")).toBe("false"),await t(e.onChange.mock.calls.length).toBe(d)}},y={args:{options:c,label:"카테고리",placeholder:"카테고리 선택"},render:a=>({components:{UiSelect:n},setup:()=>{const e=s("");return{args:a,value:e}},template:'<UiSelect v-bind="args" v-model="value" />'}),play:async({canvasElement:a})=>{const e=i(a),o=e.getByText("카테고리"),r=e.getByRole("combobox");await t(o.getAttribute("for")).toBe(r.getAttribute("id"))}},x={args:{options:c,label:"검색 카테고리",labelHidden:!0,placeholder:"카테고리 선택"},render:a=>({components:{UiSelect:n},setup:()=>{const e=s("");return{args:a,value:e}},template:'<UiSelect v-bind="args" v-model="value" />'}),play:async({canvasElement:a})=>{const e=i(a),o=e.getByText("검색 카테고리");await t(o).toBeTruthy(),await t(o.className).toContain("is-hidden");const r=e.getByRole("combobox");await t(o.getAttribute("for")).toBe(r.getAttribute("id"))}},w={args:{options:c,label:"필수 항목",required:!0},render:a=>({components:{UiSelect:n},setup:()=>{const e=s("");return{args:a,value:e}},template:'<UiSelect v-bind="args" v-model="value" />'}),play:async({canvasElement:a})=>{const e=i(a),o=e.getByText(/필수 항목/);await t(o.textContent).toContain("*");const r=e.getByRole("combobox");await t(r.getAttribute("aria-required")).toBe("true")}},h={args:{options:c,label:"카테고리",error:!0,placeholder:"선택해주세요"},render:a=>({components:{UiSelect:n},setup:()=>{const e=s("");return{args:a,value:e}},template:'<UiSelect v-bind="args" v-model="value" />'}),play:async({canvasElement:a})=>{const o=i(a).getByRole("combobox");await t(o.className).toContain("is-error"),await t(o.getAttribute("aria-invalid")).toBe("true");const r=o.getAttribute("aria-describedby")||"";await t(r.includes("-error")).toBe(!1),await t(r.includes("-desc")).toBe(!1)}},B={args:{options:c,label:"카테고리",errorMessage:"필수 입력입니다"},render:a=>({components:{UiSelect:n},setup:()=>{const e=s("");return{args:a,value:e}},template:'<UiSelect v-bind="args" v-model="value" />'}),play:async({canvasElement:a})=>{const e=i(a),o=e.getByRole("alert");await t(o.textContent).toContain("필수 입력입니다");const r=e.getByRole("combobox");await t(r.getAttribute("aria-invalid")).toBe("true"),await t(r.getAttribute("aria-describedby")).toBe(o.getAttribute("id"))}},f={args:{options:c,label:"카테고리",desc:"하나만 선택할 수 있습니다"},render:a=>({components:{UiSelect:n},setup:()=>{const e=s("");return{args:a,value:e}},template:'<UiSelect v-bind="args" v-model="value" />'}),play:async({canvasElement:a})=>{const e=i(a),o=e.getByText("하나만 선택할 수 있습니다"),r=e.getByRole("combobox");await t(r.getAttribute("aria-describedby")).toBe(o.getAttribute("id"))}},S={render:a=>({components:{UiSelect:n},setup:()=>{const e=s(""),o=s(""),r=s(""),d=s("");return{args:a,sampleOptions:c,vSm:e,vMd:o,vLg:r,vAuth:d}},template:`
      <div style="display: flex; flex-direction: column; gap: 12px; width: 240px;">
        <UiSelect v-bind="args" v-model="vSm" :options="sampleOptions" size="sm" placeholder="sm 28px" />
        <UiSelect v-bind="args" v-model="vMd" :options="sampleOptions" size="md" placeholder="md 32px" />
        <UiSelect v-bind="args" v-model="vLg" :options="sampleOptions" size="lg" placeholder="lg 40px" />
        <UiSelect v-bind="args" v-model="vAuth" :options="sampleOptions" size="auth" placeholder="auth 44px" />
      </div>
    `})},A={render:a=>({components:{UiSelect:n},setup:()=>{const e=s(""),o=s("");return{args:a,sampleOptions:c,vRounded:e,vPill:o}},template:`
      <div style="display: flex; flex-direction: column; gap: 12px; width: 240px;">
        <UiSelect v-bind="args" v-model="vRounded" :options="sampleOptions" shape="rounded" placeholder="rounded" />
        <UiSelect v-bind="args" v-model="vPill" :options="sampleOptions" shape="pill" placeholder="pill" />
      </div>
    `})},E={args:{options:c,placeholder:"비활성",disabled:!0},render:a=>({components:{UiSelect:n},setup:()=>{const e=s("");return{args:a,value:e}},template:'<UiSelect v-bind="args" v-model="value" />'}),play:async({canvasElement:a})=>{const o=i(a).getByRole("combobox");await t(o.hasAttribute("disabled")||o.getAttribute("aria-disabled")==="true").toBe(!0)}},U={args:{options:[{label:"활성",value:"on"},{label:"비활성",value:"off",disabled:!0}],placeholder:"선택"},render:a=>({components:{UiSelect:n},setup:()=>{const e=s("");return{args:a,value:e}},template:'<UiSelect v-bind="args" v-model="value" />'}),play:async({canvasElement:a})=>{const o=i(a).getByRole("combobox");await l.click(o);const r=await p.findByRole("option",{name:"비활성"});await t(r.hasAttribute("data-disabled")).toBe(!0)}},C={args:{options:Array.from({length:30},(a,e)=>({label:`옵션 ${e+1}`,value:`opt-${e+1}`})),placeholder:"30개 중 선택"},render:a=>({components:{UiSelect:n},setup:()=>{const e=s("");return{args:a,value:e}},template:'<UiSelect v-bind="args" v-model="value" />'}),play:async({canvasElement:a,args:e})=>{const r=i(a).getByRole("combobox");await l.click(r);const Se=(await p.findByRole("listbox")).querySelectorAll('[role="option"]');await t(Se.length).toBe(30);const Ae=await p.findByRole("option",{name:"옵션 25"});await l.click(Ae),await t(e.onChange).toHaveBeenCalledWith("opt-25")}};var O,k,V;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    options: sampleOptions,
    modelValue: '',
    placeholder: '선택해주세요',
    label: '',
    labelHidden: false,
    required: false,
    id: '',
    disabled: false,
    size: 'md',
    shape: 'rounded',
    error: false,
    errorMessage: '',
    desc: ''
  },
  render: args => ({
    components: {
      UiSelect
    },
    setup: () => {
      const value = ref<string | number>(args.modelValue ?? '');
      return {
        args,
        value
      };
    },
    template: '<UiSelect v-bind="args" v-model="value" />'
  })
}`,...(V=(k=u.parameters)==null?void 0:k.docs)==null?void 0:V.source}}};var D,H,z;g.parameters={...g.parameters,docs:{...(D=g.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    options: sampleOptions,
    placeholder: '선택해주세요'
  },
  render: args => ({
    components: {
      UiSelect
    },
    setup: () => {
      const value = ref('');
      return {
        args,
        value
      };
    },
    template: '<UiSelect v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    // radix-vue Trigger는 role=combobox
    const trigger = canvas.getByRole('combobox');

    // 초기 상태: aria-expanded="false"
    await expect(trigger.getAttribute('aria-expanded')).toBe('false');

    // 클릭으로 열기 → aria-expanded="true"
    await userEvent.click(trigger);
    await expect(trigger.getAttribute('aria-expanded')).toBe('true');

    // Portal mount 보장
    await screen.findByRole('option', {
      name: '옵션 A'
    });

    // 클릭 대신 keyboard(ArrowDown + Enter) 사용 — radix-vue가 pointer click 후 trigger ref로 focus 복귀할 때
    // Storybook play instrumenter 타이밍과 겹쳐 "Cannot read properties of null (reading 'focus')" 콘솔 에러 발생.
    // keyboard 경로는 radix가 내부에서 focus 관리를 다르게 처리해 race를 회피한다.
    // radix가 trigger open 시 첫 옵션(A)을 자동 highlight → ArrowDown 1번이면 B로 이동
    await userEvent.keyboard('{ArrowDown}'); // A → B
    await userEvent.keyboard('{Enter}'); // B 선택 + 자동 닫힘

    await expect(args.onChange).toHaveBeenCalledWith('b');
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith('b');

    // 선택 후 자동 닫힘 → aria-expanded="false"
    await expect(trigger.getAttribute('aria-expanded')).toBe('false');
  }
}`,...(z=(H=g.parameters)==null?void 0:H.docs)==null?void 0:z.source}}};var M,T,L;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    options: sampleOptions,
    placeholder: '선택해주세요',
    modelValue: 'b'
  },
  render: args => ({
    components: {
      UiSelect
    },
    setup: () => {
      const value = ref<string | number>(args.modelValue ?? '');
      return {
        args,
        value
      };
    },
    template: '<UiSelect v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    // trigger에 placeholder 대신 선택된 옵션 label("옵션 B")이 표시되어야 함
    await expect(trigger.textContent).toContain('옵션 B');
    await expect(trigger.textContent).not.toContain('선택해주세요');
  }
}`,...(L=(T=m.parameters)==null?void 0:T.docs)==null?void 0:L.source}}};var W,q,P;v.parameters={...v.parameters,docs:{...(W=v.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    options: [{
      label: '1주일',
      value: 7
    }, {
      label: '1개월',
      value: 30
    }, {
      label: '3개월',
      value: 90
    }],
    placeholder: '기간 선택'
  },
  render: args => ({
    components: {
      UiSelect
    },
    setup: () => {
      const value = ref<string | number>('');
      return {
        args,
        value
      };
    },
    template: '<UiSelect v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);
    const opt = await screen.findByRole('option', {
      name: '1개월'
    });
    await userEvent.click(opt);

    // ⚠️ 핵심: payload가 string '30'이 아닌 number 30이어야 함 (denormalize round-trip)
    await expect(args.onChange).toHaveBeenCalledWith(30);
    await expect(args['onUpdate:modelValue']).toHaveBeenCalledWith(30);
  }
}`,...(P=(q=v.parameters)==null?void 0:q.docs)==null?void 0:P.source}}};var F,N,I;b.parameters={...b.parameters,docs:{...(F=b.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    options: sampleOptions,
    placeholder: '키보드로 선택'
  },
  render: args => ({
    components: {
      UiSelect
    },
    setup: () => {
      const value = ref('');
      return {
        args,
        value
      };
    },
    template: '<UiSelect v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');

    // 포커스 → Space로 열기
    trigger.focus();
    await expect(trigger).toHaveFocus;
    await userEvent.keyboard('[Space]');
    await expect(trigger.getAttribute('aria-expanded')).toBe('true');

    // listbox 등장 확인 (Portal → screen)
    await screen.findByRole('listbox');

    // ArrowDown 2회 → 옵션 B로 이동, Enter로 선택
    await userEvent.keyboard('[ArrowDown][ArrowDown]');
    await userEvent.keyboard('[Enter]');
    await expect(args.onChange).toHaveBeenCalledWith('b');
    await expect(trigger.getAttribute('aria-expanded')).toBe('false');

    // 다시 열고 Esc로 닫기 — change 추가 호출 없어야 함
    const prevCallCount = (args.onChange as ReturnType<typeof fn>).mock.calls.length;
    await userEvent.keyboard('[Space]');
    await expect(trigger.getAttribute('aria-expanded')).toBe('true');
    await userEvent.keyboard('[Escape]');
    await expect(trigger.getAttribute('aria-expanded')).toBe('false');
    await expect((args.onChange as ReturnType<typeof fn>).mock.calls.length).toBe(prevCallCount);
  }
}`,...(I=(N=b.parameters)==null?void 0:N.docs)==null?void 0:I.source}}};var _,$,K;y.parameters={...y.parameters,docs:{...(_=y.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    options: sampleOptions,
    label: '카테고리',
    placeholder: '카테고리 선택'
  },
  render: args => ({
    components: {
      UiSelect
    },
    setup: () => {
      const value = ref('');
      return {
        args,
        value
      };
    },
    template: '<UiSelect v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('카테고리');
    const trigger = canvas.getByRole('combobox');
    // label htmlFor와 trigger id 매칭
    await expect(label.getAttribute('for')).toBe(trigger.getAttribute('id'));
  }
}`,...(K=($=y.parameters)==null?void 0:$.docs)==null?void 0:K.source}}};var j,Z,G;x.parameters={...x.parameters,docs:{...(j=x.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    options: sampleOptions,
    label: '검색 카테고리',
    labelHidden: true,
    placeholder: '카테고리 선택'
  },
  render: args => ({
    components: {
      UiSelect
    },
    setup: () => {
      const value = ref('');
      return {
        args,
        value
      };
    },
    template: '<UiSelect v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    // 라벨은 DOM에는 존재 (스크린리더 접근 가능)
    const label = canvas.getByText('검색 카테고리');
    await expect(label).toBeTruthy();
    // 시각적으로 숨김 처리 클래스
    await expect(label.className).toContain('is-hidden');
    // 그래도 trigger와 연결은 유지
    const trigger = canvas.getByRole('combobox');
    await expect(label.getAttribute('for')).toBe(trigger.getAttribute('id'));
  }
}`,...(G=(Z=x.parameters)==null?void 0:Z.docs)==null?void 0:G.source}}};var J,Q,X;w.parameters={...w.parameters,docs:{...(J=w.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    options: sampleOptions,
    label: '필수 항목',
    required: true
  },
  render: args => ({
    components: {
      UiSelect
    },
    setup: () => {
      const value = ref('');
      return {
        args,
        value
      };
    },
    template: '<UiSelect v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    // label은 "필수 항목" 텍스트 + 별도 <span>에 *. label 전체를 textContent로 검증
    const labelEl = canvas.getByText(/필수 항목/);
    await expect(labelEl.textContent).toContain('*');
    const trigger = canvas.getByRole('combobox');
    await expect(trigger.getAttribute('aria-required')).toBe('true');
  }
}`,...(X=(Q=w.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,ee,ae;h.parameters={...h.parameters,docs:{...(Y=h.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    options: sampleOptions,
    label: '카테고리',
    error: true,
    placeholder: '선택해주세요'
  },
  render: args => ({
    components: {
      UiSelect
    },
    setup: () => {
      const value = ref('');
      return {
        args,
        value
      };
    },
    template: '<UiSelect v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    // border 색상은 시각 확인이지만 클래스 적용은 검증 가능
    await expect(trigger.className).toContain('is-error');
    await expect(trigger.getAttribute('aria-invalid')).toBe('true');
    // errorMessage 없으면 aria-describedby 없어야 함 (radix-vue 자동 부여 외)
    // radix-vue가 listbox 연결로 aria-describedby를 자체 부여할 수 있음 → 우리 errorId가 포함되지 않는지 검증
    const ariaDesc = trigger.getAttribute('aria-describedby') || '';
    await expect(ariaDesc.includes('-error')).toBe(false);
    await expect(ariaDesc.includes('-desc')).toBe(false);
  }
}`,...(ae=(ee=h.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};var te,re,oe;B.parameters={...B.parameters,docs:{...(te=B.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    options: sampleOptions,
    label: '카테고리',
    errorMessage: '필수 입력입니다'
  },
  render: args => ({
    components: {
      UiSelect
    },
    setup: () => {
      const value = ref('');
      return {
        args,
        value
      };
    },
    template: '<UiSelect v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const errorEl = canvas.getByRole('alert');
    await expect(errorEl.textContent).toContain('필수 입력입니다');
    const trigger = canvas.getByRole('combobox');
    await expect(trigger.getAttribute('aria-invalid')).toBe('true');
    await expect(trigger.getAttribute('aria-describedby')).toBe(errorEl.getAttribute('id'));
  }
}`,...(oe=(re=B.parameters)==null?void 0:re.docs)==null?void 0:oe.source}}};var se,ne,le;f.parameters={...f.parameters,docs:{...(se=f.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    options: sampleOptions,
    label: '카테고리',
    desc: '하나만 선택할 수 있습니다'
  },
  render: args => ({
    components: {
      UiSelect
    },
    setup: () => {
      const value = ref('');
      return {
        args,
        value
      };
    },
    template: '<UiSelect v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const descEl = canvas.getByText('하나만 선택할 수 있습니다');
    const trigger = canvas.getByRole('combobox');
    await expect(trigger.getAttribute('aria-describedby')).toBe(descEl.getAttribute('id'));
  }
}`,...(le=(ne=f.parameters)==null?void 0:ne.docs)==null?void 0:le.source}}};var ie,ce,de;S.parameters={...S.parameters,docs:{...(ie=S.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: args => ({
    components: {
      UiSelect
    },
    setup: () => {
      const vSm = ref('');
      const vMd = ref('');
      const vLg = ref('');
      const vAuth = ref('');
      return {
        args,
        sampleOptions,
        vSm,
        vMd,
        vLg,
        vAuth
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 12px; width: 240px;">
        <UiSelect v-bind="args" v-model="vSm" :options="sampleOptions" size="sm" placeholder="sm 28px" />
        <UiSelect v-bind="args" v-model="vMd" :options="sampleOptions" size="md" placeholder="md 32px" />
        <UiSelect v-bind="args" v-model="vLg" :options="sampleOptions" size="lg" placeholder="lg 40px" />
        <UiSelect v-bind="args" v-model="vAuth" :options="sampleOptions" size="auth" placeholder="auth 44px" />
      </div>
    \`
  })
}`,...(de=(ce=S.parameters)==null?void 0:ce.docs)==null?void 0:de.source}}};var pe,ue,ge;A.parameters={...A.parameters,docs:{...(pe=A.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: args => ({
    components: {
      UiSelect
    },
    setup: () => {
      const vRounded = ref('');
      const vPill = ref('');
      return {
        args,
        sampleOptions,
        vRounded,
        vPill
      };
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 12px; width: 240px;">
        <UiSelect v-bind="args" v-model="vRounded" :options="sampleOptions" shape="rounded" placeholder="rounded" />
        <UiSelect v-bind="args" v-model="vPill" :options="sampleOptions" shape="pill" placeholder="pill" />
      </div>
    \`
  })
}`,...(ge=(ue=A.parameters)==null?void 0:ue.docs)==null?void 0:ge.source}}};var me,ve,be;E.parameters={...E.parameters,docs:{...(me=E.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    options: sampleOptions,
    placeholder: '비활성',
    disabled: true
  },
  render: args => ({
    components: {
      UiSelect
    },
    setup: () => {
      const value = ref('');
      return {
        args,
        value
      };
    },
    template: '<UiSelect v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await expect(trigger.hasAttribute('disabled') || trigger.getAttribute('aria-disabled') === 'true').toBe(true);
  }
}`,...(be=(ve=E.parameters)==null?void 0:ve.docs)==null?void 0:be.source}}};var ye,xe,we;U.parameters={...U.parameters,docs:{...(ye=U.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    options: [{
      label: '활성',
      value: 'on'
    }, {
      label: '비활성',
      value: 'off',
      disabled: true
    }],
    placeholder: '선택'
  },
  render: args => ({
    components: {
      UiSelect
    },
    setup: () => {
      const value = ref('');
      return {
        args,
        value
      };
    },
    template: '<UiSelect v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);
    const disabledOpt = await screen.findByRole('option', {
      name: '비활성'
    });
    // radix-vue가 [data-disabled] 속성 부여
    await expect(disabledOpt.hasAttribute('data-disabled')).toBe(true);
  }
}`,...(we=(xe=U.parameters)==null?void 0:xe.docs)==null?void 0:we.source}}};var he,Be,fe;C.parameters={...C.parameters,docs:{...(he=C.parameters)==null?void 0:he.docs,source:{originalSource:`{
  args: {
    options: Array.from({
      length: 30
    }, (_, i) => ({
      label: \`옵션 \${i + 1}\`,
      value: \`opt-\${i + 1}\`
    })),
    placeholder: '30개 중 선택'
  },
  render: args => ({
    components: {
      UiSelect
    },
    setup: () => {
      const value = ref('');
      return {
        args,
        value
      };
    },
    template: '<UiSelect v-bind="args" v-model="value" />'
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);

    // 30개 옵션 모두 listbox에 마운트되어 있어야 함 (radix-vue는 가상화 미사용)
    const listbox = await screen.findByRole('listbox');
    const options = listbox.querySelectorAll('[role="option"]');
    await expect(options.length).toBe(30);

    // offscreen 옵션(25번) 선택 — payload 검증
    const opt25 = await screen.findByRole('option', {
      name: '옵션 25'
    });
    await userEvent.click(opt25);
    await expect(args.onChange).toHaveBeenCalledWith('opt-25');
  }
}`,...(fe=(Be=C.parameters)==null?void 0:Be.docs)==null?void 0:fe.source}}};const He=["Playground","Default","Preselected","NumericValues","KeyboardNav","WithLabel","LabelHidden","Required","Error","ErrorMessage","Desc","Sizes","Shapes","Disabled","DisabledOption","LongList"];export{g as Default,f as Desc,E as Disabled,U as DisabledOption,h as Error,B as ErrorMessage,b as KeyboardNav,x as LabelHidden,C as LongList,v as NumericValues,u as Playground,m as Preselected,w as Required,A as Shapes,S as Sizes,y as WithLabel,He as __namedExportsOrder,De as default};
