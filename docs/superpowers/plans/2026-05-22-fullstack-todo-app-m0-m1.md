# 풀스택 Todo 앱 — Plan A (M0 세팅 + M1 인증) 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ispark-ui를 활용해 모노레포 구조의 풀스택 환경을 세팅하고, JWT 기반 회원가입/로그인을 구현해 "로그인되는 앱"까지 완성한다.

**Architecture:** npm workspaces 모노레포 (frontend = Vue 3 + ispark-ui, backend = Express + Prisma + SQLite). 인증은 JWT를 localStorage에 저장하고, frontend의 `useApi` 래퍼가 모든 요청에 자동 첨부 + 401 자동 처리.

**Tech Stack:**
- Frontend: Vue 3, TypeScript, Vite, vue-router, `@leechanyong/ispark-ui`
- Backend: Node.js, Express, TypeScript, Prisma, SQLite, bcrypt, jsonwebtoken
- Dev: concurrently, tsx

**참고 디자인 문서:** `docs/superpowers/specs/2026-05-22-fullstack-todo-app-design.md`

**메모:** npm publish된 `@leechanyong/ispark-ui` 최신 버전은 0.2.0 (확인 시점 2026-05-22). 로컬 저장소는 0.5.0. 만약 필요한 컴포넌트가 0.2.0에 없으면 ispark-ui 저장소에서 `npm publish`로 0.5.0 배포 후 사용. Plan A에서는 `UiButton`, `UiInput`, `UiToast`만 사용하므로 0.2.0으로 충분할 가능성 높음.

---

## 파일 구조 (Plan A 종료 시점)

```
my-todo-app/
├── package.json                  ← workspaces 루트, dev 스크립트
├── .gitignore
├── README.md
│
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                      ← DATABASE_URL, JWT_SECRET, PORT
│   ├── .env.example
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── dev.db                ← gitignore
│   └── src/
│       ├── index.ts              ← Express 부트스트랩, cors, 라우터 마운트
│       ├── lib/
│       │   └── prisma.ts         ← PrismaClient 싱글톤
│       ├── middleware/
│       │   └── auth.ts           ← requireAuth (JWT 검증)
│       ├── routes/
│       │   └── auth.ts           ← /register, /login, /me
│       └── types/
│           └── express.d.ts      ← Request에 userId 타입 확장
│
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.app.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── index.html
    ├── .env                      ← VITE_API_URL
    ├── .env.example
    └── src/
        ├── main.ts               ← Vue 부트스트랩, router, ispark-ui CSS
        ├── App.vue
        ├── router/
        │   └── index.ts          ← 라우트 정의 + 가드
        ├── pages/
        │   ├── LoginPage.vue
        │   ├── RegisterPage.vue
        │   └── TodoListPage.vue  ← placeholder (M2에서 본격 구현)
        ├── components/
        │   └── AppHeader.vue
        ├── composables/
        │   ├── useApi.ts
        │   └── useAuthStore.ts
        └── types/
            └── user.ts
```

---

## Task 1: 모노레포 루트 세팅

**Files:**
- Create: `package.json`, `.gitignore`, `README.md`

- [ ] **Step 1: 프로젝트 폴더 생성 및 이동**

```bash
mkdir my-todo-app
cd my-todo-app
git init
```

- [ ] **Step 2: 루트 `package.json` 작성**

```json
{
  "name": "my-todo-app",
  "version": "0.1.0",
  "private": true,
  "workspaces": ["frontend", "backend"],
  "scripts": {
    "dev": "echo '아직 frontend/backend가 없습니다. Task 5에서 채워집니다.'"
  }
}
```

- [ ] **Step 3: `.gitignore` 작성**

```
# dependencies
node_modules/

# build outputs
dist/
build/

# env
.env
*.local

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Prisma SQLite
backend/prisma/dev.db
backend/prisma/dev.db-journal

# logs
*.log
```

- [ ] **Step 4: `README.md` 최소 작성**

```markdown
# My Todo App

ispark-ui로 만드는 풀스택 Todo 앱.

## 개발

```bash
npm install
npm run dev
```

## 구조

- `frontend/` Vue 3 + ispark-ui (포트 5173)
- `backend/` Express + Prisma + SQLite (포트 3000)
```

- [ ] **Step 5: 첫 커밋**

```bash
git add .
git commit -m "chore: 모노레포 초기 세팅"
```

---

## Task 2: 백엔드 부트스트랩 (`/health` 라우트)

**Files:**
- Create: `backend/package.json`, `backend/tsconfig.json`, `backend/src/index.ts`, `backend/.env`, `backend/.env.example`

- [ ] **Step 1: 백엔드 폴더 생성 및 패키지 설치**

```bash
mkdir -p backend/src
cd backend
npm init -y
npm install express cors
npm install -D typescript @types/express @types/cors @types/node tsx
cd ..
```

- [ ] **Step 2: `backend/package.json`을 다음 내용으로 덮어쓰기**

```json
{
  "name": "backend",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.21.0"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^5.0.0",
    "@types/node": "^22.0.0",
    "tsx": "^4.19.0",
    "typescript": "^5.6.0"
  }
}
```

