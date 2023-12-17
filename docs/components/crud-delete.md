# Crud 增删改查

> `z-crud`组件删除功能介绍

## 基础用法

配置`request`的`deleteApi`字段，可以调用接口删除。参数默认为`id`，也可以通过`rowKey`配置。

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
    search: {
      component: 'input',
      label: '姓名',
      field: 'name'
    },
    add: {
      component: 'input',
      label: '姓名',
      field: 'name'
    }
  },
  {
    prop: 'sex',
    label: '性别',
    search: {
      component: 'select',
      label: '性别',
      field: 'sex'
    },
  },
  {
    prop: 'age',
    label: '年龄',
    search: {
      component: 'input',
      label: '年龄',
      field: 'age'
    },
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
const request = ref({
  searchApi: mockApi,
  deleteApi: deleteMockApi
})

function mockApi() {
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
          pageSize: 10,
          total: 4,
          list: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
        }
      })
    }, 100)
  })
}

function deleteMockApi(params) {
  console.log(params, 'params')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'success',
        code: 200
      })
    }, 100)
  })
}
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :request="request"
    :detail="false"
    :add="false"
    :edit="false"
  />
</template>
```

:::

## 自定义参数

配置`request`的`deleteParams`字段，可以自定义删除接口参数。

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
    search: {
      component: 'input',
      label: '姓名',
      field: 'name'
    },
    add: {
      component: 'input',
      label: '姓名',
      field: 'name'
    }
  },
  {
    prop: 'sex',
    label: '性别',
    search: {
      component: 'select',
      label: '性别',
      field: 'sex'
    },
  },
  {
    prop: 'age',
    label: '年龄',
    search: {
      component: 'input',
      label: '年龄',
      field: 'age'
    },
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
const request = ref({
  searchApi: mockApi,
  deleteApi: deleteMockApi,
  deleteParams: (row) => {
    return {
      name: row.name
    }
  }
})

function mockApi() {
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
          pageSize: 10,
          total: 4,
          list: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
        }
      })
    }, 100)
  })
}

function deleteMockApi(params) {
  console.log(params, 'params')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'success',
        code: 200
      })
    }, 100)
  })
}
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :request="request"
    :detail="false"
    :add="false"
    :edit="false"
  />
</template>
```

:::

## 自定义删除

配置`operate-delete`事件，可以自定义删除逻辑。

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
    search: {
      component: 'input',
      label: '姓名',
      field: 'name'
    },
    add: {
      component: 'input',
      label: '姓名',
      field: 'name'
    }
  },
  {
    prop: 'sex',
    label: '性别',
    search: {
      component: 'select',
      label: '性别',
      field: 'sex'
    },
  },
  {
    prop: 'age',
    label: '年龄',
    search: {
      component: 'input',
      label: '年龄',
      field: 'age'
    },
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
const request = ref({
  searchApi: mockApi,
})

function mockApi() {
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
          pageSize: 10,
          total: 4,
          list: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
        }
      })
    }, 100)
  })
}

function deleteMockApi(params) {
  console.log(params, 'params')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'success',
        code: 200
      })
    }, 100)
  })
}

const handleDelete = (rowData) => {
  window.ZDialogTip({
    type: 'warning',
    title: '提示',
    message: '确定删除吗？',
    onConfirm: async ({ confirmButtonLoading, done }) => {
      confirmButtonLoading.value = true
      try {
        await deleteMockApi({ id: rowData.id })
        confirmButtonLoading.value = false
        done()
      }
      catch {}
      confirmButtonLoading.value = false
    }
  })
}
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :request="request"
    :detail="false"
    :add="false"
    :edit="false"
    @operate-delete="handleDelete"
  />
</template>
```

:::

## 多选框

多选狂和删除功能结合，组件内部会有`el-alert`和批量删除等内置功能。

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
    type: 'selection',
    reserveSelection: true,
  },
  {
    prop: 'name',
    label: '姓名',
    search: {
      component: 'input',
      label: '姓名',
      field: 'name'
    },
    add: {
      component: 'input',
      label: '姓名',
      field: 'name'
    }
  },
  {
    prop: 'sex',
    label: '性别',
    search: {
      component: 'select',
      label: '性别',
      field: 'sex'
    },
  },
  {
    prop: 'age',
    label: '年龄',
    search: {
      component: 'input',
      label: '年龄',
      field: 'age'
    },
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
const request = ref({
  searchApi: mockApi,
  deleteApi: deleteMockApi
})

function mockApi() {
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
          pageSize: 10,
          total: 4,
          list: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
        }
      })
    }, 100)
  })
}

function deleteMockApi(params) {
  console.log(params, 'params')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'success',
        code: 200
      })
    }, 100)
  })
}
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :request="request"
    :detail="false"
    :add="false"
    :edit="false"
    row-key="id"
  />
</template>
```

