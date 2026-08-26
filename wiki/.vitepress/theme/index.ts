// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './assets/styles/style.css'
import './assets/styles/icons.css'
import ImageZoom from './components/ImageZoom.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ImageZoom', ImageZoom)
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
} satisfies Theme
