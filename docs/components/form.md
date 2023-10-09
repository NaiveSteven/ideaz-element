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

`column`传入`tooltip`和`extra`，可以配置提示、额外信息和冒号。`tooltip`和`extra`支持字符串和`render`函数配置。
表单传入`colon`，可以配置表单项冒号。

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

## Column

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
    label: '文本2',
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
    <template #111>
      <div>asdf</div>
    </template>
    <template #aaa>
      <span>wewrwer</span>
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
    label: '文本1',
    field: 'a',
    max: 2,
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
  formRef.value.resetFields()
}

const handleValidate = () => {
  formRef.value.validate((val) => {
    console.log(val, 'handleValidate')
  })
}

const submit = () => {
  formRef.value.validate((valid: boolean, data) => {
    console.log(formData.value, data, 'config.formData')
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
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    :max="3"
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

:::

## ArrayForm type

:::demo 使用 `type`、`plain`、`round` 和 `circle` 属性来定义 Button 的样式。

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
  formRef.value.resetFields()
}

const submit = () => {
  formRef.value.validate((valid: boolean, data) => {
    console.log(formData.value, data, 'config.formData')
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
  <z-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    :max="2"
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

:::

## step form

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
    label: 'aaaaa',
    description: () => h('span', {}, 'asdfasdf'),
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
          // format: 'MM-dd',
          // valueFormat: 'MM-dd',
        },
        onChange: (val) => {
          console.log(val, 'change event')
        },
      },
    ]
  },
  // {
  //   label: 'input',
  //   component: 'input',
  //   field: 'input'
  // },
  // {
  //   slot: 'operate'
  // }
]

const reset = () => {
  formRef.value.resetFields()
}

const submit = () => {
  formRef.value.validate((valid: boolean, data) => {
    console.log(formData.value, data, 'config.formData')
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
  <z-form
    ref="formRef"
    v-model="formData"
    :options="options"
    :columns="columns"
    label-width="80px"
    size="default"
    type="step"
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
    <template #aaa>
      <span>aaasda</span>
    </template>
  </z-form>
</template>
```

:::
