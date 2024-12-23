import type { ButtonProps } from 'element-plus'
import { dialogProps as elDialogProps } from 'element-plus'
import type { ExtractPropTypes, Ref, VNode } from 'vue'

export type DialogButtonProps = Partial<ButtonProps> & {
  label?: string
}

export const dialogProps = {
  ...elDialogProps,
  closeOnClickModal: {
    type: Boolean,
    default: false,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  confirmButtonProps: {
    type: Object as PropType<DialogButtonProps>,
    default: () => ({}),
  },
  cancelButtonProps: {
    type: Object as PropType<DialogButtonProps>,
    default: () => ({}),
  },
  onCancel: {
    type: Function as PropType<({ done, cancelButtonLoading }: { done: () => void, cancelButtonLoading: Ref<boolean> }) => void>,
  },
  onConfirm: {
    type: Function as PropType<({ done, confirmButtonLoading }: { done: () => void, confirmButtonLoading: Ref<boolean> }) => void>,
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

export interface DialogHeaderSlotProps {
  key: string
  titleId: string
  titleClass: string
}
