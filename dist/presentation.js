import { defineComponent as M, computed as x, ref as J, watch as pe, openBlock as a, createElementBlock as i, normalizeStyle as $, normalizeClass as V, unref as q, createCommentVNode as b, createElementVNode as t, toDisplayString as r, createTextVNode as S, Fragment as y, renderList as f, inject as ne, createVNode as F, createBlock as H, createStaticVNode as be, provide as ve, watchEffect as fe, useId as ke, onMounted as we, onBeforeUnmount as xe, resolveDynamicComponent as $e, normalizeProps as Ae, guardReactiveProps as Le } from "vue";
import { _ as B, U as He } from "./UiIcon-DHbhOFWZ.js";
let oe;
function ei(e) {
  oe = e;
}
function U(e, l = oe ?? "/") {
  return e.startsWith("/presentation/") ? `${l.replace(/\/$/, "")}/${e.slice(1)}` : e;
}
const Ve = {
  colors: {
    navy900: "#092E49",
    navy700: "#124568",
    blue600: "#006FBD",
    blue500: "#0290D5",
    blue300: "#76B1E1",
    blue100: "#DFEDF6",
    taupe500: "#918976",
    orange700: "#B85610",
    orange500: "#D9641A",
    orange400: "#F58220",
    orange100: "#FDE3CA",
    gray900: "#1F2937",
    gray500: "#6B7684",
    gray200: "#E5E8EB",
    white: "#FFFFFF"
  }
}, G = {
  canvas: { width: 1040, height: 720 },
  type: { display: 56, title: 40, result: 26, heading: 26, body: 24, supporting: 20, label: 18, source: 12, step: 32, metric: 48, detail: 16, micro: 14 },
  colors: Ve.colors
}, Ze = {
  ...Object.fromEntries(Object.entries(G.colors).map(([e, l]) => [`--ds-${e}`, l])),
  ...Object.fromEntries(Object.entries(G.type).map(([e, l]) => [`--ds-${e}`, `${l}px`]))
}, Ie = ["src"], Me = {
  key: 1,
  class: "image-shade"
}, Be = {
  key: 2,
  class: "geometry",
  "aria-hidden": "true"
}, Ce = {
  key: 3,
  class: "watermark",
  "aria-hidden": "true"
}, Ee = { "data-fit": "" }, Se = { key: 0 }, ze = {
  key: 0,
  class: "description",
  "data-fit": ""
}, qe = {
  key: 4,
  class: "chapter-progress",
  "aria-label": "발표 목차와 현재 장"
}, De = ["aria-current"], Fe = { class: "node" }, _e = { key: 0 }, Pe = { class: "chapter-name" }, je = /* @__PURE__ */ M({
  __name: "SectionCoverSlide",
  props: {
    chapters: {},
    activeId: {},
    title: {},
    emphasis: { default: "" },
    description: { default: "" },
    background: { default: "" },
    backgroundPosition: { default: "center" },
    eyebrow: { default: "CHAPTER" },
    footer: { default: "" },
    height: { default: G.canvas.height }
  },
  setup(e) {
    const l = e, s = x(() => Math.max(0, l.chapters.findIndex((u) => u.id === l.activeId))), o = x(() => String(s.value + 1).padStart(2, "0")), n = J(!1);
    pe(() => l.background, () => {
      n.value = !1;
    });
    const c = x(() => !!l.background && !n.value);
    return (u, d) => {
      var g;
      return a(), i("section", {
        class: V(["section-cover", { "has-image": c.value }]),
        style: $({ height: `${e.height}px`, "--cover-main-top": `${Math.round(e.height * 166 / 585)}px` }),
        "aria-label": "장별 표지"
      }, [
        c.value ? (a(), i("img", {
          key: 0,
          class: "background",
          src: q(U)(e.background),
          style: $({ objectPosition: e.backgroundPosition }),
          alt: "",
          onError: d[0] || (d[0] = (m) => n.value = !0)
        }, null, 44, Ie)) : b("", !0),
        c.value ? (a(), i("div", Me)) : (a(), i("div", Be, [...d[1] || (d[1] = [
          t("span", null, null, -1),
          t("span", null, null, -1),
          t("span", null, null, -1)
        ])])),
        c.value ? b("", !0) : (a(), i("span", Ce, r(o.value), 1)),
        t("header", null, [
          t("p", null, r(e.eyebrow) + " " + r(o.value), 1),
          t("h2", null, r((g = e.chapters[s.value]) == null ? void 0 : g.title), 1)
        ]),
        t("main", null, [
          t("h1", Ee, [
            S(r(e.title), 1),
            e.emphasis ? (a(), i("span", Se, r(e.emphasis), 1)) : b("", !0)
          ]),
          e.description ? (a(), i("p", ze, r(e.description), 1)) : b("", !0)
        ]),
        e.chapters.length ? (a(), i("ol", qe, [
          (a(!0), i(y, null, f(e.chapters, (m, A) => (a(), i("li", {
            key: m.id,
            class: V({ active: A === s.value, complete: A < s.value }),
            "aria-current": A === s.value ? "step" : void 0
          }, [
            d[2] || (d[2] = t("span", {
              class: "connector",
              "aria-hidden": "true"
            }, null, -1)),
            t("span", Fe, [
              A === s.value ? (a(), i("span", _e, r(o.value), 1)) : b("", !0)
            ]),
            t("span", Pe, r(m.title), 1)
          ], 10, De))), 128))
        ])) : b("", !0),
        t("footer", null, [
          t("span", null, r(e.footer), 1),
          t("span", null, r(o.value), 1)
        ])
      ], 6);
    };
  }
}), Oe = /* @__PURE__ */ B(je, [["__scopeId", "data-v-026edefe"]]), Q = [
  // ===== 덱에서 이미 쓰던 11종 =====
  { key: "data-migration", label: "데이터 이관", glyph: "database", tone: "blue", terms: ["데이터", "이관", "적재"], was: "database" },
  { key: "people", label: "인사·직무", glyph: "users", tone: "blue", terms: ["인사", "직무", "구성원"], was: "users" },
  { key: "quality", label: "품질 검증", glyph: "shield-check", tone: "orange", terms: ["품질", "검증", "보증"], was: "shield-check" },
  { key: "workflow", label: "업무 연계", glyph: "flow-arrow", tone: "blue", terms: ["업무", "연계", "흐름"], was: "workflow" },
  { key: "schedule", label: "수행 일정", glyph: "calendar-dots", tone: "blue", terms: ["일정", "기간", "마일스톤"], was: "calendar-days" },
  { key: "performance", label: "성과 지표", glyph: "chart-line-up", tone: "orange", terms: ["성과", "지표", "KPI"], was: "chart-no-axes-combined" },
  { key: "verified", label: "확인 완료", glyph: "check-circle", tone: "orange", terms: ["확인", "완료", "점검"], was: "check-circle-2" },
  { key: "next", label: "다음 단계", glyph: "arrow-right", tone: "orange", terms: ["다음", "이행", "전환"], was: "arrow-right" },
  { key: "platform", label: "기술 기반", glyph: "desktop-tower", tone: "blue", terms: ["기술", "시스템", "기반"], was: "monitor-cog" },
  { key: "converted-data", label: "전환 데이터", glyph: "arrows-clockwise", tone: "blue", terms: ["전환", "변환", "동기화"], was: "database-zap" },
  { key: "mapping", label: "구조 매핑", glyph: "git-diff", tone: "blue", terms: ["매핑", "대조", "비교"], was: "git-compare-arrows" },
  // ===== 제안서 표준 목차에서 필요한 13종 =====
  { key: "understanding", label: "사업 이해", glyph: "lightbulb", tone: "orange", terms: ["이해", "배경", "통찰"] },
  { key: "strategy", label: "추진 전략", glyph: "strategy", tone: "orange", terms: ["전략", "방향", "추진"] },
  { key: "organization", label: "수행 조직", glyph: "users-three", tone: "blue", terms: ["조직", "팀", "체계"] },
  { key: "staffing", label: "투입 인력", glyph: "identification-badge", tone: "blue", terms: ["인력", "투입", "이력"] },
  { key: "risk", label: "위험 관리", glyph: "warning-octagon", tone: "orange", terms: ["위험", "리스크", "대응"] },
  { key: "security", label: "보안", glyph: "lock-key", tone: "blue", terms: ["보안", "권한", "접근"] },
  { key: "training", label: "교육", glyph: "graduation-cap", tone: "orange", terms: ["교육", "이관", "숙련"] },
  { key: "deliverable", label: "산출물", glyph: "files", tone: "blue", terms: ["산출물", "문서", "제출"] },
  { key: "stabilization", label: "안정화", glyph: "heartbeat", tone: "orange", terms: ["안정화", "운영", "모니터링"] },
  { key: "maintenance", label: "하자 보수", glyph: "wrench", tone: "blue", terms: ["하자", "보수", "유지"] },
  { key: "integration", label: "시스템 연계", glyph: "plugs-connected", tone: "blue", terms: ["연계", "인터페이스", "연동"] },
  { key: "infrastructure", label: "인프라", glyph: "hard-drives", tone: "blue", terms: ["인프라", "서버", "자원"] },
  { key: "testing", label: "테스트", glyph: "test-tube", tone: "orange", terms: ["테스트", "시험", "검사"] },
  { key: "requirements-traceability", label: "요구사항 추적", glyph: "tree-structure", tone: "blue", terms: ["요구사항", "추적성", "RFP", "요구사항 대응"] },
  { key: "evaluation-criteria", label: "평가기준", glyph: "clipboard-text", tone: "blue", terms: ["평가", "배점", "심사", "평가기준"] },
  { key: "budget-cost", label: "예산·비용", glyph: "calculator", tone: "blue", terms: ["예산", "비용", "견적", "TCO"] },
  { key: "data-quality", label: "데이터 품질", glyph: "database", tone: "blue", terms: ["데이터", "정합성", "중복", "데이터 품질"] },
  { key: "user-experience", label: "사용자 경험", glyph: "devices", tone: "blue", terms: ["UX", "UI", "화면", "사용성", "접근성"] },
  { key: "ai-assistant", label: "AI 지원", glyph: "robot", tone: "blue", terms: ["AI", "인공지능", "자동화", "에이전트"] },
  { key: "knowledge-search", label: "지식 검색", glyph: "book-open", tone: "blue", terms: ["검색", "RAG", "지식", "문서 검색"] },
  { key: "operations-handover", label: "운영 인수인계", glyph: "handshake", tone: "blue", terms: ["운영", "인수인계", "이관", "운영 전환"] }
], W = Object.fromEntries(Q.map((e) => [e.key, e]));
Object.fromEntries(
  Q.filter((e) => e.was).map((e) => [e.was, e.key])
);
const Te = {
  "arrow-right": { viewBox: "0 0 256 256", paths: [
    "M221.66,133.66l-72,72A8,8,0,0,1,136,200V136H40a8,8,0,0,1,0-16h96V56a8,8,0,0,1,13.66-5.66l72,72A8,8,0,0,1,221.66,133.66Z"
  ] },
  "arrows-clockwise": { viewBox: "0 0 256 256", paths: [
    "M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1-5.66-13.66L180.65,72a79.48,79.48,0,0,0-54.72-22.09h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27,96,96,0,0,1,192,60.7l18.36-18.36A8,8,0,0,1,224,48ZM186.41,183.29A80,80,0,0,1,75.35,184l18.31-18.31A8,8,0,0,0,88,152H40a8,8,0,0,0-8,8v48a8,8,0,0,0,13.66,5.66L64,195.3a95.42,95.42,0,0,0,66,26.76h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z"
  ] },
  "book-open": { viewBox: "0 0 256 256", paths: [
    "M240,56V200a8,8,0,0,1-8,8H160a24,24,0,0,0-24,23.94,7.9,7.9,0,0,1-5.12,7.55A8,8,0,0,1,120,232a24,24,0,0,0-24-24H24a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H88a32,32,0,0,1,32,32v87.73a8.17,8.17,0,0,0,7.47,8.25,8,8,0,0,0,8.53-8V80a32,32,0,0,1,32-32h64A8,8,0,0,1,240,56Z"
  ] },
  calculator: { viewBox: "0 0 256 256", paths: [
    "M200,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24ZM88,200a12,12,0,1,1,12-12A12,12,0,0,1,88,200Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,88,160Zm40,40a12,12,0,1,1,12-12A12,12,0,0,1,128,200Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,128,160Zm40,40a12,12,0,1,1,12-12A12,12,0,0,1,168,200Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,168,160Zm16-56a8,8,0,0,1-8,8H80a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8Z"
  ] },
  "calendar-dots": { viewBox: "0 0 256 256", paths: [
    "M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM84,184a12,12,0,1,1,12-12A12,12,0,0,1,84,184Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,128,144Zm44,40a12,12,0,1,1,12-12A12,12,0,0,1,172,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,172,144Zm36-64H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z"
  ] },
  "chart-line-up": { viewBox: "0 0 256 256", paths: [
    "M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM200,192H56a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v76.69l34.34-34.35a8,8,0,0,1,11.32,0L128,132.69,172.69,88H144a8,8,0,0,1,0-16h48a8,8,0,0,1,8,8v48a8,8,0,0,1-16,0V99.31l-50.34,50.35a8,8,0,0,1-11.32,0L104,131.31l-40,40V176H200a8,8,0,0,1,0,16Z"
  ] },
  "check-circle": { viewBox: "0 0 256 256", paths: [
    "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"
  ] },
  "clipboard-text": { viewBox: "0 0 256 256", paths: [
    "M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"
  ] },
  database: { viewBox: "0 0 256 256", paths: [
    "M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm80,104c0,9.62-7.88,19.43-21.61,26.92C170.93,163.35,150.19,168,128,168s-42.93-4.65-58.39-13.08C55.88,147.43,48,137.62,48,128V111.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64Zm-21.61,74.92C170.93,211.35,150.19,216,128,216s-42.93-4.65-58.39-13.08C55.88,195.43,48,185.62,48,176V159.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64V176C208,185.62,200.12,195.43,186.39,202.92Z"
  ] },
  "desktop-tower": { viewBox: "0 0 256 256", paths: [
    "M120,76V188a4,4,0,0,1-4,4H96v16h15.73a8.18,8.18,0,0,1,8.25,7.47,8,8,0,0,1-8,8.53H64.27A8.18,8.18,0,0,1,56,216.53,8,8,0,0,1,64,208H80V192H32A24,24,0,0,1,8,168V96A24,24,0,0,1,32,72h84A4,4,0,0,1,120,76ZM248,48V208a16,16,0,0,1-16,16H152a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h80A16,16,0,0,1,248,48ZM203.9,181.57a12,12,0,1,0-10.34,10.33A12,12,0,0,0,203.9,181.57ZM224,103.47A8.18,8.18,0,0,0,215.73,96H168.27a8.18,8.18,0,0,0-8.25,7.47,8,8,0,0,0,8,8.53h48A8,8,0,0,0,224,103.47Zm0-32A8.18,8.18,0,0,0,215.73,64H168.27A8.18,8.18,0,0,0,160,71.47,8,8,0,0,0,168,80h48A8,8,0,0,0,224,71.47Z"
  ] },
  devices: { viewBox: "0 0 256 256", paths: [
    "M224,72H208V64a24,24,0,0,0-24-24H40A24,24,0,0,0,16,64v96a24,24,0,0,0,24,24H152v8a24,24,0,0,0,24,24h48a24,24,0,0,0,24-24V96A24,24,0,0,0,224,72Zm8,120a8,8,0,0,1-8,8H176a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Zm-96,16a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h40A8,8,0,0,1,136,208Zm80-96a8,8,0,0,1-8,8H192a8,8,0,0,1,0-16h16A8,8,0,0,1,216,112Z"
  ] },
  files: { viewBox: "0 0 256 256", paths: [
    "M213.66,66.34l-40-40A8,8,0,0,0,168,24H88A16,16,0,0,0,72,40V56H56A16,16,0,0,0,40,72V216a16,16,0,0,0,16,16H168a16,16,0,0,0,16-16V200h16a16,16,0,0,0,16-16V72A8,8,0,0,0,213.66,66.34ZM136,192H88a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm0-32H88a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm64,24H184V104a8,8,0,0,0-2.34-5.66l-40-40A8,8,0,0,0,136,56H88V40h76.69L200,75.31Z"
  ] },
  "flow-arrow": { viewBox: "0 0 256 256", paths: [
    "M245.66,85.66l-32,32a8,8,0,0,1-11.32-11.32L220.69,88H208c-38.67,0-46.59,19-56.62,43.08C141.05,155.88,129.33,184,80,184H79a32,32,0,1,1,0-16h1c38.67,0,46.59-19,56.62-43.08C147,100.12,158.67,72,208,72h12.69L202.34,53.66a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,245.66,85.66Z"
  ] },
  "git-diff": { viewBox: "0 0 256 256", paths: [
    "M118.18,213.08c-.11.14-.24.27-.36.4l-.16.18-.17.15a4.83,4.83,0,0,1-.42.37,3.92,3.92,0,0,1-.32.25l-.3.22-.38.23a2.91,2.91,0,0,1-.3.17l-.37.19-.34.15-.36.13a2.84,2.84,0,0,1-.38.13l-.36.1c-.14,0-.26.07-.4.09l-.42.07-.35.05a7,7,0,0,1-.79,0H64a8,8,0,0,1,0-16H92.69L55,162.34a23.85,23.85,0,0,1-7-17V95a32,32,0,1,1,16,0v50.38A8,8,0,0,0,66.34,151L104,188.69V160a8,8,0,0,1,16,0v48a7,7,0,0,1,0,.8c0,.11,0,.21,0,.32s0,.3-.07.46a2.83,2.83,0,0,1-.09.37c0,.13-.06.26-.1.39s-.08.23-.12.35l-.14.39-.15.31c-.06.13-.12.27-.19.4s-.11.18-.16.28l-.24.39-.21.28ZM208,161V110.63a23.85,23.85,0,0,0-7-17L163.31,56H192a8,8,0,0,0,0-16H143.82l-.6,0c-.14,0-.28,0-.41.06l-.37,0-.43.11-.33.08-.4.14-.34.13-.35.16-.36.18a3.14,3.14,0,0,0-.31.18c-.12.07-.25.14-.36.22a3.55,3.55,0,0,0-.31.23,3.81,3.81,0,0,0-.32.24c-.15.12-.28.24-.42.37l-.17.15-.16.18c-.12.13-.25.26-.36.4l-.26.35-.21.28-.24.39c-.05.1-.11.19-.16.28s-.13.27-.19.4l-.15.31-.14.39c0,.12-.09.23-.12.35s-.07.26-.1.39a2.83,2.83,0,0,0-.09.37c0,.16,0,.31-.07.46s0,.21-.05.32a7,7,0,0,0,0,.8V96a8,8,0,0,0,16,0V67.31L189.66,105a8,8,0,0,1,2.34,5.66V161a32,32,0,1,0,16,0Z"
  ] },
  "graduation-cap": { viewBox: "0 0 256 256", paths: [
    "M176,207.24a119,119,0,0,0,16-7.73V240a8,8,0,0,1-16,0Zm11.76-88.43-56-29.87a8,8,0,0,0-7.52,14.12L171,128l17-9.06Zm64-29.87-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V130.67L171,128l-43,22.93L43.83,106l0,0L25,96,128,41.07,231,96l-18.78,10-.06,0L188,118.94a8,8,0,0,1,4,6.93v73.64a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12Z"
  ] },
  handshake: { viewBox: "0 0 256 256", paths: [
    "M254.3,107.91,228.78,56.85a16,16,0,0,0-21.47-7.15L182.44,62.13,130.05,48.27a8.14,8.14,0,0,0-4.1,0L73.56,62.13,48.69,49.7a16,16,0,0,0-21.47,7.15L1.7,107.9a16,16,0,0,0,7.15,21.47l27,13.51,55.49,39.63a8.06,8.06,0,0,0,2.71,1.25l64,16a8,8,0,0,0,7.6-2.1l40-40,15.08-15.08,26.42-13.21a16,16,0,0,0,7.15-21.46Zm-54.89,33.37L165,113.72a8,8,0,0,0-10.68.61C136.51,132.27,116.66,130,104,122L147.24,80h31.81l27.21,54.41Zm-41.87,41.86L99.42,168.61l-49.2-35.14,28-56L128,64.28l9.8,2.59-45,43.68-.08.09a16,16,0,0,0,2.72,24.81c20.56,13.13,45.37,11,64.91-5L188,152.66Zm-25.72,34.8a8,8,0,0,1-7.75,6.06,8.13,8.13,0,0,1-1.95-.24L80.41,213.33a7.89,7.89,0,0,1-2.71-1.25L51.35,193.26a8,8,0,0,1,9.3-13l25.11,17.94L126,208.24A8,8,0,0,1,131.82,217.94Z"
  ] },
  "hard-drives": { viewBox: "0 0 256 256", paths: [
    "M208,40H48A16,16,0,0,0,32,56v48a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V56A16,16,0,0,0,208,40ZM180,92a12,12,0,1,1,12-12A12,12,0,0,1,180,92Z",
    "M208,136H48a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V152A16,16,0,0,0,208,136Zm-28,52a12,12,0,1,1,12-12A12,12,0,0,1,180,188Z"
  ] },
  heartbeat: { viewBox: "0 0 256 256", paths: [
    "M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0c-3.35-1.8-63.55-34.69-92.68-80.89A4,4,0,0,1,34.92,144H72a8,8,0,0,0,6.66-3.56l9.34-14,25.34,38a8,8,0,0,0,9.16,3.16,8.23,8.23,0,0,0,4.28-3.34L140.28,144H160a8,8,0,0,0,8-8.53,8.18,8.18,0,0,0-8.25-7.47H136a8,8,0,0,0-6.66,3.56l-9.34,14-25.34-38a8,8,0,0,0-9.17-3.16,8.25,8.25,0,0,0-4.27,3.34L67.72,128H23.53a4,4,0,0,1-3.83-2.81A76.93,76.93,0,0,1,16,102,62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"
  ] },
  "identification-badge": { viewBox: "0 0 256 256", paths: [
    "M200,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24ZM96,48h64a8,8,0,0,1,0,16H96a8,8,0,0,1,0-16Zm84.81,150.4a8,8,0,0,1-11.21-1.6,52,52,0,0,0-83.2,0,8,8,0,1,1-12.8-9.6A67.88,67.88,0,0,1,101,165.51a40,40,0,1,1,53.94,0A67.88,67.88,0,0,1,182.4,187.2,8,8,0,0,1,180.81,198.4ZM152,136a24,24,0,1,1-24-24A24,24,0,0,1,152,136Z"
  ] },
  lightbulb: { viewBox: "0 0 256 256", paths: [
    "M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-32.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z"
  ] },
  "lock-key": { viewBox: "0 0 256 256", paths: [
    "M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-72,78.63V184a8,8,0,0,1-16,0V158.63a24,24,0,1,1,16,0ZM160,80H96V56a32,32,0,0,1,64,0Z"
  ] },
  "plugs-connected": { viewBox: "0 0 256 256", paths: [
    "M88.57,35A8,8,0,0,1,103.43,29l8,20A8,8,0,0,1,96.57,55ZM29,103.43l20,8A8,8,0,1,0,55,96.57l-20-8A8,8,0,0,0,29,103.43ZM227,152.57l-20-8A8,8,0,1,0,201,159.43l20,8A8,8,0,0,0,227,152.57ZM159.43,201A8,8,0,0,0,144.57,207l8,20A8,8,0,1,0,167.43,221ZM237.91,18.52a8,8,0,0,0-11.5-.18L174,70.75l-5.38-5.38a32,32,0,0,0-45.28,0L106.14,82.54a4,4,0,0,0,0,5.66l61.7,61.66a4,4,0,0,0,5.66,0l16.74-16.74a32.76,32.76,0,0,0,9.81-22.52,31.82,31.82,0,0,0-9.37-23.17l-5.38-5.37,52.2-52.17A8.22,8.22,0,0,0,237.91,18.52ZM85.64,90.34a8,8,0,0,0-11.49.18,8.22,8.22,0,0,0,.41,11.37L80.67,108,65.34,123.31A31.82,31.82,0,0,0,56,146.47,32.75,32.75,0,0,0,65.77,169l5,4.94L18.49,226.13a8.21,8.21,0,0,0-.61,11.1,8,8,0,0,0,11.72.43L82,185.25l5.37,5.38a32.1,32.1,0,0,0,45.29,0L148,175.31l6.34,6.35a8,8,0,0,0,11.32-11.32Z"
  ] },
  robot: { viewBox: "0 0 256 256", paths: [
    "M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48ZM172,96a12,12,0,1,1-12,12A12,12,0,0,1,172,96ZM96,184H80a16,16,0,0,1,0-32H96ZM84,120a12,12,0,1,1,12-12A12,12,0,0,1,84,120Zm60,64H112V152h32Zm32,0H160V152h16a16,16,0,0,1,0,32Z"
  ] },
  "shield-check": { viewBox: "0 0 256 256", paths: [
    "M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm-34.32,69.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"
  ] },
  strategy: { viewBox: "0 0 256 256", paths: [
    "M108,188a32,32,0,1,1-32-32A32,32,0,0,1,108,188ZM53.66,117.66,68,103.31l14.34,14.35a8,8,0,0,0,11.32-11.32L79.31,92,93.66,77.66A8,8,0,0,0,82.34,66.34L68,80.69,53.66,66.34A8,8,0,0,0,42.34,77.66L56.69,92,42.34,106.34a8,8,0,0,0,11.32,11.32ZM215.31,188l14.35-14.34a8,8,0,0,0-11.32-11.32L204,176.69l-14.34-14.35a8,8,0,0,0-11.32,11.32L192.69,188l-14.35,14.34a8,8,0,0,0,11.32,11.32L204,199.31l14.34,14.35a8,8,0,0,0,11.32-11.32ZM165.66,50.34,163.31,48H184a8,8,0,0,0,0-16H144a8,8,0,0,0-8,8V80a8,8,0,0,0,16,0V59.31l2.34,2.35c17.93,17.93,17.9,35.4,14.71,46.9-4.64,16.77-19.36,31.77-35,35.68A8,8,0,0,0,136,160a8.13,8.13,0,0,0,1.95-.24c21.21-5.3,40.35-24.6,46.53-46.93C190.58,90.78,183.9,68.59,165.66,50.34Z"
  ] },
  "test-tube": { viewBox: "0 0 256 256", paths: [
    "M237.66,86.34l-60-60a8,8,0,0,0-11.32,0L37.11,155.57a44.77,44.77,0,0,0,63.32,63.32L212.32,107l22.21-7.4a8,8,0,0,0,3.13-13.25Zm-32.19,6.07a8,8,0,0,0-3.13,1.93l-39.57,39.57c-8.47,2.9-21.75,4-39.07-5-10.6-5.54-20.18-8-28.56-8.73L172,43.31,217.19,88.5Z"
  ] },
  "tree-structure": { viewBox: "0 0 256 256", paths: [
    "M144,96V80H128a8,8,0,0,0-8,8v80a8,8,0,0,0,8,8h16V160a16,16,0,0,1,16-16h48a16,16,0,0,1,16,16v48a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V192H128a24,24,0,0,1-24-24V136H72v8a16,16,0,0,1-16,16H24A16,16,0,0,1,8,144V112A16,16,0,0,1,24,96H56a16,16,0,0,1,16,16v8h32V88a24,24,0,0,1,24-24h16V48a16,16,0,0,1,16-16h48a16,16,0,0,1,16,16V96a16,16,0,0,1-16,16H160A16,16,0,0,1,144,96Z"
  ] },
  users: { viewBox: "0 0 256 256", paths: [
    "M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z"
  ] },
  "users-three": { viewBox: "0 0 256 256", paths: [
    "M64.12,147.8a4,4,0,0,1-4,4.2H16a8,8,0,0,1-7.8-6.17,8.35,8.35,0,0,1,1.62-6.93A67.79,67.79,0,0,1,37,117.51a40,40,0,1,1,66.46-35.8,3.94,3.94,0,0,1-2.27,4.18A64.08,64.08,0,0,0,64,144C64,145.28,64,146.54,64.12,147.8Zm182-8.91A67.76,67.76,0,0,0,219,117.51a40,40,0,1,0-66.46-35.8,3.94,3.94,0,0,0,2.27,4.18A64.08,64.08,0,0,1,192,144c0,1.28,0,2.54-.12,3.8a4,4,0,0,0,4,4.2H240a8,8,0,0,0,7.8-6.17A8.33,8.33,0,0,0,246.17,138.89Zm-89,43.18a48,48,0,1,0-58.37,0A72.13,72.13,0,0,0,65.07,212,8,8,0,0,0,72,224H184a8,8,0,0,0,6.93-12A72.15,72.15,0,0,0,157.19,182.07Z"
  ] },
  "warning-octagon": { viewBox: "0 0 256 256", paths: [
    "M227.31,80.23,175.77,28.69A16.13,16.13,0,0,0,164.45,24H91.55a16.13,16.13,0,0,0-11.32,4.69L28.69,80.23A16.13,16.13,0,0,0,24,91.55v72.9a16.13,16.13,0,0,0,4.69,11.32l51.54,51.54A16.13,16.13,0,0,0,91.55,232h72.9a16.13,16.13,0,0,0,11.32-4.69l51.54-51.54A16.13,16.13,0,0,0,232,164.45V91.55A16.13,16.13,0,0,0,227.31,80.23ZM120,80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"
  ] },
  wrench: { viewBox: "0 0 256 256", paths: [
    "M232,96a72,72,0,0,1-100.94,66L79,222.22c-.12.14-.26.29-.39.42a32,32,0,0,1-45.26-45.26c.14-.13.28-.27.43-.39L94,124.94a72.07,72.07,0,0,1,83.54-98.78,8,8,0,0,1,3.93,13.19L144,80l5.66,26.35L176,112l40.65-37.52a8,8,0,0,1,13.19,3.93A72.6,72.6,0,0,1,232,96Z"
  ] }
}, Re = ["viewBox", "width", "height"], Ne = ["d"], Ue = ["title"], Ge = ["viewBox", "width", "height"], Ke = ["d"], Xe = /* @__PURE__ */ M({
  __name: "ProposalIcon",
  props: {
    concept: {},
    variant: { default: "hero" },
    tone: {},
    size: { default: 82 }
  },
  setup(e) {
    const l = e, s = x(() => {
      const d = W[l.concept];
      return d || console.warn(`[ProposalIcon] Unknown concept: "${l.concept}"`), d;
    }), o = x(() => {
      if (!s.value) return null;
      const d = Te[s.value.glyph];
      return d || console.warn(`[ProposalIcon] Missing glyph: "${s.value.glyph}" — npm run build:proposal-icons`), d ?? null;
    }), n = x(() => {
      var d;
      return l.tone ?? ((d = s.value) == null ? void 0 : d.tone) ?? "blue";
    }), c = { hero: 0.46, path: 0.48, inline: 1 }, u = x(() => Math.round(l.size * c[l.variant]));
    return (d, g) => {
      var m;
      return o.value && e.variant === "inline" ? (a(), i("svg", {
        key: 0,
        class: "proposal-glyph",
        viewBox: o.value.viewBox,
        width: u.value,
        height: u.value,
        focusable: "false",
        "aria-hidden": "true"
      }, [
        (a(!0), i(y, null, f(o.value.paths, (A, v) => (a(), i("path", {
          key: v,
          d: A,
          fill: "currentColor"
        }, null, 8, Ne))), 128))
      ], 8, Re)) : o.value ? (a(), i("span", {
        key: 1,
        class: V(["proposal-icon", [`variant-${e.variant}`, `tone-${n.value}`]]),
        style: $({ "--badge-size": e.size + "px" }),
        title: (m = s.value) == null ? void 0 : m.label
      }, [
        (a(), i("svg", {
          viewBox: o.value.viewBox,
          width: u.value,
          height: u.value,
          focusable: "false",
          "aria-hidden": "true"
        }, [
          (a(!0), i(y, null, f(o.value.paths, (A, v) => (a(), i("path", {
            key: v,
            d: A,
            fill: "currentColor"
          }, null, 8, Ke))), 128))
        ], 8, Ge))
      ], 14, Ue)) : b("", !0);
    };
  }
}), Ye = /* @__PURE__ */ B(Xe, [["__scopeId", "data-v-39614e9c"]]), ee = Symbol("presentation-illustration-style"), Je = ["people", "quality", "schedule", "verified", "next", "converted-data", "understanding", "strategy", "organization", "staffing", "risk", "security", "training", "deliverable", "stabilization", "maintenance", "integration", "infrastructure", "testing", "requirements-traceability", "evaluation-criteria", "budget-cost", "data-quality", "user-experience", "ai-assistant", "knowledge-search", "operations-handover"], re = [
  { id: "legacy-server", label: "노후 시스템 · 이력", concept: "platform", tags: ["서버", "시스템", "레거시", "이력"], file: "legacy-server.png" },
  { id: "system-blocks", label: "제도 · 시스템 구현", concept: "mapping", tags: ["제도", "설계", "블록", "문서"], file: "system-blocks.png" },
  { id: "analytics-review", label: "성과 분석 · 검토", concept: "performance", tags: ["성과", "차트", "분석", "검토"], file: "analytics-review.png" },
  { id: "data-migration", label: "데이터 이관", concept: "data-migration", tags: ["데이터", "이관", "통합", "저장"], file: "data-migration.png" },
  { id: "workflow-design", label: "업무 · 제도 설계", concept: "workflow", tags: ["업무", "절차", "제도", "설계"], file: "workflow-design.png" },
  { id: "performance-target", label: "성과 · 목표 달성", concept: "performance", tags: ["성과", "목표", "지표", "KPI"], file: "performance-target.png" },
  ...Je.map((e) => ({ id: e, label: W[e].label, concept: e, tags: W[e].terms, file: `${e}.png` }))
], We = [
  ...re,
  { id: "project-lead", label: "프로젝트 책임자", concept: "organization", tags: ["PM", "책임자", "프로젝트", "총괄", "관리자"], file: "project-lead.png" },
  { id: "business-design-team", label: "업무·설계팀", concept: "workflow", tags: ["업무", "설계", "팀", "요구사항", "분석"], file: "business-design-team.png" },
  { id: "development-integration-team", label: "개발·연계팀", concept: "integration", tags: ["개발", "연계", "팀", "코드", "DB"], file: "development-integration-team.png" },
  { id: "quality-assurance-team", label: "품질·검증팀", concept: "quality", tags: ["품질", "검증", "QA", "테스트", "팀"], file: "quality-assurance-team.png" },
  { id: "cloud-service", label: "클라우드 서비스", concept: "infrastructure", tags: ["클라우드", "서버", "서비스", "인프라", "SaaS"], file: "cloud-service.png" },
  { id: "api-connection", label: "API 연계", concept: "integration", tags: ["API", "연계", "인터페이스", "연결", "통합"], file: "api-connection.png" },
  { id: "document-search", label: "문서 검색", concept: "understanding", tags: ["문서", "검색", "조회", "분석", "탐색"], file: "document-search.png" },
  { id: "approval-workflow", label: "결재 승인", concept: "verified", tags: ["결재", "승인", "검토", "확인", "완료"], file: "approval-workflow.png" }
], ce = We.map((e) => ({
  ...e,
  file: "jdc-glass/" + e.file
})), de = Object.fromEntries(ce.map((e) => [e.id, e])), Qe = (e) => U(`/presentation/illustrated/icons/${de[e].file}`), et = Object.fromEntries(re.map((e) => [e.concept, e.id]));
Q.map((e) => ({ concept: e.key, label: e.label, illustration: et[e.key] }));
const tt = ["role", "aria-hidden", "aria-label"], at = ["src", "alt", "width", "height"], it = /* @__PURE__ */ M({
  __name: "IllustrationIcon",
  props: {
    name: {},
    size: { default: 160 },
    decorative: { type: Boolean, default: !0 }
  },
  setup(e) {
    const l = e, s = ne(ee, void 0), o = x(() => {
      const n = de[l.name];
      if (!n) throw Error(`Unknown illustration: ${l.name}`);
      return n;
    });
    return (n, c) => q(s) === "flat" ? (a(), i("span", {
      key: 0,
      class: "proposal-flat-icon",
      style: $({ width: e.size + "px", height: e.size + "px" }),
      role: e.decorative ? void 0 : "img",
      "aria-hidden": e.decorative ? !0 : void 0,
      "aria-label": e.decorative ? void 0 : o.value.label
    }, [
      F(Ye, {
        concept: o.value.concept,
        variant: "inline",
        size: Math.round(e.size * 0.5)
      }, null, 8, ["concept", "size"])
    ], 12, tt)) : (a(), i("img", {
      key: 1,
      class: "proposal-illustration-icon",
      src: q(Qe)(o.value.id),
      alt: e.decorative ? "" : o.value.label,
      width: e.size,
      height: e.size,
      style: { "object-fit": "contain", display: "block" },
      decoding: "async"
    }, null, 8, at));
  }
}), C = /* @__PURE__ */ B(it, [["__scopeId", "data-v-ccf9a5d2"]]), lt = {
  key: 0,
  class: "trace-head"
}, st = { class: "trace-identity" }, nt = { class: "trace-number" }, ot = { "data-fit": "" }, rt = {
  key: 0,
  class: "trace-arrow",
  "aria-hidden": "true"
}, ct = { class: "trace-design" }, dt = { key: 1 }, ut = { "data-fit": "" }, ht = {
  key: 1,
  class: "trace-arrow",
  "aria-hidden": "true"
}, gt = { class: "trace-verification" }, mt = { key: 1 }, yt = { "data-fit": "" }, pt = { class: "trace-emphasis" }, bt = /* @__PURE__ */ M({
  __name: "TraceabilityDiagram",
  props: {
    rows: {},
    variant: { default: "flow" },
    headers: { default: () => ["요구사항", "설계 반영", "검증 방법"] },
    accent: {}
  },
  setup(e) {
    const l = e, s = (c) => {
      const u = c.detail || "", d = c.highlight ? u.indexOf(c.highlight) : -1;
      return d < 0 ? [u, "", ""] : [u.slice(0, d), c.highlight, u.slice(d + c.highlight.length)];
    }, o = x(() => l.rows.map((c) => ({ ...c, parts: s(c) }))), n = ["deliverable", "workflow-design", "quality"];
    return (c, u) => (a(), i("div", {
      class: V(["trace-diagram", `trace-${e.variant}`]),
      style: $({ "--trace-row-count": o.value.length, ...e.accent ? { "--trace-accent": e.accent } : {} })
    }, [
      e.variant === "flow" ? (a(), i("div", lt, [
        (a(!0), i(y, null, f(e.headers, (d, g) => (a(), i("div", { key: d }, [
          F(C, {
            name: n[g] || "quality",
            size: 44
          }, null, 8, ["name"]),
          t("strong", null, r(d), 1)
        ]))), 128))
      ])) : b("", !0),
      (a(!0), i(y, null, f(o.value, (d, g) => (a(), i("article", {
        key: g,
        class: "trace-row"
      }, [
        t("div", st, [
          F(C, {
            name: d.icon || ["deliverable", "data-migration", "people"][g % 3],
            size: e.variant === "flow" ? 70 : 60
          }, null, 8, ["name", "size"]),
          t("div", null, [
            t("span", nt, r(String(g + 1).padStart(2, "0")), 1),
            t("h2", ot, r(d.title), 1)
          ])
        ]),
        e.variant === "flow" ? (a(), i("span", rt, "→")) : b("", !0),
        t("div", ct, [
          e.variant === "flow" ? (a(), H(C, {
            key: 0,
            name: ["workflow-design", "system-blocks", "organization"][g % 3],
            size: 62
          }, null, 8, ["name"])) : b("", !0),
          e.variant === "cards" ? (a(), i("small", dt, r(e.headers[1]), 1)) : b("", !0),
          t("p", ut, r(d.body), 1)
        ]),
        e.variant === "flow" ? (a(), i("span", ht, "→")) : b("", !0),
        t("div", gt, [
          e.variant === "flow" ? (a(), H(C, {
            key: 0,
            name: ["analytics-review", "verified", "quality"][g % 3],
            size: 62
          }, null, 8, ["name"])) : b("", !0),
          e.variant === "cards" ? (a(), i("small", mt, r(e.headers[2]), 1)) : b("", !0),
          t("p", yt, [
            t("span", null, [
              S(r(d.parts[0]), 1),
              t("strong", pt, r(d.parts[1]), 1),
              S(r(d.parts[2]), 1)
            ])
          ])
        ])
      ]))), 128))
    ], 6));
  }
}), vt = /* @__PURE__ */ B(bt, [["__scopeId", "data-v-41f2c514"]]), ft = { class: "row-head" }, kt = { class: "row-number" }, wt = { class: "row-identity" }, xt = {
  key: 0,
  "data-fit": ""
}, $t = { "data-fit": "" }, At = { "data-fit": "" }, Lt = { class: "row-output" }, Ht = { "data-fit": "" }, Vt = /* @__PURE__ */ M({
  __name: "ProcessDiagramRows",
  props: {
    items: {},
    highlightLast: { type: Boolean, default: !0 },
    outputLabel: { default: "주요 산출물" }
  },
  setup(e) {
    return (l, s) => (a(), i("div", {
      class: V(["process-rows", { "is-dense": e.items.length > 4 }]),
      style: $({ "--row-count": e.items.length })
    }, [
      t("div", ft, [
        s[0] || (s[0] = t("span", null, "단계", -1)),
        s[1] || (s[1] = t("span", null, "실행 내용", -1)),
        t("span", null, r(e.outputLabel), 1)
      ]),
      t("ol", null, [
        (a(!0), i(y, null, f(e.items, (o, n) => (a(), i("li", {
          key: n,
          class: V({ "is-final": e.highlightLast && n === e.items.length - 1 })
        }, [
          t("span", kt, r(String(n + 1).padStart(2, "0")), 1),
          t("div", wt, [
            o.icon ? (a(), H(C, {
              key: 0,
              name: o.icon,
              size: e.items.length > 4 ? 42 : 56
            }, null, 8, ["name", "size"])) : b("", !0),
            t("div", null, [
              o.stageLabel ? (a(), i("small", xt, r(o.stageLabel), 1)) : b("", !0),
              t("h2", $t, r(o.title), 1)
            ])
          ]),
          t("p", At, r(o.body), 1),
          t("div", Lt, [
            t("strong", Ht, r(o.detail), 1)
          ])
        ], 2))), 128))
      ])
    ], 6));
  }
}), Zt = /* @__PURE__ */ B(Vt, [["__scopeId", "data-v-635b1e8b"]]), It = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2096%2096'%3e%3cg%20fill='none'%20stroke='%23214E64'%20stroke-width='3.4'%20stroke-linecap='round'%20stroke-linejoin='round'%3e%3ccircle%20cx='46'%20cy='50'%20r='31'%20fill='%23E5F2F7'/%3e%3ccircle%20cx='46'%20cy='50'%20r='30'/%3e%3ccircle%20cx='46'%20cy='50'%20r='19'/%3e%3ccircle%20cx='46'%20cy='50'%20r='8'%20fill='%23fff'/%3e%3cpath%20d='m46%2050%2027-27'%20stroke='%23C36924'/%3e%3cpath%20d='m66%2022%202-10%206%206%2010%201-11%2010-8%201z'%20fill='%23EBA659'%20stroke='%23A8561A'/%3e%3c/g%3e%3c/svg%3e", Mt = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2096%2096'%3e%3cg%20fill='none'%20stroke='%23214E64'%20stroke-width='3.4'%20stroke-linecap='round'%20stroke-linejoin='round'%3e%3cpath%20d='M24%2013h39l12%2012v56H24z'%20fill='%23F2F8FA'/%3e%3cpath%20d='M63%2013v13h12'/%3e%3cpath%20d='M35%2034h19M35%2044h27'%20stroke='%236896A8'/%3e%3cpath%20d='M36%2068v-9m10%209V53m10%2015V49'%20stroke-width='5'/%3e%3ccircle%20cx='72'%20cy='68'%20r='13'%20fill='%23FFF0DC'%20stroke='%23B86725'/%3e%3cpath%20d='m65%2068%205%205%209-11'%20stroke='%23AB571B'/%3e%3c/g%3e%3c/svg%3e", Bt = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2096%2096'%3e%3cg%20fill='none'%20stroke='%23214E64'%20stroke-width='3.4'%20stroke-linecap='round'%20stroke-linejoin='round'%3e%3cpath%20d='M21%2064V46h54v18M48%2032v32'/%3e%3crect%20x='34'%20y='12'%20width='28'%20height='21'%20rx='4'%20fill='%23DDEEF4'/%3e%3crect%20x='10'%20y='63'%20width='22'%20height='18'%20rx='3'%20fill='%23EAF4F7'/%3e%3crect%20x='37'%20y='63'%20width='22'%20height='18'%20rx='3'%20fill='%23FFF0DC'%20stroke='%23AE6025'/%3e%3crect%20x='64'%20y='63'%20width='22'%20height='18'%20rx='3'%20fill='%23EAF4F7'/%3e%3c/g%3e%3c/svg%3e", Ct = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2096%2096'%3e%3cg%20fill='none'%20stroke='%23214E64'%20stroke-width='3.4'%20stroke-linecap='round'%20stroke-linejoin='round'%3e%3crect%20x='15'%20y='22'%20width='66'%20height='56'%20rx='6'%20fill='%23EFF7FA'/%3e%3crect%20x='37'%20y='15'%20width='22'%20height='10'%20rx='3'%20fill='%23D6E8EF'/%3e%3ccircle%20cx='36'%20cy='45'%20r='7'%20fill='%23BEDBE6'/%3e%3cpath%20d='M23%2066c1-8%206-12%2013-12s12%204%2013%2012z'%20fill='%23D6E8EF'/%3e%3cpath%20d='M56%2042h13m-13%208h9'%20stroke='%237397A6'/%3e%3cpath%20d='m56%2063%205%205%2011-13'%20stroke='%23BB661F'%20stroke-width='4'/%3e%3c/g%3e%3c/svg%3e", Et = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='%2336393c'%3e%3cpath%20d='M232,56V176a8,8,0,0,1-2.76,6c-15.28,13.23-29.89,18-43.82,18-18.91,0-36.57-8.74-53-16.85C105.87,170,82.79,158.61,56,179.77V224a8,8,0,0,1-16,0V56a8,8,0,0,1,2.77-6h0c36-31.18,68.31-15.21,96.79-1.12C167,62.46,190.79,74.2,218.76,50A8,8,0,0,1,232,56Z'/%3e%3c/svg%3e", St = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='%2336393c'%3e%3cpath%20d='M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z'/%3e%3c/svg%3e", zt = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='%2336393c'%3e%3cpath%20d='M64.12,147.8a4,4,0,0,1-4,4.2H16a8,8,0,0,1-7.8-6.17,8.35,8.35,0,0,1,1.62-6.93A67.79,67.79,0,0,1,37,117.51a40,40,0,1,1,66.46-35.8,3.94,3.94,0,0,1-2.27,4.18A64.08,64.08,0,0,0,64,144C64,145.28,64,146.54,64.12,147.8Zm182-8.91A67.76,67.76,0,0,0,219,117.51a40,40,0,1,0-66.46-35.8,3.94,3.94,0,0,0,2.27,4.18A64.08,64.08,0,0,1,192,144c0,1.28,0,2.54-.12,3.8a4,4,0,0,0,4,4.2H240a8,8,0,0,0,7.8-6.17A8.33,8.33,0,0,0,246.17,138.89Zm-89,43.18a48,48,0,1,0-58.37,0A72.13,72.13,0,0,0,65.07,212,8,8,0,0,0,72,224H184a8,8,0,0,0,6.93-12A72.15,72.15,0,0,0,157.19,182.07Z'/%3e%3c/svg%3e", qt = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20256%20256'%20fill='%2336393c'%3e%3cpath%20d='M112,120a16,16,0,1,1-16-16A16,16,0,0,1,112,120ZM232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM135.75,166a39.76,39.76,0,0,0-17.19-23.34,32,32,0,1,0-45.12,0A39.84,39.84,0,0,0,56.25,166a8,8,0,0,0,15.5,4c2.64-10.25,13.06-18,24.25-18s21.62,7.73,24.25,18a8,8,0,1,0,15.5-4ZM200,144a8,8,0,0,0-8-8H152a8,8,0,0,0,0,16h40A8,8,0,0,0,200,144Zm0-32a8,8,0,0,0-8-8H152a8,8,0,0,0,0,16h40A8,8,0,0,0,200,112Z'/%3e%3c/svg%3e", Dt = { class: "step-number" }, Ft = {
  key: 0,
  class: "stage-label",
  "data-fit": ""
}, _t = { class: "icon-slot" }, Pt = ["src"], jt = { "data-fit": "" }, Ot = {
  class: "step-body",
  "data-fit": ""
}, Tt = {
  key: 0,
  class: "step-output"
}, Rt = { "data-fit": "" }, Nt = {
  key: 0,
  class: "reverse-route"
}, Ut = /* @__PURE__ */ M({
  __name: "ProcessDiagramCards",
  props: {
    items: {},
    variant: { default: "cards" },
    highlightLast: { type: Boolean, default: !0 },
    outputLabel: { default: "주요 산출물" },
    reverseLabel: {}
  },
  setup(e) {
    const l = { goal: It, evaluation: Mt, department: Bt, individual: Ct, solidGoal: Et, solidEvaluation: St, solidDepartment: zt, solidIndividual: qt }, s = ne(ee, void 0);
    return (o, n) => e.variant === "rows" ? (a(), H(Zt, {
      key: 0,
      items: e.items,
      "highlight-last": e.highlightLast,
      "output-label": e.outputLabel
    }, null, 8, ["items", "highlight-last", "output-label"])) : (a(), i("div", {
      key: 1,
      class: V(["process-flow", { "has-reverse": e.reverseLabel }])
    }, [
      t("div", {
        class: "process-cards",
        style: $({ gridTemplateColumns: `repeat(${e.items.length},minmax(0,1fr))` })
      }, [
        (a(!0), i(y, null, f(e.items, (c, u) => (a(), i("article", {
          key: u,
          class: V(["process-card", { "is-final": e.highlightLast && u === e.items.length - 1 }])
        }, [
          t("header", null, [
            t("span", Dt, r(String(u + 1).padStart(2, "0")), 1),
            c.stageLabel ? (a(), i("span", Ft, r(c.stageLabel), 1)) : b("", !0)
          ]),
          t("div", _t, [
            c.pictogram && q(s) === "flat" ? (a(), i("img", {
              key: 0,
              class: "card-pictogram",
              src: l[c.pictogram],
              width: "90",
              height: "90",
              alt: ""
            }, null, 8, Pt)) : c.icon ? (a(), H(C, {
              key: 1,
              name: c.icon,
              size: 90
            }, null, 8, ["name"])) : b("", !0)
          ]),
          t("h2", jt, r(c.title), 1),
          t("p", Ot, r(c.body), 1),
          c.detail ? (a(), i("div", Tt, [
            t("small", null, r(e.outputLabel), 1),
            t("strong", Rt, r(c.detail), 1)
          ])) : b("", !0),
          u < e.items.length - 1 ? (a(), i("span", {
            key: 1,
            class: V(["step-arrow", { "to-final": e.highlightLast && u === e.items.length - 2 }]),
            "aria-hidden": "true"
          }, "→", 2)) : b("", !0)
        ], 2))), 128))
      ], 4),
      e.reverseLabel ? (a(), i("div", Nt, [
        t("span", null, r(e.reverseLabel), 1)
      ])) : b("", !0)
    ], 2));
  }
}), Gt = /* @__PURE__ */ B(Ut, [["__scopeId", "data-v-28dd93f4"]]), Kt = {
  key: 0,
  class: "category",
  "data-fit": ""
}, Xt = { "data-fit": "" }, Yt = {
  key: 0,
  class: "key-message",
  "data-fit": ""
}, Jt = {
  class: "source-body",
  "data-fit": ""
}, Wt = {
  key: 1,
  class: "criteria"
}, Qt = { "data-fit": "" }, ea = /* @__PURE__ */ M({
  __name: "EvidenceSourceCards",
  props: {
    items: {},
    criteriaLabel: { default: "핵심 포인트" }
  },
  setup(e) {
    const l = ["#0064c8", "#007b83", "#5946b5"];
    return (s, o) => (a(), i("div", {
      class: "source-cards",
      style: $({ gridTemplateColumns: `repeat(${e.items.length},minmax(0,1fr))` })
    }, [
      (a(!0), i(y, null, f(e.items, (n, c) => (a(), i("article", {
        key: c,
        class: "source-card",
        style: $({ "--source-accent": n.accent || l[c % l.length] })
      }, [
        t("header", null, [
          n.category ? (a(), i("span", Kt, r(n.category), 1)) : b("", !0),
          n.icon ? (a(), H(C, {
            key: 1,
            name: n.icon,
            size: 64
          }, null, 8, ["name"])) : b("", !0)
        ]),
        t("h2", Xt, r(n.title), 1),
        n.detail ? (a(), i("strong", Yt, r(n.detail), 1)) : b("", !0),
        t("p", Jt, r(n.body), 1),
        n.outcome || n.question ? (a(), i("div", Wt, [
          t("small", null, r(n.footerLabel || e.criteriaLabel), 1),
          t("p", Qt, r(n.outcome || n.question), 1)
        ])) : b("", !0)
      ], 4))), 128))
    ], 4));
  }
}), ta = /* @__PURE__ */ B(ea, [["__scopeId", "data-v-475d57ec"]]), aa = ["aria-label"], ia = ["stroke-dasharray"], la = { class: "metric-hero-copy" }, sa = {
  class: "metric-number",
  "data-fit": ""
}, na = { "data-fit": "" }, oa = { "data-fit": "" }, ra = { class: "metric-support" }, ca = { class: "metric-copy" }, da = { "data-fit": "" }, ua = {
  class: "metric-number",
  "data-fit": ""
}, ha = { "data-fit": "" }, ga = /* @__PURE__ */ M({
  __name: "KeyMetricsDashboard",
  props: {
    items: {},
    primaryIndex: { default: 2 },
    accent: {}
  },
  setup(e) {
    const l = e, s = x(() => l.items[l.primaryIndex] ?? l.items[2]), o = x(() => l.items.filter((u) => u !== s.value)), n = x(() => {
      var g, m;
      const u = (m = (g = s.value) == null ? void 0 : g.value) == null ? void 0 : m.trim().match(/^(\d+(?:\.\d+)?)\s*%$/);
      if (!u) return null;
      const d = Number(u[1]);
      return d <= 100 ? d : null;
    }), c = (u = "") => {
      const d = u.match(/^([\d,.]+)\s*(.*)$/);
      return d ? { number: d[1], unit: d[2] } : { number: u, unit: "" };
    };
    return (u, d) => (a(), i("div", {
      class: "metrics-dashboard",
      style: $({ "--metric-accent": e.accent || "var(--ds-blue600)" })
    }, [
      t("article", {
        class: V(["metric-hero", { "has-ring": n.value !== null }])
      }, [
        n.value !== null ? (a(), i("svg", {
          key: 0,
          class: "metric-ring",
          viewBox: "0 0 360 360",
          role: "img",
          "aria-label": `${s.value.title} ${s.value.value}`
        }, [
          d[0] || (d[0] = t("circle", {
            cx: "180",
            cy: "180",
            r: "151",
            fill: "none",
            stroke: "#e2f1fa",
            "stroke-width": "28"
          }, null, -1)),
          t("circle", {
            class: "metric-arc",
            cx: "180",
            cy: "180",
            r: "151",
            fill: "none",
            "stroke-width": "28",
            pathLength: "100",
            "stroke-dasharray": `${n.value} ${100 - n.value}`,
            transform: "rotate(-90 180 180)"
          }, null, 8, ia)
        ], 8, aa)) : b("", !0),
        t("div", la, [
          t("div", sa, [
            S(r(c(s.value.value).number), 1),
            t("span", null, r(c(s.value.value).unit), 1)
          ]),
          t("h2", na, r(s.value.title), 1),
          t("p", oa, r(s.value.body), 1)
        ])
      ], 2),
      t("div", ra, [
        (a(!0), i(y, null, f(o.value, (g, m) => (a(), i("article", {
          key: m,
          class: "metric-card"
        }, [
          F(C, {
            name: g.icon || (m === 0 ? "deliverable" : "verified"),
            size: 108
          }, null, 8, ["name"]),
          t("div", ca, [
            t("h2", da, r(g.title), 1),
            t("div", ua, [
              S(r(c(g.value).number), 1),
              t("span", null, r(c(g.value).unit), 1)
            ]),
            t("p", ha, r(g.body), 1)
          ])
        ]))), 128))
      ])
    ], 4));
  }
}), ma = /* @__PURE__ */ B(ga, [["__scopeId", "data-v-1c6a1161"]]), ya = {
  class: "gantt-head",
  role: "row"
}, pa = { class: "gantt-months" }, ba = {
  class: "gantt-stage",
  role: "rowheader"
}, va = { "data-fit": "" }, fa = ["aria-label"], ka = {
  class: "gantt-grid",
  "aria-hidden": "true"
}, wa = { "data-fit": "" }, xa = /* @__PURE__ */ M({
  __name: "MilestoneGantt",
  props: {
    months: {},
    tracks: {}
  },
  setup(e) {
    const l = { 분석: "analytics-review", 설계: "workflow-design", 구현: "system-blocks", 검증: "quality" };
    return (s, o) => (a(), i("div", {
      class: "milestone-gantt",
      role: "table",
      "aria-label": "단계별 수행 일정",
      style: $({ "--months": e.months.length, "--tracks": e.tracks.length })
    }, [
      t("div", ya, [
        o[0] || (o[0] = t("span", {
          role: "columnheader",
          class: "work-heading"
        }, "주요 작업", -1)),
        t("div", pa, [
          (a(!0), i(y, null, f(e.months, (n) => (a(), i("strong", {
            key: n,
            role: "columnheader"
          }, r(n), 1))), 128))
        ])
      ]),
      (a(!0), i(y, null, f(e.tracks, (n, c) => (a(), i("div", {
        key: c,
        class: "gantt-row",
        role: "row"
      }, [
        t("div", ba, [
          F(C, {
            name: n.icon || l[n.label] || "schedule",
            size: 52
          }, null, 8, ["name"]),
          t("div", null, [
            t("small", null, r(String(c + 1).padStart(2, "0")), 1),
            t("h2", va, r(n.label), 1)
          ])
        ]),
        t("div", {
          class: "gantt-lane",
          role: "cell",
          "aria-label": `${e.months[n.start - 1]}부터 ${e.months[n.end - 1]}까지, ${n.milestone}`
        }, [
          t("div", ka, [
            (a(!0), i(y, null, f(e.months, (u) => (a(), i("span", { key: u }))), 128))
          ]),
          t("div", {
            class: "gantt-duration",
            style: $({ left: `${(n.start - 1) / e.months.length * 100}%`, width: `${(n.end - n.start + 1) / e.months.length * 100}%` })
          }, [
            t("span", wa, r(n.milestone), 1),
            o[1] || (o[1] = t("i", {
              class: "gantt-end",
              "aria-hidden": "true"
            }, null, -1))
          ], 4)
        ], 8, fa)
      ]))), 128))
    ], 4));
  }
}), $a = /* @__PURE__ */ B(xa, [["__scopeId", "data-v-7580a474"]]), Aa = {
  class: "delivery-organization",
  "aria-label": "책임자와 세 수행팀의 보고 관계"
}, La = { class: "organization-leader" }, Ha = { "data-fit": "" }, Va = { "data-fit": "" }, Za = {
  class: "organization-connectors",
  viewBox: "0 0 944 38",
  preserveAspectRatio: "none",
  "aria-hidden": "true"
}, Ia = ["cx"], Ma = { class: "organization-teams" }, Ba = { class: "organization-number" }, Ca = { "data-fit": "" }, Ea = { "data-fit": "" }, Sa = /* @__PURE__ */ M({
  __name: "DeliveryOrganization",
  props: {
    items: {}
  },
  setup(e) {
    return (l, s) => (a(), i("div", Aa, [
      t("article", La, [
        F(C, {
          name: e.items[0].icon || "staffing",
          size: 94
        }, null, 8, ["name"]),
        t("div", null, [
          t("h2", Ha, r(e.items[0].title), 1),
          t("p", Va, r(e.items[0].body), 1)
        ])
      ]),
      (a(), i("svg", Za, [
        s[0] || (s[0] = t("path", { d: "M472 0 V18 M149.33 38 V18 H794.67 V38 M472 18 V38" }, null, -1)),
        s[1] || (s[1] = t("circle", {
          cx: "472",
          cy: "2",
          r: "4"
        }, null, -1)),
        (a(), i(y, null, f([149.33, 472, 794.67], (o) => t("circle", {
          key: o,
          cx: o,
          cy: "36",
          r: "4"
        }, null, 8, Ia)), 64))
      ])),
      t("div", Ma, [
        (a(!0), i(y, null, f(e.items.slice(1), (o, n) => (a(), i("article", {
          key: n,
          class: "organization-team"
        }, [
          t("span", Ba, r(String(n + 1).padStart(2, "0")), 1),
          F(C, {
            name: o.icon || "organization",
            size: 78
          }, null, 8, ["name"]),
          t("h2", Ca, r(o.title), 1),
          t("ul", null, [
            (a(!0), i(y, null, f(o.body.split(`
`), (c, u) => (a(), i("li", { key: u }, [
              s[2] || (s[2] = t("span", {
                "aria-hidden": "true",
                class: "role-mark"
              }, "✓", -1)),
              t("span", Ea, r(c), 1)
            ]))), 128))
          ])
        ]))), 128))
      ])
    ]));
  }
}), za = /* @__PURE__ */ B(Sa, [["__scopeId", "data-v-6a482448"]]), qa = {
  class: "alternative-table",
  "aria-label": "동일 기준의 대안 비교"
}, Da = {
  scope: "col",
  class: "criteria-heading"
}, Fa = { class: "heading-content" }, _a = {
  key: 0,
  class: "option-visual",
  viewBox: "0 0 108 38",
  "aria-hidden": "true"
}, Pa = {
  key: 1,
  x: "31",
  y: "3",
  width: "46",
  height: "32",
  rx: "4"
}, ja = { "data-fit": "" }, Oa = {
  key: 0,
  "data-fit": ""
}, Ta = {
  scope: "row",
  class: "criterion"
}, Ra = { "data-fit": "" }, Na = { "data-fit": "" }, Ua = { "data-fit": "" }, Ga = /* @__PURE__ */ M({
  __name: "AlternativeComparisonTable",
  props: {
    items: {},
    headers: { default: () => ["비교 기준", "대안 A", "대안 B"] },
    subtitles: { default: () => [] },
    visuals: { default: () => [] }
  },
  setup(e) {
    return (l, s) => (a(), i("table", qa, [
      s[1] || (s[1] = t("colgroup", null, [
        t("col", { class: "criteria-column" }),
        t("col"),
        t("col")
      ], -1)),
      t("thead", null, [
        t("tr", null, [
          t("th", Da, r(e.headers[0]), 1),
          (a(), i(y, null, f(2, (o) => t("th", {
            key: o,
            scope: "col",
            class: V(["option-heading", `option-${o}`])
          }, [
            t("div", Fa, [
              e.visuals[o - 1] && e.visuals[o - 1] !== "none" ? (a(), i("svg", _a, [
                e.visuals[o - 1] === "sequence" ? (a(), i(y, { key: 0 }, [
                  s[0] || (s[0] = be('<rect x="1" y="8" width="22" height="22" rx="3" data-v-56ab461e></rect><path d="M27 19h12m-5-5 5 5-5 5" data-v-56ab461e></path><rect x="43" y="8" width="22" height="22" rx="3" data-v-56ab461e></rect><path d="M69 19h12m-5-5 5 5-5 5" data-v-56ab461e></path><rect x="84" y="8" width="22" height="22" rx="3" data-v-56ab461e></rect>', 5))
                ], 64)) : (a(), i("rect", Pa))
              ])) : b("", !0),
              t("div", null, [
                t("strong", ja, r(e.headers[o]), 1),
                e.subtitles[o - 1] ? (a(), i("span", Oa, r(e.subtitles[o - 1]), 1)) : b("", !0)
              ])
            ])
          ], 2)), 64))
        ])
      ]),
      t("tbody", null, [
        (a(!0), i(y, null, f(e.items, (o, n) => (a(), i("tr", { key: n }, [
          t("th", Ta, [
            t("div", null, [
              t("span", null, r(String(n + 1).padStart(2, "0")), 1),
              t("strong", Ra, r(o.title), 1)
            ])
          ]),
          t("td", {
            class: V(["option-cell option-1", { "first-value": n === 0 }])
          }, [
            t("span", Na, r(o.body), 1)
          ], 2),
          t("td", {
            class: V(["option-cell option-2", { "first-value": n === 0 }])
          }, [
            t("span", Ua, r(o.detail), 1)
          ], 2)
        ]))), 128))
      ])
    ]));
  }
}), Ka = /* @__PURE__ */ B(Ga, [["__scopeId", "data-v-56ab461e"]]), Xa = {
  class: "risk-head",
  role: "row"
}, Ya = {
  viewBox: "0 0 32 32",
  "aria-hidden": "true"
}, Ja = {
  class: "risk-name",
  role: "rowheader"
}, Wa = { class: "risk-number" }, Qa = { "data-fit": "" }, e0 = {
  class: "risk-impact",
  role: "cell"
}, t0 = { "data-fit": "" }, a0 = {
  class: "risk-response",
  role: "cell"
}, i0 = { "data-fit": "" }, l0 = /* @__PURE__ */ M({
  __name: "RiskResponseMatrix",
  props: {
    items: {},
    headers: { default: () => ["위험 요인", "예상 영향", "대응 방향"] }
  },
  setup(e) {
    return (l, s) => (a(), i("div", {
      class: "risk-matrix",
      role: "table",
      "aria-label": "위험별 영향과 대응 방향",
      style: $({ "--risk-count": e.items.length })
    }, [
      t("div", Xa, [
        (a(!0), i(y, null, f(e.headers, (o, n) => (a(), i("div", {
          key: n,
          role: "columnheader"
        }, [
          (a(), i("svg", Ya, [
            n === 0 ? (a(), i(y, { key: 0 }, [
              s[0] || (s[0] = t("path", { d: "M16 4 30 28H2Z" }, null, -1)),
              s[1] || (s[1] = t("path", { d: "M16 12v7m0 4v1" }, null, -1))
            ], 64)) : n === 1 ? (a(), i(y, { key: 1 }, [
              s[2] || (s[2] = t("ellipse", {
                cx: "16",
                cy: "23",
                rx: "13",
                ry: "5"
              }, null, -1)),
              s[3] || (s[3] = t("path", { d: "M8 15c-6 2-5 5 0 7m16-7c6 2 5 5 0 7M16 3c-6 7-6 12 0 12s6-5 0-12Z" }, null, -1))
            ], 64)) : (a(), i(y, { key: 2 }, [
              s[4] || (s[4] = t("path", { d: "m16 3 12 5v9c0 6-6 10-12 13C10 27 4 23 4 17V8Z" }, null, -1)),
              s[5] || (s[5] = t("path", { d: "m10 16 4 4 8-9" }, null, -1))
            ], 64))
          ])),
          t("strong", null, r(o), 1)
        ]))), 128))
      ]),
      (a(!0), i(y, null, f(e.items, (o, n) => (a(), i("div", {
        key: n,
        class: "risk-row",
        role: "row"
      }, [
        t("div", Ja, [
          t("span", Wa, r(String(n + 1).padStart(2, "0")), 1),
          t("strong", Qa, r(o.title), 1)
        ]),
        t("div", e0, [
          t("span", t0, r(o.body), 1),
          s[6] || (s[6] = t("span", {
            class: "risk-arrow",
            "aria-hidden": "true"
          }, "→", -1))
        ]),
        t("div", a0, [
          s[7] || (s[7] = t("span", {
            class: "response-check",
            "aria-hidden": "true"
          }, "✓", -1)),
          t("strong", i0, r(o.detail), 1)
        ])
      ]))), 128))
    ], 4));
  }
}), s0 = /* @__PURE__ */ B(l0, [["__scopeId", "data-v-2a68c65b"]]), n0 = ["full", "compact"].map((e) => ({
  id: `chapter-header-${e}`,
  name: e === "full" ? "공통 목차 · 전체 폭 경로형" : "공통 목차 · 우측 압축형",
  group: "공통 프레임",
  relation: "현재 위치",
  purpose: "본문 레이아웃 위에 공통 목차를 배치하고 현재 장만 고객사 CI 색상과 굵기로 표시합니다.",
  capacity: "2–7개 장 · 1040×720",
  required: ["목차 목록(items)", "현재 장 ID(activeId)", "장표 제목"],
  optional: ["variant", "고객사 테마(theme)", "부제", "본문 슬롯 또는 rows", "하단 메시지"],
  rules: ["전체 폭 경로형이 기본입니다. 한 발표에서는 같은 형식을 유지합니다.", "현재 항목만 글자색과 굵기로 강조하며 배경·밑줄을 넣지 않습니다.", "공통 헤더와 본문은 독립적으로 조합합니다. ChapterHeaderSlide의 기본 슬롯에 다른 본문 컴포넌트를 넣을 수 있습니다.", "이 항목은 HTML/PDF 레이아웃입니다. PPTX 렌더러에는 별도 연결이 필요합니다."],
  renderer: "chapter",
  height: 720,
  props: { variant: e, activeId: "strategy", items: [{ id: "focus", number: "01", label: "중점 찾기" }, { id: "strategy", number: "02", label: "전략 수립" }, { id: "theme", number: "03", label: "테마 생성" }, { id: "story", number: "04", label: "스토리 생성" }], title: "전략 수립에 사용하는 세 가지 자료", subtitle: "선택한 중점과 채택한 과제를 중심으로 관련 자료를 묶습니다.", rows: [{ title: "고객 과제", body: `채택·조건부 채택한
니즈와 리스크`, result: "해결해야 할 문제" }, { title: "사업 기준", body: `관련 요구사항·평가기준
작성지침과 원문 근거`, result: "지켜야 할 범위" }, { title: "자사와 경쟁사", body: `등록 자료의 관련 구절
강점·약점과 확인 조건`, result: "차별화의 근거" }], takeaway: "제공 자료의 주장과 입증된 수행 역량을 구분합니다." }
})), o0 = [{ id: "understanding", title: "사업 이해" }, { id: "strategy", title: "추진 전략" }, { id: "implementation", title: "구현 방안" }, { id: "delivery", title: "수행 계획" }, { id: "outcomes", title: "기대 효과" }], X = {
  id: "section-cover",
  name: "장별 표지 · 그라데이션",
  group: "시작·전환",
  relation: "장 전환",
  purpose: "각 장 시작에 핵심 메시지와 전체 발표에서의 현재 위치를 보여줍니다.",
  capacity: "핵심 문구 2줄 · 설명 2줄 · 목차 3–7개",
  required: ["목차 목록(chapters: id·title)", "현재 장 ID(activeId)", "제목(title)"],
  optional: ["강조 제목(emphasis)", "설명(description)", "배경 이미지(background)", "이미지 위치(backgroundPosition)", "상단 라벨(eyebrow)", "하단 문구(footer)"],
  rules: ["기본 배경은 파란 그라데이션입니다. 이미지가 없거나 로딩에 실패하면 기본 배경을 사용합니다.", "장 번호와 하단 현재 위치는 목차 순서와 activeId로 계산합니다.", "제목과 강조 제목은 각각 한 줄, 설명은 두 줄을 권장합니다.", "목차 이름은 짧게 작성하고 activeId는 목록의 ID와 일치시킵니다.", "이미지는 오른쪽에 주요 피사체가 있는 구도가 좋습니다."],
  renderer: "section-cover",
  height: 720,
  props: { chapters: o0, activeId: "strategy", title: "방향은 명확하게,", emphasis: "실행은 단단하게.", description: `핵심 과제를 연결하고
실행 가능한 변화의 구조를 만듭니다`, footer: "STRATEGY & EXECUTION" }
}, r0 = [X, {
  ...X,
  id: "section-cover-image",
  name: "장별 표지 · 프로젝트 이미지",
  props: { ...X.props, background: "/presentation/illustrated/jeju-background.png" }
}], R = ["cover", "section", "cards", "comparison", "migration", "roadmap", "portal"].map((e) => ({
  id: `detailed-${e}`,
  name: { cover: "브랜드 표지", section: "코스 구분", cards: "다항목 설명 카드", comparison: "상세 현재·목표 비교", migration: "이관 실행·검증", roadmap: "병행 트랙 일정", portal: "상세 포털 구성도" }[e],
  group: "수행 방법",
  relation: e,
  purpose: "원문 정보량을 유지하는 상세 제안발표 레이아웃",
  capacity: "1040×720 고정 캔버스",
  required: ["제목", "구조화된 내용"],
  optional: ["입체 아이콘", "핵심 문구"],
  rules: ["내용을 생략하지 않고 정보 위계를 구분합니다.", "출력 후 글자 잘림과 연결 관계를 확인합니다."],
  renderer: "detailed",
  height: 720,
  props: { data: { kind: e, section: "상세 레이아웃", title: "구조화된 내용을 연결합니다", items: e === "cards" ? [{ title: "정보의 연결", body: "입력 데이터에 따라 내용을 표시합니다.", icon: "data-migration" }, { title: "업무의 연결", body: "공통 규칙으로 업무를 표현합니다.", icon: "workflow-design" }, { title: "성과의 연결", body: "결과를 같은 기준으로 확인합니다.", icon: "performance-target" }] : [] } }
})), T = [{ title: "정보의 연결", body: "부서별 정보를 같은 기준으로 정리합니다.", icon: "data-migration" }, { title: "업무의 연결", body: "기준을 업무 절차와 화면에 반영합니다.", icon: "workflow-design" }, { title: "성과의 확인", body: "검증 기준에 따라 결과를 확인합니다.", icon: "quality" }];
for (const e of R) {
  const l = e.props.data;
  ["cover", "section"].includes(l.kind) || (l.course = { label: "1코스", heading: "구성 예시", active: 1 }), e.rules.push("코스 배지와 현재 위치를 함께 표시합니다. 경로의 현재 코스만 강조합니다.", "문장당 핵심 강조는 1곳, 배경 강조는 장표당 2~3곳을 기본으로 합니다.", "강조는 marker(옅은 배경), bold(굵기), inverse(어두운 배경용 밑줄)로 구분합니다.", "하단 메시지 전체를 굵게 하지 않고 takeawayHighlight로 지정한 구절만 강조합니다."), e.rules.push("세로 카드: 아이콘·주제는 중앙, 본문은 왼쪽 정렬. 제목은 공통 2줄 영역을 사용합니다.", "가로 항목: 왼쪽 아이콘과 오른쪽 텍스트를 묶습니다.", "강조는 단계별 핵심 행동 1곳에만 적용하며 원문은 유지합니다.", "구성도는 상위 역할에 SVG 아이콘을 쓰고 세부 기능명은 생략하지 않습니다."), l.kind === "comparison" && (l.items = T.map((s) => ({ ...s, eyebrow: "같은 기준으로 연결", label: "통합된 업무 기준", detail: "결과 확인", body: "부서별로 분리된 업무 정보" }))), l.kind === "migration" && (l.items = [{ title: "단계별 실행·검증" }], l.panels = [{ title: "선제 진단", body: "현행 구조와 운영 조건을 확인합니다.", detail: "분석 기준 확정", icon: "understanding" }, { title: "대상과 기준", items: ["업무 데이터", "이력과 증빙", "권한과 연계"] }], l.steps = Array.from({ length: 5 }, (s, o) => ({ title: ["분석", "정제", "모의 실행", "전환", "검증"][o], body: "단계별 활동 후 검증 결과를 확인합니다.", highlight: "검증 결과", icon: "quality" })), l.assurances = T), l.kind === "roadmap" && (l.months = Array.from({ length: 8 }, (s, o) => `M${o + 1}`), l.tracks = [{ title: "기준 수립", body: "정책과 업무 기준", icon: "strategy" }, { title: "분석·설계", body: "현행 분석과 설계", icon: "understanding" }], l.stages = T, l.items = [{ title: "통합 착수" }, ...T]), l.kind === "portal" && (l.title = "", l.users = [{ title: "사용자", items: ["업무 담당자", "승인자"] }, { title: "관리자", items: ["업무 관리자", "시스템 관리자"] }], l.access = ["업무포털", "통합인증", "계정권한"], l.systems = ["업무 시스템", "성과 시스템"].map((s) => ({ title: s, groups: Array.from({ length: 5 }, (o, n) => ({ title: `업무 영역 ${n + 1}`, items: ["기준 관리", "실적 관리", "결과 확인", "이력 조회"] })) })), l.exchange = "데이터 연계", l.common = { title: "공통 시스템 관리", items: ["메뉴", "권한", "공통코드", "조직", "운영"] }, l.integrations = [{ title: "기존 시스템", groups: [{ title: "업무 연계", body: "업무 데이터" }, { title: "전자결재", body: "결재 정보" }] }, { title: "공통 도구", groups: [{ title: "리포팅", body: "보고서 생성" }, { title: "문서 편집", body: "문서 작성" }] }]);
}
R.push({ ...R.find((e) => e.id === "detailed-cards"), id: "detailed-course", name: "코스형 전략 카드", relation: "병렬 전략", props: { data: { kind: "cards", variant: "course", section: "추진 방향", title: "네 가지 방향을 하나의 여정으로", items: [...T, { title: "운영의 지속", body: "운영 기준으로 업무를 지원합니다.", icon: "maintenance" }].map((e, l) => ({ ...e, eyebrow: `${l + 1}코스`, label: "일관된 기준으로 연결" })) } }, rules: ["코스 연결선은 여정의 은유이며 일정이나 선후 의존성을 뜻하지 않습니다.", "아이콘·전략명·슬로건은 중앙 정렬, 설명은 왼쪽 정렬합니다.", "기간이 있는 병행 일정은 별도의 병행 트랙 레이아웃을 사용합니다."] });
const c0 = R.find((e) => e.id === "detailed-cards");
Object.assign(c0.props.data, { variant: "split", featureMessage: `정보에서 업무로,
업무에서 성과로`, featureCaption: "연결의 세 가지 기준", subtitle: "정보·업무·성과를 하나의 흐름으로 연결합니다" });
const ue = [
  "세로 카드형은 3–4단계의 전체 흐름과 산출물을 한눈에 비교할 때 사용합니다.",
  "가로 행형은 3–6단계의 실행 내용과 산출물을 나란히 읽을 때 사용합니다. 5–6단계는 짧은 문구로 작성합니다.",
  "단계형 장표가 연속될 때 같은 배치를 반복하지 않습니다. 단, 앞 장의 절차가 이어지면 continuesProcess:true로 유지할 수 있습니다.",
  "단계 순서·아이콘 의미·강조 규칙은 배치가 바뀌어도 유지합니다.",
  "마지막 단계는 실제 최종 판단·승인인 경우 강조합니다. 그 외에는 highlightLast:false를 지정합니다.",
  "6단계를 넘거나 문장이 길면 글자를 더 줄이지 말고 장표를 분리합니다."
], N = "디자인 검토용 가상 예시 · 실제 RFP 근거 아님", Z = (e, l, s, o, n, c, u, d, g) => ({
  id: e,
  name: l,
  group: s,
  relation: o,
  purpose: n,
  capacity: c,
  required: u,
  optional: ["부제", "핵심 메시지", "배경 이미지"],
  rules: d,
  renderer: "diagram",
  height: 720,
  props: { data: g }
}), I = { section: "제안발표 / 디자인 예시", subtitle: "내용과 그래픽을 분리한 재사용 레이아웃", takeaway: "", items: [] }, z = [
  { id: "parallel-message-cards", name: "병렬 메시지 카드 · 하단 강조형", group: "핵심 설명", relation: "병렬", purpose: "전략·기능·추진 방향·기대 효과처럼 동등한 세 항목의 핵심 내용을 설명합니다.", capacity: "3개 항목 · 핵심 문구 2줄", required: ["항목명(title)", "핵심 문구(detail)", "설명(body)"], optional: ["분류(category)", "하단 문구(outcome)", "하단 라벨(footerLabel 또는 criteriaLabel)", "아이콘(icon)", "강조색(accent)"], rules: ["하단 문구는 효과·산출물·적용 기준 등 용도에 맞게 작성합니다.", "하단 문구가 없으면 해당 영역을 표시하지 않습니다.", "순서·일정·수치 비교는 전용 레이아웃을 사용합니다."], renderer: "diagram", height: 720, props: { data: { kind: "evidence", section: "추진 방향 / 핵심 메시지", title: "세 가지 방향을 하나의 실행으로", subtitle: "정보·업무·성과를 같은 기준으로 연결합니다.", takeaway: "각 항목의 핵심 내용과 기대 효과를 함께 전달합니다.", takeawayHighlight: "핵심 내용과 기대 효과", criteriaLabel: "기대 효과", items: [{ title: "정보의 통합", category: "데이터", detail: `흩어진 정보를
하나의 기준으로`, body: `자료와 이력을 정리해
같은 기준으로 조회합니다.`, outcome: "일관된 정보 활용", icon: "data-migration" }, { title: "업무의 연결", category: "프로세스", detail: `복잡한 업무를
자연스러운 흐름으로`, body: `단계별 역할과 절차를 연결해
업무 처리를 지원합니다.`, outcome: "명확한 업무 흐름", icon: "workflow-design" }, { title: "성과의 확인", category: "성과", detail: `실행의 결과를
다음 개선으로`, body: `목표와 결과를 함께 살펴
개선 방향을 확인합니다.`, outcome: "근거에 따른 개선", icon: "performance-target" }] } } },
  { id: "strategy-sources", name: "자료·근거 카드 · 역할 강조", group: "근거 제시", relation: "병렬", purpose: "동등한 자료의 역할과 전략에 연결할 기준을 비교합니다.", capacity: "3개 자료 · 핵심 문구 2줄", required: ["자료명(title)", "핵심 역할(detail)", "설명(body)"], optional: ["관점(category)", "연결 기준(question)", "카드 색상(accent)", "아이콘(icon)", "요약 강조(takeawayHighlight)"], rules: ["자료 간 순서가 없으므로 화살표를 사용하지 않습니다.", "핵심 문구는 두 줄 이내로 작성합니다.", "세 자료는 동등한 비중으로 표시합니다."], renderer: "diagram", height: 720, props: { data: { kind: "evidence", title: "전략 수립에 사용하는 세 가지 자료", section: "02 / 전략 수립", subtitle: "선택한 중점과 채택한 과제를 중심으로 관련 자료를 묶습니다.", takeaway: "제공 자료의 주장과 입증된 수행 역량을 구분합니다.", takeawayHighlight: "주장과 입증된 수행 역량", items: [{ title: "고객 과제", category: "고객 관점", detail: `해결해야 할
문제`, body: `채택·조건부 채택한
니즈와 리스크`, question: "무엇을 해결할 것인가", icon: "understanding" }, { title: "사업 기준", category: "사업 관점", detail: `지켜야 할
범위`, body: `관련 요구사항·평가기준
작성지침과 원문 근거`, question: "어떤 기준을 충족할 것인가", icon: "deliverable" }, { title: "자사와 경쟁사", category: "경쟁 관점", detail: `차별화의
근거`, body: `등록 자료의 관련 구절
강점·약점과 확인 조건`, question: "무엇으로 차별화할 것인가", icon: "strategy" }] } } },
  { id: "focus-process", name: "단계형 프로세스 · 최종 판단 강조", group: "수행 방법", relation: "순서", purpose: "자료 준비부터 검증과 최종 판단까지의 흐름을 보여줍니다.", capacity: "3–4단계", required: ["단계명", "본문", "산출물"], optional: ["단계 라벨(stageLabel)", "마지막 단계 강조(highlightLast)", "요약 강조 구절(takeawayHighlight)"], rules: ["단계 라벨은 짧게 작성합니다.", "마지막 단계 강조가 필요 없으면 highlightLast를 false로 지정합니다.", "병렬 자료 비교에는 화살표가 없는 카드 레이아웃을 사용합니다."], renderer: "diagram", height: 720, props: { data: { kind: "process", section: "01 / 중점 찾기", title: "중점 찾기: 고객의 변화를 먼저 찾습니다", subtitle: "RFP 전체를 주자료로 읽고, 기존 분석 결과를 참고합니다.", highlightLast: !0, takeaway: "중점 찾기에는 자사 강점·약점과 창작 규칙을 넣지 않습니다.", takeawayHighlight: "자사 강점·약점과 창작 규칙", items: [{ title: "자료 준비", stageLabel: "INPUT", body: `RFP 전체 본문과
기존 분석 결과`, detail: "페이지·근거 ID", icon: "deliverable" }, { title: "AI 분석", stageLabel: "ANALYSIS", body: `사업 범위와
핵심 변화 도출`, detail: "중점 후보 2~3개", icon: "understanding" }, { title: "코드 검증", stageLabel: "VALIDATION", body: `형식·근거·인용문과
범위 설명 확인`, detail: "검증된 후보", icon: "quality" }, { title: "담당자 선택", stageLabel: "DECISION", body: `선정 이유와 원문을
대조해 중점 선택`, detail: "다음 단계의 기준", icon: "verified" }] } } },
  ...r0,
  { id: "course-agenda", name: "풍경 분할 목차", group: "시작·전환", relation: "목록", purpose: "발표의 전체 흐름과 장 구성을 안내합니다.", capacity: "3–8개 장", required: ["장 제목", "장별 이름·설명"], optional: ["장 번호", "항목 수 표시", "배경"], rules: ["장 수는 입력 데이터에서 계산합니다.", "장명은 두 줄 이내로 작성합니다.", "홀수인 마지막 항목은 전체 폭을 사용합니다."], renderer: "agenda", height: 720, props: { title: `오늘 함께 걸을
일곱 구간의 길`, sectionLabel: "코스 안내", background: "/presentation/jeju-horizon-v1.png", source: N, page: 1, items: [{ section: "시점", title: "사업의 이해", description: "현황과 추진 방향" }, { section: "1코스", title: "재구축 전략·방법론", description: "수행 전략과 단계별 접근" }, { section: "2코스", title: "컨설팅·제도 반영", description: "제도의 취지를 시스템으로" }, { section: "3코스", title: "성과관리 구현", description: "목표와 실적의 연결" }, { section: "4코스", title: "인사포털 구현", description: "업무 기준에 맞춘 설계" }, { section: "5코스", title: "조직·일정·품질·운영", description: "수행 계획과 운영 지원" }, { section: "종점", title: "요약과 추가 제안", description: "핵심 제안의 정리" }] } },
  { id: "strategy-cards", name: "입체 전략 카드", group: "핵심 설명", relation: "병렬", purpose: "동등한 중요도의 세 가지 전략을 설명합니다.", capacity: "3개 카드", required: ["제목", "카드별 주제·본문·결과"], optional: ["입체 아이콘", "하단 메시지"], rules: ["동등한 전략 사이에는 진행 화살표를 사용하지 않습니다.", "본문은 카드당 두 줄을 권장합니다.", "4개 이상이면 별도 장표로 나눕니다."], renderer: "strategy", height: 1040 * 1042 / 1510, props: { width: 1040, section: "추진 방향 / 핵심 전략", titleBefore: "세 가지", titleEmphasis: "추진 방향", titleAfter: "", subtitle: "데이터 · 업무 · 성과를 같은 기준으로 연결", takeaway: "정보와 업무를 연결해 실행 결과를 확인합니다", takeawayLabel: "추진 방향", source: N, page: 2, showConnectors: !1, items: [{ category: "데이터 기반", headline: "신뢰할 수 있는 정보", body: `분산된 정보를 모아
같은 기준으로 관리`, outcome: "판단을 돕는 정보", artwork: "server", outcomeIcon: "data-migration" }, { category: "업무의 연결", headline: "일관된 업무 흐름", body: `부서 간 절차를 연결해
협업의 기반 마련`, outcome: "함께 일하는 방식", artwork: "system", outcomeIcon: "workflow" }, { category: "성과의 확인", headline: "실행 결과의 가시화", body: `목표와 결과를 비교해
개선 방향을 확인`, outcome: "다음 실행의 근거", artwork: "analytics", outcomeIcon: "performance" }] } },
  { id: "current-target", name: "현재 → 목표 비교", group: "핵심 설명", relation: "대비", purpose: "같은 대상의 현재 상태와 목표를 나란히 비교합니다.", capacity: "3개 비교 행", required: ["대상", "현재", "목표", "목표 설명"], optional: ["열 이름", "아이콘", "색상 테마"], rules: ["한 행에는 같은 대상의 현재와 목표를 넣습니다.", "현재와 목표의 비교 기준을 일치시킵니다.", "3행을 넘으면 분할합니다."], renderer: "comparison", height: 1040 * 1024 / 1536, props: { width: 1040, section: "추진 방향 / 업무 개선", title: "현재의 과제와", emphasis: "목표 상태", subtitle: "정보 · 업무 · 성과를 같은 기준으로 비교", headers: ["개선 대상", "현재", "목표"], source: N, page: 3, takeawayLabel: "목표 상태", takeaway: "같은 정보와 기준으로 업무를 연결합니다", rows: [{ label: "정보", current: `부서별로 분산된
업무 자료와 이력`, result: "정보의 통합 관리", detail: "같은 기준으로 조회", artwork: "data" }, { label: "업무", current: `담당자마다 다른
처리 절차와 방식`, result: "표준 절차의 적용", detail: "업무 단계별 기준 정립", artwork: "system" }, { label: "성과", current: `수작업으로 집계하는
주요 업무 지표`, result: "성과 현황의 공유", detail: "지표 기반 개선점 확인", artwork: "performance" }] } },
  Z("delivery-process", "단계형 프로세스", "수행 방법", "순서", "활동과 산출물을 단계별로 연결합니다.", "3–4단계", ["단계명", "활동", "산출물"], ["화살표는 실행 순서를 뜻합니다.", "단계별 산출물은 한 줄로 작성합니다."], { ...I, kind: "process", title: "설계부터 검증까지", subtitle: "단계별 활동과 산출물을 연결한 수행 절차", takeaway: "각 단계의 결과를 다음 단계의 입력으로 연결합니다", items: [{ title: "분석", body: `현황과 요구사항
확인`, detail: "요구사항 목록", icon: "understanding" }, { title: "설계", body: `화면·데이터·절차
상세 설계`, detail: "상세 설계서", icon: "workflow-design" }, { title: "구현", body: `기능 구현과
단위 시험`, detail: "구현 결과", icon: "integration" }, { title: "검증", body: `요구사항별
충족 여부 확인`, detail: "검증 결과서", icon: "quality" }] }),
  Z("system-architecture", "시스템 구성도", "수행 방법", "구조", "계층별 구성요소와 명시적인 연결 관계를 보여줍니다.", "3계층 · 계층당 2–4노드", ["계층", "노드 ID·이름", "연결 출발·도착"], ["연결선은 입력한 관계만 표시합니다.", "연결 라벨은 10자 이내로 작성합니다.", "복잡한 연결은 상세 구성도로 분리합니다."], { ...I, kind: "architecture", title: "연결된 시스템 구조", takeaway: "업무 요청은 업무 데이터로, 실적 조회는 이력·증빙으로, 연계 관리는 연계 데이터로 이어집니다.", laneTakeawayHighlights: ["업무 데이터", "이력·증빙", "연계 데이터"], subtitle: "채널 · 서비스 · 데이터의 구성과 연결", layers: [{ label: "채널", nodes: [{ id: "portal", label: "업무 포털", icon: "legacy-server" }, { id: "mobile", label: "모바일 업무", icon: "people" }, { id: "admin", label: "관리자", icon: "staffing" }] }, { label: "서비스", nodes: [{ id: "hr", label: "인사 서비스", icon: "organization" }, { id: "performance", label: "성과 서비스", icon: "performance-target" }, { id: "link", label: "연계 서비스", icon: "integration" }] }, { label: "data", nodes: [{ id: "db", label: "업무 데이터", icon: "data-migration" }, { id: "history", label: "이력·증빙", icon: "deliverable" }, { id: "external", label: "연계 데이터", icon: "converted-data" }] }], connections: [{ from: "portal", to: "hr", label: "업무 요청" }, { from: "mobile", to: "performance", label: "실적 조회" }, { from: "admin", to: "link", label: "연계 관리" }, { from: "hr", to: "db", label: "저장·조회" }, { from: "performance", to: "history", label: "증빙 조회" }, { from: "link", to: "external", label: "데이터 교환" }] }),
  Z("delivery-schedule", "수행 일정 · 간트", "수행 관리", "시간", "작업 기간과 완료 지점을 시간축으로 표시합니다.", "4–8개월 · 1–5개 작업", ["월 목록", "작업명", "시작·종료 월"], ["시작·종료는 1부터 세는 월 번호입니다.", "막대 너비는 기간에 비례합니다.", "예시 일정은 실제 수행 기간이 아닙니다."], { ...I, kind: "timeline", title: "단계별 수행 일정", subtitle: "작업의 기간과 완료 지점을 함께 확인", months: ["1개월", "2개월", "3개월", "4개월", "5개월", "6개월"], tracks: [{ label: "분석", start: 1, end: 2, milestone: "분석 완료" }, { label: "설계", start: 2, end: 3, milestone: "설계 완료" }, { label: "구현", start: 3, end: 5, milestone: "개발 완료" }, { label: "검증", start: 5, end: 6, milestone: "검증 완료" }], takeaway: "단계별 완료 기준과 전체 일정을 함께 관리합니다" }),
  Z("scenic-cover", "풍경 표지", "시작·전환", "표지", "사업명과 제안의 핵심 방향을 전달합니다.", "제목 2줄", ["사업명", "제안 제목"], ["제목은 최대 두 줄을 권장합니다.", "제출용 로고·문서 구분은 사업 규정에 맞춰 추가합니다."], { ...I, kind: "cover", title: `사람과 성과를
하나의 흐름으로`, section: "JDC · 제안발표 디자인 예시", subtitle: "인사포털 및 성과관리 시스템 재구축", takeaway: "데이터 · 제도 · 성과의 연결" }),
  Z("chapter-divider", "장 구분", "시작·전환", "전환", "새로운 장의 주제와 범위를 안내합니다.", "주제 1개", ["장 번호", "장명", "설명"], ["긴 설명은 다음 본문 장표로 이동합니다."], { ...I, kind: "section", number: "01", title: "재구축 전략과 방법론", section: "첫 번째 코스", subtitle: "수행 단계와 주요 산출물을 연결합니다" }),
  Z("closing-promises", "핵심 제안 요약", "시작·전환", "요약", "앞에서 설명한 핵심 방향을 정리합니다.", "3개 메시지", ["메시지", "설명"], ["새로운 실적이나 검증하지 않은 약속을 추가하지 않습니다."], { ...I, kind: "closing", title: "제안의 핵심을 다시 확인합니다", items: [{ title: "데이터의 연결", body: "업무 이력을 같은 기준으로 관리", icon: "data-migration" }, { title: "제도의 구현", body: "기준을 화면과 절차에 반영", icon: "workflow-design" }, { title: "성과의 확인", body: "목표와 실행 결과를 연결", icon: "performance-target" }] }),
  Z("key-metrics", "핵심 수치", "핵심 설명", "지표", "핵심 달성률과 보조 수치 2개를 함께 제시합니다.", "핵심 1개 · 보조 2개", ["값·단위", "지표명", "산정 근거"], ["숫자는 근거 확인 후 사용합니다.", "예시의 숫자를 실제 제안 수치로 사용하지 않습니다.", "primaryMetricIndex로 핵심 지표를 선택합니다(기본 2). 0~100% 값에만 달성률 링을 표시합니다."], { ...I, kind: "metrics", primaryMetricIndex: 2, title: "수치로 확인하는 수행 현황", subtitle: "가상 데이터로 보는 지표 배치 예시", takeaway: "검토 대상과 반영 결과를 같은 기준으로 확인합니다", items: [{ title: "검토 요구사항", value: "120건", body: "검토 목록 기준 · 예시", icon: "deliverable" }, { title: "반영 완료", value: "96건", body: "설계 반영 기준 · 예시", icon: "verified" }, { title: "검증 완료", value: "80%", body: "96 ÷ 120 · 예시" }] }),
  Z("requirement-trace", "요구사항 추적표", "수행 방법", "추적", "원문·설계·검증을 같은 행에서 추적합니다.", "3개 행", ["원문 항목", "설계 반영", "검증 방법"], ["각 행에 실제 근거 식별자를 함께 기록합니다.", "설계와 검증이 동일한 요구사항을 다뤄야 합니다."], { ...I, kind: "trace", title: "원문에서 설계와 검증까지", headers: ["요구사항", "설계 반영", "검증 방법"], items: [{ title: "업무 기준", body: "화면·처리 절차에 반영", detail: "원문과 결과 대조" }, { title: "데이터 기준", body: "항목·코드 정의에 반영", detail: "정의와 데이터 비교" }, { title: "승인 기준", body: "승인 단계·역할 설정", detail: "시나리오별 처리 확인" }], takeaway: "반영 위치와 검증 결과를 같은 기록으로 관리합니다" }),
  Z("delivery-team", "수행조직", "수행 관리", "위계", "책임자와 수행팀의 역할을 설명합니다.", "책임자 1명 · 팀 3개", ["책임자", "팀명", "역할"], ["선은 보고 관계를 뜻합니다.", "인력 실명은 해당 제출 규정에 따라 표시합니다."], { ...I, kind: "organization", title: "역할과 책임이 명확한 수행조직", subtitle: "프로젝트 책임자를 중심으로 분야별 역할을 배분", items: [{ title: "프로젝트 책임자", body: "통합 관리 · 의사결정", icon: "staffing" }, { title: "업무·설계팀", body: `요구사항 분석
업무·화면 설계`, icon: "workflow-design" }, { title: "개발·연계팀", body: `기능 구현
데이터·시스템 연계`, icon: "integration" }, { title: "품질·검증팀", body: `시험 계획
결함·품질 관리`, icon: "quality" }] }),
  Z("risk-response", "위험과 대응", "수행 관리", "대응", "위험별 영향과 대응 방안을 연결합니다.", "3개 위험", ["위험", "영향", "대응"], ["위험과 대응을 일대일로 연결합니다.", "추정 영향은 확정 사실과 구분합니다."], { ...I, kind: "risk", title: "주요 위험과 대응 방향", headers: ["위험 요인", "예상 영향", "대응 방향"], items: [{ title: "원천 데이터 누락", body: "이관 결과 불일치", detail: "사전 진단·대사 검증" }, { title: "요구사항 변경", body: "범위·일정 변동", detail: "변경 영향 검토·승인" }, { title: "연계 지연", body: "통합 시험 지연", detail: "연계 일정 사전 협의" }] }),
  Z("project-evidence", "실적 · 근거 카드", "근거 제시", "근거", "프로젝트 경험과 적용 가능한 근거를 정리합니다.", "3개 사례", ["사업명", "수행 범위", "근거"], ["실제 수행 실적만 입력합니다.", "발주처 공개 범위와 블라인드 규정을 확인합니다."], { ...I, kind: "evidence", title: "경험과 근거를 함께 제시합니다", subtitle: "아래 사례는 레이아웃 검토를 위한 가상 예시", items: [{ title: "업무 포털 구축", body: "화면·승인 절차 설계", detail: "근거: 실적 증빙 ID", icon: "legacy-server" }, { title: "데이터 통합", body: "기준 정비·이관 검증", detail: "근거: 실적 증빙 ID", icon: "data-migration" }, { title: "성과관리 구축", body: "목표·실적 관리 구현", detail: "근거: 실적 증빙 ID", icon: "performance-target" }] }),
  Z("option-table", "대안 비교표", "근거 제시", "비교", "동일한 평가 기준으로 대안을 비교합니다.", "3개 기준 · 2개 대안", ["비교 기준", "대안 A", "대안 B"], ["같은 단위·범위로 비교합니다.", "선정 이유는 근거와 함께 설명합니다."], { ...I, kind: "table", title: "같은 기준으로 비교하는 대안", headers: ["비교 기준", "대안 A", "대안 B"], items: [{ title: "전환 방식", body: "단계별 전환", detail: "일괄 전환" }, { title: "운영 방식", body: "기존·신규 병행", detail: "전환 시점 일원화" }, { title: "확인 사항", body: "단계 간 연계 관리", detail: "전환 시점 집중 검증" }] }),
  Z("screen-explanation", "화면 · 기능 설명", "근거 제시", "주석", "화면 이미지와 주요 기능 설명을 함께 배치합니다.", "화면 1개 · 설명 3개", ["화면 이미지·대체 텍스트", "기능 설명"], ["현재 예시는 화면을 넣을 자리만 표시합니다.", "실제 화면 이미지를 입력하면 원본 비율을 유지합니다."], { ...I, kind: "screen", title: "화면과 기능을 함께 설명합니다", items: [{ title: "조회 조건", body: "사용자 기준에 맞춰 조회" }, { title: "처리 현황", body: "업무의 진행 상태 확인" }, { title: "상세 정보", body: "관련 이력과 증빙 확인" }] })
];
z.forEach((e, l) => {
  e.props.page = l + 1;
});
function he(e) {
  var n, c, u, d;
  const l = e.items.length;
  if (!e.title.trim() || e.title.length > 48) throw Error("제목은 1–48자로 작성하세요.");
  const s = { process: [3, 4], closing: [3, 3], metrics: [3, 3], trace: [3, 3], organization: [4, 4], risk: [3, 3], evidence: [3, 3], table: [3, 3], screen: [3, 3] }, o = e.kind === "process" && e.processVariant === "rows" ? [3, 6] : s[e.kind];
  if (o && (l < o[0] || l > o[1])) throw Error(`${e.kind}: ${o.join("–")}개 항목이 필요합니다.`);
  for (const g of e.items)
    if (!g.title.trim() || g.title.length > 20 || g.body.length > 60 || (((n = g.detail) == null ? void 0 : n.length) ?? 0) > 35) throw Error("항목의 제목·본문·설명 길이를 줄이거나 장표를 나누세요.");
  if (e.kind === "timeline") {
    const g = ((c = e.months) == null ? void 0 : c.length) ?? 0;
    if (g < 4 || g > 8 || !((u = e.tracks) != null && u.length) || e.tracks.length > 5) throw Error("일정은 4–8개월, 1–5개 작업을 지원합니다.");
    for (const m of e.tracks) {
      if (!Number.isInteger(m.start) || !Number.isInteger(m.end) || m.start < 1 || m.end > g || m.start > m.end) throw Error("시작·종료 월이 유효하지 않습니다.");
      if (!m.label.trim() || m.label.length > 8 || m.milestone.length > 5) throw Error("작업명은 8자, 완료 라벨은 5자 이내로 작성하세요.");
    }
  }
  if (e.kind === "architecture") {
    if (((d = e.layers) == null ? void 0 : d.length) !== 3 || e.layers.some((m) => m.nodes.length < 2 || m.nodes.length > 4)) throw Error("구성도는 3계층, 계층당 2–4노드를 지원합니다.");
    const g = e.layers.flatMap((m) => m.nodes.map((A) => A.id));
    if (new Set(g).size !== g.length) throw Error("노드 ID는 중복될 수 없습니다.");
    for (const m of e.connections ?? []) {
      const A = e.layers.findIndex((p) => p.nodes.some((k) => k.id === m.from)), v = e.layers.findIndex((p) => p.nodes.some((k) => k.id === m.to));
      if (A < 0 || v !== A + 1 || m.label.length > 10) throw Error("연결은 인접한 아래 계층으로 지정하고 라벨은 10자 이내로 작성하세요.");
    }
  }
}
z.push(...R);
z.push(...n0);
const P = z.find((e) => e.id === "requirement-trace");
P.name = "요구사항 추적 · 연결 흐름형";
P.optional.push("traceVariant: flow | cards", "행별 highlight", "고객사 강조색 emphasisColor");
P.rules.push("연결 흐름형이 기본이며 화살표는 같은 요구사항의 설계·검증만 연결합니다.", "강조는 고객사 테마의 글자색과 굵기로만 표시합니다.", "설명이 긴 경우 요구사항별 카드형을 선택합니다.");
const j = P.props.data;
j.section = "수행 방법 / 요구사항 추적";
j.subtitle = "요구사항별 반영 위치와 검증 방법을 연결합니다.";
j.traceVariant = "flow";
j.takeawayHighlight = "같은 기록";
j.items.forEach((e, l) => {
  e.highlight = ["원문과 결과", "정의와 데이터", "시나리오별"][l], e.icon = ["deliverable", "data-migration", "people"][l];
});
z.push({ ...P, id: "requirement-trace-cards", name: "요구사항 추적 · 요구사항별 카드형", props: { ...P.props, data: { ...j, traceVariant: "cards" } } });
const te = z.find((e) => e.id === "option-table");
z.find((e) => e.id === "strategy-sources").props.data.criteriaLabel = "전략에 연결할 기준";
const ae = z.find((e) => e.id === "risk-response");
ae.name = "위험과 대응 · 연결형";
ae.optional.push("열 이름(headers)", "요약 강조 구절(takeawayHighlight)");
Object.assign(ae.props.data, {
  section: "수행 관리 / 위험 대응",
  subtitle: "위험 요인과 예상 영향을 확인하고, 대응 기준으로 연결합니다.",
  takeaway: "위험을 사전에 확인하고, 대응 기준을 함께 관리합니다.",
  takeawayHighlight: "사전에 확인"
});
te.name = "대안 비교표 · 양쪽 패널형";
te.optional.push("대안별 부제(optionSubtitles)", "대안별 도식(optionVisuals)", "요약 강조 구절(takeawayHighlight)");
Object.assign(te.props.data, {
  section: "근거 제시 / 대안 비교",
  subtitle: "전환 방식과 운영 조건을 같은 기준에서 나란히 검토합니다.",
  optionSubtitles: ["단계별 전환", "일괄 전환"],
  optionVisuals: ["sequence", "single"],
  takeaway: "대안의 우열보다 사업 조건과 전환 기준을 먼저 확인합니다.",
  takeawayHighlight: "사업 조건과 전환 기준"
});
for (const e of z.filter((l) => {
  var s;
  return ((s = l.props.data) == null ? void 0 : s.kind) === "process";
}))
  e.rules.push(...ue), e.optional.push("processVariant: cards | rows", "continuesProcess: 前 장 절차 이어짐");
