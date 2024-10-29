// node-sdk使用说明：https://github.com/larksuite/node-sdk/blob/main/README.zh.md
import fs from "fs";
import lark from "@larksuiteoapi/node-sdk";
import { i18n, Locale } from "./config";

const CONFIG = {
  APP_ID: "",
  APP_SECRET: "",
  SUPPORT_LANGUAGES: i18n.locales,
  I18N_PATH: "./app/web/i18n/locale",
  I18N_TYPE_PATH: "./app/web/types",
  SOURCE_BITABLE_TOKEN: "",
  SOURCE_TABLE_TOKEN: "",
};

const client = new lark.Client({
  appId: CONFIG.APP_ID,
  appSecret: CONFIG.APP_SECRET,
  disableTokenCache: false,
  loggerLevel: "error",
});

function createJSON(
  data: {
    fields: {
      Key_Cnet: { text: string }[];
    } & Record<Locale, { text: string }[]>;
  }[]
) {
  const localeMap: Partial<Record<Locale, any>> = {};
  i18n.locales.forEach((locale) => [(localeMap[locale] = {})]);
  let typeString = "declare type I18NKEY =\n";
  data.forEach((item) => {
    const { fields } = item;
    const key = fields.Key_Cnet?.[0]?.text;
    const values = i18n.locales.map((locale) => {
      const nodes = fields[locale];
      if (!nodes) return "";
      const text = nodes
        .map((node) => node.text)
        .join("")
        .replace("\n", "<br/>");
      return text;
    });
    const hasValidValue = values.some((value) => !!value);

    if (!key || !hasValidValue) return;
    i18n.locales.forEach(
      (locale, index) => (localeMap[locale][key] = values[index] || "")
    );

    typeString += `\t|\t'${key}'\n`;
  });

  i18n.locales.forEach((locale) => {
    const data = JSON.stringify(localeMap[locale], null, 2);
    fs.writeFileSync(`${CONFIG.I18N_PATH}/${locale}.json`, data);

    // 中文的存一份ts的版本，用于开发中的类型补全
    if (locale == "zh-CN") {
      fs.writeFileSync(
        `${CONFIG.I18N_PATH}/dev_preview.ts`,
        `export default ${data} as const`
      );
    }
  });

  fs.writeFileSync(`${CONFIG.I18N_TYPE_PATH}/i18n.d.ts`, typeString);
}
let i18nTableArr: any = [];
let page_token = "";
async function getTable() {
  try {
    await fetchLarkData();
    createJSON(i18nTableArr);
  } catch (e) {
    console.log(e);
  }
}

async function fetchLarkData() {
  const {
    data: { items: i18nTable, page_token: token },
  } = await client.bitable.appTableRecord.search({
    path: {
      app_token: CONFIG.SOURCE_BITABLE_TOKEN,
      table_id: CONFIG.SOURCE_TABLE_TOKEN,
    },
    params: { page_size: 1000, page_token },
  }); // 获取表格数据
  page_token = token;
  i18nTableArr.push(...i18nTable);
  if (token) await fetchLarkData();
}

getTable();
