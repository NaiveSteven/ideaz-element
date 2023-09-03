import { createVNode, isVNode, render } from 'vue'
import { hasOwn } from '@vue/shared'
import { isClient } from '@vueuse/core'
import { isElement, isFunction, isObject, isString, isUndefined } from '@ideaz/utils'
import type { AppContext, ComponentPublicInstance } from 'vue'
import DialogConstructor from './index'

export type Action = 'confirm' | 'close' | 'cancel'

export interface IDialogTip {
  _context: AppContext | null

  /** Show a message box */
  // (message: string, title?: string, type?: string): Promise<MessageBoxData>

  /** Show a message box */
  (
    options: any,
    appContext?: AppContext | null
  ): Promise<any>

  /** Show an alert message box */
  alert: any

  /** Show a confirm message box */
  confirm: any

  /** Show a prompt message box */
  prompt: any

  /** Close current message box */
  close(): void
}

const dialogInstance = new Map<
  ComponentPublicInstance<{ done: () => void }>, // marking doClose as function
  {
    options: any
    callback: any | undefined
    resolve: (res: any) => void
    reject: (reason?: any) => void
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

  options.onAction = (action: Action) => {
    const currentMsg = dialogInstance.get(vm)!
    let resolve: Action | { value: string; action: Action }
    if (options.showInput)
      resolve = { value: vm.inputValue, action }

    else
      resolve = action

    if (options.callback) {
      options.callback(resolve, instance.proxy)
    }
    else {
      if (action === 'cancel' || action === 'close') {
        if (options.distinguishCancelAndClose && action !== 'cancel')
          currentMsg.reject('close')

        else
          currentMsg.reject('cancel')
      }
      else {
        currentMsg.resolve(resolve)
      }
    }
  }

  for (const prop in options) {
    if (hasOwn(options, prop) && !hasOwn(vm.$props, prop))
      vm[prop as keyof ComponentPublicInstance] = options[prop]
  }

  // change visibility after everything is settled
  instance.exposed!.isShowDialog.value = true
  return vm
}

async function DialogTip(
  options: any,
  appContext?: AppContext | null
): Promise<any>
function DialogTip(
  options: any | string | VNode,
  appContext: AppContext | null = null,
): Promise<{ value: string; action: Action } | Action> {
  if (!isClient) return Promise.reject()
  let callback: any | undefined
  if (isString(options) || isVNode(options)) {
    options = {
      message: options,
    }
  }
  else {
    callback = options.callback
  }

  return new Promise((resolve, reject) => {
    const vm = showMessage(
      options,
      appContext ?? (DialogTip as IDialogTip)._context,
    )
    // collect this vm in order to handle upcoming events.
    dialogInstance.set(vm, {
      options,
      callback,
      resolve,
      reject,
    })
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
      options = title
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
          // ...MESSAGE_BOX_DEFAULT_OPTS[boxType],
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
  (DialogTip as any)[type] = messageBoxFactory(
    type,
  )
})

DialogTip.close = () => {
  // instance.setupInstall.doClose()
  // instance.setupInstall.state.visible = false

  dialogInstance.forEach((_, vm) => {
    vm.done()
  })

  dialogInstance.clear()
}
;(DialogTip as any)._context = null

export default DialogTip
