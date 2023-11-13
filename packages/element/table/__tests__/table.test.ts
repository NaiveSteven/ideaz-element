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

  test('columns', async () => {
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

  test('data', async () => {
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

  test('pagination', async () => {
    const wrapper = mount({
      template: `
        <z-table
          v-model:pagination="pagination"
          :columns="cols"
          :toolBar="false"
        />
      `,
      setup() {
        const pagination = ref({
          page: 1,
          pageSize: 10,
          total: 50,
          layout: 'prev, pager, next, sizes',
        })
        return { pagination, cols: ref(columns) }
      },
    })
    await nextTick()
    await nextTick()

    const vm = wrapper.vm as unknown as {
      pagination: {
        total: number
        page: number
        pageSize: number
        layout: string
      }
    }

    expect(wrapper.find('.el-pagination')).not.toBeNull()

    await getPager(wrapper, ':nth-child(2)').trigger('click')
    expect(vm.pagination.page).toBe(2)

    await getPager(wrapper, ':nth-child(3)').trigger('click')
    expect(vm.pagination.page).toBe(3)

    await (vm.pagination.page = 1)
    await expect(getPager(wrapper, '.is-active').text()).toBe('1')

    await (vm.pagination.pageSize = 100)
    await wrapper
      .find('.el-pagination .el-pagination__sizes .select-trigger')
      .trigger('click')
    expect(getSizesItem('.selected')?.innerHTML).toMatch(/10/)

    await (vm.pagination.layout = 'sizes, prev, pager, next')
    expect(wrapper.find('.el-pagination .el-pagination__total').exists()).toBe(
      false,
    )
    expect(wrapper.find('.el-pagination .el-pagination__jump').exists()).toBe(
      false,
    )

    // await (vm.pagination.total = 0)
    // expect(wrapper.find('.el-pagination').exists()).toBe(false)
  })

  test('align', async () => {
    const wrapper = mount({
      template: '<z-table :columns="cols" :data="data" :toolBar="false" />',
      setup() {
        return {
          cols: columns.map((item) => {
            item.align = 'right'
            item.headerAlign = 'left'
            return item
          }),
          data: tableData,
        }
      },
    })
    await nextTick()
    await nextTick()
    const vm = wrapper.vm as unknown as { align: string }
    await (vm.align = 'right')
    expect(getHeaderClass(wrapper)).toContain('is-left')
    expect(getBodyClass(wrapper)).toContain('is-right')
  })

  test('index', async () => {
    const wrapper = mount({
      template: '<z-table :columns="cols" :index="index" :toolBar="false" :data="data"/>',
      setup() {
        const index = ref({ label: '#' })
        return { cols: columns.concat({ type: 'index' }).reverse(), index, data: tableData }
      },
    })
    await nextTick()
    await nextTick()
    const rows = wrapper.findAll('.el-table__row')
    rows.forEach((row, index) => {
      const cell = row.find('td')
      expect(cell.text()).toMatch(`${index + 1}`)
    })
  })

  test('expand', async () => {
    const wrapper = mount({
      template: `
        <z-table :data="data" :columns="cols" :toolBar="false">
          <template #expand="props">
            <span class="index">{{ props.$index }}</span>
          </template>
        </z-table>
      `,
      setup() {
        return { cols: columns.concat([{ type: 'expand' }]).reverse(), data: tableData }
      },
    })
    await nextTick()
    await nextTick()

    const rows = wrapper.findAll('.el-table__row')
    let index = 0
    for (const row of rows) {
      const expandCell = row.findAll('td')[0]
      const triggerIcon = expandCell.find('.el-table__expand-icon')
      triggerIcon.trigger('click')
      await nextTick()
      await nextTick()
      const cell = wrapper.find('.el-table__expanded-cell')
      expect(cell.text()).toMatch(`${index++}`)
      triggerIcon.trigger('click')
      await nextTick()
      await nextTick()
    }
  })

  test('selection', async () => {
    const wrapper = mount({
      template: '<z-table :columns="cols" :data="data" :toolBar="false"/>',
      setup() {
        return { cols: columns.concat({ type: 'selection' }), data: tableData }
      },
    })
    await nextTick()
    await nextTick()
    expect(getHeaderList(wrapper)).toHaveLength(4)
    expect(getHeaderList(wrapper)).toContain('')
    expect(getCheckBox(wrapper)).not.toBeNull()

    expect(wrapper.findAll('.el-checkbox').length).toBe(6)
  })
})

afterAll(() => {
  config.global.components = {}
})
