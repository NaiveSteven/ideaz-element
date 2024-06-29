import { checkboxGroupProps } from 'element-plus'
import type { ExtractPropTypes } from 'vue'
import type { Alias, CheckboxOptionsItem, CheckboxType } from '../../types'

export const checkboxProps = {
  ...checkboxGroupProps,
  value: {
    type: Array as PropType<any>,
    default: () => [],
    required: false,
  },
  modelValue: {
    type: Array as PropType<any>,
    default: () => [],
    required: false,
  },
  options: {
    type: Array as PropType<CheckboxOptionsItem[]>,
    default: () => [],
  },
  type: {
    type: String as PropType<CheckboxType>,
    default: 'checkbox',
  },
  alias: {
    type: Object as PropType<Alias>,
  },
  border: {
    type: Boolean,
  },
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export const CHECKBOX_FILTER_PROPS = ['options', 'border']
