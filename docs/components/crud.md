# Crud 增删改查

> 集成`z-form`和`z-table`组件，实现增删改查功能。

## 基础用法

基础的按钮用法。

:::demo

```vue
<script lang="ts" setup>
import { h, onMounted, ref } from 'vue'

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
const cTableRef = ref()
const formModel = ref({ address: '' })
const isShowName = ref(false)

const changeNameVisible = () => {
  isShowName.value = !isShowName.value
}

const columns = [
  {
    prop: 'name',
    label: '姓名',
    tooltip: '姓名Tooltip',
    labelClassName: 'labelClassName',
    sortable: true,
    hide: () => !isShowName.value,
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
    search: {
      component: 'input'
    },
    label: '地址',
  },
  {
    tooltip: (scoped) => {
      return h('span', {}, scoped.$index)
    },
    prop: 'date',
    label: '日期234',
  },
  {
    prop: 'daate2',
    fixed: 'left',
    label: '日期34',
  },
  {
    prop: 'daateq',
    fixed: 'right',
    label: '日期345',
  },
  {
    prop: 'daatew',
    label: '日期1',
  },
  {
    prop: 'daatee',
    label: '日期2',
  },
  {
    prop: 'daates',
    label: '日期3',
  },
  {
    prop: 'daated',
    label: '日期4',
  },
  {
    prop: 'daatex',
    label: '日期5',
  },
  {
    prop: 'daatextre',
    label: '日期5ert',
  },
  {
    type: 'el-input',
    prop: 'name',
    label: '测试',
    required: true,
    // rules: {
    //   message: '请输入用户名',
    //   trigger: 'blur',
    //   required: true
    // },
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
    buttons: ({ renderEdit, renderCancel, renderDelete, renderSave }, tableData) => {
      return [
        {
          type: 'primary',
          link: true,
          label: '复制',
          // hide: row => row.__isEdit,
          onClick: (row) => {
            tableData.value.push({ ...row })
          }
        },
        renderEdit, renderCancel, renderDelete, renderSave
      ]
    }
  }
  // {
  //   type: 'button',
  //   label: '操作',
  //   width: 300,
  //   buttons: [
  //     {
  //       type: 'primary',
  //       link: true,
  //       size: 'small',
  //       label: '更多',
  //       disabled: row => row.name === '王小虎',
  //       onClick: (row) => { console.log(row, '更多') }
  //     },
  //     {
  //       type: 'dropdown',
  //       children: [
  //         {
  //           divided: true,
  //           disabled: true,
  //           label: 'dropdown按钮1',
  //           onClick: (row) => { console.log(row, 'dropdown按钮1') }
  //         },
  //         {
  //           label: 'dropdown按钮2',
  //           onClick: (row) => { console.log(row, 'dropdown按钮2') }
  //         }
  //       ]
  //     }
  //   ]
  // }
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
  console.log(pagination.value, formModel.value, 'pagination')
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

const handleClick = () => {
  console.log(tableData.value, 'tableData')
}

const handleDivClick = () => {
  console.log('handleDivClick')
}

onMounted(() => {
  getData()
})
</script>

<template>
  <el-button @click="handleClick">
    获取数据
  </el-button>
  <el-button @click="changeNameVisible">
    姓名列显隐
  </el-button>
  <z-crud
    ref="cTableRef"
    v-model:formData="formModel"
    v-model:pagination="pagination"
    name="name"
    :data="tableData"
    :loading="loading"
    :columns="columns"
    :options="options"
    :table-decorator="{ name: 'el-card', onClick: handleDivClick }"
    :editable="{ type: 'multiple' }"
    :tool-bar="{ uncheck: ['地址'], exclude: ['测试'] }"
    size="small"
    :max-length="5"
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
  </z-crud>
</template>
```

:::
