import type { Slot } from 'vue'
import type { PaginationProps } from 'element-plus'

export interface IndexOptions { [propName: string]: OptionsItem[] }

export interface IndexType {
  [propName: string]: any
}

export interface OptionsItem {
  label: string
  value: string | number
  disabled?: boolean
  [propName: string]: any
}

export interface ValidateField {
  [propName: string]: {
    field: string
    fieldValue: any
    message: string
  }
}
export type validateCallback = (isSuccess: boolean, field: ValidateField) => void
export type validateFieldCallback = (errorMessage: string) => void

export interface Pagination extends Partial<PaginationProps> {
  page?: number
  pageSize?: number
  type?: 'front' | 'backbone'
}

export interface Alias {
  label?: string
  value?: string
  disabled?: string
}

export interface Slots {
  [name: string]: undefined | string | (() => JSX.Element) | Slot
}
