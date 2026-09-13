'use client';

import type { PropsWithChildren } from 'react';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroToCalculator.module.css';

gsap.registerPlugin(ScrollTrigger);

export function HeroToCalculator({ children }: PropsWithChildren) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hero = root.querySelector<HTMLElement>('[data-hero-scene]');
    const calculator = root.querySelector<HTMLElement>('[data-calculator-scene]');
    if (!hero || !calculator || reduceMotion) return;
    const image = hero.querySelector<HTMLElement>('img');
    const light = hero.querySelector<HTMLElement>('[class*="warmLight"]');
    const copy = hero.querySelector<HTMLElement>('[data-hero-copy]');
    const background = image?.parentElement;
    const headingMotion = calculator.querySelector<HTMLElement>('[class*="headingMotion"]');
    const support = calculator.querySelector<HTMLElement>('[data-calculator-support]');
    const instrument = calculator.querySelector<HTMLElement>('[data-calculator-instrument]');
    const controls = calculator.querySelectorAll<HTMLElement>('[data-calculator-control]');
    const formula = calculator.querySelector<HTMLElement>('[data-calculator-formula]');
    const rate = calculator.querySelector<HTMLElement>('[data-calculator-rate]');
    const value = calculator.querySelector<HTMLElement>('[data-calculator-value]');
    const action = calculator.querySelector<HTMLElement>('[data-calculator-action]');
    if (!image || !light || !copy || !background || !headingMotion || !support || !instrument || !formula || !rate || !value || !action) return;

    const context = gsap.context(() => {
      const desktop = window.matchMedia('(min-width: 768px)').matches;
        const heroTimeline = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: () => `+=${window.innerHeight * (desktop ? 1.05 : .72)}`, scrub: 0.8, pin: desktop, pinSpacing: desktop, invalidateOnRefresh: true } });
        heroTimeline
          .to(image, { scale: desktop ? 1.075 : 1.045, xPercent: -1.5, yPercent: 5, ease: 'none' }, 0)
          .to(light, { xPercent: 68, opacity: .78, ease: 'none' }, .08)
          .to(copy, { yPercent: -18, opacity: .18, scale: .965, ease: 'power2.in' }, .18)
          .to(background, { '--hero-mask': 'inset(0% 0% 100% 0%)', '--hero-dim': .8, ease: 'power2.in' } as gsap.TweenVars, .56);

        const calculatorTimeline = gsap.timeline({ scrollTrigger: { trigger: calculator, start: 'top 88%', end: 'top 24%', scrub: .9, invalidateOnRefresh: true } });
        calculatorTimeline
          .to(headingMotion, { y: 0, opacity: 1, ease: 'power2.out' }, 0)
          .fromTo(support, { y: 18, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, .16)
          .fromTo(instrument, { y: 58, rotateX: desktop ? 4 : 0, opacity: .35 }, { y: 0, rotateX: 0, opacity: 1, ease: 'power2.out' }, .28)
          .fromTo(controls, { y: 20, opacity: .3 }, { y: 0, opacity: 1, stagger: .1, ease: 'power2.out' }, .44)
          .fromTo(formula, { opacity: .3, y: 12 }, { opacity: 1, y: 0, ease: 'power2.out' }, .58)
          .fromTo(rate, { opacity: .3, y: 12 }, { opacity: 1, y: 0, ease: 'power2.out' }, .66)
          .fromTo(value, { opacity: .35, scale: .97 }, { opacity: 1, scale: 1, ease: 'power2.out' }, .74)
          .fromTo(action, { opacity: .35, y: 12 }, { opacity: 1, y: 0, ease: 'power2.out' }, .84);
      return () => { heroTimeline.kill(); calculatorTimeline.kill(); };
    }, root);
    return () => context.revert();
  }, []);

  return <div className={styles.root} ref={rootRef}><div className={styles.atmosphere} aria-hidden="true" />{children}</div>;
}
