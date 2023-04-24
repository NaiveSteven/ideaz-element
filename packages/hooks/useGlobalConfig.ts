import type { App } from 'vue-demi';

const configProviderContextKey = 'globalProvider';

const globalConfig = ref<any>({});
let vue2GlobalConfig = {};

export const keysOf = <T>(arr: T) => Object.keys(arr) as Array<keyof T>;

export function useGlobalConfig(key?: any, defaultValue = undefined) {
  const config = getCurrentInstance()
    ? inject(configProviderContextKey, globalConfig)
    : globalConfig;
  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue);
  } else {
    return config;
  }
}

const mergeConfig = (a: any, b: any): any => {
  const keys = [...new Set([...keysOf(a), ...keysOf(b)])];
  const obj: Record<string, any> = {};
  for (const key of keys) {
    obj[key] = b[key] ?? a[key];
  }
  return obj;
};

export const provideGlobalConfig = (config: any, app?: App, global = false) => {
  const inSetup = !!getCurrentInstance();
  const oldConfig = inSetup ? useGlobalConfig() : undefined;
  console.log(config, 'app');
  vue2GlobalConfig = config;

  const provideFn = app?.provide ?? (inSetup ? provide : undefined);
  if (!provideFn) {
    console.log(
      'provideGlobalConfig',
      'provideGlobalConfig() can only be used inside setup().'
    );
    return;
  }

  const context = computed(() => {
    const cfg = unref(config);
    if (!oldConfig?.value) return cfg;
    return mergeConfig(oldConfig.value, cfg);
  });

  provideFn(configProviderContextKey, context);
  provideFn(
    'locale',
    computed(() => context.value.locale)
  );

  provideFn('size', {
    size: computed(() => context.value.size || ''),
  });

  if (global || !globalConfig.value) {
    globalConfig.value = context.value;
  }
  return context;
};

export { vue2GlobalConfig };
