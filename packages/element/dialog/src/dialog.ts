import { createVNode, isVNode, render } from 'vue'
import { hasOwn } from '@vue/shared'
import { isClient } from '@vueuse/core'
import { isElement, isFunction, isObject, isString, isUndefined } from '@ideaz/utils'
import type { AppContext, ComponentPublicInstance } from 'vue'
import type { DialogProps } from './props'
import DialogConstructor from './index'

export type IDialogTipMethod = (
  message: string | VNode,
  title: string,
  options?: Partial<DialogProps>,
  appContext?: AppContext | null
) => any

export interface IDialogTip {
  _context: AppContext | null

  (
    options: Partial<DialogProps>,
    appContext?: AppContext | null
  ): void

  normal: IDialogTipMethod

  warning: IDialogTipMethod

  danger: IDialogTipMethod

  info: IDialogTipMethod

  close(): void
}

const dialogInstance = new Map<
  ComponentPublicInstance<{ done: () => void; exposed: any }>, // marking doClose as function
  {
    options: any
    callback: any | undefined
  }
>()

const getAppendToElement = (props: any): HTMLElement => {
  let appendTo: HTMLElement | null = document.body
  if (props.appendTo) {
    if (isString(props.appendTo))
      appendTo = document.querySelector<HTMLElement>(props.appendTo)

    if (isElement(props.appendTo))
      appendTo = props.appendTo

    // should fallback to default value with a warning
    if (!isElement(appendTo)) {
      console.warn(
        'ElMessageBox',
        'the appendTo option is not an HTMLElement. Falling back to document.body.',
      )
      appendTo = document.body
    }
  }
  return appendTo
}

const initInstance = (
  props: any,
  container: HTMLElement,
  appContext: AppContext | null = null,
) => {
  const vnode = createVNode(
    DialogConstructor,
    props,
    (isFunction(props.message) || isVNode(props.message))
      ? {
          default: isFunction(props.message)
            ? props.message
            : () => props.message,
        }
      : null,
  )
  vnode.appContext = appContext
  render(vnode, container)
  getAppendToElement(props).appendChild(container.firstElementChild!)
  return vnode.component
}

const genContainer = () => {
  return document.createElement('div')
}

const showMessage = (options: any, appContext?: AppContext | null) => {
  const container = genContainer()
  const instance = initInstance(options, container, appContext)!

  // This is how we use message box programmably.
  // Maybe consider releasing a template version?
  // get component instance like v2.
  const vm = instance.proxy as ComponentPublicInstance<
    {
      done: () => void
    } & any
  >

  // Adding destruct method.
  // when transition leaves emitting `vanish` evt. so that we can do the clean job.

  options.onVanish = () => {
    // not sure if this causes mem leak, need proof to verify that.
    // maybe calling out like 1000 msg-box then close them all.
    render(null, container)
    dialogInstance.delete(vm) // Remove vm to avoid mem leak.
    // here we were suppose to call document.body.removeChild(container.firstElementChild)
    // but render(null, container) did that job for us. so that we do not call that directly
  }

  for (const prop in options) {
    if (hasOwn(options, prop) && !hasOwn(vm.$props, prop))
      vm[prop as keyof ComponentPublicInstance] = options[prop]
  }

  // change visibility after everything is settled
  instance.exposed!.isShowDialog.value = true
  return vm
}

function DialogTip(
  options: any | string | VNode,
  appContext: AppContext | null = null,
) {
  if (!isClient) return
  let callback: any | undefined
  if (isString(options) || isVNode(options)) {
    options = {
      message: options,
    }
  }
  else {
    callback = options.callback
  }

  options.extend = true

  const vm = showMessage(
    options,
    appContext ?? (DialogTip as any)._context,
  )
  // collect this vm in order to handle upcoming events.
  dialogInstance.set(vm, {
    options,
    callback,
  })
}

function messageBoxFactory(type: typeof Dialog_VARIANTS[number]) {
  return (
    message: string | VNode,
    title: string,
    options?: any,
    appContext?: AppContext | null,
  ) => {
    let titleOrOpts = ''
    if (isObject(title) || isObject(message)) {
      options = title || message
      titleOrOpts = ''
    }
    else if (isUndefined(title)) {
      titleOrOpts = ''
    }
    else {
      titleOrOpts = title as string
    }

    return DialogTip(
      Object.assign(
        {
          title: titleOrOpts,
          message,
        },
        options,
        {
          type,
        },
      ),
      appContext,
    )
  }
}

const Dialog_VARIANTS = ['normal', 'danger', 'warning', 'info'] as const

Dialog_VARIANTS.forEach((type) => {
  (DialogTip as IDialogTip)[type] = messageBoxFactory(
    type,
  ) as IDialogTipMethod
})

DialogTip.close = () => {
  dialogInstance.forEach((_, instance) => {
    instance.exposed.done()
  })

  dialogInstance.clear()
}
;(DialogTip as any)._context = null

export default DialogTip as IDialogTip
