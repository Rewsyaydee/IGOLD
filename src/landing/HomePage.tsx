import { LangProvider } from "@/igold/lang";
import { AmbientCanvas } from "./components/AmbientCanvas";
import { BentoShowcase } from "./components/BentoShowcase";
import { Finale } from "./components/Finale";
import { GlassNav } from "./components/GlassNav";
import { Hero } from "./components/Hero";
import { LandingFooter } from "./components/LandingFooter";
import { Marquee } from "./components/Marquee";
import { Metrics } from "./components/Metrics";
import { Mission } from "./components/Mission";
import { Support } from "./components/Support";
import { LANDING_TICKER } from "./data";
import { useDocumentMeta } from "./hooks/useDocumentMeta";
import { LaunchTransitionProvider } from "./hooks/useLaunchTransition";
import "./landing.css";

function LandingExperience() {
  useDocumentMeta(
    "iGOLD · Interactive Islamic Prayer Learning | IIUM × Aotearoa",
    "An interactive prayer-learning platform built with IIUM for the New Zealand Muslim community — reverts, youth, and families. Learn solat step by step, free and bilingual.",
  );

  return (
    <div className="igold-landing">
      <a
        href="#curriculum"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#264431]"
      >
        Skip to content
      </a>
      <AmbientCanvas />
      <LaunchTransitionProvider>
        <div className="ld-shell">
          <GlassNav />
          <main>
            <Hero />
            <Marquee items={LANDING_TICKER} />
            <Mission />
            <Marquee items={[...LANDING_TICKER].reverse()} reverse />
            <div className="ld-bento-wrap">
              <BentoShowcase />
            </div>
            <Metrics />
            <Support />
            <Finale />
          </main>
          <LandingFooter />
        </div>
      </LaunchTransitionProvider>
    </div>
  );
}

export function HomePage() {
  return (
    <LangProvider>
      <LandingExperience />
    </LangProvider>
  );
}