:::

## Alert配置

传入`alert`对象配置`el-alert`组件属性。

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
    type: 'selection',
    reserveSelection: true,
  },
  {
    prop: 'name',
    label: '姓名',
    search: {
      component: 'input',
      label: '姓名',
      field: 'name'
    },
    add: {
      component: 'input',
      label: '姓名',
      field: 'name'
    }
  },
  {
    prop: 'sex',
    label: '性别',
    search: {
      component: 'select',
      label: '性别',
      field: 'sex'
    },
  },
  {
    prop: 'age',
    label: '年龄',
    search: {
      component: 'input',
      label: '年龄',
      field: 'age'
    },
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
const request = ref({
  searchApi: mockApi,
  deleteApi: deleteMockApi
})

function mockApi() {
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
          pageSize: 10,
          total: 4,
          list: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
        }
      })
    }, 100)
  })
}

function deleteMockApi(params) {
  console.log(params, 'params')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'success',
        code: 200
      })
    }, 100)
  })
}
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :request="request"
    :detail="false"
    :add="false"
    :edit="false"
    :alert="{ type: 'warning', description: 'description' }"
    row-key="id"
  />
</template>
```

:::

## 自定义Alert

如果需要自定义提示内容，`alert`可以直接传入`render`函数。如果**不需要提示**，可以传入`false`。

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
    type: 'selection',
    reserveSelection: true,
  },
  {
    prop: 'name',
    label: '姓名',
    search: {
      component: 'input',
      label: '姓名',
      field: 'name'
    },
    add: {
      component: 'input',
      label: '姓名',
      field: 'name'
    }
  },
  {
    prop: 'sex',
    label: '性别',
    search: {
      component: 'select',
      label: '性别',
      field: 'sex'
    },
  },
  {
    prop: 'age',
    label: '年龄',
    search: {
      component: 'input',
      label: '年龄',
      field: 'age'
    },
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
const request = ref({
  searchApi: mockApi,
  deleteApi: deleteMockApi
})

function mockApi() {
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
          pageSize: 10,
          total: 4,
          list: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
        }
      })
    }, 100)
  })
}

function deleteMockApi(params) {
  console.log(params, 'params')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'success',
        code: 200
      })
    }, 100)
  })
}

const renderAlert = (selectionData) => {
  return h('span', `已选中${selectionData.length}项`)
}
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :request="request"
    :detail="false"
    :add="false"
    :edit="false"
    :alert="renderAlert"
    row-key="id"
  />
</template>
```

:::

自定义提示内容也可以使用`alert`插槽。

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
    type: 'selection',
    reserveSelection: true,
  },
  {
    prop: 'name',
    label: '姓名',
    search: {
      component: 'input',
      label: '姓名',
      field: 'name'
    },
    add: {
      component: 'input',
      label: '姓名',
      field: 'name'
    }
  },
  {
    prop: 'sex',
    label: '性别',
    search: {
      component: 'select',
      label: '性别',
      field: 'sex'
    },
  },
  {
    prop: 'age',
    label: '年龄',
    search: {
      component: 'input',
      label: '年龄',
      field: 'age'
    },
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
const request = ref({
  searchApi: mockApi,
  deleteApi: deleteMockApi
})

function mockApi() {
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
          pageSize: 10,
          total: 4,
          list: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
        }
      })
    }, 100)
  })
}

function deleteMockApi(params) {
  console.log(params, 'params')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'success',
        code: 200
      })
    }, 100)
  })
}
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :request="request"
    :detail="false"
    :add="false"
    :edit="false"
    row-key="id"
  >
    <template #alert="{ selectionData }">
      已选中{{ selectionData.length }}项
    </template>
  </z-crud>
