import { get, set } from 'lodash-unified'
import { findDifferentItems } from '@ideaz/utils'
import type { Ref } from 'vue-demi'
import type { SelectProps } from '../src/props'
import type { OptionsItem } from '../../types'

export const useOptions = (props: SelectProps, vModelVal: Ref<string[]>) => {
  const { t } = useLocale()

  const options = computed(() => {
    const { alias, all, options, multiple } = props
    const allOption: OptionsItem = {} as OptionsItem
    set(allOption, alias?.label || 'label', t('select.all'))
    set(allOption, alias?.value || 'value', 'all')
    if (all && multiple)
      return [allOption].concat(options)

    return options
  })

  const handleSelectInput = (val: any) => {
    const { all, multiple, alias } = props
    const values = options.value.map(item => get(item, alias?.value || 'value', ''))
    if (all && multiple) {
      const modelValue = props.modelValue as string[]
      const type = val.length > modelValue.length ? 'add' : 'minus'
      const selectValue = findDifferentItems(val, modelValue)[0]
      if (selectValue === 'all' && type === 'add') {
        vModelVal.value = values
        return
      }
      if (selectValue === 'all' && type === 'minus') {
        vModelVal.value = []
        return
      }
      if (val.length === values.length - 1 && !modelValue.includes('all')) {
        vModelVal.value = values
        return
      }
      if (selectValue !== 'all' && modelValue.includes('all') && type === 'minus') {
        const index = val.findIndex((item: string) => item === 'all')
        if (index > -1)
          vModelVal.value = val.splice(index, 1)
      }
    }
    vModelVal.value = val
  }

  return { options, handleSelectInput }
}
