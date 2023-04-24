export const useFormItemComponent = (props: Record<any, any>) => {
  const getComponentName = (type: string | (() => string)) => {
    const cNames = ['select', 'radio', 'checkbox'];
    const eleNames = ['input', 'datepicker', 'switch'];
    const propComponentName = typeof type === 'function' ? type() : type;

    if (cNames.includes(propComponentName)) {
      return `z-${propComponentName}`;
    } else if (eleNames.includes(propComponentName)) {
      if (propComponentName === 'datepicker') {
        return 'el-date-picker';
      }
      return `el-${propComponentName}`;
    } else {
      return propComponentName || 'unknown';
    }
  };

  const componentName = computed(() => {
    return getComponentName(props.col.type);
  });

  return { componentName };
};
