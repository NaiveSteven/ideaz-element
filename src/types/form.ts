import type { IndexType } from './common'

export interface FormColumn {
  type?: string | (() => string)
  prop?: string
  formItem?: IndexType
  attrs?: IndexType
  hide?: () => boolean
  hideUseVShow?: () => boolean
  on?: IndexType
  slot?: string
  colGrid?: IndexType
  modifier?: string
  render?: any
  __key?: string // 组件库生成的key
  key?: string // 用户传入的key
}
