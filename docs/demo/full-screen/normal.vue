<script lang="ts" setup>
const getElement = () => {
  return document.getElementsByClassName('my-water-mark')[0]
}
</script>

<template>
  <z-full-screen :el="getElement">
    <el-button>点击全屏</el-button>
  </z-full-screen>
  <z-watermark content="水印组件" class="my-water-mark bg-white">
    <div class="h-500px" />
  </z-watermark>
</template>
