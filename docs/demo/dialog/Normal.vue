<script lang="ts" setup>
import { ref } from 'vue'

const isShowDialog = ref(false)
</script>

<template>
  <el-button link type="primary" @click="isShowDialog = true">
    Click to open Dialog
  </el-button>
  <z-dialog
    v-model="isShowDialog"
    title="Dialog Title"
    @confirm="isShowDialog = false"
  >
    <span>This is a piece of information.</span>
  </z-dialog>
</template>
