import {describe,it,expect} from 'vitest'
import {presentationAssetUrl} from './asset-url'
describe('presentation assets on subpath deployments',()=>{
 it('supports root, project and relative Storybook bases',()=>{
  const path='/presentation/illustrated/icons/data-migration.png'
  expect(presentationAssetUrl(path,'/')).toBe(path)
  expect(presentationAssetUrl(path,'/ispark-ui/')).toBe('/ispark-ui'+path)
  expect(presentationAssetUrl(path,'./')).toBe('.'+path)
 })
 it('preserves external, local PDF, inline and already resolved URLs',()=>{
  for(const path of ['https://example.com/image.png','file:///C:/art.png','data:image/png;base64,abc','blob:example','/ispark-ui/presentation/image.png',''])expect(presentationAssetUrl(path,'/ispark-ui/')).toBe(path)
 })
})