> 설치된 실제 버전이 다를 수 있으니 `npm install` 다시 한 번 실행해서 lockfile 정렬.

- [ ] **Step 3: `backend/tsconfig.json` 작성**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "types": ["node"]
  },
  "include": ["src/**/*"]
}
```

- [ ] **Step 4: `backend/.env.example` 작성**

```
PORT=3000
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="여기에_긴_랜덤_문자열_넣기"
```

- [ ] **Step 5: `backend/.env` 작성 (실제 값)**

```
PORT=3000
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="dev_secret_change_me_to_long_random_string_32chars_min"
```

- [ ] **Step 6: `backend/src/index.ts` 작성**

```typescript
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = Number(process.env.PORT ?? 3000)

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true, message: 'Backend is alive', time: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`[backend] listening on http://localhost:${PORT}`)
})
```

- [ ] **Step 7: 백엔드 기동 확인**

```bash
cd backend
npm run dev
```

다른 터미널에서:
```bash
curl http://localhost:3000/health
```

Expected: `{"ok":true,"message":"Backend is alive","time":"..."}`

- [ ] **Step 8: 커밋**

```bash
cd ..
git add backend/ .gitignore
git commit -m "feat(backend): Express 부트스트랩 + /health 라우트"
```

---

## Task 3: 프론트엔드 부트스트랩 (Vue + ispark-ui)

**Files:**
- Create: `frontend/package.json`, `frontend/index.html`, `frontend/vite.config.ts`, `frontend/tsconfig.json`, `frontend/tsconfig.app.json`, `frontend/tsconfig.node.json`, `frontend/src/main.ts`, `frontend/src/App.vue`, `frontend/.env`, `frontend/.env.example`

- [ ] **Step 1: Vite로 Vue + TS 템플릿 생성**

```bash
npm create vite@latest frontend -- --template vue-ts
cd frontend
npm install
```

- [ ] **Step 2: ispark-ui 및 peer dependency 설치**

```bash
npm install @leechanyong/ispark-ui radix-vue @internationalized/date
```

> 메모: ispark-ui의 peerDependencies에 `vue`, `radix-vue`, `@internationalized/date`가 있음. Vue는 템플릿에 이미 포함.

- [ ] **Step 3: `frontend/.env.example` 작성**

```
VITE_API_URL=http://localhost:3000
```

- [ ] **Step 4: `frontend/.env` 작성**

```
VITE_API_URL=http://localhost:3000
```

- [ ] **Step 5: `frontend/src/main.ts` 수정 (ispark-ui CSS import)**

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import '@leechanyong/ispark-ui/style.css'
import './style.css'

createApp(App).mount('#app')
```

- [ ] **Step 6: `frontend/src/App.vue` 작성 (UiButton 띄우기)**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { UiButton } from '@leechanyong/ispark-ui'

const count = ref(0)
const onClick = () => { count.value++ }
</script>

<template>
  <div style="padding: 40px; font-family: sans-serif;">
    <h1>My Todo App — Frontend 부트스트랩 OK</h1>
    <p>버튼 누른 횟수: {{ count }}</p>
    <UiButton @click="onClick">클릭</UiButton>
  </div>
</template>
```

- [ ] **Step 7: 프론트엔드 기동 확인**

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 열고:
- "My Todo App — Frontend 부트스트랩 OK" 제목 보이는지 확인
- 버튼 클릭 시 카운트 증가하는지 확인
- 버튼이 ispark-ui 스타일(둥근 모서리, 색)로 보이는지 확인

> 만약 `UiButton`이 export 안 되어 있으면 0.2.0에 없는 컴포넌트일 수 있음. 그 경우 ispark-ui 저장소에서 `npm run build && npm publish`로 최신 배포 후 재시도.

- [ ] **Step 8: 커밋**

```bash
cd ..
git add frontend/
git commit -m "feat(frontend): Vite + Vue 3 + ispark-ui 부트스트랩"
```

---

## Task 4: CORS 통과 + `useApi` + `/health` 연결

**Files:**
- Create: `frontend/src/composables/useApi.ts`
- Modify: `frontend/src/App.vue`

- [ ] **Step 1: `frontend/src/composables/useApi.ts` 작성**

```typescript
const API_URL = import.meta.env.VITE_API_URL as string

export const useApi = async <T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = localStorage.getItem('token')

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  // 401이면 자동 로그아웃 + 로그인 페이지로
  if (res.status === 401) {
    localStorage.removeItem('token')
    if (window.location.pathname !== '/login') {
      window.location.href = '/login'
    }
    throw new Error('Unauthorized')
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = (data as { message?: string }).message ?? `HTTP ${res.status}`
    throw new Error(message)
  }
  return data as T
}
```

- [ ] **Step 2: `frontend/src/App.vue` 수정 (useApi로 /health 호출)**

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { UiButton } from '@leechanyong/ispark-ui'
import { useApi } from './composables/useApi'

interface HealthResponse {
  ok: boolean
  message: string
  time: string
}

const health = ref<HealthResponse | null>(null)
const error = ref<string | null>(null)

const handleCheckHealth = async () => {
  error.value = null
  try {
    health.value = await useApi<HealthResponse>('/health')
  } catch (e) {
    error.value = (e as Error).message
  }
}

onMounted(handleCheckHealth)
</script>

<template>
  <div style="padding: 40px; font-family: sans-serif;">
    <h1>My Todo App</h1>
    <div v-if="health" style="color: green;">
      ✅ 서버 응답: {{ health.message }} ({{ health.time }})
    </div>
    <div v-else-if="error" style="color: red;">
      ❌ 에러: {{ error }}
    </div>
    <div v-else>로딩 중...</div>
    <UiButton @click="handleCheckHealth">다시 확인</UiButton>
  </div>
</template>
```

