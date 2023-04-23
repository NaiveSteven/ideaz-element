import type { ComponentPublicInstance } from 'vue';

export const useExpose = (exposing: any) => {
  const instance = getCurrentInstance()!;
  if (!instance) {
    throw new Error('expose should be called in setup().');
  }

  const keys = Object.keys(exposing);

  keys.forEach((key) => {
    instance.proxy![key as keyof ComponentPublicInstance] = exposing[key];
  });

  onBeforeUnmount(() => {
    keys.forEach((key) => {
      instance.proxy![key as keyof ComponentPublicInstance] = exposing[key];
    });
  });
};
