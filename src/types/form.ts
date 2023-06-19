import type { FormItemProps as ElFormItemProps, FormItemRule, FormRules } from 'element-plus'
import type { IndexType } from './common'

interface FormItemProps {
  tooltip?: string | (() => VNode)
  label?: string | (() => VNode)
  extra?: string | (() => VNode)
  colon?: boolean
}

export interface FormColumn {
  type?: string | (() => string)
  tooltip?: string | (() => VNode)
  label?: string | (() => VNode)
  extra?: string | (() => VNode)
  field?: string
  formItemProps?: ElFormItemProps & FormItemProps
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
  class?: string
  style?: string
  rules?: FormRules | FormItemRule
  __key?: string // 组件库生成的key
  key?: string // 用户传入的key
}
