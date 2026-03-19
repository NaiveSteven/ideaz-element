<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { data: { title: 'Option 1' }, key: 1 },
  { data: { title: 'Option 2' }, key: 2 },
  { data: { title: 'Option 3' }, key: 3 },
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
