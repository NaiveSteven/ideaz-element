import { config, mount } from '@vue/test-utils'
import * as ElComponents from 'element-plus'
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { ElLoadingDirective } from 'element-plus'
import * as ZComponents from '../../index'
import type { TableCol } from '~/types'

config.global.components = {
  ...ElComponents,
  ...ZComponents,
} as any

config.global.directives = {
  loading: ElLoadingDirective,
}

const columns = [
  {
    label: 'a',
    prop: 'a',
    search: {
      component: 'input',
      field: 'name',
      label: 'name',
    },
  },
  {
    label: 'b',
    prop: 'b',
    search: {
      component: 'select',
      field: 'sex',
      label: 'sex',
    },
  },
  {
    label: 'c',
    prop: 'c',
    search: {
      component: 'datepicker',
      field: 'date',
      label: 'date',
    },
  },
]

const getOptions = () =>
  Array.from(
    document.querySelectorAll<HTMLElement>(
      '.el-select-dropdown__item',
    ),
  )

const getInputValue = (wrapper: VueWrapper<ComponentPublicInstance>, index: number) =>
  (wrapper.findAll('.el-input__inner').at(index) as any).element.value

const options = { sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }] }

const getLabelList = (wrapper: VueWrapper<ComponentPublicInstance>) =>
  wrapper.findAll('.el-form-item__label').map(item => item.text())

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

