<script lang="ts" setup>
import { ref } from 'vue'
const tagSelect = ref({
  aaa: [1],
  bbb: [2],
})

const options = ref([
  {
    title: '标签名标签名：',
    field: 'aaa',
    children: [
      { label: '标签一', value: 1 },
      { label: '标签二', value: 2 },
      { label: '标签三', value: 3 },
      { label: '标签四', value: 4 },
    ],
  },
  {
    title: '城市名：',
    field: 'bbb',
    children: [
      { label: '标', value: 1 },
      { label: '苏州', value: 2 },
      { label: '无锡', value: 3 },
      { label: '连云港', value: 4 },
    ],
  },
])
</script>

<template>
  <z-tag-select
    v-model="tagSelect"
    :options="options"
    :multiple="true"
    title-width="115px"
  />
</template>
