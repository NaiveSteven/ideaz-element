import { cloneDeep } from 'lodash-es';
import { isFunction, uid } from '@ideaz/utils';
import type { FormItemConfigItem } from '~/types';

export const SELECT_TYPES = ['cascader', 'select', 'datepicker', 'picker'];

export const useFormItems = (props: Record<any, any>) => {
  const setDefaultPlaceholder = (formItem: FormItemConfigItem) => {
    const label = formItem.formItem?.label;
    const type = isFunction(formItem.type) ? formItem.type() : formItem.type;
    if (SELECT_TYPES.includes(type || '')) {
      return label ? `请选择${label}` : '请选择';
    } else {
      return label ? `请输入${label}` : '请输入';
    }
  };

  const isHide = (item: FormItemConfigItem) => {
    return typeof item.hide === 'function' ? item.hide() : item.hide;
  };

  const formatFormItems = computed(() => {
    const _schema = cloneDeep(
      props.formItemConfig.map((item: FormItemConfigItem) => ({
        ...item,
        __key: item.key || item.prop || item.slot || uid(),
      }))
    );
    return _schema
      .filter((item: FormItemConfigItem) => !isHide(item))
      .map((item: FormItemConfigItem) => ({
        ...item,
        attrs: {
          placeholder: setDefaultPlaceholder(item),
          clearable: true,
          filterable: true,
          ...item?.attrs,
        },
      }));
  });

  return { formatFormItems };
};
