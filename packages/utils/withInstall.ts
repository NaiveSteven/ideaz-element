import type { App, Component } from 'vue'

type SFCWithInstall = Component & {
  install: (app: App, options?: Record<keyof any, any>) => void
}

export function withInstall(sfc: Component): SFCWithInstall {
  (sfc as SFCWithInstall).install = (app: App): void => {
    app.component(sfc.name as string, sfc as object)
  }

  return sfc as SFCWithInstall
}
