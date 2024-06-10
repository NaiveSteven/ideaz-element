import { config, mount } from '@vue/test-utils'
import { afterAll, afterEach, describe, expect, it } from 'vitest'
import * as ElComponents from 'element-plus'
import { ElLoadingDirective } from 'element-plus'
import type { VueWrapper } from '@vue/test-utils'
import * as ZComponents from '../../index'

config.global.components = {
  ...ElComponents,
  ...ZComponents,
} as any

config.global.directives = {
  loading: ElLoadingDirective,
}

const columns = [
  {
    label: 'a',
    prop: 'a',
    search: {
      component: 'input',
      field: 'name',
      label: 'name',
    },
    add: {
      component: 'input',
      field: 'name',
      label: 'name',
    },
    edit: {
      component: 'input',
      field: 'name',
      label: 'name',
    },
    detail: {
      label: 'name',
      prop: 'name',
    },
  },
  {
    label: 'b',
    prop: 'b',
    search: {
      component: 'select',
      field: 'sex',
      label: 'sex',
    },
    add: {
      component: 'select',
      field: 'sex',
      label: 'sex',
    },
    edit: {
      component: 'select',
      field: 'sex',
      label: 'sex',
    },
    detail: {
      label: 'sex',
      prop: 'sex',
    },
  },
  {
    label: 'date',
    prop: 'date',
  },
]
export const tableData = [
  {
    id: 1,
    date: '2016-05-03',
    sex: 'male',
    name: 'Tom',
    age: 22,
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-02',
    name: 'Tom',
    sex: 'male',
    age: 15,
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    sex: 'female',
    age: 12,
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    sex: 'female',
    age: 23,
    address: 'No. 189, Grove St, Los Angeles',
  },
]
function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
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
// function getBodyClass(wrapper: VueWrapper<ComponentPublicInstance>) {
//   return wrapper.find(`${bodyClass} td`).classes()
// }
const options = { sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }] }
// function getOptions(): HTMLElement[] {
//   return Array.from(
//     document.querySelectorAll<HTMLElement>(
//       '.el-select-dropdown__item',
//     ),
//   )
// }

