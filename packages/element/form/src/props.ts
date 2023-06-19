import type { ExtractPropTypes } from 'vue-demi'
import type { ComponentSize } from 'element-plus'
import type { FormColumn } from '~/types'

export const RowJustify = [
  'start',
  'center',
  'end',
  'space-around',
  'space-between',
  'space-evenly',
] as const

export const RowAlign = ['top', 'middle', 'bottom'] as const

export const formProps = {
  formConfig: {
    type: Object,
    default: () => {},
  },
  columns: {
    type: Array as PropType<FormColumn>,
    default: () => [],
  },
  formModel: {
    type: Object,
    default: () => {},
  },
  options: {
    type: Object,
    default: () => {},
  },
  gutter: {
    type: Number,
    default: 0,
  },
  justify: {
    type: String,
    values: RowJustify,
    default: 'start',
  },
  align: {
    type: String,
    values: RowAlign,
    default: 'top',
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'default',
  },
}

export const formItemProps = {
  formConfig: {
    type: Object,
    default: () => ({}),
  },
  formModel: {
    type: Object,
    default: () => { },
  },
  options: {
    type: Object,
    default: () => { },
  },
  col: {
    type: Object as PropType<FormColumn>,
    default: () => { },
  },
}

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormItemProps = ExtractPropTypes<typeof formItemProps>
export const formProvideKey = Symbol('formKey')
export const formItemProvideKey = Symbol('formItemKey')
