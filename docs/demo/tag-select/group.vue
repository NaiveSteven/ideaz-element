<script lang="ts" setup>
import { h, ref } from 'vue'
const tagSelect = ref({
  aaa: [1],
  bbb: [2],
})

const options = ref([
  {
    title: () => h('span', 'Tag Name:'),
    field: 'aaa',
    children: [
      { label: 'Tag 1', value: 1 },
      { label: 'Tag 2', value: 2 },
      { label: 'Tag 3', value: 3 },
      { label: 'Tag 4', value: 4 },
    ],
  },
  {
    title: 'titleSlot',
    field: 'bbb',
    children: [
      { label: 'Label', value: 1 },
      { label: 'Suzhou', value: 2 },
      { label: 'Wuxi', value: 3 },
      { label: 'Lianyungang', value: 4 },
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
      <span>City Name:</span>
    </template>
  </z-tag-select>
</template>
