# Crud 增删改查

> `z-crud`组件新增编辑表单部分功能介绍

## 基础用法

配置`column`的`add`或`edit`字段，可以实现新增或编辑表单的配置。

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
    add: {
      component: 'input',
      field: 'name',
      label: '姓名',
      required: true,
    },
    edit: {
      component: 'input',
      field: 'name',
      label: '姓名',
      required: true,
    },
  },
  {
    prop: 'sex',
    label: '性别',
    add: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
    edit: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    add: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
    edit: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
  },
  {
    prop: 'date',
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
  searchApi: mockApi,
  addApi: commonApi,
  editApi: commonApi
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
          date: '2020-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          date: '2012-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          date: '2018-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
          age: 28,
          date: '2028-01-01',
          time: ['2020-01-01', '2020-01-02']
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
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :detail="false"
    :search="searchFormConfig"
    :request="request"
  />
</template>
```

:::

配置`add`和`edit`的`columns`字段，可以实现新增和编辑表单的配置。

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
    prop: 'date',
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

const addFormConfig = ref({
  columns: [
    {
      component: 'input',
      label: '姓名新增',
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

const editFormConfig = ref({
  columns: [
    {
      component: 'input',
      label: '姓名编辑',
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
  searchApi: mockApi,
  addApi: commonApi,
  editApi: commonApi
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
          date: '2020-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          date: '2012-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          date: '2018-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
          age: 28,
          date: '2028-01-01',
          time: ['2020-01-01', '2020-01-02']
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
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :search="searchFormConfig"
    :request="request"
    :detail="false"
    :add="addFormConfig"
    :edit="editFormConfig"
  />
</template>
```

:::

配置`form`的`columns`字段，可以同时实现新增和编辑表单的配置，但也会同时配置查询和详情信息，可以配置`search`和`detail`为`false`来关闭。

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
    prop: 'date',
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
  searchApi: mockApi,
  addApi: commonApi,
  editApi: commonApi
})

