<script lang="ts" setup>
import { ref } from 'vue'

const tagSelect = ref({
  aaa: {
    aaa: [1],
  },
  bbb: [2],
})

const alias = {
  label: 'title',
  value: 'data.key',
}

const options = ref([
  {
    title: '标签名：',
    field: 'aaa.aaa',
    children: [
      { title: '标签一', data: { key: 1 } },
      { title: '标签二', data: { key: 2 } },
      { title: '标签三', data: { key: 3 } },
      { title: '标签四', data: { key: 4 } },
    ],
  },
  {
    title: '城市名：',
    field: 'bbb',
    children: [
      { title: '标', data: { key: 1 } },
      { title: '苏州', data: { key: 2 } },
      { title: '无锡', data: { key: 3 } },
      { title: '连云港', data: { key: 4 } },
    ],
  },
])
</script>

<template>
  <z-tag-select
    v-model="tagSelect"
    :options="options"
    :multiple="true"
    :alias="alias"
  />
</template>
