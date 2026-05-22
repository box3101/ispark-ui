# 풀스택 Todo 앱 — 디자인 문서

**작성일**: 2026-05-22
**목적**: ispark-ui 디자인 시스템을 활용한 첫 풀스택 프로젝트 (학습용)
**팀**: 본인 + 현지선임
**핵심 학습 목표**: API 통신, JWT 인증, REST 컨벤션, Vue 상태관리, Prisma ORM

---

## 1. 의사결정 요약

| 항목 | 결정 | 이유 |
|---|---|---|
| 도메인 | Todo + 카테고리 | CRUD + 1:N 관계 + 필터까지 학습 폭 적당, 끝까지 만들 수 있는 범위 |
| 프론트엔드 | Vue 3 + TypeScript + Vite | ispark-ui와 동일 스택, AI 도움 잘 받음 |
| UI 라이브러리 | `@leechanyong/ispark-ui` | 자체 디자인 시스템, 컴포넌트 21개 준비됨 |
| 백엔드 | Node + Express + TypeScript | 프론트와 언어 통일, 학습 부하 최소 |
| ORM | Prisma | 마이그레이션/스튜디오 UX 우수, 학습용으로 직관적 |
| 데이터베이스 | SQLite (시작) → PostgreSQL (선택) | 설치 부담 0, Prisma datasource 한 줄로 이전 가능 |
| 인증 | JWT (회원가입 + 로그인) | 표준 패턴 1회 직접 구현이 큰 학습 자산 |
| 스코프 | M1 (인증) + M2 (Todo CRUD + 카테고리) | 첫 풀스택의 현실적 완성 가능 범위 |
| 프로젝트 구조 | 모노레포 (npm workspaces) | frontend/backend 동시 사고 학습, IDE 1개로 컨텍스트 유지 |

---

## 2. 프로젝트 구조

```
my-todo-app/
├── package.json              ← npm workspaces 루트
├── README.md
├── .gitignore
│
├── frontend/                 ← Vue 3 + ispark-ui
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── index.html
│   ├── .env                  ← VITE_API_URL=http://localhost:3000
│   └── src/
│       ├── main.ts           ← ispark-ui CSS import
│       ├── App.vue
│       ├── router/           ← Vue Router (login, todos, categories)
│       ├── pages/            ← LoginPage, TodoListPage 등
│       ├── components/       ← TodoItem, CategorySelect 등
│       ├── composables/
│       │   ├── useApi.ts     ← fetch 래퍼 (JWT 헤더 자동, 401 처리)
│       │   ├── useAuthStore.ts
│       │   ├── useTodoApi.ts / useTodoStore.ts
│       │   └── useCategoryApi.ts / useCategoryStore.ts
│       └── types/            ← User, Todo, Category 타입
│
└── backend/                  ← Node + Express + Prisma
    ├── package.json
    ├── tsconfig.json
    ├── .env                  ← DATABASE_URL, JWT_SECRET, PORT
    ├── prisma/
    │   ├── schema.prisma     ← User, Category, Todo 모델
    │   └── dev.db            ← SQLite 파일 (gitignore)
    └── src/
        ├── index.ts          ← Express 부트스트랩
        ├── middleware/
        │   └── auth.ts       ← JWT 검증 미들웨어
        ├── routes/
        │   ├── auth.ts       ← /api/auth/register, /login, /me
        │   ├── todos.ts      ← /api/todos CRUD
        │   └── categories.ts ← /api/categories CRUD
        └── lib/
            └── prisma.ts     ← Prisma 클라이언트 싱글톤
```

**개발 명령어:**
```bash
npm run dev   # concurrently로 frontend + backend 동시 기동
```

---

## 3. API 설계

### 3.1 인증 (Auth)

