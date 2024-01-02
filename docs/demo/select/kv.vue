<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { data: { title: '选项一' }, key: 1 },
  { data: { title: '选项二' }, key: 2 },
  { data: { title: '选项三' }, key: 3 },
])

const alias = {
  label: 'data.title',
  value: 'key',
}

const selectVal = ref(1)
</script>

<template>
  <z-select v-model="selectVal" :alias="alias" :options="options" />
</template>
