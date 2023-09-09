import { WarningFilled } from '@element-plus/icons'
import { isFunction, isString } from '@ideaz/utils'
import { useDialog } from '../hooks'
import { dialogProps } from './props'

export default defineComponent({
  name: 'ZDialog',
  props: dialogProps,
  emits: ['update:modelValue', 'cancel', 'confirm', 'vanish'],
  setup(props, { emit, slots, expose }) {
    const { isShowDialog, dialogConfig, confirmBtnProps, cancelBtnProps, handleCancel, handleConfirm, handleClosed, done } = useDialog(props, emit)
    const ns = useNamespace('dialog')
    const { t } = useLocale()

    const getHeader = () => {
      if (isFunction(props.title))
        return () => props.title?.()

      if (isString(props.title))
        return () => props.title

      return slots.header || slots.title
    }

    const renderDialogFooter = () => {
      const { type } = props
      if (isFunction(slots.footer))
        return slots.footer

      if (type === 'info') {
        return <div class={ns.e('footer')}>
          <el-button
            type="primary"
            size="default"
            onClick={handleConfirm}
          >{t('common.got')}</el-button>
        </div>
      }
      return <div class={ns.e('footer')}>
        <el-button
          type="default"
          size="default"
          onClick={handleCancel}
          {...cancelBtnProps.value}
        >{cancelBtnProps.value.label}</el-button>
        <el-button
          type={(type === 'warning' || type === 'danger') ? type : 'primary'}
          size="default"
          onClick={handleConfirm}
          {...confirmBtnProps.value}
        >{confirmBtnProps.value.label}</el-button>
      </div>
    }

    const renderContent = () => {
      if (props.type !== 'normal') {
        return <div class={ns.e('content')}>
          <div class={ns.e('container')}>
            <el-icon class={[ns.e('status'), ns.bm('icon', props.type)]}>
              <WarningFilled />
            </el-icon>
            <div class={ns.e('message')}>
              <p>{slots.default?.() || props.message}</p>
            </div>
          </div>
        </div>
      }
      return slots.default?.()
    }

    expose({
      isShowDialog,
      done,
    })

    return () => {
      return <el-dialog
        class={[ns.b(''), props.type !== 'normal' && ns.b('tip')]}
        {...dialogConfig.value}
        modelValue={props.modelValue || isShowDialog.value}
        onUpdate:modelValue={(val: boolean) => { isShowDialog.value = val; emit('update:modelValue', val) }}
        onClosed={handleClosed}
        v-slots={{
          footer: () => renderDialogFooter(),
          header: getHeader(),
        }}
      >
        {renderContent()}
      </el-dialog>
    }
  },
})
