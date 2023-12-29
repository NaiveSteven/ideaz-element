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
