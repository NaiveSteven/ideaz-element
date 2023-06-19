# FilterForm 筛选表单

常用的操作按钮。

## 基础用法

基础的按钮用法。

:::demo 使用 `type`、`plain`、`round` 和 `circle` 属性来定义 Button 的样式。

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const cFormRef = ref()
const formModel = ref({
  activeName: '',
  activeArea: '',
  activeTime: [],
})

const optionsConfig = {
  activeArea: [
    { label: '区域1', value: '1' },
    { label: '区域2', value: '2' },
  ],
}

const columns = [
  {
    type: 'input',
    field: 'activeName',
    modifier: 'trim',
    label: '活动名称',
    onInput: (val) => {
      console.log(val, 'input event')
    },
    onChange: (val) => {
      console.log(val, 'change event')
    },
  },
  {
    type: 'select',
    field: 'activeArea',
    label: '活动区域',
    onChange: (val) => {
      console.log(val, 'change event')
    },
    onFocus: () => {
      console.log('focus event')
    },
  },
  {
    type: 'datepicker',
    field: 'activeTime',
    label: '活动时间',
    attrs: {
      type: 'daterange',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      format: 'MM-dd',
      valueFormat: 'MM-dd',
    },
    onChange: (val) => {
      console.log(val, 'change event')
    },
  },
  {
    type: 'input',
    field: 'aa',
    label: '测试'
  }
]

const reset = () => {
  cFormRef.value.resetFields()
}

const submit = () => {
  cFormRef.value.validate((valid: boolean) => {
    if (valid) {
      alert('submit!')
      console.log(formModel.value, 'config.formModel')
    }
    else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<template>
  <z-filter-form
    ref="cFormRef"
    :form-model="formModel"
    :options="optionsConfig"
    :columns="columns"
    size="small"
    label-width="80px"
  >
    <template #111>
      <div>asdf</div>
    </template>
  </z-filter-form>
</template>
```
