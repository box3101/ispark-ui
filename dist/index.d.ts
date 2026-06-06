import { AllowedComponentProps } from 'vue';
import { ComponentCustomProps } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DateValue } from '@internationalized/date';
import { DefineComponent } from 'vue';
import { PublicProps } from 'vue';
import { Ref } from 'vue';
import { RendererElement } from 'vue';
import { RendererNode } from 'vue';
import { ShallowUnwrapRef } from 'vue';
import { VNode } from 'vue';
import { VNodeProps } from 'vue';

declare const __VLS_component: DefineComponent<Props, {
focus: () => void | undefined;
blur: () => void | undefined;
el: Ref<HTMLButtonElement | HTMLAnchorElement | null, HTMLButtonElement | HTMLAnchorElement | null>;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
click: (event: MouseEvent) => any;
}, string, PublicProps, Readonly<Props> & Readonly<{
onClick?: ((event: MouseEvent) => any) | undefined;
}>, {
variant: "primary" | "secondary" | "outline" | "ghost" | "danger";
size: Size;
shape: Shape;
as: "button" | "a";
type: "button" | "submit";
disabled: boolean;
loading: boolean;
fullWidth: boolean;
iconOnly: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
rootEl: unknown;
}, any>;

declare const __VLS_component_10: DefineComponent<Props_15, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
select: (value: string) => any;
"update:open": (value: boolean) => any;
}, string, PublicProps, Readonly<Props_15> & Readonly<{
onSelect?: ((value: string) => any) | undefined;
"onUpdate:open"?: ((value: boolean) => any) | undefined;
}>, {
title: string;
open: boolean;
side: "top" | "bottom" | "left" | "right";
sideOffset: number;
align: "start" | "center" | "end";
collisionPadding: number;
contentClass: string;
openOnHover: boolean;
hoverCloseDelay: number;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

declare const __VLS_component_11: DefineComponent<Props_19, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string | string[] | undefined) => any;
change: (value: string | string[] | undefined) => any;
}, string, PublicProps, Readonly<Props_19> & Readonly<{
"onUpdate:modelValue"?: ((value: string | string[] | undefined) => any) | undefined;
onChange?: ((value: string | string[] | undefined) => any) | undefined;
}>, {
size: "sm" | "md" | "lg";
type: "single" | "multiple";
disabled: boolean;
modelValue: string | string[];
defaultValue: string | string[];
items: AccordionItemDef[];
collapsible: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

declare const __VLS_component_12: DefineComponent<Props_20, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:open": (value: boolean) => any;
}, string, PublicProps, Readonly<Props_20> & Readonly<{
"onUpdate:open"?: ((value: boolean) => any) | undefined;
}>, {
title: string;
overlay: boolean;
position: "right" | "left";
open: boolean;
width: string;
showFullscreen: boolean;
closeOnOverlayClick: boolean;
closeOnEscape: boolean;
maxWidth: string;
minWidth: string;
resizable: boolean;
showResize: boolean;
confirmBeforeClose: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
drawerRef: HTMLElement;
}, any>;

declare const __VLS_component_2: DefineComponent<Props_2, {
focus: () => void | undefined;
blur: () => void | undefined;
el: Ref<HTMLInputElement | undefined, HTMLInputElement | undefined>;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
search: (value: string | number) => any;
"update:modelValue": (value: string | number) => any;
enter: (value: string | number) => any;
clear: () => any;
}, string, PublicProps, Readonly<Props_2> & Readonly<{
onSearch?: ((value: string | number) => any) | undefined;
"onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
onEnter?: ((value: string | number) => any) | undefined;
onClear?: (() => any) | undefined;
}>, {
size: InputSize;
shape: "rounded" | "pill";
type: "text" | "search" | "password" | "email" | "tel" | "url";
disabled: boolean;
label: string;
desc: string;
modelValue: string | number;
labelHidden: boolean;
error: boolean;
errorMessage: string;
placeholder: string;
readonly: boolean;
required: boolean;
autocomplete: string;
name: string;
id: string;
maxLength: number;
min: string | number;
max: string | number;
step: string | number;
numberOnly: boolean;
allowDecimal: boolean;
allowNegative: boolean;
decimals: number;
useComma: boolean;
clearable: boolean;
showPasswordToggle: boolean;
searchAriaLabel: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
inputRef: HTMLInputElement;
}, any>;

