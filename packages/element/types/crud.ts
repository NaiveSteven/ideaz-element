import type { Ref } from 'vue'
import type { TableCol } from './table'
import type { FormColumn } from './form'

export interface DialogFormCancelParams<T = any, K = any> {
  done: () => void
  formRef: any
  formData: T
  type: 'view' | 'add' | 'edit'
  row: K
  confirmButtonLoading: Ref<boolean>
}

export interface DialogFormSubmitParams<T = any, K = any> extends DialogFormCancelParams<T, K> {
  done: () => void
  row: K
  invalidFields: string[]
}

export interface DetailRequestApiParams<T = any> {
  row: T
  [propName: string]: any
}

export interface DeleteRequestApiParams<T = any> {
  row?: T
  selectionData?: T[]
  [propName: string]: any
}

export interface AddRequestApiParams<T = any> {
  type: 'add' | 'edit' | 'view'
  formData: T
}

export interface CrudCol extends Partial<TableCol> {
  add?: FormColumn
  edit?: FormColumn
  detail?: FormColumn
  search?: FormColumn
  form?: FormColumn
}

export type EditRequestApiParams<T = any, K = any> = AddRequestApiParams<T> & DetailRequestApiParams<K>
