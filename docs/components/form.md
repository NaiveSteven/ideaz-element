# Form 表单

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
    span: 8,
    label: '活动名称',
    onInput: (val) => {
      console.log(val, 'input event')
    },
    onChange: (val) => {
      console.log(val, 'change event')
    },
    rules: {
      required: true,
    }
  },
  {
    type: 'select',
    field: 'activeArea',
    span: 8,
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
    span: 8,
    label: '活动时间',
    fieldProps: {
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
  <z-form
    ref="cFormRef"
    :form-model="formModel"
    :options="optionsConfig"
    :columns="columns"
    label-width="80px"
    size="small"
  >
    <template #111>
      <div>asdf</div>
    </template>
  </z-form>
  <el-button type="primary" @click="submit">
    提交
  </el-button>
  <el-button @click="reset">
    重置
  </el-button>
</template>
```

:::

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const cFormRef = ref()
const formModel = ref({
  activeName: '',
  activeArea: '',
  activeInput: '',
})

const optionsConfig = {
  activeArea: [
    { label: '区域1', value: '1' },
    { label: '区域2', value: '2' },
  ],
}

const formItemConfig = [
  {
    type: 'input',
    field: 'activeName',
    label: '活动名称',
    rearSlot: 'error',
    frontSlot: 'nihao',
    span: 12,
    fieldProps: {
      placeholder: '请输入活动名称',
      clearable: true,
    },
    onInput: (val) => {
      console.log(val, 'val')
    },
    rules: {
      required: true,
      message: '请选择活动区域'
    }
  },
  {
    type: 'select',
    field: 'activeArea',
    span: 12,
    label: '活动区域',
    tooltip: '活动区域',
    extra: '活动区域',
    fieldProps: {
      placeholder: '请输入活动区域',
      clearable: true,
    },
    onChange: (val) => {
      console.log(val, 'val')
    },
    rules: {
      required: true,
      message: '请选择活动区域'
    }
  },
  {
    type: 'input',
    field: 'activeInput',
    span: 12,
    label: () => h('span', {}, '输入框'),
    // formItemProps: { label: '输入框' },
    fieldProps: {
      placeholder: '请输入',
      clearable: true,
    },
  },
  {
    span: 12,
    slot: 'button',
  },
]

const submit = () => {
  cFormRef.value.validate((valid: boolean) => {
    if (valid) {
      alert('submit!')
      console.log(formModel.value, 'formModel.value')
    }
    else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<template>
  <z-form
    ref="cFormRef"
    :form-model="formModel"
    :options="optionsConfig"
    :columns="formItemConfig"
    label-width="90px"
    size="small"
    justify="center"
  >
    <template #error>
      <div class="el-form-item__error">
        hhh
      </div>
    </template>
    <template #nihao>
      <span>11</span>
    </template>
    <template #button>
      <el-button style="width: 100%;" type="primary" @click="submit">
        提交
      </el-button>
    </template>
  </z-form>
</template>
```

:::