declare const __VLS_component_3: DefineComponent<Props_4, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:open": (value: boolean) => any;
close: () => any;
}, string, PublicProps, Readonly<Props_4> & Readonly<{
"onUpdate:open"?: ((value: boolean) => any) | undefined;
onClose?: (() => any) | undefined;
}>, {
size: "sm" | "md" | "lg" | "xl";
title: string;
open: boolean;
showClose: boolean;
showOverlay: boolean;
showFullscreen: boolean;
closeOnOverlayClick: boolean;
closeOnEscape: boolean;
customClass: string;
maxWidth: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

declare const __VLS_component_4: DefineComponent<Props_5, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<Props_5> & Readonly<{}>, {
title: string;
icon: string;
description: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

declare const __VLS_component_5: DefineComponent<Props_6, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<Props_6> & Readonly<{}>, {
variant: BadgeVariant;
size: BadgeSize;
iconOnly: boolean;
colorHex: string;
bgAlpha: number;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLSpanElement>;

declare const __VLS_component_6: DefineComponent<Props_7, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<Props_7> & Readonly<{}>, {
ariaLabel: string;
wrap: boolean;
gap: number | string;
direction: "row" | "column";
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

declare const __VLS_component_7: DefineComponent<Props_10, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: boolean) => any;
change: (value: boolean) => any;
}, string, PublicProps, Readonly<Props_10> & Readonly<{
"onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
onChange?: ((value: boolean) => any) | undefined;
}>, {
disabled: boolean;
label: string;
labelHidden: boolean;
id: string;
indeterminate: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
inputRef: HTMLInputElement;
}, HTMLLabelElement>;

declare const __VLS_component_8: DefineComponent<Props_11, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: RadioValue) => any;
change: (value: RadioValue) => any;
}, string, PublicProps, Readonly<Props_11> & Readonly<{
"onUpdate:modelValue"?: ((value: RadioValue) => any) | undefined;
onChange?: ((value: RadioValue) => any) | undefined;
}>, {
disabled: boolean;
label: string;
labelHidden: boolean;
name: string;
id: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLLabelElement>;

declare const __VLS_component_9: DefineComponent<Props_13, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<Props_13> & Readonly<{}>, {
content: string;
side: "top" | "right" | "bottom" | "left";
sideOffset: number;
align: "start" | "center" | "end";
contentClass: string;
fontSize: string;
delayDuration: number;
showArrow: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

declare type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};

declare type __VLS_Props = {
    /** Lucide 아이콘 이름 (kebab-case) */
    name: string;
    /** 토큰('xs'|'sm'|'md'|'lg') 또는 숫자(px) */
    size?: string | number;
    /** 색상 프리셋 */
    color?: IconColor;
    /** Lucide 선 두께 (1~3) */
    strokeWidth?: number;
};

declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        'icon-left'?(_: {}): any;
        default?(_: {}): any;
        'icon-right'?(_: {}): any;
    };
    refs: {
        rootEl: unknown;
    };
    rootEl: any;
};

declare function __VLS_template_10(): {
    attrs: Partial<{}>;
    slots: {
        trigger?(_: {}): any;
        trigger?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};

declare function __VLS_template_11(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
        default?(_: {}): any;
        header?(_: {
            item: AccordionItemDef;
        }): any;
        header?(_: {
            item: AccordionItemDef;
        }): any;
        content?(_: {
            item: AccordionItemDef;
        }): any;
        content?(_: {
            item: AccordionItemDef;
        }): any;
    };
    refs: {};
    rootEl: any;
};

declare function __VLS_template_12(): {
    attrs: Partial<{}>;
    slots: {
        header?(_: {}): any;
        default?(_: {}): any;
        footer?(_: {}): any;
    };
    refs: {
        drawerRef: HTMLElement;
    };
    rootEl: any;
};

declare function __VLS_template_2(): {
    attrs: Partial<{}>;
    slots: {
        label?(_: {}): any;
        'icon-left'?(_: {}): any;
        'icon-right'?(_: {}): any;
    };
    refs: {
        inputRef: HTMLInputElement;
    };
    rootEl: any;
};

