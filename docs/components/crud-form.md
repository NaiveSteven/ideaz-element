# Crud 增删改查

> `z-crud`组件表单部分功能介绍

## 基础用法

配置`column`项的`search`生成表单项。

+ `label`和`field`可以不传，默认取`prop`和`label`
+ 组件默认配置`clearable`、`placeholder`和`filterable`
+ `search`属性的具体配置可参考`z-form`的`column`项
+ 表单布局固定为`{ xs: 24, sm: 12, md: 8, lg: 8, xl: 6 }`

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
    }
  },
  {
    prop: 'sex',
    label: '性别',
    search: {
      component: 'select',
      label: '性别',
      field: 'sex'
    }
  },
  {
    prop: 'age',
    label: '年龄',
    search: {
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
          list: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
        }
      })
    }, 100)
  })
}

const getTableData = async () => {
  loading.value = true
  try {
    const params = {
      ...pagination.value, ...formData.value
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

const handleSearch = () => {
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
    :action="false"
    @refresh="getTableData"
    @search="handleSearch"
    @reset="handleSearch"
  />
</template>
```

:::

配置`search`的`columns`字段也能达到相同的效果，如果你想配置表单`labelWidth`等其他属性，也可以放入`search`中

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

const searchFormConfig = ref({
  labelWith: '80px',
  columns: [
    {
      component: 'input',
      label: '姓名',
      field: 'name'
    },
    {
      component: 'select',
      label: '性别',
      field: 'sex'
    },
    {
      component: 'input',
      label: '年龄',
      field: 'age'
    },
  ]
})

const options = {
  sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }]
}
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 4,
})
const request = ref({
  searchApi: mockApi
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
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :search="searchFormConfig"
    :action="false"
    :request="request"
  />
</template>
```

:::

配置`column`的`form`也能生成查询表单项，但同时也会生成新增、编辑和查询表单项，如不需要，可配置`add`和`edit`字段为`false`。

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
    add: false,
    edit: false,
    form: {
      component: 'input',
      label: '姓名',
      field: 'name'
    }
  },
  {
    prop: 'sex',
    label: '性别',
    add: false,
    edit: false,
    form: {
      component: 'select',
      label: '性别',
      field: 'sex'
    }
  },
  {
    prop: 'age',
    label: '年龄',
    add: false,
    edit: false,
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
          list: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize),
        }
      })
    }, 100)
  })
}

