import { config, mount } from '@vue/test-utils'
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import { ElButton, ElDialog } from 'element-plus'
import Tip from '../src/dialog'
import ZDialog from '../src/index'

const DialogTip = Tip as any

config.global.components = { ZDialog, ElDialog, ElButton }

const AXIOM = 'placeholder'

describe('dialog', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('render test', async () => {
    const wrapper = mount({
      template: '<z-dialog title="asdf" :modelValue="true">{{AXIOM}}</z-dialog>',
      setup() {
        return { AXIOM }
      },
    })

    await nextTick()
    await nextTick()
    expect(wrapper.find('.el-dialog__body').text()).toEqual(AXIOM)
    expect(wrapper.find('.z-dialog__footer').exists()).toBe(true)
    expect(wrapper.find('.z-dialog__footer').text()).toBe('cancelconfirm')
    expect(wrapper.find('.el-dialog__header').text()).toBe('asdf')
  })

  test('title render', async () => {
    const wrapper = mount({
      template: '<z-dialog :title="renderTitle" :modelValue="true">{{AXIOM}}</z-dialog>',
      setup() {
        const renderTitle = () => 'titleRender'
        return { AXIOM, renderTitle }
      },
    })

    await nextTick()
    await nextTick()
    expect(wrapper.find('.el-dialog__header').text()).toBe('titleRender')
  })

  test('title slot', async () => {
    const wrapper = mount({
      template: '<z-dialog :modelValue="true"><template #title><span>titleSlot</span></template>{{AXIOM}}</z-dialog>',
      setup() {
        return { AXIOM }
      },
    })

    await nextTick()
    await nextTick()
    expect(wrapper.find('.el-dialog__header').text()).toBe('titleSlot')
  })

  test('footer operation button', async () => {
    const handleConfirm = vi.fn()
    const handleCancel = vi.fn()
    const wrapper = mount({
      template: `<z-dialog
        title="asdf"
        confirmButtonLabel="confirmLabel"
        :confirmButtonLoading="confirmLoading"
        :cancelButtonLoading="cancelLoading"
        cancelButtonLabel="cancelLabel"
        :modelValue="true"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      >
        {{AXIOM}}
      </z-dialog>`,
      setup() {
        const confirmLoading = ref(false)
        const cancelLoading = ref(false)
        return { AXIOM, handleConfirm, handleCancel, confirmLoading, cancelLoading }
      },
    })

    await nextTick()
    await nextTick()
    const buttons = wrapper.findAll('.el-button')
    await buttons[0].trigger('click');
    (wrapper.vm.cancelLoading as boolean) = true
    await nextTick()
    expect(buttons[0].classes()).toContain('is-loading')
    expect(buttons[0].text()).toBe('cancelLabel')
    expect(handleCancel).toHaveBeenCalled()
    await buttons[1].trigger('click');
    (wrapper.vm.confirmLoading as boolean) = true
    await nextTick()
    expect(buttons[1].classes()).toContain('is-loading')
    expect(buttons[1].text()).toBe('confirmLabel')
    expect(handleConfirm).toHaveBeenCalled()
  })

  test('footer operation button props', async () => {
    const handleConfirm = vi.fn()
    const handleCancel = vi.fn()
    const wrapper = mount({
      template: `<z-dialog
        title="asdf"
        :modelValue="true"
        :confirmButtonProps="confirmButtonProps"
        :cancelButtonProps="cancelButtonProps"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      >
        {{AXIOM}}
      </z-dialog>`,
      setup() {
        const confirmButtonProps = reactive({
          label: '确认按钮',
          type: 'danger',
          loading: false,
        })

        const cancelButtonProps = reactive({
          label: '取消按钮',
          type: 'primary',
          loading: false,
        })
        return { AXIOM, handleConfirm, handleCancel, confirmButtonProps, cancelButtonProps }
      },
    })

    await nextTick()
    await nextTick()
    const buttons = wrapper.findAll('.el-button')
    await buttons[0].trigger('click');
    (wrapper.vm.cancelButtonProps as any).loading = true
    await nextTick()
    expect(buttons[0].classes()).toContain('is-loading')
    expect(buttons[0].text()).toBe('取消按钮')
    expect(handleCancel).toHaveBeenCalled()
    await buttons[1].trigger('click');
    (wrapper.vm.confirmButtonProps as any).loading = true
    await nextTick()
    expect(buttons[1].classes()).toContain('is-loading')
    expect(buttons[1].text()).toBe('确认按钮')
    expect(handleConfirm).toHaveBeenCalled()
  })

  test('footer render', async () => {
    const wrapper = mount({
      template: '<z-dialog :modelValue="true"><template #footer><el-button>click</el-button></template>{{AXIOM}}</z-dialog>',
      setup() {
        return { AXIOM }
      },
    })

    await nextTick()
    await nextTick()
    const buttons = wrapper.findAll('.el-button')
    expect(buttons[0].text()).toBe('click')
  })

  test('no footer', async () => {
    const wrapper = mount({
      template: '<z-dialog :modelValue="true" :footer="false"></z-dialog>',
      setup() {
        return { AXIOM }
      },
    })

    await nextTick()
    await nextTick()
    const buttons = wrapper.findAll('.el-button')
    expect(buttons.length).toBe(0)
  })

  test('footer render', async () => {
    const wrapper = mount({
      template: '<z-dialog :modelValue="true" :footer="renderFooter">{{AXIOM}}</z-dialog>',
      setup() {
        const renderFooter = () => h('div', { class: 'my-footer' }, 'click')
        return { AXIOM, renderFooter }
      },
    })

    await nextTick()
    await nextTick()
    expect(wrapper.find('.my-footer').text()).toBe('click')
  })

  test('import warning type', async () => {
    const wrapper = mount({
      template: '<el-button @click="handleClick">button</el-button>',
      setup() {
        const handleClick = () => {
          DialogTip.warning('提示信息', '标题', {
            type: 'warning',
            onCancel: ({ cancelButtonLoading }: any) => {
              cancelButtonLoading.value = true
            },
            onConfirm: ({ done }: any) => {
              done
            },
          })
        }
        return { handleClick }
      },
    })

    await wrapper.find('.el-button').trigger('click')
    await nextTick()
    await nextTick()
    expect(document.querySelector('.el-dialog__header')?.textContent).toBe('标题')
    expect(document.querySelector('.z-dialog__message')?.textContent).toBe('提示信息')
    const buttons = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.el-dialog .el-button',
      ),
    )
    expect(buttons.length).toBe(2)
    await buttons[0].click()
    await nextTick()
    expect(buttons[0].classList.contains('is-loading')).toBe(true)
    expect(buttons[1].classList.contains('el-button--warning')).toBe(true)
    await buttons[1].click()
    await nextTick()
    expect(document.querySelector('.el-dialog')).toBeNull
  })

  test('import danger type', async () => {
    const wrapper = mount({
      template: '<el-button @click="handleClick">button</el-button>',
      setup() {
        const handleClick = () => {
          DialogTip({
            title: '标题',
            message: '提示信息',
            type: 'danger',
            onCancel: ({ done }: any) => {
              done
            },
            onConfirm: ({ confirmButtonLoading }: any) => {
              confirmButtonLoading.value = true
            },
          })
        }
        return { handleClick }
      },
    })

    await wrapper.find('.el-button').trigger('click')
    await nextTick()
    await nextTick()
    expect(document.querySelector('.el-dialog__header')?.textContent).toBe('标题')
    expect(document.querySelector('.z-dialog__message')?.textContent).toBe('提示信息')
    const buttons = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.el-dialog .el-button',
      ),
    )
    expect(buttons.length).toBe(2)
    expect(buttons[1].classList.contains('el-button--danger')).toBe(true)
    await buttons[1].click()
    await nextTick()
    expect(buttons[1].classList.contains('is-loading')).toBe(true)
    await buttons[0].click()
    await nextTick()
    expect(document.querySelector('.el-dialog')).toBeNull
  })

  test('import info type', async () => {
    const handleConfirm = vi.fn()
    const wrapper = mount({
      template: '<el-button @click="handleClick">button</el-button>',
      setup() {
        const handleClick = () => {
          DialogTip.info({
            title: '标题',
            message: '提示信息',
            onConfirm: handleConfirm,
          })
        }
        return { handleClick }
      },
    })

    await wrapper.find('.el-button').trigger('click')
    await nextTick()
    await nextTick()
    expect(document.querySelector('.el-dialog__header')?.textContent).toBe('标题')
    expect(document.querySelector('.z-dialog__message')?.textContent).toBe('提示信息')
    const buttons = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.el-dialog .el-button',
      ),
    )
    expect(buttons.length).toBe(1)
    await buttons[0].click()
    await nextTick()
    expect(document.querySelector('.el-dialog')).toBeNull
    expect(handleConfirm).toHaveBeenCalled()
  })

  test('warning type', async () => {
    const handleConfirm = vi.fn()
    const handleCancel = vi.fn()
    const wrapper = mount({
      template: '<z-dialog title="title" :modelValue="true" type="warning" @confirm="handleConfirm" @cancel="handleCancel">content</z-dialog>',
      setup() {
        return { handleConfirm, handleCancel }
      },
    })

    await nextTick()
    await nextTick()
    expect(wrapper.find('.el-dialog__header').text()).toBe('title')
    expect(wrapper.find('.z-dialog__message').text()).toBe('content')
    const buttons = wrapper.findAll('.el-dialog .el-button')
    expect(buttons[1].classes()).toContain('el-button--warning')
    expect(buttons.length).toBe(2)
    await buttons[0].trigger('click')
    expect(handleCancel).toHaveBeenCalled()
    await buttons[1].trigger('click')
    expect(handleConfirm).toHaveBeenCalled()
  })

  test('danger type', async () => {
    const handleConfirm = vi.fn()
    const handleCancel = vi.fn()
    const wrapper = mount({
      template: '<z-dialog title="title" :modelValue="true" type="danger" @confirm="handleConfirm" @cancel="handleCancel">content</z-dialog>',
      setup() {
        return { handleConfirm, handleCancel }
      },
    })

    await nextTick()
    await nextTick()
    expect(wrapper.find('.el-dialog__header').text()).toBe('title')
    expect(wrapper.find('.z-dialog__message').text()).toBe('content')
    const buttons = wrapper.findAll('.el-dialog .el-button')
    expect(buttons[1].classes()).toContain('el-button--danger')
    expect(buttons.length).toBe(2)
    await buttons[0].trigger('click')
    expect(handleCancel).toHaveBeenCalled()
    await buttons[1].trigger('click')
    expect(handleConfirm).toHaveBeenCalled()
  })

  test('info type', async () => {
    const handleConfirm = vi.fn()
    const wrapper = mount({
      template: '<z-dialog title="title" :modelValue="true" type="info" @confirm="handleConfirm">content</z-dialog>',
      setup() {
        return { handleConfirm }
      },
    })

    await nextTick()
    await nextTick()
    expect(wrapper.find('.el-dialog__header').text()).toBe('title')
    expect(wrapper.find('.z-dialog__message').text()).toBe('content')
    const buttons = wrapper.findAll('.el-dialog .el-button')
    expect(buttons[0].classes()).toContain('el-button--primary')
    expect(buttons.length).toBe(1)
    await buttons[0].trigger('click')
    expect(handleConfirm).toHaveBeenCalled()
  })
})

afterAll(() => {
  config.global.components = {}
})