- [ ] **Step 3: 양쪽 기동 후 브라우저 확인**

터미널 1:
```bash
cd backend && npm run dev
```

터미널 2:
```bash
cd frontend && npm run dev
```

브라우저 `http://localhost:5173`:
- 페이지 진입 시 "✅ 서버 응답: Backend is alive ..." 표시되면 성공
- 만약 "❌ 에러: Failed to fetch" 또는 CORS 에러 뜨면 → `backend/src/index.ts`의 `cors()` 옵션 확인

- [ ] **Step 4: 커밋**

```bash
git add frontend/
git commit -m "feat(frontend): useApi 래퍼 + /health 연결 성공"
```

✅ **M0 체크포인트 (Task 1~4)**: frontend ↔ backend 통신 OK. 풀스택 첫 관문 통과.

---

## Task 5: 동시 실행 (concurrently)

**Files:**
- Modify: 루트 `package.json`

- [ ] **Step 1: 루트에 concurrently 설치**

```bash
npm install -D concurrently -w .
```

> `-w .`은 루트 workspace를 의미. 만약 에러나면 그냥 루트에서 `npm install -D concurrently`.

- [ ] **Step 2: 루트 `package.json` 수정**

```json
{
  "name": "my-todo-app",
  "version": "0.1.0",
  "private": true,
  "workspaces": ["frontend", "backend"],
  "scripts": {
    "dev": "concurrently -k -n FE,BE -c blue,magenta \"npm run dev -w frontend\" \"npm run dev -w backend\"",
    "dev:fe": "npm run dev -w frontend",
    "dev:be": "npm run dev -w backend"
  },
  "devDependencies": {
    "concurrently": "^9.0.0"
  }
}
```

- [ ] **Step 3: 동시 실행 확인**

```bash
npm run dev
```

- 한 터미널에서 FE(파란색)와 BE(자홍색) 로그가 동시에 나오는지 확인
- 브라우저 `http://localhost:5173`에서 정상 동작 확인
- `Ctrl+C` 한 번에 둘 다 종료되는지 확인

- [ ] **Step 4: 커밋**

```bash
git add package.json package-lock.json
git commit -m "chore: concurrently로 npm run dev 한 줄에 frontend+backend 동시 실행"
```

✅ **M0 완료**: 세팅 끝. 이제 인증 시작.

---

## Task 6: Prisma + User 모델 마이그레이션

**Files:**
- Create: `backend/prisma/schema.prisma`, `backend/src/lib/prisma.ts`

- [ ] **Step 1: Prisma 설치**

```bash
cd backend
npm install -D prisma
npm install @prisma/client
```

- [ ] **Step 2: Prisma 초기화**

```bash
npx prisma init --datasource-provider sqlite
```

→ `prisma/schema.prisma`와 `.env`의 `DATABASE_URL` 자동 생성됨. 이미 `.env`에 있으면 덮어쓰지 말 것.

- [ ] **Step 3: `backend/prisma/schema.prisma` 작성**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
}
```

> User만 우선. Category/Todo는 Plan B에서 추가.

- [ ] **Step 4: 마이그레이션 실행**

```bash
npx prisma migrate dev --name init_user
```

기대 출력:
- `prisma/migrations/<timestamp>_init_user/migration.sql` 생성
- `Prisma Client 생성 완료` 메시지
- `prisma/dev.db` 파일 생성됨

- [ ] **Step 5: `backend/src/lib/prisma.ts` 작성 (싱글톤)**

```typescript
import { PrismaClient } from '@prisma/client'

// 개발 중 HMR로 인한 다중 인스턴스 방지
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

- [ ] **Step 6: Prisma Studio로 확인**

```bash
npx prisma studio
```

브라우저 `http://localhost:5555`에서 `User` 테이블(비어있음) 보이면 성공. 종료는 `Ctrl+C`.

- [ ] **Step 7: 커밋**

```bash
cd ..
git add backend/
git commit -m "feat(backend): Prisma 세팅 + User 모델 초기 마이그레이션"
```

---

## Task 7: 회원가입 API (`POST /api/auth/register`)

**Files:**
- Create: `backend/src/routes/auth.ts`
- Modify: `backend/src/index.ts`

- [ ] **Step 1: bcrypt + jsonwebtoken 설치**

```bash
cd backend
npm install bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken
cd ..
```

> `bcryptjs`는 순수 JS (네이티브 빌드 X)라 Windows에서도 트러블 없음.

