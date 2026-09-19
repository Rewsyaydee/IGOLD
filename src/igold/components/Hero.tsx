import { BookOpenText, Compass, Droplets, HandHeart, Languages } from "lucide-react";
import { useLang } from "../lang";
import "./HeroConcept.css";

export function Hero(){
 const {L}=useLang();
 const go=(id:string)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
 const links=[
  {id:"niyyah",icon:HandHeart,en:"Intentions",bm:"Niat",ar:"نِيَّة"},
  {id:"wudu",icon:Droplets,en:"Wudu",bm:"Wuduk",ar:"وُضُوء"},
  {id:"kaifiat",icon:BookOpenText,en:"Prayer",bm:"Solat",ar:"صَلَاة"},
  {id:"bacaan",icon:Languages,en:"Recitations",bm:"Bacaan",ar:"ذِكْر"},
 ];
 return <section id="hero" className="atlas-hero">
  <div className="atlas-pattern" aria-hidden="true"/><div className="atlas-light" aria-hidden="true"/>
  <header className="atlas-mast"><span><Compass/> IGOLD</span><b>{L("A guide to prayer","Panduan menuju solat")}</b><i>IIUM · MY/NZ</i></header>
  <div className="atlas-content">
   <div className="atlas-seal" aria-hidden="true"><span lang="ar">اقْرَأْ</span><i/><b>EST · 2025</b></div>
   <div className="atlas-eyebrow"><i/>{L("Knowledge made clear","Ilmu yang diperjelas")}<i/></div>
   <h1>{L("Every prayer begins","Setiap solat bermula")}<br/><em>{L("with understanding.","dengan kefahaman.")}</em></h1>
   <p>{L("An immersive, trusted companion for learning every intention, movement and recitation — at your pace, wherever you are.","Teman pembelajaran yang mendalam dan dipercayai untuk memahami setiap niat, gerakan dan bacaan — mengikut rentak anda, di mana sahaja.")}</p>
   <nav className="atlas-shortcuts" aria-label={L("Prayer guide shortcuts","Pintasan panduan solat")}>
    {links.map(({id,icon:Icon,en,bm,ar},i)=><button key={id} onClick={()=>go(id)} style={{"--order":i} as React.CSSProperties}><small>0{i+1}</small><Icon/><span><b>{L(en,bm)}</b><i lang="ar">{ar}</i></span><em>↗</em></button>)}
   </nav>
  </div>
  <footer className="atlas-foot"><span>{L("Shafi’i + Hanafi","Syafi’i + Hanafi")}</span><span>{L("Academically reviewed","Disemak secara akademik")}</span><span>{L("Free for the ummah","Percuma untuk ummah")}</span></footer>
 </section>;
}
