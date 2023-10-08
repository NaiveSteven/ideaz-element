# FilterForm 筛选表单

筛选表单，基于`z-form`封装

:::tip

1. 如果表单项组件支持`placeholder`、`clearable`、`filterable`等属性，会被默认配置
2. 表单响应式默认配置为`{ xl: 6, lg: 8, md: 8, sm: 12, xs: 24 }`
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