- [ ] **Step 2: `backend/src/routes/auth.ts` 작성**

```typescript
import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma.js'

const router = Router()

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body as {
    email?: string
    password?: string
    name?: string
  }

  if (!email || !password || !name) {
    return res.status(400).json({
      error: 'MISSING_FIELDS',
      message: '이메일, 비밀번호, 이름은 필수입니다.',
    })
  }

  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) {
    return res.status(400).json({
      error: 'EMAIL_TAKEN',
      message: '이미 사용 중인 이메일입니다.',
    })
  }

  const hash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { email, password: hash, name },
    select: { id: true, email: true, name: true, createdAt: true },
  })

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  )

  return res.json({ user, token })
})

export default router
```

- [ ] **Step 3: `backend/src/index.ts` 수정 — 라우터 마운트**

```typescript
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'

const app = express()
const PORT = Number(process.env.PORT ?? 3000)

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true, message: 'Backend is alive', time: new Date().toISOString() })
})

app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.log(`[backend] listening on http://localhost:${PORT}`)
})
```

- [ ] **Step 4: curl로 회원가입 테스트**

`npm run dev`로 백엔드 기동 후:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@test.com\",\"password\":\"pw1234\",\"name\":\"홍길동\"}"
```

Expected: `{"user":{"id":"c...","email":"test@test.com","name":"홍길동","createdAt":"..."},"token":"eyJ..."}`

같은 이메일로 한 번 더 호출 → `{"error":"EMAIL_TAKEN", ...}` (HTTP 400)

- [ ] **Step 5: Prisma Studio로 User 생성 확인**

```bash
cd backend && npx prisma studio
```

→ `User` 테이블에 row 1개. `password`가 `$2a$10$...` 같은 bcrypt 해시인지 확인.

- [ ] **Step 6: 커밋**

```bash
cd .. && git add backend/
git commit -m "feat(backend): POST /api/auth/register — bcrypt 해싱 + JWT 발급"
```

---

## Task 8: 로그인 API (`POST /api/auth/login`)

**Files:**
- Modify: `backend/src/routes/auth.ts`

- [ ] **Step 1: `backend/src/routes/auth.ts`에 로그인 라우트 추가**

기존 파일 끝의 `export default router` 위에 다음 추가:

```typescript
router.post('/login', async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string }

  if (!email || !password) {
    return res.status(400).json({
      error: 'MISSING_FIELDS',
      message: '이메일과 비밀번호는 필수입니다.',
    })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(401).json({
      error: 'INVALID_CREDENTIALS',
      message: '이메일 또는 비밀번호가 일치하지 않습니다.',
    })
  }

  const ok = await bcrypt.compare(password, user.password)
  if (!ok) {
    return res.status(401).json({
      error: 'INVALID_CREDENTIALS',
      message: '이메일 또는 비밀번호가 일치하지 않습니다.',
    })
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  )

  return res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    },
    token,
  })
})
```

- [ ] **Step 2: curl로 로그인 테스트**

올바른 비밀번호:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@test.com\",\"password\":\"pw1234\"}"
```

Expected: `{"user":{...},"token":"eyJ..."}`

잘못된 비밀번호:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@test.com\",\"password\":\"wrong\"}"
```

Expected: HTTP 401, `{"error":"INVALID_CREDENTIALS", ...}`

존재하지 않는 이메일도 같은 401 메시지 (보안: "이메일이 없음"과 "비번 틀림"을 구별해주면 안 됨).

- [ ] **Step 3: 토큰 디코딩 확인 (학습)**

받은 token을 https://jwt.io 에 붙여넣고:
- header: `{"alg":"HS256","typ":"JWT"}`
- payload: `{"userId":"c...","iat":...,"exp":...}`
- exp - iat = 604800 (7일 = 7×24×60×60초)

> 학습 메모: JWT의 payload는 base64 디코딩만 하면 누구나 읽을 수 있다. **비밀번호 같은 민감정보를 payload에 넣지 마라.** Signature 덕에 위조는 못 하지만 내용은 평문이다.

- [ ] **Step 4: 커밋**

```bash
git add backend/
git commit -m "feat(backend): POST /api/auth/login — bcrypt.compare + JWT 발급"
```

---

## Task 9: 인증 미들웨어 + `GET /api/auth/me`

**Files:**
- Create: `backend/src/middleware/auth.ts`, `backend/src/types/express.d.ts`
- Modify: `backend/src/routes/auth.ts`, `backend/tsconfig.json`

- [ ] **Step 1: `backend/src/types/express.d.ts` 작성 (req.userId 타입 확장)**

```typescript
import 'express'

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string
  }
}
```

- [ ] **Step 2: `backend/tsconfig.json` 수정 — types 폴더 포함 확인**

