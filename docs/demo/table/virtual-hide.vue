<script lang="ts" setup>
import { ref } from 'vue'

const isHide = ref(false)

// 生成大量测试数据
function generateLargeData(count: number) {
  const names = ['Steven', 'Helen', 'Nancy', 'Jack', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']
  const genders = ['male', 'female']
  const data = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}-${i + 1}`,
      gender: genders[i % genders.length],
      age: 18 + (i % 50),
      time: `202${(i % 4) + 0}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    })
  }
  return data
}

const tableData = ref(generateLargeData(2000))

const columns = ref([
  {
    prop: 'id',
    label: 'ID',
    width: 100,
  },
  {
    prop: 'name',
    label: '姓名',
    width: 150,
    hide: () => isHide.value,
  },
  {
    prop: 'gender',
    label: '性别',
    width: 120,
    hide: true, // 默认隐藏
  },
  {
    prop: 'age',
    label: '年龄',
    width: 120,
  },
  {
    prop: 'time',
    label: '出生日期',
    width: 200,
  },
])

function changeVisible() {
  isHide.value = !isHide.value
}

function toggleGender() {
  const genderColumn = columns.value.find(col => col.prop === 'gender')
  if (genderColumn) {
    genderColumn.hide = !genderColumn.hide
  }
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <h4>列显隐功能测试 (2000条数据)</h4>
      <el-space>
        <el-button @click="changeVisible">
          {{ isHide ? '显示' : '隐藏' }}姓名列
        </el-button>
        <el-button @click="toggleGender">
          切换性别列显隐
        </el-button>
      </el-space>
    </div>

    <z-table
      :data="tableData"
      :columns="columns"
      :virtual="{ enabled: true, itemHeight: 48, threshold: 100 }"
      height="400px"
      border
      stripe
    />
  </div>
</template>
