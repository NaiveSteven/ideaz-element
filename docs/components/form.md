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
    component: 'input',
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
    component: 'select',
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
    component: 'datepicker',
    field: 'activeTime',
    span: 8,
    label: '活动时间',
    fieldProps: {
      type: 'daterange',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      // format: 'MM-dd',
      // valueFormat: 'MM-dd',
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
    v-model="formModel"
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
    component: 'input',
    field: 'activeName',
    error: 'errorSlot',
    label: 'nihaoSlot',
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
    component: 'select',
    field: 'activeArea',
    span: 12,
    label: '活动区域',
    tooltip: '活动区域',
    extra: '活动区域',
    error: '请选择',
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
    component: 'input',
    field: 'activeInput',
    span: 12,
    label: () => h('span', {}, '输入框'),
    error: () => h('div', {}, '请输入'),
    // formItemProps: { label: '输入框' },
    fieldProps: {
      placeholder: '请输入',
      clearable: true,
    },
    rules: {
      required: true
    }
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
    v-model="formModel"
    :options="optionsConfig"
    :columns="formItemConfig"
    label-width="90px"
    size="small"
    justify="center"
  >
    <template #errorSlot>
      <span>
        hhh
      </span>
    </template>
    <template #nihaoSlot>
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

## Column

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
    component: 'input',
    field: 'activeName',
    modifier: 'trim',
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
      // format: 'MM-dd',
      // valueFormat: 'MM-dd',
    },
    onChange: (val) => {
      console.log(val, 'change event')
    },
  },
  {
    slot: 'operate'
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
  <z-form
    ref="cFormRef"
    v-model="formModel"
    :options="optionsConfig"
    :columns="columns"
    label-width="80px"
    size="small"
    :column="2"
  >
    <template #111>
      <div>asdf</div>
    </template>
    <template #operate>
      <el-button type="primary" @click="submit">
        提交
      </el-button>
      <el-button @click="reset">
        重置
      </el-button>
    </template>
  </z-form>
</template>
```

:::

## GroupForm

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
    label: '文本1',
    children: [
      {
        component: 'input',
        field: 'activeName',
        modifier: 'trim',
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
      }
    ]
  },
  {
    label: '文本2',
    children: [
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
          // format: 'MM-dd',
          // valueFormat: 'MM-dd',
        },
        onChange: (val) => {
          console.log(val, 'change event')
        },
      },
    ]
  },
  {
    slot: 'operate'
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
  <z-form
    ref="cFormRef"
    v-model="formModel"
    :options="optionsConfig"
    :columns="columns"
    label-width="80px"
    size="small"
    type="group"
  >
    <template #111>
      <div>asdf</div>
    </template>
    <template #operate>
      <el-button type="primary" @click="submit">
        提交
      </el-button>
      <el-button @click="reset">
        重置
      </el-button>
    </template>
  </z-form>
</template>
```

:::

## CollapseForm

:::demo 使用 `type`、`plain`、`round` 和 `circle` 属性来定义 Button 的样式。

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const activeCollapse = ref('文本1')
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
    label: '文本1',
    children: [
      {
        component: 'input',
        field: 'activeName',
        modifier: 'trim',
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
      }
    ]
  },
  {
    label: '文本2',
    children: [
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
          // format: 'MM-dd',
          // valueFormat: 'MM-dd',
        },
        onChange: (val) => {
          console.log(val, 'change event')
        },
      },
    ]
  },
  {
    slot: 'operate'
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

const handleCollapseChange = (val: string) => {
  console.log(val, 'val')
}
</script>

<template>
  <z-form
    ref="cFormRef"
    v-model="formModel"
    v-model:activeCollapse="activeCollapse"
    :options="optionsConfig"
    :columns="columns"
    label-width="80px"
    size="default"
    type="collapse"
    accordion
    @collapse-change="handleCollapseChange"
  >
    <template #111>
      <div>asdf</div>
    </template>
    <template #operate>
      <el-button type="primary" @click="submit">
        提交
      </el-button>
      <el-button @click="reset">
        重置
      </el-button>
    </template>
  </z-form>
</template>
```

:::

## ArrayForm

:::demo 使用 `type`、`plain`、`round` 和 `circle` 属性来定义 Button 的样式。

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const cFormRef = ref()
const formModel = ref({
  activeName: '',
  activeArea: '',
  activeTime: [],
  a: [
    {
      activeName: '',
      activeArea: '',
      activeTime: [],
    }
  ],
  b: [
    {
      activeName: '',
      activeArea: '',
      activeTime: [],
    }
  ]
})

const optionsConfig = {
  activeArea: [
    { label: '区域1', value: '1' },
    { label: '区域2', value: '2' },
  ],
}

const columns = [
  {
    label: '文本1',
    field: 'a',
    children: [
      {
        component: 'input',
        field: 'activeName',
        modifier: 'trim',
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
      }
    ]
  },
  {
    label: '文本2',
    field: 'b',
    children: [
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
          // format: 'MM-dd',
          // valueFormat: 'MM-dd',
        },
        onChange: (val) => {
          console.log(val, 'change event')
        },
      },
    ]
  },
  {
    label: 'input',
    component: 'input',
    field: 'input'
  },
  {
    slot: 'operate'
  }
]

const reset = () => {
  cFormRef.value.resetFields()
}

const handleValidate = () => {
  cFormRef.value.validate((val) => {
    console.log(val, 'handleValidate')
  })
}

const submit = () => {
  cFormRef.value.validate((valid: boolean) => {
    console.log(formModel.value, 'config.formModel')
    if (valid) {
      alert('submit!')
    }
    else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<template>
  <el-button @click="handleValidate">
    校验
  </el-button>
  <z-form
    ref="cFormRef"
    v-model="formModel"
    :options="optionsConfig"
    :columns="columns"
    label-width="80px"
    size="default"
    type="array"
  >
    <template #111>
      <div>asdf</div>
    </template>
    <template #operate>
      <el-button type="primary" @click="submit">
        提交
      </el-button>
      <el-button @click="reset">
        重置
      </el-button>
    </template>
  </z-form>
</template>
```