`include` 배열에 `"src/**/*"`가 있으면 자동 포함되어 OK. 만약 안 잡히면 다음으로 명시:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "types": ["node"]
  },
  "include": ["src/**/*", "src/types/**/*.d.ts"]
}
```

- [ ] **Step 3: `backend/src/middleware/auth.ts` 작성**

```typescript
import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'NO_TOKEN',
      message: '인증 토큰이 필요합니다.',
    })
  }

  const token = authHeader.slice('Bearer '.length)

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string
    }
    req.userId = payload.userId
    next()
  } catch {
    return res.status(401).json({
      error: 'INVALID_TOKEN',
      message: '토큰이 유효하지 않거나 만료되었습니다.',
    })
  }
}
```

- [ ] **Step 4: `backend/src/routes/auth.ts` 수정 — `/me` 라우트 추가**

기존 파일에 다음 import 추가:
```typescript
import { requireAuth } from '../middleware/auth.js'
```

`export default router` 위에 다음 추가:
```typescript
router.get('/me', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, email: true, name: true, createdAt: true },
  })

  if (!user) {
    return res.status(401).json({
      error: 'USER_NOT_FOUND',
      message: '사용자를 찾을 수 없습니다.',
    })
  }

  return res.json({ user })
})
```

- [ ] **Step 5: curl로 3가지 케이스 테스트**

먼저 로그인해서 토큰 받기:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@test.com\",\"password\":\"pw1234\"}"
```

(1) 토큰 없이 호출:
```bash
curl http://localhost:3000/api/auth/me
```
Expected: HTTP 401, `{"error":"NO_TOKEN", ...}`

(2) 잘못된 토큰:
```bash
curl http://localhost:3000/api/auth/me -H "Authorization: Bearer invalid_token"
```
Expected: HTTP 401, `{"error":"INVALID_TOKEN", ...}`

(3) 유효한 토큰:
```bash
curl http://localhost:3000/api/auth/me -H "Authorization: Bearer eyJ...실제토큰..."
```
Expected: `{"user":{"id":"...","email":"test@test.com","name":"홍길동","createdAt":"..."}}`

- [ ] **Step 6: 커밋**

```bash
git add backend/
git commit -m "feat(backend): requireAuth 미들웨어 + GET /api/auth/me"
```

✅ **백엔드 인증 완성.** 이제 프론트 작업.

---

## Task 10: vue-router + 페이지 골격

**Files:**
- Create: `frontend/src/router/index.ts`, `frontend/src/pages/LoginPage.vue`, `frontend/src/pages/RegisterPage.vue`, `frontend/src/pages/TodoListPage.vue`
- Modify: `frontend/src/main.ts`, `frontend/src/App.vue`

- [ ] **Step 1: vue-router 설치**

```bash
cd frontend
npm install vue-router
cd ..
```

- [ ] **Step 2: `frontend/src/router/index.ts` 작성**

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import TodoListPage from '../pages/TodoListPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/todos' },
    { path: '/login', component: LoginPage, meta: { requiresAuth: false } },
    { path: '/register', component: RegisterPage, meta: { requiresAuth: false } },
    { path: '/todos', component: TodoListPage, meta: { requiresAuth: true } },
  ],
})

// 가드는 Task 12에서 추가
export default router
```

- [ ] **Step 3: `frontend/src/main.ts` 수정 — router 등록**

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@leechanyong/ispark-ui/style.css'
import './style.css'

createApp(App).use(router).mount('#app')
```

- [ ] **Step 4: `frontend/src/App.vue` 수정 — router-view만 남기기**

```vue
<template>
  <router-view />
</template>
```

- [ ] **Step 5: `frontend/src/pages/LoginPage.vue` 작성 (UI만, 동작은 Task 11)**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { UiButton, UiInput } from '@leechanyong/ispark-ui'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const onSubmit = () => {
  console.log('TODO Task 11: 로그인 처리', email.value, password.value)
}

const goRegister = () => router.push('/register')
</script>

<template>
  <div style="max-width: 360px; margin: 80px auto; padding: 24px; font-family: sans-serif;">
    <h1>로그인</h1>
    <form @submit.prevent="onSubmit" style="display: flex; flex-direction: column; gap: 12px;">
      <UiInput v-model="email" placeholder="이메일" type="email" />
      <UiInput v-model="password" placeholder="비밀번호" type="password" />
      <UiButton type="submit" variant="primary">로그인</UiButton>
      <UiButton type="button" variant="ghost" @click="goRegister">회원가입</UiButton>
    </form>
  </div>
</template>
```

- [ ] **Step 6: `frontend/src/pages/RegisterPage.vue` 작성**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { UiButton, UiInput } from '@leechanyong/ispark-ui'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const name = ref('')

const onSubmit = () => {
  console.log('TODO Task 11: 회원가입 처리', email.value, password.value, name.value)
}

const goLogin = () => router.push('/login')
</script>

<template>
  <div style="max-width: 360px; margin: 80px auto; padding: 24px; font-family: sans-serif;">
    <h1>회원가입</h1>
    <form @submit.prevent="onSubmit" style="display: flex; flex-direction: column; gap: 12px;">
      <UiInput v-model="name" placeholder="이름" />
      <UiInput v-model="email" placeholder="이메일" type="email" />
      <UiInput v-model="password" placeholder="비밀번호 (6자 이상)" type="password" />
      <UiButton type="submit" variant="primary">가입하기</UiButton>
      <UiButton type="button" variant="ghost" @click="goLogin">로그인으로 돌아가기</UiButton>
    </form>
  </div>
</template>
```

