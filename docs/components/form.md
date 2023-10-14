# Form 表单

表单封装，通过配置生成表单。

:::tip
如果表单项组件支持`placeholder`、`clearable`、`filterable`等属性，会被默认配置
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
    label: '姓名',
    onInput: (val) => {
      console.log(val, 'input event')
    },
    onChange: (val) => {
      console.log(val, 'change event')
    },
    required: true,
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
  {
    slot: 'button'
  }
]

const reset = () => {
  formRef.value.resetFields()
}

const submit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      alert('success')
      console.log(formData.value, 'config.formData')
    }
    else {
      console.log('error')
    }
  })
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    label-width="80px"
    size="small"
  >
    <template #button>
      <div class="flex w-full">
        <el-button class="w-full" @click="reset">
          重置
        </el-button>
        <el-button type="primary" class="w-full" @click="submit">
          提交
        </el-button>
      </div>
    </template>
  </z-form>
</template>
```

:::

## 列布局

表单传入`column`，支持`1 ~ 3`列布局，默认为`1`列布局。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  age: '',
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
    required: true
  },
  {
    component: 'select',
    field: 'sex',
    label: '性别',
  },
  {
    component: 'input',
    label: '年龄',
    field: 'age',
  },
  {
    slot: 'button',
  },
]

const submit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      alert('success')
      console.log(formData.value, 'formData.value')
    }
    else {
      console.log('error')
    }
  })
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    label-width="90px"
    size="small"
    :column="2"
  >
    <template #button>
      <el-button class="w-full" type="primary" @click="submit">
        提交
      </el-button>
    </template>
  </z-form>
</template>
```

:::

## 自定义布局

如果列布局不满足要求，可以在`column`项中配置`span`、`offset`、`pull`、`push`、`xs`、`sm`、`md`、`lg`、`xl`实现自定义响应式布局

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  age: '',
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
    span: 24
  },
  {
    component: 'select',
    field: 'sex',
    label: '性别',
    span: 12,
  },
  {
    component: 'input',
    label: '年龄',
    field: 'age',
    span: 12,
  },
  {
    span: 24,
    slot: 'button',
  },
]

const submit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      alert('success')
      console.log(formData.value, 'formData.value')
    }
    else {
      console.log('error')
    }
  })
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    label-width="90px"
    size="small"
  >
    <template #button>
      <el-button class="w-full" type="primary" @click="submit">
        提交
      </el-button>
    </template>
  </z-form>
</template>
```

:::

## 提示

`column`传入`tooltip`、`extra`和`colon`，可以配置提示、额外信息和冒号。`tooltip`和`extra`支持字符串和`render`函数配置。
表单传入`colon`，可以统一配置所有表单项冒号。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  age: '',
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
    tooltip: '这是姓名',
    extra: '这是额外信息',
    required: true
  },
  {
    component: 'select',
    field: 'sex',
    label: '性别',
    colon: false,
    tooltip: () => h('span', {}, '性别提示'),
    extra: () => h('span', {}, '性别额外信息'),
  },
  {
    component: 'input',
    label: '年龄',
    field: 'age',
    formItemProps: {
      tooltip: '这是年龄',
      extra: '这是额外信息',
      colon: false
    }
  },
  {
    slot: 'button',
  },
]

const submit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      alert('success')
      console.log(formData.value, 'formData.value')
    }
    else {
      console.log('error')
    }
  })
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    label-width="90px"
    size="small"
    :column="2"
    colon
  >
    <template #button>
      <el-button class="w-full" type="primary" @click="submit">
        提交
      </el-button>
    </template>
  </z-form>
</template>
```

:::

## 校验

+ `columns`表单项中添加`required`字段，或者`formItemProps`中设置`required`字段，即可设置必填，校验信息会根据`label`自动生成也可自定义。
+ `z-filter-form`传入`rules`字段，可以定义表单校验规则。
+ `columns`表单项配置`rules`，可以定义当前表单项校验规则。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  age: '',
  hobby: ''
})

const options = {
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const rules = {
  age: [{ required: true, message: '年龄必填' }],
}

const columns = [
  {
    component: 'input',
    field: 'name',
    label: '姓名',
    required: true
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
    component: 'input',
    label: '年龄',
    field: 'age',
  },
  {
    component: 'input',
    label: '爱好',
    field: 'hobby',
    rules: {
      required: true,
      message: '请填写爱好',
    },
  },
  {
    slot: 'button',
  },
]

const submit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      alert('success')
      console.log(formData.value, 'formData.value')
    }
    else {
      console.log('error')
    }
  })
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    label-width="90px"
    size="small"
    :rules="rules"
    :column="3"
  >
    <template #button>
      <el-button class="w-full" type="primary" @click="submit">
        提交
      </el-button>
    </template>
  </z-form>
