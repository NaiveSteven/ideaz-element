<script lang="ts" setup>
import { h } from 'vue'
import { ZDialogTip } from '@ideaz/element'

const openInfoDialog = () => {
  ZDialogTip({
    type: 'info',
    message: '提示信息',
    onConfirm: ({ done, confirmButtonLoading }) => {
      confirmButtonLoading.value = true
      done()
    },
    onCancel: ({ done, cancelButtonLoading }) => {
      done()
    },
  })
}

const openWarningDialog = () => {
  ZDialogTip.warning('提示信息', '标题', {
    type: 'warning',
    onConfirm: ({ done, confirmButtonLoading }) => {
      confirmButtonLoading.value = true
    },
    onCancel: ({ done, cancelButtonLoading }) => {
      done()
    },
  })
}

const openDangerDialog = () => {
  ZDialogTip({
    type: 'danger',
    message: () => h('span', {}, 'custom message'),
    title: () => h('span', {}, 'custom title'),
    onConfirm: ({ done, confirmButtonLoading }) => {
      confirmButtonLoading.value = true
    },
    onCancel: ({ done, cancelButtonLoading }) => {
      done()
    },
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