- [ ] **Step 7: `frontend/src/pages/TodoListPage.vue` 작성 (placeholder)**

```vue
<script setup lang="ts">
import { UiButton } from '@leechanyong/ispark-ui'
</script>

<template>
  <div style="padding: 40px; font-family: sans-serif;">
    <h1>📝 할 일 목록</h1>
    <p>여기는 M2(Plan B)에서 본격적으로 만들 예정입니다.</p>
    <UiButton>임시</UiButton>
  </div>
</template>
```

- [ ] **Step 8: 브라우저 확인**

`npm run dev` (루트에서)로 둘 다 기동:
- `http://localhost:5173/login` → 로그인 폼
- `http://localhost:5173/register` → 회원가입 폼
- `http://localhost:5173/todos` → "할 일 목록" placeholder (아직 가드 없으니 누구나 접근 가능)

> 만약 `UiInput`이 export 안 되어있다고 에러나면 0.2.0에 없을 수 있음. 그 경우 ispark-ui 저장소에서 publish 후 재시도.

- [ ] **Step 9: 커밋**

```bash
git add frontend/
git commit -m "feat(frontend): vue-router + Login/Register/TodoList 페이지 골격"
```

---

## Task 11: 타입 정의 + `useAuthStore` (로그인/회원가입 동작)

**Files:**
- Create: `frontend/src/types/user.ts`, `frontend/src/composables/useAuthStore.ts`
- Modify: `frontend/src/pages/LoginPage.vue`, `frontend/src/pages/RegisterPage.vue`

- [ ] **Step 1: `frontend/src/types/user.ts` 작성**

```typescript
export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface AuthResponse {
  user: User
  token: string
}
```

- [ ] **Step 2: `frontend/src/composables/useAuthStore.ts` 작성**

```typescript
import { ref, computed } from 'vue'
import { useApi } from './useApi'
import type { User, AuthResponse } from '../types/user'

// 모듈 스코프 ref → composable 호출자들 간 상태 공유
const user = ref<User | null>(null)
const isLoggedIn = computed(() => user.value !== null)

const TOKEN_KEY = 'token'

const handleRegister = async (email: string, password: string, name: string) => {
  const res = await useApi<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  })
  localStorage.setItem(TOKEN_KEY, res.token)
  user.value = res.user
}

const handleLogin = async (email: string, password: string) => {
  const res = await useApi<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  localStorage.setItem(TOKEN_KEY, res.token)
  user.value = res.user
}

const handleLogout = () => {
  localStorage.removeItem(TOKEN_KEY)
  user.value = null
}

const handleFetchMe = async () => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) return
  try {
    const res = await useApi<{ user: User }>('/api/auth/me')
    user.value = res.user
  } catch {
    // 토큰 만료/무효 → useApi가 자동 로그아웃 처리
    user.value = null
  }
}

export const useAuthStore = () => ({
  user,
  isLoggedIn,
  handleRegister,
  handleLogin,
  handleLogout,
  handleFetchMe,
})
```

- [ ] **Step 3: `frontend/src/pages/LoginPage.vue` 수정 — 실제 로그인**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { UiButton, UiInput } from '@leechanyong/ispark-ui'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../composables/useAuthStore'

const router = useRouter()
const { handleLogin } = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const onSubmit = async () => {
  errorMessage.value = ''
  if (!email.value || !password.value) {
    errorMessage.value = '이메일과 비밀번호를 입력하세요.'
    return
  }
  isSubmitting.value = true
  try {
    await handleLogin(email.value, password.value)
    router.push('/todos')
  } catch (e) {
    errorMessage.value = (e as Error).message
  } finally {
    isSubmitting.value = false
  }
}

const goRegister = () => router.push('/register')
</script>

<template>
  <div style="max-width: 360px; margin: 80px auto; padding: 24px; font-family: sans-serif;">
    <h1>로그인</h1>
    <form @submit.prevent="onSubmit" style="display: flex; flex-direction: column; gap: 12px;">
      <UiInput v-model="email" placeholder="이메일" type="email" />
      <UiInput v-model="password" placeholder="비밀번호" type="password" />
      <div v-if="errorMessage" style="color: red; font-size: 14px;">{{ errorMessage }}</div>
      <UiButton type="submit" variant="primary" :disabled="isSubmitting">
        {{ isSubmitting ? '로그인 중...' : '로그인' }}
      </UiButton>
      <UiButton type="button" variant="ghost" @click="goRegister">회원가입</UiButton>
    </form>
  </div>
