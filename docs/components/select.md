# Select 选择器

> 选择器封装，和`z-form`组件配合食用，风味更佳。

## 基础用法

传入`options`自动生成选项

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3 }
])

const selectVal = ref(1)

const handleSelectChange = (val) => {
  console.log(val, 'handleSelectChange')
}
</script>

<template>
  <z-select v-model="selectVal" :options="options" @change="handleSelectChange" />
</template>
```

:::

## 禁用

`option`中的某项设置`disabled`为`true`

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2, disabled: true },
  { label: '选项三', value: 3 }
])

const selectVal = ref(1)
</script>

<template>
  <z-select v-model="selectVal" :options="options" />
</template>
```

:::

全部禁用，组件传入`disabled`为`true`

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3 }
])

const selectVal = ref(1)
</script>

<template>
  <z-select v-model="selectVal" :disabled="true" :options="options" />
</template>
```

:::

## 键值对配置

配置`alias`，自定义`label`、`value`和`disabled`的键名

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { data: { title: '选项一' }, key: 1 },
  { data: { title: '选项二' }, key: 2 },
  { data: { title: '选项三' }, key: 3 }
])

const alias = {
  label: 'data.title',
  value: 'key'
}

const selectVal = ref(1)
</script>

<template>
  <z-select v-model="selectVal" :alias="alias" :options="options" />
</template>
```

:::

## 多选

当 `multiple` 为 `true` 时，启用多选。此时绑定的 `model-value` 为数组格式

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3 }
])

const selectVal = ref([1])
</script>

<template>
  <div class="flex flex-col">
    <z-select v-model="selectVal" :options="options" multiple />
    <z-select
      v-model="selectVal"
      class="mt-4"
      :options="options"
      collapse-tags
      collapse-tags-tooltip
      multiple
    />
  </div>
</template>
```

:::

## 分组

通过 `option` 中的 `options` 字段配置可以轻松生成分组展示

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  {
    label: '选项一',
    options: [
      { label: '选项一-1', value: 11 },
      { label: '选项一-2', value: 12 }
    ]
  },
  {
    label: '选项二',
    options: [
      { label: '选项二-1', value: 21 },
      { label: '选项二-2', value: 22 }
    ]
  },
  {
    label: '选项三',
    disabled: true,
    options: [
      { label: '选项三-1', value: 31 },
      { label: '选项三-2', value: 32 }
    ]
  }
])

const selectVal = ref(11)
</script>

<template>
  <z-select v-model="selectVal" :options="options" />
</template>
```

:::

## 内容自定义

`option`项配置`render`函数即可自定义内容，或者`render`字段传入`自定义字符 + Slot`使用插槽功能

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const options = ref([
  {
    label: '选项一',
    value: 1,
    render: (h, { option }) => {
      return h('span', {}, `自定义${option.value}`)
    }
  },
  {
    label: '选项二',
    value: 2,
    render: 'optionSlot'
  },
  { label: '选项三', value: 3 }
])

const selectVal = ref(1)
</script>

<template>
  <z-select v-model="selectVal" :options="options">
    <template #optionSlot="{ option }">
      <span>自定义{{ option.label }}</span>
    </template>
  </z-select>
</template>
```

:::

## 插槽

如果想要自定义组件头部内容或无选项时的列表，配置`prefix`或`empty`属性，或者使用`prefix`或`empty`插槽

:::demo

```vue
<script lang="ts" setup>
import { h, ref, resolveComponent } from 'vue'

const options = ref([])

const selectVal = ref()

const setHeader = () => {
  return h(resolveComponent('el-icon'), {}, () => h(resolveComponent('i-search')))
}

const setEmpty = () => {
  return h('div', {}, '自定义内容')
}
</script>

<template>
  <div class="flex flex-col">
    <z-select v-model="selectVal" :options="options" :prefix="setHeader" :empty="setEmpty" />
    <z-select v-model="selectVal" :options="options" prefix="header" empty="自定义内容" class="mt-4" />
    <z-select v-model="selectVal" :options="options" class="mt-4">
      <template #prefix>
        <span>头部</span>
      </template>
      <template #empty>
        <span>自定义内容</span>
      </template>
    </z-select>
  </div>
