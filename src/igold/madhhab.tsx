// ============================================================================
// IGOLD — Madhhab (school of jurisprudence) context
// Shafi'i and Hanafi are supported. Extend this file to add more schools.
// ============================================================================

import { createContext, useContext, useState, type ReactNode } from "react";

export type Madhhab = "shafii" | "hanafi";

interface MadhhabCtx {
  madhhab: Madhhab;
  setMadhhab: (m: Madhhab) => void;
}

const Ctx = createContext<MadhhabCtx | null>(null);
const STORAGE_KEY = "igold-madhhab";

function initialMadhhab(defaultMadhhab: Madhhab = "shafii"): Madhhab {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "shafii" || saved === "hanafi") return saved;
  }
  return defaultMadhhab;
}

export function MadhhabProvider({
  children,
  defaultMadhhab = "shafii",
}: {
  children: ReactNode;
  defaultMadhhab?: Madhhab;
}) {
  const [madhhab, setMadhhabState] = useState<Madhhab>(() => initialMadhhab(defaultMadhhab));

  const setMadhhab = (m: Madhhab) => {
    setMadhhabState(m);
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {
      /* ignore */
    }
  };

  return <Ctx.Provider value={{ madhhab, setMadhhab }}>{children}</Ctx.Provider>;
}

export function useMadhhab(): MadhhabCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useMadhhab must be used within a MadhhabProvider");
  return c;
}
