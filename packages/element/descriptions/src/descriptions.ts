import type { ExtractPropTypes, PropType } from 'vue-demi'
import type { ComponentSize } from 'element-plus'

export interface DescriptionsColumn<T = any> {
  prop: any
  label?: string | ((item: DescriptionsColumn<T>) => VNode)
  span?: number
  width?: string
  minWidth?: string
  align?: 'left' | 'center' | 'right'
  labelAlign?: 'left' | 'center' | 'right'
  className?: string
  labelClassName?: string
  render?: (detail: T) => string | any
}

export type IDescriptionsColumns<T = any> = Array<
  DescriptionsColumn<T> & any
>

export type DescriptionsProps = ExtractPropTypes<typeof descriptionsProps>

export const descriptionsProps = {
  columns: Array as PropType<IDescriptionsColumns>,
  detail: Object,
  border: Boolean,
  column: Number,
  direction: String as PropType<'vertical' | 'horizontal'>,
  size: String as PropType<ComponentSize>,
  title: [String, Function] as PropType<string | (() => VNode)>,
  extra: [String, Function] as PropType<string | (() => VNode)>,
  align: String as PropType<'left' | 'center' | 'right'>,
  labelAlign: String as PropType<'left' | 'center' | 'right'>,
}
