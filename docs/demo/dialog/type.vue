<script lang="ts" setup>
import { ref } from 'vue'

const isShowInfoDialog = ref(false)
const isShowWarningDialog = ref(false)
const isShowDangerDialog = ref(false)
</script>

<template>
  <el-button link type="primary" @click="isShowInfoDialog = true">
    Info Dialog
  </el-button>
  <el-button link type="primary" @click="isShowWarningDialog = true">
    Warning Dialog
  </el-button>
  <el-button link type="primary" @click="isShowDangerDialog = true">
    Error Dialog
  </el-button>
  <z-dialog
    v-model="isShowInfoDialog"
    type="info"
    title="Info"
    @confirm="isShowInfoDialog = false"
  >
    <span>This is a piece of information.</span>
  </z-dialog>
  <z-dialog
    v-model="isShowWarningDialog"
    type="warning"
    title="Warning"
    @confirm="isShowWarningDialog = false"
  >
    <span>This is a piece of information.</span>
  </z-dialog>
  <z-dialog
    v-model="isShowDangerDialog"
    type="danger"
    title="Error"
    @confirm="isShowDangerDialog = false"
  >
    <span>This is a piece of information.</span>
  </z-dialog>
</template>