describe('crud-request', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('searchApi', async () => {
    const wrapper = mount({
      template: `<z-crud v-model:formData="value" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
      :columns="cols" :options="options" :toolBar="false" :action="false"/>`,
      setup() {
        const value = ref({ name: '', sex: '' })
        const cols = ref([...columns])
        const data = ref([])
        const pagination = ref({
          page: 1,
          pageSize: 2,
          total: 4,
        })
        const mockApi = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  page: 1,
                  pageSize: 10,
                  total: 4,
                  list: tableData.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
                },
              })
            }, 10)
          })
        }
        const request = ref({
          searchApi: mockApi,
        })
        return { value, cols, options, request, pagination, data }
      },
    })

    await delay(20)
    const vm = wrapper.vm as unknown as { data: any }

    expect(getBody(wrapper)).toHaveLength(2)

    await vm.data.push({ date: '0000', name: 'vue', address: '--' })
    expect(getBody(wrapper)).toHaveLength(3)
    expect(getBodyItem(wrapper, 3)).toContain('0000')
  })

  it('searchParams', async () => {
    let params: any = {}
    const wrapper = mount({
      template: `<z-crud v-model:formData="value" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
      :columns="cols" :options="options" :toolBar="false" :action="false"/>`,
      setup() {
        const value = ref({ name: '', sex: '' })
        const cols = ref([...columns])
        const data = ref([])
        const pagination = ref({
          page: 1,
          pageSize: 2,
          total: 4,
        })
        const mockApi = (payload: any) => {
          params = payload
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  page: 1,
                  pageSize: 10,
                  total: 4,
                  list: tableData.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
                },
              })
            }, 10)
          })
        }
        const request = ref({
          searchApi: async () => {
            return await mockApi({
              ...params,
              test: true,
            })
          },
        })
        return { value, cols, options, request, pagination, data }
      },
    })

    await delay(20)
    expect(getBody(wrapper)).toHaveLength(2)
    expect(params.test).toBe(true)
  })

  it('searchFunc', async () => {
    let payload: any = {}
    const wrapper = mount({
      template: `<z-crud v-model:formData="value" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
      :columns="cols" :options="options" :toolBar="false" :action="false"/>`,
      setup() {
        const value = ref({ name: '', sex: '' })
        const cols = ref([...columns])
        const data = ref([])
        const pagination = ref({
          page: 1,
          pageSize: 2,
          total: 4,
        })
        const mockApi = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  page: 1,
                  pageSize: 10,
                  total: 4,
                  list: tableData.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
                },
              })
            }, 10)
          })
        }
        const request = ref({
          searchApi: mockApi,
          searchFunc: async ({ params }: any) => {
            try {
              payload = params
              const res = await mockApi() as any
              data.value = res.data.list
            }
            catch (error) {

            }
          },
        })
        return { value, cols, options, request, pagination, data }
      },
    })
    await delay(20)
    expect(getBody(wrapper)).toHaveLength(2)
    expect(payload).toEqual({ page: 1, pageSize: 2, name: '', sex: '' })
  })

  it('alias', async () => {
    const wrapper = mount({
      template: `<z-crud v-model:formData="value" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
      :columns="cols" :options="options" :toolBar="false" :action="false"/>`,
      setup() {
        const value = ref({ name: '', sex: '' })
        const cols = ref([...columns])
        const data = ref([])
        const pagination = ref({
          page: 1,
          pageSize: 2,
          total: 4,
        })
        const mockApi = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                result: {
                  page: 1,
                  pageSize: 10,
                  num: 4,
                  data: tableData.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
                },
              })
            }, 10)
          })
        }
        const request = ref({
          searchApi: mockApi,
          alias: {
            list: 'result.data',
            total: 'result.num',
          },
        })
        return { value, cols, options, request, pagination, data }
      },
    })
    await delay(20)
    expect(getBody(wrapper)).toHaveLength(2)
  })

  it('tableData', async () => {
    const wrapper = mount({
      template: `<z-crud v-model:formData="value" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
      :columns="cols" :options="options" :toolBar="false" :action="false"/>`,
      setup() {
        const value = ref({ name: '', sex: '' })
        const cols = ref([...columns])
        const data = ref([])
        const pagination = ref({
          page: 1,
          pageSize: 2,
          total: 4,
        })
        const mockApi = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  page: 1,
                  pageSize: 10,
                  total: 4,
                  list: tableData.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
                },
              })
            }, 10)
          })
        }
        const request = ref({
          searchApi: mockApi,
          tableData: (list: any) => {
            return list.map((item: any, index: number) => {
              if (index === 0) {
                return {
                  ...item,
                  date: '000',
                }
              }
              return item
            })
          },
        })
        return { value, cols, options, request, pagination, data }
      },
    })

    await delay(20)
    expect(getBody(wrapper)).toHaveLength(2)
    expect(getBodyItem(wrapper, 1)).toContain('000')
  })

  it('addApi and addParams', async () => {
    let params: any = {}
    const wrapper = mount({
      template: `<z-crud v-model:formData="value" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
      :columns="cols" :options="options" :toolBar="false" :edit="false" :detail="false" :delete="false"/>`,
      setup() {
        const value = ref({ name: '', sex: '' })
        const cols = ref([...columns])
        const data = ref([])
        const pagination = ref({
          page: 1,
          pageSize: 2,
          total: 4,
        })
        const mockApi = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  page: 1,
                  pageSize: 10,
                  total: 4,
                  list: tableData.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
                },
              })
            }, 10)
          })
        }
        const commonApi = (payload: any) => {
          params = payload
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  code: 200,
                  message: 'success',
                },
              })
            }, 10)
          })
        }
        const request = ref({
          searchApi: mockApi,
          addApi: async () => {
            return await commonApi({
              name: 'sdf',
            })
          },
        })
        return { value, cols, options, request, pagination, data }
      },
    })

    await delay(20)
    expect(getBody(wrapper)).toHaveLength(2)
    const addButton = wrapper.findAll('.el-button').at(2)
    expect(addButton?.text()).toBe('add')
    await addButton?.trigger('click')
    await nextTick()
    const confirmButton = wrapper.findAll('.el-button')?.at(4)
    expect(confirmButton?.text()).toBe('confirm')
    await confirmButton?.trigger('click')
    await nextTick()
    expect(params).toEqual({ name: 'sdf' })
  })

  it('deleteApi and deleteParams', async () => {
    // let params: any = {}
    const wrapper = mount({
      template: `<z-crud v-model:formData="value" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
      :columns="cols" :options="options" :toolBar="false" :edit="false" :detail="false" :add="false"/>`,
      setup() {
        const value = ref({ name: '', sex: '' })
        const cols = ref([...columns])
        const data = ref([])
        const pagination = ref({
          page: 1,
          pageSize: 2,
          total: 4,
        })
        const mockApi = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  page: 1,
                  pageSize: 10,
                  total: 4,
                  list: tableData.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
                },
              })
            }, 10)
          })
        }
        const commonApi = (payload: any) => {
          params = payload
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  code: 200,
                  message: 'success',
                },
              })
            }, 10)
          })
        }
        const request = ref({
          searchApi: mockApi,
          deleteApi: commonApi,
          deleteParams: (row: any) => {
            return {
              name: 'sdf',
              id: row.id,
            }
          },
        })
        return { value, cols, options, request, pagination, data }
      },
    })

    await delay(20)
    expect(getBody(wrapper)).toHaveLength(2)
    await nextTick()
    expect(wrapper.findAll('.el-button').length).toBe(4)
    const deleteButton = wrapper.findAll('.el-button')?.at(3)
    expect(deleteButton?.text()).toBe('delete')
    await deleteButton?.trigger('click')
    await nextTick()
    const confirmButton = Array.from(document.querySelectorAll<HTMLElement>('.el-dialog .el-button'))[1]
    expect(confirmButton?.innerHTML).includes('confirm')
    // confirmButton.click()
    // await nextTick()
    // await nextTick()
    // expect(params).toEqual({ id: 2, name: 'sdf' })
  })

  it('editApi and editParams', async () => {
    let obj: any = {}
    const wrapper = mount({
      template: `<z-crud v-model:formData="value" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
      :columns="cols" :options="options" :toolBar="false" :add="false" :detail="false" :delete="false" />`,
      setup() {
        const value = ref({ name: '', sex: '' })
        const cols = ref([...columns])
        const data = ref([])
        const pagination = ref({
          page: 1,
          pageSize: 2,
          total: 4,
        })
        const mockApi = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  page: 1,
                  pageSize: 10,
                  total: 4,
                  list: tableData.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
                },
              })
            }, 10)
          })
        }
        const commonApi = (payload: any) => {
          obj = payload
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  code: 200,
                  message: 'success',
                },
              })
            }, 10)
          })
        }
        const request = ref({
          searchApi: mockApi,
          editApi: async ({ formData, row }: any) => {
            return await commonApi({
              ...row,
              ...formData,
              test: true,
            })
          },
        })
        return { value, cols, options, request, pagination, data }
      },
    })

    await delay(20)
    expect(getBody(wrapper)).toHaveLength(2)
    const addButton = wrapper.findAll('.el-button').at(2)
    expect(addButton?.text()).toBe('edit')
    await addButton?.trigger('click')
    const confirmButton = wrapper.findAll('.el-button')?.at(5)
    expect(confirmButton?.text()).toBe('confirm')
    await confirmButton?.trigger('click')
    expect(obj).toEqual({
      address: 'No. 189, Grove St, Los Angeles',
      age: 22,
      date: '2016-05-03',
      id: 1,
      name: 'Tom',
      sex: 'male',
      test: true,
    })
  })

  it('detailApi and detailParams', async () => {
    let payload: any = {}
    const wrapper = mount({
      template: `<z-crud v-model:formData="value" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
      :columns="cols" :options="options" :toolBar="false" :add="false" :edit="false" :delete="false" />`,
      setup() {
        const value = ref({ name: '', sex: '' })
        const cols = ref([...columns])
        const data = ref([])
        const pagination = ref({
          page: 1,
          pageSize: 2,
          total: 4,
        })
        const mockApi = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  page: 1,
                  pageSize: 10,
                  total: 4,
                  list: tableData.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
                },
              })
            }, 10)
          })
        }
        const commonApi = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  name: 'name',
                  age: 'name',
                  sex: 'male',
                },
              })
            }, 10)
          })
        }
        const request = ref({
          searchApi: mockApi,
          detailApi: async ({ row }: any) => {
            payload = {
              ...row,
              test: true,
            }
            return await commonApi()
          },
        })
        return { value, cols, options, request, pagination, data }
      },
    })

    await delay(20)
    expect(getBody(wrapper)).toHaveLength(2)
    const addButton = wrapper.findAll('.el-button').at(2)
    expect(addButton?.text()).toBe('view')
    await addButton?.trigger('click')
    await delay(20)
    expect(wrapper.findAll('.el-descriptions__content').map(item => item.text())).toStrictEqual(['name', 'male'])
    expect(payload).toEqual({
      address: 'No. 189, Grove St, Los Angeles',
      age: 22,
      date: '2016-05-03',
      id: 1,
      name: 'Tom',
      sex: 'male',
      test: true,
    })
  })

  it('detailData', async () => {
    const wrapper = mount({
      template: `<z-crud v-model:formData="value" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
      :columns="cols" :options="options" :toolBar="false" :add="false" :edit="false" :delete="false" />`,
      setup() {
        const value = ref({ name: '', sex: '' })
        const cols = ref([...columns])
        const data = ref([])
        const pagination = ref({
          page: 1,
          pageSize: 2,
          total: 4,
        })
        const mockApi = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: {
                  page: 1,
                  pageSize: 10,
                  total: 4,
                  list: tableData.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
                },
              })
            }, 10)
          })
        }
        const request = ref({
          searchApi: mockApi,
        })
        return { value, cols, options, request, pagination, data }
      },
    })

    await delay(20)
    expect(getBody(wrapper)).toHaveLength(2)
    const addButton = wrapper.findAll('.el-button').at(2)
    expect(addButton?.text()).toBe('view')
    await addButton?.trigger('click')
    await nextTick()
    expect(wrapper.findAll('.el-descriptions__content').map(item => item.text())).toStrictEqual(['Tom', 'male'])
  })
})

afterAll(() => {
  config.global.components = {}
})
