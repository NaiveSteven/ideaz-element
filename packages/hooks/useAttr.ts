export const useAttr = <T>(name: string): ComputedRef<T | undefined> => {
  const vm = getCurrentInstance();
  return computed(() => (vm?.proxy?.$attrs as any)?.[name]);
};
