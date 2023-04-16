import type { OptionsItem } from './common'

export interface CheckboxOptionsItem extends OptionsItem {
  trueLabel?: string | number
  falseLabel?: string | number
  border?: boolean
  size?: 'large' | 'default' | 'small'
  checked?: boolean
  indeterminate?: boolean
  type?: 'checkbox' | 'checkbox-button'
  change?: (value: any) => void
}
