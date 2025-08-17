<script lang="ts" setup>
import { ref } from 'vue'

const tagSelect = ref(1)
const options = [
  { label: 'Tag 1', value: 1 },
  { label: 'Tag 2', value: 2 },
  { label: 'Tag 3', value: 3 },
  { label: 'Tag 4', value: 4 },
  { label: 'Tag 5', value: 5 },
  { label: 'Tag 6', value: 6 },
  { label: 'Tag 7', value: 7 },
  { label: 'Tag 8', value: 8 },
  { label: 'Tag 9', value: 9 },
  { label: 'Tag 10', value: 10 },
  { label: 'Tag 11', value: 11 },
  { label: 'Tag 12', value: 12 },
  { label: 'Tag 13', value: 13 },
  { label: 'Tag 14', value: 14 },
  { label: 'Tag 15', value: 15 },
  { label: 'Tag 16', value: 16 },
  { label: 'Tag 17', value: 17 },
  { label: 'Tag 18', value: 17 },
  { label: 'Tag 19', value: 19 },
  { label: 'Tag 20', value: 20 },
  { label: 'Tag 21', value: 21 },
  { label: 'Tag 22', value: 22 },
  { label: 'Tag 23', value: 23 },
  { label: 'Tag 24', value: 24 },
]
</script>

<template>
  <z-tag-select
    v-model="tagSelect"
    :options="options"
    title="Filter:"
  />
</template>
