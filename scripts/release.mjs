// ============================================
// ispark-ui 릴리스 자동화 스크립트
// --------------------------------------------
// 사용법:
//   node scripts/release.mjs "변경 요약" [옵션]
//   npm run release -- "변경 요약" [옵션]
//
// 옵션:
//   --type <섹션>    CHANGELOG 섹션명 (기본 Changed) 예) --type Fixed / Added
//   --minor          minor 버전 증가 (0.5.22 → 0.6.0)
//   --major          major 버전 증가 (0.5.22 → 1.0.0)
//   --no-app         team_agent_front 재설치·서버 재시작 생략 (ispark-ui 릴리스만)
//   --no-issue       TaskFlow 이슈 자동 등록 생략
//   --app <경로>     이번 실행에만 소비 프로젝트 경로 지정
//   --set-app <경로> 소비 프로젝트 경로를 로컬에 저장(팀원별 최초 1회) 후 종료
//   --set-taskflow <이메일> <비밀번호>  TaskFlow 로그인 정보를 로컬에 저장(팀원별 최초 1회) 후 종료
//
// 팀원별 설정(사람마다 다름)은 release.local.json 에 저장 (git 무시). 우선순위:
//   소비 경로 : --app > ISPARK_APP_DIR > release.local.json.appDir > 기본값
//   TF 로그인 : 환경변수 TASKFLOW_EMAIL/PASSWORD > release.local.json.taskflow > (없으면 이슈 등록 생략)
//
// 동작 순서:
//   1) npm run build            (dist 재생성 + 타입체크, 실패 시 여기서 중단)
//   2) package.json 버전 bump   (기본 patch)
//   3) CHANGELOG.md 항목 추가
//   4) git 커밋 (dist 포함)
//   5) main 브랜치로 fast-forward 머지 + push
//   6) team_agent_front 에서 새 커밋 해시로 재설치
//   7) team_agent_front dev 서버 재시작
//   8) TaskFlow 이슈 자동 등록 — #33(ispark-ui 변경) / #36(TeamAgent 최신 커밋)
// ============================================

import { execSync, spawn } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..') // ispark-ui 루트

// ---- 환경 설정 ----
const REPO_SLUG = 'box3101/ispark-ui' // github: 설치 슬러그
const DEV_PORTS = [3001, 3000] // team_agent_front dev 서버 후보 포트
const DEFAULT_APP_DIR = 'C:\\team_agent_front' // 소비 프로젝트 기본 경로 (팀원별로 다르면 --set-app 로 저장)
const LOCAL_CONFIG = resolve(__dirname, 'release.local.json') // 사람마다 다른 로컬 설정 (git 무시)
const TF_DEFAULT_API = 'http://localhost:4000' // TaskFlow 백엔드
const TF_PROJECT_ISPARK = 33 // TaskFlow 프로젝트: ispark-ui 디자인 시스템
const TF_PROJECT_TEAMAGENT = 36 // TaskFlow 프로젝트: TeamAgent
const readLocalConfig = () => {
  try { return JSON.parse(readFileSync(LOCAL_CONFIG, 'utf8')) } catch { return {} }
}

// ---- 로그 헬퍼 ----
const c = { cyan: '\x1b[36m', green: '\x1b[32m', gray: '\x1b[90m', red: '\x1b[31m', reset: '\x1b[0m' }
const log = (m) => console.log(`${c.cyan}▶ ${m}${c.reset}`)
const ok = (m) => console.log(`${c.green}✔ ${m}${c.reset}`)
const die = (m) => { console.error(`${c.red}✖ ${m}${c.reset}`); process.exit(1) }
const run = (cmd, opts = {}) => {
  console.log(`${c.gray}$ ${cmd}${c.reset}`)
  return execSync(cmd, { stdio: 'inherit', cwd: ROOT, ...opts })
}
const capture = (cmd, opts = {}) => execSync(cmd, { encoding: 'utf8', cwd: ROOT, ...opts }).trim()

