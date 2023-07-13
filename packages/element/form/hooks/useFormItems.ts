import { cloneDeep } from 'lodash-es'
import { isFunction, uid } from '@ideaz/utils'
import type { FormProps } from '../src/props'
import type { FormColumn } from '~/types'

export const SELECT_TYPES = ['cascader', 'select', 'datepicker', 'picker', 'checkbox', 'radio']

export const useFormItems = (props: FormProps) => {
  const { t } = useLocale()

  const setDefaultPlaceholder = (formItem: FormColumn) => {
    const label = formItem.label || formItem.formItemProps?.label || ''
    const type = isFunction(formItem.component) ? formItem.component() : formItem.component
    if (SELECT_TYPES.includes((type || '').toLowerCase()))
      return label ? `${t('form.selectPlaceholder')}${label}` : `${t('form.selectPlaceholder')}`

    else
      return label ? `${t('form.inputPlaceholder')}${label}` : `${t('form.inputPlaceholder')}`
  }

  const isHide = (item: FormColumn) => {
    return typeof item.hide === 'function' ? item.hide() : item.hide
  }

  const formatFormItems = computed<FormColumn[]>(() => {
    const _schema = cloneDeep(props.columns).map((item: FormColumn) => ({
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
