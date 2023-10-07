# FilterForm 筛选表单

筛选表单，基于`z-form`封装

:::tip
如果表单项组件支持`placeholder`、`clearable`、`filterable`等属性，会被默认配置
:::

## 基础用法

+ 传入`columns`定义表单，`modelValue`为表单数据，`options`为数据配置项
+ 事件使用`on`+`事件名`
+ 表单项组件属性直接在`column`项中配置即可
+ `FormItem`组件属性（表单项装饰组件）属性配置在`formItemProps`字段中，有些字段为了方便使用，直接配置在`column`项中也可生效（如：`label`、`required`等）

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const cFormRef = ref()
const formModel = ref({
  activeName: '',
  activeArea: '',
  activeTime: [],
})

const options = {
  activeArea: [
    { label: '区域1', value: '1' },
    { label: '区域2', value: '2' },
  ],
}

const columns = [
  {
    component: 'input',
    field: 'activeName',
    label: '活动名称',
    onInput: (val) => {
      console.log(val, 'input event')
    },
    onChange: (val) => {
      console.log(val, 'change event')
    },
  },
  {
    component: 'select',
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
    component: 'datepicker',
    field: 'activeTime',
    label: '活动时间',
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
</script>

<template>
  <z-filter-form
    ref="cFormRef"
    v-model="formModel"
    :options="options"
    :columns="columns"
    size="small"
    label-width="80px"
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

const rules = {
  activeTime: [{ required: true, message: '活动时间必填' }],
}

const columns = [
  {
    component: 'input',
    field: 'activeName',
    label: '活动名称',
    required: true
  },
  {
    component: 'select',
    field: 'activeArea',
    formItemProps: {
      required: true,
      label: '活动区域',
    }
  },
  {
    component: 'datepicker',
    field: 'activeTime',
    label: '活动时间',
    fieldProps: {
      type: 'daterange',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      format: 'MM-dd',
      valueFormat: 'MM-dd',
    },
  },
]

// const reset = () => {
//   cFormRef.value.resetFields()
// }

// const submit = () => {
//   cFormRef.value.validate((valid: boolean) => {
//     if (valid) {
//       alert('submit!')
//       console.log(formModel.value, 'config.formModel')
//     }
//     else {
//       console.log('error submit!!')
//       return false
//     }
//   })
// }
</script>

<template>
  <z-filter-form
    ref="cFormRef"
    v-model="formModel"
    :options="optionsConfig"
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

// const reset = () => {
//   cFormRef.value.resetFields()
// }

// const submit = () => {
//   cFormRef.value.validate((valid: boolean) => {
//     if (valid) {
//       alert('submit!')
//       console.log(formModel.value, 'config.formModel')
//     }
//     else {
//       console.log('error submit!!')
//       return false
//     }
//   })
// }
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
    component: 'input',
    field: 'activeName',
    label: () => h('span', {}, '活动名称'),
    required: true,
    error: 'error message',
  },
  {
    component: 'select',
    field: 'activeArea',
    label: 'labelSlot',
    required: true,
    error: h('span', {}, 'errorSlot')
  },
  {
    component: 'datepicker',
    field: 'activeTime',
    label: '活动时间',
    fieldProps: {
      type: 'daterange',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      format: 'MM-dd',
      valueFormat: 'MM-dd',
    },
  }
]

// const reset = () => {
//   cFormRef.value.resetFields()
// }

// const submit = () => {
//   cFormRef.value.validate((valid: boolean) => {
//     if (valid) {
//       alert('submit!')
//       console.log(formModel.value, 'config.formModel')
//     }
//     else {
//       console.log('error submit!!')
//       return false
//     }
//   })
// }
</script>

<template>
  <z-filter-form
    ref="cFormRef"
    v-model="formModel"
    :options="optionsConfig"
    :columns="columns"
    size="small"
    label-width="80px"
  >
    <template #labelSlot>
      <span>区域</span>
    </template>
  </z-filter-form>
</template>
```

:::

## 其他

:::demo

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
    component: 'input',
    field: 'activeName',
    label: '活动名称',
    onInput: (val) => {
      console.log(val, 'input event')
    },
    onChange: (val) => {
      console.log(val, 'change event')
    },
  },
  {
    component: 'select',
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
    component: 'datepicker',
    field: 'activeTime',
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
  {
    slot: 'slot1',
    label: 'asdsf'
  },
  {
    component: 'input',
    field: 'aa',
    label: 'labelSlot2'
  },
  {
    component: 'input',
    field: 'aa',
    label: '测试'
  }
]

// const reset = () => {
//   cFormRef.value.resetFields()
// }

// const submit = () => {
//   cFormRef.value.validate((valid: boolean) => {
//     if (valid) {
//       alert('submit!')
//       console.log(formModel.value, 'config.formModel')
//     }
//     else {
//       console.log('error submit!!')
//       return false
//     }
//   })
// }
</script>

<template>
  <z-filter-form
    ref="cFormRef"
    v-model="formModel"
    :options="optionsConfig"
    :columns="columns"
    size="small"
    label-width="80px"
  >
    <template #111>
      <div>asdf</div>
    </template>
    <template #slot1>
      <el-input value="sdf" />
    </template>
    <template #labelSlot2>
      <span>asdfsf</span>
    </template>
  </z-filter-form>
</template>
```

:::
