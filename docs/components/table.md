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

const pagination = ref({ pageSize: 20, page: 1, total: 40 })
const loading = ref(false)
const tableData = ref<RowData[]>([])

const columns = [
  {
    prop: 'name',
    label: '姓名',
    showOverflowTooltip: true
  },
  {
    prop: 'address',
    label: '地址',
  },
  {
    prop: 'date',
    label: '日期',
  },
  {
    type: 'el-input',
    prop: 'name',
    label: '测试',
    showOverflowTooltip: true
  },
  {
    label: '操作',
    slot: 'buttons'
  },
]

const click = (row) => {
  row.__isEdit = !row.__isEdit
}

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
const handlePaginationChange = (val: { page: number; pageSize: number }) => {
  pagination.value.page = val.page
  pagination.value.pageSize = val.pageSize
  getData()
}

getData()
</script>

<template>
  <z-table
    ref="cTableRef"
    :loading="loading"
    :columns="columns"
    :data="tableData"
    :pagination="pagination"
    @refresh="handlePaginationChange"
  >
    <template #buttons="{ row }">
      <el-button @click="click(row)">
        点击
      </el-button>
    </template>
  </z-table>
</template>
```

:::

> 表格项配置`type: 'radio'`，即可实现表格项单选

::: demo

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

const tablePlus = ref()
const selectedData = ref({})
const loading = ref(false)
const tableData = ref<RowData[]>([])

const pagination = ref({
  pageSize: 2,
  page: 1,
  total: 20,
  layout: 'total, prev, pager, next, jumper, ->',
})

const columns = [
  {
    type: 'radio',
  },
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
        id: pagination.value.page,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        select: '1',
        username: 'username1',
      },
      {
        id: pagination.value.page + 10,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        select: '2',
        username: 'username2',
      },
      {
        id: pagination.value.page + 20,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        select: '3',
        username: 'username3',
      },
      {
        id: pagination.value.page + 30,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        select: '4',
        username: 'username4',
      },
    ]
    const data = {
      id: 31,
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄',
      select: '4',
      username: 'username4',
    }
    tablePlus.value.toggleRadioSelection(data)
    loading.value = false
  }, 1000)
}

function setRowDisabled(row) {
  return row.id !== selectedData.value.id
}

const handlePaginationChange = (val) => {
  console.log(val, 'pagination change')
  pagination.value.page = val.page
  pagination.value.pageSize = val.pageSize
  getData()
}

const handleClear = () => {
  tablePlus.value.clearSelection()
}
const handleRadioChange = (row) => {
  selectedData.value = row
  console.log(row, 'radio change')
}

getData()
</script>

<template>
  <el-button type="primary" @click="handleClear">
    清空选中
  </el-button>
  <z-table
    ref="tablePlus"
    row-key="id"
    :loading="loading"
    :columns="columns"
    :data="tableData"
    :pagination="pagination"
    @radio-change="handleRadioChange"
    @refresh="handlePaginationChange"
  />
</template>
```

:::
