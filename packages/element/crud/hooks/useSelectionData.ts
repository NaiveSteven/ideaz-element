import type { CrudProps } from '../src/props'

export const useSelectionData = (props: CrudProps, emit: any) => {
  const selectionData = ref(props.selectionData || [])

  const handleCheckboxChange = (selection: any) => {
    emit('selection-change', selection)
    emit('update:selectionData', selection)
    if (props.selectionData === undefined)
      selectionData.value = selection
  }

  return {
    selectionData,
    handleCheckboxChange,
  }
}
