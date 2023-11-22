import type { ButtonProps, dropdownItemProps, dropdownProps } from 'element-plus'
import type { ExtractPropTypes } from 'vue'
import type { OptionsItem } from './common'
import type { FormColumn } from './form'

export type BtnItem = Partial<Omit<ButtonProps, 'type' | 'disabled'>> & {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'dropdown'
  disabled?: ((row: any, index: number) => boolean) | boolean
  hide?: ((row?: any, index?: number) => boolean) | boolean
  onClick?: (row: any, index: number, column: any) => void
  children?: BtnItem
  reference?: string | ((h: any, scope: any) => VNode)
  onCommand?: (command: string) => void
  [propName: string]: any
} & Partial<ExtractPropTypes<typeof dropdownItemProps>> & Omit<Partial<ExtractPropTypes<typeof dropdownProps>>, 'type'>

export interface ToolBar {
  uncheck?: string[]
  exclude?: string[]
}

export interface TableFormConfig {
  columns: FormColumn[]
  [propName: string]: any
}

export interface TableCol {
  // slot?: string;
  // headerSlot?: string;
  type?: string
  btnList?: BtnItem[]
  buttons?: BtnItem[]
  attrs?: {
    [propName: string]: any
  }
  on?: {
    [propName: string]: any
  }
  disabled?: ((row: any, index: number, column?: any) => boolean) | boolean
  options?: OptionsItem[]
  dropdown?:
  | number
  | number[]
  | {
    maxlength?: number
    exclude?: number[]
    dropdownItem?: IndexType
    reference?: string | any
    [propName: string]: any
  }
  | any
  add?: boolean | FormColumn
  edit?: boolean | FormColumn
  detail?: boolean | any
  search?: boolean | FormColumn
  form?: FormColumn
  __uid?: string
  [propName: string]: any
}
