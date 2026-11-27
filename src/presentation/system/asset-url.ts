let configuredBase: string | undefined

/**
 * 소비 앱에서 발표 에셋(/presentation/...)을 서빙하는 기준 경로를 지정한다.
 * 예: 앱이 에셋을 `/vendor/ispark/presentation/...`에 두었다면 `setPresentationAssetBase('/vendor/ispark/')`.
 * 지정하지 않으면 빌드 시점의 BASE_URL(Storybook 배포 경로)을 사용한다.
 */
export function setPresentationAssetBase(base: string | undefined) {
  configuredBase = base
}

/** Resolve bundled public assets under the configured (or Storybook) base, leaving user URLs intact. */
export function presentationAssetUrl(src: string, base = configuredBase ?? import.meta.env.BASE_URL): string {
  if (!src.startsWith('/presentation/')) return src
  return `${base.replace(/\/$/, '')}/${src.slice(1)}`
}
