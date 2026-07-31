import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string | undefined {
  const [active, setActive] = useState<string | undefined>(sectionIds[0]);

  useEffect(() => {
    const onScroll = () => {
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds]);

  return active;
}
