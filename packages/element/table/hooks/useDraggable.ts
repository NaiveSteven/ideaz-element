import type { Ref } from 'vue'

export const useDraggable = (emit: any, tableData: Ref<any>) => {
  const dragging = ref(false)

  const draggableOptions = [
    {
      selector: 'tbody',
      options: {
        animation: 200,
        handle: '.z-table-column-draggable',
        ghostClass: 'ghost',
        dragClass: 'drag-class',
        onStart: () => {
          dragging.value = true
        },
        onEnd: (evt: any) => {
          dragging.value = false
          const { newIndex, oldIndex } = evt
          const arr = [...tableData.value]
          const [moveRowData] = [...arr.splice(oldIndex as number, 1)]
          arr.splice(newIndex as number, 0, moveRowData)

          tableData.value = []
          nextTick(() => {
            tableData.value = [...arr]
            emit('drag-sort-end', tableData.value)
          })
        },
      },
    },
    // {
    //   selector: '.el-table__header-wrapper tr',
    //   options: {
    //     animation: 150,
    //     delay: 0,
    //     ghostClass: 'table-col__ghost',
    //     onEnd: (evt: any) => {
    //       const { newIndex, oldIndex } = evt
    //       const arr = [...middleTableCols.value]
    //       const [moveRowData] = [...arr.splice(oldIndex as number, 1)]
    //       arr.splice(newIndex as number, 0, moveRowData)
    //       middleTableCols.value = []
    //       nextTick(() => {
    //         middleTableCols.value = [...arr]
    //       })
    //     },
    //   },
    // },
  ]

  return { draggableOptions, dragging }
}
