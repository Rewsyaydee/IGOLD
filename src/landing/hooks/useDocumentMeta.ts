import { useEffect } from "react";

/** Keeps document title + key meta tags in sync with the active route. */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const set = (selector: string, value: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector);
      if (el) el.setAttribute("content", value);
    };
    set('meta[name="description"]', description);
    set('meta[property="og:title"]', title);
    set('meta[property="og:description"]', description);
    set('meta[name="twitter:title"]', title);
    set('meta[name="twitter:description"]', description);
  }, [title, description]);
}
