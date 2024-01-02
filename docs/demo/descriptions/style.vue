<script lang="ts" setup>
import { ref } from 'vue'

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

const sizeOptions = [
  { label: 'large', value: 'large' },
  { label: 'default ', value: 'default' },
  { label: 'small', value: 'small' },
]

const alignOptions = [
  { label: 'left', value: 'left' },
  { label: 'center', value: 'center' },
  { label: 'right', value: 'right' },
]

const directionOptions = [
  { label: 'vertical', value: 'vertical' },
  { label: 'horizontal', value: 'horizontal' },
]

const size = ref('default')
const align = ref('center')
const labelAlign = ref('center')
const border = ref(true)
const direction = ref('horizontal')
</script>

<template>
  <div class="flex flex-col">
    <div class="mb-4 flex items-center">
      <span class="mr-4 w-20 inline-block text-right">边框</span>
      <el-switch v-model="border" />
    </div>
    <div class="mb-4 flex items-center">
      <span class="mr-4 w-20 inline-block text-right">size</span>
      <z-radio v-model="size" :options="sizeOptions" type="radio-button" />
    </div>
    <div class="mb-4 flex items-center">
      <span class="mr-4 w-20 inline-block text-right">align</span>
      <z-radio v-model="align" :options="alignOptions" type="radio-button" />
    </div>
    <div class="mb-4 flex items-center">
      <span class="mr-4 w-20 inline-block text-right">labelAlign</span>
      <z-radio v-model="labelAlign" :options="alignOptions" type="radio-button" />
    </div>
    <div class="mb-4 flex items-center">
      <span class="mr-4 w-20 inline-block text-right">direction</span>
      <z-radio v-model="direction" :options="directionOptions" type="radio-button" />
    </div>
    <z-descriptions
      :columns="columns"
      :detail="detail"
      :border="border"
      :align="align"
      :label-align="labelAlign"
      :size="size"
      :direction="direction"
    />
  </div>
</template>
