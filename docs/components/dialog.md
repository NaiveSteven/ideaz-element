# Dialog 弹窗

在 element-plus 弹窗组件基础上封装，更适合业务开发。

:::tip

+ 点击取消按钮默认关闭弹窗
+ 弹窗默认可以拖拽，不支持点击遮罩层关闭弹窗（可以自定义修改）
:::

## 常规弹窗
>

:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const isShowDialog = ref(false)
</script>

<template>
  <el-button link type="primary" @click="isShowDialog = true">
    点击打开 Dialog
  </el-button>
  <z-dialog
    v-model="isShowDialog"
    title="标题"
    @confirm="isShowDialog = false"
  >
    <span>这是一段信息</span>
  </z-dialog>
</template>
```

:::

## 信息、警告、错误弹窗

`type`传入`info`、`warning`、`danger`即可
:::demo

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const isShowInfoDialog = ref(false)
const isShowWarningDialog = ref(false)
const isShowDangerDialog = ref(false)
</script>

<template>
  <el-button link type="primary" @click="isShowInfoDialog = true">
    信息弹窗
  </el-button>
  <el-button link type="primary" @click="isShowWarningDialog = true">
    警告弹窗
  </el-button>
  <el-button link type="primary" @click="isShowDangerDialog = true">
    错误弹窗
  </el-button>
  <z-dialog
    v-model="isShowInfoDialog"
    type="info"
    title="信息"
    @confirm="isShowInfoDialog = false"
  >
    <span>这是一段信息</span>
  </z-dialog>
  <z-dialog
    v-model="isShowWarningDialog"
    type="warning"
    title="警告"
    @confirm="isShowWarningDialog = false"
  >
    <span>这是一段信息</span>
  </z-dialog>
  <z-dialog
    v-model="isShowDangerDialog"
    type="danger"
    title="错误"
    @confirm="isShowDangerDialog = false"
  >
    <span>这是一段信息</span>
  </z-dialog>
</template>
```

:::

## 导入用法

支持通过方法调用打开弹窗，内部会默认配置标题。
我们可以通过`title`、`message`或者函数的参数传入字符串实现自定义标题和内容。
:::demo

```vue
<script lang="ts" setup>
import { h } from 'vue'

const openInfoDialog = () => {
  window.ZDialogTip({
    type: 'info',
    message: '提示信息',
    onConfirm: ({ done, confirmButtonLoading }) => {
      confirmButtonLoading.value = true
      done()
    },
    onCancel: ({ done, cancelButtonLoading }) => {
      done()
    }
  })
}

const openWarningDialog = () => {
  window.ZDialogTip.warning('提示信息', '标题', {
    type: 'warning',
    onConfirm: ({ done, confirmButtonLoading }) => {
      confirmButtonLoading.value = true
    },
    onCancel: ({ done, cancelButtonLoading }) => {
      done()
    }
  })
}

const openDangerDialog = () => {
  window.ZDialogTip({
    type: 'danger',
    message: () => h('span', {}, 'custom message'),
    title: () => h('span', {}, 'custom title'),
    onConfirm: ({ done, confirmButtonLoading }) => {
      confirmButtonLoading.value = true
    },
    onCancel: ({ done, cancelButtonLoading }) => {
      done()
    }
  })
}
</script>

<template>
  <el-button link type="primary" @click="openInfoDialog">
    信息弹窗
  </el-button>
  <el-button link type="primary" @click="openWarningDialog">
    警告弹窗
  </el-button>
  <el-button link type="primary" @click="openDangerDialog">
    错误弹窗
  </el-button>
</template>
```

:::

## 操作按钮

+ 使用`confirmButtonLabel`、`confirmButtonLoading`、`cancelButtonLabel`、`cancelButtonLoading`属性配置按钮文案和加载状态
+ 使用`confirmButtonProps`、`cancelButtonProps`属性配置弹窗按钮所有属性
+ 函数模式的`onConfirm`、`onCancel`接收一个对象，包含`done`方法和按钮`状态`，调用`done`方法可以关闭弹窗，修改`按钮状态`可以实现按钮的`loading`效果
:::demo

```vue
<script lang="ts" setup>
import { h, reactive, ref } from 'vue'

const isShowDialog = ref(false)
const isShow = ref(false)

const confirmButtonProps = reactive({
  label: '确认按钮',
  type: 'danger',
  loading: false
})

const cancelButtonProps = reactive({
  label: '取消按钮',
  type: 'primary',
  loading: false
})

const isConfirmBtnLoading = ref(false)
const isCancelBtnLoading = ref(false)

const openWarningDialog = () => {
  window.ZDialogTip({
    type: 'warning',
    message: '警告信息',
    onConfirm: async ({ done, confirmButtonLoading }) => {
      confirmButtonLoading.value = true
      await delay(200)
      confirmButtonLoading.value = false
      done()
    },
    onCancel: async ({ done, cancelButtonLoading }) => {
      cancelButtonLoading.value = true
      await delay(200)
      cancelButtonLoading.value = false
      done()
    }
  })
}

const handleConfirm = async () => {
  confirmButtonProps.loading = true
  try {
    await delay(200)
    confirmButtonProps.loading = false
    isShowDialog.value = false
  }
  catch {}
  confirmButtonProps.loading = false
}

const handleCancel = async () => {
  cancelButtonProps.loading = true
  try {
    await delay(200)
    cancelButtonProps.loading = false
    isShowDialog.value = false
  }
  catch {}
  cancelButtonProps.loading = false
}

const confirm = async () => {
  isConfirmBtnLoading.value = true
  try {
    await delay(200)
    isConfirmBtnLoading.value = false
    isShow.value = false
  }
  catch {}
  isConfirmBtnLoading.value = false
}

const cancel = async () => {
  isCancelBtnLoading.value = true
  try {
    await delay(200)
    isCancelBtnLoading.value = false
    isShow.value = false
  }
  catch {}
  isCancelBtnLoading.value = false
}

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
</script>

<template>
  <el-button link type="primary" @click="openWarningDialog">
    事件配置
  </el-button>
  <el-button link type="primary" @click="isShowDialog = true">
    对象属性配置
  </el-button>
  <el-button link type="primary" @click="isShow = true">
    常规属性配置
  </el-button>
  <z-dialog
    v-model="isShowDialog"
    title="标题"
    :confirm-button-props="confirmButtonProps"
    :cancel-button-props="cancelButtonProps"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <span>这是一段信息</span>
  </z-dialog>
  <z-dialog
    v-model="isShow"
    title="标题"
    confirm-button-label="确认按钮"
    cancel-button-label="取消按钮"
    :confirm-button-loading="isConfirmBtnLoading"
    :cancel-button-loading="isCancelBtnLoading"
    @confirm="confirm"
    @cancel="cancel"
  >
    <span>这是一段信息</span>
  </z-dialog>
</template>
```

