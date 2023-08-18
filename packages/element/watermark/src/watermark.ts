import type { ExtractPropTypes } from 'vue'

export const watermarkProps = {
  className: {
    type: String,
  },
  style: {
    type: Object,
  },
  markStyle: {
    type: Object,
  },
  markClassName: {
    type: String,
  },
  gapX: {
    type: [Number, String],
  },
  gapY: {
    type: [Number, String],
  },
  zIndex: {
    type: [Number, String],
  },
  width: {
    type: [Number, String],
  },
  height: {
    type: [Number, String],
  },
  offsetTop: {
    type: [Number, String],
  },
  offsetLeft: {
    type: [Number, String],
  },
  rotate: {
    type: [Number, String],
  },
  image: {
    type: String,
  },
  content: {
    type: [String, Array],
  },
  fontColor: {
    type: String,
  },
  fontStyle: {
    type: Object,
  },
  fontFamily: {
    type: String,
  },
  fontWeight: {
    type: String,
  },
  fontSize: {
    type: [String, Number],
  },
}

export type WatermarkProps = ExtractPropTypes<typeof watermarkProps>
