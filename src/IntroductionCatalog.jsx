import React, { useEffect, useRef } from 'react'
import { createApp } from 'vue'
import Catalog from './IntroductionCatalog.vue'

// Storybook MDX renders React; mount the real Vue components in an isolated root.
export function IntroductionCatalog() {
  const root = useRef(null)
  useEffect(() => {
    const app = createApp(Catalog)
    app.mount(root.current)
    return () => app.unmount()
  }, [])
  return <div ref={root} />
}