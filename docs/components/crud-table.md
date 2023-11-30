# Crud 增删改查

> `z-crud`组件表格部分功能介绍

## 表格使用

在`z-table`上封装，表格属性直接传递即可。
配置`action`为`false`，可以关闭组件内部封装的操作。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const columns = ref([
  {
    type: 'selection',
    reserveSelection: true
  },
  {
    label: '姓名',
    prop: 'name',
  },
  {
    prop: 'sex',
    label: '性别',
  },
  {
    prop: 'age',
    label: '年龄',
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
  pageSize: 2,
  total: 0
})
const loading = ref(false)

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
</script>

<template>
  <z-crud
    v-model:data="tableData"
    v-model:pagination="pagination"
    v-model:loading="loading"
    :columns="columns"
    :request="request"
    :action="true"
    row-key="id"
    stripe
  />
</template>
```

:::

## 操作项

操作项默认会拼接在`columns`末尾，表格头为`操作`，有`查看`、`编辑`、`删除`三个操作。
当然也可以配置`action`为`false`关闭默认的操作项，自定义表格操作。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const columns = ref([
  {
    label: '姓名',
    prop: 'name',
  },
  {
    prop: 'sex',
    label: '性别',
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    prop: 'time',
    label: '出生日期'
  },
  {
    type: 'button',
    label: '操作',
    buttons: [
      { label: '查看', link: true, type: 'primary', onClick: row => console.log(row, 'row') },
      { label: '删除', link: true, type: 'danger', onClick: row => console.log(row, 'row') }
    ]
  }
])
const request = ref({
  searchApi: getTableData,
})
const tableData = ref([])
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 0
})
const loading = ref(false)

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
</script>

<template>
  <z-crud
    v-model:data="tableData"
    v-model:pagination="pagination"
    v-model:loading="loading"
    :columns="columns"
    :request="request"
    :action="false"
  />
</template>
```

:::

## 操作项下拉

> 其他具体配置可参考`z-table`组件

在`buttons`数组中配置`type`为`dropdown`，`children`中配置下拉选项

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const columns = ref([
  {
    label: '姓名',
    prop: 'name',
  },
  {
    prop: 'sex',
    label: '性别',
  },
  {
    prop: 'age',
    label: '年龄',
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
        reference: '其他',
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
])
const request = ref({
  searchApi: getTableData,
})
const tableData = ref([])
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 0
})
const loading = ref(false)

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
</script>

<template>
  <z-crud
    v-model:data="tableData"
    v-model:pagination="pagination"
    v-model:loading="loading"
    :columns="columns"
    :request="request"
    :action="false"
  />
</template>
```

:::

## 分页

配置`pagination`，支持双向绑定，实现分页效果。

`pageSize`为`0`、`pagination`为`false`或`pagination`不传，分页不展示。

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

const columns = ref([
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
])

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
          pageSize: 10,
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
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:loading="loading"
    :columns="columns"
    :action="false"
    @refresh="getTableData"
  />
</template>
```

:::

## 前端分页

配置`pagination`的`type`为`front`，开启前端分页功能。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const loading = ref(false)
const tableData = ref([])
const pagination = ref({
  type: 'front',
  page: 1,
  pageSize: 2,
  total: 0,
  layout: 'total, sizes, prev, pager, next, jumper'
})

const columns = ref([
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
])

const mockApi = () => {
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
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:loading="loading"
    :columns="columns"
    :action="false"
    @refresh="getTableData"
  />
</template>
```

:::

## 列显隐

`column`中配置`hide`字段，支持函数或布尔值。

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

const columns = ref([
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
])

const changeVisible = () => {
  isHide.value = !isHide.value
}
</script>

<template>
  <el-button @click="changeVisible">
    点击修改列显隐
  </el-button>
  <z-crud
    v-model:data="tableData"
    :columns="columns"
    :action="false"
  />
</template>
```

:::

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
    <template #sex>
      asdf
    </template>
  </z-crud>
</template>
```

:::

## 列提示

`column`中配置`tooltip`实现表头提示功能，支持函数和字符串。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

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

const columns = ref([
  {
    prop: 'name',
    label: '姓名',
    tooltip: () => h('span', '姓名提示'),
  },
  {
    prop: 'sex',
    label: '性别',
    tooltip: '性别提示'
  },
  {
    prop: 'age',
    label: '年龄'
  },
  {
    prop: 'time',
    label: '出生日期'
  }
])
</script>

<template>
  <z-crud
    v-model:data="tableData"
    :columns="columns"
    :action="false"
  />
</template>
```

:::

## 列类型

`column`中配置`type`实现表格列类型，支持`expand`、`radio`、`selection`、`input`、`select`。

:::tip
`type`为`sort`、`type`为`radio`或者需要跨页选中`checkbox`时，需要配合`rowKey`使用（默认`id`）。
:::

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const tableData = ref([
  {
    id: 1,
    name: 'Steven',
    sex: '1',
    age: 22,
    time: '2020-01-01'
  },
  {
    id: 2,
    name: 'Helen',
    sex: '1',
    age: 12,
    time: '2012-01-01'
  },
  {
    id: 3,
    name: 'Nancy',
    sex: '2',
    age: 18,
    time: '2018-01-01'
  },
  {
    id: 4,
    name: 'Jack',
    sex: '1',
    age: 28,
    time: '2028-01-01'
  }
])

const columns = ref([
  {
    type: 'sort',
  },
  {
    type: 'expand',
  },
  {
    type: 'index'
  },
  {
    type: 'radio'
  },
  {
    type: 'selection',
    reserveSelection: true
  },
  {
    type: 'input',
    prop: 'name',
    label: '姓名',
  },
  {
    type: 'select',
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
])

const options = {
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' }
  ]
}
</script>

<template>
  <z-crud
    v-model:data="tableData"
    :columns="columns"
    :options="options"
    :action="true"
    row-key="id"
  >
    <template #expand>
      <span>展开内容</span>
    </template>
  </z-crud>
</template>
```

:::
