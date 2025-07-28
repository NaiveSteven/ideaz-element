import type { ComponentSize } from 'element-plus'
import type { ITableProps } from '../element/table/src/props'
import type { FormProps } from '../element/form/src/props'
import type { CrudProps } from '../element/crud/src/props'
import { tableProps } from '../element/table/src/props'
import { formProps } from '../element/form/src/props'
import { crudProps } from '../element/crud/src/props'

// 全局配置接口定义
export interface GlobalTableConfig extends Partial<ITableProps> {
  // table组件可配置的全局属性
}

export interface GlobalFormConfig extends Partial<FormProps> {
  // form组件可配置的全局属性
}

export interface GlobalCrudConfig extends Partial<CrudProps> {
  // crud组件可配置的全局属性
}

export interface GlobalComponentConfig {
  table?: GlobalTableConfig
  form?: GlobalFormConfig
  crud?: GlobalCrudConfig
  // 通用配置
  size?: ComponentSize
  locale?: string
}

// 从 Vue props 定义中提取默认值的工具函数
function extractDefaultValues(propsDefinition: any): Record<string, any> {
  const defaults: Record<string, any> = {}

  for (const [key, propDef] of Object.entries(propsDefinition)) {
    if (propDef && typeof propDef === 'object') {
      // 处理对象形式的 prop 定义
      if ('default' in propDef) {
        // 如果明确定义了 default
        const defaultValue = propDef.default
        defaults[key] = typeof defaultValue === 'function' ? defaultValue() : defaultValue
      } else if ('type' in propDef) {
        // 根据类型推断默认值
        defaults[key] = getTypeDefaultValue(propDef.type)
      } else {
        defaults[key] = undefined
      }
    } else if (propDef === Boolean) {
      // Boolean 类型默认值是 false
      defaults[key] = false
    } else if (propDef === String) {
      defaults[key] = undefined
    } else if (propDef === Number) {
      defaults[key] = undefined
    } else if (propDef === Array) {
      defaults[key] = undefined
    } else if (propDef === Object) {
      defaults[key] = undefined
    } else if (Array.isArray(propDef)) {
      // 多类型定义，默认值是 undefined
      defaults[key] = undefined
    } else {
      defaults[key] = undefined
    }
  }

  return defaults
}

// 根据类型获取默认值
function getTypeDefaultValue(type: any): any {
  if (type === Boolean) return false
  if (type === String) return undefined
  if (type === Number) return undefined
  if (type === Array) return undefined
  if (type === Object) return undefined
  if (Array.isArray(type)) {
    // 多类型，检查是否包含 Boolean
    if (type.includes(Boolean)) return false
    return undefined
  }
  return undefined
}

// 从 props 定义中提取默认值 - 自动从组件 props 定义中生成
export const TABLE_DEFAULT_VALUES = extractDefaultValues(tableProps) as Partial<ITableProps>
export const FORM_DEFAULT_VALUES = extractDefaultValues(formProps) as Partial<FormProps>
export const CRUD_DEFAULT_VALUES = extractDefaultValues(crudProps) as Partial<CrudProps>

// 可配置的属性键列表
export const CONFIGURABLE_TABLE_KEYS = Object.keys(TABLE_DEFAULT_VALUES) as Array<keyof ITableProps>
export const CONFIGURABLE_FORM_KEYS = Object.keys(FORM_DEFAULT_VALUES) as Array<keyof FormProps>
export const CONFIGURABLE_CRUD_KEYS = Object.keys(CRUD_DEFAULT_VALUES) as Array<keyof CrudProps>

// 全局配置存储
class GlobalConfigManager {
  private config: GlobalComponentConfig = {}

  // 设置全局配置
  setConfig(config: GlobalComponentConfig) {
    this.config = { ...this.config, ...config }
  }

  // 获取指定组件的配置
  getTableConfig(): GlobalTableConfig {
    return {
      ...this.getCommonConfig(),
      ...this.config.table,
    }
  }

  getFormConfig(): GlobalFormConfig {
    return {
      ...this.getCommonConfig(),
      ...this.config.form,
    }
  }

