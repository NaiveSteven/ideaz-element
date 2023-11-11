import type { VueWrapper } from '@vue/test-utils'
import { config, mount } from '@vue/test-utils'
import { afterAll, afterEach, describe, expect, test } from 'vitest'
import * as ElComponents from 'element-plus'
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

const columns: TableCol[] = [
  {
    label: 'Date',
    prop: 'date',
  },
  {
    label: 'Name',
    prop: 'name',
  },
  {
    label: 'Address',
    prop: 'address',
  },
]

export const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const headerClass
  = '.z-table .el-table__header-wrapper .el-table__header thead tr'
const getHeader = (wrapper: VueWrapper<ComponentPublicInstance>) =>
  wrapper.findAll(`${headerClass} th`)
const getMultiHeader = (wrapper: VueWrapper<ComponentPublicInstance>) =>
  wrapper.findAll(headerClass)
const getHeaderList = (wrapper: VueWrapper<ComponentPublicInstance>) =>
  getHeader(wrapper).map(item => item.find('.cell').text())
const getHeaderClass = (
  wrapper: VueWrapper<ComponentPublicInstance>,
  index = 0,
) => getHeader(wrapper)[index].classes()
const bodyClass = '.el-table__row'
const getBody = (wrapper: VueWrapper<ComponentPublicInstance>) =>
  wrapper.findAll(bodyClass)
const getBodyItem = (wrapper: VueWrapper<ComponentPublicInstance>, index = 1) =>
  wrapper
    .findAll(`${bodyClass}:nth-child(${index}) td`)
    .map(item => item.find('.cell').text())
const getBodyClass = (wrapper: VueWrapper<ComponentPublicInstance>) =>
  wrapper.find(`${bodyClass} td`).classes()
const getCheckBox = (wrapper: VueWrapper<ComponentPublicInstance>) =>
  wrapper.find(`${headerClass} th .cell .el-checkbox`)
const getPager = (wrapper: VueWrapper<ComponentPublicInstance>, classes = '') =>
  wrapper.find(`.z-table .el-pagination .el-pager .number${classes}`)
const getSizesItem = (classes = '') =>
  document.querySelector(
    `.el-select__popper .el-select-dropdown__item${classes}`,
  )
const appendClass
  = '.z-table .el-table__body-wrapper .el-table__append-wrapper .append'

describe('table', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test.concurrent('columns', async () => {
    const wrapper = mount({
      template: '<z-table :columns="cols" :toolBar="false"/>',
      setup() {
        const cols = ref([...columns])
        return { cols }
      },
    })

    await nextTick()
    await nextTick()
    const vm = wrapper.vm as unknown as { columns: TableCol }

    expect(getHeaderList(wrapper)).toContain('Date')
    expect(getHeaderList(wrapper)).toContain('Name')
    expect(getHeaderList(wrapper)).toContain('Address')

    // await vm.columns.push({ label: 'Vue', prop: 'vue' })
    // expect(getHeaderList(wrapper)).toHaveLength(4)
    // expect(getHeaderList(wrapper)).toContain('Vue')

    // await vm.columns.splice(1, 1)
    // expect(getHeaderList(wrapper)).toHaveLength(3)
    // expect(getHeaderList(wrapper)).not.toContain('Name')

    // await (vm.columns[0].label = '-Date')
    // expect(getHeaderList(wrapper)).toHaveLength(3)
    // expect(getHeaderList(wrapper)).not.toContain('Date')
    // expect(getHeaderList(wrapper)).toContain('-Date')
  })

  test.concurrent('data', async () => {
    const wrapper = mount({
      template: '<z-table :columns="columns" :data="data" :toolBar="false"/>',
      setup() {
        return { columns, data: ref(tableData) }
      },
    })
    await nextTick()
    await nextTick()
    const vm = wrapper.vm as unknown as { data: any }

    expect(getBody(wrapper)).toHaveLength(4)

    await vm.data.push({ date: '0000', name: 'vue', address: '--' })
    expect(getBody(wrapper)).toHaveLength(5)
    expect(getBodyItem(wrapper, 5)).toContain('0000')
  })
})

afterAll(() => {
  config.global.components = {}
})
