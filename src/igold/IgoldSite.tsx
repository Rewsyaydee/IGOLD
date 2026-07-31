import { Suspense, lazy, useEffect, useState } from "react";
import "./igold.css";
import { LangProvider } from "./lang";
import { MadhhabProvider } from "./madhhab";
import { ModelProvider } from "./model";
import { NAV_ITEMS } from "./data";
import { APP_CONFIG } from "./config";
import { useActiveSection } from "./hooks/useActiveSection";
import { useLang } from "./lang";
import { Preloader } from "./components/Preloader";
import { Nav } from "./components/Nav";
import { LineSidebar } from "./components/LineSidebar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Syarat } from "./components/Syarat";
import { Rukun } from "./components/Rukun";
import { Niyyah } from "./components/Niyyah";
import { Kaifiat } from "./components/Kaifiat";
import { Janazah } from "./components/Janazah";
import { Bacaan } from "./components/Bacaan";
import { Quiz } from "./components/Quiz";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

const Wudu = lazy(() => import("./components/Wudu"));
const PostureExplorer = lazy(() => import("./components/PostureExplorer"));

function IgoldContent() {
  const { L } = useLang();
  const [loaded, setLoaded] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const sectionIds = NAV_ITEMS.map(n => n.id);
  const activeHref = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      if (hero) {
        setSidebarVisible(window.scrollY >= hero.offsetHeight * 0.7);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeIdx = sectionIds.indexOf(activeHref ?? "");

  const sidebarItems = NAV_ITEMS.map(item => L(item.labelEn, item.label));

  return (
    <div className="igold">
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <div className={sidebarVisible ? "pill-nav-hidden-desktop" : ""}>
        <Nav />
      </div>
      {sidebarVisible && (
        <LineSidebar
          items={sidebarItems}
          accentColor="var(--gold-500)"
          textColor="rgba(22, 34, 63, 0.45)"
          markerColor="rgba(22, 34, 63, 0.18)"
          markerLength={50}
          maxShift={20}
          itemGap={16}
          fontSize={0.95}
          activeIndex={activeIdx >= 0 ? activeIdx : 0}
          onItemClick={(idx) => {
            const id = sectionIds[idx];
            if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
      )}
      <main>
        <Hero />
        <About />
        <Syarat />
        <Rukun />
        <Niyyah />
        {APP_CONFIG.features.wudu && (
          <Suspense fallback={<div style={{ minHeight: "40vh" }} aria-hidden="true" />}>
            <Wudu />
          </Suspense>
        )}
        <Kaifiat />
        {APP_CONFIG.features.janazah && <Janazah />}
        <Suspense fallback={<div style={{ minHeight: "40vh" }} aria-hidden="true" />}>
          <PostureExplorer />
        </Suspense>
        <Bacaan />
        <Quiz />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export function IgoldSite() {
  return (
    <LangProvider>
      <MadhhabProvider defaultMadhhab={APP_CONFIG.defaultMadhhab}>
        <ModelProvider defaultModel={APP_CONFIG.defaultModel}>
          <IgoldContent />
        </ModelProvider>
      </MadhhabProvider>
    </LangProvider>
  );
}
