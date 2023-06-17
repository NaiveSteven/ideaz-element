import type { IndexType } from './common'

export interface FormColumn {
  type?: string | (() => string)
  tooltip?: string | (() => VNode)
  label?: string | (() => VNode)
  extra?: string | (() => VNode)
  field?: string
  formItemProps?: IndexType
  fieldProps?: IndexType
  hide?: () => boolean
  hideUseVShow?: () => boolean
  on?: IndexType
  slot?: string
  colGrid?: IndexType
  modifier?: string
  render?: any
  rearSlot?: string
  frontSlot?: string
  __key?: string // 组件库生成的key
  key?: string // 用户传入的key
}
