import type { VueWrapper } from '@vue/test-utils'
import { config, mount } from '@vue/test-utils'
import { ElOption, ElOptionGroup, ElSelect } from 'element-plus'
import { afterAll, afterEach, describe, expect, test } from 'vitest'
import ZSelect from '../src/index'
import type { OptionsItem } from '../../types'

config.global.components = { ZSelect, ElSelect, ElOptionGroup, ElOption }

const options: OptionsItem[] = [{ label: 'Jack', value: 'Jack' },
  { label: 'Rose', value: 'Rose' }, { label: 'Alice', value: 'Alice' }, { label: 'Steven', value: 'Steven' }, { label: 'Bob', value: 'Bob', disabled: true }]

const getInputValue = (wrapper: VueWrapper<ComponentPublicInstance>) =>
  wrapper.find<HTMLInputElement>('.el-input__inner').element.value
const getOptions = () =>
  Array.from(
    document.querySelectorAll<HTMLElement>(
      'body > div:last-child .el-select-dropdown__item',
    ),
  )

describe('select', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('options and value change', async () => {
    const wrapper = mount({
      template: '<z-select v-model="value" :options="options" />',
      setup() {
        const value = ref('')
        return { value, options }
      },
    })

    await wrapper.find('.select-trigger').trigger('click')
    const data = getOptions()
    expect(wrapper.vm.value).toBe('')
    expect(getInputValue(wrapper)).toBe('')

    data[2].click()
    await nextTick()
    expect(wrapper.vm.value).toBe('Alice')
    expect(getInputValue(wrapper)).toBe('Alice')

    data[3].click()
    await nextTick()
    expect(wrapper.vm.value).toBe('Steven')
    expect(getInputValue(wrapper)).toBe('Steven')

    // disabled
    data[4].click()
    await nextTick()
    expect(wrapper.vm.value).toBe('Steven')
    expect(getInputValue(wrapper)).toBe('Steven')
  })

  test('options change', async () => {
    const wrapper = mount({
      template: '<z-select v-model="value" :options="opts" />',
      setup() {
        const value = ref('Steven')
        const opts = ref([...options])
        return { value, opts }
      },
    })

    await wrapper.find('.select-trigger').trigger('click')
    await (wrapper.vm.opts as OptionsItem[]).push({ value: 'Helen', label: 'Helen' })
    expect(wrapper.vm.value).toBe('Steven')
    expect(getInputValue(wrapper)).toBe('Steven')
    const data = getOptions()

    data[5].click()
    await nextTick()
    expect(wrapper.vm.value).toBe('Helen')
  })

  test('alias', async () => {
    const wrapper = mount({
      template: '<z-select v-model="value" :options="opts" :alias="alias"/>',
      setup() {
        const value = ref(['Jack'])
        const opts = ref(options.map(item => ({ data: { title: item.label }, key: item.value })))
        const alias = {
          label: 'data.title',
          value: 'key',
        }
        return { value, opts, alias }
      },
    })

    await wrapper.find('.select-trigger').trigger('click')
    const data = getOptions()
    const list = data.map(item => item.querySelector('span')?.innerHTML)
    ;['Jack', 'Rose', 'Alice', 'Steven', 'Bob'].forEach((item) => {
      expect(list).toContain(item)
    })

    data[3].click()
    await nextTick()
    expect(wrapper.vm.value).toBe('Steven')
    expect(getInputValue(wrapper)).toBe('Steven')
  })

  test('group type', async () => {
    const wrapper = mount({
      template: '<z-select v-model="value" :options="opts" />',
      setup() {
        const value = ref('')
        const opts = ref([{
          label: 'names',
          options: [
            { label: 'Steven', value: 'Steven' },
            { label: 'Alice', value: 'Alice' },
          ],
        }])
        return { value, opts }
      },
    })

    await wrapper.find('.select-trigger').trigger('click')
    expect(wrapper.vm.value).toBe('')
    expect(getInputValue(wrapper)).toBe('')
    const data = getOptions()

    expect(document.querySelector('body > div:last-child .el-select-group__title')?.innerHTML).toBe('names')
    const list = data.map(item => item.querySelector('span')?.innerHTML)
    ;['Alice', 'Steven'].forEach((item) => {
      expect(list).toContain(item)
    })
  })

  test('select all', async () => {
    const wrapper = mount({
      template: '<z-select v-model="value" :options="options" multiple all />',
      setup() {
        const value = ref([])
        return { value, options }
      },
    })

    await wrapper.find('.select-trigger').trigger('click')
    expect(wrapper.vm.value).toStrictEqual([])
    expect(getInputValue(wrapper)).toBe('')
    const data = getOptions()

    const list = data.map(item => item.querySelector('span')?.innerHTML)
    ;['all', 'Jack', 'Rose', 'Alice', 'Steven', 'Bob'].forEach((item) => {
      expect(list).toContain(item)
    })

    data[0].click()
    await nextTick()
    expect(wrapper.vm.value).toStrictEqual(['all', 'Jack', 'Rose', 'Alice', 'Steven', 'Bob'])

    data[1].click()
    await nextTick()
    expect(wrapper.vm.value).toStrictEqual(['Rose', 'Alice', 'Steven', 'Bob'])

    data[1].click()
    await nextTick()
    expect(wrapper.vm.value).toStrictEqual(['all', 'Jack', 'Rose', 'Alice', 'Steven', 'Bob'])

    data[0].click()
    expect(wrapper.vm.value).toStrictEqual([])
  })

  test('render and slot', async () => {
    const wrapper = mount({
      template: '<z-select v-model="value" :options="opts"><template #optionSlot="{option}"><span>自定义Slot{{option.value}}</span></template></z-select>',
      setup() {
        const value = ref('')
        const opts = ref([
          {
            label: '1',
            value: '1',
            // eslint-disable-next-line no-empty-pattern
            render: ({}, { option }: { option: OptionsItem }) => h('span', {}, `自定义Render${option.value}`),
          },
          {
            label: '2',
            value: '2',
            render: 'optionSlot',
          },
        ])
        return { value, opts }
      },
    })

    await wrapper.find('.select-trigger').trigger('click')
    expect(wrapper.vm.value).toBe('')
    expect(getInputValue(wrapper)).toBe('')
    const data = getOptions()

    const list = data.map(item => item.querySelector('span')?.innerHTML)
    ;['自定义Render1', '自定义Slot2'].forEach((item) => {
      expect(list).toContain(item)
    })
  })

  test('prefix', async () => {
    const wrapper = mount({
      template: '<z-select v-model="value" class="set-prefix" :prefix="setPrefix"/><z-select v-model="value" class="string-prefix" prefix="asdf"/>',
      setup() {
        const setPrefix = () => h('span', { }, 'prefix')
        const value = ref('')
        return { value, setPrefix }
      },
    })

    expect(wrapper.find('.set-prefix .el-input__prefix-inner').text()).toBe('prefix')
    expect(wrapper.find('.string-prefix .el-input__prefix-inner').text()).toBe('asdf')
  })

  test('options change', async () => {
    mount({
      template: '<z-select v-model="value" class="set-empty" :empty="setEmpty"/><z-select v-model="value" class="string-empty" empty="asdf"/>',
      setup() {
        const value = ref('')
        const setEmpty = () => h('span', { }, 'empty')

        return { value, setEmpty }
      },
    })

    const list = Array.from(document.querySelectorAll('.el-select-dropdown')).map(item => item.querySelector('span')?.innerHTML)
    ;['empty', 'asdf'].forEach((item) => {
      expect(list).toContain(item)
    })
  })
})

afterAll(() => {
  config.global.components = {}
})