declare function __VLS_template_3(): {
    attrs: Partial<{}>;
    slots: {
        header?(_: {}): any;
        default?(_: {}): any;
        footer?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};

declare function __VLS_template_4(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};

declare function __VLS_template_5(): {
    attrs: Partial<{}>;
    slots: {
        'icon-left'?(_: {}): any;
        default?(_: {}): any;
        'icon-right'?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLSpanElement;
};

declare function __VLS_template_6(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};

declare function __VLS_template_7(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {
        inputRef: HTMLInputElement;
    };
    rootEl: HTMLLabelElement;
};

declare function __VLS_template_8(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLLabelElement;
};

declare function __VLS_template_9(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
        content?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};

declare type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;

declare type __VLS_TemplateResult_10 = ReturnType<typeof __VLS_template_10>;

declare type __VLS_TemplateResult_11 = ReturnType<typeof __VLS_template_11>;

declare type __VLS_TemplateResult_12 = ReturnType<typeof __VLS_template_12>;

declare type __VLS_TemplateResult_2 = ReturnType<typeof __VLS_template_2>;

declare type __VLS_TemplateResult_3 = ReturnType<typeof __VLS_template_3>;

declare type __VLS_TemplateResult_4 = ReturnType<typeof __VLS_template_4>;

declare type __VLS_TemplateResult_5 = ReturnType<typeof __VLS_template_5>;

declare type __VLS_TemplateResult_6 = ReturnType<typeof __VLS_template_6>;

declare type __VLS_TemplateResult_7 = ReturnType<typeof __VLS_template_7>;

declare type __VLS_TemplateResult_8 = ReturnType<typeof __VLS_template_8>;

declare type __VLS_TemplateResult_9 = ReturnType<typeof __VLS_template_9>;

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_10<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_11<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_12<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_2<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_3<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_4<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_5<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_6<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_7<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_8<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type __VLS_WithTemplateSlots_9<T, S> = T & {
    new (): {
        $slots: S;
    };
};

export declare interface AccordionItemDef {
    /** 고유 식별자 — v-model 값과 매칭 */
    value: string;
    /** 헤더에 표시할 제목 */
    title: string;
    /** 펼쳤을 때 보일 내용 (텍스트). 더 복잡한 콘텐츠는 #content 슬롯 사용 */
    content?: string;
    /** 비활성 — 클릭/키보드 차단 */
    disabled?: boolean;
}

export declare type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

export declare type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

/** 토스트 수동 닫기 */
export declare function closeToast(id: number): void;

/** openConfirm 호출 옵션 */
export declare interface ConfirmOptions {
    /** 모달 제목 (기본: '확인') */
    title?: string;
    /** 확인 메시지 */
    message: string;
    /** 확인 버튼 텍스트 (기본: '확인') */
    confirmText?: string;
    /** 취소 버튼 텍스트 (기본: '취소') */
    cancelText?: string;
    /** 확인 버튼 variant (기본: 'danger') */
    variant?: 'primary' | 'danger';
}

/** 시작일/종료일 쌍 — radix-vue DateRange와 동일 형태 */
export declare interface DateRange {
    start: DateValue | undefined;
    end: DateValue | undefined;
}

export declare interface DropdownMenuItemDef {
    /** 메뉴 항목 레이블 */
    label: string;
    /** ispark-ui 아이콘 클래스 (예: 'icon-edit'). 24·16 사이즈 클래스 자동(size-16) */
    icon?: string;
    /** 고유 식별자 (필수) — @select 이벤트로 부모에 전달 */
    value: string;
    /** 위험 액션 시맨틱 (삭제 등) — 빨강 텍스트 */
    color?: 'default' | 'danger';
    /** 항목 비활성 */
    disabled?: boolean;
}

/** 파일 아이템 인터페이스 */
export declare interface FileItem {
    id: number;
    filename: string;
    path: string;
    mimetype: string;
}

export declare type IconColor = 'primary' | 'danger' | 'white' | 'black' | 'muted';

export declare const INPUT_SIZES: readonly ["sm", "md", "lg", "auth"];

export declare type InputSize = (typeof INPUT_SIZES)[number];

/**
 * 확인/취소 다이얼로그 표시. Promise<boolean> 반환.
 *
 * @example
 * const confirmed = await openConfirm({
 *   title: '삭제',
 *   message: '삭제하시겠습니까?',
 * })
 * if (!confirmed) return
 *
 * @example
 * const ok = await openConfirm({
 *   title: '저장',
 *   message: '변경사항을 저장하시겠습니까?',
 *   variant: 'primary',
 *   confirmText: '저장',
 * })
 */
export declare function openConfirm(options: ConfirmOptions): Promise<boolean>;

/**
 * 화면에 Toast 표시 (placement별 stack).
 *
 * @example
 * openToast('저장되었습니다.')
 * openToast({ message: '저장 완료', type: 'success' })
 * openToast({ message: '에러', type: 'error', placement: 'bottom-right' })
 * openToast({ message: '오래 유지', duration: 0 })  // 수동 close만
 */
export declare function openToast(options: ToastOptions | string): number;

declare interface Props {
    /**
     * 시멘틱 variant — primary(강조) / secondary(보조) / ghost(트리거) / danger(파괴)
     */
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    /**
     * 사이즈 — xs(24px) / sm(28px) / md(32px·기본) / lg(40px)
     */
    size?: Size;
    /**
     * 아이콘 사이즈 — 미지정 시 size 따라감. 명시 시 override.
     */
    iconSize?: Size;
    /**
     * 모서리 모양 — rounded(기본 6px) / pill(완전 라운드) / circle(iconOnly FAB)
     */
    shape?: Shape;
    /**
     * 렌더링 태그 — button(기본) / a(링크)
     */
    as?: 'button' | 'a';
    /**
     * button 태그일 때만 적용. form 안 의도치 않은 submit 방지로 기본 'button'.
     */
    type?: 'button' | 'submit';
    /**
     * as='a'일 때 링크 경로
     */
    href?: string;
    /**
     * as='a'일 때 link target. '_blank'이면 rel="noopener noreferrer" 자동 부여.
     */
    target?: '_blank' | '_self' | '_parent' | '_top';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    iconOnly?: boolean;
    /**
     * 접근성 라벨 — iconOnly=true일 때 필수
     */
    ariaLabel?: string;
}

declare interface Props_10 {
    modelValue: boolean;
    /** 라벨 텍스트. slot도 가능. */
    label?: string;
    /** 시각만 숨김(SR에는 노출) */
    labelHidden?: boolean;
    /** 비활성 — 클릭 차단 */
    disabled?: boolean;
    /**
     * 부분 체크(mixed) 상태. modelValue=false일 때만 시각적으로 dash 표시.
     * 주로 트리/리스트의 부분 선택 헤더 체크박스에 사용 (예: UiTable 전체 선택 컬럼).
     */
    indeterminate?: boolean;
    /** id 명시 — 미지정 시 useId() 자동 생성 (SSR 안전) */
    id?: string;
}

declare interface Props_11 {
    /** 그룹 공유 v-model 값. 이 라디오의 value와 일치하면 checked */
    modelValue: RadioValue;
    /** 이 라디오 고유 값 — 선택 시 modelValue에 이 값이 emit됨 */
    value: RadioValue;
    /** 같은 그룹 라디오는 동일 name 공유 (브라우저 native toggle). 미지정 시 자동 생성 */
    name?: string;
    /** 라벨 텍스트 (slot도 가능, slot 우선) */
    label?: string;
    /** 시각만 숨김(SR 노출) */
    labelHidden?: boolean;
    /** 비활성 */
    disabled?: boolean;
    /** input id 명시. 미지정 시 useId() 자동 (SSR 안전) */
    id?: string;
}

declare interface Props_12 {
    modelValue?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    /** 초기 표시 rows. autoResize=true면 입력 따라 자동 확장 (기본 1 → autoResize로 콘텐츠 맞춤) */
    rows?: number;
    /** 입력에 따라 scrollHeight로 자동 높이 조절. 기본 true */
    autoResize?: boolean;
    maxLength?: number;
    /** autoResize 한계 — N줄 초과 시 scroll. 기본 10 */
    maxRows?: number;
    radius?: 'sm' | 'base' | 'lg';
    /** 테두리 표시 (기본 false — 외부에서 wrap 스타일 입히는 경우 대비) */
    border?: boolean;
    size?: 'sm' | 'md' | 'lg';
    /** 브라우저 맞춤법 밑줄. 기본 true */
    spellcheck?: boolean;
    label?: string;
    labelHidden?: boolean;
    /** 필수 표시 — 라벨에 * 표기 + HTML required */
    required?: boolean;
    /** 에러 상태. errorMessage가 있으면 자동 true */
    error?: boolean;
    errorMessage?: string;
    desc?: string;
    /** id 명시 — 미지정 시 useId() 자동 (SSR 안전) */
    id?: string;
    /** maxLength 지정 시 우하단 'n / max' 카운터 표시. 기본 false */
    showCounter?: boolean;
}

declare interface Props_13 {
    /** 툴팁 본문 텍스트. content 슬롯 지정 시 무시 */
    content?: string;
    /** radix portal 콘텐츠 박스 추가 클래스 (페이지별 스타일 오버라이드) */
    contentClass?: string;
    /** 본문 글자 크기 (예: '11px'). 비우면 SCSS 기본($font-size-xs) */
    fontSize?: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
    align?: 'start' | 'center' | 'end';
    /** hover 후 표시 지연 (ms). 기본 200 */
    delayDuration?: number;
    /** 화살표 표시 (기본 true) */
    showArrow?: boolean;
}

declare interface Props_14 {
    /** 현재 페이지 (1-indexed). v-model */
    modelValue: number;
    /** 전체 항목 수 */
    totalCount: number;
    /** 페이지당 항목 수. 기본 10 */
    pageSize?: number;
    /** 총 N{label} — 예: '개', '건', '명' */
    totalLabel?: string;
    /** 이전/다음 버튼 라벨 */
    prevLabel?: string;
    nextLabel?: string;
    /** 좌측 '총 N개' 표시. 기본 true */
    showTotal?: boolean;
    /** 우측 'n-m / total' 표시. 기본 true */
    showRange?: boolean;
    /** 양 끝 처음/마지막 페이지 «/» 버튼 표시. 페이지 많은 케이스 권장. 기본 false */
    showFirstLast?: boolean;
}

declare interface Props_15 {
    items: DropdownMenuItemDef[];
    /** 상단 비클릭 라벨 (DropdownMenuLabel) — 구역 안내용 */
    title?: string;
    /** 제어 모드: v-model:open */
    open?: boolean;
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    /** 뷰포트 경계 최소 여백 (flip 기준) */
    collisionPadding?: number;
    /** 트리거 hover 시 자동 오픈 */
    openOnHover?: boolean;
    /** hover 해제 후 닫힘 지연 ms. 너무 짧으면 trigger→content 이동 중 깜빡임 발생. 기본 300 */
    hoverCloseDelay?: number;
    /** 포털 콘텐츠에 추가 클래스 (글로벌 SCSS override 진입점) */
    contentClass?: string;
}

declare interface Props_16 {
    modelValue: string;
    tabs: TabItem[];
    /** 탭 크기 — sm(36px) / md(40px·기본) / lg(48px) */
    size?: 'sm' | 'md' | 'lg';
    /** 정렬 — left / center(기본 max-width 800px) / right / stretch(균등 분할) */
    align?: 'left' | 'center' | 'right' | 'stretch';
    /** role="tablist"의 aria-label */
    ariaLabel?: string;
}

declare interface Props_17 {
    modelValue?: DateValue;
    type?: 'date' | 'datetime' | 'month';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    disabled?: boolean;
    locale?: string;
    minValue?: DateValue;
    maxValue?: DateValue;
    /** 트리거 버튼 aria-label — 미지정 시 type 기반 기본값 ("날짜 선택" / "날짜·시간 선택" / "월 선택") */
    triggerLabel?: string;
}

declare interface Props_18 {
    modelValue?: DateRange;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    disabled?: boolean;
    locale?: string;
    minValue?: DateValue;
    maxValue?: DateValue;
}

declare interface Props_19 {
    /** items 배열로 간단하게 렌더 (없으면 기본 슬롯 사용) */
    items?: AccordionItemDef[];
    /** single: 하나만 열림 / multiple: 여러 개 동시 열림 */
    type?: 'single' | 'multiple';
    /** v-model — single이면 string, multiple이면 string[] */
    modelValue?: string | string[];
    /** 초기 열림 상태 (uncontrolled) */
    defaultValue?: string | string[];
    /** single 모드에서 열린 항목 다시 클릭 시 닫을 수 있는지 */
    collapsible?: boolean;
    /** 전체 비활성 */
    disabled?: boolean;
    /** 크기 — sm / md(기본) / lg */
    size?: 'sm' | 'md' | 'lg';
}

declare interface Props_2 {
    /** v-model 양방향 바인딩 값 */
    modelValue?: string | number;
    /**
     * input HTML type — `search`는 내부적으로 text + 우측 검색 아이콘 자동.
     * `number`는 사용 금지 (한글 IME 깜빡임) → `numberOnly` prop 사용.
     */
    type?: 'text' | 'search' | 'password' | 'email' | 'tel' | 'url';
    /**
     * label 텍스트 — `<label for>` 자동 연결. label slot이 있으면 그것을 우선.
     * `id` prop이 없어도 자동 생성된 id로 연결됨.
     */
    label?: string;
    /**
     * label 시각적 숨김 — DOM에는 있지만 CSS로 숨김. 스크린리더는 인지.
     * search input에서 placeholder만 노출하고 싶을 때.
     */
    labelHidden?: boolean;
    /**
     * 에러 상태 — input에 빨간 테두리 + `aria-invalid="true"` 자동.
     * `errorMessage`가 있으면 별도 지정 안 해도 자동 true.
     */
    error?: boolean;
    /**
     * 에러 메시지 — 비어있지 않으면 `error: true` 자동 + 빨간 텍스트로 표시.
     * input의 `aria-describedby`가 이 메시지로 연결 (desc보다 우선).
     */
    errorMessage?: string;
    /** 입력 영역 플레이스홀더 텍스트 */
    placeholder?: string;
    /** 비활성화 — 입력 차단 + opacity 0.5 */
    disabled?: boolean;
    /** 읽기 전용 — 표시는 정상, 입력만 차단 */
    readonly?: boolean;
    /** 필수 입력 (HTML required) */
    required?: boolean;
    /** autocomplete HTML 속성 (e.g., "email", "current-password", "off") */
    autocomplete?: string;
    /** form submit 시 사용할 input name 속성 */
    name?: string;
    /** label htmlFor와 연결할 input id 속성 */
    id?: string;
    /** 입력 가능한 최대 글자 수 (HTML 표준 maxlength) */
    maxLength?: number;
    /**
     * 최솟값 — `numberOnly=true` 필수. blur 시점에 자동 보정.
     * type=text 사용으로 HTML native 제약 없음.
     */
    min?: string | number;
    /**
     * 최댓값 — `numberOnly=true` 필수. blur 시점에 자동 보정.
     */
    max?: string | number;
    /**
     * 단위 — `numberOnly=true` 필수. blur 시 step 단위로 반올림.
     * 예: `step=0.1` → 0.05 입력 시 0.1로 보정.
     */
    step?: string | number;
    /**
     * 사이즈 — `sm`(28px) / `md`(32px·기본) / `lg`(40px) / `auth`(44px·로그인 전용)
     * UiButton과 동일 토큰 사용 → 검색바에서 자동 정렬.
     */
    size?: InputSize;
    /**
     * 아이콘 사이즈 — 미지정 시 `size` 따라감, 명시 시 override (xs/sm/md/lg).
     * 슬롯 내 `<i>`에 `size-N` 클래스 안 붙였을 때만 적용.
     */
    iconSize?: Size;
    /**
     * 모서리 모양 — `rounded`(기본 6px) / `pill`(완전 라운드 — 검색바·필터)
     */
    shape?: 'rounded' | 'pill';
    /**
     * 입력 아래 설명 텍스트 — 별도 `<p class="hint">` 사용 금지, 이 prop 사용
     * input의 `aria-describedby`와 자동 연결.
     */
    desc?: string;
    /**
     * 숫자만 허용 — `type="number"` 사용 금지 정책 대신 사용 (한글 IME 깜빡임 방지).
     * `min/max/step`은 이 prop이 true일 때만 동작.
     */
    numberOnly?: boolean;
    /** `numberOnly=true`일 때 소수점 허용 (예: 0.5) */
    allowDecimal?: boolean;
    /** `numberOnly=true`일 때 음수 부호(-) 허용 */
    allowNegative?: boolean;
    /**
     * 소수점 자릿수 제한 — `allowDecimal=true`일 때만 의미.
     * 입력 즉시 초과 자릿수 제거. 예: `decimals=2` → "0.123" 입력 시 "0.12"로 자동 보정.
     */
    decimals?: number;
    /**
     * 천 단위 콤마 — `numberOnly=true`일 때 자동 적용.
     * 입력/표시 시 "1,234,567" 형태로 포맷. emit 값은 숫자(콤마 제거).
     * 기본값: `numberOnly=true`이면 자동 true.
     */
    useComma?: boolean;
    /**
     * 입력값 삭제 버튼 — 값이 비어있지 않고 disabled/readonly 아닐 때 우측 X 표시.
     * 클릭 시 값 비움 + input re-focus + `clear` 이벤트 발생.
     */
    clearable?: boolean;
    /**
     * 비밀번호 표시/숨김 토글 — `type="password"`일 때만 동작.
     * 눈 아이콘 클릭으로 text↔password 전환.
     */
    showPasswordToggle?: boolean;
    /** 검색 버튼 aria-label (type="search"일 때만, 기본 "검색") */
    searchAriaLabel?: string;
}

declare interface Props_20 {
    open?: boolean;
    title?: string;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    position?: 'right' | 'left';
    overlay?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    resizable?: boolean;
    /** 1/2 프리셋 크기 버튼 표시 */
    showResize?: boolean;
    /** 전체화면 버튼 표시 */
    showFullscreen?: boolean;
    /** localStorage 저장 키 — 미지정 시 title 자동 사용 */
    persistKey?: string;
    /** 닫기 전 변경사항 확인 모달 표시 여부 (기본: true) */
    confirmBeforeClose?: boolean;
}

declare interface Props_21 {
    /** 파일 목록 */
    files: FileItem[];
    /** 파일 URL 생성 함수 */
    getUrl: (path: string) => string;
    /** 삭제 버튼 표시 여부 */
    deletable?: boolean;
}

declare interface Props_22 {
    /** 업로드 중 상태 */
    loading?: boolean;
    /** 허용 파일 형식 (예: 'image/*', '.pdf,.doc') */
    accept?: string;
    /** 버튼 라벨 */
    label?: string;
    /** 비활성화 */
    disabled?: boolean;
}

declare interface Props_23 {
    modelValue?: string;
    editable?: boolean;
    placeholder?: string;
}

declare interface Props_3 {
    modelValue?: string | number;
    options: SelectOption[];
    placeholder?: string;
    label?: string;
    labelHidden?: boolean;
    required?: boolean;
    id?: string;
    disabled?: boolean;
    size?: SelectSize;
    shape?: 'rounded' | 'pill';
    error?: boolean;
    /**
     * 에러 메시지 — 비어있지 않으면 `error: true` 자동 + 빨간 텍스트로 표시.
     */
    errorMessage?: string;
    desc?: string;
}

declare interface Props_4 {
    open?: boolean;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showClose?: boolean;
    showOverlay?: boolean;
    showFullscreen?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    customClass?: string;
    maxWidth?: string;
}

declare interface Props_5 {
    /** 아이콘 클래스명 (예: 'icon-search') */
    icon?: string;
    /** 메인 텍스트 */
    title?: string;
    /** 보조 설명 */
    description?: string;
}

declare interface Props_6 {
    /** 시맨틱 variant — 도메인 특화 색은 colorHex 사용 */
    variant?: BadgeVariant;
    size?: BadgeSize;
    /** 아이콘 only (정사각형, 텍스트 미렌더) */
    iconOnly?: boolean;
    /** 지정 시 variant 색상 대신 이 컬러 기반(text + bg tinted)으로 표시. 6자리/3자리 hex 지원 */
    colorHex?: string;
    /** 배경 투명도 (0~1). 기본 0.12 */
    bgAlpha?: number;
}

declare interface Props_7 {
    /** badge 사이 간격 — number는 px, string은 그대로 (예: '8px', '0.5rem'). 기본 8 */
    gap?: number | string;
    /** 배치 방향. 기본 'row' */
    direction?: 'row' | 'column';
    /** 한 줄을 넘으면 다음 줄로 wrap. 기본 true */
    wrap?: boolean;
    /** 그룹 라벨 (스크린리더용). 예: '상태', '카테고리' */
    ariaLabel?: string;
}

declare interface Props_8 {
    /** 로딩 텍스트. 빈 문자열이면 텍스트 미렌더 + aria-label='로딩 중'로 SR 안내 */
    text?: string;
    /** 오버레이(dim) 모드 — viewport 전체 fixed + 반투명 dim */
    overlay?: boolean;
}

declare interface Props_9 {
    modelValue: boolean;
    /** 비활성 — 클릭/키보드 토글 차단 */
    disabled?: boolean;
    /** 라벨 텍스트 (label htmlFor → button id 자동 매칭) */
    label?: string;
    /** 라벨을 시각적으로만 숨김 (SR에는 노출) */
    labelHidden?: boolean;
    /** id 명시 — 미지정 시 useId() 자동 생성 (SSR 안전) */
    id?: string;
}

declare type RadioValue = string | number | boolean;

export declare const SELECT_SIZES: readonly ["xs", "sm", "md", "lg", "auth"];

export declare interface SelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}

export declare type SelectSize = (typeof SELECT_SIZES)[number];

export declare type Shape = (typeof SHAPES)[number];

export declare const SHAPES: readonly ["rounded", "pill", "circle"];

export declare type Size = (typeof SIZES)[number];

export declare const SIZES: readonly ["xs", "sm", "md", "lg"];

export declare interface TabItem {
    /** 탭 라벨 */
    label: string;
    /** 고유 식별자 — v-model 값과 매칭 */
    value: string;
    /** 아이콘 클래스명 (예: 'icon-edit') */
    icon?: string;
    /** 우측 카운트 배지 (예: 미확인 개수) */
    count?: number | string;
    /** 비활성 — 클릭/키보드 모두 차단 */
    disabled?: boolean;
}

export declare interface TableColumn {
    key: string;
    label: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    headerAlign?: 'left' | 'center' | 'right';
    sortable?: boolean;
    sortType?: 'auto' | 'string' | 'number' | 'date';
    /** 컬럼 헤더에 필터 드롭다운 표시 */
    filterable?: boolean;
    /** 필터 옵션 목록 — 첫 번째 항목(value='')을 '전체'로 사용 */
    filterOptions?: TableFilterOption[];
    /** 뷰포트가 이 px 이하일 때 칼럼 숨김 */
    hideBelow?: number;
}

export declare interface TableFilterOption {
    label: string;
    value: string;
}

/** 내부 toast 항목 — UiToast.vue 렌더용 */
export declare interface ToastItem {
    id: number;
    message: string;
    type: ToastType;
    duration: number;
    placement: ToastPlacement;
}

/** openToast 호출 옵션 */
export declare interface ToastOptions {
    message: string;
    type?: ToastType;
    /** 표시 시간(ms). 기본 2500. 0 이하면 자동 닫기 비활성 (수동 close만) */
    duration?: number;
    placement?: ToastPlacement;
}

/** Toast 표시 위치 — 4 placement별로 별도 stack */
export declare type ToastPlacement = 'top-center' | 'top-right' | 'bottom-center' | 'bottom-right';

/** Toast 시멘틱 타입 */
export declare type ToastType = 'success' | 'error' | 'warning' | 'info';

export declare const UiAccordion: __VLS_WithTemplateSlots_11<typeof __VLS_component_11, __VLS_TemplateResult_11["slots"]>;

export declare const UiBadge: __VLS_WithTemplateSlots_5<typeof __VLS_component_5, __VLS_TemplateResult_5["slots"]>;

export declare const UiBadgeGroup: __VLS_WithTemplateSlots_6<typeof __VLS_component_6, __VLS_TemplateResult_6["slots"]>;

export declare const UiButton: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;

export declare const UiCheckbox: __VLS_WithTemplateSlots_7<typeof __VLS_component_7, __VLS_TemplateResult_7["slots"]>;

export declare const UiConfirm: DefineComponent<    {}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export declare const UiDatePicker: DefineComponent<Props_17, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: DateValue | undefined) => any;
}, string, PublicProps, Readonly<Props_17> & Readonly<{
"onUpdate:modelValue"?: ((value: DateValue | undefined) => any) | undefined;
}>, {
size: "xs" | "sm" | "md" | "lg";
type: "date" | "datetime" | "month";
disabled: boolean;
modelValue: DateValue;
locale: string;
minValue: DateValue;
maxValue: DateValue;
triggerLabel: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
monthCellRefs: HTMLButtonElement[];
}, HTMLDivElement>;

