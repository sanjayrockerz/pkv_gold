'use client';
import { useEffect, useState } from 'react';

const steps = [['BRING', 'Start with the piece and the question you want answered.'], ['MEASURE', 'Make the net weight visible before value enters the conversation.'], ['ASSESS', 'Review the purity level selected for the valuation.'], ['VALUE', 'Apply the configured benchmark logic to the inputs.'], ['SETTLE', 'Discuss the final valuation after physical assessment.']] as const;

export function Process() {
  const [active, setActive] = useState(0);
  useEffect(() => { const node = document.querySelector('[data-process-scene]'); if (!node) return; const update = () => { const rect = node.getBoundingClientRect(); const progress = Math.min(1, Math.max(0, (window.innerHeight * .72 - rect.top) / Math.max(1, rect.height - window.innerHeight * .45))); setActive(Math.min(steps.length - 1, Math.floor(progress * steps.length))); }; update(); window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update); }, []);
  return <section className="process-journey scene scene-deep" data-process-scene aria-labelledby="process-heading"><div className="journey-sticky"><div className="journey-intro"><span className="scene-index">06 / HOW THE VALUATION HAPPENS</span><h2 id="process-heading">FROM GOLD<br /><em>TO VALUE.</em></h2><p>Five moments, connected by one clear line of sight.</p></div><div className="journey-track" aria-label="Valuation process">{steps.map(([title, copy], index) => <article className={`journey-step ${index === active ? 'is-active' : ''} ${index < active ? 'is-past' : ''}`} key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>;
}