</template>
```

:::

## 联动

`column`表单项传入`hide`（支持字符串或函数类型），可以配置表单项联动隐藏。

试试选中性别，年龄表单项会出现。
:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  age: '',
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
    required: true
  },
  {
    component: 'select',
    field: 'sex',
    label: '性别',
  },
  {
    component: 'input',
    label: '年龄',
    hide: () => !formData.value.sex,
    field: 'age',
  },
  {
    slot: 'button',
  },
]

const submit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      alert('success')
      console.log(formData.value, 'formData.value')
    }
    else {
      console.log('error')
    }
  })
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    label-width="90px"
    size="small"
    :column="2"
  >
    <template #button>
      <el-button class="w-full" type="primary" @click="submit">
        提交
      </el-button>
    </template>
  </z-form>
</template>
```

:::

## 表单项自定义

我们可以使用`slot`或`render`自定义表单项内容。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  age: '',
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
    required: true
  },
  {
    slot: 'sex',
    label: '性别'
  },
  {
    label: '年龄',
    render: () => h('span', {}, '年龄内容')
  }
]
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    :columns="columns"
    label-width="90px"
    size="small"
  >
    <template #sex>
      <z-select v-model="formData.sex" :options="options.sex" clearable filterable placeholder="请选择性别" />
    </template>
  </z-form>
</template>
```

:::

## label、error自定义

`label`和`error`支持传入字符串、`render`函数或`拼接Slot的字符串`

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  age: '',
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
    error: 'error message',
    required: true
  },
  {
    component: 'select',
    field: 'sex',
    label: 'labelSlot',
    required: true,
    error: h('span', {}, 'errorSlot')
  },
  {
    component: 'input',
    field: 'age',
    label: '年龄',
    required: true,
    error: 'errorSlot',
  },
  {
    slot: 'button'
  }
]

const submit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      alert('success')
      console.log(formData.value, 'formData.value')
    }
    else {
      console.log('error')
    }
  })
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    :columns="columns"
    :options="options"
    label-width="90px"
    size="small"
  >
    <template #labelSlot>
      <span>性别</span>
    </template>
    <template #errorSlot>
      <span>年龄必填</span>
    </template>
    <template #button>
      <el-button class="w-full" type="primary" @click="submit">
        提交
      </el-button>
    </template>
  </z-form>
</template>
```

:::

## 组表单

表单类型`type`传入`group`，`columns`中配置`children（表单项）`，可以实现分组表单。

