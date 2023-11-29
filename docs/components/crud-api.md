# Crud 增删改查

> 集成`z-form`和`z-table`组件，实现增删改查功能。

## 表格接口

配置`request`中`searchApi`、`deleteApi`、`addApi`、`editApi`可以直接实现表格数据获取、删除数据、新增和编辑数据操作。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

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
  />
</template>
```

:::

## 表格数据接口配置

配置`request`中`alias`字段可以自定义数据路径，默认为`data.list`和`data.total`。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

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
const request = ref({
  searchApi: getTableData,
  deleteApi: commonApi,
  submitApi: commonApi,
  detailApi,
  alias: {
    list: 'result.data',
    total: 'result.all'
  }
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
        result: {
          page: 1,
          pageSize: 2,
          all: 4,
          data: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize)
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
  console.log(params, 'detailApi params')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          id: 3,
          name: 'Nancy',
          sex: 'female',
          age: 18,
          time: '2018-01-01'
        },
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
  />
</template>
```

:::

支持传入函数自定义返回。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

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
const request = ref({
  searchApi: getTableData,
  deleteApi: commonApi,
  submitApi: commonApi,
  alias: {
    list: res => res.result.data,
    total: res => res.result.all
  }
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
        result: {
          page: 1,
          pageSize: 2,
          all: 4,
          data: data.slice((pagination.value.page - 1) * pagination.value.pageSize, pagination.value.page * pagination.value.pageSize)
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
  />
</template>
```

:::

## 表格数据接口参数

支持通过`request.params`自定义表格数据接口参数。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

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
const request = ref({
  searchApi: getTableData,
  deleteApi: commonApi,
  submitApi: commonApi,
  params: (data) => {
    return {
      ...data,
      mock: 'true'
    }
  }
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
  />
</template>
```

:::

## 表格数据方法自定义

支持通过`request.searchFunc`自定义表格数据方法。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

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
const tableData = ref([])
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 0
})
const loading = ref(false)
const formData = ref({})
const request = ref({
  deleteApi: commonApi,
  submitApi: commonApi,
  searchFunc: async ({ params }) => {
    loading.value = true
    try {
      console.log(params, 'params')
      const res = await getData(params)
      tableData.value = res.data.list
      pagination.value.total = res.data.total
    }
    catch {

    }
    loading.value = false
  }
})
const options = {
  sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }]
}

function getData(params) {
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
  />
</template>
```

:::

## 表格数据处理

支持通过`request.tableData`二次处理表格数据。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

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
const tableData = ref([])
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 0
})
const loading = ref(false)
const formData = ref({})
const request = ref({
  searchApi: getData,
  deleteApi: commonApi,
  submitApi: commonApi,
  tableData: (data) => {
    return data.map((item, index) => ({
      ...item,
      name: item.name + index
    }))
  }
})
const options = {
  sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }]
}

function getData(params) {
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
  />
</template>
```

:::

## 回调

支持通过`request.beforeData`和`request.afterData`在获取表格数据前后做些事情。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

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
const tableData = ref([])
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 0
})
const loading = ref(false)
const formData = ref({})
const request = ref({
  searchApi: getData,
  deleteApi: commonApi,
  submitApi: commonApi,
  beforeData: async () => {
    await delay(100)
    console.log('beforeData')
  },
  afterData: (res) => {
    console.log(res, 'afterData')
  }
})
const options = {
  sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }]
}

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

