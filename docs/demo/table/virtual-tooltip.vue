<script lang="ts" setup>
import { h, ref } from 'vue'

// 生成大量测试数据
function generateLargeData(count: number) {
  const names = ['Steven', 'Helen', 'Nancy', 'Jack', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']
  const genders = ['male', 'female']
  const departments = ['技术部', '产品部', '设计部', '运营部', '市场部']
  const data = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}-${i + 1}`,
      gender: genders[i % genders.length],
      age: 18 + (i % 50),
      department: departments[i % departments.length],
      time: `202${(i % 4) + 0}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      email: `user${i + 1}@company.com`,
    })
  }
  return data
}

const tableData = ref(generateLargeData(1000))

const columns = ref([
  {
    prop: 'id',
    label: 'ID',
    width: 100,
    tooltip: '用户唯一标识符',
  },
  {
    prop: 'name',
    label: '姓名',
    width: 150,
    tooltip: () => h('div', [
      h('div', '员工姓名信息'),
      h('div', { style: { color: '#999', fontSize: '12px' } }, '点击可查看详情')
    ]),
  },
  {
    prop: 'gender',
    label: '性别',
    width: 120,
    tooltip: '员工性别：男性(male) / 女性(female)',
  },
  {
    prop: 'age',
    label: '年龄',
    width: 120,
    tooltip: '员工当前年龄，范围18-67岁',
  },
  {
    prop: 'department',
    label: '部门',
    width: 120,
    tooltip: () => h('el-tag', { type: 'info', size: 'small' }, () => '所属部门信息'),
  },
  {
    prop: 'email',
    label: '邮箱',
    width: 200,
    tooltip: '企业邮箱地址，用于内部沟通',
  },
  {
    prop: 'time',
    label: '入职日期',
    width: 200,
    tooltip: () => h('div', { style: { textAlign: 'center' } }, [
      h('i', { class: 'el-icon-calendar', style: { marginRight: '4px' } }),
      '员工入职时间'
    ]),
  },
])
</script>

<template>
  <div>
    <h4>列提示功能测试 (1000条数据)</h4>
    <p>鼠标悬停在列标题上可查看提示信息，支持字符串和render函数两种方式</p>

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
