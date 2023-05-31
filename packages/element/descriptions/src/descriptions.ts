import type { ExtractPropTypes, PropType } from 'vue-demi'
import type { ComponentSize } from 'element-plus'

export interface DescriptionsColumn<T = any> {
  prop: any
  label?: string
  span?: number
  width?: string
  minWidth?: string
  align?: 'left' | 'center' | 'right'
  labelAlign?: 'left' | 'center' | 'right'
  className?: string
  labelClassName?: string
  render?: (detail: T) => string | any
  renderLabel?: (column: DescriptionsColumn<T>) => string | any
}

export type IDescriptionsColumns<T = any> = Array<
  DescriptionsColumn<T> & any
>

export type IDescriptionsProps = ExtractPropTypes<typeof descriptionsProps>

/**
 * Type helper to make it easier to define columns
 * @param columns the columns of Descriptions
 */
export function defineDescriptionsColumns<T = any>(
  columns: IDescriptionsColumns<T>,
): IDescriptionsColumns<T> {
  return columns
}

export const descriptionsProps = {
  columns: Array as PropType<IDescriptionsColumns>,
  detail: Object,
  border: Boolean,
  column: Number,
  direction: String as PropType<'vertical' | 'horizontal'>,
  size: String as PropType<ComponentSize>,
  title: String,
  extra: String,
  align: String as PropType<'left' | 'center' | 'right'>,
  labelAlign: String as PropType<'left' | 'center' | 'right'>,
}
