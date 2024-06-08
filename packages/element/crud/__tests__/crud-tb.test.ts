import type { VueWrapper } from '@vue/test-utils'
import { config, mount } from '@vue/test-utils'
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest'
import * as ElComponents from 'element-plus'
import { ElLoadingDirective } from 'element-plus'
import * as ZComponents from '../../index'
import type { TableCol } from '../../types'

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
function getHeader(wrapper: VueWrapper<ComponentPublicInstance>) {
  return wrapper.findAll(`${headerClass} th`)
}
function getHeaderList(wrapper: VueWrapper<ComponentPublicInstance>) {
  return getHeader(wrapper).map(item => item.find('.cell').text())
}
function getHeaderClass(wrapper: VueWrapper<ComponentPublicInstance>, index = 0) {
  return getHeader(wrapper)[index].classes()
}
const bodyClass = '.el-table__row'
function getBody(wrapper: VueWrapper<ComponentPublicInstance>) {
  return wrapper.findAll(bodyClass)
}
function getBodyItem(wrapper: VueWrapper<ComponentPublicInstance>, index = 1) {
  return wrapper
    .findAll(`${bodyClass}:nth-child(${index}) td`)
    .map(item => item.find('.cell').text())
}
function getBodyClass(wrapper: VueWrapper<ComponentPublicInstance>) {
  return wrapper.find(`${bodyClass} td`).classes()
}
function getCheckBox(wrapper: VueWrapper<ComponentPublicInstance>) {
  return wrapper.find(`${headerClass} th .cell .el-checkbox`)
}
function getPager(wrapper: VueWrapper<ComponentPublicInstance>, classes = '') {
  return wrapper.find(`.z-table .el-pagination .el-pager .number${classes}`)
}
// function getSizesItem(classes = '') {
//   return document.querySelector(
//     `.el-select__popper .el-select-dropdown__item${classes}`,
//   )
// }
// const appendClass
//   = '.z-table .el-table__body-wrapper .el-table__append-wrapper .append'

