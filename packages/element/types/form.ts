import type { FormItemProps as ElFormItemProps, ElTooltipProps, FormItemRule, FormRules } from 'element-plus'
import type { CSSProperties, VNode } from 'vue'
import type { IndexType, OptionsItem } from './common'

export type TooltipObjectType = Omit<Partial<ElTooltipProps>, 'content'> & { reference?: (() => VNode) | string, content: string | (() => VNode) }

export type FormItemTooltip = string | (() => VNode) | TooltipObjectType

export interface FormItemProps {
  tooltip?: FormItemTooltip
  label?: string | (() => VNode)
  extra?: string | (() => VNode)
  colon?: boolean
  class?: string | string[]
  style?: CSSProperties
}

export interface FormColumn {
  component?: string | (() => string)
  tooltip?: FormItemTooltip
  label?: string | (() => VNode)
  extra?: string | (() => VNode)
  colon?: boolean
  field?: string
  formItemProps?: Partial<ElFormItemProps> & FormItemProps
  fieldProps?: IndexType
  hide?: ((formData: any) => boolean) | boolean
  show?: ((formData: any) => boolean) | boolean
  on?: IndexType
  slot?: string
  colGrid?: IndexType
  modifier?: string
  order?: number
  render?: any
  // rearSlot?: string
  // frontSlot?: string
  error?: string | (() => VNode)
  class?: string
  style?: CSSProperties
  rules?: FormRules | FormItemRule
  message?: string
  __key?: string // 组件库生成的key
  key?: string // 用户传入的key
  children?: FormColumn[]
  disabled?: boolean
  options?: OptionsItem[]
  required?: boolean
  labelWidth?: string | number
  // grid
  span?: number // col span
  offset?: number // col offset
  pull?: number // col pull
  push?: number // col push
  xs?: number | object // <576px
  sm?: number | object // ≥576px
  md?: number | object // ≥768px
  lg?: number | object // ≥992px
  xl?: number | object // ≥1200px
  // step
  icon?: string | (() => VNode)
  description?: string | (() => VNode)
  status?: '' | 'wait' | 'process' | 'finish' | 'error' | 'success'
  max?: number
  // group
  contentPosition?: 'left' | 'right' | 'center'
  borderStyle?: 'none' | 'solid' | 'hidden' | 'dashed' | ''
  prop?: string
}
