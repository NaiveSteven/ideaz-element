<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { h, ref } from 'vue'

const loading = ref(false)
const tableData = ref([
  {
    name: 'Steven',
    sex: 'male',
    age: 22,
    time: '2020-01-01',
  },
  {
    name: 'Helen',
    sex: 'male',
    age: 12,
    time: '2012-01-01',
  },
  {
    name: 'Nancy',
    sex: 'female',
    age: 18,
    time: '2018-01-01',
  },
  {
    name: 'Jack',
    sex: 'male',
    age: 28,
    time: '2028-01-01',
  },
])

const columns = ref([
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'sex',
    label: '性别',
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    prop: 'time',
    label: '出生日期',
  },
  {
    type: 'button',
    label: '操作',
    buttons: [
      {
        type: 'dropdown',
        reference: '操作',
        placement: 'top-start',
        children: [
          {
            type: 'primary',
            link: true,
            label: '编辑',
            onClick: ({ row }: any) => {
              console.log(row, 'edit')
            },
          },
          {
            type: 'danger',
            link: true,
            label: '删除',
            onClick: ({ row }: any) => {
              console.log(row, 'delete')
            },
          },
        ],
      },
      {
        type: 'dropdown',
        reference: () => h('span', { style: { cursor: 'pointer' } }, '操作2'),
        placement: 'top',
        onVisibleChange: (visible: boolean) => {
          console.log(visible, 'visible')
        },
        children: [
          {
            type: 'primary',
            link: true,
            label: '复制',
            onClick: ({ row }: any) => {
              console.log(row, 'copy')
            },
          },
          {
            type: 'danger',
            link: true,
            label: '操作',
            divided: true,
            onClick: ({ row }: any) => {
              console.log(row, 'operate')
            },
          },
        ],
      },
    ],
  },
])
</script>

<template>
  <z-table
    :data="tableData"
    :loading="loading"
    :columns="columns"
  />
</template>
