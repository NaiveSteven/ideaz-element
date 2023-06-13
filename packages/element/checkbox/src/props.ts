import { checkboxGroupProps } from 'element-plus'
import type { ExtractPropTypes } from 'vue-demi'
import type { Alias, OptionsItem } from '../../types'

export type CheckboxType = 'checkbox' | 'checkbox-button'

export interface CheckboxOptionsItem extends OptionsItem {
  trueLabel?: string | number
  falseLabel?: string | number
  border?: boolean
  size?: 'large' | 'default' | 'small'
  indeterminate?: boolean
  type?: CheckboxType
  change?: (value: any) => void
}

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
