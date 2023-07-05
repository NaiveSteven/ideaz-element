import { getCurrentInstance } from 'vue-demi'
import { cloneDeep } from 'lodash-es'
import { isFunction, isObject } from '@ideaz/utils'
import type { ComponentInternalInstance } from 'vue'
import type { ValidateField, validateCallback, validateFieldCallback } from '~/types'

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

export const useFormMethods = (props?: any) => {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
  const originFormModel
    = (isObject(props) && isObject(props.formModel))
      ? cloneDeep(props.formModel)
      : null

  const runArrayFormMethods = (method: string, props?: any, callback?: validateCallback | validateFieldCallback) => {
    Object.keys(ctx!.$refs).forEach((key) => {
      if (key.includes('arrayForm'))
        (ctx!.$refs[key] as ElForm)[method as keyof ElForm](props, callback as validateFieldCallback)
    })
  }

  const validate = async (callback?: validateFieldCallback | validateCallback) => {
    try {
      if (props && props.type === 'array') {
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
    if (props && props.type === 'array') {
      runArrayFormMethods('resetFields')
    }
    else {
      (ctx?.$refs.formRef as ElForm).resetFields()
      // 表单项使用 hide，条件满足显示元素，最后一个表单项数据无法被重置。手动清空
      if (originFormModel) {
        Object.keys(originFormModel).forEach((key) => {
          props!.formModel[key] = originFormModel[key]
        })
      }
    }
  }

  const scrollToField = (prop: string) => {
    (ctx?.$refs.formRef as ElForm).scrollToField(prop)
  }

  const clearValidate = (attrs: string[] | string) => {
    if (props && props.type === 'array')
      runArrayFormMethods('clearValidate', props)

    else
      (ctx?.$refs.formRef as ElForm).clearValidate(attrs)
  }

  return { resetFields, validate, validateField, clearValidate, scrollToField }
}