describe('crud-table', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('columns', async () => {
    const wrapper = mount({
      template: '<z-crud :columns="cols" :toolBar="false" :action="false" />',
      setup() {
        const cols = ref(columns.map(item => ({ ...item })))
        return { cols }
      },
    })

    await nextTick()
    await nextTick()
    const vm = wrapper.vm as unknown as { cols: TableCol }

    expect(getHeaderList(wrapper)).toContain('Date')
    expect(getHeaderList(wrapper)).toContain('Name')
    expect(getHeaderList(wrapper)).toContain('Address')
    expect(getHeaderList(wrapper)).toHaveLength(3)

    await vm.cols.push({ label: 'Vue', prop: 'vue' })
    await nextTick()
    await nextTick()
    expect(getHeaderList(wrapper)).toHaveLength(4)
    expect(getHeaderList(wrapper)).toContain('Vue')

    await vm.cols.splice(1, 1)
    await nextTick()
    await nextTick()
    expect(getHeaderList(wrapper)).toHaveLength(3)
    expect(getHeaderList(wrapper)).not.toContain('Name')

    await (vm.cols[0].label = '-Date')
    await nextTick()
    await nextTick()
    expect(getHeaderList(wrapper)).toHaveLength(3)
    expect(getHeaderList(wrapper)).not.toContain('Date')
    expect(getHeaderList(wrapper)).toContain('-Date')
  })

  it('data', async () => {
    const wrapper = mount({
      template: '<z-crud :columns="columns" :data="data" :toolBar="false" :action="false" />',
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

  it('pagination', async () => {
    const wrapper = mount({
      template: `
        <z-crud
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

    // await (vm.pagination.pageSize = 100)
    // await wrapper
    //   .find('.el-pagination .el-pagination__sizes .select-trigger')
    //   .trigger('click')
    // expect(getSizesItem('.selected')?.innerHTML).toMatch(/10/)

    await (vm.pagination.layout = 'sizes, prev, pager, next')
    expect(wrapper.find('.el-pagination .el-pagination__total').exists()).toBe(
      false,
    )
    expect(wrapper.find('.el-pagination .el-pagination__jump').exists()).toBe(
      false,
    )
  })

  it('align', async () => {
    const wrapper = mount({
      template: '<z-crud :columns="cols" :data="data" :toolBar="false" :action="false" />',
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

  it('index', async () => {
    const wrapper = mount({
      template: '<z-crud :columns="cols" :index="index" :toolBar="false" :data="data" :action="false" />',
      setup() {
        const index = ref({ label: '#' })
        return { cols: columns.concat({ type: 'index' }).reverse(), index, data: tableData }
      },
    })
    await nextTick()
    await nextTick()
    const rows = wrapper.findAll('.el-table__row')
    expect(rows.length).not.toBe(0)
    rows.forEach((row, index) => {
      const cell = row.find('td')
      expect(cell.text()).toMatch(`${index + 1}`)
    })
  })

  it('expand', async () => {
    const wrapper = mount({
      template: `
        <z-crud :data="data" :columns="cols" :toolBar="false" :action="false">
          <template #expand="props">
            <span class="index">{{ props.$index }}</span>
          </template>
        </z-crud>
      `,
      setup() {
        return { cols: columns.concat([{ type: 'expand' }]).reverse(), data: tableData }
      },
    })
    await nextTick()
    await nextTick()

    const rows = wrapper.findAll('.el-table__row')
    expect(rows.length).not.toBe(0)
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

  it('selection', async () => {
    const wrapper = mount({
      template: '<z-crud :columns="cols" :data="data" :toolBar="false" :action="false" />',
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

  it('hide', async () => {
    const wrapper = mount({
      template: '<z-crud :columns="cols" :pagination="{ page: 1, pageSize: 10 }" :data="data" :toolBar="false" :action="false" />',
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

  it('slot', async () => {
    const wrapper = mount({
      template: `<z-crud :columns="cols" :pagination="{ page: 1, pageSize: 10 }" :data="data" :toolBar="false">
        <template #custom="{row}"><span class="my-custom">{{row.date}}</span></template>
        <template #formTop><span class="formTop">formTop</span></template>
        <template #formBottom><span class="formBottom">formBottom</span></template>
        <template #tableTop><span class="tableTop">tableTop</span></template>
        <template #tableTitle><span class="tableTitle">tableTitle</span></template>
        <template #crudMiddle><span class="crudMiddle">crudMiddle</span></template>
        <template #paginationTop><span class="paginationTop">paginationTop</span></template>
        <template #paginationBottom><span class="paginationBottom">paginationBottom</span></template>
        <template #paginationLeft><span class="paginationLeft">paginationLeft</span></template>
        <template #paginationRight><span class="paginationRight">paginationRight</span></template>
      </z-crud>`,
      setup() {
        const cols = ref([...columns].concat({ slot: 'custom' }).concat({ search: { component: 'input', field: 'name' } }))
        return { cols, data: tableData }
      },
    })
    await nextTick()
    await nextTick()
    expect(wrapper.findAll('.my-custom').map(item => item.text())).toContain('2016-05-03')
    expect(wrapper.find('.formBottom').text()).toBe('formBottom')
    expect(wrapper.find('.tableTop').text()).toBe('tableTop')
    // expect(wrapper.find('.tableBottom').text()).toBe('tableBottom')
    // expect(wrapper.find('.toolBarRight').text()).toBe('toolBarRight')
    // expect(wrapper.find('.toolBarLeft').text()).toBe('toolBarLeft')
    expect(wrapper.find('.tableTitle').text()).toBe('tableTitle')
    expect(wrapper.find('.crudMiddle').text()).toBe('crudMiddle')
    expect(wrapper.find('.paginationTop').text()).toBe('paginationTop')
    expect(wrapper.find('.paginationBottom').text()).toBe('paginationBottom')
    expect(wrapper.find('.paginationLeft').text()).toBe('paginationLeft')
    expect(wrapper.find('.paginationRight').text()).toBe('paginationRight')
  })

  it('render', async () => {
    const wrapper = mount({
      template: '<z-crud :columns="cols" :data="data" :toolBar="false" />',
      setup() {
        const cols = ref([...columns].concat({ render: ({ row }: any) => h('span', { class: 'my-custom' }, row.date) }))
        return { cols, data: tableData }
      },
    })
    await nextTick()
    await nextTick()
    expect(wrapper.findAll('.my-custom').map(item => item.text())).toContain('2016-05-03')
  })

  it('header slot', async () => {
    const wrapper = mount({
      template: '<z-crud :columns="cols" :data="data" :toolBar="false"><template #customSlot><span class="my-custom">customHeader</span></template></z-crud>',
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

  it('tooltip', async () => {
    const wrapper = mount({
      template: '<z-crud :columns="cols" :data="data" :toolBar="false"></z-crud>',
      setup() {
        const cols = ref([...columns].concat({ prop: 'asdf', tooltip: 'tooltipTest' }))
        return { cols, data: tableData }
      },
    })
    await nextTick()
    await nextTick()
    expect(wrapper.find('.z-table-column-label__icon').exists()).toBe(true)
  })

  it('buttons', async () => {
    const handleClick = vi.fn()
    const wrapper = mount({
      template: '<z-crud :columns="cols" :data="data" :toolBar="false" />',
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

  it('buttons dropdown', async () => {
    const wrapper = mount({
      template: '<z-crud :columns="cols" :data="data" :toolBar="false" />',
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

  it('buttons hide', async () => {
    const wrapper = mount({
      template: '<z-crud :columns="cols" :data="data" :toolBar="false" />',
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

  it('buttons dropdown hide', async () => {
    const wrapper = mount({
      template: '<z-crud :columns="cols" :data="data" :toolBar="false" />',
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

  it('input type', async () => {
    const handleInput = vi.fn()
    const wrapper = mount({
      template: '<z-crud :columns="cols" :data="data" :toolBar="false"/>',
      setup() {
        return {
          cols: [
            {
              component: 'input',
              label: 'Date',
              prop: 'date',
              fieldProps: {
                class: 'my-input',
                placeholder: 'asdf',
              },
              onInput: handleInput,
            },
            {
              label: 'Name',
              prop: 'name',
            },
            {
              label: 'Address',
              prop: 'address',
            },
          ],
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

  it('select type', async () => {
    const handleChange = vi.fn()
    const wrapper = mount({
      template: '<z-crud :columns="cols" :options="options" v-model:data="data" :toolBar="false"/>',
      setup() {
        return {
          cols: [
            {
              label: 'Date',
              prop: 'date',
            },
            {
              component: 'select',
              label: 'Name',
              prop: 'name',
              onChange: handleChange,
            },
            {
              label: 'Address',
              prop: 'address',
            },
          ],
          options: { name: [{ label: 'Tom', value: 'Tom' }, { label: 'Jack', value: 'Jack' }] },
          data: ref([
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
          ]),
        }
      },
    })
    function getInputValue(wrapper: VueWrapper<ComponentPublicInstance>, index: number) {
      return (wrapper.findAll('.el-select__placeholder').at(index) as any).text()
    }
    await nextTick()
    await nextTick()
    await wrapper.findAll('.el-select__wrapper')[0].trigger('click')
    await nextTick()
    await nextTick()
    const options = getOptions()
    expect(getInputValue(wrapper, 0)).toBe('Tom')
    options[1].click()
    await nextTick()
    expect(getInputValue(wrapper, 0)).toBe('Jack')
    expect(handleChange).toBeCalled()
  })

  // it('multiple editable', async () => {
  //   const wrapper = mount({
  //     template: '<z-crud :columns="cols" :data="data" :toolBar="false" :editable="editable"/>',
  //     setup() {
  //       return {
  //         editable: { type: 'multiple' },
  //         cols: [
  //           {
  //             component: 'input',
  //             label: 'name',
  //             prop: 'name',
  //           },
  //         ],
  //         data: ref([
  //           {
  //             date: '2016-05-03',
  //             name: 'Tom',
  //             address: 'No. 189, Grove St, Los Angeles',
  //           },
  //         ]),
  //       }
  //     },
  //   })
  //   await nextTick()
  //   await nextTick()

  //   expect(wrapper.findAll('.el-input').length).toBe(1)
  //   expect(wrapper.find('input').element.value).toBe('Tom')
  // })

  it('single editable', async () => {
    const wrapper = mount({
      template: '<z-crud :columns="cols" :data="data" :toolBar="false" :editable="true" :action="false"/>',
      setup() {
        return {
          cols: [
            {
              component: 'input',
              label: 'name',
              prop: 'name',
            },
          ],
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
})

afterAll(() => {
  config.global.components = {}
})
