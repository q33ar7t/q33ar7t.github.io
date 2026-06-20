/* «Найди своего жениха» — interactive quiz app */
import { useState, useEffect } from 'react';
import { QUIZ as Q } from './data.js';

const LS = 'zhenih_state_v2';

function shuffle(n){
  const a = Array.from({length:n}, (_,i)=>i);
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
function makeOrders(){ return Q.questions.map(q=>shuffle(q.options.length)); }

function HeartBg(){ return <div className="heart-bg" />; }

/* ---------------- HOME ---------------- */
function Home({ onStart, scale }){
  return (
    <div className="frame tall" style={{height:1739, transform:`scale(${scale})`}}>
      <HeartBg/>
      <div className="home-label" style={{left:97,top:40}}>конкурс</div>
      <div className="cav" style={{position:'absolute',left:42,top:66,width:312,fontSize:42}}>найди своего жениха</div>

      <div className="silhouette-photo" style={{position:'absolute',left:23,top:208,width:347,height:614,background:'url(/img/ef8c1efb1264f3f1.png) center/contain no-repeat'}} />

      <div style={{position:'absolute',left:-12,top:680,width:417,height:218,background:'url(/img/59bb844f729b5efb.png) center/cover no-repeat'}} />
      <div className="home-label" style={{left:66,top:734}}>жених</div>
      <div className="groom-name" style={{left:63,top:756}}>{Q.groomName}</div>
      <div className="scribble-white" style={{left:49,top:798}} />

      <div className="cav" style={{position:'absolute',left:0,top:948,width:393,textAlign:'center',fontSize:42}}>правила</div>
      <div className="scribble" style={{left:49,top:994}} />
      <div style={{position:'absolute',left:-224,top:1031,width:716,height:571,background:'url(/img/054055ef042c7bd4.png) center/cover no-repeat'}} />
      <div className="rules-text">
        {'В каждом вопросе представлены фотографии одной и той же части тела разных мужчин.\nСреди них есть фотография жениха.\n\n'}
        <b>Невеста должна угадать, какой из вариантов принадлежит её избраннику.</b>
        {'\n\nЗа каждый правильный ответ невеста получает '}<b>1 балл.</b>
      </div>

      <button className="btn-start" onClick={onStart}>начать</button>
    </div>
  );
}

/* ---------------- QUESTION ---------------- */
function Question({ q, order, onAnswer, scale }){
  const cells = [];
  for(const col of q.cols) for(const row of q.rows) cells.push([col,row]);
  const opts = order.map(i => q.options[i]);
  const [sel,setSel] = useState(null);
  const btnTop = Math.max(...q.rows) + 158 + 26;

  return (
    <div className="frame" key={q.id} style={{height:852, transform:`scale(${scale})`}}>
      <HeartBg/>
      {q.paper && <div className="paper-sheet" style={{left:q.paper.left, top:q.paper.top, width:q.paper.w, height:q.paper.h, backgroundImage:`url(/img/${q.paper.img})`}} />}
      <div className="title cav">{q.title}</div>
      <div className="scribble" />
      <div className="subtitle">выбери верный вариант</div>
      {opts.map((o,idx)=>{
        const [left,top] = cells[idx];
        return (
          <div key={idx} className={"card"+(sel===idx?" selected":"")} style={{left,top}}
               onClick={()=>setSel(idx)}
               dangerouslySetInnerHTML={{__html:o.h}} />
        );
      })}
      {sel!==null &&
        <button className="btn-next" style={{top:btnTop}} onClick={()=>onAnswer(opts[sel].g)}>далее</button>}
    </div>
  );
}

/* ---------------- RESULT ---------------- */
function Result({ score, onRestart, scale }){
  const tier = Q.results.find(r => score>=r.min && score<=r.max) || Q.results[Q.results.length-1];
  const p = tier.photo;
  // by default the couple photo sits above the paper; only «coverPhoto» tiers
  // tuck the photo under the text sheet (to hide an awkwardly-cropped head).
  const zPhoto = tier.coverPhoto ? 1 : 2;
  const zPaper = tier.coverPhoto ? 2 : 1;
  return (
    <div className="frame" style={{height:852, transform:`scale(${scale})`}}>
      <HeartBg/>
      <div style={{position:'absolute', left:p.left, top:p.top, width:p.w, height:p.h, zIndex:zPhoto, background:`url(/img/${p.img}) center / contain no-repeat`}} />
      <div className="paper-sheet" style={{left:-235, top:tier.paperTop, width:736, height:325, zIndex:zPaper, backgroundImage:'url(/img/bfa073d9bbdd2f27.png)'}} />

      <div className="title cav" style={{top:50,fontSize:42,lineHeight:1.0,padding:'0 16px',width:393,zIndex:3}}>{tier.header}</div>
      <div className="scribble" style={{top:tier.scribbleTop,zIndex:3}} />
      <div style={{position:'absolute',left:0,top:tier.pillTop,width:393,display:'flex',justifyContent:'center',zIndex:3}}>
        <div className="pill" style={{position:'relative'}}>{score}/{Q.total}</div>
      </div>
      <div className="result-msg" style={{left:32,top:tier.msgTop,zIndex:3}}
           dangerouslySetInnerHTML={{__html:tier.msg}} />

      <button className="restart" style={{top:812,zIndex:3}} onClick={onRestart}>пройти ещё раз</button>
    </div>
  );
}

/* ---------------- APP ---------------- */
export default function App(){
  const [st,setSt] = useState(()=>{
    try{ const s=JSON.parse(localStorage.getItem(LS)); if(s&&s.phase) return s; }catch(e){}
    return { phase:'home', qIndex:0, score:0, orders:makeOrders() };
  });
  useEffect(()=>{ try{ localStorage.setItem(LS, JSON.stringify(st)); }catch(e){} },[st]);

  const screenH = st.phase==='home' ? 1739 : 852;
  const [scale,setScale] = useState(1);
  useEffect(()=>{
    const calc = ()=>{
      const w = Math.min(window.innerWidth || document.documentElement.clientWidth || 393, 440);
      if(w > 0) setScale(w/393);
    };
    calc();
    requestAnimationFrame(calc);
    window.addEventListener('resize',calc);
    let ro;
    if(window.ResizeObserver){ ro = new ResizeObserver(calc); ro.observe(document.documentElement); }
    return ()=>{ window.removeEventListener('resize',calc); if(ro) ro.disconnect(); };
  },[]);
  useEffect(()=>{ window.scrollTo(0,0); },[st.phase, st.qIndex]);

  const start = ()=> setSt({ phase:'quiz', qIndex:0, score:0, orders:makeOrders() });
  const restart = ()=> setSt({ phase:'home', qIndex:0, score:0, orders:makeOrders() });
  const answer = (isGroom)=> setSt(s=>{
    const score = s.score + (isGroom?1:0);
    if(s.qIndex < Q.total-1) return {...s, qIndex:s.qIndex+1, score};
    return {...s, phase:'result', score};
  });

  let screen;
  if(st.phase==='home') screen = <Home onStart={start} scale={scale} />;
  else if(st.phase==='result') screen = <Result score={st.score} onRestart={restart} scale={scale} />;
  else {
    const q = Q.questions[st.qIndex];
    screen = <Question key={q.id} q={q} order={st.orders[st.qIndex]} onAnswer={answer} scale={scale} />;
  }

  return (
    <div className="stage" style={{ width: 393*scale, height: screenH*scale }}>
      {screen}
    </div>
  );
}
