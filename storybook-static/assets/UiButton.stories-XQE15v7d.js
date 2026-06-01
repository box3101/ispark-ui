import{w as Z,u as q,e as J,f as K}from"./index-CpO9RqPZ.js";import{U as i}from"./UiButton-Cb1n7GIR.js";import{a as V}from"./size-BPCnLhUJ.js";import"./vue.esm-bundler-UBndlgVH.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const Q=["rounded","pill","circle"],at={title:"Components/Form/UiButton",component:i,tags:["autodocs"],args:{onClick:K()},parameters:{docs:{description:{component:'\n## 핵심 props\n\n- **`variant`** `primary` | `secondary` | `ghost` | `danger` — 시멘틱 4종\n- **`size`** `xs` | `sm` | `md` | `lg` — 24 / 28 / 32 / 40px (공용 토큰)\n- **`iconSize`** `xs` | `sm` | `md` | `lg` — 미지정 시 size 따라감, 명시 시 override\n- **`shape`** `rounded`(6px) | `pill`(완전 라운드) | `circle`(iconOnly FAB)\n- **`as`** `button` | `a` — 링크로 사용 시 `as="a"` + `href`\n- **`target`** `_blank` 등 — `as="a"` 전용. `_blank`이면 `rel="noopener noreferrer"` 자동 부여\n- **`type`** `button` | `submit` — 기본 `button` (form 안 의도치 않은 submit 방지)\n- **`iconOnly`** + **`ariaLabel`** — 아이콘 전용 버튼은 ariaLabel 필수 (스크린리더)\n- **`disabled`** / **`loading`** / **`fullWidth`**\n\n> **외부 메서드**: 외부에서 `buttonRef.value.focus()` / `.blur()` / `.el` 호출 가능 (defineExpose).\n\n---\n\n## 디자인 토큰\n\nsize/shape는 `src/styles/tokens/_size.scss`, `_shape.scss` 공용 토큰 참조.\n같은 토큰을 UiInput, UiSelect 등도 공유하여 `<UiInput size="md"> + <UiButton size="md">` 검색바 자동 정렬.\n\n---\n\n## 테스트 현황\n\n이 컴포넌트는 **자동 테스트 17개**로 동작이 보장됩니다.\n\n- **동작 계약** — 클릭 emit, disabled/loading 차단\n- **안전성** — type 기본값 button (form submit 방지), type="reset" 제거\n- **접근성** — iconOnly + ariaLabel 시 aria-label 적용\n- **확장성 (polymorphic)** — as="a" + href, disabled 시 aria-disabled+tabindex\n- **보안** — as="a" + target="\\_blank" 시 rel="noopener noreferrer" 자동 부여\n- **shape** — rounded(기본) / pill / circle 클래스 적용\n- **iconSize** — 미지정 시 size 따라감, override 가능\n\n> 테스트 코드: `src/components/ui/UiButton.test.ts`\n        '}}},argTypes:{variant:{control:"select",options:["primary","secondary","outline","ghost","danger"],description:"variant 5종 — primary(강조) / secondary(보조) / outline(테두리) / ghost(트리거) / danger(파괴)"},size:{control:"inline-radio",options:V,description:"xs(24px) / sm(28px) / md(32px·기본) / lg(40px) — 공용 토큰"},shape:{control:"inline-radio",options:Q,description:"rounded(기본 6px) / pill(완전 라운드) / circle(iconOnly FAB)"},as:{control:"inline-radio",options:["button","a"],description:"렌더링 태그 — button(기본) / a(링크)"},type:{control:"inline-radio",options:["button","submit"],description:'button 태그일 때만 적용. 기본 "button" (form 안 의도치 않은 submit 방지)'},target:{control:"inline-radio",options:["(없음)","_self","_blank"],mapping:{"(없음)":void 0},description:'as="a"일 때만 적용. _blank이면 rel="noopener noreferrer" 자동'},disabled:{control:"boolean"},loading:{control:"boolean"},fullWidth:{control:"boolean"},iconOnly:{control:"boolean"},ariaLabel:{control:"text",description:"iconOnly=true 시 필수 (접근성)"},href:{control:"text",description:'as="a"일 때 링크 경로'}}},B=["(없음)","plus","edit","trashcan","close","search","check","arrow-right","download","chevron-down","refresh"],s={argTypes:{iconLeft:{control:"select",options:B,description:"🧪 데모 전용 (실제 API 아님). 실제는 #icon-left slot 사용"},iconRight:{control:"select",options:B,description:"🧪 데모 전용 (실제 API 아님). 실제는 #icon-right slot 사용"},label:{control:"text",description:"🧪 데모 전용 버튼 텍스트"},iconSize:{control:"inline-radio",options:["(자동)",...V],mapping:{"(자동)":void 0},description:"아이콘 사이즈 — (자동) 시 size 따라감, 명시 시 override"}},args:{variant:"primary",size:"md",shape:"rounded",iconLeft:"(없음)",iconRight:"(없음)",label:"버튼",iconSize:"(자동)"},parameters:{docs:{source:{language:"html",transform:(e,a)=>{const t=a.args||{},n=[];t.variant&&t.variant!=="primary"&&n.push(`variant="${t.variant}"`),t.size&&t.size!=="md"&&n.push(`size="${t.size}"`),t.shape&&t.shape!=="rounded"&&n.push(`shape="${t.shape}"`),t.iconSize&&t.iconSize!=="(자동)"&&n.push(`icon-size="${t.iconSize}"`),t.as&&t.as!=="button"&&n.push(`as="${t.as}"`),t.as!=="a"&&t.type&&t.type!=="button"&&n.push(`type="${t.type}"`),t.href&&n.push(`href="${t.href}"`),t.as==="a"&&t.target&&n.push(`target="${t.target}"`),t.disabled&&n.push("disabled"),t.loading&&n.push("loading"),t.fullWidth&&n.push("full-width"),t.iconOnly&&n.push("icon-only"),t.ariaLabel&&n.push(`aria-label="${t.ariaLabel}"`);const g=n.length?`<UiButton ${n.join(" ")}`:"<UiButton",H=t.iconLeft&&t.iconLeft!=="(없음)",X=t.iconRight&&t.iconRight!=="(없음)",f=t.iconOnly?"":t.label||"버튼",o=[];return H&&o.push(`  <template #icon-left>
    <i class="icon-${t.iconLeft}" />
  </template>`),f&&o.push(`  ${f}`),X&&o.push(`  <template #icon-right>
    <i class="icon-${t.iconRight}" />
  </template>`),o.length===0?`${g} />`:`${g}>
