import DefaultTheme from 'vitepress/theme'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import './styles/index.scss'
import 'element-plus/dist/index.css'
import '@ideaz/theme-chalk/src/index.scss'
import zhCn from '@ideaz/locale/lang/zh-cn'
import * as ElIconModules from '@element-plus/icons-vue'
import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import 'uno.css'

function transElIconName(iconName) {
  return `i${iconName.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}`
}

export default {
  ...DefaultTheme,
  async enhanceApp({ app }) {
    // DefaultTheme.enhanceApp(ctx)
    Object.keys(ElIconModules).forEach((item) => {
      const cur = item
      app.component(transElIconName(item), ElIconModules[cur])
    })
    app.component('DemoPreview', ElementPlusContainer)
    if (!import.meta.env.SSR) {
      const { ZDialogTip } = await import('@ideaz/element')
      const ElementPlus = await import('element-plus')
      const ideazui = await import('@ideaz/element')
      window.ZDialogTip = ZDialogTip
      app.use(ElementPlus)
      app.use(ideazui.default, { locale: zhCn, size: 'default' })
    }
  },
}
