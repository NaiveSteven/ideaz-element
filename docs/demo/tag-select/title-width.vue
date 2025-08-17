<script lang="ts" setup>
import { ref } from 'vue'
const tagSelect = ref({
  aaa: [1],
  bbb: [2],
})

const options = ref([
  {
    title: 'Tag Name Tag Name:',
    field: 'aaa',
    children: [
      { label: 'Tag 1', value: 1 },
      { label: 'Tag 2', value: 2 },
      { label: 'Tag 3', value: 3 },
      { label: 'Tag 4', value: 4 },
    ],
  },
  {
    title: 'City Name:',
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
    title-width="115px"
  />
</template>
