import { ArrowRight, BookOpen, Check, Headphones, Play, Sparkles } from "lucide-react";
import { useLang } from "../lang";
import "./HeroConcept.css";
export function Hero(){
 const {L}=useLang(); const go=(id:string)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
 const steps=[L("Intention","Niat"),L("Postures","Postur"),L("Recitations","Bacaan")];
 return <section id="hero" className="journey-hero">
  <div className="journey-glow" aria-hidden="true"/>
  <div className="journey-grid">
   <div className="journey-copy">
    <div className="journey-tag"><Sparkles size={14}/>{L("Learn with clarity. Pray with confidence.","Belajar dengan jelas. Solat dengan yakin.")}</div>
    <h1>{L("Your guided path to","Panduan langkah demi langkah untuk")} <em>{L("meaningful prayer.","solat yang bermakna.")}</em></h1>
    <p>{L("From your first takbir to your final salam, master every step through visual guidance, Arabic recitations and trusted scholarship.","Daripada takbir pertama hingga salam terakhir, kuasai setiap langkah melalui panduan visual, bacaan Arab dan ilmu yang dipercayai.")}</p>
    <div className="journey-actions"><button onClick={()=>go("kaifiat")}><Play size={16} fill="currentColor"/>{L("Start learning","Mula belajar")}</button><button onClick={()=>go("about")}>{L("How it works","Cara ia berfungsi")}<ArrowRight size={16}/></button></div>
    <div className="journey-meta"><div><b>25+</b><span>{L("guided steps","langkah panduan")}</span></div><div><b>2</b><span>{L("schools covered","mazhab diliputi")}</span></div><div><b>100%</b><span>{L("free access","akses percuma")}</span></div></div>
   </div>
   <div className="journey-stage" aria-label={L("Interactive prayer learning preview","Pratonton pembelajaran solat interaktif")}>
    <div className="journey-window">
     <header><span><i/><i/><i/></span><b>IGOLD · {L("LEARNING PATH","LALUAN PEMBELAJARAN")}</b><small>02 / 05</small></header>
     <div className="journey-progress"><i/><i className="active"/><i/><i/><i/></div>
     <div className="journey-arabic" lang="ar">اللّٰهُ أَكْبَرُ</div>
     <span className="journey-label">{L("Opening Takbir","Takbiratul Ihram")}</span>
     <p>{L("Raise both hands to shoulder level and say:","Angkat kedua-dua tangan ke paras bahu dan ucapkan:")}</p>
     <button className="journey-audio"><Headphones size={17}/><span>{L("Listen to recitation","Dengar bacaan")}</span><i/></button>
     <div className="journey-step-list">{steps.map((s,i)=><div key={s} className={i===1?"current":""}><span>{i===0?<Check size={13}/>:i+1}</span>{s}{i===1&&<BookOpen size={15}/>}</div>)}</div>
    </div>
    <div className="journey-float one"><Check/> {L("Academically reviewed","Disemak akademik")}</div>
    <div className="journey-float two"><span lang="ar">صَلَاة</span> {L("Learn anywhere","Belajar di mana sahaja")}</div>
   </div>
  </div>
 </section>;
}
