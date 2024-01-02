# FullScreen 全屏

全屏组件

:::tip
当元素没有预期显示时，请注意`z-index`。
:::

## 基础用法

:::warning
我们需要设置背景颜色，否则会有大片漆黑。
:::

传入`el`属性，值为`HTMLElement`或函数类型，表示需要全屏的元素，默认为`body`。

<preview path="../demo/full-screen/normal.vue" />

## 插槽

可以使用`enter`和`exit`插槽定制进入和退出时的出入口

<preview path="../demo/full-screen/slot.vue" />

## z-full-screen属性

| 属性名                  | 说明                                                         | 类型                   | 默认  |
| :---------------------- | :----------------------------------------------------------- | :--------------------- | :---- |
| el                   | 需要全屏的元素 | `HTMLElement` / `() => HTMLElement`               | 'body'    |
| renderEnter                   | 自定义入口 | `() => VNode`               | ''    |
| renderExit                   | 自定义出口 | `() => VNode`               | ''    |

## z-full-screen插槽

| 插槽名           | 说明                                                   |
| :--------------- | :----------------------------------------------------- |
| —                | FullScreen 的内容                                          |
| enter           | 入口 |
| exit           | 出口                                |

## z-full-screen事件

| 事件名           | 说明                               | Type       |
| :--------------- | :--------------------------------- | :--------- |
| change             | 进入和退出时的回调                  | `(isFullScreen: boolean) => void` |
