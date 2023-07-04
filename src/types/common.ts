import type { Slot } from 'vue'

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

export interface Pagination {
  page: number
  page_size: number
  total: number
  [propName: string]: any
}

export interface Alias {
  label?: string
  value?: string
  disabled?: string
}

export interface Slots {
  [name: string]: undefined | string | (() => JSX.Element) | Slot
}
