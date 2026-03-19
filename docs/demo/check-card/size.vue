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
    title: 'Image Classification',
    avatar: 'https://gw.alipayobjects.com/zos/bmw-prod/ae0adacf-9456-4ed3-b1ab-51e4417d8d0c.svg',
    description: 'This is a description of the algorithm',
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

const val = ref('')
</script>

<template>
  <div class="flex flex-col">
    <z-radio v-model="size" :options="sizeOptions" class="mb-2" />
    <z-check-card v-model="val" :options="options" :size="size" />
  </div>
</template>
