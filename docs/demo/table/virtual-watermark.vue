<template>
  <div>
    <h3>虚拟表格 - 水印功能</h3>

    <div style="margin-bottom: 16px;">
      <el-space>
        <el-button @click="toggleWatermark">
          {{ currentWatermarkType === 'none' ? '启用字符串水印' : currentWatermarkType === 'string' ? '切换到对象水印' : '禁用水印' }}
        </el-button>
        <el-text type="info">当前水印模式: {{ watermarkModeText }}</el-text>
      </el-space>
    </div>

    <el-alert
      title="✅ 水印功能已兼容虚拟表格"
      type="success"
      :closable="false"
      style="margin-bottom: 16px;"
    >
      <template #default>
        <p><strong>✅ 字符串水印</strong>：支持简单的字符串水印内容</p>
        <p><strong>✅ 对象水印</strong>：支持完整的水印配置，包括字体、颜色、角度等</p>
        <p><strong>✅ 动态切换</strong>：支持运行时动态开启/关闭/修改水印</p>
        <p><strong>✅ 虚拟滚动兼容</strong>：水印在虚拟滚动表格中正常显示</p>
      </template>
    </el-alert>

    <z-table
      :data="tableData"
      :columns="columns"
      :virtual="{ enabled: true, itemHeight: 48, threshold: 100 }"
      :watermark="currentWatermark"
      height="500px"
      border
      stripe
      row-key="id"
    />

    <div style="margin-top: 16px;">
      <h4>功能说明：</h4>
      <ul>
        <li><strong>字符串水印</strong>：直接传入字符串作为水印内容</li>
        <li><strong>对象水印</strong>：传入配置对象，自定义水印样式</li>
        <li><strong>虚拟滚动兼容</strong>：水印层级高于表格内容，在虚拟滚动中正常显示</li>
        <li><strong>性能优化</strong>：水印不影响虚拟滚动的性能表现</li>
      </ul>
    </div>

    <div style="margin-top: 16px;">
      <h4>当前配置：</h4>
      <pre style="padding: 12px; font-size: 12px; background: #f5f7fa; border-radius: 4px;">{{ JSON.stringify(currentWatermark, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// 生成测试数据
function generateLargeData(count: number) {
  const names = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十', '郑十一', '王十二']
  const departments = ['技术部', '产品部', '设计部', '运营部', '市场部', '销售部', '人力资源部', '财务部']
  const data = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}${Math.floor(i / names.length) + 1}`,
      email: `user${i + 1}@company.com`,
      age: 22 + (i % 40),
      department: departments[i % departments.length],
      salary: 5000 + Math.floor(Math.random() * 10000),
      status: i % 3 === 0 ? 'active' : 'inactive',
      joinDate: `2023-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`
    })
  }
  return data
}

const tableData = ref(generateLargeData(2000))

const columns = ref([
  {
    type: 'selection',
  },
  {
    type: 'index',
    label: '序号',
  },
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'email',
    label: '邮箱',
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    prop: 'department',
    label: '部门',
  },
  {
    prop: 'salary',
    label: '薪资',
    render: ({ row }: any) => `¥${row.salary.toLocaleString()}`
  },
  {
    prop: 'status',
    label: '状态',
    render: ({ row }: any) => row.status === 'active' ? '在职' : '离职'
  },
  {
    prop: 'joinDate',
    label: '入职日期',
  }
])

// 水印状态管理
const currentWatermarkType = ref<'none' | 'string' | 'object'>('none')

const currentWatermark = computed(() => {
  switch (currentWatermarkType.value) {
    case 'string':
      return 'ideaz-element 虚拟表格水印'
    case 'object':
      return {
        content: 'ideaz-element',
        fontColor: 'rgba(0, 0, 0, 0.15)',
        rotate: -20,
        gap: [100, 100],
        offset: [50, 50]
      }
    default:
      return false
  }
})

const watermarkModeText = computed(() => {
  switch (currentWatermarkType.value) {
    case 'string':
      return '字符串水印'
    case 'object':
      return '对象配置水印'
    default:
      return '无水印'
  }
})

function toggleWatermark() {
  if (currentWatermarkType.value === 'none') {
    currentWatermarkType.value = 'string'
  } else if (currentWatermarkType.value === 'string') {
    currentWatermarkType.value = 'object'
  } else {
    currentWatermarkType.value = 'none'
  }
}
</script>
