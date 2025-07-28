/* eslint-disable no-console */
import type { App } from 'vue'
import { computed, getCurrentInstance, inject, provide, ref, unref } from 'vue'
import {
  getGlobalConfig,
  mergeCrudProps,
  mergeFormProps,
  mergeTableProps,
  setGlobalConfig
} from '@ideaz/shared'
import type { ITableProps } from '../element/table/src/props'
import type { FormProps } from '../element/form/src/props'
import type { CrudProps } from '../element/crud/src/props'

const configProviderContextKey = 'globalProvider'

const globalConfig = ref<any>({})
// eslint-disable-next-line import/no-mutable-exports
let vue2GlobalConfig = {}

export const keysOf = <T extends Record<string, any>>(arr: T) => Object.keys(arr) as Array<keyof T>

/**
 * 原有的全局配置 hook（保持向后兼容）
 */
export function useGlobalConfig(key?: any, defaultValue = undefined) {
  const config = getCurrentInstance()
    ? inject(configProviderContextKey, globalConfig)
    : globalConfig
  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue)
  }
  else {
    return config
  }
}

function mergeConfig(a: any, b: any): any {
  const keys = [...new Set([...keysOf(a), ...keysOf(b)])]
  const obj: Record<string, any> = {}
  for (const key of keys) {
    if (typeof key === 'string') {
      obj[key] = b[key] ?? a[key]
    }
  }
  return obj
}

export function provideGlobalConfig(config: any, app?: App, global = false) {
  const inSetup = !!getCurrentInstance()
  const oldConfig = inSetup ? useGlobalConfig() : undefined
  console.log(config, 'app')
  vue2GlobalConfig = config

  const provideFn = app?.provide ?? (inSetup ? provide : undefined) as any
  if (!provideFn) {
    console.log(
      'provideGlobalConfig',
      'provideGlobalConfig() can only be used inside setup().',
    )
    return
  }

  const context = computed(() => {
    const cfg = unref(config)
    if (!oldConfig?.value)
      return cfg
    return mergeConfig(oldConfig.value, cfg)
  })

  provideFn(configProviderContextKey, context)
  provideFn(
    'locale',
    computed(() => context.value.locale),
  )

  provideFn('size', {
    size: computed(() => context.value.size || ''),
  })

  if (global || !globalConfig.value) {
    globalConfig.value = context.value
  }
  setGlobalConfig(context.value)
  return context
}

export { vue2GlobalConfig }

/**
 * 新的组件配置 hooks
 */

/**
 * 为 Table 组件合并全局配置的 hook
 */
export function useTableConfig<T extends Partial<ITableProps>>(props: T) {
  return computed(() => mergeTableProps(props))
}

/**
 * 为 Form 组件合并全局配置的 hook
 */
export function useFormConfig<T extends Partial<FormProps>>(props: T) {
  return computed(() => mergeFormProps(props))
}

/**
 * 为 Crud 组件合并全局配置的 hook
 */
export function useCrudConfig<T extends Partial<CrudProps>>(props: T) {
  return computed(() => mergeCrudProps(props))
}

/**
 * 获取新全局配置的 hook
 */
export function useNewGlobalConfig() {
  return computed(() => getGlobalConfig())
}

/**
 * 通用的配置合并 hook
 * @param componentType 组件类型
 * @param props 组件 props
 */
export function useComponentConfig<T>(
  componentType: 'table' | 'form' | 'crud',
  props: T
) {
  return computed(() => {
    switch (componentType) {
      case 'table':
        return mergeTableProps(props as any)
      case 'form':
        return mergeFormProps(props as any)
      case 'crud':
        return mergeCrudProps(props as any)
      default:
        return props
    }
  })
}
