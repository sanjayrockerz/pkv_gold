'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './GoldHouse.module.css';

gsap.registerPlugin(ScrollTrigger);

export function GoldHouse() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const image = section.querySelector<HTMLElement>('[data-house-image]');
    const secondary = section.querySelector<HTMLElement>('[data-house-secondary]');
    const light = section.querySelector<HTMLElement>('[data-house-light]');
    if (!image || !secondary || !light) return;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.15 } });
      timeline.to(image, { yPercent: -5, scale: 1.04, ease: 'none' }, 0).to(secondary, { yPercent: 8, rotate: -2, ease: 'none' }, 0).to(light, { xPercent: 80, opacity: .85, ease: 'none' }, .12);
      gsap.fromTo(section.querySelectorAll('[data-house-reveal]'), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 72%', once: true } });
    }, section);
    return () => context.revert();
  }, []);

  return <section className={styles.section} ref={sectionRef} id="gold-house" aria-labelledby="gold-house-heading">
    <div className={styles.ambient} data-house-light aria-hidden="true" />
    <div className={styles.header} data-house-reveal><span className="scene-index">04 / THE GOLD HOUSE</span><h2 id="gold-house-heading">THE GOLD<br /><em>HOUSE.</em></h2><p>A closer look at the gold that enters the conversation.</p></div>
    <div className={styles.showroom}>
      <figure className={styles.dominant} data-house-image><Image src="/images/hero-editorial.png" alt="Gold jewellery arranged in warm studio light" fill sizes="(max-width: 767px) 100vw, 73vw" /><div className={styles.imageVeil} /><figcaption><span>PKV GOLD / THE HOUSE</span><strong>A room made warmer by gold.</strong></figcaption></figure>
      <figure className={styles.secondary} data-house-secondary data-house-reveal><Image src="/images/Hero-bg.png" alt="Close detail of gold jewellery and bullion" fill sizes="(max-width: 767px) 72vw, 28vw" /><figcaption><span>DETAIL / MATERIAL</span></figcaption></figure>
      <div className={styles.note} data-house-reveal><span className="scene-index">THE GOLD HOUSE</span><p>Bring the piece, the question, and the story behind it. We begin with what is in your hands.</p><a href="#measurement">Continue to measurement <b aria-hidden="true">→</b></a></div>
    </div>
  </section>;
}
