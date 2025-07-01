<script lang="ts" setup>
import { h, ref } from 'vue'

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
      score: Math.floor(Math.random() * 100) + 1,
    })
  }
  return data
}

const tableData = ref(generateLargeData(1200))

const columns = ref([
  {
    prop: 'id',
    label: 'ID',
    width: 100,
  },
  {
    prop: 'name',
    label: () => h('div', { style: { color: '#409eff' } }, [
      h('i', { class: 'el-icon-user', style: { marginRight: '4px' } }),
      '用户姓名'
    ]),
    width: 150,
  },
  {
    prop: 'gender',
    label: 'genderHeaderSlot',
    width: 120,
  },
  {
    prop: 'age',
    label: () => h('el-tag', { type: 'warning', size: 'small' }, () => '年龄'),
    width: 120,
  },
  {
    prop: 'score',
    label: 'scoreHeaderSlot',
    width: 120,
  },
  {
    prop: 'time',
    label: () => h('div', { style: { textAlign: 'center' } }, [
      h('div', '出生'),
      h('div', { style: { fontSize: '12px', color: '#999' } }, '日期')
    ]),
    width: 200,
  },
])
</script>

<template>
  <div>
    <h4>表格头自定义功能测试 (1200条数据)</h4>
    <p>支持 render 函数和 slot 两种方式自定义表头</p>

    <z-table
      :data="tableData"
      :columns="columns"
      :virtual="{ enabled: true, itemHeight: 48, threshold: 100 }"
      height="400px"
      border
      stripe
    >
      <!-- 性别表头自定义插槽 -->
      <template #genderHeaderSlot="scope">
        <el-tooltip content="点击查看性别统计" placement="top">
          <el-button link type="primary" size="small">
            <i class="el-icon-male" style="margin-right: 4px;"></i>
            性别 {{ scope.$index }}
          </el-button>
        </el-tooltip>
      </template>

      <!-- 评分表头自定义插槽 -->
      <template #scoreHeaderSlot>
        <div style="display: flex; align-items: center; justify-content: center;">
          <el-rate :model-value="5" disabled size="small" style="margin-right: 4px;" />
          <span>评分</span>
        </div>
      </template>
    </z-table>
  </div>
</template>