export declare const UiDateRangePicker: DefineComponent<Props_18, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: DateRange) => any;
}, string, PublicProps, Readonly<Props_18> & Readonly<{
"onUpdate:modelValue"?: ((value: DateRange) => any) | undefined;
}>, {
size: "xs" | "sm" | "md" | "lg";
disabled: boolean;
modelValue: DateRange;
locale: string;
minValue: DateValue;
maxValue: DateValue;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

export declare const UiDrawer: __VLS_WithTemplateSlots_12<typeof __VLS_component_12, __VLS_TemplateResult_12["slots"]>;

export declare const UiDropdownMenu: __VLS_WithTemplateSlots_10<typeof __VLS_component_10, __VLS_TemplateResult_10["slots"]>;

export declare const UiEmpty: __VLS_WithTemplateSlots_4<typeof __VLS_component_4, __VLS_TemplateResult_4["slots"]>;

export declare const UiFileList: DefineComponent<Props_21, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
delete: (file: FileItem) => any;
}, string, PublicProps, Readonly<Props_21> & Readonly<{
onDelete?: ((file: FileItem) => any) | undefined;
}>, {
deletable: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

export declare const UiFileUpload: DefineComponent<Props_22, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
upload: (file: File) => any;
}, string, PublicProps, Readonly<Props_22> & Readonly<{
onUpload?: ((file: File) => any) | undefined;
}>, {
disabled: boolean;
loading: boolean;
label: string;
accept: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLLabelElement>;

export declare const UiIcon: DefineComponent<__VLS_Props, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
size: string | number;
strokeWidth: number;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;

export declare const UiInput: __VLS_WithTemplateSlots_2<typeof __VLS_component_2, __VLS_TemplateResult_2["slots"]>;

export declare const UiLoading: DefineComponent<Props_8, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<Props_8> & Readonly<{}>, {
text: string;
overlay: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

export declare const UiMarkdownEditor: DefineComponent<Props_23, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string) => any;
}, string, PublicProps, Readonly<Props_23> & Readonly<{
"onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
modelValue: string;
placeholder: string;
editable: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
sourceRef: HTMLTextAreaElement;
}, HTMLDivElement>;

