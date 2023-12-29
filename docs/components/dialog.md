# Dialog 弹窗

在 element-plus 弹窗组件基础上封装，更适合业务开发。

:::tip

+ 点击取消按钮默认关闭弹窗
+ 弹窗默认可以拖拽，不支持点击遮罩层关闭弹窗（可以自定义修改）
:::

## 常规弹窗
>

<preview path="../demo/dialog/normal.vue" />

## 信息、警告、错误弹窗

`type`传入`info`、`warning`、`danger`即可

<preview path="../demo/dialog/type.vue" />

## 导入用法

支持通过方法调用打开弹窗，内部会默认配置标题。
我们可以通过`title`、`message`或者函数的参数传入字符串实现自定义标题和内容。

<preview path="../demo/dialog/import.vue" />

## 操作按钮

+ 使用`confirmButtonLabel`、`confirmButtonLoading`、`cancelButtonLabel`、`cancelButtonLoading`属性配置按钮文案和加载状态
+ 使用`confirmButtonProps`、`cancelButtonProps`属性配置弹窗按钮所有属性
+ 函数模式的`onConfirm`、`onCancel`接收一个对象，包含`done`方法和按钮`状态`，调用`done`方法可以关闭弹窗，修改`按钮状态`可以实现按钮的`loading`效果

<preview path="../demo/dialog/operation.vue" />

## 标题自定义

可以使用`title`插槽或者`render`函数自定义标题

<preview path="../demo/dialog/title.vue" />

## 底部按钮自定义

传入`footer`插槽或者`render`函数自定义底部按钮，`footer`传入`false`可关闭底部按钮。

<preview path="../demo/dialog/button.vue" />

## before-close

关闭前回调

<preview path="../demo/dialog/before-close.vue" />

## z-dialog属性

| 属性名                  | 说明                                                         | 类型                   | 默认  |
| :---------------------- | :----------------------------------------------------------- | :--------------------- | :---- |
| model-value / v-model   | 是否显示 Dialog                                              | `boolean`              | —     |
| title                   | Dialog 对话框 Dialog 的标题 | `string` / `() => VNode`               | ''    |
| type                   | Dialog 的类型 | `normal` / `info` / `warning` / `danger`               | 'normal'    |
| footer                   | 自定义 Dialog 底部 | `() => VNode`               | ''    |
| confirmButtonLabel              | 确认按钮文案                                             | `string`              | '确认' |
| confirmButtonLoading              | 确认按钮加载状态                                            | `boolean`              | false |
| confirmButtonProps              | 确认按钮属性                                            | `object`              | —  |
| cancelButtonLabel              | 取消按钮文案                                            | `string`              | '取消' |
| cancelButtonLoading              | 取消按钮加载状态                                            | `boolean`              | false |
| cancelButtonProps              |  取消按钮属性                                            | `object`              | —  |
| width                   | 对话框的宽度，默认值为 50%                                   | `string` / `number`    | ''    |
| fullscreen              | 是否为全屏 Dialog                                            | `boolean`              | false |
| top                     | dialog CSS 中的 margin-top 值，默认为 15vh                   | `string`               | ''    |
| modal                   | 是否需要遮罩层                                               | `boolean`              | true  |
| modal-class             | 遮罩的自定义类名                                             | `string`               | —     |
| append-to-body          | Dialog 自身是否插入至 body 元素上。 嵌套的 Dialog 必须指定该属性并赋值为 `true` | `boolean`              | false |
| lock-scroll             | 是否在 Dialog 出现时将 body 滚动锁定                         | `boolean`              | true  |
| custom-class deprecated | Dialog 的自定义类名                                          | `string`               | ''    |
| open-delay              | dialog 打开的延时时间，单位毫秒                              | `number`               | 0     |
| close-delay             | drawer 关闭的延时时间，单位毫秒                              | `number`               | 0     |
| close-on-click-modal    | 是否可以通过点击 modal 关闭 Dialog                           | `boolean`              | true  |
| close-on-press-escape   | 是否可以通过按下 ESC 关闭 Dialog                             | `boolean`              | true  |
| show-close              | 是否显示关闭按钮                                             | `boolean`              | true  |
| before-close            | 关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候. | `Function`             | —     |
| draggable               | 为 Dialog 启用可拖拽功能                                     | `boolean`              | false |
| center                  | 是否让 Dialog 的 header 和 footer 部分居中排列               | `boolean`              | false |
| align-center 2.2.16     | 是否水平垂直对齐对话框                                       | `boolean`              | false |
| destroy-on-close        | 当关闭 Dialog 时，销毁其中的元素                             | `boolean`              | false |
| close-icon              | 自定义关闭图标，默认 Close                                   | `string` / `Component` | —     |
| z-index                 | 和原生的 CSS 的 z-index 相同，改变 z 轴的顺序                | `number`               | —     |
| header-aria-level a11y  | header 的 `aria-level` 属性                                  | `string`               | 2     |

## z-dialog插槽

| 插槽名           | 说明                                                   |
| :--------------- | :----------------------------------------------------- |
| —                | Dialog 的内容                                          |
| header           | 对话框标题的内容；会替换标题部分，但不会移除关闭按钮。 |
| footer           | Dialog 按钮操作区的内容                                |

## z-dialog事件

| 事件名           | 说明                               | Type       |
| :--------------- | :--------------------------------- | :--------- |
| open             | Dialog 打开的回调                  | `Function` |
| opened           | Dialog 打开动画结束时的回调        | `Function` |
| close            | Dialog 关闭的回调                  | `Function` |
| closed           | Dialog 关闭动画结束时的回调        | `Function` |
| open-auto-focus  | 输入焦点聚焦在 Dialog 内容时的回调 | `Function` |
| close-auto-focus | 输入焦点从 Dialog 内容失焦时的回调 | `Function` |
| confirm | 点击确定按钮的回调 | `Function` |
| cancel | 点击取消按钮的回调 | `Function` |
