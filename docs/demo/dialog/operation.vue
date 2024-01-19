<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ZDialogTip } from '@ideaz/element'

const isShowDialog = ref(false)
const isShow = ref(false)

const confirmButtonProps = reactive({
  label: '确认按钮',
  type: 'danger',
  loading: false,
})

const cancelButtonProps = reactive({
  label: '取消按钮',
  type: 'primary',
  loading: false,
})

const isConfirmBtnLoading = ref(false)
const isCancelBtnLoading = ref(false)

const openWarningDialog = () => {
  ZDialogTip({
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
    },
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
