import { config, mount } from '@vue/test-utils'
import { afterAll, afterEach, describe, expect, test } from 'vitest'
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
const getBody = (wrapper: VueWrapper<ComponentPublicInstance>) =>
  wrapper.findAll(bodyClass)
const getBodyItem = (wrapper: VueWrapper<ComponentPublicInstance>, index = 1) =>
  wrapper
    .findAll(`${bodyClass}:nth-child(${index}) td`)
    .map(item => item.find('.cell').text())
const getBodyClass = (wrapper: VueWrapper<ComponentPublicInstance>) =>
  wrapper.find(`${bodyClass} td`).classes()
const options = { sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }] }
function getOptions(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>(
      '.el-select-dropdown__item',
    ),
  )
}

describe('curd-columns', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('search', () => {
    test('column search prop', async () => {
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
      expect(getBody(wrapper)).toHaveLength(2)
      expect(wrapper.findAll('.el-form-item__label').map(item => item.text())).toEqual(['name', 'sex'])
    })

    test('search prop', async () => {
      const wrapper = mount({
        template: `<z-crud v-model:formData="value" :search="search" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
        :columns="cols" :options="options" :toolBar="false" :action="false"/>`,
        setup() {
          const value = ref({ name: '', sex: '' })
          const cols = ref([{ label: 'a', prop: 'a' }, { label: 'b', prop: 'b' }, { label: 'date', prop: 'date' }])
          const search = ref({
            columns: [{ component: 'input', label: 'nameA', field: 'name' }, { component: 'input', label: 'sex', field: 'sex' }],
          })
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
          return { value, cols, options, request, pagination, data, search }
        },
      })

      await delay(20)
      expect(getBody(wrapper)).toHaveLength(2)
      expect(wrapper.findAll('.el-form-item__label').map(item => item.text())).toEqual(['nameA', 'sex'])
    })

    test('column form prop', async () => {
      const wrapper = mount({
        template: `<z-crud v-model:formData="value" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
        :columns="cols" :options="options" :toolBar="false" :action="false"/>`,
        setup() {
          const value = ref({ name: '', sex: '' })
          const cols = ref([{ label: 'a', prop: 'a', form: { component: 'input', label: 'nameB', field: 'name' } },
            { label: 'b', prop: 'b', form: { component: 'input', label: 'sex', field: 'sex' } }, { label: 'date', prop: 'date' }])
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
      expect(wrapper.findAll('.el-form-item__label').map(item => item.text())).toEqual(['nameB', 'sex'])
    })

    test('form prop', async () => {
      const wrapper = mount({
        template: `<z-crud v-model:formData="value" :form="form" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
        :columns="cols" :options="options" :toolBar="false" :action="false"/>`,
        setup() {
          const value = ref({ name: '', sex: '' })
          const cols = ref([{ label: 'a', prop: 'a' }, { label: 'b', prop: 'b' }, { label: 'date', prop: 'date' }])
          const form = ref({
            columns: [{ component: 'input', label: 'nameC', field: 'name' }, { component: 'input', label: 'sex', field: 'sex' }],
          })
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
          return { value, cols, options, request, pagination, data, form }
        },
      })

      await delay(20)
      expect(getBody(wrapper)).toHaveLength(2)
      expect(wrapper.findAll('.el-form-item__label').map(item => item.text())).toEqual(['nameC', 'sex'])
    })
  })

  describe('add and edit', () => {
    test('column add and edit prop', async () => {
      const wrapper = mount({
        template: `<z-crud v-model:formData="value" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
        :columns="cols" :options="options" :toolBar="false" :search="false" :detail="false" :delete="false"/>`,
        setup() {
          const value = ref({ name: '', sex: '' })
          const cols = ref([{ label: 'a', prop: 'a', add: { label: 'nameA', field: 'sex', component: 'input' }, edit: { label: 'nameAA', field: 'sex', component: 'input' } },
            { label: 'b', prop: 'b', add: { label: 'sex', field: 'sex', component: 'input' }, edit: { label: 'sex', field: 'sex', component: 'input' } }, { label: 'date', prop: 'date' }])
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
      const addButton = wrapper.find('.el-button')
      expect(addButton.text()).toBe('add')
      await addButton.trigger('click')
      await nextTick()
      expect(wrapper.findAll('.el-form-item__label').map(item => item.text())).toEqual(['nameA', 'sex'])
      const editButton = wrapper.findAll('.el-button')[1]
      expect(editButton.text()).toBe('edit')
      await editButton.trigger('click')
      await nextTick()
      expect(wrapper.findAll('.el-form-item__label').map(item => item.text())).toEqual(['nameAA', 'sex'])
    })

    test('add and edit prop', async () => {
      const wrapper = mount({
        template: `<z-crud v-model:formData="value" :add="add" :edit="edit" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
        :columns="cols" :options="options" :toolBar="false" :detail="false" :search="false" :delete="false"/>`,
        setup() {
          const value = ref({ name: '', sex: '' })
          const cols = ref([{ label: 'a', prop: 'a' }, { label: 'b', prop: 'b' }, { label: 'date', prop: 'date' }])
          const add = ref({
            columns: [{ component: 'input', label: 'nameB', field: 'name' }, { component: 'input', label: 'sex', field: 'sex' }],
          })
          const edit = ref({
            columns: [{ component: 'input', label: 'nameBB', field: 'name' }, { component: 'input', label: 'sex', field: 'sex' }],
          })
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
          return { value, cols, options, request, pagination, data, add, edit }
        },
      })

      await delay(20)
      expect(getBody(wrapper)).toHaveLength(2)
      const addButton = wrapper.find('.el-button')
      await addButton.trigger('click')
      await nextTick()
      expect(wrapper.findAll('.el-form-item__label').map(item => item.text())).toEqual(['nameB', 'sex'])
      const editButton = wrapper.findAll('.el-button')[1]
      expect(editButton.text()).toBe('edit')
      await editButton.trigger('click')
      await nextTick()
      expect(wrapper.findAll('.el-form-item__label').map(item => item.text())).toEqual(['nameBB', 'sex'])
    })

    test('column form prop', async () => {
      const wrapper = mount({
        template: `<z-crud v-model:formData="value" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
        :columns="cols" :options="options" :toolBar="false" :search="false" :detail="false" :delete="false" />`,
        setup() {
          const value = ref({ name: '', sex: '' })
          const cols = ref([{ label: 'a', prop: 'a', form: { component: 'input', label: 'nameC', field: 'name' } },
            { label: 'b', prop: 'b', form: { component: 'input', label: 'sex', field: 'sex' } }, { label: 'date', prop: 'date' }])
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
      const addButton = wrapper.find('.el-button')
      await addButton.trigger('click')
      await nextTick()
      expect(wrapper.findAll('.el-form-item__label').length).toBe(2)
      expect(wrapper.findAll('.el-form-item__label').map(item => item.text())).toEqual(['nameC', 'sex'])
      const editButton = wrapper.findAll('.el-button')[1]
      expect(editButton.text()).toBe('edit')
      await editButton.trigger('click')
      await nextTick()
      expect(wrapper.findAll('.el-form-item__label').map(item => item.text())).toEqual(['nameC', 'sex'])
    })

    test('form prop', async () => {
      const wrapper = mount({
        template: `<z-crud v-model:formData="value" :form="form" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
        :columns="cols" :options="options" :toolBar="false" :search="false" :detail="false" :delete="false"/>`,
        setup() {
          const value = ref({ name: '', sex: '' })
          const cols = ref([{ label: 'a', prop: 'a' }, { label: 'b', prop: 'b' }, { label: 'date', prop: 'date' }])
          const form = ref({
            columns: [{ component: 'input', label: 'nameD', field: 'name' }, { component: 'input', label: 'sex', field: 'sex' }],
          })
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
          return { value, cols, options, request, pagination, data, form }
        },
      })

      await delay(20)
      expect(getBody(wrapper)).toHaveLength(2)
      const addButton = wrapper.find('.el-button')
      await addButton.trigger('click')
      await nextTick()
      expect(wrapper.findAll('.el-form-item__label').length).toBe(2)
      expect(wrapper.findAll('.el-form-item__label').map(item => item.text())).toEqual(['nameD', 'sex'])
      const editButton = wrapper.findAll('.el-button')[1]
      expect(editButton.text()).toBe('edit')
      await editButton.trigger('click')
      await nextTick()
      expect(wrapper.findAll('.el-form-item__label').map(item => item.text())).toEqual(['nameD', 'sex'])
    })
  })

  describe('detail', () => {
    test('column detail prop', async () => {
      const wrapper = mount({
        template: `<z-crud v-model:formData="value" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
        :columns="cols" :options="options" :toolBar="false" :add="false" :search="false" :edit="false" :delete="false"/>`,
        setup() {
          const value = ref({ name: '', sex: '' })
          const cols = ref([{ label: 'a', prop: 'a', detail: { label: 'name', prop: 'name' } }, { detail: { label: 'sex', prop: 'sex' }, label: 'b', prop: 'b' }, { label: 'date', prop: 'date' }])
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
      const detailButton = wrapper.findAll('.el-button')[1]
      expect(detailButton.text()).toBe('view')
      await detailButton.trigger('click')
      await nextTick()
      expect(wrapper.findAll('.el-descriptions__label').map(item => item.text())).toEqual(['name', 'sex'])
    })

    test('detail prop', async () => {
      const wrapper = mount({
        template: `<z-crud v-model:formData="value" :detail="detail" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
        :columns="cols" :options="options" :toolBar="false" :add="false" :search="false" :edit="false" :delete="false"/>`,
        setup() {
          const value = ref({ name: '', sex: '' })
          const cols = ref([{ label: 'a', prop: 'a' }, { label: 'b', prop: 'b' }, { label: 'date', prop: 'date' }])
          const detail = {
            columns: [{ label: 'nameA', prop: 'name' }, { label: 'sex', prop: 'sex' }],
          }
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
          return { value, cols, options, request, pagination, data, detail }
        },
      })

      await delay(20)
      expect(getBody(wrapper)).toHaveLength(2)
      const detailButton = wrapper.findAll('.el-button')[1]
      expect(detailButton.text()).toBe('view')
      await detailButton.trigger('click')
      await nextTick()
      expect(wrapper.findAll('.el-descriptions__label').map(item => item.text())).toEqual(['nameA', 'sex'])
    })

    test('column form prop', async () => {
      const wrapper = mount({
        template: `<z-crud v-model:formData="value" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
        :columns="cols" :options="options" :toolBar="false" :add="false" :search="false" :edit="false" :delete="false"/>`,
        setup() {
          const value = ref({ name: '', sex: '' })
          const cols = ref([{ label: 'a', prop: 'a', form: { label: 'name', prop: 'name' } }, { form: { label: 'sex', prop: 'sex' }, label: 'b', prop: 'b' }, { label: 'date', prop: 'date' }])
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
      const detailButton = wrapper.findAll('.el-button')[1]
      expect(wrapper.findAll('.el-button').length).toBe(2)
      expect(detailButton.text()).toBe('view')
      await detailButton.trigger('click')
      await nextTick()
      expect(wrapper.findAll('.el-descriptions__label').map(item => item.text())).toEqual(['name', 'sex'])
    })

    test('form prop', async () => {
      const wrapper = mount({
        template: `<z-crud v-model:formData="value" :form="form" :loading="false" v-model:data="data" :request="request" v-model:pagination="pagination"
        :columns="cols" :options="options" :toolBar="false" :add="false" :search="false" :edit="false" :delete="false"/>`,
        setup() {
          const value = ref({ name: '', sex: '' })
          const cols = ref([{ label: 'a', prop: 'a' }, { label: 'b', prop: 'b' }, { label: 'date', prop: 'date' }])
          const form = {
            columns: [{ label: 'nameC', prop: 'name' }, { label: 'sex', prop: 'sex' }],
          }
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
          return { value, cols, options, request, pagination, data, form }
        },
      })

      await delay(20)
      expect(getBody(wrapper)).toHaveLength(2)
      const detailButton = wrapper.findAll('.el-button')[1]
      expect(detailButton.text()).toBe('view')
      await detailButton.trigger('click')
      await nextTick()
      expect(wrapper.findAll('.el-descriptions__label').map(item => item.text())).toEqual(['nameC', 'sex'])
    })
  })
})

afterAll(() => {
  config.global.components = {}
})