z.push(Z("process-rows", "단계형 프로세스 · 가로 행형", "수행 방법", "순서", "실행 내용과 산출물을 가로로 비교하고 단계는 위에서 아래로 읽습니다.", "3–6단계", ["단계명", "실행 내용", "산출물"], ue, { ...I, kind: "process", processVariant: "rows", section: "02 / 전략 정리", title: "전략 초안을 통합하고 실행 내용을 보존합니다", subtitle: "고객 과제 → 접근 방식 → 실행 과제 → 고객 효익을 연결합니다.", highlightLast: !0, takeaway: "전략 수를 맞추기 위해 서로 다른 실행을 억지로 합치지 않습니다.", takeawayHighlight: "서로 다른 실행", items: [{ title: "묶음별 생성", body: `관련 자료를 분할해
전략 초안 작성`, detail: "실행·산출물·검증", icon: "strategy" }, { title: "중복 통합", body: `유사 전략을 묶고
고유 실행은 보존`, detail: "통합 전략과 원본", icon: "integration" }, { title: "핵심 정리", body: `고객 변화 중심으로
상위 전략 구성`, detail: "핵심 메시지·세부안", icon: "performance-target" }, { title: "담당자 검토", body: `실행 가능성과
근거·연결 확인`, detail: "테마에 전달할 전략", icon: "verified" }] }));
z.filter((e) => !["detailed-cover", "detailed-section"].includes(e.id));
const d0 = ["src"], u0 = { class: "pl-heading" }, h0 = { "data-fit": "" }, g0 = { "data-fit": "" }, m0 = {
  class: "pl-subtitle",
  "data-fit": ""
}, y0 = { class: "pl-cover-emphasis" }, p0 = { class: "pl-body" }, b0 = {
  key: 0,
  class: "pl-chapter",
  "data-fit": ""
}, v0 = {
  key: 1,
  class: "pl-cover-line"
}, f0 = {
  key: 5,
  class: "pl-architecture"
}, k0 = {
  class: "pl-edges",
  viewBox: "0 0 944 376",
  role: "img",
  "aria-label": "계층 간 연결 관계"
}, w0 = ["id"], x0 = ["d", "marker-end"], $0 = ["x", "y"], A0 = ["data-level"], L0 = { "data-fit": "" }, H0 = { "data-fit": "" }, V0 = {
  key: 11,
  class: "pl-screen"
}, Z0 = ["src", "alt"], I0 = {
  key: 1,
  class: "pl-screen-placeholder"
}, M0 = { "data-fit": "" }, B0 = { "data-fit": "" }, C0 = {
  key: 12,
  class: "pl-cards"
}, E0 = { class: "pl-index" }, S0 = { "data-fit": "" }, z0 = { "data-fit": "" }, q0 = {
  key: 1,
  class: "pl-evidence",
  "data-fit": ""
}, D0 = {
  key: 1,
  class: "pl-takeaway",
  "data-fit": ""
}, F0 = { class: "pl-takeaway-emphasis" }, _0 = { class: "pl-footer" }, P0 = /* @__PURE__ */ M({
  __name: "ProposalDiagramSlide",
  props: {
    data: {},
    iconStyle: { default: "illustrated" },
    background: { default: "/presentation/illustrated/jeju-background.png" },
    source: { default: N },
    page: { default: 1 }
  },
  setup(e) {
    const l = e;
    ve(ee, x(() => l.iconStyle)), fe(() => he(l.data));
    const s = ke().replace(/[^a-zA-Z0-9_-]/g, "") + "arrow", o = x(() => ["cover", "section"].includes(l.data.kind)), n = x(() => {
      const { kind: v, subtitle: p, subtitleHighlight: k } = l.data;
      if (v !== "cover" || !k) return null;
      const h = p.indexOf(k);
      return h < 0 ? null : { before: p.slice(0, h), phrase: k, after: p.slice(h + k.length) };
    }), c = x(() => {
      const { kind: v, takeaway: p, laneTakeawayHighlights: k } = l.data, h = v === "architecture" ? k : void 0;
      if (!h) return [];
      const w = [], E = h.map((L, O) => ({
        text: L,
        column: O,
        start: p.indexOf(L)
      })).filter((L) => L.text && L.start >= 0).sort((L, O) => L.start - O.start);
      let D = 0;
      for (const L of E)
        L.start < D || (w.push({ text: p.slice(D, L.start) }, L), D = L.start + L.text.length);
      return w.length && w.push({ text: p.slice(D) }), w;
    }), u = ["var(--ds-blue600)", "var(--ds-teal700,#007580)", "var(--ds-navy700)", "var(--ds-orange700)"], d = x(() => {
      var p, k, h, w, E;
      const v = /* @__PURE__ */ new Map();
      (k = (p = l.data.layers) == null ? void 0 : p[1]) == null || k.nodes.forEach((D, L) => v.set(D.id, L));
      for (const D of ((w = (h = l.data.layers) == null ? void 0 : h[2]) == null ? void 0 : w.nodes) ?? []) {
        const L = (l.data.connections ?? []).filter((K) => K.to === D.id), O = new Set(L.map((K) => v.get(K.from))), ie = v.get((E = L[0]) == null ? void 0 : E.from);
        O.size === 1 && ie !== void 0 && v.set(D.id, ie);
      }
      return v;
    }), g = { "legacy-server": "server", people: "users", staffing: "user", organization: "network", "performance-target": "target", integration: "link", "data-migration": "database", deliverable: "file-text", "converted-data": "database" }, m = (v) => {
      const p = l.data.layers.findIndex((h) => h.nodes.some((w) => w.id === v)), k = l.data.layers[p].nodes;
      return { x: 148 + (k.findIndex((h) => h.id === v) + 0.5) * 796 / k.length, y: p * 132 };
    }, A = x(() => (l.data.connections ?? []).map((v) => ({ ...v, a: m(v.from), b: m(v.to), lane: d.value.get(v.from) ?? d.value.get(v.to) ?? 0 })));
    return (v, p) => {
      var k;
      return a(), i("section", {
        class: V(["pl-slide", ["pl-kind-" + e.data.kind, { "pl-dark": o.value }]]),
        style: $(q(Ze))
      }, [
        e.background ? (a(), i("img", {
          key: 0,
          class: "pl-background",
          src: q(U)(e.background),
          alt: ""
        }, null, 8, d0)) : b("", !0),
        p[3] || (p[3] = t("div", { class: "pl-wash" }, null, -1)),
        t("header", u0, [
          t("p", h0, r(e.data.section), 1),
          t("h1", g0, r(e.data.title), 1),
          t("p", m0, [
            n.value ? (a(), i(y, { key: 0 }, [
              S(r(n.value.before), 1),
              t("strong", y0, r(n.value.phrase), 1),
              S(r(n.value.after), 1)
            ], 64)) : (a(), i(y, { key: 1 }, [
              S(r(e.data.subtitle), 1)
            ], 64))
          ])
        ]),
        t("main", p0, [
          e.data.kind === "section" ? (a(), i("div", b0, r(e.data.number), 1)) : e.data.kind === "cover" ? (a(), i("div", v0, r(e.data.takeaway), 1)) : e.data.kind === "process" ? (a(), H(Gt, {
            key: 2,
            items: e.data.items,
            variant: e.data.processVariant,
            "highlight-last": e.data.highlightLast,
            "output-label": e.data.outputLabel,
            "reverse-label": e.data.reverseLabel
          }, null, 8, ["items", "variant", "highlight-last", "output-label", "reverse-label"])) : e.data.kind === "evidence" ? (a(), H(ta, {
            key: 3,
            items: e.data.items,
            "criteria-label": e.data.criteriaLabel
          }, null, 8, ["items", "criteria-label"])) : e.data.kind === "metrics" ? (a(), H(ma, {
            key: 4,
            items: e.data.items,
            "primary-index": e.data.primaryMetricIndex,
            accent: e.data.emphasisColor
          }, null, 8, ["items", "primary-index", "accent"])) : e.data.kind === "architecture" ? (a(), i("div", f0, [
            (a(), i("svg", k0, [
              t("defs", null, [
                (a(), i(y, null, f(u, (h, w) => t("marker", {
                  key: w,
                  id: s + w,
                  style: $({ color: h }),
                  viewBox: "0 0 10 10",
                  refX: "8",
                  refY: "5",
                  markerWidth: "6",
                  markerHeight: "6",
                  orient: "auto-start-reverse"
                }, [...p[0] || (p[0] = [
                  t("path", {
                    d: "M0 0 L10 5 L0 10Z",
                    fill: "currentColor"
                  }, null, -1)
                ])], 12, w0)), 64))
              ]),
              (a(!0), i(y, null, f(A.value, (h, w) => (a(), i("g", { key: w }, [
                t("path", {
                  d: `M ${h.a.x} ${h.a.y + 80} L ${h.a.x} ${h.a.y + 106} L ${h.b.x} ${h.a.y + 106} L ${h.b.x} ${h.b.y - 4}`,
                  style: $({ stroke: u[h.lane] }),
                  "marker-end": `url(#${s}${h.lane})`
                }, null, 12, x0),
                t("text", {
                  x: (h.a.x + h.b.x) / 2 + 8,
                  y: h.a.y + 111
                }, r(h.label), 9, $0)
              ]))), 128))
            ])),
            (a(!0), i(y, null, f(e.data.layers, (h, w) => (a(), i("div", {
              key: h.label,
              class: "pl-layer",
              "data-level": w
            }, [
              t("h2", L0, r(h.label === "data" ? "데이터" : h.label), 1),
              t("div", {
                class: "pl-nodes",
                style: $({ gridTemplateColumns: `repeat(${h.nodes.length},1fr)` })
              }, [
                (a(!0), i(y, null, f(h.nodes, (E) => (a(), i("article", {
                  key: E.id,
                  style: $({ "--lane": u[d.value.get(E.id) ?? -1] || "var(--ds-navy700)" })
                }, [
                  E.lineIcon || E.icon ? (a(), H(He, {
                    key: 0,
                    name: E.lineIcon || g[E.icon || ""] || "layers",
                    size: 40,
                    "stroke-width": 1.7,
                    "aria-hidden": "true"
                  }, null, 8, ["name"])) : b("", !0),
                  t("strong", H0, r(E.label), 1)
                ], 4))), 128))
              ], 4)
            ], 8, A0))), 128))
          ])) : e.data.kind === "timeline" ? (a(), H($a, {
            key: 6,
            months: e.data.months,
            tracks: e.data.tracks
          }, null, 8, ["months", "tracks"])) : e.data.kind === "organization" ? (a(), H(za, {
            key: 7,
            items: e.data.items
          }, null, 8, ["items"])) : e.data.kind === "trace" ? (a(), H(vt, {
            key: 8,
            rows: e.data.items,
            headers: e.data.headers,
            variant: e.data.traceVariant,
            accent: e.data.emphasisColor
          }, null, 8, ["rows", "headers", "variant", "accent"])) : e.data.kind === "table" ? (a(), H(Ka, {
            key: 9,
            items: e.data.items,
            headers: e.data.headers,
            subtitles: e.data.optionSubtitles,
            visuals: e.data.optionVisuals
          }, null, 8, ["items", "headers", "subtitles", "visuals"])) : e.data.kind === "risk" ? (a(), H(s0, {
            key: 10,
            items: e.data.items,
            headers: e.data.headers
          }, null, 8, ["items", "headers"])) : e.data.kind === "screen" ? (a(), i("div", V0, [
            t("figure", null, [
              e.data.screen ? (a(), i("img", {
                key: 0,
                src: q(U)(e.data.screen.src),
                alt: e.data.screen.alt
              }, null, 8, Z0)) : (a(), i("div", I0, [
                F(C, {
                  name: "legacy-server",
                  size: 140
                }),
                p[1] || (p[1] = t("strong", null, "화면 이미지 영역", -1)),
                p[2] || (p[2] = t("p", null, "실제 서비스 화면으로 교체", -1))
              ])),
              t("figcaption", null, r(((k = e.data.screen) == null ? void 0 : k.alt) || "화면 미등록 · 설명용 자리 표시"), 1)
            ]),
            t("ol", null, [
              (a(!0), i(y, null, f(e.data.items, (h, w) => (a(), i("li", { key: w }, [
                t("span", null, r(String(w + 1).padStart(2, "0")), 1),
                t("h2", M0, r(h.title), 1),
                t("p", B0, r(h.body), 1)
              ]))), 128))
            ])
          ])) : (a(), i("div", C0, [
            (a(!0), i(y, null, f(e.data.items, (h, w) => (a(), i("article", {
              key: w,
              class: "pl-panel"
            }, [
              t("span", E0, r(String(w + 1).padStart(2, "0")), 1),
              h.icon ? (a(), H(C, {
                key: 0,
                name: h.icon,
                size: 132
              }, null, 8, ["name"])) : b("", !0),
              t("h2", S0, r(h.title), 1),
              t("p", z0, r(h.body), 1),
              h.detail ? (a(), i("strong", q0, r(h.detail), 1)) : b("", !0)
            ]))), 128))
          ]))
        ]),
        e.data.takeaway && !o.value ? (a(), i("aside", D0, [
          c.value.length ? (a(!0), i(y, { key: 0 }, f(c.value, (h, w) => (a(), i(y, { key: w }, [
            h.column !== void 0 ? (a(), i("strong", {
              key: 0,
              style: $({ color: u[h.column] })
            }, r(h.text), 5)) : (a(), i(y, { key: 1 }, [
              S(r(h.text), 1)
            ], 64))
          ], 64))), 128)) : e.data.takeawayHighlight && e.data.takeaway.includes(e.data.takeawayHighlight) ? (a(), i(y, { key: 1 }, [
            S(r(e.data.takeaway.slice(0, e.data.takeaway.indexOf(e.data.takeawayHighlight))), 1),
            t("strong", F0, r(e.data.takeawayHighlight), 1),
            S(r(e.data.takeaway.slice(e.data.takeaway.indexOf(e.data.takeawayHighlight) + e.data.takeawayHighlight.length)), 1)
          ], 64)) : (a(), i(y, { key: 2 }, [
            S(r(e.data.takeaway), 1)
          ], 64))
        ])) : b("", !0),
        t("footer", _0, [
          t("span", null, r(e.source), 1),
          t("span", null, r(String(e.page).padStart(2, "0")), 1)
        ])
      ], 6);
    };
  }
}), j0 = /* @__PURE__ */ B(P0, [["__scopeId", "data-v-af2231ce"]]), O0 = 1, _ = G.canvas, T0 = ce.map((e) => e.id), le = { path: "source", label: "출처 문구", type: "text", maxLength: 130, hint: "근거 문서·페이지. 비우면 출처를 표시하지 않습니다." }, se = (e = 30) => [
  { path: "data.section", label: "상단 라벨", type: "text", maxLength: e, hint: "장 번호 / 장 이름" },
  { path: "data.title", label: "제목", type: "text", required: !0, maxLength: 48 },
  { path: "data.subtitle", label: "부제", type: "text", maxLength: 60 },
  { path: "data.takeaway", label: "하단 핵심 문장", type: "text", maxLength: 45 },
  { path: "data.takeawayHighlight", label: "하단 강조 구절", type: "text", maxLength: 20, hint: "하단 핵심 문장 안에 그대로 들어 있는 구절" }
], R0 = (e) => {
  const l = z.find((s) => s.id === e);
  if (!l) throw new Error(`레이아웃을 찾을 수 없습니다: ${e}`);
  return l;
}, Y = (e, l) => {
  const s = R0(e);
  return { id: s.id, name: s.name, group: s.group, relation: s.relation, purpose: s.purpose, capacity: s.capacity, rules: s.rules, renderer: s.renderer, canvas: { width: _.width, height: s.height }, schemaVersion: O0, fields: l, sample: structuredClone(s.props) };
}, N0 = [
  Y("section-cover", [
    { path: "chapters", label: "발표 목차", type: "list", required: !0, minItems: 3, maxItems: 7, hint: "덱의 대목차에서 자동으로 채웁니다.", fields: [{ path: "id", label: "장 ID", type: "text", required: !0 }, { path: "title", label: "장 이름", type: "text", required: !0, maxLength: 14 }] },
    { path: "activeId", label: "현재 장 ID", type: "text", required: !0 },
    { path: "title", label: "핵심 문구", type: "text", required: !0, maxLength: 24 },
    { path: "emphasis", label: "강조 문구", type: "text", maxLength: 24 },
    { path: "description", label: "설명", type: "textarea", maxLength: 70, hint: "두 줄 이내" },
    { path: "footer", label: "하단 문구", type: "text", maxLength: 40 }
  ]),
  Y("parallel-message-cards", [
    ...se(),
    { path: "data.criteriaLabel", label: "하단 라벨", type: "text", maxLength: 10 },
    { path: "data.items", label: "항목", type: "list", required: !0, minItems: 3, maxItems: 3, fields: [
      { path: "title", label: "항목명", type: "text", required: !0, maxLength: 20 },
      { path: "category", label: "분류", type: "text", maxLength: 10 },
      { path: "detail", label: "핵심 문구", type: "textarea", required: !0, maxLength: 35, hint: "두 줄 이내" },
      { path: "body", label: "설명", type: "textarea", required: !0, maxLength: 60 },
      { path: "outcome", label: "하단 문구", type: "text", maxLength: 20 },
      { path: "icon", label: "아이콘", type: "icon" }
    ] },
    le
  ]),
  Y("focus-process", [
    ...se(),
    { path: "data.highlightLast", label: "마지막 단계 강조", type: "boolean", hint: "마지막 단계가 실제 최종 판단·승인일 때만" },
    { path: "data.items", label: "단계", type: "list", required: !0, minItems: 3, maxItems: 4, fields: [
      { path: "title", label: "단계명", type: "text", required: !0, maxLength: 20 },
      { path: "stageLabel", label: "단계 라벨", type: "text", maxLength: 12 },
      { path: "body", label: "본문", type: "textarea", required: !0, maxLength: 60 },
      { path: "detail", label: "산출물", type: "text", maxLength: 35 },
      { path: "icon", label: "아이콘", type: "icon" }
    ] },
    le
  ])
], U0 = {
  "parallel-message-cards": { data: { kind: "evidence" } },
  "focus-process": { data: { kind: "process", processVariant: "cards" } }
};
function ge(e, l) {
  const s = JSON.parse(JSON.stringify(l)), o = U0[e];
  return o != null && o.data && (s.data = { ...s.data ?? {}, ...o.data }), s;
}
const me = Object.fromEntries(N0.map((e) => [e.id, e]));
function G0(e, l) {
  return l.split(".").reduce((s, o) => s == null ? void 0 : s[o], e);
}
function ye(e, l, s, o) {
  for (const n of e) {
    const c = G0(l, n.path), u = s + n.label;
    if (n.type === "list") {
      const d = Array.isArray(c) ? c : [];
      if (n.required && !d.length) {
        o.push(`${u}이(가) 필요합니다.`);
        continue;
      }
      (n.minItems != null && d.length < n.minItems || n.maxItems != null && d.length > n.maxItems) && o.push(`${u}은(는) ${n.minItems ?? 0}–${n.maxItems ?? "∞"}개가 필요합니다. 현재 ${d.length}개`), d.forEach((g, m) => ye(n.fields ?? [], g, `${u} ${m + 1} · `, o));
      continue;
    }
    if (n.type === "boolean") {
      c != null && typeof c != "boolean" && o.push(`${u} 값이 올바르지 않습니다.`);
      continue;
    }
    if (c == null || c === "") {
      n.required && o.push(`${u}을(를) 입력하세요.`);
      continue;
    }
    if (typeof c != "string") {
      o.push(`${u}은(는) 문자열이어야 합니다.`);
      continue;
    }
    n.required && !c.trim() && o.push(`${u}을(를) 입력하세요.`), n.maxLength && c.length > n.maxLength && o.push(`${u}은(는) ${n.maxLength}자 이내로 작성하세요. 현재 ${c.length}자`), n.type === "icon" && !T0.includes(c) && o.push(`${u}: 등록되지 않은 아이콘입니다 (${c}).`);
  }
}
function K0(e, l) {
  var n;
  const s = me[e];
  if (!s) return [`지원하지 않는 레이아웃입니다: ${e}`];
  if (!l || typeof l != "object") return ["장표 내용이 없습니다."];
  const o = [];
  if (l = ge(e, l), ye(s.fields, l, "", o), s.id === "section-cover") {
    const c = l;
    (n = c.chapters) != null && n.length && !c.chapters.some((u) => u.id === c.activeId) && o.push("현재 장 ID가 발표 목차에 없습니다.");
  }
  if (s.renderer === "diagram" && !o.length)
    try {
      he(l.data);
    } catch (c) {
      o.push(c instanceof Error ? c.message : String(c));
    }
  return o;
}
const X0 = ["data-layout"], Y0 = {
  key: 1,
  class: "presentation-slide-issues",
  role: "alert"
}, J0 = /* @__PURE__ */ M({
  __name: "PresentationSlide",
  props: {
    layoutId: {},
    content: {},
    accentColor: {},
    page: { default: 1 },
    interactive: { type: Boolean, default: !0 }
  },
  setup(e) {
    const l = e, s = x(() => /^#[0-9a-f]{6}$/i.test(l.accentColor ?? "") ? l.accentColor : void 0), o = { "section-cover": Oe, diagram: j0 }, n = x(() => me[l.layoutId]), c = x(() => K0(l.layoutId, l.content)), u = x(() => n.value ? o[n.value.renderer] : void 0), d = x(() => {
      var p;
      return ((p = n.value) == null ? void 0 : p.canvas.height) ?? _.height;
    }), g = x(() => {
      var k;
      const p = ge(l.layoutId, l.content);
      return ((k = n.value) == null ? void 0 : k.renderer) === "diagram" ? { source: "", ...p, page: l.page } : { ...p, height: d.value };
    }), m = J(), A = J(_.width);
    let v;
    return we(() => {
      v = new ResizeObserver(([p]) => {
        A.value = p.contentRect.width;
      }), m.value && v.observe(m.value);
    }), xe(() => v == null ? void 0 : v.disconnect()), (p, k) => (a(), i("div", {
      ref_key: "host",
      ref: m,
      class: "presentation-slide",
      style: $({ "--presentation-accent": s.value, "--cover-gradient-mid": s.value ? "color-mix(in srgb, var(--presentation-accent), #031328 55%)" : void 0, aspectRatio: `${q(_).width}/${d.value}` }),
      "data-layout": e.layoutId
    }, [
      u.value && !c.value.length ? (a(), i("div", {
        key: 0,
        class: V(["presentation-slide-canvas", { "is-static": !e.interactive }]),
        style: $({ width: `${q(_).width}px`, height: `${d.value}px`, transform: `scale(${A.value / q(_).width})` })
      }, [
        (a(), H($e(u.value), Ae(Le(g.value)), null, 16))
      ], 6)) : (a(), i("div", Y0, [
        k[0] || (k[0] = t("strong", null, "장표를 그릴 수 없습니다", -1)),
        t("ul", null, [
          (a(!0), i(y, null, f(c.value, (h) => (a(), i("li", { key: h }, r(h), 1))), 128))
        ])
      ]))
    ], 12, X0));
  }
}), ti = /* @__PURE__ */ B(J0, [["__scopeId", "data-v-fe569719"]]);
export {
  O0 as PRESENTATION_SCHEMA_VERSION,
  ti as PresentationSlide,
  K0 as checkSlideContent,
  G0 as getPath,
  ce as illustrationAssets,
  T0 as illustrationIds,
  U as presentationAssetUrl,
  _ as presentationCanvas,
  me as presentationLayoutById,
  N0 as presentationLayouts,
  ei as setPresentationAssetBase,
  ge as withFixedContent
};
