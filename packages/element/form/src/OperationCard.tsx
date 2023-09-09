import { Delete, Plus } from '@element-plus/icons-vue'

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

    return () => {
      return <el-card shadow='never' class={ns.b('item-card')}>
        {slots.default?.()}
        {props.addVisible
          ? <el-button
          type="primary"
          icon={Plus}
          circle
          class={ns.bm('operation', 'add')}
          size='small'
          onClick={() => emit('add')}
        />
          : null}
        <el-button
          type="danger"
          icon={Delete}
          circle
          class={ns.bm('operation', 'delete')}
          size='small'
          onClick={() => emit('delete')}
        />
      </el-card>
    }
  },
})
