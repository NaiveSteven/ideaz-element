import type { ButtonProps, ElForm, TableColumnCtx, dropdownItemProps, dropdownProps } from 'element-plus'
import type { ExtractPropTypes, Ref } from 'vue'
import type { OptionsItem } from './common'
import type { FormColumn } from './form'

export type BtnItem = Partial<Omit<ButtonProps, 'type' | 'disabled'>> & {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'dropdown'
  disabled?: ((scope: TableColumnScopeData) => boolean) | boolean
  hide?: ((scope: TableColumnScopeData) => boolean) | boolean
  onClick?: (scope: TableColumnScopeData) => void
  children?: BtnItem
  reference?: string | ((scope: TableColumnScopeData) => VNode)
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

export interface DefaultButtonOperation {
  renderEdit: BtnItem
  renderSave: BtnItem
  renderCancel: BtnItem
  renderDelete: BtnItem
}
export type ButtonRender<T = any> = (renderData: DefaultButtonOperation, tableData: Ref<T>) => BtnItem[]

export interface TableCol<T = any> {
  slot?: string
  type?: 'index' | 'selection' | 'radio' | 'expand' | 'sort' | 'button'
  component?: string | (() => string)
  buttons?: BtnItem[] | ButtonRender<T>
  fieldProps?: {
    [propName: string]: any
  }
  options?: OptionsItem[]
  dropdown?:
    | number
    | number[]
    | {
      maxlength?: number
      exclude?: number[]
      dropdownItem?: {
        [propName: string]: any
      }
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

export interface TableColumnScopeData<T = any> {
  row: T
  column: TableColumnCtx<T>
  $index: number
}

export interface EditableTableEventParams<T = any> {
  row: T
  $index: number
  column: TableColumnCtx<T>
  formRef: typeof ElForm
}
