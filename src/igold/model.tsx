// ============================================================================
// IGOLD — Instructional Model context
// Allows switching between different figure models in the media.
// ============================================================================

import { createContext, useContext, useState, type ReactNode } from "react";
import type { MediaModel } from "./mediaRegistry";

interface ModelCtx {
  model: MediaModel;
  setModel: (m: MediaModel) => void;
}

const Ctx = createContext<ModelCtx | null>(null);
const STORAGE_KEY = "igold-model";

function initialModel(defaultModel: MediaModel = "default"): MediaModel {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && ["default", "adult-woman", "boy", "girl"].includes(saved)) {
      return saved as MediaModel;
    }
  }
  return defaultModel;
}

export function ModelProvider({
  children,
  defaultModel = "default",
}: {
  children: ReactNode;
  defaultModel?: MediaModel;
}) {
  const [model, setModelState] = useState<MediaModel>(() => initialModel(defaultModel));

  const setModel = (m: MediaModel) => {
    setModelState(m);
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {
      /* ignore */
    }
  };

  return <Ctx.Provider value={{ model, setModel }}>{children}</Ctx.Provider>;
}

export function useModel(): ModelCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useModel must be used within a ModelProvider");
  return c;
}
