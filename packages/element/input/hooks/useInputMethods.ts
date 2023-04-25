import { getCurrentInstance } from 'vue-demi';
import type { ComponentInternalInstance } from 'vue';

interface InputMethods {
  focus: () => void;
  blur: () => void;
  select: () => void;
}

export const useFormMethods = () => {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance;

  const focus = () => {
    (ctx?.$refs.inputRef as InputMethods).focus();
  };

  const blur = () => {
    (ctx?.$refs.inputRef as InputMethods).blur();
  };

  const select = () => {
    (ctx?.$refs.inputRef as InputMethods).select();
  };

  return { focus, blur, select };
};
