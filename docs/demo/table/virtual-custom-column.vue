<template>
  <div>
    <h3>虚拟表格 - 列自定义</h3>

    <div style="margin-bottom: 16px;">
      <el-space>
        <el-button @click="toggleCustomMode">
          {{ useSlotMode ? '切换到Render模式' : '切换到Slot模式' }}
        </el-button>
        <el-text type="info">当前模式: {{ useSlotMode ? 'Slot插槽' : 'Render函数' }}</el-text>
      </el-space>
    </div>

    <el-alert
      title="✅ 列自定义功能"
      type="success"
      :closable="false"
      style="margin-bottom: 16px;"
    >
      <template #default>
        <p><strong>✅ Render函数</strong>：使用render函数进行列内容自定义</p>
        <p><strong>✅ Slot插槽</strong>：使用slot插槽进行列内容自定义</p>
        <p><strong>✅ 参数传递</strong>：完整的scope参数，包括row、column、cellData、$index等</p>
        <p><strong>✅ 事件支持</strong>：自定义内容中的事件绑定和交互</p>
        <p><strong>✅ 组件支持</strong>：支持各种Element Plus组件</p>
      </template>
    </el-alert>

    <z-table
      ref="tableRef"
      :data="tableData"
      :columns="columns"
      :virtual="{ enabled: true, itemHeight: 48, threshold: 100 }"
      height="500px"
      border
      stripe
      row-key="id"
    >
      <!-- Slot方式的列自定义 -->
      <template #avatar-slot="scope">
        <div style="display: flex; gap: 8px; align-items: center;">
          <el-avatar :size="32" :src="scope.row.avatar" />
          <div>
            <div style="font-weight: bold;">{{ scope.row.name }}</div>
            <div style="font-size: 12px; color: #909399;">{{ scope.row.email }}</div>
          </div>
        </div>
      </template>

      <template #salary-slot="scope">
        <div @click="handleSalaryClick(scope)" style="cursor: pointer;">
          <el-tag
            :type="scope.row.salary > 8000 ? 'success' : scope.row.salary > 6000 ? 'warning' : 'danger'"
            effect="dark"
          >
            <el-icon style="margin-right: 4px;"><Money /></el-icon>
            ¥{{ scope.row.salary.toLocaleString() }}
          </el-tag>
        </div>
      </template>

      <template #status-slot="scope">
        <el-switch
          v-model="scope.row.status"
          active-value="active"
          inactive-value="inactive"
          active-text="在职"
          inactive-text="离职"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          @change="handleStatusChange(scope)"
        />
      </template>

      <template #progress-slot="scope">
        <div style="display: flex; gap: 8px; align-items: center;">
          <el-progress
            :percentage="scope.row.progress"
            :stroke-width="8"
            :show-text="false"
            style="flex: 1;"
          />
          <span style="font-size: 12px; color: #606266; min-width: 35px;">
            {{ scope.row.progress }}%
          </span>
        </div>
      </template>

      <template #actions-slot="scope">
        <el-space size="small">
          <el-button
            size="small"
            type="primary"
            :icon="Edit"
            @click="handleEdit(scope)"
          >
            编辑
          </el-button>
          <el-button
            size="small"
            type="success"
            :icon="View"
            @click="handleView(scope)"
          >
            查看
          </el-button>
          <el-popconfirm
            title="确定要删除吗？"
            @confirm="handleDelete(scope)"
          >
            <template #reference>
              <el-button
                size="small"
                type="danger"
                :icon="Delete"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </el-space>
      </template>
    </z-table>

    <!-- 参数打印区域 -->
    <div style="margin-top: 16px;">
      <el-collapse v-model="activeCollapse">
        <el-collapse-item title="最近的参数传递日志" name="1">
          <div style="max-height: 200px; padding: 12px; background: #f5f7fa; overflow-y: auto; border-radius: 4px;">
            <div v-for="(log, index) in paramLogs" :key="index" style="margin-bottom: 8px; font-family: monospace; font-size: 12px;">
              <span style="color: #909399;">[{{ log.timestamp }}]</span>
              <span style="font-weight: bold; color: #409eff;">{{ log.type }}:</span>
              <span style="color: #606266;">{{ log.message }}</span>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { Delete, Edit, Money, View } from '@element-plus/icons-vue'

