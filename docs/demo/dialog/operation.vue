<script lang="ts" setup>
import { reactive, ref } from 'vue'

const isShowDialog = ref(false)
const isShow = ref(false)

const confirmButtonProps = reactive({
  label: 'Confirm',
  type: 'danger',
  loading: false,
})

const cancelButtonProps = reactive({
  label: 'Cancel',
  type: 'primary',
  loading: false,
})

const isConfirmBtnLoading = ref(false)
const isCancelBtnLoading = ref(false)

function openWarningDialog() {
  window.ZDialogTip({
    type: 'warning',
    message: 'Warning message',
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

async function handleConfirm() {
  confirmButtonProps.loading = true
  try {
    await delay(200)
    confirmButtonProps.loading = false
    isShowDialog.value = false
  }
  catch {}
  confirmButtonProps.loading = false
}

async function handleCancel() {
  cancelButtonProps.loading = true
  try {
    await delay(200)
    cancelButtonProps.loading = false
    isShowDialog.value = false
  }
  catch {}
  cancelButtonProps.loading = false
}

async function confirm() {
  isConfirmBtnLoading.value = true
  try {
    await delay(200)
    isConfirmBtnLoading.value = false
    isShow.value = false
  }
  catch {}
  isConfirmBtnLoading.value = false
}

async function cancel() {
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
    Event configuration
  </el-button>
  <el-button link type="primary" @click="isShowDialog = true">
    Object prop configuration
  </el-button>
  <el-button link type="primary" @click="isShow = true">
    Basic prop configuration
  </el-button>
  <z-dialog
    v-model="isShowDialog"
    title="Dialog Title"
    :confirm-button-props="confirmButtonProps"
    :cancel-button-props="cancelButtonProps"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <span>This is a piece of information.</span>
  </z-dialog>
  <z-dialog
    v-model="isShow"
    title="Dialog Title"
    confirm-button-label="Confirm"
    cancel-button-label="Cancel"
    :confirm-button-loading="isConfirmBtnLoading"
    :cancel-button-loading="isCancelBtnLoading"
    @confirm="confirm"
    @cancel="cancel"
  >
    <span>This is a piece of information.</span>
  </z-dialog>
</template>
