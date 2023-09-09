import { dialogProps as elDialogProps } from 'element-plus'
import type { ExtractPropTypes } from 'vue-demi'

export const dialogProps = {
  ...elDialogProps,
  closeOnClickModal: {
    type: Boolean,
    default: false,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
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
  type: {
    type: String as PropType<'normal' | 'warning' | 'danger' | 'info'>,
    default: 'normal',
  },
  message: {
    type: [String, Function, Object],
    default: '',
  },
  extend: {
    type: Boolean,
    default: false,
  },
  isConfirmButtonLoading: {
    type: Boolean,
    default: false,
  },
  isCancelButtonLoading: {
    type: Boolean,
    default: false,
  },
  confirmButtonLabel: {
    type: String,
  },
  cancelButtonLabel: {
    type: String,
  },
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>