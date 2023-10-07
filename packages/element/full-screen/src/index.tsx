import { defineComponent } from 'vue'
import type { EnhancedHTMLElement } from '@ideaz/utils'
import { isFunction } from '@ideaz/utils'
import { useFullscreen } from '../hooks/useFullScreen'

export default defineComponent({
  name: 'ZFullScreen',
  props: {
    el: {
      type: [Function, HTMLElement] as PropType<() => EnhancedHTMLElement | HTMLElement>,
      default: () => document.body,
    },
    renderExit: {
      type: Function as PropType<() => VNode>,
    },
    renderEnter: {
      type: Function as PropType<() => VNode>,
    },
  },
  emits: ['change'],
  setup(props, { emit, slots }) {
    const ns = useNamespace('full-screen')

    const { isTargetFullscreen, toggleFullscreen } = useFullscreen({
      getElement: props.el,
      onFullscreenChange: (value: boolean) => {
        const element = isFunction(props.el) ? props.el() : props.el
        if (element) {
          if (value)
            element.classList.add('z-full-screen-class')

          else
            element.classList.remove('z-full-screen-class')
        }
        emit('change', value)
      },
    })

    const renderContent = () => {
      if (isTargetFullscreen.value) {
        if (isFunction(slots.exit))
          return slots.exit()
        if (isFunction(props.renderExit))
          return props.renderExit()
      }
      else {
        if (isFunction(slots.enter))
          return slots.enter()
        if (isFunction(props.renderEnter))
          return props.renderEnter()
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
