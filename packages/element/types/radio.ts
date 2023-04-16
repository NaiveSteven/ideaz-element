import type { OptionsItem } from './common'

export interface RadioOptionsItem extends OptionsItem {
  type?: 'radio' | 'radio-button'
  border?: boolean
  size?: 'large' | 'default' | 'small'
  name?: string
  change?: (value: any) => void
}
