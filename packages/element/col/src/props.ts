import { definePropType } from '@ideaz/utils'
import type { ExtractPropTypes } from 'vue-demi'

export interface ColSizeObject {
  span?: number
  offset?: number
  pull?: number
  push?: number
}

export type ColSize = number | ColSizeObject

export const colProps = {
  tag: {
    type: String,
    default: 'div',
  },
  span: {
    type: Number,
    default: 24,
  },
  offset: {
    type: Number,
    default: 0,
  },
  pull: {
    type: Number,
    default: 0,
  },
  push: {
    type: Number,
    default: 0,
  },
  xs: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => ({} as const),
  },
  sm: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => ({} as const),
  },
  md: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => ({} as const),
  },
  lg: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => ({} as const),
  },
  xl: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => ({} as const),
  },
}

export type ColProps = ExtractPropTypes<typeof colProps>
