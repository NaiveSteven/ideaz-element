import type { VueWrapper } from '@vue/test-utils'
import { config, mount } from '@vue/test-utils'
import { afterAll, afterEach, describe, expect, test } from 'vitest'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import ZDescriptions from '../src/index'
import type { IDescriptionsColumns } from '../src/descriptions'

config.global.components = { ZDescriptions, ElDescriptionsItem, ElDescriptions }

const headerClass = '.z-descriptions .el-descriptions__header'
const itemClass
  = '.z-descriptions .el-descriptions__body .el-descriptions__table tbody tr td'
const getList = (wrapper: VueWrapper<ComponentPublicInstance>) =>
  wrapper.findAll(itemClass)
const getLabelList = (wrapper: VueWrapper<ComponentPublicInstance>) =>
  getList(wrapper).map(item => item.find('.el-descriptions__label').text())
const getPropList = (wrapper: VueWrapper<ComponentPublicInstance>) =>
  getList(wrapper).map(item => item.find('.el-descriptions__content').text())

describe('descriptions', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('empty', async () => {
    const wrapper = mount({
      template: '<z-descriptions />',
    })

    expect(wrapper.find('.z-descriptions').exists()).toBe(true)
  })

  test('columns', async () => {
    const wrapper = mount({
      template: '<z-descriptions :columns="columns" :detail="detail" />',
      setup() {
        const columns = ref([
          { label: 'Date', prop: 'date' },
          { label: 'Name', prop: 'name' },
        ])
        const detail = {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        }

        return { columns, detail }
      },
    })

    expect(getLabelList(wrapper)).toContain('Date')
    expect(getPropList(wrapper)).toContain('2016-05-03')
    expect(getLabelList(wrapper)).toContain('Name')
    expect(getPropList(wrapper)).toContain('Tom')
    expect(getLabelList(wrapper)).not.toContain('Address')
    expect(getPropList(wrapper)).not.toContain('No. 189, Grove St, Los Angeles')

    await (wrapper.vm.columns as IDescriptionsColumns).push({ label: 'Address', prop: 'address' })
    expect(getLabelList(wrapper)).toContain('Address')
    expect(getPropList(wrapper)).toContain('No. 189, Grove St, Los Angeles')

    await ((wrapper.vm.columns as IDescriptionsColumns)[0].label = 'Test')
    expect(getLabelList(wrapper)).not.toContain('Date')
    expect(getLabelList(wrapper)).toContain('Test')
  })

  test('detail', async () => {
    const wrapper = mount({
      template: '<z-descriptions :columns="columns" :detail="detail" />',
      setup() {
        const columns = [{ label: 'Date', prop: 'date' }]
        const detail = ref({})

        return { columns, detail }
      },
    })
    const vm = wrapper.vm as unknown as { detail: { date: string } }

    expect(getLabelList(wrapper)).toContain('Date')
    expect(getPropList(wrapper)).toContain('')

    await (vm.detail = { date: '2016-05-03' })
    expect(getPropList(wrapper)).not.toContain('')
    expect(getPropList(wrapper)).toContain('2016-05-03')
  })

  test('alias', async () => {
    const wrapper = mount({
      template: '<z-descriptions :columns="columns" :detail="detail" />',
      setup() {
        const columns = [
          { label: 'A', prop: 'a' },
          { label: 'B', prop: 'b.c' },
          { label: 'C', prop: 'b.d' },
          { label: 'D', prop: 'd[0].e' },
        ]
        const detail = {
          'a': 'a value',
          'b.c': 'break nested value',
          'b': {
            c: 'nested value c in b',
            d: 'nested value d in b',
          },
          'd': [{ e: 'nested value in array' }],
        }

        return { columns, detail }
      },
    })

    expect(getLabelList(wrapper)[0]).toBe('A')
    expect(getPropList(wrapper)[0]).toBe('a value')
    expect(getLabelList(wrapper)[1]).toBe('B')
    expect(getPropList(wrapper)[1]).toBe('break nested value')
    expect(getLabelList(wrapper)[2]).toBe('C')
    expect(getPropList(wrapper)[2]).toBe('nested value d in b')
    expect(getLabelList(wrapper)[3]).toBe('D')
    expect(getPropList(wrapper)[3]).toBe('nested value in array')
  })

  test('slot and render', async () => {
    const wrapper = mount({
      template: '<z-descriptions title="title" :columns="columns" :detail="detail"><template #detail-name="{item}">自定义{{item.name}}</template></z-descriptions>',
      setup() {
        const detail = {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        }
        const columns = ref([
          { label: 'Date', prop: 'date', render: (data: typeof detail) => h('span', `自定义${data.date}`) },
          { label: 'Name', prop: 'name' },
        ])

        return { columns, detail }
      },
    })

    expect(getLabelList(wrapper)).toContain('Name')
    expect(getPropList(wrapper)).toContain('自定义2016-05-03')
    expect(getLabelList(wrapper)).toContain('Date')
    expect(getPropList(wrapper)).toContain('自定义Tom')
    expect(wrapper.find(headerClass).text()).toBe('title')
  })

  test('title, extra and label', async () => {
    const wrapper = mount({
      template: `<z-descriptions :title="renderTitle" extra="extraSlot" :columns="columns" :detail="detail">
        <template #extraSlot>extra</template>
        <template #nameSlot>name</template>
      </z-descriptions>`,
      setup() {
        const detail = {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        }
        const columns = ref([
          { label: () => h('span', 'date'), prop: 'date', render: (data: typeof detail) => h('span', `自定义${data.date}`) },
          { label: 'nameSlot', prop: 'name' },
        ])
        const renderTitle = () => h('span', 'title')

        return { columns, detail, renderTitle }
      },
    })

    expect(getLabelList(wrapper)).toContain('name')
    expect(getPropList(wrapper)).toContain('自定义2016-05-03')
    expect(getLabelList(wrapper)).toContain('date')
    expect(getPropList(wrapper)).toContain('Tom')
    expect(wrapper.find('.el-descriptions__title').text()).toBe('title')
    expect(wrapper.find('.el-descriptions__extra').text()).toBe('extra')
  })
})

afterAll(() => {
  config.global.components = {}
})
