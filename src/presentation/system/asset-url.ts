/** Resolve bundled public assets under Storybook's deployment base, leaving user URLs intact. */
export function presentationAssetUrl(src: string, base = import.meta.env.BASE_URL): string {
  if (!src.startsWith('/presentation/')) return src
  return `${base.replace(/\/$/, '')}/${src.slice(1)}`
}
