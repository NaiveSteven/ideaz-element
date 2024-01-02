<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  {
    title: 'Card A',
    description: '选项一',
    value: 'A',
  },
  {
    title: 'Card B',
    description: '选项二',
    value: 'B',
  },
])

const dataSource = [
  {
    title: '图像分类',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    disabled: true,
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

const selectedCard = ref('A')
const val = ref('')
</script>

<template>
  <div>
    <h4>部分不可用</h4>
    <z-check-card v-model="val" :options="dataSource" />
  </div>
  <div>
    <h4>整体不可用</h4>
    <z-check-card v-model="selectedCard" :options="options" disabled />
  </div>
</template>
