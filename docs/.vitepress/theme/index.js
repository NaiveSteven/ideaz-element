import DefaultTheme from 'vitepress/theme'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import './styles/index.scss'
import '../../../src/styles/index.css'
import 'element-plus/dist/index.css'
import '@ideaz/theme-chalk/src/index.scss'
import ElementPlus from 'element-plus'
import zhCn from '@ideaz/locale/lang/zh-cn'
import ideazui, { ZDialogTip } from '@ideaz/element'
import * as ElIconModules from '@element-plus/icons-vue'
import Button from '../../../src/components/Button.vue'
import { useComponents } from './useComponents'
import 'uno.css'

function transElIconName(iconName) {
  return `i${iconName.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}`
}

window.ZDialogTip = ZDialogTip

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    useComponents(ctx.app)
    ctx.app.component(Button.name, Button)
    ctx.app.use(ElementPlus).use(ideazui, { locale: zhCn, size: 'default' })
    Object.keys(ElIconModules).forEach((item) => {
      const cur = item
      ctx.app.component(transElIconName(item), ElIconModules[cur])
    })
  },
}