// ---- 인자 파싱 ----
let type = 'Changed'
let bump = 'patch'
let skipApp = false
let skipIssue = false // --no-issue: TaskFlow 이슈 등록 생략
let appOverride = '' // --app: 이번 실행만 사용할 경로
let setAppPath = '' // --set-app: 로컬 설정에 저장할 경로
let setTf = null // --set-taskflow: { email, password }
const msgParts = []
const raw = process.argv.slice(2)
for (let i = 0; i < raw.length; i++) {
  const a = raw[i]
  if (a === '--type') { type = raw[++i] || type; continue }
  if (a === '--minor') { bump = 'minor'; continue }
  if (a === '--major') { bump = 'major'; continue }
  if (a === '--no-app') { skipApp = true; continue }
  if (a === '--no-issue') { skipIssue = true; continue }
  if (a === '--app') { appOverride = raw[++i] || ''; continue }
  if (a === '--set-app') { setAppPath = raw[++i] || ''; continue }
  if (a === '--set-taskflow') { setTf = { email: raw[++i] || '', password: raw[++i] || '' }; continue }
  if (a.startsWith('--')) continue // 알 수 없는 플래그 무시
  msgParts.push(a)
}

// --set-app: 소비 프로젝트 경로를 로컬 설정에 저장하고 종료 (팀원별 최초 1회만 실행)
if (setAppPath) {
  const cfg = readLocalConfig()
  cfg.appDir = setAppPath
  writeFileSync(LOCAL_CONFIG, JSON.stringify(cfg, null, 2) + '\n')
  ok(`앱 경로 저장됨 → ${setAppPath}`)
  console.log(`   ${LOCAL_CONFIG} (git 에 커밋되지 않음)`)
  process.exit(0)
}

// --set-taskflow: TaskFlow 로그인 정보를 로컬 설정에 저장하고 종료 (팀원별 최초 1회, 계정이 사람마다 다름)
if (setTf) {
  if (!setTf.email || !setTf.password) {
    die('사용법: node scripts/release.mjs --set-taskflow <이메일> <비밀번호>')
  }
  const cfg = readLocalConfig()
  cfg.taskflow = {
    apiBase: (cfg.taskflow && cfg.taskflow.apiBase) || TF_DEFAULT_API,
    email: setTf.email,
    password: setTf.password,
  }
  writeFileSync(LOCAL_CONFIG, JSON.stringify(cfg, null, 2) + '\n')
  ok(`TaskFlow 계정 저장됨 → ${setTf.email}`)
  console.log(`   ${LOCAL_CONFIG} (git 에 커밋되지 않음)`)
  process.exit(0)
}

const message = msgParts.join(' ').trim()
if (!message) {
  die('변경 요약을 입력하세요.  예)  npm run release -- "UiDrawer 타이틀 18px로 확대"')
}

// 소비 프로젝트 경로 결정: --app > 환경변수 > 로컬설정 > 기본값
const APP_DIR = appOverride || process.env.ISPARK_APP_DIR || readLocalConfig().appDir || DEFAULT_APP_DIR

// ============================================
// 1) 빌드 — 실패하면 버전/CHANGELOG 손대기 전에 중단
// ============================================
log('빌드 (npm run build) — dist 재생성 + 타입체크')
try {
  run('npm run build')
} catch {
  die('빌드 실패 — 위 에러 확인 후 다시 실행하세요. (버전/CHANGELOG는 변경되지 않음)')
}
ok('빌드 완료')

