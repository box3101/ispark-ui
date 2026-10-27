// Registry verification independently checks every original proposal concept.
import {createServer} from 'vite';
import {existsSync,writeFileSync,mkdirSync} from 'node:fs';
const server=await createServer({configFile:false,optimizeDeps:{noDiscovery:true,include:[],entries:[]},server:{middlewareMode:true,hmr:false,ws:false},appType:'custom',logLevel:'error'});
try{
 const {proposalIcons}=await server.ssrLoadModule('/presentation/icons/icon-map.ts');
 const m=await server.ssrLoadModule('/src/presentation/system/illustration-assets.ts');
 if(new Set(m.illustrationAssets.map(a=>a.id)).size!==m.illustrationAssets.length)throw Error('Duplicate ID');
 const coverage=proposalIcons.map(c=>{
  const id=m.defaultIllustrationByConcept[c.key],asset=m.illustrationById[id];
  if(!asset)throw Error(`Missing semantic mapping: ${c.key}`);
  return{concept:c.key,label:c.label,id,file:asset.file};
 });
 const missing=m.illustrationAssets.filter(a=>!existsSync(`public/presentation/illustrated/icons/${a.file}`));
 if(missing.length)throw Error(`Missing PNGs: ${missing.map(a=>a.id).join(', ')}`);
 mkdirSync('output/pdf/asset-library',{recursive:true});
 writeFileSync('output/pdf/asset-library/coverage.json',JSON.stringify({concepts:coverage.length,images:m.illustrationAssets.length,coverage},null,2));
 console.log(`${coverage.length} concepts mapped to ${m.illustrationAssets.length} existing PNG assets.`);
}finally{await server.close()}
