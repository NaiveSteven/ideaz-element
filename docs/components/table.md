# Table 表格

常用的操作按钮。

## 基础用法

基础的按钮用法。

:::demo 使用 `type`、`plain`、`round` 和 `circle` 属性来定义 Button 的样式。

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

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
    tooltip: '姓名Tooltip',
    labelClassName: 'labelClassName',
    sortable: true,
    showOverflowTooltip: true
  },
  {
    type: 'select',
    labelClassName: 'labelClassName',
    attrs: {
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
        { label: '选项3', value: '3' },
        { label: '选项4', value: '4' },
      ]
    },
    prop: 'address',
    label: '地址',
  },
  {
    tooltip: (scoped) => {
      return h('span', {}, scoped.$index)
    },
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
    type: 'el-switch',
    prop: 'switch',
    label: '开关',
  },
  {
    type: 'button',
    label: '操作',
    width: 300,
    buttons: [
      {
        type: 'primary',
        link: true,
        size: 'small',
        label: '更多',
        disabled: row => row.name === '王小虎',
        onClick: (row) => { console.log(row, '更多') }
      },
      {
        type: 'dropdown',
        children: [
          {
            divided: true,
            disabled: true,
            label: 'dropdown按钮1',
            onClick: (row) => { console.log(row, 'dropdown按钮1') }
          },
          {
            label: 'dropdown按钮2',
            onClick: (row) => { console.log(row, 'dropdown按钮2') }
          }
        ]
      }
    ]
  }
  // {
  //   label: '操作',
  //   slot: 'buttons'
  // },
]

const options = {
  address: [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' },
    { label: '选项3', value: '3' },
    { label: '选项4', value: '4' },
  ]
}

const click = (row) => {
  row.__isEdit = true
}

const save = (row) => {
  row.__isEdit = false
}

const cancel = (row) => {
  row.__isEdit = false
}

const getData = () => {
  loading.value = true
  setTimeout(() => {
    tableData.value = [
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '1',
        select: '1',
        username: 'username1',
        switch: true
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '3',
        select: '2',
        username: 'username2',
        switch: false
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '4',
        select: '3',
        username: 'username3',
        switch: true
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '2',
        select: '4',
        username: 'username4',
        switch: false
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
    :options="options"
    editable
    @refresh="handlePaginationChange"
  >
    <template #buttons="{ row }">
      <el-button @click="click(row)">
        编辑
      </el-button>
      <el-button @click="save(row)">
        保存
      </el-button>
      <el-button @click="cancel(row)">
        取消
      </el-button>
    </template>
  </z-table>
</template>
```

:::
