'use client';

import { PropsWithChildren, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroScrollTransition({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    ScrollTrigger.config({ ignoreMobileResize: true });
    const ctx = gsap.context(() => {
      const hero = root.querySelector<HTMLElement>('.pkv-hero');
      const owner = root.querySelector<HTMLElement>('.pkv-hero-owner');
      const copy = root.querySelector<HTMLElement>('.pkv-hero-copy');
      const headline = root.querySelector<HTMLElement>('.hero-headline');
      const supporting = root.querySelector<HTMLElement>('.hero-supporting');
      const statement = root.querySelector<HTMLElement>('[class*="sideStatement"]');
      const atmosphere = root.querySelector<HTMLElement>('.pkv-hero-atmosphere');
      const overlay = root.querySelector<HTMLElement>('.pkv-hero-transition-layer');
      const next = root.querySelector<HTMLElement>('.pkv-value-section');
      const nextItems = next?.querySelectorAll<HTMLElement>(':scope > *');
      const image = owner instanceof HTMLImageElement ? owner : null;
      if (!hero || !owner || !copy || !headline || !supporting || !atmosphere || !overlay || !next) return;

      const desktop = window.matchMedia('(min-width: 901px)').matches;
      const setup = () => {
        const ready = image?.complete ? Promise.resolve() : image?.decode?.().catch(() => undefined) ?? Promise.resolve();
        ready.then(() => {
          ScrollTrigger.refresh();
        });
      };
      setup();
      if (reducedMotion) {
        gsap.set([owner, copy, headline, supporting, statement, atmosphere, overlay], { clearProps: 'all' });
        return;
      }

      const entranceOffset = desktop ? 58 : 22;
      gsap.set(owner, {
        autoAlpha: 1,
        x: entranceOffset,
        y: desktop ? 120 : 52,
        scale: desktop ? 0.9 : 0.96,
        rotationY: desktop ? 10 : 4,
        rotationX: desktop ? 3 : 1,
        transformPerspective: 1200,
        transformOrigin: '50% 100%',
      });
      gsap.set([headline, supporting], { y: 18, opacity: 0.9 });
      const entrance = gsap.timeline({ delay: 1.25, defaults: { ease: 'power3.out' } });
      entrance
        .to(owner, { autoAlpha: 1, x: 0, y: 0, scale: 1, rotationY: 0, rotationX: 0, duration: desktop ? 1.5 : 0.95 }, 0.15)
        .to(headline, { y: 0, opacity: 1, duration: 0.85 }, 0.08)
        .to(supporting, { y: 0, opacity: 1, duration: 0.8 }, 0.22)
        .to(statement, { opacity: 1, duration: 0.7 }, 0.38);

      if (nextItems?.length) gsap.set(nextItems, { y: 24, opacity: 0.72 });

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: desktop ? '+=70vh' : '+=28vh',
          scrub: desktop ? 0.65 : 0.4,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(owner, { scale: desktop ? 0.96 : 0.98, y: desktop ? -25 : -12, rotationY: desktop ? -1 : 0, opacity: desktop ? 0.96 : 0.98 }, 0)
        .to(headline, { y: desktop ? -35 : -18, opacity: desktop ? 0.72 : 0.84 }, 0)
        .to(supporting, { y: desktop ? -20 : -10, opacity: desktop ? 0.75 : 0.88 }, 0.04)
        .to(copy, { y: desktop ? -12 : -6 }, 0.08)
        .to(statement, { opacity: 0 }, 0.1)
        .to(atmosphere, { opacity: 0.5 }, 0.2)
        .to(overlay, { opacity: 1 }, 0.25)
        .to(nextItems ?? next, { y: 0, opacity: 1 }, 0.45);
    }, root);
    return () => ctx.revert();
  }, []);
  return <div ref={ref}>{children}</div>;
}
