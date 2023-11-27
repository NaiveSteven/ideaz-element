# Crud 增删改查

> 集成`z-form`和`z-table`组件，实现增删改查功能。

## 表格数据接口

配置`column`生成表格项。

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
})
const tableData = ref([])
const pagination = ref({
  page: 1,
  pageSize: 0,
  total: 0
})

const options = {
  sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }]
}

function getTableData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          name: 'Steven',
          sex: 'male',
          age: 22,
          time: '2020-01-01'
        },
        {
          name: 'Helen',
          sex: 'male',
          age: 12,
          time: '2012-01-01'
        },
        {
          name: 'Nancy',
          sex: 'female',
          age: 18,
          time: '2018-01-01'
        },
        {
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
          list: data,
        }
      })
    }, 100)
  })
}
</script>

<template>
  <z-crud
    v-model:data="tableData"
    v-model:pagination="pagination"
    :options="options"
    :columns="columns"
    :request="request"
  />
</template>
```

:::
