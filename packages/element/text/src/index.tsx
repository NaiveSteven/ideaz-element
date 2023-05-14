import { resolveDynamicComponent } from '@ideaz/shared'
import { textProps } from './text'

const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128)
      return pre + 1

    return pre + 2
  }, 0)

const cutStrByFullLength = (str = '', maxLength: number) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128)
      showLength += 1
    else
      showLength += 2

    if (showLength <= maxLength)
      return pre + cur

    return pre
  }, '')
}

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
const isClient = typeof window !== 'undefined'

function camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, (_, separator, letter, offset) => {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}

export function getStyle(element, styleName) {
  if (!isClient) return
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float')
    styleName = 'cssFloat'

  try {
    const compute = document.defaultView?.getComputedStyle(element, '')
    return element.style?.[styleName] || (compute ? compute?.[styleName] : null)
  }
  catch (e) {
    return element.style[styleName]
  }
}

export default defineComponent({
  name: 'ZText',
  props: textProps,
  setup(props, { slots }) {
    const ns = useNamespace('text')
    const zText = ref()
    const computedReady = ref(false)
    const oversize = ref(false)
    const computedText = ref('')
    const textRef = ref()
    const moreRef = ref()

    const textKls = computed(() => [
      ns.b(),
      ns.m(props.type),
      // ns.m(textSize.value),
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
      let height = props.height

      // 当 height 未定义，且 lines 定义时，计算真实高度，否则使用 this.height
      if (!height && props.lines) {
        // todo
        const lineHeight = parseInt(getStyle($el, 'lineHeight'), 10) || 24
        height = lineHeight * props.lines
      }
      if ($text) {
        // 指定 length，则按具体字数剪裁
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
                $text.innerText = text = text.substring(0, Math.floor(text.length / 2))
              else
                $text.innerText = text = text.substring(0, text.length - 1)

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
        $text.innerText = computedText.value
      // if ($el.offsetHeight > this.height)
      //   emit('on-hide')
      // else
      //   this.$emit('on-show')
    }

    const init = () => {
      computeText()
    }

    onMounted(() => {
      init()
    })

    return () => {
      return resolveDynamicComponent({
        name: props.tag,
        attrs: {
          class: textKls.value,
          ref: zText,
          style: {
            display: 'inline-block',
            wordBreak: 'break-all',
          },
        },
        content: (() => {
          if (computedReady.value) {
            if (oversize.value) {
              return <el-tooltip content={getText()}>
                <div>
                  <span ref={textRef}>{getText()}</span>
                  <span v-show={oversize.value} ref={moreRef}>...</span>
                </div>
              </el-tooltip>
            }
            else {
              return <>
                <span ref={textRef}>{getText()}</span>
                <span v-show={oversize.value} ref={moreRef}>...</span>
              </>
            }
          }
          else {
            return <>
              <span ref={textRef}>{getText()}</span>
              <span v-show={oversize.value} ref={moreRef}>...</span>
            </>
          }
        })(),
      })
    }
  },
})
