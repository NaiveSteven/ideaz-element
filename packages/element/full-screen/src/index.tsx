import { defineComponent } from 'vue'
import type { EnhancedHTMLElement } from '@ideaz/utils'
import { isFunction } from '@ideaz/utils'
import { useFullscreen } from '../hooks/useFullScreen'

export default defineComponent({
  name: 'ZFullScreen',
  props: {
    getElement: {
      type: Function as PropType<() => EnhancedHTMLElement>,
      default: () => document.body,
    },
  },
  emits: ['change'],
  setup(props, { emit, slots }) {
    const ns = useNamespace('full-screen')
    const { isTargetFullscreen, toggleFullscreen } = useFullscreen({
      getElement: props.getElement,
      onFullscreenChange: (value) => {
        emit('change', value)
      },
    })

    const renderContent = () => {
      if (isTargetFullscreen.value) {
        if (isFunction(slots.enter))
          return slots.enter()
      }
      else {
        if (isFunction(slots.exit))
          return slots.exit()
      }
      return slots.default?.()
    }

    return () => {
      return <div class={ns.b('')} onClick={toggleFullscreen}>
        {renderContent()}
      </div>
    }
  },
})
