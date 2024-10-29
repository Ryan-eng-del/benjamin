import 'server-only';
import { Locale } from './config';

const dictionaries = {
	['de-DE']: () => import('./locale/de_DE.json').then((module) => module.default),
	['en-US']: () => import('./locale/en_US.json').then((module) => module.default),
	['es-MX']: () => import('./locale/es_MX.json').then((module) => module.default),
	['ja-JP']: () => import('./locale/ja_JP.json').then((module) => module.default),
	['pt-BR']: () => import('./locale/pt_BR.json').then((module) => module.default),
	['ru-RU']: () => import('./locale/ru_RU.json').then((module) => module.default),
	['zh-CN']: () => import('./locale/zh_CN.json').then((module) => module.default),
	['zh-TW']: () => import('./locale/zh_TW.json').then((module) => module.default),
	['tr-TR']: () => import('./locale/zh_TW.json').then((module) => module.default),
	['id-ID']: () => import('./locale/zh_TW.json').then((module) => module.default),
	['vi-VN']: () => import('./locale/zh_TW.json').then((module) => module.default),
	['th-TH']: () => import('./locale/zh_TW.json').then((module) => module.default),
	['ms-MY']: () => import('./locale/zh_TW.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
	dictionaries[locale]?.() ?? dictionaries['en-US']();

// 省个await？ 这个对象客户端也要用！小心把全部语言传过去了
// import en from "./dictionaries/en.json";
// import zh from "./dictionaries/zh.json";
// const dictionaries = { en, zh };
// export const getDictionary = (locale: Locale) =>
//   dictionaries[locale] ?? dictionaries.en;
