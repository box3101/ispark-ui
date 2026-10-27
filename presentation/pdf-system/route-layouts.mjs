// Narrative proposal layouts: semantic diagrams remain selectable HTML text.
import {phosphorGlyphs} from '../icons/phosphor-glyphs.ts';
export function routeLayouts(esc){
 const stages=['시점','1코스','2코스','3코스','4코스','5코스','종점'];
 const station=(i)=>`<span class="station">${String(i+1).padStart(2,'0')}</span>`;
 const icon=name=>{const g=phosphorGlyphs[name];if(!g)throw Error(`Unknown proposal glyph: ${name}`);return `<svg aria-hidden="true" viewBox="${g.viewBox}" fill="currentColor">${g.paths.map(d=>`<path d="${d}"/>`).join('')}</svg>`;};
 return {
 cover:s=>`<div class="cover-copy"><p class="cover-intro">${esc(s.coverIntro||'')}</p><h1>${esc(s.title.split('\n')[0])}<br><em>${esc(s.title.split('\n').slice(1).join('\n'))}</em></h1><p class="lead">${esc(s.subtitle)}</p></div><p class="cover-end">${esc(s.end)}</p>`,
 agenda:s=>`<div class="agenda-count">07<small>COURSE GUIDE</small></div><div class="route-agenda">${s.items.map((x,i)=>`<div class="agenda-stop">${station(i)}<div><span class="course-name">${stages[i]}</span><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></div></div>`).join('')}</div>`,
 pillars:s=>`<div class="body route-pillars">${s.items.map((x,i)=>`<article class="pillar-stop">${station(i)}<div class="route-category">${['SYSTEM','POLICY','PERFORMANCE'][i]}</div><h2>${esc(x[0])}</h2><p>${esc(x[1])}</p><div class="destination">${['업무를 담는 기반','현장에서 작동하는 제도','근거가 이어지는 성과'][i]}</div></article>`).join('')}</div>`,
 comparison:s=>`<div class="body route-compare"><div class="compare-labels"><span>다시 이어야 할 길</span><span>현재의 모습</span><span></span><span>재구축을 통한 변화</span></div>${s.rows.map((r,i)=>`<div class="compare-row"><div class="compare-key">${station(i)}<h3>${esc(r[0])}</h3></div><p>${esc(r[1])}</p><span class="connector" aria-label="전환">→</span><p class="compare-result">${esc(r[2])}</p></div>`).join('')}</div>`,
 section:s=>`<div class="section-no">${esc(s.number)}</div><h1>${esc(s.title)}</h1><p class="lead">${esc(s.subtitle)}</p><div class="course-map">${stages.map((n,i)=>`<span class="${i===1?'active':''}"><b>${i===1?'●':'○'}</b>${n}</span>`).join('')}</div>`,
 process:s=>`<div class="body route-process">${s.items.map((x,i)=>`<article class="process-stop"><span class="station concept-icon">${icon(['files','git-diff','flow-arrow','shield-check'][i])}</span><div class="step-label">0${i+1} · ${['원문 연결','요구사항 연결','구현 위치 명시','검증 항목화'][i]}</div><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p><small>${esc(x[2])}</small>${i<3?'<span class="step-arrow" aria-label="다음">→</span>':''}</article>`).join('')}</div>`,
 hierarchy:s=>`<div class="body route-hierarchy"><div class="flow-rail down"><b>목표</b><span>↓</span><small>전략을<br>개인까지</small></div><div class="hierarchy-stations">${s.items.map((x,i)=>`<div class="hierarchy-stop">${station(i)}<div><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></div></div>`).join('')}</div><div class="flow-rail up"><b>실적</b><span>↑</span><small>개인에서<br>경영평가로</small></div></div>`,
 trace:s=>`<div class="body route-trace"><div class="trace-head">${s.headers.map((x,i)=>`<div><span>0${i+1}</span>${esc(x)}</div>`).join('')}</div>${s.rows.map((r,i)=>`<div class="trace-row">${r.map((x,j)=>`<div>${j===0?station(i):'<span class="trace-arrow">→</span>'}<p>${esc(x)}</p></div>`).join('')}</div>`).join('')}</div>`,
 closing:s=>`<div class="commitments route-commitments">${s.items.map((x,i)=>`<div class="commitment">${station(i)}<p>${esc(x)}</p></div>`).join('')}</div><div class="closing-signoff">사람의 길과 성과의 길을, 하나의 코스로</div>`,
 };
}
