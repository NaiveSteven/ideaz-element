import { getCurrentInstance } from 'vue-demi'
import type { ComponentInternalInstance } from 'vue-demi'

interface SelectMethods {
  focus: () => void
  blur: () => void
}

export const useSelectMethods = () => {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance

  const focus = () => {
    (ctx?.$refs.selectRef as SelectMethods).focus()
  }

  const blur = () => {
    (ctx?.$refs.selectRef as SelectMethods).blur()
  }

  return { focus, blur }
}
