import { cloneDeep } from 'lodash-es'
import { isFunction, uid } from '@ideaz/utils'
import type { FormColumn } from '~/types'

export const SELECT_TYPES = ['cascader', 'select', 'datepicker', 'picker']

export const useFormItems = (props: Record<any, any>) => {
  const { t } = useLocale()

  const setDefaultPlaceholder = (formItem: FormColumn) => {
    const label = formItem.formItemProps?.label
    const type = isFunction(formItem.type) ? formItem.type() : formItem.type
    if (SELECT_TYPES.includes(type || ''))
      return label ? `${t('form.selectPlaceholder')}${label}` : `${t('form.selectPlaceholder')}`

    else
      return label ? `${t('form.inputPlaceholder')}${label}` : `${t('form.inputPlaceholder')}`
  }

  const isHide = (item: FormColumn) => {
    return typeof item.hide === 'function' ? item.hide() : item.hide
  }

  const formatFormItems = computed<FormColumn[]>(() => {
    const _schema = cloneDeep(
      props.columns.map((item: FormColumn) => ({
        ...item,
        __key: item.key || item.field || item.slot || uid(),
      })),
    )
    return _schema
      .filter((item: FormColumn) => !isHide(item))
      .map((item: FormColumn) => ({
        ...item,
        fieldProps: {
          placeholder: setDefaultPlaceholder(item),
          clearable: true,
          filterable: true,
          ...item?.fieldProps,
        },
      }))
  })

  return { formatFormItems }
}
