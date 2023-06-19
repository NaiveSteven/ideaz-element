import type { ExtractPropTypes } from 'vue-demi'
import { formProps as elFormProps } from 'element-plus'
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
  ...elFormProps,
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
  colon: {
    type: Boolean,
    default: false,
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
}

export const formItemProps = {
  formConfig: {
    type: Object,
    default: () => ({}),
  },
  formModel: {
    type: Object,
    default: () => ({ }),
  },
  options: {
    type: Object,
    default: () => ({ }),
  },
  col: {
    type: Object as PropType<FormColumn>,
    default: () => ({ }),
  },
}

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormItemProps = ExtractPropTypes<typeof formItemProps>
export const formProvideKey = Symbol('formKey')
export const formItemProvideKey = Symbol('formItemKey')
