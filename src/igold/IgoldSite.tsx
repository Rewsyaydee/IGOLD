import { Suspense, lazy, useState } from "react";
import "./igold.css";
import { LangProvider } from "./lang";
import { Preloader } from "./components/Preloader";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Syarat } from "./components/Syarat";
import { Rukun } from "./components/Rukun";
import { Kaifiat } from "./components/Kaifiat";
import { Bacaan } from "./components/Bacaan";
import { Quiz } from "./components/Quiz";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

// Lazy-loaded: heavier interactive section, split into its own chunk.
const PostureExplorer = lazy(() => import("./components/PostureExplorer"));

export function IgoldSite() {
  const [loaded, setLoaded] = useState(false);

  return (
    <LangProvider>
      <div className="igold">
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}
        <Nav />
        <main>
          <Hero />
          <About />
          <Syarat />
          <Rukun />
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
    </LangProvider>
  );
}
