import { isFunction } from '@ideaz/utils';

export const useFormItemProps = (props: Record<any, any>) => {
  const formItemProps = computed(() => {
    const myProps = { ...(props.col.formItem || {}) };
    if (isFunction(myProps.label)) {
      delete myProps.label;
    }
    return myProps;
  });

  return { formItemProps };
};
