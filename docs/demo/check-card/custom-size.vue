<script lang="ts" setup>
import { ref } from 'vue'

const options = [
  {
    title: 'Image Classification',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: 'This is a description of the algorithm',
    value: 'A',
    style: {
      width: '200px',
      height: '200px',
    },
  },
]

const val = ref('A')
</script>

<template>
  <div :style="{ padding: 24, backgroundColor: '#f7f8fa' }">
    <z-check-card v-model="val" :options="options" />
  </div>
</template>
