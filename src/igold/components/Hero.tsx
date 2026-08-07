import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, BookOpenCheck, Globe2, ShieldCheck } from "lucide-react";
import { useLang } from "../lang";
import "./HeroConcept.css";

export function Hero() {
  const { L } = useLang();
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX-r.left)/r.width)*100}%`);
      el.style.setProperty("--my", `${((e.clientY-r.top)/r.height)*100}%`);
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, []);
  const go = (id:string) => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  return <section id="hero" ref={root} className="noor-hero">
    <div className="noor-sky" aria-hidden="true"><i/><i/><i/><div className="noor-orbit"/><div className="noor-halo"/></div>
    <div className="noor-shell">
      <div className="noor-kicker"><span/>IGOLD · IIUM <b>{L("Interactive Solat Guide","Panduan Solat Interaktif")}</b></div>
      <div className="noor-arabic" lang="ar">صَلَاة</div>
      <h1>{L("Prayer, understood.","Solat, difahami.")}<br/><em>{L("Confidence, embodied.","Keyakinan, dihayati.")}</em></h1>
      <p>{L("A clear, academically reviewed path to learning solat — every movement, recitation and meaning, wherever you are.","Panduan akademik yang jelas untuk mempelajari solat — setiap gerakan, bacaan dan makna, di mana sahaja anda berada.")}</p>
      <div className="noor-actions">
        <button onClick={()=>go("kaifiat")} className="noor-primary">{L("Begin the guide","Mulakan panduan")} <ArrowRight size={18}/></button>
        <button onClick={()=>go("about")} className="noor-secondary">{L("Discover IGOLD","Kenali IGOLD")}</button>
      </div>
      <div className="noor-proof">
        <span><ShieldCheck/>{L("Academically reviewed","Disemak secara akademik")}</span>
        <span><BookOpenCheck/>{L("Shafi’i & Hanafi","Syafi’i & Hanafi")}</span>
        <span><Globe2/>{L("Free worldwide","Percuma sedunia")}</span>
      </div>
    </div>
    <button className="noor-scroll" onClick={()=>go("about")} aria-label={L("Scroll to about section","Skrol ke bahagian tentang")}><ArrowDown/></button>
  </section>;
}
