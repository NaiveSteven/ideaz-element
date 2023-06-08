export interface IndexOptions { [propName: string]: OptionsItem[] }

export interface IndexType {
  [propName: string]: any
}

export interface OptionsItem {
  label: string
  value: any
  disabled?: boolean
  [propName: string]: any
}
export type validateCallback = (isSuccess: boolean, field: object) => void
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