| Method | Path | 인증 | 요청 body | 응답 |
|---|---|---|---|---|
| POST | `/api/auth/register` | ❌ | `{ email, password, name }` | `{ user, token }` |
| POST | `/api/auth/login` | ❌ | `{ email, password }` | `{ user, token }` |
| GET | `/api/auth/me` | ✅ | — | `{ user }` |

### 3.2 카테고리 (Category)

| Method | Path | 인증 | 요청 | 응답 |
|---|---|---|---|---|
| GET | `/api/categories` | ✅ | — | `{ list: Category[] }` |
| POST | `/api/categories` | ✅ | `{ name, color }` | `{ category }` |
| PUT | `/api/categories/:id` | ✅ | `{ name, color }` | `{ category }` |
| DELETE | `/api/categories/:id` | ✅ | — | `{ success: true }` |

### 3.3 할 일 (Todo)

| Method | Path | 인증 | 요청 | 응답 |
|---|---|---|---|---|
| GET | `/api/todos` | ✅ | query: `?status=done&categoryId=xxx` | `{ list: Todo[] }` |
| GET | `/api/todos/:id` | ✅ | — | `{ todo }` |
| POST | `/api/todos` | ✅ | `{ title, content?, dueDate?, categoryId? }` | `{ todo }` |
| PUT | `/api/todos/:id` | ✅ | `{ title, content, dueDate, categoryId }` | `{ todo }` |
| PATCH | `/api/todos/:id/toggle` | ✅ | — | `{ todo }` (완료/미완료 토글) |
| DELETE | `/api/todos/:id` | ✅ | — | `{ success: true }` |

### 3.4 공통 응답 포맷

**성공:**
```json
{ "list": [...] }
{ "todo": {...} }
{ "success": true }
```

**에러:**
```json
{ "error": "INVALID_PASSWORD", "message": "비밀번호가 일치하지 않습니다." }
```

| HTTP | 의미 | 프론트 처리 |
|---|---|---|
| 200 | 성공 | 정상 |
| 400 | 잘못된 요청 | 토스트 |
| 401 | 인증 실패 | 로그인 페이지 리다이렉트 |
| 403 | 권한 없음 | 토스트 + 뒤로가기 |
| 404 | 리소스 없음 | Empty 상태 |
| 500 | 서버 에러 | "일시적 오류" 토스트 |

### 3.5 요청 헤더

```
Authorization: Bearer <token>
Content-Type: application/json
```

---

## 4. 데이터 모델 (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        String     @id @default(cuid())
  email     String     @unique
  password  String                              // bcrypt 해시
  name      String
  createdAt DateTime   @default(now())

  categories Category[]
  todos      Todo[]
}

model Category {
  id        String   @id @default(cuid())
  name      String
  color     String   @default("#6B7280")
  createdAt DateTime @default(now())

  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  todos     Todo[]

  @@index([userId])
}

model Todo {
  id          String    @id @default(cuid())
  title       String
  content     String?
  isDone      Boolean   @default(false)
  dueDate     DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  categoryId  String?
  category    Category? @relation(fields: [categoryId], references: [id], onDelete: SetNull)

  @@index([userId])
  @@index([categoryId])
}
```

### 4.1 관계

- **User : Category** = 1 : N (회원 탈퇴 시 Cascade)
- **User : Todo** = 1 : N (회원 탈퇴 시 Cascade)
- **Category : Todo** = 1 : N (카테고리 삭제 시 SetNull — Todo는 살아남고 categoryId만 null)

### 4.2 마이그레이션

```bash
npx prisma migrate dev --name init
npx prisma generate
npx prisma studio   # 브라우저로 DB 시각화
```

---

## 5. 인증 흐름 (JWT)

### 5.1 전체 시퀀스

```
Frontend                          Backend                     SQLite
   │ ① POST /api/auth/register      │                          │
   │ { email, password, name }      │                          │
   │ ─────────────────────────────> │                          │
   │                                │ ② bcrypt.hash(password)  │
   │                                │ ③ User 생성              │
   │                                │ ───────────────────────> │
   │                                │ ④ jwt.sign({ userId })   │
   │ ⑤ { user, token }              │                          │
   │ <───────────────────────────── │                          │
   │ ⑥ localStorage.setItem(token)  │                          │
   │ ⑦ router.push('/todos')        │                          │
   │                                │                          │
   │ ── 이후 인증 요청 ──            │                          │
   │ GET /api/todos                 │                          │
   │ Authorization: Bearer <token>  │                          │
   │ ─────────────────────────────> │                          │
   │                                │ ⑧ verify(token) → userId │
   │                                │ ⑨ WHERE userId = ?       │
   │ ⑩ { list: Todo[] }             │                          │
   │ <───────────────────────────── │                          │
