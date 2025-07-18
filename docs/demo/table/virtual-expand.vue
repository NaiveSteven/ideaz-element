<template>
  <div>
    <h3>虚拟表格 - 展开功能</h3>

    <div style="margin-bottom: 16px;">
      <el-space>
        <el-button @click="expandAll">
          展开所有
        </el-button>
        <el-button @click="collapseAll">
          收起所有
        </el-button>
        <el-button @click="expandFirst5">
          展开前5行
        </el-button>
      </el-space>
    </div>

    <el-alert
      title="✅ 展开功能已完成"
      type="success"
      :closable="false"
      style="margin-bottom: 16px;"
    >
      <template #default>
        <p><strong>✅ 展开列支持</strong>：完全支持 <code>type: 'expand'</code> 列配置，TableV2自动处理有children的行</p>
        <p><strong>✅ 双向绑定</strong>：<code>v-model:expanded-row-keys</code> 支持双向绑定展开状态</p>
        <p><strong>✅ 事件支持</strong>：<code>@expand-change</code>、<code>@row-expand</code> 事件</p>
        <p><strong>✅ 方法支持</strong>：<code>toggleRowExpansion</code> 方法</p>
        <p><strong>✅ 插槽支持</strong>：<code>#expand</code> 插槽自定义展开内容</p>
      </template>
    </el-alert>

        <z-table
      ref="tableRef"
      :data="tableData"
      :columns="columns"
      v-model:expanded-row-keys="expandedKeys"
      :virtual="{ enabled: true, itemHeight: 48, threshold: 100, estimatedRowHeight: 48  }"
      height="500px"
      border
      stripe
      row-key="id"
      @expanded-rows-change="handleExpandedRowsChange"
      @row-expand="handleRowExpand"
    >
      <template #expand="props">
        <Row v-bind="props" />
      </template>
    </z-table>

    <div style="margin-top: 16px;">
      <h4>展开状态：</h4>
      <p>当前展开的行ID：{{ expandedKeys.join(', ') || '无' }}</p>
      <p>展开的行数量：{{ expandedKeys.length }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'

const detailedText = `这是详细的展开内容。包含了工作经历、技能特长、项目经验等详细信息。
这个内容比较长，适合在展开区域中显示。支持多行文本和富文本内容。
可以包含各种复杂的UI组件和交互元素。`

// 生成测试数据
function generateData() {
  const data = []
  for (let i = 1; i <= 2000; i++) {
        const rowData: any = {
      id: i,
      name: `用户 ${i}`,
      email: `user${i}@example.com`,
      age: 20 + (i % 50),
      department: ['技术部', '市场部', '产品部', '运营部'][i % 4],
      salary: 5000 + (i % 100) * 100,
      createTime: new Date(2020 + (i % 4), (i % 12), (i % 28) + 1).toLocaleDateString(),
      status: i % 3 === 0 ? 'active' : 'inactive',
    }

    // 添加children用于展开内容
    rowData.children = [
      {
        id: `${rowData.id}-detail-content`,
        detail: detailedText,
        parentData: rowData
      }
    ]

    data.push(rowData)
  }
  return data
}

const tableData = ref(generateData())
const expandedRows = ref<any[]>([])
const expandedKeys = ref<(string | number)[]>([])
const tableRef = ref()

// Row组件用于渲染行内容
function Row({ cells, rowData }: any) {
  if (rowData.detail) {
    return h('div', {
      class: 'z-table-expand-content',
      style: { padding: '20px', backgroundColor: '#f5f7fa' }
    }, [
      h('h4', {}, `${rowData.parentData?.name} 的详细信息`),
      h('div', { style: { marginTop: '16px' } }, [
        h('p', {}, [
          h('strong', {}, () => '详细描述：'),
          rowData.detail
        ]),
        h('p', {}, [
          h('strong', {}, () => '创建时间：'),
          rowData.parentData?.createTime
        ]),
        h('p', {}, [
          h('strong', {}, () => '状态：'),
          h('span', {
            style: {
              color: rowData.parentData?.status === 'active' ? '#67C23A' : '#E6A23C',
              fontWeight: 'bold'
            }
          }, rowData.parentData?.status === 'active' ? '活跃' : '非活跃')
        ])
      ])
    ])
  }
  return cells
}

Row.inheritAttrs = false

// 列配置
const columns = [
  {
    type: 'expand',
    width: 60
  },
  {
    prop: 'id',
    label: 'ID',
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
  }
]

// 展开变化事件
function _handleExpandChange(row: any, expanded: boolean) {
  // console.log('展开状态变化 (expand-change):', row.name, expanded)

  if (expanded) {
    if (!expandedRows.value.find(r => r.id === row.id)) {
      expandedRows.value.push(row)
    }
  } else {
    const index = expandedRows.value.findIndex(r => r.id === row.id)
    if (index > -1) {
      expandedRows.value.splice(index, 1)
    }
  }
}



// 展开行keys变化事件
  function handleExpandedRowsChange(_keys: (string | number)[]) {
    // console.log('展开行keys变化 (expanded-rows-change):', _keys)
  }

  // 行展开事件
  function handleRowExpand(_params: any) {
    // console.log('行展开事件 (row-expand):', _params)
}

// 展开所有
function expandAll() {
  expandedKeys.value = tableData.value.map(row => row.id)
}

// 收起所有
function collapseAll() {
  expandedKeys.value = []
}

// 展开前5行
function expandFirst5() {
  expandedKeys.value = tableData.value.slice(0, 5).map(row => row.id)
}
</script>

<style scoped>
.z-table-expand-content {
  background-color: #f5f7fa;
}
</style>
