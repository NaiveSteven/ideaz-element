# FilterForm 筛选表单

筛选表单，基于`z-form`封装

:::tip

1. 如果表单项组件支持`placeholder`、`clearable`、`filterable`等属性，会被默认配置
2. 表单响应式默认配置为`{ xl: 6, lg: 8, md: 8, sm: 12, xs: 24 }`
:::

## 基础用法

+ 传入`columns`定义表单，`modelValue`为表单数据，`options`为数据配置项
+ 事件使用`on`+`事件名`
+ 表单项组件属性直接在`column`项中配置即可
+ `FormItem`组件属性（表单项装饰组件）属性配置在`formItemProps`字段中，有些字段为了方便使用，直接配置在`column`项中也可生效（如：`label`、`required`、`message`等）

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  time: [],
})

const options = {
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = [
  {
    component: 'input',
    field: 'name',
    label: '名字',
    onInput: (val) => {
      console.log(val, 'input event')
    },
    onChange: (val) => {
      console.log(val, 'change event')
    },
  },
  {
    component: 'select',
    field: 'sex',
    label: '性别',
    onChange: (val) => {
      console.log(val, 'change event')
    },
    onFocus: () => {
      console.log('focus event')
    },
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
    onChange: (val) => {
      console.log(val, 'change event')
    },
  },
]

const handleSearch = () => {
  console.log(formData.value, 'search')
}

const handleReset = () => {
  console.log(formData.value, 'reset')
}
</script>

<template>
  <z-filter-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    size="small"
    label-width="80px"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>
```

:::

## 校验

`columns`表单项中添加`required`字段，或者`formItemProps`中设置`required`字段，即可设置必填，校验信息会根据`label`自动生成也可自定义。
`z-filter-form`传入`rules`字段，可以定义校验规则。

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  time: [],
})

const options = {
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const rules = {
  time: [{ required: true, message: '出生日期必选' }],
}

const columns = [
  {
    component: 'input',
    field: 'name',
    label: '姓名',
    required: true,
    message: '请将姓名填写完整'
  },
  {
    component: 'select',
    field: 'sex',
    formItemProps: {
      required: true,
      label: '性别',
    }
  },
  {
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
]
</script>

<template>
  <z-filter-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    :rules="rules"
    size="small"
    label-width="80px"
  />
</template>
```

:::

## 表单项自定义

我们可以使用`slot`或`render`自定义表单项内容，

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  age: '',
  height: '身高自定义'
})

const columns = [
  {
    component: 'input',
    field: 'name',
    label: '姓名',
  },
  {
    slot: 'ageSlot',
    label: '年龄'
  },
  {
    render: () => h('span', {}, formData.value.height),
    label: '身高'
  },
]
</script>

<template>
  <z-filter-form
    ref="formRef"
    v-model="formData"
    :columns="columns"
    size="small"
    label-width="80px"
  >
    <template #ageSlot>
      <el-input v-model="formData.age" placeholder="请输入年龄" clearable />
    </template>
  </z-filter-form>
</template>
```

:::

## label、error自定义

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  time: [],
})

const options = {
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = [
  {
    component: 'input',
    field: 'name',
    label: () => h('span', {}, '姓名'),
    required: true,
    error: 'error message',
  },
  {
    component: 'select',
    field: 'sex',
    label: 'labelSlot',
    required: true,
    error: h('span', {}, 'errorSlot')
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
  }
]
</script>

<template>
  <z-filter-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    size="small"
    label-width="80px"
  >
    <template #labelSlot>
      <span>性别</span>
    </template>
  </z-filter-form>
</template>
```

:::

## 联动

使用`hide`配置表单项显隐

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  time: [],
})

const options = {
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = [
  {
    component: 'input',
    field: 'name',
    label: '姓名',
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
    hide: () => !formData.value.sex,
    fieldProps: {
      type: 'daterange',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
    },
  }
]
</script>

<template>
  <z-filter-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    size="small"
    label-width="80px"
  />
</template>
```

:::

## 操作按钮

按钮操作会有`search`和`reset`事件，已经内置重置操作和校验操作

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  time: [],
})

const options = {
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = [
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
    required: true
  },
  {
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
]

const handleSearch = () => {
  console.log(formData.value, 'formData')
}

const handleReset = () => {
  console.log(formData.value, 'formData')
}
</script>

<template>
  <z-filter-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    size="small"
    label-width="80px"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>
```

:::

设置`searchButtonLabel`、`resetButtonLabel`、`searchButtonLoading`、`resetButtonLoading`来设置按钮文字、加载状态。

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  time: [],
})
const searchButtonLoading = ref(false)
const resetButtonLoading = ref(false)

const options = {
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = [
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
    required: true
  },
  {
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
]

const handleSearch = async () => {
  searchButtonLoading.value = true
  await delay(200)
  searchButtonLoading.value = false
  console.log(formData.value, 'formData')
}

const handleReset = async () => {
  resetButtonLoading.value = true
  await delay(200)
  resetButtonLoading.value = false
  console.log(formData.value, 'formData')
}

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
</script>

<template>
  <z-filter-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    size="small"
    label-width="80px"
    search-button-label="点击查询"
    reset-button-label="点击重置"
    :search-button-loading="searchLoading"
    :reset-button-loading="resetLoading"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>
```

:::

设置`searchButtonProps`、`resetButtonProps`来设置按钮文字、加载状态。

:::demo

```vue
<script lang="ts" setup>
import { reactive, ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  time: [],
})
const searchButtonProps = reactive({
  loading: false,
  label: '点击查询',
  type: 'primary'
})
const resetButtonProps = reactive({
  loading: false,
  label: '点击重置',
  type: 'danger'
})

const options = {
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = [
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
    required: true
  },
  {
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
]

const handleSearch = async () => {
  searchButtonProps.loading = true
  await delay(200)
  searchButtonProps.loading = false
  console.log(formData.value, 'formData')
}

const handleReset = async () => {
  resetButtonProps.loading = true
  await delay(200)
  resetButtonProps.loading = false
  console.log(formData.value, 'formData')
}

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
</script>

<template>
  <z-filter-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    size="small"
    label-width="80px"
    :search-button-props="searchButtonProps"
    :reset-button-props="resetButtonProps"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>
```

:::

## 默认收起

配置`collapsed`为`false`，表单会默认收起

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  time: [],
})

const options = {
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = [
  {
    component: 'input',
    field: 'name',
    label: '姓名',
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
  }
]
</script>

<template>
  <z-filter-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    size="small"
    label-width="80px"
    :collapsed="false"
  />
</template>
```

:::
