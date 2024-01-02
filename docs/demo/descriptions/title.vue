<script lang="ts" setup>
import { h } from 'vue'
const columns = [
  { label: () => h('span', 'Date'), prop: 'date' },
  { label: 'Name', prop: 'name' },
  { label: 'addressSlot', prop: 'address' },
]
const detail = {
  date: '2016-05-03',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const renderTitle = () => {
  return h('span', '自定义标题')
}
</script>

<template>
  <z-descriptions
    :columns="columns"
    :detail="detail"
    :title="renderTitle"
    extra="extraSlot"
    border
  >
    <template #addressSlot>
      <span>自定义Address</span>
    </template>
  </z-descriptions>
</template>
