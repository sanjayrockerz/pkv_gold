'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { jewelleryCategories } from '@/lib/jewellery';
import styles from './GoldWeValue.module.css';

gsap.registerPlugin(ScrollTrigger);

export function GoldWeValue() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedId, setSelectedId] = useState(jewelleryCategories[0]?.id ?? '');
  const selected = jewelleryCategories.find((item) => item.id === selectedId) ?? jewelleryCategories[0];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(section.querySelectorAll('[data-collection-reveal]'), { y: 32, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 78%', once: true },
      });
    }, section);
    return () => context.revert();
  }, []);

  const selectedIndex = Math.max(0, jewelleryCategories.findIndex((item) => item.id === selected?.id));

  return <section className={styles.section} ref={sectionRef} id="gold-we-value" aria-labelledby="gold-we-value-heading">
    <div className={styles.layout}>
      <header className={styles.intro} data-collection-reveal>
        <span className="scene-index">03 / THE GOLD WE VALUE</span>
        <h2 id="gold-we-value-heading">THE GOLD<br /><em>WE VALUE.</em></h2>
        <p>Gold takes many forms. Value begins with understanding what you hold.</p>
        <div className={styles.rule} aria-hidden="true" />
        <span className={styles.current}>SELECTED FORM <b>0{selectedIndex + 1}</b></span>
      </header>

      <div className={styles.collection} data-collection-reveal>
        <div className={styles.feature} style={{ '--image-position': selected?.imagePosition } as CSSProperties}>
          <Image src={selected?.image ?? '/images/gold-bangle.png'} alt={`${selected?.label ?? 'Gold jewellery'} detail`} fill sizes="(max-width: 767px) 100vw, 58vw" quality={95} />
          <div className={styles.featureShade} />
          <div className={styles.featureMeta}><span>THE FORM</span><strong>{selected?.label}</strong><small>{selected?.descriptor}</small></div>
          <span className={styles.featureIndex}>0{selectedIndex + 1} / {String(jewelleryCategories.length).padStart(2, '0')}</span>
        </div>
        <div className={styles.rail} role="tablist" aria-label="Gold jewellery forms">
          {jewelleryCategories.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={selectedId === item.id} className={selectedId === item.id ? styles.selected : ''} onClick={() => setSelectedId(item.id)}>
            <span>0{index + 1}</span><strong>{item.label}</strong><small>{item.descriptor}</small><i aria-hidden="true">↗</i>
          </button>)}
        </div>
      </div>
    </div>
    <a className={styles.nextLink} href="#measurement"><span>SEE HOW WE MEASURE IT</span><b aria-hidden="true">↓</b></a>
  </section>;
}
