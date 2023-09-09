import { convertToPx } from '@ideaz/utils'
import { watermarkProps } from './watermark'

const getPixelRatio = (context: any) => {
  if (!context)
    return 1

  const backingStore
    = context.backingStorePixelRatio
    || context.webkitBackingStorePixelRatio
    || context.mozBackingStorePixelRatio
    || context.msBackingStorePixelRatio
    || context.oBackingStorePixelRatio
    || context.backingStorePixelRatio
    || 1
  return (window.devicePixelRatio || 1) / backingStore
}

export default defineComponent({
  name: 'ZWatermark',
  props: watermarkProps,
  setup(props, { slots }) {
    const ns = useNamespace('watermark')
    const { t } = useLocale()
    const base64Url = ref('')

    onMounted(() => {
      const {
        gapX: propsGapX = 212,
        gapY: propsGapY = 222,
        width: propsWidth = 120,
        height: propsHeight = 64,
        rotate: propsRotate = -22, // default -22
        image,
        content,
        offsetLeft: propsOffsetLeft,
        offsetTop: propsOffsetTop,
        fontStyle = 'normal',
        fontWeight = 'normal',
        fontColor = 'rgba(0,0,0,.15)',
        fontSize: propsFontSize = 16,
        fontFamily = 'sans-serif',
      } = props
      // translate string(such as '20', '20px') and number to number
      const height = convertToPx(propsHeight)
      const width = convertToPx(propsWidth)
      const fontSize = convertToPx(propsFontSize)
      const rotate = convertToPx(propsRotate)
      const gapY = convertToPx(propsGapY)
      const gapX = convertToPx(propsGapX)
      const offsetLeft = convertToPx(propsOffsetLeft || 0)
      const offsetTop = convertToPx(propsOffsetTop || 0)

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const ratio = getPixelRatio(ctx)

      const canvasWidth = `${(gapX + width) * ratio}px`
      const canvasHeight = `${(gapY + height) * ratio}px`
      const canvasOffsetLeft = offsetLeft || gapX / 2
      const canvasOffsetTop = offsetTop || gapY / 2

      canvas.setAttribute('width', canvasWidth)
      canvas.setAttribute('height', canvasHeight)

      if (ctx) {
        ctx.translate(canvasOffsetLeft * ratio, canvasOffsetTop * ratio)
        ctx.rotate((Math.PI / 180) * Number(rotate))
        const markWidth = width * ratio
        const markHeight = height * ratio

        if (image) {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.referrerPolicy = 'no-referrer'
          img.src = image
          img.onload = () => {
            ctx.drawImage(img, 0, 0, markWidth, markHeight)
            base64Url.value = canvas.toDataURL()
          }
        }
        else if (content) {
          const markSize = Number(fontSize) * ratio
          ctx.font = `${fontStyle} normal ${fontWeight} ${markSize}px/${markHeight}px ${fontFamily}`
          ctx.fillStyle = fontColor
          if (Array.isArray(content)) {
            content?.forEach((item, index) => {
              ctx.fillText(item, 0, index * 50)
            })
          }
          else {
            ctx.fillText(content, 0, 0)
          }
          base64Url.value = canvas.toDataURL()
        }
      }
      else {
        console.error(t('watermark.tip'))
      }
    })

    return () => {
      const {
        style,
        markStyle,
        zIndex = 9,
        gapX: propsGapX = 212,
        width: propsWidth = 120,
        markClassName,
        className,
      } = props
      const width = convertToPx(propsWidth)
      const gapX = convertToPx(propsGapX)

      return (
        <div
          style={{
            position: 'relative',
            ...style,
          }}
          class={[ns.b('wrapper'), className]}
        >
          {slots.default?.()}
          <div
            class={markClassName}
            style={{
              zIndex: Number(zIndex),
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              backgroundSize: `${gapX + width}px`,
              pointerEvents: 'none',
              backgroundRepeat: 'repeat',
              ...(base64Url.value
                ? {
                    backgroundImage: `url('${base64Url.value}')`,
                  }
                : {}),
              ...markStyle,
            }}
          />
        </div>
      )
    }
  },
})
