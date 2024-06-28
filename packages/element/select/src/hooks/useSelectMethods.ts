import { getCurrentInstance } from 'vue'
import type { ComponentInternalInstance } from 'vue'

interface SelectMethods {
  focus: () => void
  blur: () => void
}

export function useSelectMethods() {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance

  const focus = () => {
    (ctx?.$refs.selectRef as SelectMethods).focus()
  }

  const blur = () => {
    (ctx?.$refs.selectRef as SelectMethods).blur()
  }

  return { focus, blur }
}
