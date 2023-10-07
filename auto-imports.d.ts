/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// Generated by unplugin-auto-import
export {}
declare global {
  const $: typeof import('vue/macros')['$']
  const $$: typeof import('vue/macros')['$$']
  const $computed: typeof import('vue/macros')['$computed']
  const $customRef: typeof import('vue/macros')['$customRef']
  const $ref: typeof import('vue/macros')['$ref']
  const $shallowRef: typeof import('vue/macros')['$shallowRef']
  const $toRef: typeof import('vue/macros')['$toRef']
  const EffectScope: typeof import('vue')['EffectScope']
  const buildLocaleContext: typeof import('./packages/hooks/useLocale')['buildLocaleContext']
  const buildTranslator: typeof import('./packages/hooks/useLocale')['buildTranslator']
  const computed: typeof import('vue')['computed']
  const createApp: typeof import('vue')['createApp']
  const customRef: typeof import('vue')['customRef']
  const defaultNamespace: typeof import('./packages/hooks/useNamespace')['defaultNamespace']
  const defineAsyncComponent: typeof import('vue')['defineAsyncComponent']
  const defineComponent: typeof import('vue')['defineComponent']
  const effectScope: typeof import('vue')['effectScope']
  const getCurrentInstance: typeof import('vue')['getCurrentInstance']
  const getCurrentScope: typeof import('vue')['getCurrentScope']
  const h: typeof import('vue')['h']
  const inject: typeof import('vue')['inject']
  const isProxy: typeof import('vue')['isProxy']
  const isReactive: typeof import('vue')['isReactive']
  const isReadonly: typeof import('vue')['isReadonly']
  const isRef: typeof import('vue')['isRef']
  const keysOf: typeof import('./packages/hooks/useGlobalConfig')['keysOf']
  const markRaw: typeof import('vue')['markRaw']
  const namespaceContextKey: typeof import('./packages/hooks/useNamespace')['namespaceContextKey']
  const nextTick: typeof import('vue')['nextTick']
  const onActivated: typeof import('vue')['onActivated']
  const onBeforeMount: typeof import('vue')['onBeforeMount']
  const onBeforeRouteLeave: typeof import('vue-router')['onBeforeRouteLeave']
  const onBeforeRouteUpdate: typeof import('vue-router')['onBeforeRouteUpdate']
  const onBeforeUnmount: typeof import('vue')['onBeforeUnmount']
  const onBeforeUpdate: typeof import('vue')['onBeforeUpdate']
  const onDeactivated: typeof import('vue')['onDeactivated']
  const onErrorCaptured: typeof import('vue')['onErrorCaptured']
  const onMounted: typeof import('vue')['onMounted']
  const onRenderTracked: typeof import('vue')['onRenderTracked']
  const onRenderTriggered: typeof import('vue')['onRenderTriggered']
  const onScopeDispose: typeof import('vue')['onScopeDispose']
  const onServerPrefetch: typeof import('vue')['onServerPrefetch']
  const onUnmounted: typeof import('vue')['onUnmounted']
  const onUpdated: typeof import('vue')['onUpdated']
  const provide: typeof import('vue')['provide']
  const provideGlobalConfig: typeof import('./packages/hooks/useGlobalConfig')['provideGlobalConfig']
  const reactive: typeof import('vue')['reactive']
  const readonly: typeof import('vue')['readonly']
  const ref: typeof import('vue')['ref']
  const resolveComponent: typeof import('vue')['resolveComponent']
  const shallowReactive: typeof import('vue')['shallowReactive']
  const shallowReadonly: typeof import('vue')['shallowReadonly']
  const shallowRef: typeof import('vue')['shallowRef']
  const toRaw: typeof import('vue')['toRaw']
  const toRef: typeof import('vue')['toRef']
  const toRefs: typeof import('vue')['toRefs']
  const toValue: typeof import('vue')['toValue']
  const translate: typeof import('./packages/hooks/useLocale')['translate']
  const triggerRef: typeof import('vue')['triggerRef']
  const unref: typeof import('vue')['unref']
  const useAttr: typeof import('./packages/hooks/useAttr')['useAttr']
  const useAttrs: typeof import('vue')['useAttrs']
  const useComponentMethods: typeof import('./packages/hooks/useComponentMethods')['useComponentMethods']
  const useCssModule: typeof import('vue')['useCssModule']
  const useCssVars: typeof import('vue')['useCssVars']
  const useExpose: typeof import('./packages/hooks/useExpose')['useExpose']
  const useFormComponentAttrs: typeof import('./packages/hooks/useFormComponentAttrs')['useFormComponentAttrs']
  const useFormComponentSlots: typeof import('./packages/hooks/useFormComponentSlots')['useFormComponentSlots']
  const useFormSize: typeof import('./packages/hooks/useFormSize')['useFormSize']
  const useGetDerivedNamespace: typeof import('./packages/hooks/useNamespace')['useGetDerivedNamespace']
  const useGlobalConfig: typeof import('./packages/hooks/useGlobalConfig')['useGlobalConfig']
  const useGlobalSize: typeof import('./packages/hooks/useGlobalSize')['useGlobalSize']
  const useLink: typeof import('vue-router')['useLink']
  const useLocale: typeof import('./packages/hooks/useLocale')['useLocale']
  const useNamespace: typeof import('./packages/hooks/useNamespace')['useNamespace']
  const useProp: typeof import('./packages/hooks/useProp')['useProp']
  const useRoute: typeof import('vue-router')['useRoute']
  const useRouter: typeof import('vue-router')['useRouter']
  const useSlots: typeof import('vue')['useSlots']
  const useVModel: typeof import('./packages/hooks/useVModel')['useVModel']
  const useWindowReactiveSize: typeof import('./packages/hooks/useWindowReactiveSize')['useWindowReactiveSize']
  const vue2GlobalConfig: typeof import('./packages/hooks/useGlobalConfig')['vue2GlobalConfig']
  const watch: typeof import('vue')['watch']
  const watchEffect: typeof import('vue')['watchEffect']
  const watchPostEffect: typeof import('vue')['watchPostEffect']
  const watchSyncEffect: typeof import('vue')['watchSyncEffect']
}
// for type re-export
declare global {
  // @ts-ignore
  export type { Component, ComponentPublicInstance, ComputedRef, InjectionKey, PropType, Ref, VNode, WritableComputedRef } from 'vue'
}
// for vue template auto import
import { UnwrapRef } from 'vue'
declare module 'vue' {
  interface ComponentCustomProperties {
    readonly $$: UnwrapRef<typeof import('vue/macros')['$$']>
    readonly $: UnwrapRef<typeof import('vue/macros')['$']>
    readonly $computed: UnwrapRef<typeof import('vue/macros')['$computed']>
    readonly $customRef: UnwrapRef<typeof import('vue/macros')['$customRef']>
    readonly $ref: UnwrapRef<typeof import('vue/macros')['$ref']>
    readonly $shallowRef: UnwrapRef<typeof import('vue/macros')['$shallowRef']>
    readonly $toRef: UnwrapRef<typeof import('vue/macros')['$toRef']>
    readonly EffectScope: UnwrapRef<typeof import('vue')['EffectScope']>
    readonly buildLocaleContext: UnwrapRef<typeof import('./packages/hooks/useLocale')['buildLocaleContext']>
    readonly buildTranslator: UnwrapRef<typeof import('./packages/hooks/useLocale')['buildTranslator']>
    readonly computed: UnwrapRef<typeof import('vue')['computed']>
    readonly createApp: UnwrapRef<typeof import('vue')['createApp']>
    readonly customRef: UnwrapRef<typeof import('vue')['customRef']>
    readonly defaultNamespace: UnwrapRef<typeof import('./packages/hooks/useNamespace')['defaultNamespace']>
    readonly defineAsyncComponent: UnwrapRef<typeof import('vue')['defineAsyncComponent']>
    readonly defineComponent: UnwrapRef<typeof import('vue')['defineComponent']>
    readonly effectScope: UnwrapRef<typeof import('vue')['effectScope']>
    readonly getCurrentInstance: UnwrapRef<typeof import('vue')['getCurrentInstance']>
    readonly getCurrentScope: UnwrapRef<typeof import('vue')['getCurrentScope']>
    readonly h: UnwrapRef<typeof import('vue')['h']>
    readonly inject: UnwrapRef<typeof import('vue')['inject']>
    readonly isProxy: UnwrapRef<typeof import('vue')['isProxy']>
    readonly isReactive: UnwrapRef<typeof import('vue')['isReactive']>
    readonly isReadonly: UnwrapRef<typeof import('vue')['isReadonly']>
    readonly isRef: UnwrapRef<typeof import('vue')['isRef']>
    readonly keysOf: UnwrapRef<typeof import('./packages/hooks/useGlobalConfig')['keysOf']>
    readonly markRaw: UnwrapRef<typeof import('vue')['markRaw']>
    readonly namespaceContextKey: UnwrapRef<typeof import('./packages/hooks/useNamespace')['namespaceContextKey']>
    readonly nextTick: UnwrapRef<typeof import('vue')['nextTick']>
    readonly onActivated: UnwrapRef<typeof import('vue')['onActivated']>
    readonly onBeforeMount: UnwrapRef<typeof import('vue')['onBeforeMount']>
    readonly onBeforeRouteLeave: UnwrapRef<typeof import('vue-router')['onBeforeRouteLeave']>
    readonly onBeforeRouteUpdate: UnwrapRef<typeof import('vue-router')['onBeforeRouteUpdate']>
    readonly onBeforeUnmount: UnwrapRef<typeof import('vue')['onBeforeUnmount']>
    readonly onBeforeUpdate: UnwrapRef<typeof import('vue')['onBeforeUpdate']>
    readonly onDeactivated: UnwrapRef<typeof import('vue')['onDeactivated']>
    readonly onErrorCaptured: UnwrapRef<typeof import('vue')['onErrorCaptured']>
    readonly onMounted: UnwrapRef<typeof import('vue')['onMounted']>
    readonly onRenderTracked: UnwrapRef<typeof import('vue')['onRenderTracked']>
    readonly onRenderTriggered: UnwrapRef<typeof import('vue')['onRenderTriggered']>
    readonly onScopeDispose: UnwrapRef<typeof import('vue')['onScopeDispose']>
    readonly onServerPrefetch: UnwrapRef<typeof import('vue')['onServerPrefetch']>
    readonly onUnmounted: UnwrapRef<typeof import('vue')['onUnmounted']>
    readonly onUpdated: UnwrapRef<typeof import('vue')['onUpdated']>
    readonly provide: UnwrapRef<typeof import('vue')['provide']>
    readonly provideGlobalConfig: UnwrapRef<typeof import('./packages/hooks/useGlobalConfig')['provideGlobalConfig']>
    readonly reactive: UnwrapRef<typeof import('vue')['reactive']>
    readonly readonly: UnwrapRef<typeof import('vue')['readonly']>
    readonly ref: UnwrapRef<typeof import('vue')['ref']>
    readonly resolveComponent: UnwrapRef<typeof import('vue')['resolveComponent']>
    readonly shallowReactive: UnwrapRef<typeof import('vue')['shallowReactive']>
    readonly shallowReadonly: UnwrapRef<typeof import('vue')['shallowReadonly']>
    readonly shallowRef: UnwrapRef<typeof import('vue')['shallowRef']>
    readonly toRaw: UnwrapRef<typeof import('vue')['toRaw']>
    readonly toRef: UnwrapRef<typeof import('vue')['toRef']>
    readonly toRefs: UnwrapRef<typeof import('vue')['toRefs']>
    readonly toValue: UnwrapRef<typeof import('vue')['toValue']>
    readonly translate: UnwrapRef<typeof import('./packages/hooks/useLocale')['translate']>
    readonly triggerRef: UnwrapRef<typeof import('vue')['triggerRef']>
    readonly unref: UnwrapRef<typeof import('vue')['unref']>
    readonly useAttr: UnwrapRef<typeof import('./packages/hooks/useAttr')['useAttr']>
    readonly useAttrs: UnwrapRef<typeof import('vue')['useAttrs']>
    readonly useComponentMethods: UnwrapRef<typeof import('./packages/hooks/useComponentMethods')['useComponentMethods']>
    readonly useCssModule: UnwrapRef<typeof import('vue')['useCssModule']>
    readonly useCssVars: UnwrapRef<typeof import('vue')['useCssVars']>
    readonly useExpose: UnwrapRef<typeof import('./packages/hooks/useExpose')['useExpose']>
    readonly useFormComponentAttrs: UnwrapRef<typeof import('./packages/hooks/useFormComponentAttrs')['useFormComponentAttrs']>
    readonly useFormComponentSlots: UnwrapRef<typeof import('./packages/hooks/useFormComponentSlots')['useFormComponentSlots']>
    readonly useFormSize: UnwrapRef<typeof import('./packages/hooks/useFormSize')['useFormSize']>
    readonly useGetDerivedNamespace: UnwrapRef<typeof import('./packages/hooks/useNamespace')['useGetDerivedNamespace']>
    readonly useGlobalConfig: UnwrapRef<typeof import('./packages/hooks/useGlobalConfig')['useGlobalConfig']>
    readonly useGlobalSize: UnwrapRef<typeof import('./packages/hooks/useGlobalSize')['useGlobalSize']>
    readonly useLink: UnwrapRef<typeof import('vue-router')['useLink']>
    readonly useLocale: UnwrapRef<typeof import('./packages/hooks/useLocale')['useLocale']>
    readonly useNamespace: UnwrapRef<typeof import('./packages/hooks/useNamespace')['useNamespace']>
    readonly useProp: UnwrapRef<typeof import('./packages/hooks/useProp')['useProp']>
    readonly useRoute: UnwrapRef<typeof import('vue-router')['useRoute']>
    readonly useRouter: UnwrapRef<typeof import('vue-router')['useRouter']>
    readonly useSlots: UnwrapRef<typeof import('vue')['useSlots']>
    readonly useVModel: UnwrapRef<typeof import('./packages/hooks/useVModel')['useVModel']>
    readonly useWindowReactiveSize: UnwrapRef<typeof import('./packages/hooks/useWindowReactiveSize')['useWindowReactiveSize']>
    readonly vue2GlobalConfig: UnwrapRef<typeof import('./packages/hooks/useGlobalConfig')['vue2GlobalConfig']>
    readonly watch: UnwrapRef<typeof import('vue')['watch']>
    readonly watchEffect: UnwrapRef<typeof import('vue')['watchEffect']>
    readonly watchPostEffect: UnwrapRef<typeof import('vue')['watchPostEffect']>
    readonly watchSyncEffect: UnwrapRef<typeof import('vue')['watchSyncEffect']>
  }
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    readonly $$: UnwrapRef<typeof import('vue/macros')['$$']>
    readonly $: UnwrapRef<typeof import('vue/macros')['$']>
    readonly $computed: UnwrapRef<typeof import('vue/macros')['$computed']>
    readonly $customRef: UnwrapRef<typeof import('vue/macros')['$customRef']>
    readonly $ref: UnwrapRef<typeof import('vue/macros')['$ref']>
    readonly $shallowRef: UnwrapRef<typeof import('vue/macros')['$shallowRef']>
    readonly $toRef: UnwrapRef<typeof import('vue/macros')['$toRef']>
    readonly EffectScope: UnwrapRef<typeof import('vue')['EffectScope']>
    readonly buildLocaleContext: UnwrapRef<typeof import('./packages/hooks/useLocale')['buildLocaleContext']>
    readonly buildTranslator: UnwrapRef<typeof import('./packages/hooks/useLocale')['buildTranslator']>
    readonly computed: UnwrapRef<typeof import('vue')['computed']>
    readonly createApp: UnwrapRef<typeof import('vue')['createApp']>
    readonly customRef: UnwrapRef<typeof import('vue')['customRef']>
    readonly defaultNamespace: UnwrapRef<typeof import('./packages/hooks/useNamespace')['defaultNamespace']>
    readonly defineAsyncComponent: UnwrapRef<typeof import('vue')['defineAsyncComponent']>
    readonly defineComponent: UnwrapRef<typeof import('vue')['defineComponent']>
    readonly effectScope: UnwrapRef<typeof import('vue')['effectScope']>
    readonly getCurrentInstance: UnwrapRef<typeof import('vue')['getCurrentInstance']>
    readonly getCurrentScope: UnwrapRef<typeof import('vue')['getCurrentScope']>
    readonly h: UnwrapRef<typeof import('vue')['h']>
    readonly inject: UnwrapRef<typeof import('vue')['inject']>
    readonly isProxy: UnwrapRef<typeof import('vue')['isProxy']>
    readonly isReactive: UnwrapRef<typeof import('vue')['isReactive']>
    readonly isReadonly: UnwrapRef<typeof import('vue')['isReadonly']>
    readonly isRef: UnwrapRef<typeof import('vue')['isRef']>
    readonly keysOf: UnwrapRef<typeof import('./packages/hooks/useGlobalConfig')['keysOf']>
    readonly markRaw: UnwrapRef<typeof import('vue')['markRaw']>
    readonly namespaceContextKey: UnwrapRef<typeof import('./packages/hooks/useNamespace')['namespaceContextKey']>
    readonly nextTick: UnwrapRef<typeof import('vue')['nextTick']>
    readonly onActivated: UnwrapRef<typeof import('vue')['onActivated']>
    readonly onBeforeMount: UnwrapRef<typeof import('vue')['onBeforeMount']>
    readonly onBeforeRouteLeave: UnwrapRef<typeof import('vue-router')['onBeforeRouteLeave']>
    readonly onBeforeRouteUpdate: UnwrapRef<typeof import('vue-router')['onBeforeRouteUpdate']>
    readonly onBeforeUnmount: UnwrapRef<typeof import('vue')['onBeforeUnmount']>
    readonly onBeforeUpdate: UnwrapRef<typeof import('vue')['onBeforeUpdate']>
    readonly onDeactivated: UnwrapRef<typeof import('vue')['onDeactivated']>
    readonly onErrorCaptured: UnwrapRef<typeof import('vue')['onErrorCaptured']>
    readonly onMounted: UnwrapRef<typeof import('vue')['onMounted']>
    readonly onRenderTracked: UnwrapRef<typeof import('vue')['onRenderTracked']>
    readonly onRenderTriggered: UnwrapRef<typeof import('vue')['onRenderTriggered']>
    readonly onScopeDispose: UnwrapRef<typeof import('vue')['onScopeDispose']>
    readonly onServerPrefetch: UnwrapRef<typeof import('vue')['onServerPrefetch']>
    readonly onUnmounted: UnwrapRef<typeof import('vue')['onUnmounted']>
    readonly onUpdated: UnwrapRef<typeof import('vue')['onUpdated']>
    readonly provide: UnwrapRef<typeof import('vue')['provide']>
    readonly provideGlobalConfig: UnwrapRef<typeof import('./packages/hooks/useGlobalConfig')['provideGlobalConfig']>
    readonly reactive: UnwrapRef<typeof import('vue')['reactive']>
    readonly readonly: UnwrapRef<typeof import('vue')['readonly']>
    readonly ref: UnwrapRef<typeof import('vue')['ref']>
    readonly resolveComponent: UnwrapRef<typeof import('vue')['resolveComponent']>
    readonly shallowReactive: UnwrapRef<typeof import('vue')['shallowReactive']>
    readonly shallowReadonly: UnwrapRef<typeof import('vue')['shallowReadonly']>
    readonly shallowRef: UnwrapRef<typeof import('vue')['shallowRef']>
    readonly toRaw: UnwrapRef<typeof import('vue')['toRaw']>
    readonly toRef: UnwrapRef<typeof import('vue')['toRef']>
    readonly toRefs: UnwrapRef<typeof import('vue')['toRefs']>
    readonly toValue: UnwrapRef<typeof import('vue')['toValue']>
    readonly translate: UnwrapRef<typeof import('./packages/hooks/useLocale')['translate']>
    readonly triggerRef: UnwrapRef<typeof import('vue')['triggerRef']>
    readonly unref: UnwrapRef<typeof import('vue')['unref']>
    readonly useAttr: UnwrapRef<typeof import('./packages/hooks/useAttr')['useAttr']>
    readonly useAttrs: UnwrapRef<typeof import('vue')['useAttrs']>
    readonly useComponentMethods: UnwrapRef<typeof import('./packages/hooks/useComponentMethods')['useComponentMethods']>
    readonly useCssModule: UnwrapRef<typeof import('vue')['useCssModule']>
    readonly useCssVars: UnwrapRef<typeof import('vue')['useCssVars']>
    readonly useExpose: UnwrapRef<typeof import('./packages/hooks/useExpose')['useExpose']>
    readonly useFormComponentAttrs: UnwrapRef<typeof import('./packages/hooks/useFormComponentAttrs')['useFormComponentAttrs']>
    readonly useFormComponentSlots: UnwrapRef<typeof import('./packages/hooks/useFormComponentSlots')['useFormComponentSlots']>
    readonly useFormSize: UnwrapRef<typeof import('./packages/hooks/useFormSize')['useFormSize']>
    readonly useGetDerivedNamespace: UnwrapRef<typeof import('./packages/hooks/useNamespace')['useGetDerivedNamespace']>
    readonly useGlobalConfig: UnwrapRef<typeof import('./packages/hooks/useGlobalConfig')['useGlobalConfig']>
    readonly useGlobalSize: UnwrapRef<typeof import('./packages/hooks/useGlobalSize')['useGlobalSize']>
    readonly useLink: UnwrapRef<typeof import('vue-router')['useLink']>
    readonly useLocale: UnwrapRef<typeof import('./packages/hooks/useLocale')['useLocale']>
    readonly useNamespace: UnwrapRef<typeof import('./packages/hooks/useNamespace')['useNamespace']>
    readonly useProp: UnwrapRef<typeof import('./packages/hooks/useProp')['useProp']>
    readonly useRoute: UnwrapRef<typeof import('vue-router')['useRoute']>
    readonly useRouter: UnwrapRef<typeof import('vue-router')['useRouter']>
    readonly useSlots: UnwrapRef<typeof import('vue')['useSlots']>
    readonly useVModel: UnwrapRef<typeof import('./packages/hooks/useVModel')['useVModel']>
    readonly useWindowReactiveSize: UnwrapRef<typeof import('./packages/hooks/useWindowReactiveSize')['useWindowReactiveSize']>
    readonly vue2GlobalConfig: UnwrapRef<typeof import('./packages/hooks/useGlobalConfig')['vue2GlobalConfig']>
    readonly watch: UnwrapRef<typeof import('vue')['watch']>
    readonly watchEffect: UnwrapRef<typeof import('vue')['watchEffect']>
    readonly watchPostEffect: UnwrapRef<typeof import('vue')['watchPostEffect']>
    readonly watchSyncEffect: UnwrapRef<typeof import('vue')['watchSyncEffect']>
  }
}
