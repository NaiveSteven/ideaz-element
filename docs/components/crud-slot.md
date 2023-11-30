# Crud 增删改查

> 集成`z-form`和`z-table`组件，实现增删改查功能。

## 自定义列

配置`column`项的`slot`或`render`，可以自定义列内容。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const columns = ref([
  {
    label: '姓名',
    slot: 'name',
    form: {
      component: 'input',
      label: '姓名',
      field: 'name'
    }
  },
  {
    slot: 'sex',
    label: '性别',
    form: {
      component: 'select',
      label: '性别',
      field: 'sex'
    }
  },
  {
    render: (h, { row }) => h('span', row.age),
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
  >
    <template #name>
      sdf
    </template>
    <!-- <template #sex>
      asdf
    </template> -->
  </z-crud>
</template>
```

:::