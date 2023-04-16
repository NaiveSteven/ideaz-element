import { isVue3 } from 'vue-demi';

type EmitType = (event: any, ...args: any[]) => void;

export const useVModel = (props: Record<any, any>, emit: EmitType) => {
  const vModelVal = computed({
    get: () => {
      if (isVue3) {
        return props.modelValue;
      }
      return props.value;
    },
    set: (val) => {
      if (isVue3) {
        emit('update:modelValue', val);
      } else {
        emit('input', val);
      }
    },
  });

  const handleInput = (val: string) => {
    if (isVue3) {
      emit('input', val);
    } else {
      vModelVal.value = val;
    }
  };

  return {
    vModelVal,
    handleInput,
  };
};
