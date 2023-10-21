import type { VueWrapper } from '@vue/test-utils'
import { config, mount } from '@vue/test-utils'

import { afterEach, describe, expect, test } from 'vitest'
import ZCheckbox from '../src/index'

config.global.components = { ZCheckbox }

const options = [{ label: 'Jack', value: '1' }, { label: 'Rose', value: '2' }, { label: 'Alice', value: '3' }, { label: 'Bob', value: '4', disabled: true }]

const getList = (wrapper: VueWrapper<ComponentPublicInstance>) => {
  const className = '.el-checkbox'
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
    // expect(getList(wrapper, '.is-disabled')).toContain('Bob')
    // expect(getList(wrapper, '.is-checked')).toContain('Jack')
    // expect(getList(wrapper, '.is-checked')).not.toContain('Rose')
    // expect(getList(wrapper, '.is-checked')).not.toContain('Alice')
  })
})
