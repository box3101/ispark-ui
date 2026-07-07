// ============================================
// ispark-ui 릴리스 자동화 스크립트
// --------------------------------------------
// 사용법:
//   node scripts/release.mjs "변경 요약" [옵션]
//   npm run release -- "변경 요약" [옵션]
//
// 옵션:
//   --type <섹션>   CHANGELOG 섹션명 (기본 Changed) 예) --type Fixed / Added
//   --minor         minor 버전 증가 (0.5.22 → 0.6.0)
//   --major         major 버전 증가 (0.5.22 → 1.0.0)
//   --no-app        team_agent_front 재설치·서버 재시작 생략 (ispark-ui 릴리스만)
//
// 동작 순서:
//   1) npm run build            (dist 재생성 + 타입체크, 실패 시 여기서 중단)
//   2) package.json 버전 bump   (기본 patch)
//   3) CHANGELOG.md 항목 추가
//   4) git 커밋 (dist 포함)
//   5) main 브랜치로 fast-forward 머지 + push
//   6) team_agent_front 에서 새 커밋 해시로 재설치
//   7) team_agent_front dev 서버 재시작
// ============================================

import { execSync, spawn } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..') // ispark-ui 루트

// ---- 환경 설정 (필요 시 환경변수로 덮어쓰기) ----
const APP_DIR = process.env.ISPARK_APP_DIR || 'C:\\team_agent_front' // 소비 프로젝트 경로
const REPO_SLUG = 'box3101/ispark-ui' // github: 설치 슬러그
const DEV_PORTS = [3001, 3000] // team_agent_front dev 서버 후보 포트

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
const msgParts = []
const raw = process.argv.slice(2)
for (let i = 0; i < raw.length; i++) {
  const a = raw[i]
  if (a === '--type') { type = raw[++i] || type; continue }
  if (a === '--minor') { bump = 'minor'; continue }
  if (a === '--major') { bump = 'major'; continue }
  if (a === '--no-app') { skipApp = true; continue }
  if (a.startsWith('--')) continue // 알 수 없는 플래그 무시
  msgParts.push(a)
}
const message = msgParts.join(' ').trim()
if (!message) {
  die('변경 요약을 입력하세요.  예)  npm run release -- "UiDrawer 타이틀 18px로 확대"')
}

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
if (skipApp) {
  console.log(`\n${c.green}🎉 릴리스 완료${c.reset}  v${newVersion} · ${shortHash}`)
  console.log(`   소비 프로젝트에서:  npm install "github:${REPO_SLUG}#${shortHash}"`)
  process.exit(0)
}

if (!existsSync(APP_DIR)) {
  console.log(`\n${c.green}🎉 ispark-ui 릴리스 완료${c.reset}  v${newVersion} · ${shortHash}`)
  die(`소비 프로젝트 경로를 찾지 못함: ${APP_DIR}  (ISPARK_APP_DIR 환경변수로 지정 가능)`)
}

log(`team_agent_front 재설치 (github:${REPO_SLUG}#${shortHash})`)
run(`npm install "github:${REPO_SLUG}#${fullHash}"`, { cwd: APP_DIR })
ok('재설치 완료')

// dev 서버 재시작 (Windows) — 후보 포트에서 LISTEN 중인 PID 종료 후 새 창으로 실행
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
// 새 콘솔 창에서 dev 서버 기동 (/k 로 창 유지 → 로그 확인 가능)
spawn('cmd.exe', ['/c', `start "ispark dev" cmd /k "cd /d ${APP_DIR} && npm run dev"`], {
  detached: true,
  stdio: 'ignore',
}).unref()
ok('dev 서버 재시작 요청됨 (새 창에서 기동)')

console.log(`\n${c.green}🎉 전체 완료${c.reset}  v${oldVersion} → v${newVersion} · ${shortHash}`)
console.log(`   브라우저에서 ${DEV_PORTS.map((p) => `localhost:${p}`).join(' 또는 ')} 새로고침으로 확인하세요.`)
