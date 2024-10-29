export const i18n = {
  defaultLocale: "en-US",
  locales: ["en-US", "zh-CN"],
} as const;

export enum SupportedLanguages {
  "en-US" = "en-US",
  "zh-CN" = "zh-CN",
}

export const LOCALES_LIST = [
  {
    label: "English(US)",
    value: SupportedLanguages["en-US"],
  },
  {
    label: "中文 (简体)",
    value: SupportedLanguages["zh-CN"],
  },
];

export type Locale = (typeof i18n)["locales"][number];

export const gSPwithLang = (slug: Record<string, string>[]) => {
  return i18n.locales.flatMap((locale) =>
    slug.map((i) => ({ ...i, lang: locale }))
  );
};
