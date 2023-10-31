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

describe('form', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('render', async () => {
    const wrapper = mount({
      template: '<z-form v-model="value" :columns="cols" :options="options" size="large"/>',
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
      template: '<z-form v-model="value" :columns="cols" :options="options" size="large"/>',
      setup() {
        const value = ref({ name: '', sex: '', date: [] })
        const cols = ref([...columns])
        return { value, cols, options }
      },
    })

    expect(wrapper.findAll('.el-form-item').length).toBe(3);
    (wrapper.vm.cols as FormColumn[]).push({ component: 'input', label: 'address', field: 'address' })
    await nextTick()
    expect(wrapper.findAll('.el-form-item').length).toBe(4)
  })

  test('hide', async () => {
    const wrapper = mount({
      template: '<z-form v-model="value" :columns="cols" :options="options" size="large"/>',
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
      template: `<z-form v-model="value" :columns="cols" :options="options" size="large">
        <template #name>
          <el-input v-model="value.name" class="my-input" />
        </template>
      </z-form>`,
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
      template: '<z-form v-model="value" :columns="cols" :options="options" size="large" />',
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
      template: `<z-form v-model="value" :columns="cols" :options="options" size="large">
        <template #nameSlot>
          <span class="slot-label">slotContent</span>
        </template>
      </z-form>`,
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

  test('events', async () => {
    const handleChange = vi.fn()
    const wrapper = mount({
      template: '<z-form v-model="value" :columns="cols" :options="options"/>',
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
        return { value, cols, options }
      },
    })

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
  })
})

afterAll(() => {
  config.global.components = {}
})
