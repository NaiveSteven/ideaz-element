<script lang="ts" setup>
import { ref } from 'vue'

const options = [
  {
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg',
    value: 'A',
  },
  {
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: '这是一段关于该算法的说明',
    value: 'B',
  },
  {
    title: 'OCR自定义',
    description: '这是一段关于该算法的说明',
    value: 'C',
  },
  {
    title: 'OCR自定义',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    value: 'D',
  },
  {
    title: 'OCR自定义',
    value: 'E',
  },
  {
    description: '这是一段关于该算法的说明',
    value: 'F',
  },
]

const val = ref('')
</script>

<template>
  <ZCheckCard v-model="val" :options="options" />
</template>
