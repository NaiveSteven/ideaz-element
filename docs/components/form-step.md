# StepForm 组表单

基于`ZForm`组件封装。

## 步骤条表单

表单类型`type`传入`step`，`columns`中配置`children（表单项）`，可以实现步骤条表单。当前步骤通过`activeStep`双向绑定。

`column`中配置`label`、`description`、`icon`和`status`，可以配置步骤条文案、描述、图标和状态。

<preview path="../demo/form-step/normal.vue" />

## Step属性

`el-step`组件属性，如：`process-status`、`finish-status`、`align-center`等，直接通过`z-form`传入。

<preview path="../demo/form-step/step-attribute.vue" />

## 自定义

支持自定义`column`项的`label`、`description`、`icon`内容。老规矩，支持传入`render`或带`slot（无视大小写）`的字符串。

<preview path="../demo/form-step/custom.vue" />

配置`footer`插槽或者`render`函数可以自定义步骤条底部内容。

<preview path="../demo/form-step/footer.vue" />

## step表单属性

| 属性名         | 说明               | 类型                                                | 默认值    |
| :------------- | :----------------- | :-------------------------------------------------- | :-------- |
| modelValue:activeStep | 当前步骤 | `number` | 0 |
| process-status | 设置当前步骤的状态 | `wait` / `process` / `finish` / `error` / `success` | `process` |
| finish-status  | 设置结束步骤的状态 | `wait` / `process` / `finish` / `error` / `success` | `finish`  |
| align-center   | 居中对齐           | `boolean`                                           | `true`    |
