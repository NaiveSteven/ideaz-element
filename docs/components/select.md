# Select 选择器

> 选择器封装，和`z-form`组件配合食用，风味更佳。

## 基础用法

传入`options`自动生成选项

<preview path="../demo/select/normal.vue" />

## 禁用

`option`中的某项设置`disabled`为`true`

<preview path="../demo/select/disabled.vue" />

全部禁用，组件传入`disabled`为`true`

<preview path="../demo/select/disabled-all.vue" />

## 键值对配置

配置`alias`，自定义`label`、`value`和`disabled`的键名

<preview path="../demo/select/kv.vue" />

## 多选

当 `multiple` 为 `true` 时，启用多选。此时绑定的 `model-value` 为数组格式

<preview path="../demo/select/multiple.vue" />

## 选择全部

> 前提 multiple 为 true 时，才会生效

当 `all` 为 `true` 时，`options`会拼接`{ label: '全部', value: 'all' }`

<preview path="../demo/select/select-all.vue" />

## 分组

通过 `option` 中的 `options` 字段配置可以轻松生成分组展示

<preview path="../demo/select/group.vue" />

## 内容自定义

`option`项配置`render`函数即可自定义内容，或者`render`字段传入`自定义字符 + Slot`使用插槽功能

<preview path="../demo/select/custom-content.vue" />

## 插槽

如果想要自定义组件头部内容或无选项时的列表，配置`prefix`或`empty`属性，或者使用`prefix`或`empty`插槽

<preview path="../demo/select/slot.vue" />

支持`tag`、`loading`、`header`、`footer`、`label`等插槽

<preview path="../demo/select/slot-more.vue" />

## z-select 属性

| 属性名                           | 说明                                                         | 类型                                       | 可选值                                                       | 默认值           |
| :------------------------------- | :----------------------------------------------------------- | :----------------------------------------- | :----------------------------------------------------------- | :--------------- |
| model-value / v-model            | 选中项绑定值                                                 | `array / string / number / boolean / object` | —                                                            | —                |
| options                         | 可配置项                                                     | `array`                                    |  —                                                 | —            |
| alias                         | 键值对配置                                                     | `object`                                    |  —                                                 | `{ label: 'label', value: 'value', disabled: 'disabled' }`            |
| prefix                         | Select 组件头部内容                                                     | `string /function`                                    |  —                                                 | —            |
| empty                         | 无选项时的列表                                                     | `string / function`                                    |  —                                                 | —            |
| multiple                         | 是否多选                                                     | `boolean`                                    | true/false                                                   | false            |
| all                         | 是否全部（`multiple`为`true`时才会生效）                                                     | `boolean`                                    | true/false                                                   | false            |
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