// ============================================
// 2) 버전 bump
// ============================================
const pkgPath = resolve(ROOT, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
const oldVersion = pkg.version
const [maj, min, pat] = oldVersion.split('.').map(Number)
const newVersion =
  bump === 'major' ? `${maj + 1}.0.0`
  : bump === 'minor' ? `${maj}.${min + 1}.0`
  : `${maj}.${min}.${pat + 1}`
pkg.version = newVersion
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
ok(`버전 ${oldVersion} → ${newVersion} (${bump})`)

// ============================================
// 3) CHANGELOG 항목 추가 — 헤더 아래 첫 "## [" 앞에 삽입
// ============================================
const clPath = resolve(ROOT, 'CHANGELOG.md')
const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
const entry = `## [${newVersion}] - ${today}\n\n### ${type}\n- ${message}\n\n`
let cl = readFileSync(clPath, 'utf8')
const idx = cl.indexOf('\n## [')
cl = idx === -1 ? `${cl.trimEnd()}\n\n${entry}` : `${cl.slice(0, idx + 1)}${entry}${cl.slice(idx + 1)}`
writeFileSync(clPath, cl)
ok(`CHANGELOG 항목 추가 — ## [${newVersion}] · ### ${type}`)

// ============================================
// 4) 커밋 (dist·package.json·CHANGELOG·소스 전체)
// ============================================
const branch = capture('git rev-parse --abbrev-ref HEAD')
run('git add -A')
const commitMsg = `chore(release): v${newVersion} — ${message}`
const msgFile = resolve(tmpdir(), `ispark-release-${newVersion}.txt`)
writeFileSync(msgFile, `${commitMsg}\n\nCo-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>\n`)
run(`git commit -F "${msgFile}"`)
const fullHash = capture('git rev-parse HEAD')
const shortHash = capture('git rev-parse --short HEAD')
ok(`커밋 ${shortHash} (브랜치: ${branch})`)

// ============================================
// 5) main 머지 + push
// ============================================
if (branch !== 'main') {
  run('git checkout main')
  try {
    run(`git merge --ff-only ${branch}`)
  } catch {
    run(`git checkout ${branch}`)
    die(`main으로 fast-forward 머지 실패 — main이 갈라졌습니다. 수동으로 정리 후 다시 실행하세요.`)
  }
}
run('git push origin main')
if (branch !== 'main') run(`git checkout ${branch}`)
ok('main push 완료')

// ============================================
// 6) team_agent_front 재설치 + 7) dev 서버 재시작
// ============================================
let appDone = false // 실제로 재설치/서버재시작까지 됐는지 (→ #36 등록 여부 판단)
if (!skipApp) {
  if (!existsSync(APP_DIR)) {
    console.warn(`${c.gray}ℹ 소비 프로젝트 경로 없음: ${APP_DIR} — 재설치/서버재시작 생략.\n   저장:  node scripts/release.mjs --set-app "C:\\내경로\\team_agent_front"${c.reset}`)
  } else {
    log(`team_agent_front 재설치 (github:${REPO_SLUG}#${shortHash})`)
    run(`npm install "github:${REPO_SLUG}#${fullHash}"`, { cwd: APP_DIR })
    ok('재설치 완료')
    restartDevServer(APP_DIR)
    appDone = true
  }
}

// ============================================
// 8) TaskFlow 이슈 자동 등록 (#33 ispark-ui, #36 TeamAgent)
// ============================================
if (!skipIssue) {
  await registerIssues(appDone)
}

// ---- 최종 요약 ----
console.log(`\n${c.green}🎉 완료${c.reset}  v${oldVersion} → v${newVersion} · ${shortHash}`)
if (appDone) {
  console.log(`   브라우저에서 ${DEV_PORTS.map((p) => `localhost:${p}`).join(' 또는 ')} 새로고침으로 확인하세요.`)
}

// ============================================
// 헬퍼: dev 서버 재시작 (Windows) — 후보 포트 LISTEN PID 종료 후 새 창으로 기동
// ============================================
function restartDevServer(appDir) {
  log('dev 서버 재시작')
  for (const port of DEV_PORTS) {
    let pids = []
    try {
      const out = execSync(`netstat -ano | findstr LISTENING | findstr :${port}`, { encoding: 'utf8' })
      pids = [...new Set(out.trim().split('\n').map((l) => l.trim().split(/\s+/).pop()).filter(Boolean))]
    } catch { /* 해당 포트에 리스닝 없음 */ }
    for (const pid of pids) {
      try { execSync(`taskkill /PID ${pid} /T /F`, { stdio: 'ignore' }); ok(`포트 ${port} PID ${pid} 종료`) } catch { /* 이미 종료됨 */ }
    }
  }
  // /k 로 창 유지 → 부팅 로그 확인 가능
  spawn('cmd.exe', ['/c', `start "ispark dev" cmd /k "cd /d ${appDir} && npm run dev"`], {
    detached: true,
    stdio: 'ignore',
  }).unref()
  ok('dev 서버 재시작 요청됨 (새 창에서 기동)')
}

// ============================================
// 헬퍼: TaskFlow 이슈 자동 등록
//   #33 ← 이번 ispark-ui 릴리스,  #36 ← team_agent_front 최신 커밋
//   실패/미설정 시 릴리스는 그대로 두고 경고만 출력 (best-effort)
// ============================================
async function registerIssues(appReflected) {
  const tf = readLocalConfig().taskflow || {}
  const apiBase = process.env.TASKFLOW_API || tf.apiBase || TF_DEFAULT_API
  const email = process.env.TASKFLOW_EMAIL || tf.email || ''
  const password = process.env.TASKFLOW_PASSWORD || tf.password || ''
  if (!email || !password) {
    console.warn(`${c.gray}ℹ TaskFlow 로그인 정보 없음 — 이슈 등록 생략.\n   저장:  node scripts/release.mjs --set-taskflow <이메일> <비밀번호>${c.reset}`)
    return
  }

  let token
  try {
    const res = await fetch(`${apiBase}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) throw new Error(`로그인 ${res.status}`)
    token = (await res.json()).token
  } catch (e) {
    console.warn(`${c.gray}ℹ TaskFlow 이슈 등록 생략 — ${e.message} (${apiBase} 백엔드 기동 확인)${c.reset}`)
    return
  }

  // #33 ispark-ui — 이번 릴리스 커밋의 src 변경 파일 목록 첨부
  const isparkFiles = capture(`git show --name-only --pretty=format: ${fullHash} -- src`)
    .split('\n').map((s) => s.trim()).filter(Boolean)
  const isparkBody = [
    `변경: ${message}`,
    ...isparkFiles.map((f) => `- ${f}`),
    `버전: v${newVersion}`,
    `커밋: ${shortHash}`,
  ].join('\n')
  await createIssueIfNew(apiBase, token, TF_PROJECT_ISPARK, {
    title: message,
    description: isparkBody,
    category: type.toLowerCase() === 'fixed' || type.toLowerCase() === 'bug' ? 'bug' : 'improvement',
    status: 'done',
  }, shortHash, 'ispark-ui #33')

  // #36 TeamAgent — 최신 커밋 (실제 재설치가 이뤄졌을 때만)
  if (appReflected) {
    try {
      const taSha = capture('git rev-parse --short HEAD', { cwd: APP_DIR })
      const taSubject = capture('git log -1 --pretty=%s', { cwd: APP_DIR })
      const taFiles = capture('git show --name-only --pretty=format: HEAD', { cwd: APP_DIR })
        .split('\n').map((s) => s.trim())
        .filter((f) => f.startsWith('pages/') || f.startsWith('components/'))
      const taBody = [
        '변경: 최신 커밋 반영',
        ...(taFiles.length ? taFiles.slice(0, 20).map((f) => `- ${f}`) : ['- (pages/components 변경 없음)']),
        `커밋: ${taSha}`,
      ].join('\n')
      await createIssueIfNew(apiBase, token, TF_PROJECT_TEAMAGENT, {
        title: taSubject,
        description: taBody,
        category: 'improvement',
        status: 'done',
      }, taSha, 'TeamAgent #36')
    } catch (e) {
      console.warn(`${c.gray}ℹ TeamAgent #36 등록 생략 — ${e.message}${c.reset}`)
    }
  }
}

// 커밋 sha 로 중복 체크 후 없을 때만 이슈 생성
async function createIssueIfNew(apiBase, token, projectId, payload, dedupSha, label) {
  try {
    const listRes = await fetch(`${apiBase}/projects/${projectId}/issues`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const list = listRes.ok ? await listRes.json() : []
    if (Array.isArray(list) && list.some((i) => (i.description || '').includes(dedupSha))) {
      console.log(`${c.gray}ℹ ${label} 이미 등록됨 (커밋 ${dedupSha}) — 스킵${c.reset}`)
      return
    }
    const res = await fetch(`${apiBase}/projects/${projectId}/issues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`생성 ${res.status}`)
    const issue = await res.json()
    ok(`${label} 이슈 등록 (관리번호 ${issue.externalId ?? issue.id})`)
  } catch (e) {
    console.warn(`${c.gray}ℹ ${label} 등록 실패 — ${e.message}${c.reset}`)
  }
}
