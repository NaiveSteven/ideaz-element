import type { VueWrapper } from '@vue/test-utils'
import { config, mount } from '@vue/test-utils'
import { ElCheckbox, ElCheckboxButton, ElCheckboxGroup } from 'element-plus'
import { afterAll, afterEach, describe, expect, test } from 'vitest'
import ZCheckbox from '../src/index'
import type { OptionsItem } from '../../types'

config.global.components = { ZCheckbox, ElCheckbox, ElCheckboxButton, ElCheckboxGroup }

const options: OptionsItem[] = [{ label: 'Jack', value: 'Jack' }, { label: 'Rose', value: 'Rose' }, { label: 'Alice', value: 'Alice' }, { label: 'Bob', value: 'Bob', disabled: true }]

const getList = (wrapper: VueWrapper<ComponentPublicInstance>, cls = '') => {
  const className = `.el-checkbox${cls}`
  return wrapper
    .findAll(className)
    .map(item => (item ? item.find('.el-checkbox__label').text() : ''))
}

describe('checkbox', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('options', async () => {
    const wrapper = mount({
      template: '<z-checkbox v-model="value" :options="options" />',
      setup() {
        const value = ref(['Jack'])
        return { value, options }
      },
    })

    expect(getList(wrapper)).toContain('Jack')
    expect(getList(wrapper)).toContain('Rose')
    expect(getList(wrapper)).toContain('Alice')
    expect(getList(wrapper, '.is-disabled')).toContain('Bob')
    expect(getList(wrapper, '.is-checked')).toContain('Jack')
    expect(getList(wrapper, '.is-checked')).not.toContain('Rose')
    expect(getList(wrapper, '.is-checked')).not.toContain('Alice')
  })

  test('options change', async () => {
    const wrapper = mount({
      template: '<z-checkbox v-model="value" :options="opts" />',
      setup() {
        const value = ref(['Jack'])
        const opts = ref(options)
        return { value, opts }
      },
    })

    expect(getList(wrapper)).not.toContain('Steven')
    await (wrapper.vm.opts as OptionsItem[]).push({ value: 'Steven', label: 'Steven' })
    expect(getList(wrapper)).toContain('Steven')
  })

  test('disabled all', async () => {
    const wrapper = mount({
      template: '<z-checkbox v-model="value" :options="opts" size="default" :disabled="true"/>',
      setup() {
        const value = ref(['Jack'])
        const opts = ref(options)
        return { value, opts }
      },
    })

    expect(getList(wrapper, '.is-disabled')).toContain('Bob')
    expect(getList(wrapper, '.is-disabled')).toContain('Jack')
    expect(getList(wrapper, '.is-disabled')).toContain('Rose')
    expect(getList(wrapper, '.is-disabled')).toContain('Alice')
  })

  test('type', async () => {
    const wrapper = mount({
      template: '<z-checkbox v-model="value" :options="opts" size="default"/>',
      setup() {
        const value = ref(['Jack'])
        const opts = ref(options.concat([{ label: 'Steven', value: 'Steven', type: 'checkbox-button' }]))
        return { value, opts }
      },
    })

    expect(wrapper.findAll('.el-checkbox-button--default').map(item => item ? item.find('.el-checkbox-button__inner').text() : '')).toContain('Steven')
  })

  test('alias', async () => {
    const wrapper = mount({
      template: '<z-checkbox v-model="value" :options="opts" :alias="alias"/>',
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

    const list = getList(wrapper)
    ;['Jack', 'Rose', 'Alice', 'Bob'].forEach((item) => {
      expect(list).toContain(item)
    })

    await (wrapper.vm.value as string[]).push('Steven')
    expect(getList(wrapper, '.is-checked')).toContain('Steven')
    expect(getList(wrapper, '.is-checked')).toContain('Jack')
  })
})

afterAll(() => {
  config.global.components = {}
})
