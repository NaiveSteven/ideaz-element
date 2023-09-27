import Sortable from 'sortablejs'
import type { Directive, DirectiveBinding } from 'vue'

export interface DraggableOption {
  selector: string
  options: Sortable.Options
}

export const draggable: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const options: DraggableOption[] = binding.value
    options.forEach((item) => {
      new Sortable(el.querySelector(item.selector) as HTMLElement, item.options)
    })
  },
}
