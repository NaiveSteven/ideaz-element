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
