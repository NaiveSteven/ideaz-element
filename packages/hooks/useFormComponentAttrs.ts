import { useComponentMethods } from './useComponentMethods';

export const useFormComponentAttrs = (props: Record<any, any>) => {
  const { blur, focus, change, input, clear, visibleChange, removeTag } =
    useComponentMethods(props);
  const obj = {
    blur,
    focus,
    change,
    input,
    clear,
    visibleChange,
    removeTag,
  };
  const attrs = useAttrs();
  const onAll = computed(() => {
    const newOn = {};
    if (props.on) {
      Object.keys(props.on).forEach((item) => {
        newOn[item] = obj[item as keyof typeof obj] || function () {};
      });
    }
    return newOn;
  });
  const attrsAll = computed(() => {
    return { ...attrs, ...props.attrs };
  });

  return { attrsAll, onAll };
};
