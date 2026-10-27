import {presentationAssetUrl} from './asset-url'
/** Stable asset IDs; labels may change without breaking stored slide specs. */
import {byKey,proposalIcons} from '../../../presentation/icons/icon-map'
const additionalConcepts=['people','quality','schedule','verified','next','converted-data','understanding','strategy','organization','staffing','risk','security','training','deliverable','stabilization','maintenance','integration','infrastructure','testing'] as const
export const illustrationAssets = [
 {id:'legacy-server',label:'노후 시스템 · 이력',concept:'platform',tags:['서버','시스템','레거시','이력'],file:'legacy-server.png'},
 {id:'system-blocks',label:'제도 · 시스템 구현',concept:'mapping',tags:['제도','설계','블록','문서'],file:'system-blocks.png'},
 {id:'analytics-review',label:'성과 분석 · 검토',concept:'performance',tags:['성과','차트','분석','검토'],file:'analytics-review.png'},
 {id:'data-migration',label:'데이터 이관',concept:'data-migration',tags:['데이터','이관','통합','저장'],file:'data-migration.png'},
 {id:'workflow-design',label:'업무 · 제도 설계',concept:'workflow',tags:['업무','절차','제도','설계'],file:'workflow-design.png'},
 {id:'performance-target',label:'성과 · 목표 달성',concept:'performance',tags:['성과','목표','지표','KPI'],file:'performance-target.png'},
 ...additionalConcepts.map(id=>({id,label:byKey[id].label,concept:id,tags:byKey[id].terms,file:`${id}.png`})),
] as const
export type IllustrationId = typeof illustrationAssets[number]['id']
export const illustrationById = Object.fromEntries(illustrationAssets.map(a=>[a.id,a])) as Record<IllustrationId,typeof illustrationAssets[number]>
export const illustrationUrl=(id:IllustrationId)=>presentationAssetUrl(`/presentation/illustrated/icons/${illustrationById[id].file}`)
export const defaultIllustrationByConcept:Record<string,IllustrationId>=Object.fromEntries(illustrationAssets.map(a=>[a.concept,a.id]))
export const illustrationCoverage=proposalIcons.map(c=>({concept:c.key,label:c.label,illustration:defaultIllustrationByConcept[c.key]}))
export const strategyIllustrations={server:'legacy-server',system:'system-blocks',analytics:'analytics-review'} as const
export const comparisonIllustrations={data:'data-migration',system:'workflow-design',performance:'performance-target'} as const
