import { useEffect, useRef } from "react";
import { ArrowDown, BookOpenCheck, Droplets, Globe2, HandHeart, Languages, ShieldCheck } from "lucide-react";
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
      <nav className="noor-shortcuts" aria-label={L("Prayer guide shortcuts","Pintasan panduan solat")}>
        {[
          { id:"niyyah", icon:HandHeart, n:"01", en:"Intentions", bm:"Niat" },
          { id:"wudu", icon:Droplets, n:"02", en:"Wudu", bm:"Wuduk" },
          { id:"kaifiat", icon:BookOpenCheck, n:"03", en:"Prayer", bm:"Solat" },
          { id:"bacaan", icon:Languages, n:"04", en:"Recitations", bm:"Bacaan" },
        ].map(({id,icon:Icon,n,en,bm})=><button key={id} onClick={()=>go(id)}><small>{n}</small><Icon/><span>{L(en,bm)}</span><i>↗</i></button>)}
      </nav>
      <div className="noor-proof">
        <span><ShieldCheck/>{L("Academically reviewed","Disemak secara akademik")}</span>
        <span><BookOpenCheck/>{L("Shafi’i & Hanafi","Syafi’i & Hanafi")}</span>
        <span><Globe2/>{L("Free worldwide","Percuma sedunia")}</span>
      </div>
    </div>
    <button className="noor-scroll" onClick={()=>go("about")} aria-label={L("Scroll to about section","Skrol ke bahagian tentang")}><ArrowDown/></button>
  </section>;
}
