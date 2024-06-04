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
