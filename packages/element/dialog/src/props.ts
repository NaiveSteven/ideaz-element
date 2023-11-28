import type { ButtonProps } from 'element-plus'
import { dialogProps as elDialogProps } from 'element-plus'
import type { Ref } from 'vue'
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
    type: Object as PropType<Partial<ButtonProps>>,
    default: () => ({}),
  },
  cancelButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    default: () => ({}),
  },
  onCancel: {
    type: Function as PropType<({ done, cancelButtonLoading }: { done: () => void; cancelButtonLoading: Ref<boolean> }) => void>,
  },
  onConfirm: {
    type: Function as PropType<({ done, confirmButtonLoading }: { done: () => void; confirmButtonLoading: Ref<boolean> }) => void>,
  },
  title: {
    type: [Function, String] as PropType<(() => VNode) | string>,
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
  confirmButtonLoading: {
    type: Boolean,
    default: false,
  },
  cancelButtonLoading: {
    type: Boolean,
    default: false,
  },
  confirmButtonLabel: {
    type: String,
  },
  cancelButtonLabel: {
    type: String,
  },
  footer: {
    type: [Function, Boolean] as PropType<(() => VNode) | boolean>,
    default: true,
  },
}

export type DialogProps = ExtractPropTypes<typeof dialogProps>
