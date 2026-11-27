// @leechanyong/ispark-ui/presentation — 발표 장표 공개 진입점
export {default as PresentationSlide} from './PresentationSlide.vue'
export {
  presentationLayouts,
  presentationLayoutById,
  presentationCanvas,
  illustrationIds,
  checkSlideContent,
  withFixedContent,
  getPath,
  PRESENTATION_SCHEMA_VERSION,
} from './catalog'
export type {PresentationLayout,FieldSpec,FieldType} from './catalog'
export {setPresentationAssetBase,presentationAssetUrl} from '../system/asset-url'
export {illustrationAssets} from '../system/illustration-assets'
export type {IllustrationId} from '../system/illustration-assets'
