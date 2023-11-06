import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElCard } from 'element-plus'

export default defineComponent({
  name: 'ZOperationCard',
  props: {
    addVisible: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['add', 'delete'],
  setup(props, { slots, emit }) {
    const ns = useNamespace('array-form')
    const size = useFormSize()

    return () => {
      return <ElCard shadow='never' class={ns.b('item-card')}>
        {slots.default?.()}
        {props.addVisible
          ? <ElButton
          type="primary"
          icon={Plus}
          circle
          class={ns.be('operation', `add--${size.value}`)}
          size={size.value === 'small' ? 'small' : 'default'}
          onClick={() => emit('add')}
        />
          : null}
        <ElButton
          type="danger"
          icon={Delete}
          circle
          class={ns.be('operation', `delete--${size.value}`)}
          size={size.value === 'small' ? 'small' : 'default'}
          onClick={() => emit('delete')}
        />
      </ElCard>
    }
  },
})
