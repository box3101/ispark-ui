import{c as u,r as f}from"./vue.esm-bundler-UBndlgVH.js";import{U as i,l}from"./UiIcon-CtolvBwL.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const o=Object.keys(l).filter(e=>{const a=l[e];return/^[A-Z]/.test(e)&&!e.endsWith("Icon")&&typeof a=="function"}).map(e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()).sort(),b={Navigation:["arrow-up","arrow-down","arrow-left","arrow-right","chevron-up","chevron-down","chevron-left","chevron-right","corner-up-left","corner-up-right","external-link","move"],Action:["search","plus","minus","x","check","edit","trash-2","copy","clipboard","download","upload","refresh-cw","rotate-cw","save","share-2"],Communication:["mail","phone","message-circle","message-square","send","bell","bell-off","at-sign","paperclip","inbox"],Media:["image","camera","video","music","play","pause","volume-2","volume-x","mic","mic-off"],User:["user","users","user-plus","user-minus","user-check","log-in","log-out","key","lock","unlock"],File:["file","file-text","folder","folder-open","archive","book","bookmark","tag","hash","code"],Status:["alert-circle","alert-triangle","info","help-circle","check-circle","x-circle","loader","zap","shield","shield-check"],UI:["settings","sliders","filter","layout","grid","list","menu","more-horizontal","more-vertical","maximize","minimize","eye","eye-off","sun","moon"],"Time & Date":["clock","calendar","timer","alarm-clock","history"],Misc:["star","heart","thumbs-up","thumbs-down","flag","home","map-pin","globe","link","wifi"]},k={title:"Icons/Gallery",component:i,parameters:{layout:"fullscreen",docs:{description:{component:`
Lucide 아이콘 갤러리 (**${o.length}개**). \`<UiIcon name="..." />\`으로 사용.

전체 아이콘 목록: <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer">lucide.dev/icons ↗</a>
        `}}}},t={name:"Category",render:()=>({components:{UiIcon:i},setup(){return{categories:b}},template:`
      <div style="padding: 24px; width: 100%; min-height: 100vh; background: #1a1b1f; color: #eaeae3; font-family: 'Pretendard Variable', Pretendard, -apple-system, sans-serif;">
        <div v-for="(icons, category) in categories" :key="category" style="margin-bottom: 28px;">
          <h3 style="font-size: 12px; font-weight: 600; color: #8a8a82; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 1px solid #2a2c33;">
            {{ category }}
          </h3>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            <div
              v-for="icon in icons"
              :key="icon"
              style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 6px; width: 78px; border: 1px solid #2a2c33; border-radius: 6px; cursor: default; transition: all 0.15s;"
              @mouseenter="$event.currentTarget.style.borderColor = '#d97757'; $event.currentTarget.style.background = 'rgba(217,119,87,0.08)'"
              @mouseleave="$event.currentTarget.style.borderColor = '#2a2c33'; $event.currentTarget.style.background = 'transparent'"
            >
              <UiIcon :name="icon" :size="20" />
              <small style="font-size: 9px; color: #6b6d75; word-break: break-all; text-align: center; line-height: 1.2;">{{ icon }}</small>
            </div>
          </div>
        </div>
      </div>
    `})},r={name:"All",render:()=>({components:{UiIcon:i},setup(){const e=f(""),a=u(()=>{const n=e.value.toLowerCase().trim();return n?o.filter(x=>x.includes(n)):o});return{search:e,filtered:a,total:o.length}},template:`
      <div style="padding: 20px; width: 100%; min-height: 100vh; background: #1a1b1f; color: #eaeae3; font-family: 'Pretendard Variable', Pretendard, -apple-system, sans-serif;">
        <!-- 검색바 -->
        <div style="position: sticky; top: 0; z-index: 10; background: #1a1b1f; padding: 12px 0 16px; border-bottom: 1px solid #2a2c33; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="position: relative; flex: 1; max-width: 400px;">
              <UiIcon name="search" :size="16" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #6b6d75;" />
              <input
                v-model="search"
                type="text"
                placeholder="아이콘 검색..."
                style="width: 100%; padding: 8px 12px 8px 34px; border: 1px solid #33363f; border-radius: 8px; font-size: 13px; outline: none; background: #26282f; color: #eaeae3; transition: border-color 0.15s;"
                @focus="$event.target.style.borderColor = '#d97757'"
                @blur="$event.target.style.borderColor = '#33363f'"
              />
            </div>
            <span style="font-size: 12px; color: #6b6d75;">
              {{ filtered.length }} / {{ total }}
            </span>
          </div>
        </div>

        <!-- 결과 없음 -->
        <div v-if="filtered.length === 0" style="text-align: center; padding: 48px 0; color: #6b6d75;">
          <UiIcon name="search-x" :size="32" style="color: #6b6d75;" />
          <p style="margin-top: 8px; font-size: 13px;">"{{ search }}" 에 해당하는 아이콘이 없습니다.</p>
        </div>

        <!-- 아이콘 그리드 -->
        <div v-else style="display: flex; flex-wrap: wrap; gap: 4px;">
          <div
            v-for="icon in filtered"
            :key="icon"
            style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 8px 2px; width: 72px; height: 72px; border: 1px solid #2a2c33; border-radius: 6px; cursor: default; transition: all 0.15s;"
            @mouseenter="$event.currentTarget.style.borderColor = '#d97757'; $event.currentTarget.style.background = 'rgba(217,119,87,0.08)'"
            @mouseleave="$event.currentTarget.style.borderColor = '#2a2c33'; $event.currentTarget.style.background = 'transparent'"
          >
            <UiIcon :name="icon" :size="20" />
            <small style="font-size: 8px; color: #6b6d75; word-break: break-all; text-align: center; line-height: 1.2; max-width: 66px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">{{ icon }}</small>
          </div>
        </div>
      </div>
    `})};var s,d,c;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: 'Category',
  render: () => ({
    components: {
      UiIcon
    },
    setup() {
      return {
        categories: ICON_CATEGORIES
      };
    },
    template: \`
      <div style="padding: 24px; width: 100%; min-height: 100vh; background: #1a1b1f; color: #eaeae3; font-family: 'Pretendard Variable', Pretendard, -apple-system, sans-serif;">
        <div v-for="(icons, category) in categories" :key="category" style="margin-bottom: 28px;">
          <h3 style="font-size: 12px; font-weight: 600; color: #8a8a82; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 1px solid #2a2c33;">
            {{ category }}
          </h3>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            <div
              v-for="icon in icons"
              :key="icon"
              style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 6px; width: 78px; border: 1px solid #2a2c33; border-radius: 6px; cursor: default; transition: all 0.15s;"
              @mouseenter="$event.currentTarget.style.borderColor = '#d97757'; $event.currentTarget.style.background = 'rgba(217,119,87,0.08)'"
              @mouseleave="$event.currentTarget.style.borderColor = '#2a2c33'; $event.currentTarget.style.background = 'transparent'"
            >
              <UiIcon :name="icon" :size="20" />
              <small style="font-size: 9px; color: #6b6d75; word-break: break-all; text-align: center; line-height: 1.2;">{{ icon }}</small>
            </div>
          </div>
        </div>
      </div>
    \`
  })
}`,...(c=(d=t.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var p,m,g;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: 'All',
  render: () => ({
    components: {
      UiIcon
    },
    setup() {
      const search = ref('');
      const filtered = computed(() => {
        const q = search.value.toLowerCase().trim();
        if (!q) return ALL_ICON_NAMES;
        return ALL_ICON_NAMES.filter(name => name.includes(q));
      });
      return {
        search,
        filtered,
        total: ALL_ICON_NAMES.length
      };
    },
    template: \`
      <div style="padding: 20px; width: 100%; min-height: 100vh; background: #1a1b1f; color: #eaeae3; font-family: 'Pretendard Variable', Pretendard, -apple-system, sans-serif;">
        <!-- 검색바 -->
        <div style="position: sticky; top: 0; z-index: 10; background: #1a1b1f; padding: 12px 0 16px; border-bottom: 1px solid #2a2c33; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="position: relative; flex: 1; max-width: 400px;">
              <UiIcon name="search" :size="16" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #6b6d75;" />
              <input
                v-model="search"
                type="text"
                placeholder="아이콘 검색..."
                style="width: 100%; padding: 8px 12px 8px 34px; border: 1px solid #33363f; border-radius: 8px; font-size: 13px; outline: none; background: #26282f; color: #eaeae3; transition: border-color 0.15s;"
                @focus="$event.target.style.borderColor = '#d97757'"
                @blur="$event.target.style.borderColor = '#33363f'"
              />
            </div>
            <span style="font-size: 12px; color: #6b6d75;">
              {{ filtered.length }} / {{ total }}
            </span>
          </div>
        </div>

        <!-- 결과 없음 -->
        <div v-if="filtered.length === 0" style="text-align: center; padding: 48px 0; color: #6b6d75;">
          <UiIcon name="search-x" :size="32" style="color: #6b6d75;" />
          <p style="margin-top: 8px; font-size: 13px;">"{{ search }}" 에 해당하는 아이콘이 없습니다.</p>
        </div>

        <!-- 아이콘 그리드 -->
        <div v-else style="display: flex; flex-wrap: wrap; gap: 4px;">
          <div
            v-for="icon in filtered"
            :key="icon"
            style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 8px 2px; width: 72px; height: 72px; border: 1px solid #2a2c33; border-radius: 6px; cursor: default; transition: all 0.15s;"
            @mouseenter="$event.currentTarget.style.borderColor = '#d97757'; $event.currentTarget.style.background = 'rgba(217,119,87,0.08)'"
            @mouseleave="$event.currentTarget.style.borderColor = '#2a2c33'; $event.currentTarget.style.background = 'transparent'"
          >
            <UiIcon :name="icon" :size="20" />
            <small style="font-size: 8px; color: #6b6d75; word-break: break-all; text-align: center; line-height: 1.2; max-width: 66px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">{{ icon }}</small>
          </div>
        </div>
      </div>
    \`
  })
}`,...(g=(m=r.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};const w=["Category","All"];export{r as All,t as Category,w as __namedExportsOrder,k as default};
