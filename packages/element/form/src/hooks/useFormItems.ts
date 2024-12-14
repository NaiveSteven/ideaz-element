import { isFunction, isObject, isString, uid } from '@ideaz/utils'
import type { FormProps } from '../props'
import type { FormColumn } from '../../../types'

export const SELECT_TYPES = ['cascader', 'select', 'datepicker', 'picker', 'checkbox', 'radio']

export function useFormItems(props: FormProps) {
  const { t } = useLocale()

  const setDefaultPlaceholder = (formItem: FormColumn) => {
    const label = formItem.label || formItem.formItemProps?.label || ''
    const type = isFunction(formItem.component) ? formItem.component() : isObject(formItem.component) ? formItem.component.name : formItem.component

    if (SELECT_TYPES.includes((type || '').toLowerCase()))
      return (isString(label) && !label.includes('Slot')) ? `${t('form.selectPlaceholder')}${label}` : `${t('form.selectPlaceholder')}`

    else
      return (isString(label) && !label.includes('Slot')) ? `${t('form.inputPlaceholder')}${label}` : `${t('form.inputPlaceholder')}`
  }

  const isHide = (item: FormColumn) => {
    return isFunction(item.hide) ? item.hide(props.modelValue) : item.hide
  }

  const formatFormItems = computed<FormColumn[]>(() => {
    const _schema = props.columns?.sort((a, b) => (a.order || 10000) - (b.order || 10000)).map((item: FormColumn) => ({
      show: true,
      ...item,
      __key: item.key || item.field || item.slot || uid(),
      children: item.children
        ? item.children.map((child) => {
          const isPlaceholder = Object.keys(child.fieldProps || {}).some(key => key.includes('placeholder') || key.includes('Placeholder'))
          const fieldProps = !isPlaceholder
            ? {
                placeholder: setDefaultPlaceholder(child),
                clearable: true,
                filterable: true,
                ...child?.fieldProps,
              }
            : {
                clearable: true,
                filterable: true,
                ...child?.fieldProps,
              }
          return {
            show: true,
            ...child,
            fieldProps,
          }
        })
        : undefined,
    }))
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
