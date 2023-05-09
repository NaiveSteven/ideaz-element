import elementResizeDetectorMaker from 'element-resize-detector'

export const useShowMore = () => {
  const observer = elementResizeDetectorMaker()
  const zTag = ref()
  const isShowMore = ref(false)

  onMounted(() => {
    observer.listenTo(
      { strategy: 'scroll' },
      zTag.value,
      computedMore,
    )
  })

  function computedMore() {
    const element = zTag.value
    const tagTitle = element.getElementsByClassName('z-tag-select__title')[0]
    if (element) {
      const width = element.offsetWidth - 38
      const tags = element.querySelectorAll('.el-tag')
      let totalWidth = 0 + (tagTitle ? tagTitle.offsetWidth + 24 : 0)
      let index = 0
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i]
        totalWidth = i === tags.length - 1 ? totalWidth + tag.offsetWidth : totalWidth + tag.offsetWidth + 16

        if (totalWidth > width) {
          index = i
          break
        }
      }
      if (index > 0)
        isShowMore.value = true

      else
        isShowMore.value = false
    }
  }

  return { zTag, isShowMore }
}
