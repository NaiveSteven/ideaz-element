import type { Ref } from 'vue'

export function useDraggable(emit: any, tableData: Ref<any>, middleTableCols: Ref<any>) {
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
          const { oldIndex, newIndex } = evt
          const newArr = [...tableData.value]
          const objToMove = newArr[oldIndex]
          newArr.splice(oldIndex, 1)
          newArr.splice(newIndex, 0, objToMove)
          emit('update:data', newArr)
          emit('drag-sort-end', tableData.value)
        },
      },
    },
    {
      selector: '.el-table__header-wrapper tr',
      options: {
        animation: 150,
        delay: 0,
        ghostClass: 'table-col__ghost',
        onEnd: (evt: any) => {
          const { newIndex, oldIndex } = evt
          const arr = [...middleTableCols.value]
          const [moveRowData] = [...arr.splice(oldIndex as number, 1)]
          arr.splice(newIndex as number, 0, moveRowData)
          middleTableCols.value = []
          nextTick(() => {
            middleTableCols.value = [...arr]
            emit(
              'drag-column-end',
              middleTableCols.value.filter((item: any) => item.prop)[evt.newIndex],
              evt.newIndex,
              evt.oldIndex,
            )
          })
        },
      },
    },
  ]

  return { draggableOptions, dragging }
}