</template>
```

- [ ] **Step 4: `frontend/src/pages/RegisterPage.vue` 수정 — 실제 회원가입**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { UiButton, UiInput } from '@leechanyong/ispark-ui'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../composables/useAuthStore'

const router = useRouter()
const { handleRegister } = useAuthStore()

const email = ref('')
const password = ref('')
const name = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const onSubmit = async () => {
  errorMessage.value = ''
  if (!email.value || !password.value || !name.value) {
    errorMessage.value = '모든 항목을 입력하세요.'
    return
  }
  if (password.value.length < 6) {
    errorMessage.value = '비밀번호는 6자 이상이어야 합니다.'
    return
  }
  isSubmitting.value = true
  try {
    await handleRegister(email.value, password.value, name.value)
    router.push('/todos')
  } catch (e) {
    errorMessage.value = (e as Error).message
  } finally {
    isSubmitting.value = false
  }
}

const goLogin = () => router.push('/login')
</script>

<template>
  <div style="max-width: 360px; margin: 80px auto; padding: 24px; font-family: sans-serif;">
    <h1>회원가입</h1>
    <form @submit.prevent="onSubmit" style="display: flex; flex-direction: column; gap: 12px;">
      <UiInput v-model="name" placeholder="이름" />
      <UiInput v-model="email" placeholder="이메일" type="email" />
      <UiInput v-model="password" placeholder="비밀번호 (6자 이상)" type="password" />
      <div v-if="errorMessage" style="color: red; font-size: 14px;">{{ errorMessage }}</div>
      <UiButton type="submit" variant="primary" :disabled="isSubmitting">
        {{ isSubmitting ? '가입 중...' : '가입하기' }}
      </UiButton>
      <UiButton type="button" variant="ghost" @click="goLogin">로그인으로 돌아가기</UiButton>
    </form>
  </div>
</template>
```

- [ ] **Step 5: 브라우저 사이클 테스트**

`npm run dev` (이미 떠있으면 그대로):
1. `/register` 진입 → 새 계정으로 가입 → `/todos` 자동 이동 확인
2. 브라우저 개발자도구 → Application → Local Storage → `token` 키 있는지 확인
3. 같은 이메일로 다시 가입 시도 → 빨간 에러 메시지 (`이미 사용 중인 이메일입니다`) 표시
4. `/login` → 잘못된 비번 → 빨간 에러 (`이메일 또는 비밀번호가 일치하지 않습니다`)
5. 올바른 비번 → `/todos` 이동

- [ ] **Step 6: 커밋**

```bash
git add frontend/
git commit -m "feat(frontend): useAuthStore + 로그인/회원가입 페이지 동작 연결"
```

---

## Task 12: 라우터 가드 + F5 복원

**Files:**
- Modify: `frontend/src/router/index.ts`, `frontend/src/App.vue`

- [ ] **Step 1: `frontend/src/router/index.ts` 수정 — beforeEach 가드 추가**

기존 파일 끝의 `export default router` 위에 다음 추가:

```typescript
import { useAuthStore } from '../composables/useAuthStore'

router.beforeEach((to) => {
  const { isLoggedIn } = useAuthStore()
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return '/login'
  }
  if (!to.meta.requiresAuth && isLoggedIn.value && (to.path === '/login' || to.path === '/register')) {
    return '/todos'
  }
})
```

> `import` 문이 파일 상단에 있어야 하므로, 파일 맨 위로 옮기는 것이 더 깔끔. 다음 형태로 정리:

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import TodoListPage from '../pages/TodoListPage.vue'
import { useAuthStore } from '../composables/useAuthStore'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/todos' },
    { path: '/login', component: LoginPage, meta: { requiresAuth: false } },
    { path: '/register', component: RegisterPage, meta: { requiresAuth: false } },
    { path: '/todos', component: TodoListPage, meta: { requiresAuth: true } },
  ],
})

router.beforeEach((to) => {
  const { isLoggedIn } = useAuthStore()
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return '/login'
  }
  if (!to.meta.requiresAuth && isLoggedIn.value && (to.path === '/login' || to.path === '/register')) {
    return '/todos'
  }
})

export default router
```

- [ ] **Step 2: `frontend/src/App.vue` 수정 — onMounted에서 handleFetchMe**

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from './composables/useAuthStore'

const { handleFetchMe } = useAuthStore()
const isReady = ref(false)

onMounted(async () => {
  await handleFetchMe()
  isReady.value = true
})
</script>

<template>
  <div v-if="!isReady" style="padding: 40px; font-family: sans-serif;">
    로딩 중...
  </div>
  <router-view v-else />
</template>
```

> `isReady` 가드 이유: `handleFetchMe`가 끝나기 전에 router-view가 렌더되면 보호 라우트의 가드가 "비로그인"으로 판단해 `/login`으로 튀어버린다. `await` 완료 후에 렌더.

- [ ] **Step 3: F5 복원 테스트**

브라우저에서:
1. 로그인 후 `/todos` 진입
2. F5 (새로고침) → 잠깐 "로딩 중..." 뜨고 → `/todos`에 머무름 (로그인 유지)
3. localStorage에서 `token` 삭제 (DevTools) → F5 → `/login`으로 리다이렉트
4. 로그아웃 상태에서 주소창에 `/todos` 직접 입력 → `/login`으로 리다이렉트
5. 로그인 상태에서 주소창에 `/login` 직접 입력 → `/todos`로 리다이렉트

- [ ] **Step 4: 커밋**

```bash
git add frontend/
git commit -m "feat(frontend): 라우터 가드 + 새로고침 시 토큰 복원"
```

---

## Task 13: AppHeader (사용자 이름 + 로그아웃) + 마무리

