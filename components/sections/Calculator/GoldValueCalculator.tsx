'use client';

import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import { calculateGoldValue, formatIndianRupees } from '@/lib/calculator';
import { purityOptions } from '@/lib/constants';
import styles from './Calculator.module.css';

export function GoldValueCalculator() {
  const [selectedKarat, setSelectedKarat] = useState(22);
  const [weight, setWeight] = useState(18.4);
  const selected = purityOptions.find((option) => option.karat === selectedKarat) ?? purityOptions[1];
  const value = useMemo(() => calculateGoldValue(weight, selected.factor), [weight, selected.factor]);
  const rangeFill = `${((weight - 0.5) / (150 - 0.5)) * 100}%`;

  return <section className={`${styles.section} calculator scene scene-deep`} id="calculator" data-calculator-scene aria-labelledby="calculator-heading"><div className={styles.lightField} aria-hidden="true" /><div className={styles.inner}>
    <header className={styles.heading} data-calculator-heading><span className={styles.eyebrow}>02 / GOLD VALUE CALCULATOR</span><div className={styles.headingReveal}><div className={styles.headingMotion}><h2 id="calculator-heading">KNOW YOUR <em>VALUE.</em></h2></div></div><p data-calculator-support>Understand what your gold could be worth before you visit.</p></header>
    <div className={styles.instrument} data-calculator-instrument>
      <div className={styles.instrumentHead}><span><span className="material-symbols-outlined" aria-hidden="true">balance</span> Crucible Valuation Matrix</span><span className={styles.benchmark}><i /> RATE CONTROLLED BY PKV ADMIN</span></div>
      <div className={styles.controlBlock} data-calculator-control><label className={styles.eyebrow} id="karat-label">01 / SELECT KARAT PURITY</label><div className={styles.karatGrid} role="group" aria-labelledby="karat-label">{purityOptions.map((option) => <button key={option.karat} type="button" aria-pressed={selectedKarat === option.karat} className={`${styles.karat} ${selectedKarat === option.karat ? styles.active : ''}`} onClick={() => setSelectedKarat(option.karat)}><strong>{option.karat}K</strong><small>{option.purity}%</small></button>)}</div></div>
      <div className={`${styles.controlBlock} ${styles.weightBlock}`} data-calculator-control><div className={styles.weightHeading}><label className={styles.eyebrow} htmlFor="weight-slider">02 / NET GOLD WEIGHT</label><output htmlFor="weight-slider"><b>{weight.toFixed(2)}</b> <span>GRAMS</span></output></div><input id="weight-slider" className={styles.slider} type="range" min="0.5" max="150" step="0.1" value={weight} style={{ '--range-fill': rangeFill } as CSSProperties} onChange={(event) => setWeight(Number(event.target.value))} /><div className={styles.scaleLabels}><span>0.50 G</span><span>50.00 G</span><span>100.00 G</span><span>150.00 G</span></div></div>
      <div className={styles.formulaLine} data-calculator-formula aria-label="Valuation formula"><span>WEIGHT</span><b>×</b><span>PURITY</span><b>×</b><span>RATE</span></div>
      <div className={styles.rateStrip} data-calculator-rate><span className={styles.eyebrow}>PURITY FACTOR</span><span className={styles.metric}>{selected.factor.toFixed(3)} <small>/ GOLD CONTENT</small></span></div>
      <div className={styles.valuePlinth} data-calculator-value aria-live="polite"><span className={`${styles.eyebrow} ${styles.gold}`}>ESTIMATED CONTENT</span><div className={styles.value}>{formatIndianRupees(value)} <span>g</span></div><p>Indicative content based on the selected purity and weight. Final valuation is confirmed in person.</p></div>
      <a className={styles.primaryButton} data-calculator-action href="#sanctuary-location"><span>GET MY FINAL VALUATION</span><b aria-hidden="true">→</b></a>
    </div>
  </div></section>;
}
