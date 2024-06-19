import { resolveDynamicComponent } from '@ideaz/shared'
import { cutStrByFullLength, getStrFullLength, getStyle, isObject, isValid } from '@ideaz/utils'
import { ElTooltip } from 'element-plus'
import { textProps } from './text'

export default defineComponent({
  name: 'ZText',
  props: textProps,
  setup(props, { slots }) {
    const ns = useNamespace('text', ref('el'))
    const size = useFormSize()

    const zText = ref()
    const computedReady = ref(false)
    const oversize = ref(false)
    const computedText = ref('')
    const textRef = ref()
    const moreRef = ref()

    const textKls = computed<string[]>(() => [
      ns.b(),
      ns.m(props.type),
      ns.m(size.value),
      ns.is('truncated', props.truncated),
    ])

    const getText = () => {
      return props.value || props.text || (slots.default?.()[0].children as string)
    }

    const computeText = async () => {
      oversize.value = false
      computedReady.value = false
      await nextTick()
      const $text = textRef.value
      const $el = zText.value
      const $more = moreRef.value
      let n = 1000
      let text = getText()
      let height = props.height || 0

      // When height is undefined and lines are defined, calculate the true height, otherwise use props.height
      if (!height && props.lines) {
        const lineHeight = Number.parseInt(getStyle($el, 'lineHeight') || '', 10) || 24
        height = lineHeight * props.lines
      }
      if ($text) {
        // If length is specified, it is tailored to the specific number of words
        if (props.length) {
          const textLength = props.fullWidthRecognition ? getStrFullLength(text) : text.length
          if (textLength > props.length) {
            oversize.value = true
            $more.style.display = 'inline-block'
            text = props.fullWidthRecognition ? cutStrByFullLength(text, props.length) : text.slice(0, props.length)
          }
        }
        else {
          if ($el.offsetHeight > height) {
            oversize.value = true
            $more.style.display = 'inline-block'
            while ($el.offsetHeight > height && n > 0) {
              if ($el.offsetHeight > height * 3)
                $text.textContent = text = text.substring(0, Math.floor(text.length / 2))
              else
                $text.textContent = text = text.substring(0, text.length - 1)

              n--
            }
          }
        }
      }

      computedText.value = text
      limitShow()
    }

    async function limitShow() {
      computedReady.value = true
      await nextTick()
      const $text = textRef.value
      // const $el = zText.value
      if ($text)
        $text.textContent = computedText.value
      // if ($el.offsetHeight > this.height)
      //   emit('on-hide')
      // else
      //   this.$emit('on-show')
    }

    onMounted(() => {
      if (isValid(props.length) || isValid(props.lines))
        computeText()
    })

    return () => {
      const { tag } = props
      const tooltipConfig = isObject(props.tooltip) ? props.tooltip : {}
      return resolveDynamicComponent({
        name: tag,
        attrs: {
          class: textKls.value,
          ref: zText,
        },
        content: (() => {
          if (computedReady.value) {
            if (oversize.value) {
              return (
                <ElTooltip content={getText()} {...tooltipConfig}>
                  <div>
                    <span ref={textRef}>{getText()}</span>
                    <span v-show={oversize.value} ref={moreRef}>...</span>
                  </div>
                </ElTooltip>
              )
            }
            else {
              return (
                <>
                  <span ref={textRef}>{getText()}</span>
                  <span v-show={oversize.value} ref={moreRef}>...</span>
                </>
              )
            }
          }
          else {
            return (
              <>
                <span ref={textRef}>{getText()}</span>
                <span v-show={oversize.value} ref={moreRef}>...</span>
              </>
            )
          }
        })(),
      })
    }
  },
})
