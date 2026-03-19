<script lang="ts" setup>
import { ref } from 'vue'

const options = [
  {
    data: {
      label: 'Image Classification',
      key: 'A',
    },
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: 'This is a description of the algorithm',
  },
  {
    data: {
      label: 'Object Detection',
      key: 'B',
    },
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: 'This is a description of the algorithm',
  },
  {
    data: {
      label: 'OCR Custom',
      key: 'C',
    },
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: 'This is a description of the algorithm',
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
