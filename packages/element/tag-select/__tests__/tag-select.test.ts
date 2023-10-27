import { config, mount } from '@vue/test-utils'
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import ZTagSelect from '../src/index'
import type { OptionsItem } from '../../types'
import type { TagSelectGroupOptionsItem } from '../src/props'

config.global.components = { ZTagSelect }

const options: OptionsItem[] = [{ label: 'Jack', value: 'Jack' }, { label: 'Rose', value: 'Rose' }, { label: 'Alice', value: 'Alice' }, { label: 'Steven', value: 'Steven' }]
const groupOptions: TagSelectGroupOptionsItem[] = [
  {
    title: '标签名：',
    field: 'aaa',
    children: [
      { label: '标签一', value: 1 },
      { label: '标签二', value: 2 },
    ],
  },
  {
    title: '城市名：',
    field: 'bbb',
    children: [
      { label: '标', value: 1 },
      { label: '苏州', value: 2 },
    ],
  },
]

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
      template: '<z-tag-select :title="renderTitle" v-model="tagSelect" :options="opts" />',
      setup() {
        const tagSelect = ref('Jack')
        const opts = ref([...options])
        const renderTitle = () => h('span', 'titleRender')
        return { opts, tagSelect, renderTitle }
      },
    })

    const list = getListLabel(wrapper)
    expect(list).toEqual(['Jack', 'Rose', 'Alice', 'Steven'])
    expect(getListLabel(wrapper, '.el-tag--dark')).toContain('Jack');
    (wrapper.vm.opts as OptionsItem[]).push({ label: 'Tom', value: 'Tom' })
    await nextTick()
    expect(getListLabel(wrapper)).toEqual(['Jack', 'Rose', 'Alice', 'Steven', 'Tom'])
    expect(wrapper.find('.z-tag-select__title').text()).toBe('titleRender')
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

  test('group', async () => {
    const wrapper = mount({
      template: '<z-tag-select title="title" v-model="tagSelect" :options="groupOptions" />',
      setup() {
        const tagSelect = ref({
          aaa: 1,
          bbb: 2,
        })
        return { tagSelect, groupOptions }
      },
    })
    const listLabel = getListLabel(wrapper)
    expect(listLabel).toEqual(['标签一', '标签二', '标', '苏州'])
    expect(getListLabel(wrapper, '.el-tag--dark')).toEqual(['标签一', '苏州'])
    const list = getList(wrapper)
    await list[1].trigger('click')
    expect(getListLabel(wrapper, '.el-tag--dark')).toEqual(['标签二', '苏州'])
  })

  test('multiple group', async () => {
    const wrapper = mount({
      template: '<z-tag-select title="title" v-model="tagSelect" :options="groupOptions" :multiple="true"/>',
      setup() {
        const tagSelect = ref({
          aaa: [1],
          bbb: [2],
        })
        return { tagSelect, groupOptions }
      },
    })
    const listLabel = getListLabel(wrapper)
    expect(listLabel).toEqual(['all', '标签一', '标签二', 'all', '标', '苏州'])
    expect(getListLabel(wrapper, '.el-tag--dark')).toEqual(['标签一', '苏州'])
    const list = getList(wrapper)
    await list[2].trigger('click')
    expect(getListLabel(wrapper, '.el-tag--dark')).toEqual(['all', '标签一', '标签二', '苏州'])
    await list[0].trigger('click')
    expect(getListLabel(wrapper, '.el-tag--dark')).toEqual(['苏州'])
  })

  test('alias', async () => {
    const wrapper = mount({
      template: '<z-tag-select :alias="alias" title="title" v-model="tagSelect" :options="options" :multiple="true"/>',
      setup() {
        const tagSelect = ref({
          aaa: {
            aaa: [1],
          },
          bbb: [2],
        })
        const alias = {
          label: 'title',
          value: 'data.key',
        }
        const options = ref([
          {
            title: '标签名：',
            field: 'aaa.aaa',
            children: [
              { title: '标签一', data: { key: 1 } },
              { title: '标签二', data: { key: 2 } },
            ],
          },
          {
            title: '城市名：',
            field: 'bbb',
            children: [
              { title: '标', data: { key: 1 } },
              { title: '苏州', data: { key: 2 } },
            ],
          },
        ])
        return { tagSelect, options, alias }
      },
    })
    const listLabel = getListLabel(wrapper)
    expect(listLabel).toEqual(['all', '标签一', '标签二', 'all', '标', '苏州'])
    expect(getListLabel(wrapper, '.el-tag--dark')).toEqual(['标签一', '苏州'])
    const list = getList(wrapper)
    await list[2].trigger('click')
    expect(getListLabel(wrapper, '.el-tag--dark')).toEqual(['all', '标签一', '标签二', '苏州'])
    expect((wrapper.vm.tagSelect as any).aaa.aaa).toEqual(['all', 1, 2])
    await list[0].trigger('click')
    expect(getListLabel(wrapper, '.el-tag--dark')).toEqual(['苏州'])
    expect((wrapper.vm.tagSelect as any).bbb).toEqual([2])
  })

  test('alias', async () => {
    const wrapper = mount({
      template: `<z-tag-select title="title" v-model="tagSelect" :options="options" :multiple="true">
        <template #titleSlot>
          <span>titleSlot</span>
        </template>
      </z-tag-select>`,
      setup() {
        const tagSelect = ref({
          aaa: [1],
          bbb: [2],
        })
        const options = ref([
          {
            title: 'titleSlot',
            field: 'aaa',
            children: [
              { label: '标签一', value: 1, round: true },
              { label: '标签二', value: 2, type: 'success' },
            ],
          },
          {
            title: '城市名：',
            field: 'bbb',
            children: [
              { label: '标', value: 1, round: true },
              { label: '苏州', value: 2, type: 'success' },
            ],
          },
        ])
        return { tagSelect, options }
      },
    })
    const listLabel = getListLabel(wrapper)
    expect(listLabel).toEqual(['all', '标签一', '标签二', 'all', '标', '苏州'])
    expect(getListLabel(wrapper, '.el-tag--dark')).toEqual(['标签一', '苏州'])
    const list = getList(wrapper)
    await list[2].trigger('click')
    expect(getListLabel(wrapper, '.el-tag--dark')).toEqual(['all', '标签一', '标签二', '苏州'])
    await list[0].trigger('click')
    expect(getListLabel(wrapper, '.el-tag--dark')).toEqual(['苏州'])
    expect(list[1].classes()).toContain('is-round')
    expect(list[2].classes()).toContain('el-tag--success')
    expect(wrapper.find('.z-tag-select__title').text()).toBe('titleSlot')
  })
})

afterAll(() => {
  config.global.components = {}
})
