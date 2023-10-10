# Table 表格

通过配置生成表格，内置更适合中后台业务的功能。

:::tip
某些属性在`z-table`内部被默认配置，例如：`align` 设置为 `center`
:::

## 基础用法

配置`column`生成表格项。`el-table`表格属性直接传入`z-table`，`el-table-column`属性在`column`中配置。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const loading = ref(false)
const tableData = ref([
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
])

const columns = [
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'sex',
    label: '性别',
  },
  {
    prop: 'age',
    label: '年龄'
  },
  {
    prop: 'time',
    label: '出生日期'
  }
]
</script>

<template>
  <z-table
    :data="tableData"
    :loading="loading"
    :columns="columns"
  />
</template>
```

:::

## 分页

配置`pagination`，支持双向绑定，实现分页效果。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const loading = ref(false)
const tableData = ref([])
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 0,
  layout: 'total, sizes, prev, pager, next, jumper'
})

const columns = [
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'sex',
    label: '性别',
  },
  {
    prop: 'age',
    label: '年龄'
  },
  {
    prop: 'time',
    label: '出生日期'
  }
]

const mockApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dataFirstPage = [
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
      ]
      const dataSecondPage = [
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
          page_size: 10,
          total: 4,
          list: pagination.value.page === 1 ? dataFirstPage : dataSecondPage,
        }
      })
    }, 100)
  })
}

const getTableData = async () => {
  loading.value = true
  try {
    const res = await mockApi({ ...pagination.value })
    tableData.value = res.result.list
    pagination.value.total = res.result.total
  }
  catch (error) {
    console.log(error)
  }
  loading.value = false
}

getTableData()
</script>

<template>
  <z-table
    v-model:pagination="pagination"
    :data="tableData"
    :loading="loading"
    :columns="columns"
    @refresh="getTableData"
  />
</template>
```

:::

## 操作按钮

`column`中配置操作项，`type`传入`button`，配置`buttons`数组。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const loading = ref(false)
const tableData = ref([
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
  }
])

const columns = [
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'sex',
    label: '性别',
  },
  {
    prop: 'age',
    label: '年龄'
  },
  {
    prop: 'time',
    label: '出生日期'
  },
  {
    type: 'button',
    label: '操作',
    buttons: [
      {
        type: 'primary',
        link: true,
        label: '编辑',
        onClick: (row) => {
          console.log(row, 'edit')
        }
      },
      {
        type: 'danger',
        link: true,
        label: '删除',
        onClick: (row) => {
          console.log(row, 'delete')
        }
      }
    ]
  }
]
</script>

<template>
  <z-table
    :data="tableData"
    :loading="loading"
    :columns="columns"
  />
</template>
```

:::

## 操作项下拉

如需下拉，可以在`buttons`数组中配置`type`为`dropdown`，`children`中配置下拉选项

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const loading = ref(false)
const tableData = ref([
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
  }
])

const columns = [
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'sex',
    label: '性别',
  },
  {
    prop: 'age',
    label: '年龄'
  },
  {
    prop: 'time',
    label: '出生日期'
  },
  {
    type: 'button',
    label: '操作',
    width: '200px',
    buttons: [
      {
        type: 'primary',
        link: true,
        label: '编辑',
        onClick: (row) => {
          console.log(row, 'edit')
        }
      },
      {
        type: 'danger',
        link: true,
        label: '删除',
        onClick: (row) => {
          console.log(row, 'delete')
        }
      },
      {
        type: 'dropdown',
        reference: '删除',
        children: [
          {
            type: 'primary',
            link: true,
            label: '复制',
            onClick: (row) => {
              console.log(row, 'copy')
            }
          },
          {
            type: 'danger',
            link: true,
            label: '操作',
            onClick: (row) => {
              console.log(row, 'operate')
            }
          },
        ]
      }
    ]
  }
]
</script>

<template>
  <z-table
    :data="tableData"
    :loading="loading"
    :columns="columns"
  />
</template>
```

:::

`reference`字段配置下拉关联文案（默认为`更多`），支持函数和字符串类型。

支持配置`el-dropdown`和`el-dropdown-item`组件属性和方法。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const loading = ref(false)
const tableData = ref([
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
  }
])

const columns = [
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'sex',
    label: '性别',
  },
  {
    prop: 'age',
    label: '年龄'
  },
  {
    prop: 'time',
    label: '出生日期'
  },
  {
    type: 'button',
    label: '操作',
    buttons: [
      {
        type: 'dropdown',
        reference: '操作',
        placement: 'top-start',
        children: [
          {
            type: 'primary',
            link: true,
            label: '编辑',
            onClick: (row) => {
              console.log(row, 'edit')
            }
          },
          {
            type: 'danger',
            link: true,
            label: '删除',
            onClick: (row) => {
              console.log(row, 'delete')
            }
          },
        ]
      },
      {
        type: 'dropdown',
        reference: () => h('span', { style: { cursor: 'pointer' } }, '操作2'),
        placement: 'top',
        onVisibleChange: (visible) => {
          console.log(visible, 'visible')
        },
        children: [
          {
            type: 'primary',
            link: true,
            label: '复制',
            onClick: (row) => {
              console.log(row, 'copy')
            }
          },
          {
            type: 'danger',
            link: true,
            label: '操作',
            divided: true,
            onClick: (row) => {
              console.log(row, 'operate')
            }
          },
        ]
      }
    ]
  }
]
</script>

<template>
  <z-table
    :data="tableData"
    :loading="loading"
    :columns="columns"
  />
</template>
```

:::

## 列显隐

`column`中配置`hide`字段，支持函数或布尔值，函数返回布尔值，true表示隐藏，false表示显示。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const isHide = ref(false)
const tableData = ref([
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
  }
])

const columns = [
  {
    prop: 'name',
    label: '姓名',
    hide: () => isHide.value,
  },
  {
    prop: 'sex',
    label: '性别',
    hide: true,
  },
  {
    prop: 'age',
    label: '年龄'
  },
  {
    prop: 'time',
    label: '出生日期'
  }
]

const changeVisible = () => {
  isHide.value = !isHide.value
}
</script>

<template>
  <el-button @click="changeVisible">
    点击修改列显隐
  </el-button>
  <z-table
    :data="tableData"
    :columns="columns"
  />
</template>
```

:::

## 撒打发

基础的按钮用法。

:::demo

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

const pagination = ref({ pageSize: 20, page: 1, total: 40, type: 'front' })
const loading = ref(false)
const tableData = ref<RowData[]>([])
const cTableRef = ref()
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
  setTimeout(() => {
    tableData.value = [
      {
        date: `2016-05-02${pagination.value.page}`,
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
  // pagination.value.page = val.page
  // pagination.value.pageSize = val.pageSize
  getData()
}

const handleClick = () => {
  console.log(pagination.value, 'pagination')
  // console.log(tableData.value, 'tableData')
}

const handleModel = (aa) => {
  // console.log(aa, pagination.value, 'paginationbefore')
  pagination.value = aa
  console.log(aa, pagination.value, 'pagination')
}

getData()
</script>

<template>
  <el-button @click="handleClick">
    获取数据
  </el-button>
  <el-button @click="changeNameVisible">
    姓名列显隐
  </el-button>
  <z-table
    ref="cTableRef"
    v-model:pagination="pagination"
    :data="tableData"
    :loading="loading"
    :columns="columns"
    :options="options"
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
  </z-table>
</template>
```

:::
