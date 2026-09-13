'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(pointer: fine)').matches) return;
    const handlePointerMove = (event: PointerEvent) => { const bounds = hero.getBoundingClientRect(); const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2; const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2; hero.style.setProperty('--pointer-x', `${(x * 1.5).toFixed(2)}px`); hero.style.setProperty('--pointer-y', `${(y * 1.1).toFixed(2)}px`); hero.style.setProperty('--light-x', `${50 + x * 3}%`); hero.style.setProperty('--light-y', `${50 + y * 3}%`); };
    const resetPointer = () => { hero.style.setProperty('--pointer-x', '0px'); hero.style.setProperty('--pointer-y', '0px'); hero.style.setProperty('--light-x', '50%'); hero.style.setProperty('--light-y', '50%'); };
    hero.addEventListener('pointermove', handlePointerMove); hero.addEventListener('pointerleave', resetPointer);
    return () => { hero.removeEventListener('pointermove', handlePointerMove); hero.removeEventListener('pointerleave', resetPointer); };
  }, []);
  return <section className={styles.hero} id="top" ref={heroRef} data-hero-scene aria-labelledby="hero-title"><HeroBackground /><div className={styles.heroInner}><HeroMeta /><HeroContent /><div className={styles.heroFooter}><span><b>01</b><i /> MORE THAN GOLD <em>A CLEARER TOMORROW</em></span></div></div></section>;
}

function HeroBackground() { return <div className={styles.background} aria-hidden="true"><Image src="/images/Hero-bg.png" alt="" fill priority sizes="100vw" className={styles.backgroundImage} /><div className={styles.edgeShade} /><div className={styles.warmLight} /><div className={styles.copyShade} /><div className={styles.vignette} /></div>; }
function HeroMeta() { return <aside className={styles.meta} aria-label="PKV Gold principles"><span>TRUST</span><span>PURITY</span><span>PRECISION</span><span>VALUE</span></aside>; }
function HeroContent() { return <div className={styles.content} data-hero-copy><div className={styles.eyebrow}><span>PRIVATE VALUATION HOUSE</span><i /></div><div className={styles.titleReveal}><div className={styles.titleMotion}><h1 id="hero-title"><span>YOUR</span><span>GOLD.</span><em>YOUR</em><em>VALUE.</em></h1></div></div><p>Know what your gold is worth today. Uncompromised precision, private verification, transparent market benchmarking.</p><div className={styles.actions}><a className={`${styles.action} ${styles.primaryAction}`} href="#calculator"><span>CALCULATE VALUE</span><b>→</b></a><a className={`${styles.action} ${styles.secondaryAction}`} href="#sanctuary-location"><span>VISIT PKV GOLD</span><b>→</b></a></div></div>; }
