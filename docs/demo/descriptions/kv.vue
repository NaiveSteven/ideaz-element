<script lang="ts" setup>
const columns = [
  { label: 'Date', prop: 'date' },
  { label: 'Name', prop: 'people[0].name' },
  { label: 'Address', prop: 'data.address' },
]
const detail = {
  date: '2016-05-03',
  name: 'Tom',
  data: {
    address: 'No. 189, Grove St, Los Angeles',
  },
  people: [{ name: 'Steven' }],
}
</script>

<template>
  <z-descriptions
    :columns="columns"
    :detail="detail"
  />
</template>