  getCrudConfig(): GlobalCrudConfig {
    return {
      ...this.getCommonConfig(),
      ...this.config.crud,
    }
  }

  // 获取通用配置
  private getCommonConfig() {
    const { table, form, crud, ...common } = this.config
    return common
  }

  // 合并配置的工具函数
  mergeTableProps<T extends Partial<ITableProps>>(userProps: T): T & GlobalTableConfig {
    const globalConfig = this.getTableConfig()
    return this.mergeProps(globalConfig, userProps, TABLE_DEFAULT_VALUES)
  }

  mergeFormProps<T extends Partial<FormProps>>(userProps: T): T & GlobalFormConfig {
    const globalConfig = this.getFormConfig()
    return this.mergeProps(globalConfig, userProps, FORM_DEFAULT_VALUES)
  }

  mergeCrudProps<T extends Partial<CrudProps>>(userProps: T): T & GlobalCrudConfig {
    const globalConfig = this.getCrudConfig()
    return this.mergeProps(globalConfig, userProps, CRUD_DEFAULT_VALUES)
  }

    // 私有方法：合并属性 - 基于默认值的智能合并
  private mergeProps<T>(
    globalConfig: any,
    userProps: T,
    defaultValues: any
  ): T {
    const result = { ...userProps } as any

    // 遍历所有可配置的属性
    Object.keys(defaultValues).forEach(key => {
      const globalValue = globalConfig[key]
      const userValue = result[key]
      const defaultValue = defaultValues[key]

      // 只有当全局配置有值时，才考虑使用全局配置
      if (globalValue !== undefined) {
        // 特殊处理：如果是关键数据属性（如 data, columns），用户传入了值就不要覆盖
        if (this.isDataAttribute(key) && userValue !== undefined) {
          // 对于 data 属性，检查用户传入的值是否等于默认值
          if (this.isEqual(userValue, defaultValue)) {
            result[key] = globalValue
          }
          // 否则保持用户传入的值，不使用全局配置
        } else {
          // 如果用户传入的值等于默认值，或者用户没有传入值，则使用全局配置
          if (userValue === undefined || this.isEqual(userValue, defaultValue)) {
            result[key] = globalValue
          }
          // 否则保持用户传入的值（用户优先级最高）
        }
      }
    })

    return result
  }

  // 判断是否是关键数据属性
  private isDataAttribute(key: string): boolean {
    // 主要保护数据相关的属性，避免被全局配置意外覆盖
    const dataAttributes = ['data', 'modelValue']
    return dataAttributes.includes(key)
  }

  // 深度比较工具函数
  private isEqual(a: any, b: any): boolean {
    if (a === b) return true
    if (a == null || b == null) return false
    if (typeof a !== typeof b) return false

    if (typeof a === 'object') {
      const keysA = Object.keys(a)
      const keysB = Object.keys(b)
      if (keysA.length !== keysB.length) return false

      for (const key of keysA) {
        if (!keysB.includes(key) || !this.isEqual(a[key], b[key])) {
          return false
        }
      }
      return true
    }

    return false
  }

  // 重置配置
  resetConfig() {
    this.config = {}
  }

  // 获取完整配置
  getFullConfig(): GlobalComponentConfig {
    return { ...this.config }
  }
}

// 导出全局配置管理器实例
export const globalConfigManager = new GlobalConfigManager()

// 导出配置函数，供用户调用
export function setGlobalConfig(config: GlobalComponentConfig) {
  globalConfigManager.setConfig(config)
}

export function getGlobalConfig(): GlobalComponentConfig {
  return globalConfigManager.getFullConfig()
}

// 导出合并函数，供组件内部使用
export function mergeTableProps<T extends Partial<ITableProps>>(props: T): T & GlobalTableConfig {
  return globalConfigManager.mergeTableProps(props)
}

export function mergeFormProps<T extends Partial<FormProps>>(props: T): T & GlobalFormConfig {
  return globalConfigManager.mergeFormProps(props)
}

export function mergeCrudProps<T extends Partial<CrudProps>>(props: T): T & GlobalCrudConfig {
  return globalConfigManager.mergeCrudProps(props)
}
