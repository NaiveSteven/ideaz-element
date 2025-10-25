<script lang="ts" setup>
import { h } from 'vue'

function openInfoDialog() {
  window.ZDialogTip({
    type: 'info',
    message: 'Notification message',
    onConfirm: ({ done, confirmButtonLoading }) => {
      confirmButtonLoading.value = true
      done()
    },
    onCancel: ({ done }) => {
      done()
    },
  })
}

function openWarningDialog() {
  window.ZDialogTip.warning('Warning message', 'Dialog Title', {
    type: 'warning',
    onConfirm: ({ confirmButtonLoading }) => {
      confirmButtonLoading.value = true
    },
    onCancel: ({ done }) => {
      done()
    },
  })
}

function openDangerDialog() {
  window.ZDialogTip({
    type: 'danger',
    message: () => h('span', {}, 'custom message'),
    title: () => h('span', {}, 'custom title'),
    onConfirm: ({ confirmButtonLoading }) => {
      confirmButtonLoading.value = true
    },
    onCancel: ({ done }) => {
      done()
    },
  })
}
</script>

<template>
  <el-button link type="primary" @click="openInfoDialog">
    Info Dialog
  </el-button>
  <el-button link type="primary" @click="openWarningDialog">
    Warning Dialog
  </el-button>
  <el-button link type="primary" @click="openDangerDialog">
    Error Dialog
  </el-button>
</template>
