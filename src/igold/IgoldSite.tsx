import { Suspense, lazy, useState } from "react";
import "./igold.css";
import { LangProvider } from "./lang";
import { MadhhabProvider } from "./madhhab";
import { ModelProvider } from "./model";
import { APP_CONFIG } from "./config";
import { Preloader } from "./components/Preloader";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Syarat } from "./components/Syarat";
import { Rukun } from "./components/Rukun";
import { Niyyah } from "./components/Niyyah";
import { Kaifiat } from "./components/Kaifiat";
import { Bacaan } from "./components/Bacaan";
import { Quiz } from "./components/Quiz";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

const Wudu = lazy(() => import("./components/Wudu"));
const PostureExplorer = lazy(() => import("./components/PostureExplorer"));

export function IgoldSite() {
  const [loaded, setLoaded] = useState(false);

  return (
    <LangProvider>
      <MadhhabProvider defaultMadhhab={APP_CONFIG.defaultMadhhab}>
        <ModelProvider defaultModel={APP_CONFIG.defaultModel}>
          <div className="igold">
            {!loaded && <Preloader onDone={() => setLoaded(true)} />}
            <Nav />
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
              <Suspense fallback={<div style={{ minHeight: "40vh" }} aria-hidden="true" />}>
                <PostureExplorer />
              </Suspense>
              <Bacaan />
              <Quiz />
              <Contact />
            </main>
            <Footer />
          </div>
        </ModelProvider>
      </MadhhabProvider>
    </LangProvider>
  );
}
