import type { App } from 'vue'

let nextRootId = 0

// Inline docs mount multiple Vue apps in one document. useId() is app-local.
export function configureStoryIds(app: App) {
  app.config.idPrefix = `storybook-${++nextRootId}`
}
