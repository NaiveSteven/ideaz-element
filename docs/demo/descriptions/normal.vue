<script lang="ts" setup>
const columns = [
  { label: 'Date', prop: 'date' },
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
  />
</template>
