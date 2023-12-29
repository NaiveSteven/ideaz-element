<script lang="ts" setup>
import { ref } from 'vue'

const isShowInfoDialog = ref(false)
const isShowWarningDialog = ref(false)
const isShowDangerDialog = ref(false)
</script>

<template>
  <el-button link type="primary" @click="isShowInfoDialog = true">
    信息弹窗
  </el-button>
  <el-button link type="primary" @click="isShowWarningDialog = true">
    警告弹窗
  </el-button>
  <el-button link type="primary" @click="isShowDangerDialog = true">
    错误弹窗
  </el-button>
  <z-dialog
    v-model="isShowInfoDialog"
    type="info"
    title="信息"
    @confirm="isShowInfoDialog = false"
  >
    <span>这是一段信息</span>
  </z-dialog>
  <z-dialog
    v-model="isShowWarningDialog"
    type="warning"
    title="警告"
    @confirm="isShowWarningDialog = false"
  >
    <span>这是一段信息</span>
  </z-dialog>
  <z-dialog
    v-model="isShowDangerDialog"
    type="danger"
    title="错误"
    @confirm="isShowDangerDialog = false"
  >
    <span>这是一段信息</span>
  </z-dialog>
</template>
