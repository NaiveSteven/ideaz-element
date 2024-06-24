# 约定

`数据驱动视图`的设计理念，通过简单配置数据项实现需求。

## 版本

目前支持的`element-plus`版本为`2.7.6`版本，会持续兼容。

## 使用约定

### 字段命名

表单和表格组件中，`column`项的配置是类似的。

+ `component`：配置展示组件
+ `fieldProps`：配置组件属性
+ `field`：组件字段名
+ `label`：标题
+ `on + 事件`：组件的事件配置
+ `slot`：插槽
+ `render`：`h函数`或`render函数`
+ `hide`：隐藏展示配置

### 内置组件

表单或表格的`column`项，`component`字段支持`局部组件`、`全局组件`和内置组件。

内置组件包含：`input`、`select`、`radio`、`checkbox`，在表单和表格组件内部会被处理为`z-input`、`z-select`等。

使用示例：

```js
import { ElInput } from 'element-plus'

const columns = [
  {
    component: ElInput
  },
  {
    component: 'el-input'
  },
  {
    component: 'input'
  },
]
```

### 插槽

组件或`column`项，若支持`label`或`title`等字段，您可以传入例如`labelSlot`、`titleSlot`等带有`Slot`的字符串，组件内部会处理为插槽。

支持自定义的属性或配置，均支持`h函数`、`插槽`、`render函数`。

## 默认配置

`ZForm`、`ZFilterForm`、`ZCrud`等组件会默认配置`placeholder`、`clearable`、`filterable`等属性，支持自定义。

`ZFilterForm`表单响应式默认配置为`{ xl: 6, lg: 8, md: 8, sm: 12, xs: 24 }`
