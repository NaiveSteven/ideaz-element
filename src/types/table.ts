import type { OptionsItem } from './common'
import type { FormColumn } from './form'

export interface BtnItem {
  label?: string
  type?: string
  isDisabled?: (row: any, index: number, column: any) => boolean
  disabled?: ((row: any, index: number) => boolean) | boolean
  whenShowCb?: (row: any, index: number, column: any) => boolean
  hide?: ((row: any, index: number) => boolean) | boolean
  onClick?: (row: any, index: number, column: any) => void
  trigger?: string
  reference?: string | ((h: any, scope: any) => VNode)
  size?: string
  onCommand: (command: string) => void
  [propName: string]: any
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
  [propName: string]: any
}
