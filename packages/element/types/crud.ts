import type { Ref } from 'vue'

export interface DialogFormCancelParams<T = any> {
  done: () => void
  formRef: any
  formData: T
  type: 'view' | 'add' | 'edit'
  confirmButtonLoading: Ref<boolean>
}

export interface DialogFormSubmitParams<T = any, K = any> extends DialogFormCancelParams<T> {
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

export type EditRequestApiParams<T = any, K = any> = AddRequestApiParams<T> & DetailRequestApiParams<K>
