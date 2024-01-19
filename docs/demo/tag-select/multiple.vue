<script lang="ts" setup>
import { ref } from 'vue'

const tagSelect = ref([1])
const allTagSelect = ref([1])
const options = [
  { label: '标签一', value: 1 },
  { label: '标签二', value: 2 },
  { label: '标签三', value: 3 },
  { label: '标签四', value: 4 },
]
</script>

<template>
  <z-tag-select
    v-model="tagSelect"
    :multiple="true"
    :options="options"
    title="筛选项一:"
  />
  <z-tag-select
    v-model="allTagSelect"
    :multiple="true"
    :all="false"
    :options="options"
    title="筛选项二:"
  />
</template>