function getData(params) {
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
  />
</template>
```

:::

## 内部方法

支持通过表格外部再次调用`getTableData`方法。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

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
const tableData = ref([])
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 0
})
const loading = ref(false)
const formData = ref({})
const request = ref({
  searchApi: getData,
  deleteApi: commonApi,
  submitApi: commonApi,
})
const crud = ref()
const options = {
  sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }]
}

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

function getData(params) {
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

const handleClick = () => {
  crud.value.getTableData()
}
</script>

<template>
  <el-button @click="handleClick">
    click
  </el-button>
  <z-crud
    ref="crud"
    v-model:formData="formData"
    v-model:data="tableData"
    v-model:pagination="pagination"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :request="request"
  />
</template>
```

:::

## 操作自定义

如需要自定义操作，可以使用`refresh`、`search`、`reset`、`submit`、`delete`等事件实现刷新、查询、重置和删除等操作。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const columns = ref([
  {
    prop: 'name',
    label: '姓名',
    form: {
      component: 'input',
      label: '姓名',
      field: 'name',
      required: true
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
const tableData = ref([])
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 0
})
const loading = ref(false)
const formData = ref({})
const dialog = ref({
  confirmButtonLoading: false
})

const options = {
  sex: [{ label: 'male', value: 'male' }, { label: 'female', value: 'female' }]
}

function getData(params) {
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
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        msg: 'success',
        code: 200
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
    const res = await getData(params)
    tableData.value = res.data.list
    pagination.value.total = res.data.total
  }
  catch (error) {
    console.log(error)
  }
  loading.value = false
}

const handleRefresh = (val) => {
  pagination.value.page = val.page
  pagination.value.pageSize = val.pageSize
  getTableData()
}

const handleSearch = () => {
  pagination.value.page = 1
  getTableData()
}

const handleDelete = () => {
  window.ZDialogTip({
    type: 'warning',
    message: '确定删除该条数据吗？',
    title: '警告',
    onConfirm: ({ done, confirmButtonLoading }) => {
      confirmButtonLoading.value = true
      done()
      confirmButtonLoading.value = false
    },
  })
}

const handleSubmit = async ({ formData, type, rowData, form, done, isValid }) => {
  if (isValid) {
    dialog.value.confirmButtonLoading = true
    try {
      const params = {
        ...formData
      }
      console.log(params, rowData, 'params')
      if (type === 'edit')
        await commonApi({ ...params, id: rowData.id })
      else
        await commonApi(params)
      dialog.value.confirmButtonLoading = false
      done()
      getTableData()
    }
    catch {

    }
    dialog.value.confirmButtonLoading = false
  }
}

getTableData()
</script>

<template>
  <z-crud
    v-model:formData="formData"
    v-model:data="tableData"
    v-model:pagination="pagination"
    v-model:loading="loading"
    :options="options"
    :columns="columns"
    :dialog="dialog"
    @refresh="handleRefresh"
    @reset="handleSearch"
    @search="handleSearch"
    @submit="handleSubmit"
    @delete="handleDelete"
  />
</template>
```

:::

## request 属性

| 属性名                  | 说明                                                         | 类型                   | 默认  |
| :---------------------- | :----------------------------------------------------------- | :--------------------- | :---- |
| searchApi   | 表格数据接口                                              | `Function`              | —     |
| deleteApi   | 删除接口                                              | `Function`              | —     |
| submitApi   | 新增编辑接口                                              | `Function`              | —     |
| addApi   | 新增接口                                              | `Function`              | —     |
| editApi   | 编辑接口                                              | `Function`              | —     |
| detailApi   | 详情接口                                              | `Function`              | —     |
| params   | 表格数据接口参数自定义                                              | `(params) => object`              | —     |
| beforeData   | 表格数据接口调用前的回调                                              | `Function`              | —     |
| afterData   | 表格数据接口调用后的回调                                              | `(res) => void`              | —     |
| searchFunc   | 自定义表格数据方法                                              | `({params}) => void`              | —     |
| tableData   | 表格数据二次处理                                              | `(data) => array`              | —     |
| alias   | 表格数据路径自定义                                              | `object`              | —     |

## alias 属性

| 属性名                  | 说明                                                         | 类型                   | 默认  |
| :---------------------- | :----------------------------------------------------------- | :--------------------- | :---- |
| list   | 表格数据路径                                              | `string` / `(res) => array`              | `data.list`     |
| total   | 表格数据总数路径                                             | `string` / `(res) => number`              | `data.total`     |
