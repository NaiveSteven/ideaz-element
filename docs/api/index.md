# Vitepress Demo

## 已实现
- [x] vue组件

```js
<demo-block>
  <xl-button>默认按钮</xl-button>
  <xl-button type="primary">主要按钮</xl-button>
  <xl-button type="success">成功按钮</xl-button>
  <xl-button type="info">信息按钮</xl-button>
  <xl-button type="warning">警告按钮</xl-button>
  <xl-button type="danger">危险按钮</xl-button>
</demo-block>
```

![image-20210615194021326](https://tva1.sinaimg.cn/large/008i3skNly1grj6qits6pj312c04aq3j.jpg)



- [x] vue代码自动渲染并且显示对应code（目前已支持script和style，有好的解决方案的伙伴请提issue）

:::demo 使用 `type`、`plain`、`round` 和 `circle` 属性来定义 Button 的样式。
```vue
<xl-button>默认按钮</xl-button>
<xl-button type="primary">主要按钮</xl-button>
<xl-button type="success">成功按钮</xl-button>
<xl-button type="info">信息按钮</xl-button>
<xl-button type="warning">警告按钮</xl-button>
<xl-button type="danger">危险按钮</xl-button>
```
:::


![image-20210615194046416](https://tva1.sinaimg.cn/large/008i3skNly1grj6qx0v0nj31r40nsdkn.jpg)