</template>
```

:::

## z-select 属性

| 属性名                           | 说明                                                         | 类型                                       | 可选值                                                       | 默认值           |
| :------------------------------- | :----------------------------------------------------------- | :----------------------------------------- | :----------------------------------------------------------- | :--------------- |
| model-value / v-model            | 选中项绑定值                                                 | `array / string / number / boolean / object` | —                                                            | —                |
| options                         | 可配置项                                                     | `array`                                    |  —                                                 | —            |
| alias                         | 键值对配置                                                     | `object`                                    |  —                                                 | `{ label: 'label', value: 'value', disabled: 'disabled' }`            |
| prefix                         | Select 组件头部内容                                                     | `string /function`                                    |  —                                                 | —            |
| empty                         | 无选项时的列表                                                     | `string / function`                                    |  —                                                 | —            |
| multiple                         | 是否多选                                                     | `boolean`                                    | true/false                                                   | false            |
| disabled                         | 是否禁用                                                     | `boolean`                                    | true / false                                                 | false            |
| value-key                        | 作为 value 唯一标识的键名，绑定值为对象类型时必填            | `string`                                     | —                                                            | value            |
| size                             | 输入框尺寸                                                   | `string`                                     | large/default/small                                          | default          |
| clearable                        | 是否可以清空选项                                             | `boolean`                                    | true / false                                                 | false            |
| collapse-tags                    | 多选时是否将选中值按文字的形式展示                           | `boolean`                                    | true/false                                                   | false            |
| collapse-tags-tooltip            | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，`collapse-tags`属性必须设定为 true | `boolean`                                    | true / false                                                 | false            |
| multiple-limit                   | `multiple` 属性设置为 `true` 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制 | `number`                                     | —                                                            | 0                |
| name                             | Select 输入框的原生 name 属性                                | `string`                                     | —                                                            | —                |
| effect                           | Tooltip 主题，内置了 `dark` / `light` 两种                   | `string`                                     | string                                                       | light            |
| autocomplete                     | Select 输入框的原生 autocomplete 属性                        | `string`                                     | —                                                            | off              |
| placeholder                      | 占位文字                                                     | `string`                                     | —                                                            | Select           |
| filterable                       | Select 组件是否可筛选                                        | `boolean`                                    | true / false                                                 | false            |
| allow-create                     | 是否允许用户创建新条目， 只有当 `filterable` 设置为 true 时才会生效。 | `boolean`                                    | true/false                                                   | false            |
| filter-method                    | 自定义筛选方法                                               | `function`                                   | —                                                            | —                |
| remote                           | 其中的选项是否从服务器远程加载                               | `boolean`                                    | true / false                                                 | false            |
| remote-method                    | 自定义远程搜索方法                                           | `function`                                   | —                                                            | —                |
| remote-show-suffix               | 远程搜索方法显示后缀图标                                     | `boolean`                                    | true / false                                                 | false            |
| loading                          | 是否正在从远程获取数据                                       | `boolean`                                    | true / false                                                 | false            |
| loading-text                     | 从服务器加载内容时显示的文本                                 | `string`                                     | —                                                            | Loading          |
| no-match-text                    | 搜索条件无匹配时显示的文字，也可以使用 `empty` 插槽设置      | `string`                                     | —                                                            | No matching data |
| no-data-text                     | 无选项时显示的文字，也可以使用 `empty` 插槽设置自定义内容    | `string`                                     | —                                                            | No data          |
| popper-class                     | 选择器下拉菜单的自定义类名                                   | `string`                                     | —                                                            | —                |
| reserve-keyword                  | 当 `multiple` 和 `filter`被设置为 true 时，是否在选中一个选项后保留当前的搜索关键词 | `boolean`                                    | true / false                                                 | true             |
| default-first-option             | 是否在输入框按下回车时，选择第一个匹配项。 需配合 `filterable` 或 `remote` 使用 | `boolean`                                    | true / false                                                 | false            |
| popper-append-to-body deprecated | 是否将弹出框插入至 body 元素 当弹出框的位置出现问题时，你可以尝试将该属性设置为false。 | `boolean`                                    | true / false                                                 | true             |
| teleported                       | 该下拉菜单是否使用teleport插入body元素                       | `boolean`                                    | true / false                                                 | true             |
| persistent                       | 当下拉选择器未被激活并且`persistent`设置为`false`，选择器会被删除。 | `boolean`                                    | true / false                                                 | true             |
| automatic-dropdown               | 对于不可过滤的 Select 组件，此属性决定是否在输入框获得焦点后自动弹出选项菜单 | `boolean`                                    | true / false                                                 | false            |
| clear-icon                       | 自定义清除图标                                               | `string` | Component                       | —                                                            | CircleClose      |
| fit-input-width                  | 下拉框的宽度是否与输入框相同                                 | `boolean`                                    | true / false                                                 | false            |
| suffix-icon                      | 自定义后缀图标组件                                           | `string` | Component                       | —                                                            | ArrowDown        |
| suffix-transition deprecated     | 下拉菜单显示/消失时后缀图标的动画                            | `boolean`                                    | true / false                                                 | true             |
| tag-type                         | 标签类型                                                     | `string`                                     | success/info/warning/danger                                  | info             |
| validate-event                   | 是否触发表单验证                                             | `boolean`                                    | true / false                                                 | true             |
| placement                        | 下拉框出现的位置                                             | `string`                                     | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom-start     |
| max-collapse-tags         | 需要显示的 Tag 的最大数量 只有当 `collapse-tags` 设置为 true 时才会生效。 | `number`                                     | —                                                            | 1                |

## z-select 事件

| 事件名         | 说明                                     | 回调参数                           |
| :------------- | :--------------------------------------- | :--------------------------------- |
| change         | 选中值发生变化时触发                     | val，目前的选中值                  |
| visible-change | 下拉框出现/隐藏时触发                    | val，出现则为 true，隐藏则为 false |
| remove-tag     | 多选模式下移除tag时触发                  | val，移除的tag值                   |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | —                                  |
| blur           | 当 input 失去焦点时触发                  | (event: FocusEvent)                |
| focus          | 当 input 获得焦点时触发                  | (event: FocusEvent)                |

## z-select 插槽

| 插槽名 | 说明                | 子标签                |
| :----- | :------------------ | :-------------------- |
| prefix | Select 组件头部内容 | —                     |
| empty  | 无选项时的列表      | —                     |

## Option 项可配置属性

| 属性名   | 说明                                    | 类型                               | 可选值 | 默认值 |
| :------- | :-------------------------------------- | :--------------------------------- | :----- | :----- |
| value    | 选项的值                                | `string / number / boolean / object` | —      | —      |
| label    | 选项的标签，若不设置则默认与`value`相同 | `string / number`                      | —      | —      |
| disabled | 是否禁用该选项                          | `boolean`                            | —      | false  |
| options | 可配置项（分组时可配置）                          | `array`                            | —      | —  |
| render | 选项自定义                          | `string / () => VNode`                            | —      | —  |