const formConfig = ref({
  columns: [
    {
      component: 'input',
      field: 'name',
      label: '姓名',
      required: true,
    },
    {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
    {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
  ]
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
          date: '2020-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          date: '2012-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          date: '2018-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
          age: 28,
          date: '2028-01-01',
          time: ['2020-01-01', '2020-01-02']
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
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :search="searchFormConfig"
    :form="formConfig"
    :request="request"
    :detail="false"
  />
</template>
```

:::

配置`column`项的`form`字段，可以实现新增、编辑表单的配置，但会同时配置查询表单，可以设置`search`为`false`关闭。

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
      field: 'name',
      label: '姓名',
      required: true,
    },
  },
  {
    prop: 'sex',
    label: '性别',
    form: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    form: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
    search: false
  },
  {
    prop: 'date',
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
  addApi: commonApi,
  editApi: commonApi
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
          date: '2020-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          date: '2012-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          date: '2018-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
          age: 28,
          date: '2028-01-01',
          time: ['2020-01-01', '2020-01-02']
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
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :detail="false"
    :request="request"
  />
</template>
```

:::

## 确认接口

配置`request`的`addApi`和`editApi`。

`editApi`会多传一个`rowKey`参数，默认为`id`。

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
      field: 'name',
      label: '姓名',
      required: true,
    },
  },
  {
    prop: 'sex',
    label: '性别',
    form: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    form: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
    search: false
  },
  {
    prop: 'date',
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
  addApi: commonApi,
  editApi: commonApi
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
          date: '2020-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          date: '2012-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          date: '2018-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
          age: 28,
          date: '2028-01-01',
          time: ['2020-01-01', '2020-01-02']
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
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :detail="false"
    :request="request"
  />
</template>
```

:::

如果新增和编辑接口相同，可以配置`submitApi`，编辑的时候也会带上`rowKey`。

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
      field: 'name',
      label: '姓名',
      required: true,
    },
  },
  {
    prop: 'sex',
    label: '性别',
    form: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    form: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
    search: false
  },
  {
    prop: 'date',
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
  submitApi: commonApi,
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
          date: '2020-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          date: '2012-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          date: '2018-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
          age: 28,
          date: '2028-01-01',
          time: ['2020-01-01', '2020-01-02']
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
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :detail="false"
    :request="request"
  />
</template>
```

:::

## 编辑详情数据

配置`request`的`editDetailApi`可以实现编辑弹窗默认数据从接口中获取。

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
      field: 'name',
      label: '姓名',
      required: true,
    },
  },
  {
    prop: 'sex',
    label: '性别',
    form: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    form: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
    search: false
  },
  {
    prop: 'date',
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
  addApi: commonApi,
  editApi: commonApi,
  editDetailApi: detailApi,
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
          date: '2020-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          date: '2012-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          date: '2018-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
          age: 28,
          date: '2028-01-01',
          time: ['2020-01-01', '2020-01-02']
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

function detailApi(params) {
  console.log(params, 'commonApi params')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          id: 1,
          name: 'Steven',
          sex: 'male',
          age: 22,
          time: ['2020-01-01', '2020-01-03']
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
    :detail="false"
    :request="request"
  />
</template>
```

:::

## 详情数据二次处理

如果需要对接口返回的详情数据二次梳理，可以配置`request.transformEditDetail`。

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
      field: 'name',
      label: '姓名',
      required: true,
    },
  },
  {
    prop: 'sex',
    label: '性别',
    form: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    form: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
    search: false
  },
  {
    prop: 'date',
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
  addApi: commonApi,
  editApi: commonApi,
  editDetailApi: detailApi,
  transformEditDetail: (data) => {
    return {
      ...data,
      time: []
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
          date: '2020-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          date: '2012-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          date: '2018-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
          age: 28,
          date: '2028-01-01',
          time: ['2020-01-01', '2020-01-02']
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

function detailApi(params) {
  console.log(params, 'commonApi params')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          id: 1,
          name: 'Steven',
          sex: 'male',
          age: 22,
          time: ['2020-01-01', '2020-01-03']
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
    :detail="false"
    :request="request"
  />
</template>
```

:::

## 自定义参数

配置`request`的`addParams`和`editParams`可以自定义新增和编辑接口的参数。

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
      field: 'name',
      label: '姓名',
      required: true,
    },
  },
  {
    prop: 'sex',
    label: '性别',
    form: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    form: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
    search: false
  },
  {
    prop: 'date',
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
  addApi: commonApi,
  editApi: commonApi,
  addParams: ({ formData }) => {
    return {
      ...formData,
      field: 'test'
    }
  },
  editParams: ({ formData, rowData }) => {
    return {
      ...formData,
      id: rowData.id
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
          date: '2020-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          date: '2012-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          date: '2018-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
          age: 28,
          date: '2028-01-01',
          time: ['2020-01-01', '2020-01-02']
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
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :detail="false"
    :request="request"
  />
</template>
```

:::

提供`request.submitParams`统一配置新增和编辑接口参数。

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
      field: 'name',
      label: '姓名',
      required: true,
    },
  },
  {
    prop: 'sex',
    label: '性别',
    form: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    form: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
    search: false
  },
  {
    prop: 'date',
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
  addApi: commonApi,
  editApi: commonApi,
  submitParams: ({ formData, type, rowData }) => {
    if (type === 'add') {
      return {
        ...formData,
        field: 'test'
      }
    }
    return {
      ...formData,
      id: rowData.id
    }
  },
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
          date: '2020-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          date: '2012-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          date: '2018-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
          age: 28,
          date: '2028-01-01',
          time: ['2020-01-01', '2020-01-02']
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
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :detail="false"
    :request="request"
  />
</template>
```

:::

## 自定义确认

`request`不配置`submitApi`、`addApi`和`editApi`，此时会有`operate-submit`事件。

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
      field: 'name',
      label: '姓名',
      required: true,
    },
  },
  {
    prop: 'sex',
    label: '性别',
    form: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    form: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
    search: false
  },
  {
    prop: 'date',
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
          date: '2020-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          date: '2012-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          date: '2018-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
          age: 28,
          date: '2028-01-01',
          time: ['2020-01-01', '2020-01-02']
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

const handleSubmit = ({ done, form, formData, type, confirmButtonLoading, rowData, invalidFields }) => {
  confirmButtonLoading.value = true
  console.log(form, formData, type, invalidFields, rowData)
  done()
  confirmButtonLoading.value = false
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
    :detail="false"
    :request="request"
    @operate-submit="handleSubmit"
  />
</template>
```

:::

## 表单属性

使用`add`和`edit`对象配置表单属性。

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
    add: {
      component: 'input',
      field: 'name',
      label: '姓名',
      required: true,
    },
    edit: {
      component: 'input',
      field: 'name',
      label: '姓名',
      required: true,
    },
  },
  {
    prop: 'sex',
    label: '性别',
    add: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
    edit: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    add: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
    edit: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
  },
  {
    prop: 'date',
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

const addFormConfig = ref({
  labelWidth: '120px',
  labelPosition: 'top'
})

const editFormConfig = ref({
  labelWidth: '80px',
  labelPosition: 'left'
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
  searchApi: mockApi,
  addApi: commonApi,
  editApi: commonApi
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
          date: '2020-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          date: '2012-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          date: '2018-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
          age: 28,
          date: '2028-01-01',
          time: ['2020-01-01', '2020-01-02']
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
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :search="searchFormConfig"
    :add="addFormConfig"
    :edit="editFormConfig"
    :detail="false"
    :request="request"
  />
</template>
```

:::

## 弹窗属性

可以使用`dialog`对象统一配置新增和编辑弹窗属性，也可以使用`add.dialog`和`edit.dialog`分别配置弹窗属性。

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
    add: {
      component: 'input',
      field: 'name',
      label: '姓名',
      required: true,
    },
    edit: {
      component: 'input',
      field: 'name',
      label: '姓名',
      required: true,
    },
  },
  {
    prop: 'sex',
    label: '性别',
    add: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
    edit: {
      component: 'select',
      field: 'sex',
      label: '性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    add: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
    edit: {
      component: 'datepicker',
      field: 'time',
      label: '出生日期',
      fieldProps: {
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
      },
    },
  },
  {
    prop: 'date',
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

const addFormConfig = ref({
  labelWidth: '120px',
  labelPosition: 'top',
  dialog: {
    title: '新增弹窗'
  }
})

const editFormConfig = ref({
  labelWidth: '80px',
  labelPosition: 'left',
  dialog: {
    title: '编辑弹窗'
  }
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
  searchApi: mockApi,
  addApi: commonApi,
  editApi: commonApi
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
          date: '2020-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 2,
          name: 'Helen',
          sex: 'male',
          age: 12,
          date: '2012-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          date: '2018-01-01',
          time: ['2020-01-01', '2020-01-02']
        },
        {
          id: 4,
          name: 'Jack',
          sex: 'male',
          age: 28,
          date: '2028-01-01',
          time: ['2020-01-01', '2020-01-02']
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
    v-model:pagination="pagination"
    v-model:data="tableData"
    v-model:formData="formData"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :search="searchFormConfig"
    :add="addFormConfig"
    :edit="editFormConfig"
    :detail="false"
    :request="request"
  />
</template>
```

:::

## z-crud详情相关属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| detail                      | 查询表单属性配置                                  | `boolean` / `object`             |   `true`       |
| form                      | 查询、新增、编辑和查看表单属性配置                                  |  `object`             |   —       |
| action                      | 操作项是否展示（内置的删除、编辑等按钮）                                  | `boolean`             |   `true`       |
| edit                      | 编辑配置                                  | `boolean` / `object`             |   `true`       |
| add                      | 新增配置                                  | `boolean` / `object`             |   `true`       |
| delete                      | 删除配置                                  | `boolean` / `object`             |
| search                      | 查询配置                                  | `boolean` / `object`             |  `true`       |
| request                      | 接口配置                                  | `object`             |   —       |

## add和edit属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| dialog                          | `el-dialog`组件属性                                                 | `object`             | —      |
| rules                          | 表单验证规则                                                 | `object`             | —      |
| columns                          | 表单项                                                 | `array`             | —      |
| options                          | 表单选择项数据源                                                 | `object`             | —      |
| colon                          | 表单项冒号                                                 | `boolean`             | false      |
| align                          |  `flex`布局下的垂直排列方式                                                 | `top` / `middle` /`bottom`            | —      |
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
| scroll-to-error                | 当校验失败时，滚动到第一个错误表单项                         | `boolean`            | false  |
| scroll-into-view-options | 当校验有失败结果时，滚动到第一个失败的表单项目               | `object` / `boolean` | —      |

## form属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| rules                          | 表单验证规则                                                 | `object`             | —      |
| columns                          | 表单项                                                 | `array`             | —      |
| options                          | 表单选择项数据源                                                 | `object`             | —      |
| colon                          | 表单项冒号                                                 | `boolean`             | false      |
| align                          |  `flex`布局下的垂直排列方式                                                 | `top` / `middle` /`bottom`            | —      |
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
| scroll-to-error                | 当校验失败时，滚动到第一个错误表单项                         | `boolean`            | false  |
| scroll-into-view-options | 当校验有失败结果时，滚动到第一个失败的表单项目               | `object` / `boolean` | —      |

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

## z-crud新增编辑相关事件

| 事件名 | 说明                                                        | 类型       |
| :----- | :---------------------------------------------------------- | :--------- |
| operate-submit | 弹窗确认 | `Function` |
