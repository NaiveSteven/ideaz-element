import { isVue3 } from 'vue-demi';
import { vue2GlobalConfig } from './useGlobalConfig';

export const useGlobalSize = () => {
  if (isVue3) {
    const injectedSize = inject('size', {});

    return computed<any>(() => {
      return unref(injectedSize.size) || '';
    });
  } else {
    return computed<any>(() => {
      return unref(vue2GlobalConfig).size;
    });
  }
};