```

### 5.2 백엔드 핵심 조각

**비밀번호 해싱 (bcrypt):**
```typescript
const hash = await bcrypt.hash(password, 10)
const ok = await bcrypt.compare(plain, hashFromDb)
```

**JWT 발급/검증:**
```typescript
const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' })
const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
```

**인증 미들웨어:**
```typescript
export const requireAuth = (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'NO_TOKEN' })
  try {
    const { userId } = jwt.verify(auth.slice(7), process.env.JWT_SECRET!)
    req.userId = userId
    next()
  } catch {
    return res.status(401).json({ error: 'INVALID_TOKEN' })
  }
}
```

→ 모든 보호된 라우터에서 `where: { userId: req.userId }` 필수. 안 걸면 남의 데이터가 보임.

### 5.3 프론트엔드 핵심 조각

**`useApi` (fetch 래퍼):**
```typescript
export const useApi = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem('token')
  const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })
  if (res.status === 401) {
    localStorage.removeItem('token')
    window.location.href = '/login'
    throw new Error('Unauthorized')
  }
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'API Error')
  return data
}
```

**`useAuthStore`:**
- `user`, `isLoggedIn` 상태
- `handleLogin`, `handleLogout`, `handleFetchMe` 액션
- 토큰은 localStorage에 영속 저장
- 앱 시작 시 `handleFetchMe`로 토큰 유효성 + 사용자 정보 복원

**라우터 가드:**
```typescript
router.beforeEach((to) => {
  const { isLoggedIn } = useAuthStore()
  if (to.meta.requiresAuth && !isLoggedIn.value) return '/login'
})
```

---

## 6. 프론트엔드 구조

### 6.1 페이지 목록

| 페이지 | 경로 | 인증 | 핵심 ispark-ui 컴포넌트 |
|---|---|---|---|
| LoginPage | `/login` | ❌ | UiInput, UiButton, UiToast |
| RegisterPage | `/register` | ❌ | UiInput, UiButton, UiToast |
| TodoListPage | `/todos` (메인) | ✅ | UiTable, UiCheckbox, UiBadge, UiButton, UiSelect, UiTab |
| TodoFormModal | (모달) | ✅ | UiModal, UiInput, UiTextarea, UiSelect, UiDatePicker |
| CategoryManageModal | (모달) | ✅ | UiModal, UiInput, UiButton, UiBadge |

### 6.2 컴포넌트 트리

```
App.vue
├── router-view
│   ├── LoginPage / RegisterPage
│   │
│   └── (인증 영역)
│       ├── AppHeader            ← 로고 + 사용자 메뉴
│       └── TodoListPage
│           ├── CategorySidebar
│           │   └── CategoryItem (반복)
│           ├── TodoToolbar      ← 탭 + 새 할 일 버튼
│           ├── TodoList
│           │   └── TodoItem (반복)
│           └── (모달들)
│               ├── TodoFormModal
│               └── CategoryManageModal
```

### 6.3 상태 관리 (composable 패턴, Pinia 미사용)

```
composables/
├── useApi.ts                ← fetch 래퍼 (인증/401 자동)
├── useAuthStore.ts          ← 로그인 상태
├── useCategoryApi.ts        ← API 호출 (fetch~)
├── useCategoryStore.ts      ← 상태 + 액션 (handle~)
├── useTodoApi.ts            ← API 호출 (fetch~)
└── useTodoStore.ts          ← 상태 + 액션 (handle~)
```

**Api ↔ Store 책임 분리:**
- `Api`: "어떻게 보낼지" (fetch, query string 조립)
- `Store`: "언제/왜 보낼지" (상태 변경, 후속 처리, 토스트, confirm)

**함수명 컨벤션 (기존 프로젝트 룰):**
- `fetch~` API 호출 함수
- `handle~` store 액션 (API + 상태)
- `on~` 이벤트 핸들러 / emit
- `do~` confirm 후 실행
- `open~` 모달 열기
- `is~`/`has~` boolean
- `toggle~` on/off 전환

---

## 7. 마일스톤 로드맵

### M0 · 세팅 (1주차)

| # | 작업 | 학습 포인트 |
|---|---|---|
| 0.1 | 모노레포 + workspaces 세팅 | npm workspaces |
| 0.2 | `backend/`에 Express + TypeScript 부팅, `GET /health` | Express 부트스트랩 |
| 0.3 | `frontend/`에 Vite + Vue3 + ispark-ui 설치 | 라이브러리 import |
| 0.4 | `useApi`로 `/health` 호출 → 화면 표시 | CORS 첫 경험 |
| 0.5 | `concurrently`로 `npm run dev` 한 줄에 둘 다 기동 | 모노레포 활용 |

**체크포인트**: 버튼 클릭 → 백엔드 메시지 받아와 화면 표시.

### M1 · 인증 (2~3주차)

| # | 작업 | 학습 포인트 |
|---|---|---|
| 1.1 | Prisma 세팅 + User 모델 + `migrate dev` | 마이그레이션 컨셉 |
| 1.2 | `POST /api/auth/register` (bcrypt) | 비밀번호 해싱 |
| 1.3 | `POST /api/auth/login` (JWT 발급) | JWT 구조 |
| 1.4 | `requireAuth` 미들웨어 + `GET /api/auth/me` | 미들웨어 패턴 |
| 1.5 | RegisterPage + LoginPage (ispark-ui) | UiInput, UiButton |
| 1.6 | `useAuthStore` (localStorage + token) | 전역 상태 + 영속성 |
| 1.7 | 라우터 가드 + 새로고침 시 `handleFetchMe` | meta.requiresAuth, F5 복원 |
| 1.8 | 헤더에 사용자 이름 + 로그아웃 | computed + 이벤트 |

**체크포인트**: 가입 → 로그아웃 → 로그인 → F5 → 로그인 유지.

### M2 · Todo + 카테고리 (4~5주차)

| # | 작업 | 학습 포인트 |
|---|---|---|
| 2.1 | Prisma에 Category, Todo 추가 + 마이그레이션 | 관계 (1:N), 인덱스, onDelete |
| 2.2 | `/api/categories` CRUD 4개 라우트 | RESTful 4종 세트 |
| 2.3 | `useCategoryApi` + `useCategoryStore` | Api/Store 분리 |
| 2.4 | CategoryManageModal (UiModal) | 모달 + 폼 검증 |
| 2.5 | `/api/todos` CRUD + query 필터 | 필터 query string |
| 2.6 | `PATCH /api/todos/:id/toggle` | PATCH, 부분 업데이트 |
| 2.7 | `useTodoApi` + `useTodoStore` (필터 상태) | URLSearchParams, 상태↔쿼리 |
| 2.8 | TodoListPage 조립 | 컴포넌트 합성 |
| 2.9 | TodoFormModal (추가/수정 겸용) | mode 분기, DatePicker, Select |
| 2.10 | 빈 상태 (UiEmpty) + 로딩 (UiLoading) | 상태별 UI 4종 세트 |

**체크포인트**: 카테고리 생성 → 할 일 추가 → 카테고리로 필터 → 토글 → 삭제.

### M3+ · 졸업 후 옵션 (욕심 나면)

| 옵션 | 가치 | 난이도 |
|---|---|---|
| 검색 + 페이지네이션 | 실무 80% | ⭐⭐ |
| 배포 (Vercel + Railway/Fly) | 인터넷 공개 | ⭐⭐⭐ |
| Refresh Token | JWT 자동 갱신 | ⭐⭐⭐ |
| 이미지 업로드 (avatar) | multipart/form-data | ⭐⭐⭐ |
| 다크모드 | ispark-ui CSS 변수 활용 | ⭐ |
| 통계 차트 | Chart.js | ⭐⭐ |
| PostgreSQL 이전 | Prisma datasource 한 줄 | ⭐ |
| 테스트 작성 | Vitest, Storybook play | ⭐⭐ |

---

## 8. 위험 포인트 (미리 알면 안 막힘)

| 함정 | 증상 | 해결 |
|---|---|---|
| CORS | "blocked by CORS policy" | `app.use(cors({ origin: 'http://localhost:5173' }))` |
| 토큰 직접 fetch | 모든 API 401 | `useApi` 통해서만 호출 |
| 새로고침 시 로그아웃 | F5 누르면 user 사라짐 | `App.vue onMounted`에서 `handleFetchMe()` |
| JWT_SECRET 누락 | 서버 크래시 또는 검증 실패 | `.env`에 긴 시크릿 문자열 필수 |
| bcrypt 인자 순서 실수 | 항상 로그인 실패 | `bcrypt.compare(평문, 해시)` |
| 마이그레이션 누락 | 스키마 변경 후 Prisma 에러 | 매번 `migrate dev` 실행 |
| `req.userId` 누락 | 남의 데이터까지 보임 | 모든 보호 라우터에서 `where: { userId }` 필수 |
| `VITE_` 접두사 누락 | 프론트 env 안 읽힘 | `VITE_API_URL` 처럼 접두사 필수 |

---

## 9. 학습 포인트 요약 (M2 졸업 시점 자력 가능 항목)

### 백엔드
- Express 라우팅 + 미들웨어 패턴
- Prisma 스키마 작성 + 마이그레이션
- 관계 모델 (1:N), 인덱스, onDelete 정책
- bcrypt 해싱
- JWT 발급/검증
- HTTP 상태 코드 (200/400/401/403/404/500) 의미와 사용
- REST 컨벤션 (명사 URL, 메서드로 동작 표현)
- 환경변수 관리

### 프론트엔드
- Vue 3 Composition API
- composable 패턴으로 전역 상태 관리 (Pinia 없이)
- Api/Store 책임 분리
- 함수명 컨벤션 (fetch~ / handle~ / on~ / open~)
- fetch 래퍼 패턴 (인증/401 자동)
- Vue Router + 라우터 가드
- 모달 상태 관리 (`isXxxOpen`)
- 폼 유효성 + 토스트 + 포커스 이동
- URLSearchParams로 query string 조립
- ispark-ui 컴포넌트 사용법

### 통합
- 프론트엔드 ↔ 백엔드 통신의 전 과정 (CORS, 헤더, 인증, 에러)
- 모노레포 구조와 협업 패턴
- 환경별 설정 (.env)

---

## 10. 권장 페이스

| 시기 | 마일스톤 | 핵심 질문 |
|---|---|---|
| 1주차 | M0 | "통신이 되나?" |
| 2~3주차 | M1 | "로그인이 되나?" |
| 4~5주차 | M2 | "내 데이터가 보이나?" |

> 풀타임이면 2~3주로 압축 가능. 퇴근 후/주말 페이스 기준 5주.

**철칙**: 30분 이상 막히면 AI나 선임에게 즉시 질문. 1시간 넘기면 학습 곡선이 꺾인다.
