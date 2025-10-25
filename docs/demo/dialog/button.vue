<script lang="ts" setup>
import { h, ref } from 'vue'

const isShowDialog = ref(false)
const isShowRenderDialog = ref(false)
const isShowFooterDialog = ref(false)

function renderFooter() {
  return h('div', 'Render footer')
}
</script>

<template>
  <ElButton link type="primary" @click="isShowDialog = true">
    Click to open slot dialog
  </ElButton>
  <ElButton link type="primary" @click="isShowRenderDialog = true">
    Click to open render dialog
  </ElButton>
  <ElButton link type="primary" @click="isShowFooterDialog = true">
    Click to open footer dialog
  </ElButton>
  <z-dialog
    v-model="isShowDialog"
    title="Dialog Title"
  >
    <template #footer>
      <ElButton size="default" @click="isShowDialog = false">
        Close dialog
      </ElButton>
    </template>
    <span>This is a piece of information.</span>
  </z-dialog>
  <z-dialog
    v-model="isShowRenderDialog"
    title="Dialog Title"
    :footer="renderFooter"
  >
    <span>This is a piece of information.</span>
  </z-dialog>
  <z-dialog
    v-model="isShowFooterDialog"
    title="Dialog Title"
    :footer="false"
  >
    <span>This is a piece of information.</span>
  </z-dialog>
</template>
