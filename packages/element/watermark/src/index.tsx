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
    const base64Url = ref('')

    onMounted(() => {
      const {
        gapX = 212,
        gapY = 222,
        width = 120,
        height = 64,
        rotate = -22, // 默认旋转 -22 度
        image,
        content,
        offsetLeft,
        offsetTop,
        fontStyle = 'normal',
        fontWeight = 'normal',
        fontColor = 'rgba(0,0,0,.15)',
        fontSize = 16,
        fontFamily = 'sans-serif',
      } = props
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
        // 旋转字符 rotate
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
            content?.forEach((item: string, index: number) =>
              ctx.fillText(item, 0, index * 50),
            )
          }
          else {
            ctx.fillText(content, 0, 0)
          }
          base64Url.value = canvas.toDataURL()
        }
      }
      else {
        console.error('当前环境不支持Canvas')
      }
    })

    return () => {
      const {
        style,
        markStyle,
        zIndex = 9,
        gapX = 212,
        width = 120,
        markClassName,
        className,
      } = props
      return (
        <div
          style={{
            position: 'relative',
            ...style,
          }}
          class={['pro-layout-watermark-wrapper', className]}
        >
          {slots.default?.()}
          <div
            class={markClassName}
            style={{
              zIndex,
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
