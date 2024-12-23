# Crud 增删改查

集成`z-form`和`z-table`组件，实现增删改查功能。

## 基础用法

配置`column`生成表格项。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const loading = ref(false)
const formData = ref({
  name: '',
  sex: '',
  age: ''
})
const tableData = ref([])

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

const options = {
  sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }]
}
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 4,
})

function mockApi() {
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
        result: {
          page: 1,
          pageSize: 10,
          total: 4,
          list: data,
        }
      })
    }, 100)
  })
}

async function getTableData() {
  loading.value = true
  try {
    const params = {
      ...pagination.value,
      ...formData.value
    }
    const res = await mockApi(params)
    tableData.value = res.result.list
    pagination.value.total = res.result.total
  }
  catch (error) {
    console.log(error)
  }
  loading.value = false
}

function handleDelete() {
  window.ZDialogTip({
    type: 'warning',
    message: '确定删除该条数据吗？',
    title: '警告',
    onConfirm: ({ done, confirmButtonLoading }) => {
      done()
    },
  })
}

function handleSearch() {
  pagination.value.page = 1
  getTableData()
}

getTableData()
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    :options="options"
    :loading="loading"
    :columns="columns"
    @delete="handleDelete"
    @refresh="getTableData"
    @search="handleSearch"
    @reset="handleSearch"
  />
</template>
```

:::

## 其他

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
const reqConfig = ref({
  searchApi: getReqData
})
const addFormData = ref({})
const editFormData = ref({})

function getReqData() {
  // console.log(pagination.value, 'getReqData')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          page: 1,
          pageSize: 2,
          total: 200,
          list: [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
              select: '1',
              username: 'username1',
              switch: true
            },
            {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄',
              select: '2',
              username: 'username2',
              switch: false
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              select: '3',
              username: 'username3',
              switch: true
            },
            {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄',
              select: '4',
              username: 'username4',
              switch: false
            },
          ]
        }
      })
    }, 100)
  })
}

function changeNameVisible() {
  isShowName.value = !isShowName.value
  // console.log(tableData.value, 'shuju')
}

const columns = [
  {
    type: 'sort',
    label: '排序'
  },
  {
    type: 'selection'
  },
  {
    prop: 'name',
    label: '姓名',
    tooltip: '姓名Tooltip',
    labelClassName: 'labelClassName',
    sortable: true,
    hide: () => !isShowName.value,
    showOverflowTooltip: true,
    form: {
      component: 'input',
    },
    detail: true,
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
    detail: true,
    form: {
      component: 'input'
    }
  },
  {
    tooltip: (scoped) => {
      return h('span', {}, scoped.$index)
    },
    prop: 'date',
    detail: true,
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
    detail: true,
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
        renderEdit,
        renderCancel,
        renderDelete,
        renderSave
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

function click(row) {
  row.__isEdit = true
}

function save(row) {
  row.__isEdit = false
}

function cancel(row) {
  row.__isEdit = false
}

function getData() {
  loading.value = true
  // console.log(pagination.value, formModel.value, 'pagination')
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
function handlePaginationChange(val: { page: number, pageSize: number }) {
  pagination.value.page = val.page
  pagination.value.pageSize = val.pageSize
  getData()
}

function handleClick() {
  console.log(tableData.value, 'tableData')
}

function handleDivClick() {
  console.log('handleDivClick')
}

function testClick() {
  console.log(formModel.value, 'formModel')
  console.log(pagination.value, 'pagination')
  console.log(addFormData.value, 'addFormData')
  console.log(editFormData.value, 'editFormData')
}

function handleCancel(a) {
  console.log(a, 'handleCancel')
}

function handleClose() {
  console.log('dialog close')
}

function handleDrawerOpen() {
  // console.log('handleDrawerOpen')
}

function handleSelectionChange() {
  console.log('selection')
}

function handleDeleteRow(data) {
  console.log(data, tableData.value, 'data')
  tableData.value.splice(data.index, 1)
}

function getAlertTitle(selectionData, table) {
  console.log(table, 'table')
  return `已选择 ${selectionData.length} 项`
}

function getAlertContent(selectionData, table) {
  console.log(table, 'table')
  return `已选择 ${selectionData.length} 项`
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
    v-model:data="tableData"
    v-model:addFormData="addFormData"
    v-model:editFormData="editFormData"
    v-model:loading="loading"
    name="name"
    :columns="columns"
    :request="reqConfig"
    :draggable="true"
    :options="options"
    :form="{ rules: { address: [{ required: true }] } }"
    :table-decorator="{ name: 'el-card', onClick: handleDivClick }"
    :editable="{ type: 'multiple', onDelete: handleDeleteRow }"
    :tool-bar="{ uncheck: ['地址'], exclude: ['测试'] }"
    watermark="测试"
    export="sadf"
    size="small"
    :max-length="5"
    :dialog="{ onClose: handleClose }"
    :drawer="{ onOpen: handleDrawerOpen }"
    :alert="{ title: getAlertTitle, content: getAlertContent }"
    @cancel="handleCancel"
    @submit="() => {}"
    @reset="() => {}"
    @selection-change="handleSelectionChange"
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
    <template #topRight>
      <el-button size="small" type="primary" @click="testClick">
        测试
      </el-button>
    </template>
    <template #topLeft>
      <el-button size="small" type="primary">
        测试
      </el-button>
    </template>
  </z-crud>
</template>
```

:::
