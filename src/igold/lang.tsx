import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "bm";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Pick a value by language. L(englishValue, malayValue) */
  L: <T>(en: T, bm: T) => T;
}

const Ctx = createContext<LangCtx | null>(null);
const STORAGE_KEY = "igold-lang";

function initialLang(): Lang {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "bm") return saved;
  }
  return "en"; // English default
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "en" ? "en" : "ms";
    }
  }, [lang]);

  const toggle = () => setLang(lang === "en" ? "bm" : "en");
  const L = <T,>(en: T, bm: T): T => (lang === "en" ? en : bm);

  return <Ctx.Provider value={{ lang, setLang, toggle, L }}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLang must be used within a LangProvider");
  return c;
}