export declare const UiModal: __VLS_WithTemplateSlots_3<typeof __VLS_component_3, __VLS_TemplateResult_3["slots"]>;

export declare const UiPagination: DefineComponent<Props_14, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (page: number) => any;
change: (page: number) => any;
}, string, PublicProps, Readonly<Props_14> & Readonly<{
"onUpdate:modelValue"?: ((page: number) => any) | undefined;
onChange?: ((page: number) => any) | undefined;
}>, {
pageSize: number;
totalLabel: string;
prevLabel: string;
nextLabel: string;
showTotal: boolean;
showRange: boolean;
showFirstLast: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

export declare const UiRadio: __VLS_WithTemplateSlots_8<typeof __VLS_component_8, __VLS_TemplateResult_8["slots"]>;

export declare const UiSelect: DefineComponent<Props_3, {
focus: () => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string | number) => any;
change: (value: string | number) => any;
}, string, PublicProps, Readonly<Props_3> & Readonly<{
"onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
onChange?: ((value: string | number) => any) | undefined;
}>, {
size: SelectSize;
shape: "rounded" | "pill";
disabled: boolean;
label: string;
desc: string;
modelValue: string | number;
labelHidden: boolean;
error: boolean;
errorMessage: string;
placeholder: string;
required: boolean;
id: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

export declare const UiTab: DefineComponent<Props_16, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string) => any;
change: (value: string) => any;
}, string, PublicProps, Readonly<Props_16> & Readonly<{
"onUpdate:modelValue"?: ((value: string) => any) | undefined;
onChange?: ((value: string) => any) | undefined;
}>, {
size: "sm" | "md" | "lg";
ariaLabel: string;
align: "left" | "center" | "right" | "stretch";
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

export declare const UiTable: <TRow extends Record<string, unknown> = Record<string, unknown>>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<Pick<Partial<{}> & Omit<{
        readonly "onRow-click"?: ((row: TRow, index: number) => any) | undefined;
        readonly "onFilter-change"?: ((filters: Record<string, string>) => any) | undefined;
    } & VNodeProps & AllowedComponentProps & ComponentCustomProps, never>, "onRow-click" | "onFilter-change"> & UiTableProps<TRow> & Partial<{}>> & PublicProps;
    expose(exposed: ShallowUnwrapRef<    {}>): void;
    attrs: any;
    slots: Partial<Record<`header-${string}`, (_: {
        column: TableColumn;
        isSortable: boolean;
        sortOrder: "" | "desc" | "asc";
        onSort: () => void;
    }) => any>> & Partial<Record<`cell-${string}`, (_: {
        row: TRow;
        value: unknown;
        index: number;
    }) => any>> & {
        empty?(_: {}): any;
    };
    emit: ((evt: "row-click", row: TRow, index: number) => void) & ((evt: "filter-change", filters: Record<string, string>) => void);
}>) => VNode<RendererNode, RendererElement, {
[key: string]: any;
}> & {
    __ctx?: Awaited<typeof __VLS_setup>;
};