此时的`column`中除了`children`配置表单项外，还可传入`label`、`borderStyle`、`contentPosition`等属性配置分割线文案、分割线样式、分割线文案位置。

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
    label: '文本1',
    borderStyle: 'dashed',
    children: [
      {
        component: 'input',
        field: 'name',
        label: '姓名',
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
    label: () => h('span', '文本2'),
    contentPosition: 'center',
    children: [
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
  },
  {
    slot: 'operate'
  }
]

const reset = () => {
  formRef.value.resetFields()
}

const submit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      alert('submit!')
      console.log(formData.value, 'config.formData')
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
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    label-width="80px"
    size="small"
    type="group"
    content-position="left"
  >
    <template #operate>
      <div class="flex w-full">
        <el-button class="w-full" @click="reset">
          重置
        </el-button>
        <el-button type="primary" class="w-full" @click="submit">
          提交
        </el-button>
      </div>
    </template>
  </z-form>
</template>
```

:::

## 可折叠表单

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const activeCollapse = ref('文本1')
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
    label: () => h('span', {}, '文本a'),
    children: [
      {
        component: 'input',
        field: 'name',
        modifier: 'trim',
        label: '姓名',
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
    label: 'aaa',
    children: [
      {
        component: 'select',
        field: 'sex',
        label: '性别',
        md: 12,
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
        md: 12,
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
  },
  {
    slot: 'operate'
  }
]

const reset = () => {
  formRef.value.resetFields()
}

const submit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      alert('submit!')
      console.log(formData.value, 'config.formData')
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
    ref="formRef"
    v-model="formData"
    v-model:activeCollapse="activeCollapse"
    :options="options"
    :columns="columns"
    label-width="80px"
    size="default"
    type="collapse"
    accordion
    @collapse-change="handleCollapseChange"
  >
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

## 数组表单

表单类型`type`传入`array`，`columns`中配置`children（表单项）`，可以实现数组表单。

表单或表单项（`column`）配置`max`，可以限制数组表单项最大数量。

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const formRef = ref()
const formData = ref([{
  name: '',
  sex: '',
  time: [],
}])

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
    modifier: 'trim',
    label: '姓名',
    onInput: (val) => {
      console.log(val, 'input event')
    },
    onChange: (val) => {
      console.log(val, 'change event')
    },
    required: true
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

const reset = () => {
  formRef.value.resetFields()
}

const submit = () => {
  formRef.value.validate((valid: boolean, data) => {
    console.log(formData.value, data, 'config.formData')
    if (valid)
      alert('success')

    else
      console.log('error')

  })
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    :max="2"
    label-width="80px"
    size="default"
    type="array"
  />
  <div class="flex w-full mt-4">
    <el-button class="w-full" @click="reset">
      重置
    </el-button>
    <el-button type="primary" class="w-full" @click="submit">
      提交
    </el-button>
  </div>
</template>
```

:::

## 内置数组表单

复杂的内置数组表单案列。想要校验表单项，可以直接调用表单`validate`方法。

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const formRef = ref()
const formData = ref({
  time: [],
  a: [
    {
      name: '',
      sex: '',
      time: [],
    }
  ],
  b: [
    {
      name: '',
      sex: '',
      time: [],
    }
  ]
})

const options = {
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = [
  {
    label: '文本1',
    field: 'a',
    max: 2,
    children: [
      {
        component: 'input',
        field: 'name',
        label: '姓名',
        onInput: (val) => {
          console.log(val, 'input event')
        },
        onChange: (val) => {
          console.log(val, 'change event')
        },
        required: true
      }
    ]
  },
  {
    label: '文本2',
    field: 'b',
    children: [
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
        rules: {
          required: true,
        }
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
  formRef.value.resetFields()
}

const submit = () => {
  formRef.value.validate((valid: boolean, data) => {
    console.log(formData.value, data, 'config.formData')
    if (valid)
      alert('success')

    else
      console.log('error')

  })
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    :max="3"
    label-width="80px"
    size="default"
    type="array"
  >
    <template #operate>
      <div class="flex w-full">
        <el-button class="w-full" @click="reset">
          重置
        </el-button>
        <el-button type="primary" class="w-full" @click="submit">
          提交
        </el-button>
      </div>
    </template>
  </z-form>
</template>
```

:::

## 步骤条表单

表单类型`type`传入`step`，`columns`中配置`children（表单项）`，可以实现步骤条表单。

`column`中配置`label`、`description`、`icon`和`status`，可以配置步骤条文案、描述、图标和状态。

需要配置`el-step`组件属性，如：`process-status`、`finish-status`、`align-center`等，直接通过`z-form`传入。

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const formRef = ref()
const formData = ref({
  name: '',
  sex: '',
  time: [],
  a: [
    {
      name: '',
      sex: '',
      time: [],
    }
  ],
  b: [
    {
      name: '',
      sex: '',
      time: [],
    }
  ]
})

const options = {
  sex: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
}

const columns = [
  {
    label: '第一步',
    description: '描述内容',
    field: 'a',
    children: [
      {
        component: 'input',
        field: 'name',
        modifier: 'trim',
        label: '姓名',
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
    label: () => h('span', {}, '第二部'),
    description: () => h('span', {}, '描述内容'),
    field: 'b',
    children: [
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
        rules: {
          required: true,
        }
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
  },
]

const reset = () => {
  formRef.value.resetFields()
}

const submit = () => {
  formRef.value.validate((valid: boolean, data) => {
    console.log(formData.value, data, 'config.formData')
    if (valid)
      alert('success')

    else
      console.log('error')

  })
}
</script>

<template>
  <z-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    label-width="80px"
    size="default"
    type="step"
  >
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

## z-form属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| modelValue                          | 表单数据对象                                                 | `object`             | —      |
| type                      | 表单类型                                  | `normal` / `group` / `collapse` / `array` / `step`             |  `normal`      |
| rules                          | 表单验证规则                                                 | `object`             | —      |
| columns                          | 表单项                                                 | `array`             | —      |
| options                          | 表单选择项数据源                                                 | `object`             | —      |
| column                          | 表单列数（便捷布局）                                                 | `number`             |`1`      |
| colon                          | 表单项冒号                                                 | `boolean`             | false      |
| max                          | 数组项最大数量（`type`为`array`生效）                                                 | `number`             | —      |
| gutter                          | 栅格间隔                                                 | `number`             | 0      |
| justify                          |  `flex`布局下的水平排列方式                                                 | 'start' | 'end' | `center` / `space-around` / `space-between` / `space-evenly`             | —      |
| align                          |  `flex`布局下的垂直排列方式                                                 | `top` / `middle` /`bottom`            | —      |
| v-model:activeCollapse                          | 展开的`collapse`项（`type`为`collapse`生效）                                                 | `array`             | —      |
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

## group表单属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| border-style                     | 设置分隔符样式                                  | `none` / `solid` / `hidden` / `dashed`            |  `solid`      |
| content-position                     | 自定义分隔线内容的位置                                  | `left` / `right` / `center`             |  `center`      |

## array表单属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| max                     | 最大表单项数量                                  | `number`             |  —      |

## step表单属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| process-status                          | 设置当前步骤的状态                         | `wait` / `process` / `finish` / `error` / `success`             | `process`      |
| finish-status                          | 设置结束步骤的状态                         | `wait` / `process` / `finish` / `error` / `success`             | `finish`      |
| align-center                      | 居中对齐                                  | `boolean`             |  `true`      |

## z-form方法

| 名称          | 说明                                                         | 类型       |
| :------------ | :----------------------------------------------------------- | :--------- |
| validate      | 对整个表单的内容进行验证。 接收一个回调函数，或返回 `Promise`。 | `Function` |
| validateField | 验证具体的某个字段。                                         | `Function` |
| resetFields   | 重置该表单项，将其值重置为初始值，并移除校验结果             | `Function` |
| scrollToField | 滚动到指定的字段                                             | `Function` |
| clearValidate | 清理某个字段的表单验证信息。                                 | `Function` |

## 通常表单column属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| component                      | 表单项组件                                  | `string` / `() => VNode`             |  —      |
| field                      | 字段名                                  | `string`             |  —      |
| fieldProps                      | `component`组件属性                                  | `object`             |  —      |
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
| children                      | 表单折叠模式下生效，column数组                                  | `array`             |  —      |
| span                      | 占据的单元格                                  | `number`             |  —      |
| offset                      | 左侧的间隔格数                                  | `number`             |  —      |
| pull                      | 向左移动格数                                  | `number`             |  —      |
| push                      | 向右移动格数                                  | `boolean`             |  —      |
| xs                      | `<768px` 响应式栅格数或者栅格属性对象                | `number` / `object`             |  —      |
| sm                      | `≥768px` 响应式栅格数或者栅格属性对象                       | `number` / `object`             |  —      |
| md                      | `≥992px` 响应式栅格数或者栅格属性对象                         | `number` / `object`             |  —      |
| lg                      | `≥1200px` 响应式栅格数或者栅格属性对象                        | `number` / `object`            |  —      |
| xl                      | `≥1920px` 响应式栅格数或者栅格属性对象                        | `number` / `object`            |  —      |

## group表单column属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| label                      | 分割线内容                                  | `string` / `() => VNode`             |  —      |
| border-style                     | 设置分隔符样式                                  | `none` / `solid` / `hidden` / `dashed`            |  `solid`      |
| content-position                     | 自定义分隔线内容的位置                                  | `left` / `right` / `center`             |  `center`      |
| children                      | 当前步骤中的表单项（属性都为通常`column`属性）                                  | `array`             |  —      |

## array表单column属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| label                      | 标签名                                  | `string` / `() => VNode`             |  —      |
| field                      | 字段名                                  | `string`             |  —      |
| max                     | 最大表单项数量                                  | `number`             |  —      |
| children                      | 当前步骤中的表单项（属性都为通常`column`属性）                                  | `array`             |  —      |

## step表单column属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| label                      | 步骤标题                                  | `string` / `() => VNode`             |  —      |
| icon                      | 表单`step`模式生效，图标                                  | `string` / `Component`             |  —      |
| description                      | 表单`step`模式生效，描述                                  | `boolean`             |  —      |
| status                      | 表单`step`模式生效，步骤条状态                                  | `wait` / `process` / `finish` / `error` / `success`             |  —      |
| children                      | 当前步骤中的表单项（属性都为通常`column`属性）                                  | `array`             |  —      |

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
