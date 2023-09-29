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

`type`传入`info`、`warning`、`error`即可
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
    onConfirm: ({ done, confirmBtnLoading }) => {
      confirmBtnLoading.value = true
      done()
    },
    onCancel: ({ done, cancelBtnLoading }) => {
      done()
    }
  })
}

const openWarningDialog = () => {
  window.ZDialogTip.warning('标题', '提示信息', {
    type: 'warning',
    onConfirm: ({ done, confirmBtnLoading }) => {
      confirmBtnLoading.value = true
    },
    onCancel: ({ done, cancelBtnLoading }) => {
      done()
    }
  })
}

const openDangerDialog = () => {
  window.ZDialogTip({
    type: 'danger',
    message: () => h('span', {}, 'custom message'),
    title: () => h('span', {}, 'custom title'),
    onConfirm: ({ done, confirmBtnLoading }) => {
      confirmBtnLoading.value = true
    },
    onCancel: ({ done, cancelBtnLoading }) => {
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
    onConfirm: async ({ done, confirmBtnLoading }) => {
      confirmBtnLoading.value = true
      await delay(200)
      confirmBtnLoading.value = false
      done()
    },
    onCancel: async ({ done, cancelBtnLoading }) => {
      cancelBtnLoading.value = true
      await delay(200)
      cancelBtnLoading.value = false
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
</script>

<template>
  <el-button link type="primary" @click="isShowDialog = true">
    点击打开slot Dialog
  </el-button>
  <el-button link type="primary" @click="isShowRenderDialog = true">
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

传入`footer`插槽或者`renderFooter`函数自定义底部按钮
:::demo

```vue
<script lang="ts" setup>
import { h, ref } from 'vue'

const isShowDialog = ref(false)
const isShowRenderDialog = ref(false)

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
    :render-footer="renderFooter"
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
  window.ZDialogTip({
    type: 'warning',
    message: '内容',
    title: '标题',
    onConfirm: ({ done, confirmBtnLoading }) => {
      confirmBtnLoading.value = true
    },
    onCancel: ({ done, cancelBtnLoading }) => {
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
