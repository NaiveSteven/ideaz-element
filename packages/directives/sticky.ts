import { isObject } from '@ideaz/utils'
import type { Directive, DirectiveBinding } from 'vue'

/**
 * Idea: Set fixed through the simple el-table's thead and tbody parent level areas
 * 1.Make a copy of thead set to fixed and hide it.
 * 2.Create a scroll bar to listen for events and calculate the position of the visible window where the table is located based on the scroll bar. Set whether the thead copy is displayed
 * 3.Create a landscape scrollbar property change listener. When listening changes, you need to set the table header position of the corresponding copy before dragging the horizontal scroll bar to prevent misalignment
 */

function getElParentBySelector(el: any, queryClassSelector: string) {
  if (!el) {
    return el
  }
  if ([...el.classList].includes(queryClassSelector)) {
    return el
  }
  return getElParentBySelector(el.parentNode, queryClassSelector)
}

function getTableShowWidth(thead: string) {
  const tableBox = getElParentBySelector(thead, 'el-table')
  return tableBox.getBoundingClientRect().width
}

// Use setTime to ensure that the Settings are not repeated

function createTableSticky(el: any, binding: DirectiveBinding) {
  let stickyTop = binding.value.top || 0
  const zIndex = binding.value.zIndex || 0
  stickyTop = Number.parseFloat(stickyTop)
  // Get a table (element)
  let thead = el.querySelector('.el-table__header')
  thead = getElParentBySelector(thead, 'el-table__header-wrapper')
  const tbody = el.querySelector('.el-scrollbar') || el.querySelector('.el-table__body')
  // const tableBox = el.querySelector('.el-table__inner-wrapper')

  const elBodyBox = el.querySelector('.el-table__body-wrapper')

  // Insert the copy element to ensure that the document flow does not collapse
  const copyThead = thead.cloneNode(true)
  copyThead.classList.add('el-table_header-copy')
  copyThead.style.display = 'none'
  copyThead.style.position = 'fixed'
  copyThead.style.zIndex = zIndex || 1994
  copyThead.style.top = `${stickyTop}px`
  copyThead.style.backgroundColor = '#fff'
  if (isObject(binding.value?.style)) {
    Object.keys(binding.value.style).forEach((key) => {
      copyThead.style[key] = binding.value.style[key]
    })
  }
  // copyThead.style.borderTop = '1px solid #999999'

  thead.parentNode.insertBefore(copyThead, elBodyBox)

  // Gets the display width of thead
  const headerShowWidth = getTableShowWidth(thead)

  // Get scroll element
  const scrollParent = binding.value.parent === 'document' ? document : document.querySelector(binding.value.parent || 'body')
  if (!scrollParent || binding.value.disabled === true) {
    return
  }
  scrollParent.addEventListener('scroll', () => {
    const theadHeight = thead.clientHeight
    // Gets the distance of thead from the top
    const theadTop = thead.getBoundingClientRect().top
    // Determine if you need to return to your original position
    const originally = tbody.getBoundingClientRect().top
    // Determine whether the bottom distance exceeds the table head
    const goBeyond = tbody.getBoundingClientRect().bottom

    if (theadTop <= stickyTop) {
      copyThead.style.display = 'block'
      copyThead.style.width
        = `${tbody.offsetWidth < headerShowWidth ? tbody.offsetWidth : headerShowWidth}px`
    }

    if (originally - theadHeight > stickyTop || goBeyond - theadHeight / 2 <= stickyTop) {
      // Hidden copy
      copyThead.style.display = 'none'
    }
  })

  try {
    // Start the bottom scroll bar monitor to prevent the horizontal scroll bar from rolling and the watch head does not move
    const elThumbBut = el.querySelector(
      '.el-table__body-wrapper .el-scrollbar .el-scrollbar__bar.is-horizontal .el-scrollbar__thumb',
    )
    if (elThumbBut) {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const transformX = elThumbBut.style.transform
            if (transformX) {
              copyThead.querySelector(
                '.el-table__header',
              ).style.marginLeft = `-${transformX.replace(/[a-z()]/gi, '')}`
            }
          }
        }
      })
      // Start listening for the horizontal scroll bar
      observer.observe(elThumbBut, { attributes: true })
    }
  }
  catch (error) {}
}

let clearTimeId: any = null

export const sticky: Directive = {
  mounted(el: any, binding: DirectiveBinding) {
    if (!binding.value)
      return
    const random = Number.parseInt(`${Math.random() * 10}`)
    // TIP delay Settings to ensure successful rendering of the table!
    clearTimeId = setTimeout(() => {
      createTableSticky(el, binding)
      // clearTimeout(clearTimeId)
    }, 1000 + random)
  },

  // update(el: any, binding: DirectiveBinding) {
  //   if (!binding.value)
  //     return
  //   const random = Number.parseInt(`${Math.random() * 10}`)
  //   // TIP delay Settings to ensure successful rendering of the table!
  //   clearTimeId = setTimeout(() => {
  //     createTableSticky(el, binding)
  //     // clearTimeout(clearTimeId)
  //   }, 1000 + random)
  // },

  unmounted() {
    clearTimeId && clearTimeout(clearTimeId)
  },
}
