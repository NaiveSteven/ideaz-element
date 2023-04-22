# Grid 栅格

常用的操作按钮。

## 基础用法

基础的按钮用法。

:::demo 使用 `type`、`plain`、`round` 和 `circle` 属性来定义 Button 的样式。

```vue
<template>
  <z-row>
    <z-col :span="24"><div class="grid-content ep-bg-purple-dark" /></z-col>
  </z-row>
  <z-row>
    <z-col :span="12"><div class="grid-content ep-bg-purple" /></z-col>
    <z-col :span="12"><div class="grid-content ep-bg-purple-light" /></z-col>
  </z-row>
  <z-row>
    <z-col :span="8"><div class="grid-content ep-bg-purple" /></z-col>
    <z-col :span="8"><div class="grid-content ep-bg-purple-light" /></z-col>
    <z-col :span="8"><div class="grid-content ep-bg-purple" /></z-col>
  </z-row>
  <z-row>
    <z-col :span="6"><div class="grid-content ep-bg-purple" /></z-col>
    <z-col :span="6"><div class="grid-content ep-bg-purple-light" /></z-col>
    <z-col :span="6"><div class="grid-content ep-bg-purple" /></z-col>
    <z-col :span="6"><div class="grid-content ep-bg-purple-light" /></z-col>
  </z-row>
  <z-row>
    <z-col :span="4"><div class="grid-content ep-bg-purple" /></z-col>
    <z-col :span="4"><div class="grid-content ep-bg-purple-light" /></z-col>
    <z-col :span="4"><div class="grid-content ep-bg-purple" /></z-col>
    <z-col :span="4"><div class="grid-content ep-bg-purple-light" /></z-col>
    <z-col :span="4"><div class="grid-content ep-bg-purple" /></z-col>
    <z-col :span="4"><div class="grid-content ep-bg-purple-light" /></z-col>
  </z-row>
</template>

<style lang="scss">
.z-row {
  margin-bottom: 20px;
}
.z-row:last-child {
  margin-bottom: 0;
}
.z-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.ep-bg-purple-dark {
  background: #99a8bf;
}
.ep-bg-purple {
  background: #d3dce6;
}
.ep-bg-purple-light {
  background: #e5e9f2;
}
</style>
```
