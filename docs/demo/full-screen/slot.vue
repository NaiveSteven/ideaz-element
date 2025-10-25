<script lang="ts" setup>
import { ref } from 'vue'

const isFullScreen = ref(false)

const handleChange = (val) => {
  isFullScreen.value = val
}

const getElement = () => {
  return document.getElementsByClassName('my-water-mark')[1]
}
</script>

<template>
  <div class="my-water-mark bg-white">
    <z-full-screen :el="getElement" @change="handleChange">
      <template #enter>
        <el-button class="z-100">
          Enter full screen
        </el-button>
      </template>
      <template #exit>
        <el-button>
          Exit full screen
        </el-button>
      </template>
    </z-full-screen>
    <z-watermark content="Watermark component">
      <div class="h-500px" />
    </z-watermark>
  </div>
</template>
