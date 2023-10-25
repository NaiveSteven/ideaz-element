import { config, mount } from '@vue/test-utils'
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import ZTagSelect from '../src/index'
import type { OptionsItem } from '../../types'

config.global.components = { ZTagSelect }

const options: OptionsItem[] = [{ label: 'Jack', value: 'Jack' }, { label: 'Rose', value: 'Rose' }, { label: 'Alice', value: 'Alice' }, { label: 'Steven', value: 'Steven' }]

const getList = (wrapper: VueWrapper<ComponentPublicInstance>, cls = '') => {
  const className = `.el-tag${cls}`
  return wrapper
    .findAll(className)
}

const getListLabel = (wrapper: VueWrapper<ComponentPublicInstance>, cls = '') => {
  const className = `.el-tag${cls}`
  return wrapper
    .findAll(className)
    .map(item => (item ? item.find('.el-tag__content').text() : ''))
}

describe('tag-select', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('options', async () => {
    const wrapper = mount({
      template: '<z-tag-select v-model="tagSelect" :options="options" />',
      setup() {
        const tagSelect = ref('Jack')
        return { options, tagSelect }
      },
    })

    const list = getListLabel(wrapper)
    expect(list).toEqual(['Jack', 'Rose', 'Alice', 'Steven'])
    expect(getListLabel(wrapper, '.el-tag--dark')).toContain('Jack')
  })

  test('title', async () => {
    const wrapper = mount({
      template: '<z-tag-select title="title" v-model="tagSelect" :options="options" />',
      setup() {
        const tagSelect = ref('Jack')
        return { options, tagSelect }
      },
    })
    expect(wrapper.find('.z-tag-select__title').text()).toBe('title')
  })

  test('multiple', async () => {
    const wrapper = mount({
      template: '<z-tag-select :all="false" multiple title="title" v-model="tagSelect" :options="options" />',
      setup() {
        const tagSelect = ref(['Jack', 'Steven'])
        return { options, tagSelect }
      },
    })
    const list = getList(wrapper)
    expect(getListLabel(wrapper, '.el-tag--dark')).toContain('Jack')
    expect(getListLabel(wrapper, '.el-tag--dark')).toContain('Steven')
    await list[1].trigger('click')
    expect(getListLabel(wrapper, '.el-tag--dark')).toContain('Rose')
    await list[0].trigger('click')
    expect(getListLabel(wrapper, '.el-tag--dark')).not.toContain('Jack')
  })

  test('all', async () => {
    const wrapper = mount({
      template: '<z-tag-select multiple title="title" v-model="tagSelect" :options="options" />',
      setup() {
        const tagSelect = ref(['Jack'])
        return { options, tagSelect }
      },
    })
    const list = getList(wrapper)
    expect(getListLabel(wrapper, '.el-tag--dark')).toContain('Jack')
    await list[0].trigger('click')
    expect(getListLabel(wrapper, '.el-tag--dark')).toEqual(['all', 'Jack', 'Rose', 'Alice', 'Steven'])
    await list[0].trigger('click')
    expect(getListLabel(wrapper, '.el-tag--dark')).toEqual([])
    await list[1].trigger('click')
    await list[2].trigger('click')
    await list[3].trigger('click')
    await list[4].trigger('click')
    expect(getListLabel(wrapper, '.el-tag--dark')).toEqual(['all', 'Jack', 'Rose', 'Alice', 'Steven'])
    await list[1].trigger('click')
    expect(getListLabel(wrapper, '.el-tag--dark')).toEqual(['Rose', 'Alice', 'Steven'])
    await list[1].trigger('click')
    expect(getListLabel(wrapper, '.el-tag--dark')).toEqual(['all', 'Jack', 'Rose', 'Alice', 'Steven'])
  })

  test('click event', async () => {
    const handleClick = vi.fn()
    const wrapper = mount({
      template: '<z-tag-select title="title" v-model="tagSelect" :options="opts" />',
      setup() {
        const tagSelect = ref('')
        const opts = [{ label: 'Jack', value: 'jack', onClick: handleClick }]
        return { opts, tagSelect }
      },
    })
    const list = getList(wrapper)
    list[0].trigger('click')
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})

afterAll(() => {
  config.global.components = {}
})
