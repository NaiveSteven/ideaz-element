type EmitType = (event: any, ...args: any[]) => void

export function useVModel(props: Record<any, any>, emit: EmitType) {
  const vModelVal = computed({
    get: () => {
      return props.modelValue
    },
    set: (val) => {
      emit('update:modelValue', val)
    },
  })

  const handleInput = (val: any) => {
    emit('input', val)
  }

  return {
    vModelVal,
    handleInput,
  }
}
