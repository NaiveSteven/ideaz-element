import type { OptionsItem } from './common'

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
