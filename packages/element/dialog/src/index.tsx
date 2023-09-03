import { isFunction, isString } from '@ideaz/utils'
import { useDialog } from '../hooks'
import { dialogProps } from './props'

export default defineComponent({
  name: 'ZDialog',
  props: dialogProps,
  emits: ['update:modelValue', 'cancel', 'confirm'],
  setup(props, { emit, slots }) {
    const { dialogConfig, dialogRef, handleCancel, handleConfirm } = useDialog(props, emit)

    const getHeader = () => {
      if (isFunction(props.title))
        return () => props.title?.()

      if (isString(props.title))
        return () => props.title

      return slots.header || slots.title
    }

    return () => {
      return <el-dialog
        ref={dialogRef}
        {...dialogConfig.value}
        modelValue={props.modelValue}
        onUpdate:modelValue={(val: boolean) => emit('update:modelValue', val)}
        v-slots={{
          footer: () => {
            if (isFunction(slots.footer))
              return slots.footer

            return <div class="c-dialog__footer">
              <el-button
                type="default"
                size="default"
                onClick={handleCancel}
                {...props.cancelButtonProps}
              >{props.cancelButtonProps.label || '取消'}</el-button>
              <el-button
                type="primary"
                size="default"
                onClick={handleConfirm}
                {...props.confirmButtonProps}
              >{props.confirmButtonProps.label || '确认'}</el-button>
            </div>
          },
          header: getHeader(),
        }}
      >
        {slots.default?.()}
      </el-dialog>
    }
  },
})