</template>
```

:::

`alert.title`和`alert.description`支持传入`render`函数自定义。

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
    type: 'selection',
    reserveSelection: true,
  },
  {
    prop: 'name',
    label: '姓名',
    search: {
      component: 'input',
      label: '姓名',
      field: 'name'
    },
    add: {
      component: 'input',
      label: '姓名',
      field: 'name'
    }
  },
  {
    prop: 'sex',
    label: '性别',
    search: {
      component: 'select',
      label: '性别',
      field: 'sex'
    },
  },
  {
    prop: 'age',
    label: '年龄',
    search: {
      component: 'input',
      label: '年龄',
      field: 'age'
    },
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
const request = ref({
  searchApi: mockApi,
  deleteApi: deleteMockApi
})
const alertConfig = ref({
  title: selectionData => h('span', `选中${selectionData.length}项`),
  description: () => h('span', 'description')
})

function mockApi() {
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
          pageSize: 10,
          total: 4,
          list: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
        }
      })
    }, 100)
  })
}

function deleteMockApi(params) {
  console.log(params, 'params')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'success',
        code: 200
      })
    }, 100)
  })
}
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :request="request"
    :detail="false"
    :add="false"
    :edit="false"
    :alert="alertConfig"
    row-key="id"
  />
</template>
```

:::

## z-crud删除相关属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| delete                      | 查询表单属性配置                                  | `boolean`             |   `true`       |
| action                      | 操作项是否展示（内置的删除、编辑等按钮）                                  | `boolean`             |   `true`       |
| edit                      | 编辑配置                                  | `boolean` / `object`             |   `true`       |
| add                      | 新增配置                                  | `boolean` / `object`             |   `true`       |
| detail                      | 详情配置                                  | `boolean` / `object`             |   `true`       |
| search                      | 查询配置                                  | `boolean` / `object`             |
| alert                      | 固定的选中数据提示                                  | `object` / `boolean`             |  `true`       |
| request                      | 接口配置                                  | `object`             |   —       |

## request属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| searchApi                      | 查询接口                                  | `() => promise`             |   —       |
| submitApi                      | 编辑新增确认                                  | `() => promise`             |   —       |
| deleteApi                      | 删除接口                                  | `() => promise`             |   —       |
| addApi                      | 新增接口                                  | `() => promise`             |   —       |
| editApi                      | 编辑接口                                  | `() => promise`             |   —       |
| detailApi                      | 详情接口                                  | `() => promise`             |   —       |
| editDetailApi                      | 编辑详情接口（编辑弹窗打开时调用）                                 | `() => promise`             |   —       |
| alias                      | 数据路径自定义                                  | `object`             |   —       |
| searchParams                      | 自定义查询接口参数                                  | `() => object`             |   —       |
| detailParams                      | 自定义详情接口参数                                  | `() => object`             |   —       |
| submitParams                      | 自定义确认接口参数                                  | `() => object`             |   —       |
| deleteParams                      | 自定义删除接口参数                                  | `() => object`             |   —       |
| addParams                      | 自定义新增接口参数                                  | `() => object`             |   —       |
| editParams                      | 自定义编辑接口参数                                  | `() => object`             |   —       |
| searchFunc                      | 查询方法重写                                  | `({ params }) => any`             |   —       |
| tableData                      | 表格数据自定义返回                                  | `(res) => any`             |   —       |
| transformEditDetail                      | 编辑详情数据自定义返回                                  | `() => object`             |   —       |

## alert属性

| 名称        | 说明               | 类型      | 默认值    | 必填 |
| :---------- | :----------------- | :-------- | :-------- | :--- |
| title       | Alert 标题。       | `string` / `() => VNode`  | —         | 否   |
| type        | Alert 类型。       | `success` / `warning` / `info` / `error`    | `info`    | 否   |
| description | 描述性文本         | `string` / `() => VNode`  | —         | 否   |
| closable    | 是否可以关闭       | `boolean` | `true`    | 否   |
| center      | 文字是否居中       | `boolean` | `false`   | 否   |
| close-text  | 自定义关闭按钮文本 | `string`  | —         | 否   |
| effect      | 主题样式           | `light` / `dark`    | `'light'` | 否   |
| onClose      | 关闭 Alert 事件           | `Function`    | — | 否   |

## z-crud删除相关事件

| 事件名 | 说明                                                        | 类型       |
| :----- | :---------------------------------------------------------- | :--------- |
| operate-delete | 删除表格数据 | `Function` |

## z-crud删除相关插槽

| 插槽名           | 说明                                                   |
| :--------------- | :----------------------------------------------------- |
| alert           | 选中数据时表格顶部固定提示内容 |
