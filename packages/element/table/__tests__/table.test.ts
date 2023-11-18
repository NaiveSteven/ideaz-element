import type { VueWrapper } from '@vue/test-utils'
import { config, mount } from '@vue/test-utils'
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest'
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
    id: 1,
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

function getOptions(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>(
      '.el-select-dropdown__item',
    ),
  )
}

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

  test('hide', async () => {
    const wrapper = mount({
      template: '<z-table :columns="cols" :data="data" :toolBar="false"/>',
      setup() {
        const isHide = ref(true)
        const cols = ref([...columns].concat({ label: 'Age', prop: 'age', hide: () => isHide.value }))
        return { cols, isHide, data: tableData }
      },
    })
    const vm = wrapper.vm as unknown as { isHide: boolean }
    await nextTick()
    await nextTick()
    expect(getHeaderList(wrapper)).toContain('Date')
    expect(getHeaderList(wrapper)).toContain('Name')
    expect(getHeaderList(wrapper)).toContain('Address')
    expect(getHeaderList(wrapper)).not.toContain('Age')

    vm.isHide = false
    await nextTick()
    await nextTick()
    await nextTick()
    expect(getHeaderList(wrapper)).toContain('Age')
  })

  test('slot', async () => {
    const wrapper = mount({
      template: `<z-table :columns="cols" :data="data" :toolBar="false">
        <template #custom="{row}"><span class="my-custom">{{row.date}}</span></template>
        <template #top><span class="top">top</span></template>
        <template #topRight><span class="top-right">topRight</span></template>
        <template #topLeft><span class="top-left">topLeft</span></template>
        <template #topBottom><span class="top-bottom">topBottom</span></template>
      </z-table>`,
      setup() {
        const cols = ref([...columns].concat({ slot: 'custom' }))
        return { cols, data: tableData }
      },
    })
    await nextTick()
    await nextTick()
    expect(wrapper.findAll('.my-custom').map(item => item.text())).toContain('2016-05-03')
    expect(wrapper.find('.top').text()).toBe('top')
    expect(wrapper.find('.top-right').text()).toBe('topRight')
    expect(wrapper.find('.top-left').text()).toBe('topLeft')
    expect(wrapper.find('.top-bottom').text()).toBe('topBottom')
  })

  test('render', async () => {
    const wrapper = mount({
      template: '<z-table :columns="cols" :data="data" :toolBar="false" />',
      setup() {
        const cols = ref([...columns].concat({ render: (h: any, { row }: any) => h('span', { class: 'my-custom' }, row.date) }))
        return { cols, data: tableData }
      },
    })
    await nextTick()
    await nextTick()
    expect(wrapper.findAll('.my-custom').map(item => item.text())).toContain('2016-05-03')
  })

  test('header slot', async () => {
    const wrapper = mount({
      template: '<z-table :columns="cols" :data="data" :toolBar="false"><template #customSlot><span class="my-custom">customHeader</span></template></z-table>',
      setup() {
        const cols = ref([...columns].concat({ label: 'customSlot', prop: 'asdf' }).concat({ label: () => h('span', { class: 'my-title' }, 'customH'), prop: 'sf' }))
        return { cols, data: tableData }
      },
    })
    await nextTick()
    await nextTick()
    expect(wrapper.find('.my-custom').text()).toBe('customHeader')
    expect(wrapper.find('.my-title').text()).toBe('customH')
  })

  test('tooltip', async () => {
    const wrapper = mount({
      template: '<z-table :columns="cols" :data="data" :toolBar="false"></z-table>',
      setup() {
        const cols = ref([...columns].concat({ prop: 'asdf', tooltip: 'tooltipTest' }))
        return { cols, data: tableData }
      },
    })
    await nextTick()
    await nextTick()
    expect(wrapper.find('.z-table-column-label__icon').exists()).toBe(true)
  })

  // test('header render', async () => {
  //   const wrapper = mount({
  //     template: '<z-table :columns="cols" :data="data" :toolBar="false" />',
  //     setup() {
  //       const cols = ref([...columns].concat({ header: () => h('span', { class: 'my-custom' }, 'customHeader'), prop: 'asf' }))
  //       return { cols, data: tableData }
  //     },
  //   })
  //   await nextTick()
  //   await nextTick()
  //   expect(wrapper.find('.my-custom').text()).toBe('customHeader')
  // })

  test('buttons', async () => {
    const handleClick = vi.fn()
    const wrapper = mount({
      template: '<z-table :columns="cols" :data="data" :toolBar="false" />',
      setup() {
        const cols = ref(columns.concat({
          type: 'button',
          buttons: [{ label: 'add', link: true, class: 'add-button', onClick: handleClick }, { label: 'edit', link: true, class: 'edit-button' }],
        }))
        return { cols, data: tableData }
      },
    })
    await nextTick()
    await nextTick()
    expect(wrapper.find('.add-button').text()).toBe('add')
    expect(wrapper.find('.edit-button').text()).toBe('edit')
    await wrapper.find('.add-button').trigger('click')
    expect(handleClick).toBeCalled()
  })

  test('buttons dropdown', async () => {
    const wrapper = mount({
      template: '<z-table :columns="cols" :data="data" :toolBar="false" />',
      setup() {
        const cols = ref(columns.concat({
          type: 'button',
          buttons: [{ type: 'dropdown', class: 'my-dropdown', reference: 'delete', children: [{ label: 'add', class: 'my-custom', link: true }] }],
        }))
        return { cols, data: tableData }
      },
    })
    await nextTick()
    await nextTick()
    expect(wrapper.find('.my-dropdown').text()).toBe('delete')
    wrapper.find('.my-dropdown').trigger('click')
    await nextTick()
    await nextTick()
    const list = Array.from(document.querySelectorAll('.el-dropdown-menu__item'))
    list.forEach((item) => {
      expect(item.innerHTML).toContain('add')
    })
  })

  test('buttons hide', async () => {
    const wrapper = mount({
      template: '<z-table :columns="cols" :data="data" :toolBar="false" />',
      setup() {
        const isHide = ref(true)
        const cols = ref(columns.concat({
          type: 'button',
          buttons: [{ label: 'add', link: true, class: 'add-button', hide: () => isHide.value }, { label: 'edit', link: true, class: 'edit-button' }],
        }))
        return { cols, data: tableData, isHide }
      },
    })
    await nextTick()
    await nextTick()
    expect(wrapper.find('.add-button').exists()).toBe(false)
    expect(wrapper.find('.edit-button').exists()).toBe(true);

    (wrapper.vm as any).isHide = false
    await nextTick()
    await nextTick()
    await nextTick()
    expect(wrapper.find('.add-button').exists()).toBe(true)
    expect(wrapper.find('.edit-button').exists()).toBe(true)
  })

  test('buttons dropdown hide', async () => {
    const wrapper = mount({
      template: '<z-table :columns="cols" :data="data" :toolBar="false" />',
      setup() {
        const isHide = ref(true)
        const cols = ref(columns.concat({
          type: 'button',
          buttons: [{ type: 'dropdown', class: 'my-dropdown', children: [{ label: 'add', class: 'my-custom', link: true, hide: () => isHide.value }] }],
        }))
        return { cols, data: tableData, isHide }
      },
    })
    await nextTick()
    await nextTick()
    expect(wrapper.find('.my-dropdown').text()).toBe('more')
    wrapper.find('.my-dropdown').trigger('click')
    await nextTick()
    await nextTick()
    const list = Array.from(document.querySelectorAll('.my-custom'))
    expect(list.length).toBe(0);
    (wrapper.vm as any).isHide = false
    await nextTick()
    await nextTick()
    wrapper.find('.my-dropdown').trigger('click')
    await nextTick()
    await nextTick()
    const items = Array.from(document.querySelectorAll('.my-custom'))
    expect(items.length).toBe(5)
  })

  test('input type', async () => {
    const handleInput = vi.fn()
    const wrapper = mount({
      template: '<z-table :columns="cols" :data="data" :toolBar="false"/>',
      setup() {
        return {
          cols: [
            {
              type: 'input',
              label: 'Date',
              prop: 'date',
              attrs: {
                class: 'my-input',
                placeholder: 'asdf',
                onInput: handleInput,
              },
            },
            {
              label: 'Name',
              prop: 'name',
            },
            {
              label: 'Address',
              prop: 'address',
            }],
          data: [
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
          ],
        }
      },
    })
    await nextTick()
    await nextTick()
    const input = wrapper.findAll('input')[0]
    const nativeInput = input.element
    expect(nativeInput.value).toBe('2016-05-03')

    nativeInput.value = '1'
    await input.trigger('compositionupdate')
    await input.trigger('input')
    await input.trigger('compositionend')
    expect(handleInput).toBeCalledTimes(1)
  })

  test('select type', async () => {
    const handleChange = vi.fn()
    const wrapper = mount({
      template: '<z-table :columns="cols" :options="options" :data="data" :toolBar="false"/>',
      setup() {
        return {
          cols: [
            {
              label: 'Date',
              prop: 'date',
            },
            {
              type: 'select',
              label: 'Name',
              prop: 'name',
              attrs: {
                onChange: handleChange,
              },
            },
            {
              label: 'Address',
              prop: 'address',
            }],
          options: { name: [{ label: 'Tom', value: 'Tom' }, { label: 'Jack', value: 'Jack' }] },
          data: [
            {
              date: '2016-05-03',
              name: 'Tom',
              address: 'No. 189, Grove St, Los Angeles',
            },
            {
              date: '2016-05-02',
              name: 'Jack',
              address: 'No. 189, Grove St, Los Angeles',
            },
            {
              date: '2016-05-04',
              name: 'Helen',
              address: 'No. 189, Grove St, Los Angeles',
            },
            {
              date: '2016-05-01',
              name: 'Nancy',
              address: 'No. 189, Grove St, Los Angeles',
            },
          ],
        }
      },
    })
    const findInnerInput = () =>
      wrapper.find('.el-input__inner').element as HTMLInputElement
    await nextTick()
    await nextTick()
    await wrapper.findAll('.select-trigger')[0].trigger('click')
    await nextTick()
    await nextTick()
    const options = getOptions()
    expect(findInnerInput().value).toBe('Tom')
    options[1].click()
    await nextTick()
    expect(findInnerInput().value).toBe('Jack')
    expect(handleChange).toBeCalled()
  })

  test('multiple editable', async () => {
    const wrapper = mount({
      template: '<z-table :columns="cols" :data="data" :toolBar="false" :editable="editable"/>',
      setup() {
        return {
          editable: { type: 'multiple' },
          cols: [
            {
              type: 'input',
              label: 'name',
              prop: 'name',
            }],
          data: ref([
            {
              date: '2016-05-03',
              name: 'Tom',
              address: 'No. 189, Grove St, Los Angeles',
            },
          ]),
        }
      },
    })
    await nextTick()
    await nextTick()

    expect(wrapper.findAll('.el-input').length).toBe(1)
    expect(wrapper.find('input').element.value).toBe('Tom')
  })

  test('multiple single', async () => {
    const wrapper = mount({
      template: '<z-table :columns="cols" :data="data" :toolBar="false" :editable="true"/>',
      setup() {
        return {
          cols: [
            {
              type: 'input',
              label: 'name',
              prop: 'name',
            }],
          data: ref([
            {
              date: '2016-05-03',
              name: 'Tom',
              address: 'No. 189, Grove St, Los Angeles',
            },
          ]),
        }
      },
    })
    await nextTick()
    await nextTick()

    expect(wrapper.findAll('.el-input').length).toBe(0)
    expect(wrapper.find('.el-button').text()).toBe('edit')
    wrapper.find('.el-button').trigger('click')
    await nextTick()
    await nextTick()
    expect(wrapper.findAll('.el-input').length).toBe(1)
  })

  // test('radio type', async () => {
  //   let rowData: any = {}
  //   const handleChange = vi.fn()
  //   const wrapper = mount({
  //     template: '<z-table ref="zTable" :columns="cols" :data="data" :toolBar="false" @radio-change="handleChange"/>',
  //     setup() {
  //       const zTable = ref()
  //       const handleRadioChange = (data: any) => {
  //         rowData = data
  //       }
  //       return {
  //         cols: ref([...columns].concat({ type: 'radio' }).reverse()),
  //         data: tableData,
  //         zTable,
  //         handleRadioChange,
  //         handleChange,
  //       }
  //     },
  //   })

  //   await nextTick()
  //   await nextTick()
  //   expect(rowData).toStrictEqual({ })
  //   wrapper.findAll('.my-radio')[1].trigger('click')
  //   // expect(wrapper.findAll('.is-checked').length).toBe(1)
  //   await nextTick()
  //   await nextTick()
  //   expect(wrapper.findAll('.my-radio')[1].classes()).toContain('a')
  //   expect(handleChange).toBeCalled()
  //   expect(rowData).toStrictEqual({ a: 1 })
  // })
})

afterAll(() => {
  config.global.components = {}
})
