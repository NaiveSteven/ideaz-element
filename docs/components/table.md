# Table 表格

常用的操作按钮。

## 基础用法

基础的按钮用法。

:::demo 使用 `type`、`plain`、`round` 和 `circle` 属性来定义 Button 的样式。

```vue
<script lang="ts" setup>
import { ref } from 'vue'

interface RowData {
  date: string
  name: string
  address: string
  select: string
  username: string
}

const pagination = ref({ page_size: 20, page: 1, total: 40 })
const loading = ref(false)
const tableData = ref<RowData[]>([])

const tableCols = [
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'address',
    label: '地址',
  },
  {
    prop: 'date',
    label: '日期',
  },
]

const getData = () => {
  loading.value = true
  setTimeout(() => {
    tableData.value = [
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        select: '1',
        username: 'username1',
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        select: '2',
        username: 'username2',
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        select: '3',
        username: 'username3',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        select: '4',
        username: 'username4',
      },
    ]
    loading.value = false
  }, 1000)
}
const handlePaginationChange = (val: { page: number; page_size: number }) => {
  pagination.value.page = val.page
  pagination.value.page_size = val.page_size
  getData()
}

getData()
</script>

<template>
  <z-table
    ref="cTableRef"
    :loading="loading"
    :table-cols="tableCols"
    :data="tableData"
    :pagination="pagination"
    @refresh="handlePaginationChange"
  />
</template>
```
