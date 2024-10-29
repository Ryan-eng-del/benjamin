"use client";

import { ReactNode, useRef, useContext, createContext } from "react";
import { SupportedLanguages } from "../config";
import { getDictionary } from "../get-dictionary";

type LangState = {
  lang: SupportedLanguages;
  langDictionary: Awaited<ReturnType<typeof getDictionary>>;
};

const LangContext = createContext<LangState>({
  lang: SupportedLanguages["en-US"],
  langDictionary: {} as Awaited<ReturnType<typeof getDictionary>>,
});

export const LangTextProvider = ({
  children,
  lang,
  langDictionary,
}: { children: ReactNode } & LangState) => {
  const value = useRef({
    lang,
    langDictionary,
  });
  return (
    <LangContext.Provider value={value.current}>
      {children}
    </LangContext.Provider>
  );
};

export const useT = () => {
  const { langDictionary: t } = useContext(LangContext);
  return (key: keyof typeof t, replacer?: Record<string, string>) => {
    return replacer
      ? Object.keys(replacer).reduce(
          (str, slot) => str.replaceAll(`{${slot}}`, replacer[slot]),
          t[key]
        )
      : t[key];
  };
};

export const useLang = () => {
  const { lang } = useContext(LangContext);
  return lang;
};
