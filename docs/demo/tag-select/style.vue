<script lang="ts" setup>
import { ref } from 'vue'
const tagSelect = ref({
  aaa: [1],
  bbb: [2],
})

const options = ref([
  {
    title: 'Tag Name:',
    field: 'aaa',
    children: [
      { label: 'Tag 1', value: 1, round: true },
      { label: 'Tag 2', value: 2, type: 'success' },
      { label: 'Tag 3', value: 3, effect: 'light' },
      { label: 'Tag 4', value: 4, effect: 'plain' },
    ],
  },
  {
    title: 'City Name:',
    field: 'bbb',
    children: [
      { label: 'Label', value: 1, round: true },
      { label: 'Suzhou', value: 2, type: 'success' },
      { label: 'Wuxi', value: 3, effect: 'light' },
      { label: 'Lianyungang', value: 4, effect: 'plain' },
    ],
  },
])
</script>

<template>
  <z-tag-select
    v-model="tagSelect"
    :options="options"
    :multiple="true"
  />
</template>
