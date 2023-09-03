import { withInstall } from '@ideaz/utils'
import type { App, Plugin } from 'vue'
import Dialog from './src/index'
import DialogTip from './src/dialog'

export type SFCWithInstall<T> = T & Plugin

const _DialogTip = DialogTip as SFCWithInstall<typeof DialogTip>

_DialogTip.install = (app: App) => {
  _DialogTip._context = app._context
  app.config.globalProperties.$dialogTip = _DialogTip
}

export default { ZDialog: withInstall(Dialog), ZDialogTip: _DialogTip }