**Files:**
- Create: `frontend/src/components/AppHeader.vue`
- Modify: `frontend/src/pages/TodoListPage.vue`

- [ ] **Step 1: `frontend/src/components/AppHeader.vue` 작성**

```vue
<script setup lang="ts">
import { UiButton } from '@leechanyong/ispark-ui'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../composables/useAuthStore'

const router = useRouter()
const { user, handleLogout } = useAuthStore()

const onLogout = () => {
  handleLogout()
  router.push('/login')
}
</script>

<template>
  <header
    style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 24px;
      border-bottom: 1px solid #e5e7eb;
      background: #fff;
      font-family: sans-serif;
    "
  >
    <h2 style="margin: 0; font-size: 18px;">📝 My Todo App</h2>
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 14px; color: #4b5563;">
        👤 {{ user?.name }}
      </span>
      <UiButton variant="ghost" size="sm" @click="onLogout">로그아웃</UiButton>
    </div>
  </header>
</template>
```

> ispark-ui의 UiButton `size` prop이 0.2.0에 없으면 prop만 빼면 됨 (`<UiButton variant="ghost" @click="onLogout">`).

- [ ] **Step 2: `frontend/src/pages/TodoListPage.vue` 수정 — AppHeader 적용**

```vue
<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import { useAuthStore } from '../composables/useAuthStore'

const { user } = useAuthStore()
</script>

<template>
  <div style="min-height: 100vh; background: #f9fafb;">
    <AppHeader />
    <main style="padding: 40px; font-family: sans-serif;">
      <h1>안녕하세요, {{ user?.name }}님 👋</h1>
      <p>여기는 M2(Plan B)에서 본격적으로 만들 예정입니다.</p>
      <ul>
        <li>카테고리 사이드바</li>
        <li>할 일 목록 / 추가 / 수정 / 삭제 / 완료 토글</li>
        <li>필터 (전체/완료/미완료, 카테고리별)</li>
      </ul>
    </main>
  </div>
</template>
```

- [ ] **Step 3: 최종 사이클 테스트**

`npm run dev`:
1. `/register` → 가입 → `/todos` 이동
2. 헤더에 본인 이름 + 로그아웃 버튼 표시 확인
3. 로그아웃 클릭 → `/login` 이동
4. 다시 로그인 → `/todos` → 이름 표시
5. F5 → 로그인 유지
6. localStorage `token` 삭제 → 어떤 페이지에서든 F5 → `/login`

- [ ] **Step 4: 최종 커밋**

```bash
git add frontend/
git commit -m "feat(frontend): AppHeader (사용자 + 로그아웃) + TodoListPage 헤더 적용"
```

✅ **M1 체크포인트 = Plan A 완료**: 가입 → 로그아웃 → 로그인 → F5 → 로그인 유지 사이클 동작.

---

## Plan A 종료 후 상태

**작동하는 기능:**
- 모노레포 구조 (`npm run dev` 한 줄로 frontend + backend 동시 기동)
- 회원가입 (bcrypt 해싱)
- 로그인 (JWT 발급, 7일 유효)
- 토큰 기반 인증 미들웨어
- 로그아웃
- 새로고침 시 로그인 유지 (`/api/auth/me`로 토큰 검증)
- 라우터 가드 (비로그인 → /login, 로그인 → /todos)

**다음 단계 (Plan B에서):**
- Category 모델 + CRUD API + UI
- Todo 모델 + CRUD API + UI
- 카테고리/완료 필터
- 모달 (UiModal) — 할 일 추가/수정/삭제
- UiTable, UiCheckbox, UiBadge, UiSelect, UiTab, UiDatePicker, UiEmpty, UiLoading 활용

→ Plan B 작성은 Plan A 완전 동작 확인 후 진행.

---

## 위험 포인트 체크리스트 (막히면 여기 보기)

| 증상 | 의심할 곳 |
|---|---|
| "blocked by CORS policy" | `backend/src/index.ts`의 `cors({ origin: 'http://localhost:5173' })` |
| 모든 API가 401 | `useApi`가 토큰을 헤더에 잘 넣는지 (DevTools Network 탭 헤더 확인) |
| F5 시 로그아웃됨 | `App.vue`의 `onMounted`에서 `handleFetchMe()` 호출 + `isReady` 가드 |
| `JWT_SECRET` 관련 에러 | `backend/.env`의 `JWT_SECRET` 존재 확인 (서버 재시작 필요) |
| `bcrypt.compare` 항상 false | 인자 순서: `compare(평문, 해시)` |
| Prisma "Table not found" | `npx prisma migrate dev` 실행 안 했거나 `.env`의 `DATABASE_URL` 잘못됨 |
| ispark-ui import 에러 | `@leechanyong/ispark-ui/style.css` import 했는지, `radix-vue` 설치했는지 |
| `UiButton` / `UiInput` 등 없음 | npm 0.2.0에 해당 컴포넌트 없을 수 있음 → ispark-ui 저장소에서 `npm publish` |
| `localStorage` 접근 에러 | SSR 컨텍스트 아닌 순수 SPA라 발생 가능성 낮음. Vite dev server 재시작 |
