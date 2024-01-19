<script lang="ts" setup>
import { ref } from 'vue'

const options = [
  {
    title: '图像分类',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'A',
  },
  {
    title: '物体检测',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'B',
  },
  {
    title: 'OCR自定义',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'C',
  },
  {
    title: 'OCR',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'D',
  },
  {
    title: '视频分类',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'E',
  },
  {
    title: '关键点检测',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'F',
    disabled: true,
  },
]

const handleChange = (val) => {
  console.log(val, 'handleChange')
}

const val = ref('E')
</script>

<template>
  <div :style="{ padding: 24, backgroundColor: '#f7f8fa' }">
    <z-check-card v-model="val" :options="options" @change="handleChange" />
  </div>
</template>
