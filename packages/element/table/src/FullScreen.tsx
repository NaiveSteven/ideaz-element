import { FullScreen } from '@element-plus/icons'
import { defineComponent } from 'vue'
import { useFullscreen } from './useFullScreen'

export default defineComponent({
  name: 'ZFullScreen',
  props: {
    getElement: {
      type: Function as PropType<() => any>,
      default: () => document.body,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { isTargetFullscreen, toggleFullscreen } = useFullscreen({
      getElement: props.getElement,
      onFullscreenChange: (value) => {
        emit('change', value)
      },
    })

    return () => {
      return <div class="vp-fullscreen__wrapper" onClick={toggleFullscreen}>
        {isTargetFullscreen.value ? <el-button icon={FullScreen} text /> : <el-button icon={FullScreen} text />}
      </div>
    }
  },
})
