# Crud 增删改查

> 集成`z-form`和`z-table`组件，实现增删改查功能。

## 表格接口

配置`request`中`searchApi`、`deleteApi`、`addApi`、`editApi`可以直接实现表格数据获取、删除数据、新增和编辑数据操作。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const columns = ref([
  {
    prop: 'name',
    label: '姓名',
    form: {
      component: 'input',
      label: '姓名',
      field: 'name'
    }
  },
  {
    prop: 'sex',
    label: '性别',
    form: {
      component: 'select',
      label: '性别',
      field: 'sex'
    }
  },
  {
    prop: 'age',
    label: '年龄',
    form: {
      component: 'input',
      label: '年龄',
      field: 'age'
    }
  },
  {
    prop: 'time',
    label: '出生日期'
  }
])
const request = ref({
  searchApi: getTableData,
  deleteApi: commonApi,
  submitApi: commonApi
})
const tableData = ref([])
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 0
})
const loading = ref(false)
const formData = ref({})

const options = {
  sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }]
}

function getTableData(params) {
  console.log(params, 'getTableData params')
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          name: 'Steven',
          sex: 'male',
          age: 22,
          time: '2020-01-01'
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          time: '2012-01-01'
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          time: '2018-01-01'
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
          age: 28,
          time: '2028-01-01'
        },
      ]

      resolve({
        data: {
          page: 1,
          pageSize: 2,
          total: 4,
          list: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize)
        }
      })
    }, 100)
  })
}

function commonApi(params) {
  console.log(params, 'commonApi params')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        msg: 'success',
        code: 200
      })
    }, 100)
  })
}

const dialog = ref({
  confirmButtonLoading: false
})

const handleSubmit = () => {
  dialog.value.confirmButtonLoading = true
}
</script>

<template>
  <z-crud
    v-model:formData="formData"
    v-model:data="tableData"
    v-model:pagination="pagination"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :request="request"
    :dialog="dialog"
  />
</template>
```

:::

## 操作自定义

如需要自定义操作，可以使用`refresh`、`search`、`reset`、`submit`、`delete`等事件实现刷新、查询、重置和删除等操作。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const columns = ref([
  {
    prop: 'name',
    label: '姓名',
    form: {
      component: 'input',
      label: '姓名',
      field: 'name',
      required: true
    }
  },
  {
    prop: 'sex',
    label: '性别',
    form: {
      component: 'select',
      label: '性别',
      field: 'sex'
    }
  },
  {
    prop: 'age',
    label: '年龄',
    form: {
      component: 'input',
      label: '年龄',
      field: 'age'
    }
  },
  {
    prop: 'time',
    label: '出生日期'
  }
])
const tableData = ref([])
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 0
})
const loading = ref(false)
const formData = ref({})
const dialog = ref({
  confirmButtonLoading: false
})

const options = {
  sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }]
}

function getData(params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          name: 'Steven',
          sex: 'male',
          age: 22,
          time: '2020-01-01'
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          time: '2012-01-01'
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          time: '2018-01-01'
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
          age: 28,
          time: '2028-01-01'
        },
      ]

      resolve({
        data: {
          page: 1,
          pageSize: 2,
          total: 4,
          list: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize)
        }
      })
    }, 100)
  })
}

function commonApi(params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        msg: 'success',
        code: 200
      })
    }, 100)
  })
}

const getTableData = async () => {
  loading.value = true
  try {
    const params = {
      ...pagination.value, ...formData.value
    }
    const res = await getData(params)
    tableData.value = res.data.list
    pagination.value.total = res.data.total
  }
  catch (error) {
    console.log(error)
  }
  loading.value = false
}

const handleRefresh = (val) => {
  pagination.value.page = val.page
  pagination.value.pageSize = val.pageSize
  getTableData()
}

const handleSearch = () => {
  pagination.value.page = 1
  getTableData()
}

const handleDelete = () => {
  window.ZDialogTip({
    type: 'warning',
    message: '确定删除该条数据吗？',
    title: '警告',
    onConfirm: ({ done, confirmBtnLoading }) => {
      confirmBtnLoading.value = true
      done()
      confirmBtnLoading.value = false
    },
  })
}

const handleSubmit = async ({ formData, type, rowData, form, done, isValid }) => {
  if (isValid) {
    dialog.value.confirmButtonLoading = true
    try {
      const params = {
        ...formData
      }
      console.log(params, rowData, 'params')
      if (type === 'edit')
        await commonApi({ ...params, id: rowData.id })
      else
        await commonApi(params)
      dialog.value.confirmButtonLoading = false
      done()
      getTableData()
    }
    catch {

    }
    dialog.value.confirmButtonLoading = false
  }
}

getTableData()
</script>

<template>
  <z-crud
    v-model:formData="formData"
    v-model:data="tableData"
    v-model:pagination="pagination"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :dialog="dialog"
    @refresh="handleRefresh"
    @reset="handleSearch"
    @search="handleSearch"
    @submit="handleSubmit"
    @delete="handleDelete"
  />
</template>
```

:::
