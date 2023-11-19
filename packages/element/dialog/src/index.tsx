import { WarningFilled } from '@element-plus/icons-vue'
import { isFunction, isString } from '@ideaz/utils'
import { ElButton, ElDialog, ElIcon } from 'element-plus'
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
        return () => (props.title as () => VNode)()

      if (isString(props.title))
        return () => props.title

      // default config
      if (props.extend)
        return () => t('dialog.tip')

      return slots.header || slots.title
    }

    const renderDialogFooter = () => {
      const { type } = props
      if (props.footer === false)
        return null

      if (isFunction(slots.footer))
        return slots.footer()

      if (isFunction(props.footer))
        return props.footer()

      if (type === 'info') {
        return <div class={ns.e('footer')}>
          <ElButton
            type="primary"
            size="default"
            onClick={handleConfirm}
            {...confirmBtnProps.value}
          >{t('dialog.got')}</ElButton>
        </div>
      }
      return <div class={ns.e('footer')}>
        <ElButton
          type="default"
          size="default"
          onClick={handleCancel}
          {...cancelBtnProps.value}
        >{cancelBtnProps.value.label}</ElButton>
        <ElButton
          type={(type === 'warning' || type === 'danger') ? type : 'primary'}
          size="default"
          onClick={handleConfirm}
          {...confirmBtnProps.value}
        >{confirmBtnProps.value.label}</ElButton>
      </div>
    }

    const renderContent = () => {
      if (props.type !== 'normal') {
        return <div class={ns.e('content')}>
          <div class={ns.e('container')}>
            <ElIcon class={[ns.e('status'), ns.bm('icon', props.type)]}>
              <WarningFilled />
            </ElIcon>
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
      return <ElDialog
        class={[ns.b(''), props.type !== 'normal' && ns.b('tip'), props.footer === false && ns.b('no-footer')]}
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
      </ElDialog>
    }
  },
})