${o.join(`
`)}
</UiButton>`}}}},render:e=>({components:{UiButton:i},setup:()=>({args:e}),template:`
      <UiButton v-bind="args">
        <template v-if="args.iconLeft && args.iconLeft !== '(없음)'" #icon-left>
          <i :class="['icon-' + args.iconLeft]" />
        </template>
        {{ !args.iconOnly ? (args.label || '버튼') : '' }}
        <template v-if="args.iconRight && args.iconRight !== '(없음)'" #icon-right>
          <i :class="['icon-' + args.iconRight]" />
        </template>
      </UiButton>
    `}),play:async({canvasElement:e,args:a})=>{const t=Z(e).getByRole("button");await q.click(t),await J(a.onClick).toHaveBeenCalledTimes(1)}},r={render:()=>({components:{UiButton:i},template:`
      <div style="display: flex; flex-direction: column; gap: 28px; font-family: inherit;">
        <!-- 행 헤더 + 4 variants × 4 size 그리드 -->
        <section>
          <h4 style="margin: 0 0 12px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.06em;">
            Variant × Size
          </h4>
          <div style="display: grid; grid-template-columns: 80px repeat(4, auto); gap: 12px 14px; align-items: center;">
            <span></span>
            <span style="font-size: 12px; color: #6b7280;">xs · 24</span>
            <span style="font-size: 12px; color: #6b7280;">sm · 28</span>
            <span style="font-size: 12px; color: #6b7280;">md · 32</span>
            <span style="font-size: 12px; color: #6b7280;">lg · 40</span>

            <span style="font-size: 12px; color: #6b7280;">primary</span>
            <UiButton variant="primary" size="xs">Primary</UiButton>
            <UiButton variant="primary" size="sm">Primary</UiButton>
            <UiButton variant="primary" size="md">Primary</UiButton>
            <UiButton variant="primary" size="lg">Primary</UiButton>

            <span style="font-size: 12px; color: #6b7280;">secondary</span>
            <UiButton variant="secondary" size="xs">Secondary</UiButton>
            <UiButton variant="secondary" size="sm">Secondary</UiButton>
            <UiButton variant="secondary" size="md">Secondary</UiButton>
            <UiButton variant="secondary" size="lg">Secondary</UiButton>

            <span style="font-size: 12px; color: #6b7280;">ghost</span>
            <UiButton variant="ghost" size="xs">Ghost</UiButton>
            <UiButton variant="ghost" size="sm">Ghost</UiButton>
            <UiButton variant="ghost" size="md">Ghost</UiButton>
            <UiButton variant="ghost" size="lg">Ghost</UiButton>

            <span style="font-size: 12px; color: #6b7280;">outline</span>
            <UiButton variant="outline" size="xs">Outline</UiButton>
            <UiButton variant="outline" size="sm">Outline</UiButton>
            <UiButton variant="outline" size="md">Outline</UiButton>
            <UiButton variant="outline" size="lg">Outline</UiButton>

            <span style="font-size: 12px; color: #6b7280;">danger</span>
            <UiButton variant="danger" size="xs">Danger</UiButton>
            <UiButton variant="danger" size="sm">Danger</UiButton>
            <UiButton variant="danger" size="md">Danger</UiButton>
            <UiButton variant="danger" size="lg">Danger</UiButton>
          </div>
        </section>

        <!-- State 매트릭스: variant × (default/disabled/loading) -->
        <section>
          <h4 style="margin: 0 0 12px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.06em;">
            State (md size)
          </h4>
          <div style="display: grid; grid-template-columns: 80px repeat(3, auto); gap: 12px 14px; align-items: center;">
            <span></span>
            <span style="font-size: 12px; color: #6b7280;">default</span>
            <span style="font-size: 12px; color: #6b7280;">disabled</span>
            <span style="font-size: 12px; color: #6b7280;">loading</span>

            <span style="font-size: 12px; color: #6b7280;">primary</span>
            <UiButton variant="primary">Save</UiButton>
            <UiButton variant="primary" disabled>Save</UiButton>
            <UiButton variant="primary" loading>Saving…</UiButton>

            <span style="font-size: 12px; color: #6b7280;">secondary</span>
            <UiButton variant="secondary">Cancel</UiButton>
            <UiButton variant="secondary" disabled>Cancel</UiButton>
            <UiButton variant="secondary" loading>Cancel</UiButton>

            <span style="font-size: 12px; color: #6b7280;">ghost</span>
            <UiButton variant="ghost">Edit</UiButton>
            <UiButton variant="ghost" disabled>Edit</UiButton>
            <UiButton variant="ghost" loading>Edit</UiButton>

            <span style="font-size: 12px; color: #6b7280;">outline</span>
            <UiButton variant="outline">Cancel</UiButton>
            <UiButton variant="outline" disabled>Cancel</UiButton>
            <UiButton variant="outline" loading>Cancel</UiButton>

            <span style="font-size: 12px; color: #6b7280;">danger</span>
            <UiButton variant="danger">Delete</UiButton>
            <UiButton variant="danger" disabled>Delete</UiButton>
            <UiButton variant="danger" loading>Deleting…</UiButton>
          </div>
        </section>

        <!-- 폭/iconOnly 변형 -->
        <section>
          <h4 style="margin: 0 0 12px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.06em;">
            Layout
          </h4>
          <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
            <UiButton variant="primary" fullWidth>fullWidth — 부모 100%</UiButton>
            <div style="display: flex; gap: 8px;">
              <UiButton variant="secondary" iconOnly aria-label="검색">
                <template #icon-left><i class="icon-search size-16" /></template>
              </UiButton>
              <UiButton variant="ghost" iconOnly aria-label="설정">
                <template #icon-left><i class="icon-setting size-16" /></template>
              </UiButton>
              <UiButton variant="primary">
                <template #icon-left><i class="icon-plus size-16 icon-white" /></template>
                새로 만들기
              </UiButton>
            </div>
          </div>
        </section>
      </div>
    `})},l={render:()=>({components:{UiButton:i},template:`
      <div style="display: flex; gap: 12px; align-items: center;">
        <UiButton size="xs">XS (24px)</UiButton>
        <UiButton size="sm">SM (28px)</UiButton>
        <UiButton size="md">MD (32px)</UiButton>
        <UiButton size="lg">LG (40px)</UiButton>
      </div>
    `})},p={name:"모서리 모양 (shape)",render:()=>({components:{UiButton:i},template:`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">rounded</span>
          <UiButton variant="primary" shape="rounded">기본 6px</UiButton>
          <UiButton variant="secondary" shape="rounded">취소</UiButton>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">pill</span>
          <UiButton variant="primary" shape="pill">완전 라운드</UiButton>
          <UiButton variant="secondary" shape="pill">필터</UiButton>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">circle</span>
          <UiButton variant="primary" shape="circle" iconOnly aria-label="추가">
            <template #icon-left><i class="icon-plus icon-white" /></template>
          </UiButton>
          <UiButton variant="ghost" shape="circle" iconOnly aria-label="닫기">
            <template #icon-left><i class="icon-close" /></template>
          </UiButton>
          <UiButton variant="danger" shape="circle" iconOnly aria-label="삭제">
            <template #icon-left><i class="icon-trashcan icon-white" /></template>
          </UiButton>
        </div>
      </div>
    `})},c={name:"아이콘 사용",render:()=>({components:{UiButton:i},template:`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">icon-left</span>
          <UiButton variant="primary">
            <template #icon-left><i class="icon-plus" /></template>
            Agent 추가
          </UiButton>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">icon-right</span>
          <UiButton variant="secondary">
            다음
            <template #icon-right><i class="icon-arrow-right" /></template>
          </UiButton>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">iconOnly</span>
          <UiButton variant="ghost" iconOnly aria-label="편집">
            <template #icon-left><i class="icon-edit" /></template>
          </UiButton>
          <UiButton variant="ghost" iconOnly aria-label="삭제">
            <template #icon-left><i class="icon-trashcan" /></template>
          </UiButton>
          <UiButton variant="ghost" iconOnly aria-label="다운로드">
            <template #icon-left><i class="icon-download" /></template>
          </UiButton>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">iconSize</span>
          <UiButton variant="primary" size="md" icon-size="xs">
            <template #icon-left><i class="icon-plus" /></template>
            작은 아이콘
          </UiButton>
          <UiButton variant="primary" size="md" icon-size="lg">
            <template #icon-left><i class="icon-plus" /></template>
            큰 아이콘
          </UiButton>
        </div>
      </div>
    `})},d={name:"확장: 링크로 사용",render:()=>({components:{UiButton:i},template:`
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
        <UiButton as="a" href="/agent/list" variant="primary">
          <template #icon-left><i class="icon-arrow-right" /></template>
          내부 링크 (target 없음)
        </UiButton>
        <UiButton as="a" href="https://anthropic.com" target="_blank" variant="secondary">
          외부 링크 (_blank — rel 자동 적용)
          <template #icon-right><i class="icon-arrow-right" /></template>
        </UiButton>
        <UiButton as="a" href="/x" variant="secondary" disabled>
          비활성 링크 (aria-disabled + tabindex=-1)
        </UiButton>
        <p style="margin: 4px 0 0; font-size: 12px; color: #6f7a93;">
          target="_blank"인 경우 자동으로 <code>rel="noopener noreferrer"</code> 부여 (브라우저 inspect로 확인)
        </p>
      </div>
    `})},u={name:"접근성: iconOnly + ariaLabel",render:()=>({components:{UiButton:i},template:`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <p style="margin: 0; font-size: 13px; color: #4d5462;">
          iconOnly=true 시 <code>ariaLabel</code> 필수 — 스크린리더가 버튼 용도를 인지.
          미지정 시 dev 콘솔 경고 출력.
        </p>
        <div style="display: flex; gap: 8px;">
          <UiButton variant="ghost" iconOnly aria-label="편집">
            <template #icon-left><i class="icon-edit" /></template>
          </UiButton>
          <UiButton variant="ghost" iconOnly aria-label="삭제">
            <template #icon-left><i class="icon-trashcan" /></template>
          </UiButton>
          <UiButton variant="danger" iconOnly aria-label="모두 삭제">
            <template #icon-left><i class="icon-trashcan icon-white" /></template>
          </UiButton>
        </div>
      </div>
    `})},m={name:"안전성: form 안 type 동작",render:()=>({components:{UiButton:i},setup(){return{onSubmit:a=>{a.preventDefault(),alert("form submit 발생!")}}},template:`
      <form @submit="onSubmit" style="display: flex; flex-direction: column; gap: 12px; padding: 16px; background: #f4f7f9; border-radius: 8px; max-width: 360px;">
        <input type="text" placeholder="검색어" style="padding: 8px; border: 1px solid #dce4e9; border-radius: 6px;" />
        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <UiButton variant="secondary">취소 (type=button 기본)</UiButton>
          <UiButton variant="primary" type="submit">검색 (type=submit)</UiButton>
        </div>
        <p style="margin: 0; font-size: 12px; color: #6f7a93;">
          취소 버튼은 type=button 기본값으로 submit이 발생하지 않습니다. 검색만 alert 발생.
        </p>
      </form>
    `})},y={name:"실전: 모달 푸터",render:()=>({components:{UiButton:i},template:`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <div style="display: flex; gap: 8px; justify-content: flex-end; padding: 16px; background: #f4f7f9; border-radius: 8px;">
          <UiButton variant="secondary">취소</UiButton>
          <UiButton variant="primary">저장</UiButton>
        </div>
        <div style="display: flex; gap: 8px; justify-content: flex-end; padding: 16px; background: #f4f7f9; border-radius: 8px;">
          <UiButton variant="secondary">취소</UiButton>
          <UiButton variant="danger">삭제</UiButton>
        </div>
      </div>
    `})};var U,x,v;s.parameters={...s.parameters,docs:{...(U=s.parameters)==null?void 0:U.docs,source:{originalSource:`{
  argTypes: {
    iconLeft: {
      control: 'select',
      options: ICON_OPTIONS,
      description: '🧪 데모 전용 (실제 API 아님). 실제는 #icon-left slot 사용'
    },
    iconRight: {
      control: 'select',
      options: ICON_OPTIONS,
      description: '🧪 데모 전용 (실제 API 아님). 실제는 #icon-right slot 사용'
    },
    label: {
      control: 'text',
      description: '🧪 데모 전용 버튼 텍스트'
    },
    iconSize: {
      control: 'inline-radio',
      options: ['(자동)', ...SIZES],
      // '(자동)' 라벨 → 실제 prop은 undefined (size 자동 따라감)
      mapping: {
        '(자동)': undefined
      },
      description: '아이콘 사이즈 — (자동) 시 size 따라감, 명시 시 override'
    }
  } as never,
  args: {
    variant: 'primary',
    size: 'md',
    shape: 'rounded',
    iconLeft: '(없음)',
    iconRight: '(없음)',
    label: '버튼',
    iconSize: '(자동)'
  } as never,
  parameters: {
    docs: {
      source: {
        language: 'html',
        // Controls 값을 그대로 반영한 실제 사용 코드 동적 생성
        // - 실제 props는 기본값과 다를 때만 출력 (노이즈 제거)
        // - iconLeft / iconRight / label은 데모 전용 control → slot 패턴으로 변환
        // - target="_blank" 시 rel은 런타임 처리이므로 코드 표시 안 함
        transform: (_src: string, storyContext: {
          args: Record<string, unknown>;
        }) => {
          const a = storyContext.args || {};
          const attrs: string[] = [];
          if (a.variant && a.variant !== 'primary') attrs.push(\`variant="\${a.variant}"\`);
          if (a.size && a.size !== 'md') attrs.push(\`size="\${a.size}"\`);
          if (a.shape && a.shape !== 'rounded') attrs.push(\`shape="\${a.shape}"\`);
          if (a.iconSize && a.iconSize !== '(자동)') attrs.push(\`icon-size="\${a.iconSize}"\`);
          if (a.as && a.as !== 'button') attrs.push(\`as="\${a.as}"\`);
          // a 태그에는 type 속성 의미 없음 → 생략
          if (a.as !== 'a' && a.type && a.type !== 'button') attrs.push(\`type="\${a.type}"\`);
          if (a.href) attrs.push(\`href="\${a.href}"\`);
          if (a.as === 'a' && a.target) attrs.push(\`target="\${a.target}"\`);
          if (a.disabled) attrs.push('disabled');
          if (a.loading) attrs.push('loading');
          if (a.fullWidth) attrs.push('full-width');
          if (a.iconOnly) attrs.push('icon-only');
          if (a.ariaLabel) attrs.push(\`aria-label="\${a.ariaLabel}"\`);
          const head = attrs.length ? \`<UiButton \${attrs.join(' ')}\` : '<UiButton';
          const hasL = a.iconLeft && a.iconLeft !== '(없음)';
          const hasR = a.iconRight && a.iconRight !== '(없음)';
          // iconOnly일 땐 텍스트 출력 안 함 (접근성: ariaLabel이 대체)
          const labelText = !a.iconOnly ? a.label || '버튼' : '';
          const children: string[] = [];
          if (hasL) {
            children.push(\`  <template #icon-left>\\n    <i class="icon-\${a.iconLeft}" />\\n  </template>\`);
          }
          if (labelText) children.push(\`  \${labelText}\`);
          if (hasR) {
            children.push(\`  <template #icon-right>\\n    <i class="icon-\${a.iconRight}" />\\n  </template>\`);
          }
          if (children.length === 0) return \`\${head} />\`;
          return \`\${head}>\\n\${children.join('\\n')}\\n</UiButton>\`;
        }
      }
    }
  },
  render: (args: Record<string, unknown>) => ({
    components: {
      UiButton
    },
    setup: () => ({
      args
    }),
    template: \`
      <UiButton v-bind="args">
        <template v-if="args.iconLeft && args.iconLeft !== '(없음)'" #icon-left>
          <i :class="['icon-' + args.iconLeft]" />
        </template>
        {{ !args.iconOnly ? (args.label || '버튼') : '' }}
        <template v-if="args.iconRight && args.iconRight !== '(없음)'" #icon-right>
          <i :class="['icon-' + args.iconRight]" />
        </template>
      </UiButton>
    \`
  }),
  play: async ({
    canvasElement,
    args
  }) => {
    const btn = within(canvasElement).getByRole('button');
    await userEvent.click(btn);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  }
}`,...(v=(x=s.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var h,b,z;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiButton
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 28px; font-family: inherit;">
        <!-- 행 헤더 + 4 variants × 4 size 그리드 -->
        <section>
          <h4 style="margin: 0 0 12px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.06em;">
            Variant × Size
          </h4>
          <div style="display: grid; grid-template-columns: 80px repeat(4, auto); gap: 12px 14px; align-items: center;">
            <span></span>
            <span style="font-size: 12px; color: #6b7280;">xs · 24</span>
            <span style="font-size: 12px; color: #6b7280;">sm · 28</span>
            <span style="font-size: 12px; color: #6b7280;">md · 32</span>
            <span style="font-size: 12px; color: #6b7280;">lg · 40</span>

            <span style="font-size: 12px; color: #6b7280;">primary</span>
            <UiButton variant="primary" size="xs">Primary</UiButton>
            <UiButton variant="primary" size="sm">Primary</UiButton>
            <UiButton variant="primary" size="md">Primary</UiButton>
            <UiButton variant="primary" size="lg">Primary</UiButton>

            <span style="font-size: 12px; color: #6b7280;">secondary</span>
            <UiButton variant="secondary" size="xs">Secondary</UiButton>
            <UiButton variant="secondary" size="sm">Secondary</UiButton>
            <UiButton variant="secondary" size="md">Secondary</UiButton>
            <UiButton variant="secondary" size="lg">Secondary</UiButton>

            <span style="font-size: 12px; color: #6b7280;">ghost</span>
            <UiButton variant="ghost" size="xs">Ghost</UiButton>
            <UiButton variant="ghost" size="sm">Ghost</UiButton>
            <UiButton variant="ghost" size="md">Ghost</UiButton>
            <UiButton variant="ghost" size="lg">Ghost</UiButton>

            <span style="font-size: 12px; color: #6b7280;">outline</span>
            <UiButton variant="outline" size="xs">Outline</UiButton>
            <UiButton variant="outline" size="sm">Outline</UiButton>
            <UiButton variant="outline" size="md">Outline</UiButton>
            <UiButton variant="outline" size="lg">Outline</UiButton>

            <span style="font-size: 12px; color: #6b7280;">danger</span>
            <UiButton variant="danger" size="xs">Danger</UiButton>
            <UiButton variant="danger" size="sm">Danger</UiButton>
            <UiButton variant="danger" size="md">Danger</UiButton>
            <UiButton variant="danger" size="lg">Danger</UiButton>
          </div>
        </section>

        <!-- State 매트릭스: variant × (default/disabled/loading) -->
        <section>
          <h4 style="margin: 0 0 12px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.06em;">
            State (md size)
          </h4>
          <div style="display: grid; grid-template-columns: 80px repeat(3, auto); gap: 12px 14px; align-items: center;">
            <span></span>
            <span style="font-size: 12px; color: #6b7280;">default</span>
            <span style="font-size: 12px; color: #6b7280;">disabled</span>
            <span style="font-size: 12px; color: #6b7280;">loading</span>

            <span style="font-size: 12px; color: #6b7280;">primary</span>
            <UiButton variant="primary">Save</UiButton>
            <UiButton variant="primary" disabled>Save</UiButton>
            <UiButton variant="primary" loading>Saving…</UiButton>

            <span style="font-size: 12px; color: #6b7280;">secondary</span>
            <UiButton variant="secondary">Cancel</UiButton>
            <UiButton variant="secondary" disabled>Cancel</UiButton>
            <UiButton variant="secondary" loading>Cancel</UiButton>

            <span style="font-size: 12px; color: #6b7280;">ghost</span>
            <UiButton variant="ghost">Edit</UiButton>
            <UiButton variant="ghost" disabled>Edit</UiButton>
            <UiButton variant="ghost" loading>Edit</UiButton>

            <span style="font-size: 12px; color: #6b7280;">outline</span>
            <UiButton variant="outline">Cancel</UiButton>
            <UiButton variant="outline" disabled>Cancel</UiButton>
            <UiButton variant="outline" loading>Cancel</UiButton>

            <span style="font-size: 12px; color: #6b7280;">danger</span>
            <UiButton variant="danger">Delete</UiButton>
            <UiButton variant="danger" disabled>Delete</UiButton>
            <UiButton variant="danger" loading>Deleting…</UiButton>
          </div>
        </section>

        <!-- 폭/iconOnly 변형 -->
        <section>
          <h4 style="margin: 0 0 12px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.06em;">
            Layout
          </h4>
          <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
            <UiButton variant="primary" fullWidth>fullWidth — 부모 100%</UiButton>
            <div style="display: flex; gap: 8px;">
              <UiButton variant="secondary" iconOnly aria-label="검색">
                <template #icon-left><i class="icon-search size-16" /></template>
              </UiButton>
              <UiButton variant="ghost" iconOnly aria-label="설정">
                <template #icon-left><i class="icon-setting size-16" /></template>
              </UiButton>
              <UiButton variant="primary">
                <template #icon-left><i class="icon-plus size-16 icon-white" /></template>
                새로 만들기
              </UiButton>
            </div>
          </div>
        </section>
      </div>
    \`
  })
}`,...(z=(b=r.parameters)==null?void 0:b.docs)==null?void 0:z.source}}};var S,O,w;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiButton
    },
    template: \`
      <div style="display: flex; gap: 12px; align-items: center;">
        <UiButton size="xs">XS (24px)</UiButton>
        <UiButton size="sm">SM (28px)</UiButton>
        <UiButton size="md">MD (32px)</UiButton>
        <UiButton size="lg">LG (40px)</UiButton>
      </div>
    \`
  })
}`,...(w=(O=l.parameters)==null?void 0:O.docs)==null?void 0:w.source}}};var L,$,k;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: '모서리 모양 (shape)',
  render: () => ({
    components: {
      UiButton
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">rounded</span>
          <UiButton variant="primary" shape="rounded">기본 6px</UiButton>
          <UiButton variant="secondary" shape="rounded">취소</UiButton>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">pill</span>
          <UiButton variant="primary" shape="pill">완전 라운드</UiButton>
          <UiButton variant="secondary" shape="pill">필터</UiButton>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">circle</span>
          <UiButton variant="primary" shape="circle" iconOnly aria-label="추가">
            <template #icon-left><i class="icon-plus icon-white" /></template>
          </UiButton>
          <UiButton variant="ghost" shape="circle" iconOnly aria-label="닫기">
            <template #icon-left><i class="icon-close" /></template>
          </UiButton>
          <UiButton variant="danger" shape="circle" iconOnly aria-label="삭제">
            <template #icon-left><i class="icon-trashcan icon-white" /></template>
          </UiButton>
        </div>
      </div>
    \`
  })
}`,...(k=($=p.parameters)==null?void 0:$.docs)==null?void 0:k.source}}};var R,C,_;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: '아이콘 사용',
  render: () => ({
    components: {
      UiButton
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">icon-left</span>
          <UiButton variant="primary">
            <template #icon-left><i class="icon-plus" /></template>
            Agent 추가
          </UiButton>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">icon-right</span>
          <UiButton variant="secondary">
            다음
            <template #icon-right><i class="icon-arrow-right" /></template>
          </UiButton>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">iconOnly</span>
          <UiButton variant="ghost" iconOnly aria-label="편집">
            <template #icon-left><i class="icon-edit" /></template>
          </UiButton>
          <UiButton variant="ghost" iconOnly aria-label="삭제">
            <template #icon-left><i class="icon-trashcan" /></template>
          </UiButton>
          <UiButton variant="ghost" iconOnly aria-label="다운로드">
            <template #icon-left><i class="icon-download" /></template>
          </UiButton>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="width: 80px; font-size: 12px; color: #6f7a93;">iconSize</span>
          <UiButton variant="primary" size="md" icon-size="xs">
            <template #icon-left><i class="icon-plus" /></template>
            작은 아이콘
          </UiButton>
          <UiButton variant="primary" size="md" icon-size="lg">
            <template #icon-left><i class="icon-plus" /></template>
            큰 아이콘
          </UiButton>
        </div>
      </div>
    \`
  })
}`,...(_=(C=c.parameters)==null?void 0:C.docs)==null?void 0:_.source}}};var I,A,D;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: '확장: 링크로 사용',
  render: () => ({
    components: {
      UiButton
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
        <UiButton as="a" href="/agent/list" variant="primary">
          <template #icon-left><i class="icon-arrow-right" /></template>
          내부 링크 (target 없음)
        </UiButton>
        <UiButton as="a" href="https://anthropic.com" target="_blank" variant="secondary">
          외부 링크 (_blank — rel 자동 적용)
          <template #icon-right><i class="icon-arrow-right" /></template>
        </UiButton>
        <UiButton as="a" href="/x" variant="secondary" disabled>
          비활성 링크 (aria-disabled + tabindex=-1)
        </UiButton>
        <p style="margin: 4px 0 0; font-size: 12px; color: #6f7a93;">
          target="_blank"인 경우 자동으로 <code>rel="noopener noreferrer"</code> 부여 (브라우저 inspect로 확인)
        </p>
      </div>
    \`
  })
}`,...(D=(A=d.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var P,E,T;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: '접근성: iconOnly + ariaLabel',
  render: () => ({
    components: {
      UiButton
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <p style="margin: 0; font-size: 13px; color: #4d5462;">
          iconOnly=true 시 <code>ariaLabel</code> 필수 — 스크린리더가 버튼 용도를 인지.
          미지정 시 dev 콘솔 경고 출력.
        </p>
        <div style="display: flex; gap: 8px;">
          <UiButton variant="ghost" iconOnly aria-label="편집">
            <template #icon-left><i class="icon-edit" /></template>
          </UiButton>
          <UiButton variant="ghost" iconOnly aria-label="삭제">
            <template #icon-left><i class="icon-trashcan" /></template>
          </UiButton>
          <UiButton variant="danger" iconOnly aria-label="모두 삭제">
            <template #icon-left><i class="icon-trashcan icon-white" /></template>
          </UiButton>
        </div>
      </div>
    \`
  })
}`,...(T=(E=u.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var j,G,W;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: '안전성: form 안 type 동작',
  render: () => ({
    components: {
      UiButton
    },
    setup() {
      const onSubmit = (e: Event) => {
        e.preventDefault();
        // eslint-disable-next-line no-alert
        alert('form submit 발생!');
      };
      return {
        onSubmit
      };
    },
    template: \`
      <form @submit="onSubmit" style="display: flex; flex-direction: column; gap: 12px; padding: 16px; background: #f4f7f9; border-radius: 8px; max-width: 360px;">
        <input type="text" placeholder="검색어" style="padding: 8px; border: 1px solid #dce4e9; border-radius: 6px;" />
        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <UiButton variant="secondary">취소 (type=button 기본)</UiButton>
          <UiButton variant="primary" type="submit">검색 (type=submit)</UiButton>
        </div>
        <p style="margin: 0; font-size: 12px; color: #6f7a93;">
          취소 버튼은 type=button 기본값으로 submit이 발생하지 않습니다. 검색만 alert 발생.
        </p>
      </form>
    \`
  })
}`,...(W=(G=m.parameters)==null?void 0:G.docs)==null?void 0:W.source}}};var F,M,N;y.parameters={...y.parameters,docs:{...(F=y.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: '실전: 모달 푸터',
  render: () => ({
    components: {
      UiButton
    },
    template: \`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px;">
        <div style="display: flex; gap: 8px; justify-content: flex-end; padding: 16px; background: #f4f7f9; border-radius: 8px;">
          <UiButton variant="secondary">취소</UiButton>
          <UiButton variant="primary">저장</UiButton>
        </div>
        <div style="display: flex; gap: 8px; justify-content: flex-end; padding: 16px; background: #f4f7f9; border-radius: 8px;">
          <UiButton variant="secondary">취소</UiButton>
          <UiButton variant="danger">삭제</UiButton>
        </div>
      </div>
    \`
  })
}`,...(N=(M=y.parameters)==null?void 0:M.docs)==null?void 0:N.source}}};const ot=["Playground","AllVariants","AllSizes","AllShapes","WithIcon","AsLink","AccessibilityIconOnly","SubmitInForm","ModalFooter"];export{u as AccessibilityIconOnly,p as AllShapes,l as AllSizes,r as AllVariants,d as AsLink,y as ModalFooter,s as Playground,m as SubmitInForm,c as WithIcon,ot as __namedExportsOrder,at as default};
