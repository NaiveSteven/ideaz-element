<script lang="ts" setup>
import { ref } from 'vue'

const tagSelect = ref([1])
const allTagSelect = ref([1])
const options = [
  { label: 'Tag 1', value: 1 },
  { label: 'Tag 2', value: 2 },
  { label: 'Tag 3', value: 3 },
  { label: 'Tag 4', value: 4 },
]
</script>

<template>
  <z-tag-select
    v-model="tagSelect"
    :multiple="true"
    :options="options"
    title="Filter 1:"
  />
  <z-tag-select
    v-model="allTagSelect"
    :multiple="true"
    :all="false"
    :options="options"
    title="Filter 2:"
  />
</template>
