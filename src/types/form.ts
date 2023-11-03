import type { FormItemProps as ElFormItemProps, FormItemRule, FormRules } from 'element-plus'
import type { CSSProperties } from 'vue'
import type { IndexType, OptionsItem } from './common'

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
  colon?: boolean
  field?: string
  formItemProps?: Partial<ElFormItemProps> & FormItemProps
  fieldProps?: IndexType
  hide?: (formData: any) => boolean
  hideUseVShow?: (formData: any) => boolean
  on?: IndexType
  slot?: string
  colGrid?: IndexType
  modifier?: string
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
}
