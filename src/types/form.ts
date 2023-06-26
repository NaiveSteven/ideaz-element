import type { FormItemProps as ElFormItemProps, FormItemRule, FormRules } from 'element-plus'
import type { CSSProperties } from 'vue'
import type { IndexType } from './common'

interface FormItemProps {
  tooltip?: string | (() => VNode)
  label?: string | (() => VNode)
  extra?: string | (() => VNode)
  colon?: boolean
  class?: string | string[]
  style?: CSSProperties
}

export interface FormColumn {
  component?: string | (() => string)
  tooltip?: string | (() => VNode)
  label?: string | (() => VNode)
  extra?: string | (() => VNode)
  field?: string
  formItemProps?: Partial<ElFormItemProps> & FormItemProps
  fieldProps?: IndexType
  hide?: () => boolean
  hideUseVShow?: () => boolean
  on?: IndexType
  slot?: string
  colGrid?: IndexType
  modifier?: string
  render?: any
  // rearSlot?: string
  // frontSlot?: string
  error?: string | (() => VNode)
  class?: string
  style?: string
  rules?: FormRules | FormItemRule
  __key?: string // 组件库生成的key
  key?: string // 用户传入的key
}