const getTableData = async () => {
  loading.value = true
  try {
    const params = {
      ...pagination.value, ...formData.value
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

const handleSearch = () => {
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
    @refresh="getTableData"
    @search="handleSearch"
    @reset="handleSearch"
  />
</template>
```

:::

## 校验

+ `form`字段中添加`required`字段，或者`formItemProps`中设置`required`字段，即可设置必填，校验信息会根据`label`自动生成也可自定义。
+ `z-crud`传入的`search`对象配置`rules`字段，可以定义表单校验规则。
+ `form`字段中表单项配置`rules`，可以定义当前表单项校验规则。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const loading = ref(false)
const formData = ref({
  name: '',
  sex: '',
  time: [],
})
const tableData = ref([])
const searchFormConfig = ref({
  labelWidth: '80px',
  rules: {
    time: [{ required: true, message: '出生日期必选' }],
  }
})

const columns = ref([
  {
    prop: 'name',
    label: '姓名',
    search: {
      component: 'input',
      field: 'name',
      label: '姓名',
      required: true,
      message: '请将姓名填写完整'
    },
  },
  {
    prop: 'sex',
    label: '性别',
    search: {
      component: 'select',
      field: 'sex',
      formItemProps: {
        required: true,
        label: '性别',
      }
    },
  },
  {
    prop: 'age',
    label: '年龄',
    search: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      rules: {
        required: true,
        message: '出生日期必选',
      },
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
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
  searchApi: mockApi
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
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :action="false"
    :search="searchFormConfig"
    :request="request"
  />
</template>
```

:::

## 表单项自定义

我们可以使用`slot`或`render`自定义表单项内容。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const loading = ref(false)
const formData = ref({
  name: '',
  age: '',
  height: '身高自定义'
})
const tableData = ref([])

const columns = ref([
  {
    prop: 'name',
    label: '姓名',
    search: {
      component: 'input',
      field: 'name',
      label: '姓名',
    },
  },
  {
    prop: 'sex',
    label: '性别',
    search: {
      slot: 'ageSlot',
      label: '年龄'
    },
  },
  {
    prop: 'age',
    label: '年龄',
    search: {
      render: () => h('span', {}, formData.value.height),
      label: '身高'
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
  searchApi: mockApi
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
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :search="{ size: 'default' }"
    :action="false"
    :request="request"
  >
    <template #ageSlot>
      <el-input v-model="formData.age" placeholder="请输入年龄" clearable />
    </template>
  </z-crud>
</template>
```

:::

## label、error自定义

`label`和`error`支持传入字符串、`render`函数或`拼接Slot的字符串`

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const loading = ref(false)
const formData = ref({
  name: '',
  sex: '',
  time: [],
})
const tableData = ref([])

const columns = ref([
  {
    prop: 'name',
    label: '姓名',
    search: {
      component: 'input',
      field: 'name',
      label: () => h('span', {}, '姓名'),
      required: true,
      error: 'error message',
    },
  },
  {
    prop: 'sex',
    label: '性别',
    search: {
      component: 'select',
      field: 'sex',
      label: 'labelSlot',
      required: true,
      error: h('span', {}, 'errorSlot')
    },
  },
  {
    prop: 'age',
    label: '年龄',
    search: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      required: true,
      error: 'errorSlot',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    }
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
  searchApi: mockApi
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
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :action="false"
    :search="{ labelWidth: '80px' }"
    :request="request"
  >
    <template #labelSlot>
      <span>性别</span>
    </template>
    <template #errorSlot>
      <span>出生日期必填</span>
    </template>
  </z-crud>
</template>
```

:::

## 联动

使用`hide`配置表单项显隐

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const loading = ref(false)
const formData = ref({
  name: '',
  sex: '',
  time: [],
})
const tableData = ref([])

const columns = ref([
  {
    prop: 'name',
    label: '姓名',
    search: {
      component: 'input',
      field: 'name',
      label: '姓名',
    },
  },
  {
    prop: 'sex',
    label: '性别',
    search: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    search: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      hide: () => !formData.value.sex,
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
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
const request = ref({
  searchApi: mockApi
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
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :search="{ labelWidth: '80px' }"
    :action="false"
    :request="request"
  />
</template>
```

:::

## 操作按钮

按钮操作会有`search`和`reset`事件，已经内置重置操作和校验操作。支持自定义。

详情请查看`z-filter-form`组件文档。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const loading = ref(false)
const formData = ref({
  name: '',
  sex: '',
  time: [],
})
const tableData = ref([])

const columns = ref([
  {
    prop: 'name',
    label: '姓名',
    search: {
      component: 'input',
      field: 'name',
      label: '姓名',
      required: true,
    },
  },
  {
    prop: 'sex',
    label: '性别',
    search: {
      component: 'select',
      field: 'sex',
      label: '性别',
      required: true
    },
  },
  {
    prop: 'age',
    label: '年龄',
    search: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      required: true,
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
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
  searchApi: mockApi
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

const handleSearch = () => {
  console.log(formData.value, 'formData')
}

const handleReset = () => {
  console.log(formData.value, 'formData')
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
    :search="{ labelWidth: '80px' }"
    :action="false"
    :request="request"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>
```

:::

## 默认收起

配置`search`的`collapsed`为`false`，表单会默认收起。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const loading = ref(false)
const formData = ref({
  name: '',
  sex: '',
  time: [],
})
const tableData = ref([])

const columns = ref([
  {
    prop: 'name',
    label: '姓名',
    search: {
      component: 'input',
      field: 'name',
      label: '姓名',
    },
  },
  {
    prop: 'sex',
    label: '性别',
    search: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    search: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
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
const request = ref({
  searchApi: mockApi
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
</script>

<template>
  <z-crud
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :search="{ labelWidth: '80px', collapsed: false }"
    :action="false"
    :request="request"
  />
</template>
```

:::

## z-crud表单相关属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| modelValue:formData                      | 查询表单数据                                  | `object`             |   —       |
| detail                      | 查询表单属性配置                                  | `boolean` / `object`             |   `true`       |
| form                      | 查询、新增、编辑和查看表单属性配置                                  |  `object`             |   —       |
| action                      | 操作项是否展示（内置的删除、编辑等按钮）                                  | `boolean`             |   `true`       |
| edit                      | 编辑配置                                  | `boolean` / `object`             |   `true`       |
| add                      | 新增配置                                  | `boolean` / `object`             |   `true`       |
| delete                      | 删除配置                                  | `boolean` / `object`             |
| search                      | 查询配置                                  | `boolean` / `object`             |  `true`       |
| request                      | 接口配置                                  | `object`             |   —       |

## search属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| collapsed                      | 表单默认展开收起                                  | `boolean`             |  `true`      |
| searchButtonProps                          | 查询按钮属性配置                                                 | `object`             | —      |
| searchButtonLabel                          | 查询按钮文案                                                 | `string`             | `查询`      |
| searchButtonLoading                          | 查询按钮加载状态                                                 | `boolean`             | —      |
| resetButtonProps                          | 重置按钮属性配置                                                 | `object`             | —      |
| resetButtonLabel                          | 重置按钮文案                                                 | `string`             | `重置`      |
| resetButtonLoading                          | 重置按钮加载状态                                                 | `boolean`             | —      |
| rules                          | 表单验证规则                                                 | `object`             | —      |
| label-position                 | 表单域标签的位置， 当设置为 `left` 或 `right` 时，则也需要设置 `label-width` 属性 | `enum`               | right  |
| label-width                    | 标签的长度，例如 `'50px'`。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 `auto`。 | `string` / `number`  | ''     |
| label-suffix                   | 表单域标签的后缀                                             | `string`             | ''     |
| hide-required-asterisk         | 是否隐藏必填字段标签旁边的红色星号。                         | `boolean`            | false  |
| require-asterisk-position      | 星号的位置。                                                 | `left` / `right`               | left   |
| show-message                   | 是否显示校验错误信息                                         | `boolean`            | true   |
| inline-message                 | 是否以行内形式展示校验信息                                   | `boolean`            | false  |
| status-icon                    | 是否在输入框中显示校验结果反馈图标                           | `boolean`            | false  |
| validate-on-rule-change        | 是否在 `rules` 属性改变后立即触发一次验证                    | `boolean`            | true   |
| size                           | 用于控制该表单内组件的尺寸                                   | `large` / `default` / `small`               | —      |
| disabled                       | 是否禁用该表单内的所有组件。 如果设置为 `true`, 它将覆盖内部组件的 `disabled` 属性 | `boolean`            | false  |

## z-crud查询表单方法

| 名称          | 说明                                                         | 类型       |
| :------------ | :----------------------------------------------------------- | :--------- |
| validate      | 对整个表单的内容进行验证。 接收一个回调函数，或返回 `Promise`。 | `Function` |
| validateField | 验证具体的某个字段。                                         | `Function` |
| resetFields   | 重置该表单项，将其值重置为初始值，并移除校验结果             | `Function` |
| scrollToField | 滚动到指定的字段                                             | `Function` |
| clearValidate | 清理某个字段的表单验证信息。                                 | `Function` |

## 表单项属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| component                      | 表单项组件                                  | `string` / `() => VNode`             |  —      |
| field                      | 字段名                                  | `string`             |  —      |
| fieldProps                      | `component`组件属性                                  | `object`             |  —      |
| detail                      | 详情项                                  | `object` / `boolean`             |  —      |
| add                      | 新增项                                  | `object` / `boolean`             |  —      |
| search                      |    查询项                               | `object` / `boolean`             |  —      |
| edit                      | 编辑项                                  | `object` / `boolean`             |  —      |
| formItemProps                      | `formItem`组件属性                                  | `object`             |  —      |
| label                      | 表单标签名                                  | `string` / `() => VNode`             |  —      |
| hide                      | 显隐                                  | `boolean` / `() => boolean`             |  —      |
| hideUseVShow                      | 使用`v-show`显隐                                  | `boolean` / `() => boolean`             |  —      |
| slot                      | 表单项自定义内容插槽                                  | `string`             |  —      |
| render                      | 表单项自定义内容render                                  | `() => VNode`             |  —      |
| required                      |  表单项是否必填                                 | `boolean`             |  —      |
| rules                      | 该表单项校验规则                                  | `boolean`             |  —      |
| error                      | 错误信息                                  | `string` / `() => VNode`             |  —      |
| tooltip                      | 提示信息                                  | `string` / `() => VNode`             |  —      |
| extra                      | 额外信息                                  | `string` / `() => VNode`             |  —      |

## formItemProps属性

| 属性名          | 说明                                                         | 类型                  | Default |
| :-------------- | :----------------------------------------------------------- | :-------------------- | :------ |
| tooltip           | 提示文案                                                     | `string` / `() => VNode`              | —       |
| extra           | 额外信息                                                     | `string` / `() => VNode`              | —       |
| colon           | 冒号                                                     | `boolean`              | —       |
| label           | 标签文本                                                     | `string` / `() => VNode`              | —       |
| label-width     | 标签宽度，例如 `'50px'`。 可以使用 `auto`。                  | `string` / `number`   | ''      |
| required        | 是否为必填项，如不设置，则会根据校验规则确认                 | `boolean`             | —       |
| rules           | 表单验证规则, 具体配置见[下表](https://element-plus.org/zh-CN/component/form.html#formitemrule), 更多内容可以参考[async-validator](https://github.com/yiminghe/async-validator) | `object`              | —       |
| error           | 表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息。 | `string` / `() => VNode`              | —       |
| show-message    | 是否显示校验错误信息                                         | `boolean`             | true    |
| inline-message  | 是否在行内显示校验信息                                       | `string` / `boolean`  | ''      |
| size            | 用于控制该表单域下组件的默认尺寸                             | `large` / `default` / `small`                | —       |
| for             | 和原生标签相同能力                                           | `string`              | —       |
| validate-status | formItem 校验的状态                                          | `error` / `validating` / `success`               | —       |

### z-crud查询表单相关事件

| 事件名 | 说明                                                        | 类型       |
| :----- | :---------------------------------------------------------- | :--------- |
| update:formData | 表单项数据 | `Function` |
| reset | 重置 | `Function` |
| search | 查询 | `Function` |
