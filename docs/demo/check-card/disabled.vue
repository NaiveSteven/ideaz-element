<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  {
    title: 'Card A',
    description: 'Option 1',
    value: 'A',
  },
  {
    title: 'Card B',
    description: 'Option 2',
    value: 'B',
  },
])

const dataSource = [
  {
    title: 'Image Classification',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: 'This is a description of the algorithm',
    disabled: true,
    value: 'A',
  },
  {
    title: 'Object Detection',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: 'This is a description of the algorithm',
    value: 'B',
  },
  {
    title: 'OCR Custom',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: 'This is a description of the algorithm',
    value: 'C',
  },
]

const selectedCard = ref('A')
const val = ref('')
</script>

<template>
  <div>
    <h4>Partially Disabled</h4>
    <z-check-card v-model="val" :options="dataSource" />
  </div>
  <div>
    <h4>Fully Disabled</h4>
    <z-check-card v-model="selectedCard" :options="options" disabled />
  </div>
</template>
