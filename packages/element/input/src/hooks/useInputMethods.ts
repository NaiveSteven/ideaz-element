import { getCurrentInstance } from 'vue-demi'
import type { ComponentInternalInstance } from 'vue-demi'

interface InputMethods {
  focus: () => Promise<void>
  blur: () => void
  select: () => void
  clear: () => void
  resizeTextarea: () => void
}

export const useInputMethods = () => {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance

  const focus = async () => {
    await (ctx?.$refs.inputRef as InputMethods).focus()
  }

  const blur = () => {
    (ctx?.$refs.inputRef as InputMethods).blur()
  }

  const select = () => {
    (ctx?.$refs.inputRef as InputMethods).select()
  }

  const clear = () => {
    (ctx?.$refs.inputRef as InputMethods).clear()
  }

  const resizeTextarea = () => {
    (ctx?.$refs.inputRef as InputMethods).resizeTextarea()
  }

  return { focus, blur, select, clear, resizeTextarea }
}
