<script lang="ts" setup>
import { ref } from 'vue'

const size = ref('default')

const sizeOptions = ref([
  { label: 'large', value: 'large', type: 'radio-button' },
  { label: 'default', value: 'default', type: 'radio-button' },
  { label: 'small', value: 'small', type: 'radio-button' },
])

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
]

const val = ref('')
</script>

<template>
  <div class="flex flex-col">
    <z-radio v-model="size" :options="sizeOptions" class="mb-2" />
    <z-check-card v-model="val" :options="options" :size="size" />
  </div>
</template>
