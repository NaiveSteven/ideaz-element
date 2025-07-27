import { getCurrentInstance } from 'vue'
import { cloneDeep } from 'lodash-unified'
import { isFunction, isObject } from '@ideaz/utils'
import type { ComponentInternalInstance, ComputedRef } from 'vue'
import type { FormProps } from '../props'
import type { ValidateField, validateCallback, validateFieldCallback } from '../../../types'

interface ElForm {
  validate: (callback?: validateCallback) => Promise<boolean>
  validateField: (
    props: string[] | string,
    callback: validateFieldCallback
  ) => Promise<boolean>
  resetFields: () => void
  clearValidate: (props: string[] | string) => void
  scrollToField: (prop: string) => void
}

export function useFormMethods(mergedProps?: ComputedRef<FormProps>) {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
  const originModelValue
    = (isObject(mergedProps?.value) && isObject(mergedProps?.value.modelValue))
      ? cloneDeep(mergedProps?.value.modelValue)
      : null

  const runArrayFormMethods = (method: string, props?: any, callback?: validateCallback | validateFieldCallback) => {
    Object.keys(ctx!.$refs).forEach((key) => {
      if (key.includes('arrayForm'))
        (ctx!.$refs[key] as ElForm)[method as keyof ElForm](props, callback as validateFieldCallback)
    })
  }

  const validate = async (callback?: validateFieldCallback | validateCallback) => {
    try {
      if (mergedProps?.value && mergedProps.value.type === 'array') {
        let isPassValidate = true
        const keys = Object.keys(ctx!.$refs)
        let fields: ValidateField = {}
        for (let index = 0; index < keys.length; index++) {
          const key = keys[index]
          if (key.includes('arrayForm') && ctx!.$refs[key]) {
            await (ctx!.$refs[key] as ElForm).validate((val: boolean, field: ValidateField) => {
              if (!val) {
                isPassValidate = false
                fields = { ...fields, ...field }
              }
            })
          }
        }
        return isFunction(callback) ? (callback as validateCallback)(isPassValidate, fields) : isPassValidate
      }
      else {
        const res = await (ctx?.$refs.formRef as ElForm).validate(callback as validateCallback)
        return res
      }
    }
    catch (error) {
      return false
    }
  }

  const validateField = async (
    props: string[] | string,
    callback: validateFieldCallback,
  ) => {
    try {
      const res = await (ctx?.$refs.formRef as ElForm).validateField(
        props,
        callback,
      )
      return res
    }
    catch (error) {
      return false
    }
  }

  const resetFields = () => {
    if (mergedProps?.value && mergedProps.value.type === 'array') {
      runArrayFormMethods('resetFields')
    }
    else {
      (ctx?.$refs.formRef as ElForm).resetFields()
      // If you use hide for form entries, the form entry data may not be reset. Manual clearing
      if (originModelValue) {
        Object.keys(originModelValue).forEach((key) => {
          mergedProps!.value.modelValue[key] = originModelValue[key]
        })
      }
    }
  }

  const scrollToField = (prop: string) => {
    (ctx?.$refs.formRef as ElForm).scrollToField(prop)
  }

  const clearValidate = (attrs: string[] | string) => {
    if (mergedProps?.value && mergedProps.value.type === 'array')
      runArrayFormMethods('clearValidate', mergedProps.value)

    else
      (ctx?.$refs.formRef as ElForm).clearValidate(attrs)
  }

  return { resetFields, validate, validateField, clearValidate, scrollToField }
}
