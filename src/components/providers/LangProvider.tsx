"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { dict, type Dict, type Lang } from "@/lib/i18n";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Lang {
  return localStorage.getItem("lang") === "id" ? "id" : "en";
}

function getServerSnapshot(): Lang {
  return "en";
}

interface LangValue {
  lang: Lang;
  t: Dict;
  toggleLang: () => void;
}

const LangContext = createContext<LangValue>({
  lang: "en",
  t: dict.en,
  toggleLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleLang = () => {
    const next: Lang = localStorage.getItem("lang") === "id" ? "en" : "id";
    localStorage.setItem("lang", next);
    listeners.forEach((l) => l());
  };

  return (
    <LangContext.Provider value={{ lang, t: dict[lang], toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