describe('crud-form', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('render', async () => {
    const wrapper = mount({
      template: '<z-crud v-model:formData="value" :columns="cols" :options="options" size="large" :toolBar="false" :action="false"/>',
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([...columns])
        return { value, cols, options }
      },
    })

    const labelList = getLabelList(wrapper)
    expect(labelList).toEqual(['name', 'sex', 'date'])
    expect(wrapper.find('.el-form--large').exists()).toBe(true)

    expect(wrapper.findAll('.select-trigger').length).toBe(1)
    await wrapper.find('.select-trigger').trigger('click')
    await nextTick()
    const data = getOptions()
    expect((wrapper.vm.value as any).sex).toBe('')
    expect(getInputValue(wrapper, 1)).toBe('')

    data[1].click()
    await nextTick()
    expect((wrapper.vm.value as any).sex).toBe('female')
    expect(getInputValue(wrapper, 1)).toBe('female')
  })

  test('columns', async () => {
    const wrapper = mount({
      template: '<z-crud v-model:formData="value" :columns="cols" :options="options" size="large" :toolBar="false" :action="false"/>',
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([...columns])
        return { value, cols, options }
      },
    })

    expect(wrapper.findAll('.el-form-item').length).toBe(4);
    (wrapper.vm.cols as TableCol[]).push({ label: 'd', prop: 'd', search: { component: 'input', label: 'address', field: 'address' } })
    await nextTick()
    expect(wrapper.findAll('.el-form-item').length).toBe(5)
  })

  test('events', async () => {
    const handleSearch = vi.fn()
    const handleReset = vi.fn()
    const handleChange = vi.fn()
    const wrapper = mount({
      template: '<z-crud v-model:formData="value" :loading="false" :columns="cols" :options="options" @search="handleSearch" @reset="handleReset" :action="false" :toolBar="false"/>',
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([
          {
            label: 'a',
            prop: 'a',
            search: {
              component: 'input',
              field: 'name',
              label: 'name',
              fieldProps: {
                class: 'my-input',
              },
            },
          },
          {
            label: 'b',
            prop: 'b',
            search: {
              component: 'select',
              field: 'sex',
              label: 'sex',
              onChange: handleChange,
            },
          },
          {
            label: 'c',
            prop: 'c',
            search: {
              component: 'datepicker',
              field: 'date',
              label: 'date',
            },
          },
        ])
        return { value, cols, options, handleSearch, handleReset }
      },
    })
    await nextTick()
    await nextTick()
    const buttons = wrapper.findAll('.el-button')
    expect(buttons.map(item => item.text()).filter(item => item)).toEqual(['search', 'reset', 'retract'])
    await buttons[0].trigger('click')
    await nextTick()
    await nextTick()
    await delay(200)
    expect(handleSearch).toHaveBeenCalled()

    expect(wrapper.findAll('.select-trigger').length).toBe(1)
    await wrapper.find('.select-trigger').trigger('click')
    await nextTick()
    const data = getOptions()
    expect((wrapper.vm.value as any).sex).toBe('')
    expect(getInputValue(wrapper, 1)).toBe('')
    data[1].click()
    await nextTick()
    expect((wrapper.vm.value as any).sex).toBe('female')
    expect(getInputValue(wrapper, 1)).toBe('female')
    expect(handleChange).toHaveBeenCalled()

    await buttons[1].trigger('click')
    await nextTick()
    await nextTick()
    expect(((wrapper.vm.value as any).sex)).toBe('')
    expect(handleReset).toHaveBeenCalled()
  })

  test('hide', async () => {
    const wrapper = mount({
      template: '<z-crud v-model:formData="value" :columns="cols" :options="options" size="large" :action="false" :toolBar="false"/>',
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([{
          label: 'a',
          prop: 'a',
          search: {
            component: 'input',
            field: 'name',
            label: 'name',
            fieldProps: {
              class: 'my-input',
            },
            hide: () => value.value.sex === 'male',
          },
        },
        {
          label: 'b',
          prop: 'b',
          search: {
            component: 'select',
            field: 'sex',
            label: 'sex',
          },
        }])
        return { value, cols, options }
      },
    })

    expect(wrapper.find('.my-input').exists()).toBe(true);
    ((wrapper.vm.value as any).sex) = 'male'
    await nextTick()
    expect(wrapper.find('.my-input').exists()).toBe(false);
    ((wrapper.vm.value as any).sex) = 'female'
    await nextTick()
    expect(wrapper.find('.my-input').exists()).toBe(true)
  })

  test('content slot', async () => {
    const wrapper = mount({
      template: `<z-crud v-model:formData="value" :columns="cols" :options="options" size="large" :toolBar="false" :action="false">
        <template #name>
          <el-input v-model="value.name" class="my-input" />
        </template>
      </z-crud>`,
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([{
          label: 'a',
          prop: 'a',
          search: {
            slot: 'name',
            label: 'name',
          },
        },
        {
          label: 'b',
          prop: 'b',
          search: {
            component: 'select',
            field: 'sex',
            label: 'sex',
          },
        }])
        return { value, cols, options }
      },
    })

    expect(wrapper.find('.my-input').exists()).toBe(true)
  })

  test('content render', async () => {
    const wrapper = mount({
      template: '<z-crud v-model:formData="value" :columns="cols" :options="options" size="large" :action="false" :toolBar="false" />',
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([
          {
            label: 'a',
            prop: 'a',
            search: {
              render: () => h('span', { class: 'my-span' }, 'content'),
              label: 'name',
            },
          },
          {
            label: 'b',
            prop: 'b',
            search: {
              component: 'select',
              field: 'sex',
              label: 'sex',
            },
          }])
        return { value, cols, options }
      },
    })

    expect(wrapper.find('.my-span').text()).toBe('content')
  })

  test('form item label', async () => {
    const wrapper = mount({
      template: `<z-crud v-model:formData="value" :columns="cols" :options="options" size="large" :action="false" :toolBar="false">
        <template #nameSlot>
          <span class="slot-label">slotContent</span>
        </template>
      </z-crud>`,
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([
          {
            label: 'a',
            prop: 'a',
            search: {
              component: 'input',
              field: 'name',
              label: 'nameSlot',
            },
          },
          {
            label: 'b',
            prop: 'b',
            search: {
              component: 'select',
              field: 'sex',
              label: () => h('span', { class: 'render-label' }, 'content'),
            },
          }])
        return { value, cols, options }
      },
    })

    expect(wrapper.find('.slot-label').text()).toBe('slotContent')
    expect(wrapper.find('.render-label').text()).toBe('content')
  })

  // test('validate', async () => {
  //   const wrapper = mount({
  //     template: '<z-crud ref="myForm" :loading="false" v-model:formData="val" :columns="cols" :options="options" :action="false" :toolBar="false"/>',
  //     setup() {
  //       const val = ref({ name: '', sex: '', date: '' })
  //       const myForm = ref()
  //       const handleClick = () => {
  //         myForm.value.validate((val: boolean) => {
  //           console.log(val, 'asdfasdfasf')
  //         })
  //       }
  //       const cols = ref([
  //         {
  //           label: 'a',
  //           prop: 'a',
  //           search: {
  //             component: 'input',
  //             field: 'name',
  //             label: 'name',
  //             required: true,
  //           },
  //         },
  //         {
  //           label: 'b',
  //           prop: 'b',
  //           search: {
  //             component: 'select',
  //             field: 'sex',
  //             label: 'sex',
  //             formItemProps: {
  //               required: true,
  //             },
  //           },
  //         },
  //         {
  //           label: 'c',
  //           prop: 'c',
  //           search: {
  //             component: 'datepicker',
  //             filed: 'date',
  //             label: 'date',
  //             rules: {
  //               required: true,
  //               message: 'required date',
  //             },
  //           },
  //         },
  //       ])
  //       return { val, cols, options, myForm, handleClick }
  //     },
  //   })

  //   expect(wrapper.find('.el-button').text()).toBe('search')
  //   await wrapper.find('.el-button').trigger('click')
  //   const res = await (wrapper.vm.$refs.myForm as any).validate()
  //   await nextTick()
  //   await nextTick()
  //   await delay(1000)
  //   await nextTick()
  //   await nextTick()
  //   expect(wrapper.findAll('.el-form-item__error').length).toBe(3)
  // })

  describe('operation', async () => {
    test('basic type', async () => {
      const wrapper = mount({
        template: '<z-crud v-model:value="value" :search="search" :columns="cols" :options="options" :action="false" :toolBar="false"/>',
        setup() {
          const value = ref({ name: '', sex: '', date: [] })
          const cols = ref([...columns])
          const search = ref({
            searchButtonLabel: 'handleSearch',
            resetButtonLabel: 'handleReset',
            resetButtonLoading: false,
          })
          return { value, cols, options, search }
        },
      })

      const buttons = wrapper.findAll('.el-button')
      expect(buttons.map(item => item.text()).filter(item => item)).toEqual(['handleSearch', 'handleReset', 'retract'])
      expect(buttons[0].text()).toBe('handleSearch')
      await buttons[1].trigger('click');
      (wrapper.vm as any).search.resetButtonLoading = true
      await nextTick()
      expect(buttons[1].text()).toBe('handleReset')
      expect(buttons[1].classes()).contain('is-loading')
    })

    test('props', async () => {
      const wrapper = mount({
        template: '<z-crud v-model:formData="value" :columns="cols" :options="options" :search="search" :action="false" :toolBar="false"/>',
        setup() {
          const value = ref({ name: '', sex: '', date: [] })
          const cols = ref([...columns])
          const search = ref({
            searchButtonProps: {
              loading: false,
              label: 'handleSearch',
              type: 'primary',
            },
            resetButtonProps: {
              loading: false,
              label: 'handleReset',
              type: 'danger',
            },
          })
          return { value, cols, options, search }
        },
      })

      const buttons = wrapper.findAll('.el-button')
      expect(buttons.map(item => item.text()).filter(item => item)).toEqual(['handleSearch', 'handleReset', 'retract'])
      await buttons[0].trigger('click');
      (wrapper.vm as any).search.searchButtonProps.loading = true
      await nextTick()
      expect(buttons[0].text()).toBe('handleSearch')
      expect(buttons[0].classes()).contain('is-loading')
      expect(buttons[0].classes()).contain('el-button--primary')
      await buttons[1].trigger('click');
      (wrapper.vm as any).search.resetButtonProps.loading = true
      await nextTick()
      expect(buttons[1].text()).toBe('handleReset')
      expect(buttons[1].classes()).contain('is-loading')
      expect(buttons[1].classes()).contain('el-button--danger')
    })

    test('slot', async () => {
      const wrapper = mount({
        template: `<z-crud v-model:formData="value" :action="false" :toolBar="false" :columns="cols" :options="options"><template #formOperation>
        <el-button>content</el-button>
        </template></z-crud>`,
        setup() {
          const value = ref({ name: '', sex: '', date: [] })
          const cols = ref([...columns])
          return { value, cols, options }
        },
      })

      const buttons = wrapper.findAll('.el-button')
      expect(buttons.map(item => item.text()).filter(item => item)).toEqual(['content', 'retract'])
    })

    test('render operation', async () => {
      const wrapper = mount({
        template: '<z-crud v-model:formData="value" :columns="cols" :options="options" :search="search" :toolBar="false" :action="false" />',
        setup() {
          const value = ref({ name: '', sex: '', date: [] })
          const cols = ref([...columns])
          const renderOperation = () => h('span', { class: 'my-render' }, 'content')
          const search = ref({
            renderOperation,
          })
          return { value, cols, options, renderOperation, search }
        },
      })

      expect(wrapper.find('.my-render').text()).toBe('content')
    })
  })
})

afterAll(() => {
  config.global.components = {}
})