:::

## 标题自定义

可以使用`title`插槽或者`render`函数自定义标题

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const isShowDialog = ref(false)
const isShowRenderDialog = ref(false)

const renderTitle = () => {
  return h('span', 'render标题')
}

const handleClick = () => {
  window.ZDialogTip({
    type: 'danger',
    message: () => h('span', {}, 'custom message'),
    title: () => h('span', {}, 'custom title'),
    onConfirm: ({ done, confirmButtonLoading }) => {
      confirmButtonLoading.value = true
    },
    onCancel: ({ done, cancelButtonLoading }) => {
      done()
    }
  })
}
</script>

<template>
  <el-button link type="primary" @click="isShowDialog = true">
    点击打开slot Dialog
  </el-button>
  <el-button link type="primary" @click="isShowRenderDialog = true">
    点击打开render Dialog
  </el-button>
  <el-button link type="primary" @click="handleClick">
    点击打开render Dialog
  </el-button>
  <z-dialog
    v-model="isShowDialog"
    @confirm="isShowDialog = false"
  >
    <template #title>
      插槽标题
    </template>
    <span>这是一段信息</span>
  </z-dialog>
  <z-dialog
    v-model="isShowRenderDialog"
    :title="renderTitle"
    @confirm="isShowRenderDialog = false"
  >
    <span>这是一段信息</span>
  </z-dialog>
</template>
```

:::

## 底部按钮自定义

传入`footer`插槽或者`render`函数自定义底部按钮，`footer`传入`false`可关闭底部按钮。
:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const isShowDialog = ref(false)
const isShowRenderDialog = ref(false)
const isShowFooterDialog = ref(false)

const renderFooter = () => {
  return h('div', 'render底部')
}
</script>

<template>
  <ElButton link type="primary" @click="isShowDialog = true">
    点击打开slot Dialog
  </ElButton>
  <ElButton link type="primary" @click="isShowRenderDialog = true">
    点击打开render Dialog
  </ElButton>
  <ElButton link type="primary" @click="isShowFooterDialog = true">
    点击打开footer Dialog
  </ElButton>
  <z-dialog
    v-model="isShowDialog"
    title="标题"
  >
    <template #footer>
      <ElButton size="default" @click="isShowDialog = false">
        关闭弹窗
      </ElButton>
    </template>
    <span>这是一段信息</span>
  </z-dialog>
  <z-dialog
    v-model="isShowRenderDialog"
    title="标题"
    :footer="renderFooter"
  >
    <span>这是一段信息</span>
  </z-dialog>
  <z-dialog
    v-model="isShowFooterDialog"
    title="标题"
    :footer="false"
  >
    <span>这是一段信息</span>
  </z-dialog>
</template>
```

:::

## before-close

关闭前回调

:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const isShowDialog = ref(false)

const handleConfirm = (done) => {
  console.log(done, 'sdf')
}

const handleBeforeClose = async (done) => {
  console.log('handleBeforeClose')
  // await delay(200)
  // done()
}

const renderTitle = () => {
  return h('span', {}, 'title')
}

const handleOpen = () => {
  isShowDialog.value = true
}

const openDialog = () => {
  window.ZDialogTip({
    type: 'warning',
    message: '内容',
    title: '标题',
    beforeClose: (done) => {
      console.log('before close extend')
      done()
    },
    onConfirm: ({ done, confirmButtonLoading }) => {
      confirmButtonLoading.value = true
    },
    onCancel: ({ done, cancelButtonLoading }) => {
      done()
    }
  })
}

const handleClose = () => {
  console.log('handleClose')
}

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
</script>

<template>
  <el-button link type="primary" @click="handleOpen">
    点击打开 Dialog
  </el-button>
  <el-button link type="primary" @click="openDialog">
    点击打开 Dialog
  </el-button>
  <z-dialog
    v-model="isShowDialog"
    type="warning"
    :before-close="handleBeforeClose"
    @closed="handleClose"
    @confirm="handleConfirm"
  >
    <template #header>
      <span>slotTitle</span>
    </template>
    <span>这是一段信息</span>
  </z-dialog>
</template>
```

:::

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
