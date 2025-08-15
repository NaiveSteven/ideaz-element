<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
])

const selectVal = ref([1])
</script>

<template>
  <div class="flex flex-col">
    <z-select v-model="selectVal" :options="options" multiple />
    <z-select
      v-model="selectVal"
      class="mt-4"
      :options="options"
      collapse-tags
      collapse-tags-tooltip
      multiple
    />
  </div>
</template>
