import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { PublicProps } from 'vue';

/**
 * 공개 발표 장표. 1040×720 캔버스를 컨테이너 폭에 맞춰 축소·확대해 그린다.
 * 내용 검사에 실패하면 장표 대신 문제 목록을 보여준다(렌더 중 오류를 던지지 않는다).
 */
declare type __VLS_Props = {
    layoutId: string;
    content: Record<string, unknown>;
    /** 발주처 강조색 (#RRGGBB) */
    accentColor?: string;
    /** 하단 페이지 번호 */
    page?: number;
    /** false면 내부 클릭을 막는다(썸네일용) */
    interactive?: boolean;
};

/** 렌더 전에 호출한다. 문제가 없으면 빈 배열. 오류를 던지지 않는다. */
export declare function checkSlideContent(layoutId: string, content: unknown): string[];

export declare interface FieldSpec {
    path: string;
    label: string;
    type: FieldType;
    required?: boolean;
    maxLength?: number;
    minItems?: number;
    maxItems?: number;
    /** list 항목의 하위 필드. path는 항목 기준 */
    fields?: FieldSpec[];
    /** AI·편집자에게 보여줄 작성 기준 */
    hint?: string;
}

export declare type FieldType = 'text' | 'textarea' | 'icon' | 'boolean' | 'list';

export declare function getPath(target: unknown, path: string): unknown;

export declare const illustrationAssets: ({
    file: string;
    id: "next" | "organization" | "people" | "quality" | "schedule" | "verified" | "converted-data" | "understanding" | "strategy" | "staffing" | "risk" | "security" | "training" | "deliverable" | "stabilization" | "maintenance" | "integration" | "infrastructure" | "testing" | "requirements-traceability" | "evaluation-criteria" | "budget-cost" | "data-quality" | "user-experience" | "ai-assistant" | "knowledge-search" | "operations-handover";
    label: string;
    concept: "next" | "organization" | "people" | "quality" | "schedule" | "verified" | "converted-data" | "understanding" | "strategy" | "staffing" | "risk" | "security" | "training" | "deliverable" | "stabilization" | "maintenance" | "integration" | "infrastructure" | "testing" | "requirements-traceability" | "evaluation-criteria" | "budget-cost" | "data-quality" | "user-experience" | "ai-assistant" | "knowledge-search" | "operations-handover";
    tags: string[];
} | {
    file: string;
    id: "legacy-server";
    label: "노후 시스템 · 이력";
    concept: "platform";
    tags: readonly ["서버", "시스템", "레거시", "이력"];
} | {
    file: string;
    id: "system-blocks";
    label: "제도 · 시스템 구현";
    concept: "mapping";
    tags: readonly ["제도", "설계", "블록", "문서"];
} | {
    file: string;
    id: "analytics-review";
    label: "성과 분석 · 검토";
    concept: "performance";
    tags: readonly ["성과", "차트", "분석", "검토"];
} | {
    file: string;
    id: "data-migration";
    label: "데이터 이관";
    concept: "data-migration";
    tags: readonly ["데이터", "이관", "통합", "저장"];
} | {
    file: string;
    id: "workflow-design";
    label: "업무 · 제도 설계";
    concept: "workflow";
    tags: readonly ["업무", "절차", "제도", "설계"];
} | {
    file: string;
    id: "performance-target";
    label: "성과 · 목표 달성";
    concept: "performance";
    tags: readonly ["성과", "목표", "지표", "KPI"];
} | {
    file: string;
    id: "project-lead";
    label: "프로젝트 책임자";
    concept: "organization";
    tags: readonly ["PM", "책임자", "프로젝트", "총괄", "관리자"];
} | {
    file: string;
    id: "business-design-team";
    label: "업무·설계팀";
    concept: "workflow";
    tags: readonly ["업무", "설계", "팀", "요구사항", "분석"];
} | {
    file: string;
    id: "development-integration-team";
    label: "개발·연계팀";
    concept: "integration";
    tags: readonly ["개발", "연계", "팀", "코드", "DB"];
} | {
    file: string;
    id: "quality-assurance-team";
    label: "품질·검증팀";
    concept: "quality";
    tags: readonly ["품질", "검증", "QA", "테스트", "팀"];
} | {
    file: string;
    id: "cloud-service";
    label: "클라우드 서비스";
    concept: "infrastructure";
    tags: readonly ["클라우드", "서버", "서비스", "인프라", "SaaS"];
} | {
    file: string;
    id: "api-connection";
    label: "API 연계";
    concept: "integration";
    tags: readonly ["API", "연계", "인터페이스", "연결", "통합"];
} | {
    file: string;
    id: "document-search";
    label: "문서 검색";
    concept: "understanding";
    tags: readonly ["문서", "검색", "조회", "분석", "탐색"];
} | {
    file: string;
    id: "approval-workflow";
    label: "결재 승인";
    concept: "verified";
    tags: readonly ["결재", "승인", "검토", "확인", "완료"];
})[];

