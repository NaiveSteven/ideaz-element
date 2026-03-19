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
    title: 'Tag Name:',
    field: 'aaa.aaa',
    children: [
      { title: 'Tag 1', data: { key: 1 } },
      { title: 'Tag 2', data: { key: 2 } },
      { title: 'Tag 3', data: { key: 3 } },
      { title: 'Tag 4', data: { key: 4 } },
    ],
  },
  {
    title: 'City Name:',
    field: 'bbb',
    children: [
      { title: 'Label', data: { key: 1 } },
      { title: 'Suzhou', data: { key: 2 } },
      { title: 'Wuxi', data: { key: 3 } },
      { title: 'Lianyungang', data: { key: 4 } },
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
