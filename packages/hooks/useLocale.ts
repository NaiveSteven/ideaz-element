import { get } from 'lodash-unified';
import English from '@ideaz/locale/lang/en';
import type { MaybeRef } from '@vueuse/core';
import type { Ref } from 'vue';

export interface TranslatePair {
  [key: string]: string | string[] | TranslatePair;
}

export interface Language {
  name: string;
  el: TranslatePair;
}
export type TranslatorOption = Record<string, string | number>;
export type Translator = (path: string, option?: TranslatorOption) => string;
export interface LocaleContext {
  locale: Ref<Language>;
  lang: Ref<string>;
  t: Translator;
}

export const translate = (
  path: string,
  option: undefined | TranslatorOption,
  locale: Language
): string =>
  (get(locale, path, path) as string).replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`
  );

export const buildTranslator =
  (locale: MaybeRef<Language>): Translator =>
  (path, option) =>
    translate(path, option, unref(locale));

export const buildLocaleContext = (
  locale: MaybeRef<Language>
): LocaleContext => {
  const lang = computed(() => unref(locale).name);
  const localeRef = isRef(locale) ? locale : ref(locale);
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale),
  };
};

export const useLocale = (localeOverrides?: Ref<Language | undefined>) => {
  const locale = localeOverrides || inject('locale', ref())!;
  return buildLocaleContext(computed(() => locale.value || English));
};
