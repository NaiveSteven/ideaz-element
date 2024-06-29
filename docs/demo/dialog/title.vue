<script lang="ts" setup>
import { h, ref } from 'vue'

const isShowDialog = ref(false)
const isShowRenderDialog = ref(false)

function renderTitle() {
  return h('span', 'render标题')
}

function handleClick() {
  window.ZDialogTip({
    type: 'danger',
    message: () => h('span', {}, 'custom message'),
    title: () => h('span', {}, 'custom title'),
    onConfirm: ({ done, confirmButtonLoading }) => {
      confirmButtonLoading.value = true
      done()
    },
    onCancel: ({ done, cancelButtonLoading }) => {
      cancelButtonLoading.value = true
      done()
      cancelButtonLoading.value = false
    },
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
