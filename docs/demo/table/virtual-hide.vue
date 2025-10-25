<script lang="ts" setup>
import { ref } from 'vue'

const isHide = ref(false)

// Generate large dataset
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
    width: 200,
  },
  {
    prop: 'name',
    label: 'Name',
    hide: () => isHide.value,
    width: 200
  },
  {
    prop: 'gender',
    label: 'Gender',
    hide: true, // Hidden by default
    width: 200
  },
  {
    prop: 'age',
    label: 'Age',
    width: 200
  },
  {
    prop: 'time',
    label: 'Date of Birth',
    width: 200
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
      <h4>Column visibility demo (2,000 rows)</h4>
      <el-space>
        <el-button @click="changeVisible">
          {{ isHide ? 'Show' : 'Hide' }} Name column
        </el-button>
        <el-button @click="toggleGender">
          Toggle Gender column
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
