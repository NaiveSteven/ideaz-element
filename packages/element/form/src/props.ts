import type { ExtractPropTypes } from 'vue-demi'

export const RowJustify = [
  'start',
  'center',
  'end',
  'space-around',
  'space-between',
  'space-evenly',
] as const

export const RowAlign = ['top', 'middle', 'bottom'] as const

export const props = {
  layout: {
    type: Object,
    default: () => {
      return {
        rowLayout: {
          gutter: 0,
          interval: 0,
          justify: 'start',
          direction: 'row',
        },
        colLayout: {
          xs: 24,
          sm: 12,
          md: 12,
          lg: 8,
          xl: 8,
        },
      }
    },
  },
  formConfig: {
    type: Object,
    default: () => {},
  },
  columns: {
    type: Array,
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
}

export type FormProps = ExtractPropTypes<typeof props>