// 生成测试数据
function generateData() {
  const departments = ['技术部', '市场部', '产品部', '运营部', '设计部']
  const data = []
  for (let i = 1; i <= 2000; i++) {
    data.push({
      id: i,
      name: `用户 ${i}`,
      email: `user${i}@example.com`,
      age: 20 + (i % 50),
      department: departments[i % departments.length],
      salary: 5000 + (i % 100) * 100,
      status: i % 3 === 0 ? 'active' : 'inactive',
      progress: Math.floor(Math.random() * 100),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`,
    })
  }
  return data
}

const tableData = ref(generateData())
const tableRef = ref()
const useSlotMode = ref(true)
const activeCollapse = ref(['1'])
const paramLogs = ref<any[]>([])

// 添加日志
function addLog(type: string, message: string, params?: any) {
  const timestamp = new Date().toLocaleTimeString()
  paramLogs.value.unshift({
    timestamp,
    type,
    message,
    params
  })

  // 只保留最近20条日志
  if (paramLogs.value.length > 20) {
    paramLogs.value = paramLogs.value.slice(0, 20)
  }

  // eslint-disable-next-line no-console
  console.log(`[${type}]`, message, params)
}

// 列配置
const columns = computed(() => [
  {
    type: 'index',
    label: '序号',
    width: 80
  },
  {
    prop: 'name',
    label: '用户信息',
    width: 200,
    // 根据模式选择render或slot
    ...(useSlotMode.value ? {
      slot: 'avatar-slot'
    } : {
      render: (scope: any) => {
        addLog('列Render', `用户信息列渲染 - 行${scope.$index}`, scope)
        return h('div', {
          style: { display: 'flex', gap: '8px', alignItems: 'center' }
        }, [
          h('el-avatar', {
            size: 32,
            src: scope.row.avatar
          }),
          h('div', {}, [
            h('div', { style: { fontWeight: 'bold' } }, scope.row.name),
            h('div', {
              style: { fontSize: '12px', color: '#909399' }
            }, scope.row.email)
          ])
        ])
      }
    })
  },
  {
    prop: 'department',
    label: '部门',
    width: 120
  },
  {
    prop: 'age',
    label: '年龄',
    width: 80
  },
  {
    prop: 'salary',
    label: '薪资',
    width: 150,
    ...(useSlotMode.value ? {
      slot: 'salary-slot'
    } : {
      render: (scope: any) => {
        addLog('列Render', `薪资列渲染 - 行${scope.$index}, 薪资: ${scope.row.salary}`, scope)
        const getType = (salary: number) => {
          if (salary > 8000) return 'success'
          if (salary > 6000) return 'warning'
          return 'danger'
        }
        return h('div', {
          onClick: () => handleSalaryClick(scope),
          style: { cursor: 'pointer' }
        }, [
          h('el-tag', {
            type: getType(scope.row.salary),
            effect: 'dark'
          }, [
            h('el-icon', { style: { marginRight: '4px' } }, [h(Money)]),
            `¥${scope.row.salary.toLocaleString()}`
          ])
        ])
      }
    })
  },
  {
    prop: 'status',
    label: '状态',
    width: 120,
    ...(useSlotMode.value ? {
      slot: 'status-slot'
    } : {
      render: (scope: any) => {
        addLog('列Render', `状态列渲染 - 行${scope.$index}, 状态: ${scope.row.status}`, scope)
        return h('el-switch', {
          modelValue: scope.row.status,
          activeValue: 'active',
          inactiveValue: 'inactive',
          activeText: '在职',
          inactiveText: '离职',
          style: '--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949',
          'onUpdate:modelValue': (value: string) => {
            scope.row.status = value
            handleStatusChange(scope)
          }
        })
      }
    })
  },
  {
    prop: 'progress',
    label: '项目进度',
    width: 150,
    ...(useSlotMode.value ? {
      slot: 'progress-slot'
    } : {
      render: (scope: any) => {
        addLog('列Render', `进度列渲染 - 行${scope.$index}, 进度: ${scope.row.progress}%`, scope)
        return h('div', {
          style: { display: 'flex', gap: '8px', alignItems: 'center' }
        }, [
          h('el-progress', {
            percentage: scope.row.progress,
            strokeWidth: 8,
            showText: false,
            style: { flex: 1 }
          }),
          h('span', {
            style: { fontSize: '12px', color: '#606266', minWidth: '35px' }
          }, `${scope.row.progress}%`)
        ])
      }
    })
  },
  {
    prop: 'actions',
    label: '操作',
    width: 200,
    fixed: 'right',
    ...(useSlotMode.value ? {
      slot: 'actions-slot'
    } : {
      render: (scope: any) => {
        addLog('列Render', `操作列渲染 - 行${scope.$index}`, scope)
        return h('el-space', { size: 'small' }, [
          h('el-button', {
            size: 'small',
            type: 'primary',
            icon: Edit,
            onClick: () => handleEdit(scope)
          }, '编辑'),
          h('el-button', {
            size: 'small',
            type: 'success',
            icon: View,
            onClick: () => handleView(scope)
          }, '查看'),
          h('el-popconfirm', {
            title: '确定要删除吗？',
            onConfirm: () => handleDelete(scope)
          }, {
            reference: () => h('el-button', {
              size: 'small',
              type: 'danger',
              icon: Delete
            }, '删除')
          })
        ])
      }
    })
  }
])

// 事件处理函数
function handleSalaryClick(scope: any) {
  addLog('Slot事件', `点击薪资 - 行${scope.$index}, 用户: ${scope.row.name}, 薪资: ${scope.row.salary}`, scope)
}

function handleStatusChange(scope: any) {
  addLog('Slot事件', `状态变更 - 行${scope.$index}, 用户: ${scope.row.name}, 新状态: ${scope.row.status}`, scope)
}

function handleEdit(scope: any) {
  addLog('Slot事件', `编辑用户 - 行${scope.$index}, 用户: ${scope.row.name}`, scope)
}

function handleView(scope: any) {
  addLog('Slot事件', `查看用户 - 行${scope.$index}, 用户: ${scope.row.name}`, scope)
}

function handleDelete(scope: any) {
  addLog('Slot事件', `删除用户 - 行${scope.$index}, 用户: ${scope.row.name}`, scope)
}

function toggleCustomMode() {
  useSlotMode.value = !useSlotMode.value
  addLog('模式切换', `切换到${useSlotMode.value ? 'Slot' : 'Render'}模式`)
}
</script>

<style scoped>
:deep(.el-collapse-item__content) {
  padding: 12px !important;
}
</style>
