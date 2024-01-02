<script lang="ts" setup>
import { ref } from 'vue'

const tagSelect = ref(1)
const options = [
  { label: '标签一', value: 1 },
  { label: '标签二', value: 2 },
  { label: '标签三', value: 3 },
  { label: '标签四', value: 4 },
  { label: '标签五', value: 5 },
  { label: '标签六', value: 6 },
  { label: '标签七', value: 7 },
  { label: '标签八', value: 8 },
  { label: '标签九', value: 9 },
  { label: '标签十', value: 10 },
  { label: '标签十一', value: 11 },
  { label: '标签十二', value: 12 },
  { label: '标签十三', value: 13 },
  { label: '标签十四', value: 14 },
  { label: '标签十五', value: 15 },
  { label: '标签十六', value: 16 },
  { label: '标签十七', value: 17 },
  { label: '标签十八', value: 17 },
  { label: '标签十九', value: 19 },
  { label: '标签二十', value: 20 },
  { label: '标签二十一', value: 21 },
  { label: '标签二十二', value: 22 },
  { label: '标签二十三', value: 23 },
  { label: '标签二十四', value: 24 },
]
</script>

<template>
  <z-tag-select
    v-model="tagSelect"
    :options="options"
    title="筛选项:"
  />
</template>
