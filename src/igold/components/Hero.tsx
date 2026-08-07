import { ArrowDownRight, ArrowUpRight, BookOpen, Globe, ShieldCheck } from "lucide-react";
import { useLang } from "../lang";
import "./HeroConcept.css";
export function Hero(){const {L}=useLang();const go=(id:string)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});return <section id="hero" className="manu-hero">
 <div className="manu-top"><span>IGOLD / IIUM</span><span>{L("Interactive Solat Guide","Panduan Solat Interaktif")}</span><span>MY — NZ</span></div>
 <div className="manu-grid">
  <div className="manu-main">
   <div className="manu-number">01 <span>{L("Knowledge for the ummah","Ilmu untuk ummah")}</span></div>
   <h1>{L("Learn the","Pelajari")}<br/><em>{L("rhythm","rentak")}</em> {L("of prayer.","solat.")}</h1>
   <div className="manu-lower"><p>{L("A visual, step-by-step solat guide grounded in trusted scholarship — designed for understanding, remembrance and confidence.","Panduan solat visual langkah demi langkah berasaskan ilmu yang dipercayai — direka untuk kefahaman, ingatan dan keyakinan.")}</p><button onClick={()=>go("kaifiat")}>{L("Explore the guide","Terokai panduan")}<ArrowUpRight/></button></div>
  </div>
  <aside className="manu-panel">
   <div className="manu-script" lang="ar"><small>الصَّلَاةُ عِمَادُ الدِّينِ</small><strong>صَلَاة</strong><i/></div>
   <div className="manu-note"><span>{L("Begin with intention","Bermula dengan niat")}</span><b>{L("Move with knowledge","Bergerak dengan ilmu")}</b><span>{L("Conclude with peace","Akhiri dengan salam")}</span></div>
   <button className="manu-about" onClick={()=>go("about")}>{L("The story behind IGOLD","Kisah di sebalik IGOLD")}<ArrowDownRight/></button>
  </aside>
 </div>
 <div className="manu-footer"><span><ShieldCheck/>{L("Academic review","Semakan akademik")}</span><span><BookOpen/>{L("Shafi’i + Hanafi","Syafi’i + Hanafi")}</span><span><Globe/>{L("Free for everyone","Percuma untuk semua")}</span><b>{L("Scroll to discover","Skrol untuk meneroka")} ↓</b></div>
 </section>}
