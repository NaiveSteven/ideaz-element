import { get } from 'lodash-unified'
import CN from '@ideaz/locale/lang/zh-cn'
import type { MaybeRef } from '@vueuse/core'
import type { Ref } from 'vue'

export interface TranslatePair {
  [key: string]: string | string[] | TranslatePair
}

export interface Language {
  name: string
  el?: TranslatePair
}
export type TranslatorOption = Record<string, string | number>
export type Translator = (path: string, option?: TranslatorOption) => string
export interface LocaleContext {
  locale: Ref<Language>
  lang: Ref<string>
  t: Translator
}

export function translate(path: string, option: undefined | TranslatorOption, locale: Language): string {
  return (get(locale, path, path) as string).replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`,
  )
}

export function buildTranslator(locale: MaybeRef<Language>): Translator {
  return (path, option) =>
    translate(path, option, unref(locale))
}

export function buildLocaleContext(locale: MaybeRef<Language>): LocaleContext {
  const lang = computed(() => unref(locale).name)
  const localeRef = isRef(locale) ? locale : ref(locale)
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale),
  }
}

export function useLocale(localeOverrides?: Ref<Language | undefined>) {
  const locale = localeOverrides || inject('locale', ref())!
  return buildLocaleContext(computed(() => locale.value || CN))
}
