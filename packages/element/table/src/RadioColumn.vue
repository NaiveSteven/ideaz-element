<script>
import { isFunction, isString } from '@ideaz/utils'

export default {
  name: 'RadioColumn',
  props: {
    tableCol: {
      type: Object,
      default: () => ({}),
    },
    tableAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      radioValue: '',
    }
  },
  computed: {
    attrsAll() {
      return { width: 48, align: 'center', ...this.tableCol }
    },
  },
  methods: {
    getRowKey(rowData) {
      const rowKey = this.tableAttrs.rowKey || this.tableAttrs['row-key']
      if (isFunction(rowKey))
        return rowKey(rowData)

      if (isString(rowKey))
        return rowData[rowKey]

      return rowData.id
    },
    handleRadioChange(row) {
      this.$emit('radio-change', row)
    },
    clearSelection() {
      this.radioValue = ''
      this.$emit('radio-change', {})
    },
    toggleRadioSelection(row) {
      const rowKey = this.tableAttrs.rowKey || this.tableAttrs['row-key']
      const rowKeyVal = isFunction(rowKey)
        ? rowKey(row)
        : isString(rowKey)
          ? row[rowKey]
          : row.id
      this.radioValue = rowKeyVal
      this.handleRadioChange(row)
    },
  },
}
</script>

<template>
  <el-table-column v-bind="attrsAll">
    <template #default="{ row }">
      <el-radio
        v-model="radioValue"
        :label="getRowKey(row)"
        @change="handleRadioChange(row)"
      />
    </template>
  </el-table-column>
</template>
