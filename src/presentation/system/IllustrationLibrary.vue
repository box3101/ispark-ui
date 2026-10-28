<script setup lang="ts">
import {presentationAssetUrl} from './asset-url'

import {computed,ref} from 'vue'
import IllustrationIcon from './IllustrationIcon.vue'
import ArtworkWindow from './ArtworkWindow.vue'
import {SemanticIcon} from './components'
import {illustrationAssets,illustrationUrl,illustrationCoverage} from './illustration-assets'
import './system.css'
const query=ref(''),surface=ref('checker')
const matches=computed(()=>illustrationAssets.filter(a=>[a.id,a.label,a.concept,...a.tags].join(' ').toLowerCase().includes(query.value.trim().toLowerCase())))
</script>
<template>
 <div class="asset-library">
  <header><p>발표 디자인 시스템 / 공통 자산</p><h1>입체 아이콘 · 배경 · 장식</h1><p>파일을 내려받거나 이름으로 선택해 다른 RFP 장표에서도 재사용합니다.</p><p><strong>{{illustrationCoverage.length}}개 의미 · {{illustrationAssets.length}}개 입체 이미지</strong> — 기존 SVG와 같은 의미 이름으로 선택합니다.</p></header>
  <div class="asset-toolbar"><label>아이콘 검색 <input v-model="query" placeholder="데이터, 제도, 성과…" type="search" /></label><label>미리보기 배경 <select v-model="surface"><option value="checker">투명 격자</option><option value="light">밝은 배경</option><option value="dark">남색 배경</option></select></label><span>{{matches.length}} / {{illustrationAssets.length}}개</span></div>
  <div class="asset-grid">
   <article v-for="a in matches" :key="a.id" class="asset-card">
    <div class="asset-preview" :class="surface"><IllustrationIcon :name="a.id" :size="220" :decorative="false" /></div>
    <h2>{{a.label}}</h2><code>{{a.id}}</code><p>{{a.tags.join(' · ')}}</p>
    <div class="asset-semantic"><SemanticIcon :concept="a.concept" /><span>기본 아이콘: {{a.concept}}</span></div>
    <a :href="illustrationUrl(a.id)" :download="a.file">투명 PNG 다운로드 ↓</a>
   </article>
  </div>
  <p v-if="!matches.length" role="status">검색 결과가 없습니다.</p>
  <h2 class="asset-group-title">배경 · 장식</h2>
  <div class="asset-backgrounds">
   <article><img :src="presentationAssetUrl('/presentation/illustrated/jeju-background.png')" alt="제주 해안 배경"/><h3>제주 해안 배경</h3><p>AI 생성 콘셉트 이미지 · 문구 없음</p><a :href="presentationAssetUrl('/presentation/illustrated/jeju-background.png')" download>배경 PNG 다운로드 ↓</a></article>
   <article><div class="asset-wave"><ArtworkWindow src="/presentation/illustrated/artwork-atlas.png" :x="65" :y="641" :width="438" :height="178" /></div><h3>카드 하단 물결</h3><p>밝은 카드용 아트워크 영역 · 투명 파일 아님</p><code>ArtworkWindow · 65, 641, 438, 178</code></article>
  </div>
  <p class="asset-note">입체 아이콘은 이미지이므로 색상 토큰으로 재색칠되지 않습니다. 기본 SVG는 색상 변경이 가능하며, 두 표현은 같은 의미 이름으로 연결됩니다.</p>
 </div>
</template>
<style scoped>
.asset-library{padding:32px;max-width:1400px;font-family:var(--presentation-font);color:#092e49;background:#f5f8fb;box-sizing:border-box}.asset-library h1{font-size:var(--type-step);margin:12px 0}.asset-library header p{color:#52647d}.asset-toolbar{display:flex;gap:24px;align-items:center;flex-wrap:wrap;margin:28px 0}.asset-toolbar label{display:flex;gap:10px;align-items:center;font-weight:var(--weight-bold)}.asset-toolbar input,.asset-toolbar select{padding:10px 12px;border:1px solid #bbd2e1;border-radius:6px;background:white;color:#092e49;font:inherit}.asset-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}.asset-card{background:white;padding:16px;border:1px solid #dce6ee;border-radius:12px;min-width:0}.asset-preview{height:230px;border-radius:8px;display:flex;align-items:center;justify-content:center}.asset-preview.checker{background-color:#fff;background-image:conic-gradient(#e5e8eb 25%,transparent 0 50%,#e5e8eb 0 75%,transparent 0);background-size:24px 24px}.asset-preview.dark{background:#092e49}.asset-preview.light{background:#fff}.asset-card h2{font-size:var(--type-supporting);margin:18px 0 9px}.asset-card p{font-size:var(--type-micro);color:#52647d}.asset-card code{font-size:var(--type-source)}.asset-semantic{display:flex;align-items:center;gap:12px;margin:15px 0;font-size:var(--type-source)}.asset-semantic :deep(.ds-icon){width:35px;height:35px;background:#dfedf6;color:#006fbd}.asset-semantic :deep(svg){width:23px;height:23px}.asset-library a{display:inline-block;color:#006fbd;font-weight:var(--weight-bold);margin-top:10px}.asset-group-title{margin-top:36px}.asset-backgrounds{display:grid;grid-template-columns:1fr 1fr;gap:24px}.asset-backgrounds article{background:white;padding:20px;border-radius:10px}.asset-backgrounds img,.asset-wave{width:100%;height:230px;object-fit:cover}.asset-wave{display:flex;align-items:center;background:#f0f8fe}.asset-wave svg{width:100%}.asset-backgrounds p,.asset-note{font-size:var(--type-micro);color:#52647d}.asset-note{margin-top:30px}@media(max-width:800px){.asset-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.asset-backgrounds{grid-template-columns:1fr}}
</style>
