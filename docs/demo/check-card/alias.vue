<script lang="ts" setup>
import { ref } from 'vue'

const options = [
  {
    data: {
      label: '图像分类',
      key: 'A',
    },
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
  },
  {
    data: {
      label: '物体检测',
      key: 'B',
    },
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
  },
  {
    data: {
      label: 'OCR自定义',
      key: 'C',
    },
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
  },
]

const alias = {
  title: 'data.label',
  value: 'data.key',
}

const val = ref(['A'])
</script>

<template>
  <div :style="{ padding: 24, backgroundColor: '#f7f8fa' }">
    <z-check-card v-model="val" :options="options" :multiple="true" :alias="alias" />
  </div>
</template>
