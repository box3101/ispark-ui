<script setup lang="ts">
import {presentationAssetUrl} from './asset-url'
import TraceabilityDiagram from './TraceabilityDiagram.vue'
import ProcessDiagramCards from './ProcessDiagramCards.vue'
import EvidenceSourceCards from './EvidenceSourceCards.vue'
import KeyMetricsDashboard from './KeyMetricsDashboard.vue'
import MilestoneGantt from './MilestoneGantt.vue'
import DeliveryOrganization from './DeliveryOrganization.vue'
import AlternativeComparisonTable from './AlternativeComparisonTable.vue'
import RiskResponseMatrix from './RiskResponseMatrix.vue'

import {computed,watchEffect,useId} from 'vue'
import IllustrationIcon from './IllustrationIcon.vue'
import {themeVariables} from './tokens'
import {sampleSource,validateDiagram,type DiagramData} from './layout-library-model'
const props=withDefaults(defineProps<{data:DiagramData;background?:string;source?:string;page?:number}>(),{background:'/presentation/illustrated/jeju-background.png',source:sampleSource,page:1})
watchEffect(()=>validateDiagram(props.data))
const marker=useId().replace(/[^a-zA-Z0-9_-]/g,'')+'arrow'
const dark=computed(()=>['cover','section'].includes(props.data.kind))
const position=(id:string)=>{
 const layer=props.data.layers!.findIndex(l=>l.nodes.some(n=>n.id===id))
 const nodes=props.data.layers![layer].nodes
 return {x:148+(nodes.findIndex(n=>n.id===id)+.5)*796/nodes.length,y:layer*132}
}
const edges=computed(()=>(props.data.connections??[]).map(c=>({ ...c,a:position(c.from),b:position(c.to)})))
</script>
<template>
 <section class="pl-slide" :class="['pl-kind-'+data.kind,{'pl-dark':dark}]" :style="themeVariables">
  <img v-if="background" class="pl-background" :src="presentationAssetUrl(background)" alt=""/><div class="pl-wash"/>
  <header class="pl-heading"><p data-fit>{{data.section}}</p><h1 data-fit>{{data.title}}</h1><p class="pl-subtitle" data-fit>{{data.subtitle}}</p></header>
  <main class="pl-body">
   <div v-if="data.kind==='section'" class="pl-chapter" data-fit>{{data.number}}</div>
   <div v-else-if="data.kind==='cover'" class="pl-cover-line">{{data.takeaway}}</div>
   <ProcessDiagramCards v-else-if="data.kind==='process'" :items="data.items" :variant="data.processVariant" :highlight-last="data.highlightLast" :output-label="data.outputLabel"/>
   <EvidenceSourceCards v-else-if="data.kind==='evidence'" :items="data.items" :criteria-label="data.criteriaLabel"/>
   <KeyMetricsDashboard v-else-if="data.kind==='metrics'" :items="data.items" :primary-index="data.primaryMetricIndex" :accent="data.emphasisColor"/>
   <div v-else-if="data.kind==='architecture'" class="pl-architecture">
    <svg class="pl-edges" viewBox="0 0 944 376" role="img" aria-label="계층 간 연결 관계"><defs><marker :id="marker" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill="currentColor"/></marker></defs><g v-for="(e,i) in edges" :key="i"><path :d="`M ${e.a.x} ${e.a.y+80} L ${e.a.x} ${e.a.y+106} L ${e.b.x} ${e.a.y+106} L ${e.b.x} ${e.b.y-4}`" :marker-end="`url(#${marker})`"/><text :x="(e.a.x+e.b.x)/2+8" :y="e.a.y+111">{{e.label}}</text></g></svg>
    <div v-for="layer in data.layers" :key="layer.label" class="pl-layer"><h2 data-fit>{{layer.label==='data'?'데이터':layer.label}}</h2><div class="pl-nodes" :style="{gridTemplateColumns:`repeat(${layer.nodes.length},1fr)`}"><article v-for="node in layer.nodes" :key="node.id"><IllustrationIcon :name="node.icon" :size="58"/><strong data-fit>{{node.label}}</strong></article></div></div>
   </div>
   <MilestoneGantt v-else-if="data.kind==='timeline'" :months="data.months!" :tracks="data.tracks!"/>
   <DeliveryOrganization v-else-if="data.kind==='organization'" :items="data.items"/>
   <TraceabilityDiagram v-else-if="data.kind==='trace'" :rows="data.items" :headers="data.headers" :variant="data.traceVariant" :accent="data.emphasisColor"/>
   <AlternativeComparisonTable v-else-if="data.kind==='table'" :items="data.items" :headers="data.headers" :subtitles="data.optionSubtitles" :visuals="data.optionVisuals"/>
   <RiskResponseMatrix v-else-if="data.kind==='risk'" :items="data.items" :headers="data.headers"/>
   <div v-else-if="data.kind==='screen'" class="pl-screen"><figure><img v-if="data.screen" :src="presentationAssetUrl(data.screen.src)" :alt="data.screen.alt"/><div v-else class="pl-screen-placeholder"><IllustrationIcon name="legacy-server" :size="140"/><strong>화면 이미지 영역</strong><p>실제 서비스 화면으로 교체</p></div><figcaption>{{data.screen?.alt||'화면 미등록 · 설명용 자리 표시'}}</figcaption></figure><ol><li v-for="(item,i) in data.items" :key="i"><span>{{String(i+1).padStart(2,'0')}}</span><h2 data-fit>{{item.title}}</h2><p data-fit>{{item.body}}</p></li></ol></div>
   <div v-else class="pl-cards"><article v-for="(item,i) in data.items" :key="i" class="pl-panel"><span class="pl-index">{{String(i+1).padStart(2,'0')}}</span><div v-if="data.kind==='metrics'" class="pl-value" data-fit>{{item.value}}</div><IllustrationIcon v-else-if="item.icon" :name="item.icon" :size="132"/><h2 data-fit>{{item.title}}</h2><p data-fit>{{item.body}}</p><strong v-if="item.detail" class="pl-evidence" data-fit>{{item.detail}}</strong></article></div>
  </main>
  <aside v-if="data.takeaway&&!dark" class="pl-takeaway" data-fit><template v-if="data.takeawayHighlight&&data.takeaway.includes(data.takeawayHighlight)">{{data.takeaway.slice(0,data.takeaway.indexOf(data.takeawayHighlight))}}<strong class="pl-takeaway-emphasis">{{data.takeawayHighlight}}</strong>{{data.takeaway.slice(data.takeaway.indexOf(data.takeawayHighlight)+data.takeawayHighlight.length)}}</template><template v-else>{{data.takeaway}}</template></aside>
  <footer class="pl-footer"><span>{{source}}</span><span>{{String(page).padStart(2,'0')}}</span></footer>
 </section>
