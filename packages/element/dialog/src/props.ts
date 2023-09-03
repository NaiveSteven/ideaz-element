import { dialogProps as elDialogProps } from 'element-plus'
import type { ExtractPropTypes } from 'vue-demi'

export const dialogProps = {
  ...elDialogProps,
  confirmButtonProps: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  cancelButtonProps: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  onCancel: {
    type: Function,
  },
  onConfirm: {
    type: Function,
  },
  title: {
    type: [Function, String] as PropType<() => VNode | string>,
  },
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>