declare interface UiTableProps<TRow extends Record<string, unknown> = Record<string, unknown>> {
    columns: TableColumn[];
    data: TRow[];
    stickyHeader?: boolean;
    maxHeight?: string;
    /** 빈 상태 텍스트 — UiEmpty의 title로 전달 */
    emptyText?: string;
    /** 빈 상태 아이콘 (예: 'icon-search') — UiEmpty의 icon으로 전달 */
    emptyIcon?: string;
    /** 빈 상태 보조 설명 — UiEmpty의 description으로 전달 */
    emptyDescription?: string;
    clickable?: boolean;
    /** 테이블 크기: 'md'(기본) | 'sm'(컴팩트) */
    size?: 'md' | 'sm';
    /**
     * 선택 행 강조용: `row[selectedRowKey] === selectedRowValue` 일 때 `is-selected` 적용.
     * Controlled 모드 활성화 조건: `selectedRowKey`가 truthy + `selectedRowValue !== undefined`.
     * `0`, `''`, `false` 같은 falsy 값도 정상 선택 가능 (=== 비교).
     */
    selectedRowKey?: string;
    selectedRowValue?: unknown;
    /** 컬럼 세로 구분선 표시 여부 (기본: true) */
    bordered?: boolean;
}

export declare const UiTextarea: DefineComponent<Props_12, {
focus: () => void | undefined;
blur: () => void | undefined;
el: Ref<HTMLTextAreaElement | null, HTMLTextAreaElement | null>;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: string) => any;
}, string, PublicProps, Readonly<Props_12> & Readonly<{
"onUpdate:modelValue"?: ((value: string) => any) | undefined;
}>, {
size: "sm" | "md" | "lg";
disabled: boolean;
label: string;
desc: string;
modelValue: string;
labelHidden: boolean;
error: boolean;
errorMessage: string;
placeholder: string;
readonly: boolean;
required: boolean;
id: string;
maxLength: number;
border: boolean;
rows: number;
autoResize: boolean;
maxRows: number;
radius: "sm" | "base" | "lg";
spellcheck: boolean;
showCounter: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
textareaRef: HTMLTextAreaElement;
}, HTMLDivElement>;

export declare const UiToast: DefineComponent<    {}, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export declare const UiToggle: DefineComponent<Props_9, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"update:modelValue": (value: boolean) => any;
change: (value: boolean) => any;
}, string, PublicProps, Readonly<Props_9> & Readonly<{
"onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
onChange?: ((value: boolean) => any) | undefined;
}>, {
disabled: boolean;
label: string;
labelHidden: boolean;
id: string;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, HTMLDivElement>;

export declare const UiTooltip: __VLS_WithTemplateSlots_9<typeof __VLS_component_9, __VLS_TemplateResult_9["slots"]>;

export { }
