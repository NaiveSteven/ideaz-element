import { config, mount } from '@vue/test-utils'
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import { ElButton, ElDialog } from 'element-plus'
import ZDialog from '../src/index'

config.global.components = { ZDialog, ElDialog, ElButton }

const AXIOM = 'placeholder'

const dialogClose = '.pro-crud .pro-crud-dialog .el-dialog__headerbtn'
const dialogBody = '.pro-crud .pro-crud-dialog .el-dialog__body'
const detailClass = `${dialogBody} .pro-crud-detail`

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

  // test('dialog header should have slot props', async () => {
  //   const wrapper = mount(
  //     <Dialog
  //       modelValue={true}
  //       v-slots={{
  //         header: ({
  //           titleId,
  //           titleClass,
  //           close,
  //         }: {
  //           titleId: string
  //           titleClass: string
  //           close: () => void
  //         }) => (
  //           <button
  //             data-title-id={titleId}
  //             data-title-class={titleClass}
  //             onClick={close}
  //           />
  //         ),
  //       }}
  //     >
  //       {AXIOM}
  //     </Dialog>
  //   )

  //   await nextTick()
  //   const headerButton = wrapper.find('button')
  //   expect(headerButton.attributes()['data-title-id']).toBeTruthy()
  //   expect(headerButton.attributes()['data-title-class']).toBe(
  //     'el-dialog__title'
  //   )
  //   expect(wrapper.emitted().close).toBeFalsy()
  //   headerButton.trigger('click')
  //   await nextTick()
  //   expect(wrapper.emitted()).toHaveProperty('close')
  // })

  // test('dialog should have a footer when footer has been given', async () => {
  //   const wrapper = mount(
  //     <Dialog modelValue={true} v-slots={{ footer: () => AXIOM }}>
  //       {AXIOM}
  //     </Dialog>
  //   )

  //   await nextTick()
  //   expect(wrapper.find('.el-dialog__footer').exists()).toBe(true)
  //   expect(wrapper.find('.el-dialog__footer').text()).toBe(AXIOM)
  // })

  // test('should append dialog to body when appendToBody is true', async () => {
  //   const wrapper = mount(
  //     <Dialog modelValue={true} appendToBody={true}>
  //       {AXIOM}
  //     </Dialog>
  //   )

  //   await nextTick()
  //   expect(
  //     document.body.firstElementChild!.classList.contains('el-overlay')
  //   ).toBe(true)
  //   wrapper.unmount()
  // })

  // test('should center dialog', async () => {
  //   const wrapper = mount(
  //     <Dialog modelValue={true} center={true}>
  //       {AXIOM}
  //     </Dialog>
  //   )

  //   await nextTick()
  //   expect(wrapper.find('.el-dialog--center').exists()).toBe(true)
  // })

  // test('should show close button', async () => {
  //   const wrapper = mount(<Dialog modelValue={true}>{AXIOM}</Dialog>)

  //   await nextTick()
  //   expect(wrapper.find('.el-dialog__close').exists()).toBe(true)
  // })

  // test('should hide close button when showClose = false', async () => {
  //   const wrapper = mount(
  //     <Dialog modelValue={true} showClose={false}>
  //       {AXIOM}
  //     </Dialog>
  //   )

  //   await nextTick()
  //   expect(wrapper.find('.el-dialog__headerbtn').exists()).toBe(false)
  // })

  // test('should close dialog when click on close button', async () => {
  //   const wrapper = mount(<Dialog modelValue={true}>{AXIOM}</Dialog>)

  //   await nextTick()
  //   await wrapper.find('.el-dialog__headerbtn').trigger('click')
  //   expect(wrapper.vm.visible).toBe(false)
  // })
})

afterAll(() => {
  config.global.components = {}
})
