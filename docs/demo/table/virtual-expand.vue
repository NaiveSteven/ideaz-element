<template>
  <div>
    <h3>Virtual Table – Expand Feature</h3>

    <div style="margin-bottom: 16px;">
      <el-space>
        <el-button @click="expandAll">
          Expand all
        </el-button>
        <el-button @click="collapseAll">
          Collapse all
        </el-button>
        <el-button @click="expandFirst5">
          Expand first 5 rows
        </el-button>
      </el-space>
    </div>

    <el-alert
      title="✅ Expand feature ready"
      type="success"
      :closable="false"
      style="margin-bottom: 16px;"
    >
      <template #default>
        <p><strong>✅ Expand column support</strong>: Fully supports <code>type: 'expand'</code>; TableV2 handles rows with children automatically.</p>
        <p><strong>✅ Two-way binding</strong>: <code>v-model:expanded-row-keys</code> keeps expanded state in sync.</p>
        <p><strong>✅ Event support</strong>: <code>@expand-change</code> and <code>@row-expand</code> events.</p>
        <p><strong>✅ Method support</strong>: <code>toggleRowExpansion</code> API.</p>
        <p><strong>✅ Slot support</strong>: Customize expanded content via the <code>#expand</code> slot.</p>
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
      <h4>Expand state:</h4>
      <p>Current expanded row IDs: {{ expandedKeys.join(', ') || 'None' }}</p>
      <p>Expanded row count: {{ expandedKeys.length }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'

const detailedText = `Detailed expand content goes here. Include work history, key skills, project experience, and other information.
This longer text renders nicely inside the expand area and supports rich text.
You can insert complex UI components and interactive elements as needed.`

// Generate mock data
function generateData() {
  const data = []
  for (let i = 1; i <= 2000; i++) {
        const rowData: any = {
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      age: 20 + (i % 50),
      department: ['Engineering', 'Marketing', 'Product', 'Operations'][i % 4],
      salary: 5000 + (i % 100) * 100,
      createTime: new Date(2020 + (i % 4), (i % 12), (i % 28) + 1).toLocaleDateString(),
      status: i % 3 === 0 ? 'active' : 'inactive',
    }

    // Add children for expand content
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
const expandedKeys = ref<(string | number)[]>([])
const tableRef = ref()

// Row component used to render expand content
function Row({ cells, rowData }: any) {
  if (rowData.detail) {
    return h('div', {
      class: 'z-table-expand-content',
      style: { padding: '20px', backgroundColor: '#f5f7fa' }
    }, [
      h('h4', {}, `${rowData.parentData?.name} details`),
      h('div', { style: { marginTop: '16px' } }, [
        h('p', {}, [
          h('strong', {}, () => 'Description: '),
          rowData.detail
        ]),
        h('p', {}, [
          h('strong', {}, () => 'Created at: '),
          rowData.parentData?.createTime
        ]),
        h('p', {}, [
          h('strong', {}, () => 'Status: '),
          h('span', {
            style: {
              color: rowData.parentData?.status === 'active' ? '#67C23A' : '#E6A23C',
              fontWeight: 'bold'
            }
          }, rowData.parentData?.status === 'active' ? 'Active' : 'Inactive')
        ])
      ])
    ])
  }
  return cells
}

Row.inheritAttrs = false

// Column config
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
    label: 'Name',
  },
  {
    prop: 'email',
    label: 'Email',
  },
  {
    prop: 'age',
    label: 'Age',
  },
  {
    prop: 'department',
    label: 'Department',
  },
  {
    prop: 'salary',
    label: 'Salary',
    render: ({ row }: any) => `¥${row.salary.toLocaleString()}`
  }
]

// Expanded row key change
function handleExpandedRowsChange(_keys: (string | number)[]) {
  // console.log('Expanded row keys changed (expanded-rows-change):', _keys)
}

// Row expand event
function handleRowExpand(_params: any) {
  // console.log('Row expand event (row-expand):', _params)
}

// Expand all
function expandAll() {
  expandedKeys.value = tableData.value.map(row => row.id)
}

// Collapse all
function collapseAll() {
  expandedKeys.value = []
}

// Expand first five rows
function expandFirst5() {
  expandedKeys.value = tableData.value.slice(0, 5).map(row => row.id)
}
</script>

<style scoped>
.z-table-expand-content {
  background-color: #f5f7fa;
}
</style>