export declare type IllustrationId = typeof illustrationAssets[number]['id'];

export declare const illustrationIds: ("next" | "organization" | "data-migration" | "people" | "quality" | "schedule" | "verified" | "converted-data" | "understanding" | "strategy" | "staffing" | "risk" | "security" | "training" | "deliverable" | "stabilization" | "maintenance" | "integration" | "infrastructure" | "testing" | "requirements-traceability" | "evaluation-criteria" | "budget-cost" | "data-quality" | "user-experience" | "ai-assistant" | "knowledge-search" | "operations-handover" | "legacy-server" | "system-blocks" | "analytics-review" | "workflow-design" | "performance-target" | "project-lead" | "business-design-team" | "development-integration-team" | "quality-assurance-team" | "cloud-service" | "api-connection" | "document-search" | "approval-workflow")[];

declare interface LayoutEntry {
    id: string;
    name: string;
    group: LibraryGroup;
    relation: string;
    purpose: string;
    capacity: string;
    required: string[];
    optional: string[];
    rules: string[];
    renderer: 'agenda' | 'strategy' | 'comparison' | 'diagram' | 'detailed' | 'chapter' | 'section-cover';
    height: number;
    props: Record<string, unknown>;
}

declare type LibraryGroup = '공통 프레임' | '시작·전환' | '핵심 설명' | '수행 방법' | '수행 관리' | '근거 제시';

/**
 * 소비 앱(제안서 작성 앱 등)에 공개하는 발표 레이아웃 목록.
 * - id는 Storybook 레이아웃 갤러리 id를 그대로 공개 키로 쓴다.
 * - content는 렌더러 컴포넌트 props 그대로다. 필드 경로(path)는 content 기준 점 표기다.
 * - 같은 필드 정의를 편집 폼·AI 입력·검사에 함께 쓴다.
 */
export declare const PRESENTATION_SCHEMA_VERSION = 1;

/** Resolve bundled public assets under the configured (or Storybook) base, leaving user URLs intact. */
export declare function presentationAssetUrl(src: string, base?: string): string;

export declare const presentationCanvas: {
    readonly width: 1040;
    readonly height: 720;
};

export declare interface PresentationLayout {
    id: string;
    name: string;
    group: LayoutEntry['group'];
    relation: string;
    purpose: string;
    capacity: string;
    rules: string[];
    renderer: LayoutEntry['renderer'];
    canvas: {
        width: number;
        height: number;
    };
    schemaVersion: number;
    fields: FieldSpec[];
    /** 디자인 검토용 예시. 실제 RFP 근거가 아니다 */
    sample: Record<string, unknown>;
}

export declare const presentationLayoutById: Record<string, PresentationLayout>;

export declare const presentationLayouts: PresentationLayout[];

export declare const PresentationSlide: DefineComponent<__VLS_Props, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
page: number;
interactive: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
host: HTMLDivElement;
}, HTMLDivElement>;

/**
 * 소비 앱에서 발표 에셋(/presentation/...)을 서빙하는 기준 경로를 지정한다.
 * 예: 앱이 에셋을 `/vendor/ispark/presentation/...`에 두었다면 `setPresentationAssetBase('/vendor/ispark/')`.
 * 지정하지 않으면 빌드 시점의 BASE_URL(Storybook 배포 경로)을 사용한다.
 */
export declare function setPresentationAssetBase(base: string | undefined): void;

/** 고정값을 채운 사본을 돌려준다. 원본은 바꾸지 않는다 */
export declare function withFixedContent(layoutId: string, content: Record<string, unknown>): Record<string, unknown>;

export { }
