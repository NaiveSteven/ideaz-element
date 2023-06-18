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

const formConfig = {
  labelWidth: '80px',
  size: 'small',
  rules: {
    activeName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
  },
}

const columns = [
  {
    type: 'input',
    prop: 'activeName',
    modifier: 'trim',
    label: '活动名称',
    on: {
      input: (val) => {
        console.log(val, 'input event')
      },
      change: (val) => {
        console.log(val, 'change event')
      },
    },
  },
  {
    type: 'select',
    prop: 'activeArea',
    label: '活动区域',
    on: {
      change: (val) => {
        console.log(val, 'change event')
      },
      focus: () => {
        console.log('focus event')
      },
      // focus: () => {}
    },
  },
  {
    type: 'datepicker',
    prop: 'activeTime',
    label: '活动时间',
    attrs: {
      type: 'daterange',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      format: 'MM-dd',
      valueFormat: 'MM-dd',
    },
    on: {
      change: (val) => {
        console.log(val, 'change event')
      },
    },
  },
  {
    type: 'input',
    prop: 'aa',
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
    :form-config="formConfig"
    :options="optionsConfig"
    :columns="columns"
  >
    <template #111>
      <div>asdf</div>
    </template>
  </z-filter-form>
</template>
```
