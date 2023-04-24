import { getCurrentInstance } from 'vue-demi';
import { cloneDeep } from 'lodash-es';
import { isObject } from '@ideaz/utils';
import type { ComponentInternalInstance } from 'vue';
import type { validateCallback, validateFieldCallback } from '~/types';

interface ElForm {
  validate: (callback: validateCallback) => Promise<boolean>;
  validateField: (
    props: string[] | string,
    callback: validateFieldCallback
  ) => Promise<boolean>;
  resetFields: () => void;
  clearValidate: (props: string[] | string) => void;
  scrollToField: (prop: string) => void;
}

export const useFormMethods = (props?: any) => {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance;
  const originFormModel =
    isObject(props) && isObject(props.formModel)
      ? cloneDeep(props.formModel)
      : null;

  const validate = async (callback: validateCallback) => {
    try {
      const res = await (ctx?.$refs.formRef as ElForm).validate(callback);
      return res;
    } catch (error) {
      return false;
    }
  };

  const validateField = async (
    props: string[] | string,
    callback: validateFieldCallback
  ) => {
    try {
      const res = await (ctx?.$refs.formRef as ElForm).validateField(
        props,
        callback
      );
      return res;
    } catch (error) {
      return false;
    }
  };

  const resetFields = () => {
    (ctx?.$refs.formRef as ElForm).resetFields();
    // 表单项使用 hide，条件满足显示元素，最后一个表单项数据无法被重置。手动清空
    if (originFormModel) {
      Object.keys(originFormModel).forEach((key) => {
        props!.formModel[key] = originFormModel[key];
      });
    }
  };

  const scrollToField = (prop: string) => {
    (ctx?.$refs.formRef as ElForm).scrollToField(prop);
  };

  const clearValidate = (props: string[] | string) => {
    (ctx?.$refs.formRef as ElForm).clearValidate(props);
  };

  return { resetFields, validate, validateField, clearValidate, scrollToField };
};
