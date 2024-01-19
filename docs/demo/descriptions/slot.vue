<script lang="ts" setup>
import { h } from 'vue'

const columns = [
  { label: 'Date', prop: 'date', render: data => h('span', `自定义${data.date}`) },
  { label: 'Name', prop: 'name' },
  { label: 'Address', prop: 'address' },
]
const detail = {
  date: '2016-05-03',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
</script>

<template>
  <z-descriptions
    :columns="columns"
    :detail="detail"
    border
  >
    <template #detail-name="{ item, size }">
      <el-tag :size="size">
        {{ item.name }}
      </el-tag>
    </template>
    <template #extra>
      <span>extra</span>
    </template>
  </z-descriptions>
</template>
