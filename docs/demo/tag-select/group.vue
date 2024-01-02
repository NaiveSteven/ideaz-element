<script lang="ts" setup>
import { h, ref } from 'vue'
const tagSelect = ref({
  aaa: [1],
  bbb: [2],
})

const options = ref([
  {
    title: () => h('span', '标签名：'),
    field: 'aaa',
    children: [
      { label: '标签一', value: 1 },
      { label: '标签二', value: 2 },
      { label: '标签三', value: 3 },
      { label: '标签四', value: 4 },
    ],
  },
  {
    title: 'titleSlot',
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
  >
    <template #titleSlot>
      <span>城市名：</span>
    </template>
  </z-tag-select>
</template>