</template>
<style scoped>
.pl-slide,.pl-slide *{box-sizing:border-box}.pl-slide{width:1040px;height:720px;position:relative;overflow:hidden;color:var(--ds-navy900);background:white;font-family:var(--presentation-font);print-color-adjust:exact}.pl-slide h1,.pl-slide h2,.pl-slide p,.pl-slide figure{margin:0;white-space:pre-line;word-break:keep-all}.pl-background,.pl-wash{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.pl-wash{background:linear-gradient(90deg,rgba(255,255,255,.99) 0%,rgba(255,255,255,.94) 40%,rgba(255,255,255,.25)),linear-gradient(0deg,rgba(255,255,255,.9) 0%,rgba(255,255,255,.85) 58%,transparent 80%)}.pl-heading{position:absolute;left:48px;right:48px;top:34px}.pl-heading>p:first-child{font-size:var(--type-detail);color:var(--ds-blue600);font-weight:var(--weight-bold);letter-spacing:.3px}.pl-heading h1{font-size:var(--type-title);line-height:1.25;margin-top:20px;letter-spacing:-1.3px;font-weight:var(--weight-bold)}.pl-heading .pl-subtitle{font-size:var(--type-label);color:#526c7e;margin-top:12px}.pl-body{position:absolute;left:48px;right:48px;top:200px;height:376px}.pl-footer{position:absolute;left:48px;right:48px;bottom:22px;padding-top:12px;border-top:1px solid var(--ds-blue100);display:flex;justify-content:space-between;font-size:var(--type-source);color:#526c7e}.pl-takeaway{position:absolute;left:48px;right:48px;bottom:69px;padding:16px 22px;border-left:5px solid var(--ds-orange500);border-radius:8px;background:var(--ds-navy900);color:white;font-size:var(--type-body);font-weight:var(--weight-bold)}.pl-process,.pl-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;height:100%}.pl-panel{position:relative;border:1px solid #b8d9eb;border-radius:14px;background:linear-gradient(150deg,#fff 50%,#e5f2fa);padding:22px;box-shadow:0 6px 18px #092e4909}.pl-panel .proposal-illustration-icon{margin:5px auto 14px}.pl-panel h2{font-size:var(--type-body);line-height:1.3;font-weight:var(--weight-bold)}.pl-panel p{font-size:var(--type-supporting);line-height:1.55;margin-top:14px}.pl-index{position:absolute;top:17px;left:17px;font-size:var(--type-label);color:var(--ds-blue600);font-weight:var(--weight-bold)}.pl-process .pl-panel{text-align:center;padding:18px 12px}.pl-process .pl-panel h2{font-size:var(--type-heading)}.pl-process .pl-panel p{font-size:var(--type-supporting)}.pl-output{border-top:1px solid #c8deec;margin-top:20px;padding-top:12px}.pl-output small{display:block;font-size:var(--type-source);color:#526c7e;margin-bottom:6px}.pl-output strong{font-size:var(--type-label)}.pl-next{position:absolute;right:-24px;top:160px;z-index:2;width:24px;font-size:var(--type-step);color:var(--ds-blue600)}.pl-architecture{position:relative;height:376px}.pl-layer{height:80px;margin-bottom:52px;display:grid;grid-template-columns:130px 1fr;gap:18px;position:relative}.pl-layer h2{display:flex;align-items:center;justify-content:center;background:var(--ds-navy900);color:white;font-size:var(--type-body);border-radius:10px}.pl-nodes{display:grid;gap:16px}.pl-nodes article{background:linear-gradient(120deg,white,#edf7fd);border:1px solid #b5d3e5;border-radius:10px;display:flex;align-items:center;justify-content:center;gap:6px}.pl-nodes strong{font-size:var(--type-supporting)}.pl-edges{position:absolute;inset:0;width:944px;height:376px;overflow:visible;color:var(--ds-blue600)}.pl-edges path:not(defs path){stroke:var(--ds-blue600);stroke-width:1.7;fill:none}.pl-edges text{font-size:var(--type-source);fill:var(--ds-navy700);paint-order:stroke;stroke:white;stroke-width:4px}.pl-gantt,.pl-table{border-collapse:collapse;width:100%;table-layout:fixed;background:rgba(255,255,255,.96);border-bottom:2px solid var(--ds-navy700)}.pl-gantt thead th,.pl-table thead th{background:var(--ds-navy900);color:white;height:55px;font-size:var(--type-supporting);font-weight:var(--weight-bold)}.pl-gantt th:first-child{width:150px}.pl-gantt tbody th{height:73px;text-align:left;padding-left:18px;font-size:var(--type-body);border-bottom:1px solid #deebf3}.pl-gantt td{position:relative;padding:0;border-bottom:1px solid #deebf3}.pl-gridlines{position:absolute;inset:0;background-image:linear-gradient(to right,#dceaf3 1px,transparent 1px)}.pl-bar{position:absolute;top:19px;height:35px;background:linear-gradient(90deg,var(--ds-blue600),var(--ds-blue500));border-radius:5px;display:flex;align-items:center;justify-content:center;color:white;font-size:var(--type-detail);font-weight:var(--weight-bold)}.pl-bar b{position:absolute;right:-8px;color:var(--ds-orange500);font-size:var(--type-body);text-shadow:0 0 3px white}.pl-table th,.pl-table td{padding:20px 24px;text-align:left}.pl-table tbody th,.pl-table tbody td{height:104px;border-bottom:1px solid #dceaf3;font-size:var(--type-body);line-height:1.5}.pl-table tbody th{background:#edf6fb}.pl-table tbody th span{color:var(--ds-blue600);font-size:var(--type-detail);margin-right:12px}.pl-table td:last-child{font-weight:var(--weight-bold)}.pl-value{font-size:var(--type-display);font-weight:var(--weight-bold);color:var(--ds-blue600);margin:45px 0 28px;letter-spacing:-2px}.pl-evidence{display:block;border-top:1px solid #c8deec;margin-top:22px;padding-top:15px;font-size:var(--type-detail);color:var(--ds-blue600)}.pl-org .pl-leader{position:relative;margin:0 auto 43px;width:340px;background:var(--ds-navy900);color:white;padding:18px;text-align:center;border-radius:12px}.pl-leader strong{font-size:var(--type-body)}.pl-leader p{font-size:var(--type-label);margin-top:7px}.pl-leader:after{content:'';position:absolute;left:50%;height:24px;border-left:2px solid var(--ds-blue300);bottom:-24px}.pl-teams{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:26px}.pl-teams:before{content:'';position:absolute;left:16.5%;right:16.5%;top:-20px;border-top:2px solid var(--ds-blue300)}.pl-teams .pl-panel{padding:10px 20px;text-align:center;height:236px}.pl-teams .pl-panel:before{content:'';position:absolute;left:50%;top:-21px;height:20px;border-left:2px solid var(--ds-blue300)}.pl-teams .proposal-illustration-icon{margin:0 auto}.pl-teams h2{font-size:var(--type-body)}.pl-teams p{font-size:var(--type-supporting);margin-top:8px}.pl-screen{display:grid;grid-template-columns:1.65fr 1fr;gap:32px;height:100%}.pl-screen figure{min-width:0;border:1px solid #b8d9eb;background:white;border-radius:12px;overflow:hidden}.pl-screen figure>img{display:block;width:100%;height:330px;object-fit:contain}.pl-screen figcaption{font-size:var(--type-source);color:#526c7e;text-align:center;padding:12px}.pl-screen-placeholder{height:330px;background:linear-gradient(145deg,#f8fcff,#e1eff9);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px}.pl-screen-placeholder strong{font-size:var(--type-body)}.pl-screen-placeholder p{font-size:var(--type-label)}.pl-screen ol{padding:0;margin:0;list-style:none}.pl-screen li{position:relative;padding:15px 0 24px 45px;border-bottom:1px solid #dceaf3}.pl-screen li>span{position:absolute;left:0;top:19px;font-weight:var(--weight-bold);color:var(--ds-blue600);font-size:var(--type-label)}.pl-screen li h2{font-size:var(--type-body)}.pl-screen li p{font-size:var(--type-supporting);line-height:1.5;margin-top:10px}.pl-dark .pl-background{object-position:center}.pl-dark .pl-wash{background:linear-gradient(90deg,#092e49ed,#092e4999 65%,#092e4933)}.pl-dark .pl-heading{top:150px;right:80px}.pl-dark .pl-heading h1{font-size:var(--type-display);line-height:1.25;color:white;margin-top:34px;max-width:820px}.pl-dark .pl-heading>p:first-child{color:#9ed6ff;font-size:var(--type-supporting)}.pl-dark .pl-heading .pl-subtitle{color:#dfedf6;margin-top:26px;font-size:var(--type-body)}.pl-dark .pl-footer{color:#dfedf6;border-color:#76b1e166}.pl-dark .pl-body{top:495px;color:white}.pl-chapter{font-size:var(--type-display);line-height:1;font-weight:var(--weight-bold);color:#76b1e1}.pl-cover-line{font-size:var(--type-body);border-left:4px solid var(--ds-orange500);padding:12px 20px}.pl-kind-closing .pl-panel{padding-top:24px}.pl-kind-metrics .pl-panel{border-top:4px solid var(--ds-blue600)}
.pl-kind-trace .pl-takeaway{font-weight:var(--weight-regular)}.pl-takeaway-emphasis{color:var(--ds-text-emphasis-inverse,#ffbd80);font-weight:var(--weight-bold)}

.pl-kind-process .pl-body{top:200px;height:380px}.pl-process .pl-panel{padding:16px 12px}.pl-process .proposal-illustration-icon{width:102px;height:102px;margin:5px auto 10px}.pl-process .pl-output{margin-top:12px;padding-top:10px}.pl-kind-trace .pl-body{top:200px}.pl-heading h1{font-size:var(--type-title)}
</style>
<style scoped>
.pl-kind-risk .pl-body{height:364px}
.pl-kind-risk .pl-takeaway{background:#eaf5fc;color:var(--ds-navy900);font-weight:var(--weight-regular)}
.pl-kind-risk .pl-takeaway-emphasis{color:var(--ds-orange700,#b85610)}
</style>
<style scoped>
.pl-kind-table .pl-body{height:364px}
.pl-kind-table .pl-takeaway{background:#eaf5fc;color:var(--ds-navy900);font-weight:var(--weight-regular)}
.pl-kind-table .pl-takeaway-emphasis{color:var(--ds-orange700,#b85610)}
</style>
<style scoped>
.pl-kind-evidence .pl-body{top:190px;height:374px}
.pl-kind-evidence .pl-takeaway{background:#eaf5fc;color:var(--ds-navy900);font-weight:var(--weight-regular)}
.pl-kind-evidence .pl-takeaway-emphasis{color:var(--ds-orange700,#b85610)}
</style>
<style scoped>
.pl-kind-process .pl-takeaway{background:#eaf5fc;color:var(--ds-navy900);font-weight:var(--weight-regular)}
.pl-kind-process .pl-takeaway-emphasis{color:var(--ds-orange700,#b85610)}
.pl-kind-process .pl-body{height:364px}
</style>
