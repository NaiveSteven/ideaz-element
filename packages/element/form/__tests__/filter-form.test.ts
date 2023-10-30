import { config, mount } from '@vue/test-utils'
import * as ElComponents from 'element-plus'
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import * as ZComponents from '../../index'
import type { FormColumn } from '~/types'

config.global.components = {
  ...ElComponents,
  ...ZComponents,
} as any

const columns = [
  {
    component: 'input',
    field: 'name',
    label: 'name',
  },
  {
    component: 'select',
    field: 'sex',
    label: 'sex',
  },
  {
    component: 'datepicker',
    field: 'date',
    label: 'date',
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

describe('filter-form', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('render', async () => {
    const wrapper = mount({
      template: '<z-filter-form v-model="value" :columns="cols" :options="options" size="large"/>',
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

    expect(wrapper.findAll('button').length).toBe(3)
  })

  test('columns', async () => {
    const wrapper = mount({
      template: '<z-filter-form v-model="value" :columns="cols" :options="options" size="large"/>',
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([...columns])
        return { value, cols, options }
      },
    })

    expect(wrapper.findAll('.el-form-item').length).toBe(4);
    (wrapper.vm.cols as FormColumn[]).push({ component: 'input', label: 'address', field: 'address' })
    await nextTick()
    expect(wrapper.findAll('.el-form-item').length).toBe(5)
  })

  test('events', async () => {
    const handleSearch = vi.fn()
    const handleReset = vi.fn()
    const handleChange = vi.fn()
    const wrapper = mount({
      template: '<z-filter-form v-model="value" :columns="cols" :options="options" @search="handleSearch" @reset="handleReset"/>',
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([
          {
            component: 'input',
            field: 'name',
            label: 'name',
            fieldProps: {
              class: 'my-input',
            },
          },
          {
            component: 'select',
            field: 'sex',
            label: 'sex',
            onChange: handleChange,
          },
          {
            component: 'datepicker',
            field: 'date',
            label: 'date',
          },
        ])
        return { value, cols, options, handleSearch, handleReset }
      },
    })

    const buttons = wrapper.findAll('.el-button')
    expect(buttons.map(item => item.text()).filter(item => item)).toEqual(['search', 'reset', 'retract'])
    await buttons[0].trigger('click')
    await nextTick()
    await nextTick()
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

  describe('operation', async () => {
    test('basic type', async () => {
      const wrapper = mount({
        template: `<z-filter-form v-model="value" :columns="cols" :options="options" search-button-label="handleSearch"
        reset-button-label="handleReset"
        :search-button-loading="searchButtonLoading"
        :reset-button-loading="resetButtonLoading"/>`,
        setup() {
          const value = ref({ name: '', sex: '', date: [] })
          const cols = ref([...columns])
          const searchButtonLoading = ref(false)
          const resetButtonLoading = ref(false)
          return { value, cols, options, searchButtonLoading, resetButtonLoading }
        },
      })

      const buttons = wrapper.findAll('.el-button')
      expect(buttons.map(item => item.text()).filter(item => item)).toEqual(['handleSearch', 'handleReset', 'retract'])
      await buttons[0].trigger('click');
      (wrapper.vm as any).searchButtonLoading = true
      await nextTick()
      expect(buttons[0].text()).toBe('handleSearch')
      expect(buttons[0].classes()).contain('is-loading')
      await buttons[1].trigger('click');
      (wrapper.vm as any).resetButtonLoading = true
      await nextTick()
      expect(buttons[1].text()).toBe('handleReset')
      expect(buttons[1].classes()).contain('is-loading')
    })

    test('props', async () => {
      const wrapper = mount({
        template: `<z-filter-form v-model="value" :columns="cols" :options="options"
        :search-button-props="searchButtonProps"
        :reset-button-props="resetButtonProps"/>`,
        setup() {
          const value = ref({ name: '', sex: '', date: [] })
          const cols = ref([...columns])
          const searchButtonProps = reactive({
            loading: false,
            label: 'handleSearch',
            type: 'primary',
          })
          const resetButtonProps = reactive({
            loading: false,
            label: 'handleReset',
            type: 'danger',
          })
          return { value, cols, options, searchButtonProps, resetButtonProps }
        },
      })

      const buttons = wrapper.findAll('.el-button')
      expect(buttons.map(item => item.text()).filter(item => item)).toEqual(['handleSearch', 'handleReset', 'retract'])
      await buttons[0].trigger('click');
      (wrapper.vm as any).searchButtonProps.loading = true
      await nextTick()
      expect(buttons[0].text()).toBe('handleSearch')
      expect(buttons[0].classes()).contain('is-loading')
      expect(buttons[0].classes()).contain('el-button--primary')
      await buttons[1].trigger('click');
      (wrapper.vm as any).resetButtonProps.loading = true
      await nextTick()
      expect(buttons[1].text()).toBe('handleReset')
      expect(buttons[1].classes()).contain('is-loading')
      expect(buttons[1].classes()).contain('el-button--danger')
    })

    test('slot', async () => {
      const wrapper = mount({
        template: `<z-filter-form v-model="value" :columns="cols" :options="options"><template #formOperation>
        <el-button>content</el-button>
        </template></z-filter-form>`,
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
        template: '<z-filter-form v-model="value" :columns="cols" :options="options" :renderOperation="renderOperation" />',
        setup() {
          const value = ref({ name: '', sex: '', date: [] })
          const cols = ref([...columns])
          const renderOperation = () => h('span', { class: 'my-render' }, 'content')
          return { value, cols, options, renderOperation }
        },
      })

      expect(wrapper.find('.my-render').text()).toBe('content')
    })
  })

  test('hide', async () => {
    const wrapper = mount({
      template: '<z-filter-form v-model="value" :columns="cols" :options="options" size="large"/>',
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([{
          component: 'input',
          field: 'name',
          label: 'name',
          fieldProps: {
            class: 'my-input',
          },
          hide: () => value.value.sex === 'male',
        },
        {
          component: 'select',
          field: 'sex',
          label: 'sex',
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
      template: `<z-filter-form v-model="value" :columns="cols" :options="options" size="large">
        <template #name>
          <el-input v-model="value.name" class="my-input" />
        </template>
      </z-filter-form>`,
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([{
          slot: 'name',
          label: 'name',
        },
        {
          component: 'select',
          field: 'sex',
          label: 'sex',
        }])
        return { value, cols, options }
      },
    })

    expect(wrapper.find('.my-input').exists()).toBe(true)
  })

  test('content render', async () => {
    const wrapper = mount({
      template: '<z-filter-form v-model="value" :columns="cols" :options="options" size="large" />',
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([{
          render: () => h('span', { class: 'my-span' }, 'content'),
          label: 'name',
        },
        {
          component: 'select',
          field: 'sex',
          label: 'sex',
        }])
        return { value, cols, options }
      },
    })

    expect(wrapper.find('.my-span').text()).toBe('content')
  })

  test('form item label', async () => {
    const wrapper = mount({
      template: `<z-filter-form v-model="value" :columns="cols" :options="options" size="large">
        <template #nameSlot>
          <span class="slot-label">slotContent</span>
        </template>
      </z-filter-form>`,
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([{
          component: 'input',
          field: 'name',
          label: 'nameSlot',
        },
        {
          component: 'select',
          field: 'sex',
          label: () => h('span', { class: 'render-label' }, 'content'),
        }])
        return { value, cols, options }
      },
    })

    expect(wrapper.find('.slot-label').text()).toBe('slotContent')
    expect(wrapper.find('.render-label').text()).toBe('content')
  })

  test('validate', async () => {
    const wrapper = mount({
      template: '<z-filter-form ref="myForm" v-model="val" :columns="cols" :options="options" size="large" />',
      setup() {
        const val = ref({ name: '', sex: '', date: '' })
        const myForm = ref()
        const handleClick = () => {
          myForm.value.validate((val: boolean) => {
            console.log(val, 'asdfasdfasf')
          })
        }
        const cols = ref([
          {
            component: 'input',
            field: 'name',
            label: 'name',
            required: true,
          },
          {
            component: 'select',
            field: 'sex',
            label: 'sex',
            formItemProps: {
              required: true,
            },
          },
          {
            component: 'datepicker',
            filed: 'date',
            label: 'date',
            rules: {
              required: true,
              message: 'required date',
            },
          },
        ])
        return { val, cols, options, myForm, handleClick }
      },
    })

    // expect(wrapper.find('.el-button').text()).toBe('search')
    // await wrapper.find('.el-button').trigger('click')
    // await wrapper.find('.my-button').trigger('click')
    // expect(wrapper.findAll('.el-form-item__error').length).toBe(3)
    const res = await wrapper.vm.$refs.myForm.validate()
    console.log(res, 'resrsersersser')
  })
})

afterAll(() => {
  config.global.components = {}
})
