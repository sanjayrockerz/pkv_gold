'use client';

import { PropsWithChildren, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroValueTransition.module.css';

gsap.registerPlugin(ScrollTrigger);

export function HeroValueTransition({ children }: PropsWithChildren) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const context = gsap.context(() => {
      const hero = scene.querySelector<HTMLElement>('.hero-light');
      const media = scene.querySelector<HTMLElement>('.hero-media');
      const copy = scene.querySelector<HTMLElement>('.hero-copy');
      const title = scene.querySelector<HTMLElement>('.hero-copy h1');
      const lede = scene.querySelector<HTMLElement>('.hero-lede');
      const actions = scene.querySelector<HTMLElement>('.hero-actions');
      const note = scene.querySelector<HTMLElement>('.hero-trust');
      const value = scene.querySelector<HTMLElement>('.value-section');
      const valueIntro = scene.querySelector<HTMLElement>('.value-section .section-intro');
      const calculator = scene.querySelector<HTMLElement>('.calculator-panel');
      if (!hero || !media || !copy || !title || !lede || !actions || !note || !value || !valueIntro || !calculator) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        gsap.set([hero, media, copy, value, valueIntro, calculator], { clearProps: 'all' });
        return;
      }

      let cleanupVideo: (() => void) | undefined;
      const poster = media.querySelector<HTMLImageElement>('img');
      if (poster) {
        const video = document.createElement('video');
        video.className = 'hero-video';
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'metadata';
        video.poster = poster.currentSrc || poster.src;
        video.setAttribute('aria-hidden', 'true');
        video.src = '/Gold_jewellery_commercial_camera…_1080p_20260914111903.mp4';
        media.appendChild(video);

        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const playIfVisible = () => { void video.play().catch(() => undefined); };
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) playIfVisible();
          else video.pause();
        }, { rootMargin: '-18% 0px -18% 0px', threshold: 0.05 });
        const showVideo = () => { video.classList.add('is-ready'); poster.classList.add('is-video-ready'); };
        const onVideoError = () => { video.remove(); };
        video.addEventListener('canplay', showVideo, { once: true });
        video.addEventListener('error', onVideoError, { once: true });
        observer.observe(media);
        if (motionQuery.matches) video.pause();

        cleanupVideo = () => {
          observer.disconnect();
          video.removeEventListener('canplay', showVideo);
          video.removeEventListener('error', onVideoError);
          video.pause();
          video.remove();
        };
      }

      const heroIntro = [copy.querySelector('.kicker'), title, lede, actions, note, media].filter(Boolean);
      gsap.set(heroIntro, { y: 24, opacity: 0 });
      gsap.to(heroIntro, {
        y: 0,
        opacity: 1,
        duration: .8,
        stagger: .1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      const onPointerMove = (event: PointerEvent) => {
        if (!window.matchMedia('(pointer: fine)').matches) return;
        const bounds = media.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
        media.style.setProperty('--hero-pointer-x', `${(x * 8).toFixed(2)}px`);
        media.style.setProperty('--hero-pointer-y', `${(y * 6).toFixed(2)}px`);
        media.style.setProperty('--hero-light-x', `${50 + x * 8}%`);
        media.style.setProperty('--hero-light-y', `${50 + y * 8}%`);
      };
      const resetPointer = () => {
        media.style.setProperty('--hero-pointer-x', '0px');
        media.style.setProperty('--hero-pointer-y', '0px');
        media.style.setProperty('--hero-light-x', '50%');
        media.style.setProperty('--hero-light-y', '50%');
      };
      media.addEventListener('pointermove', onPointerMove);
      media.addEventListener('pointerleave', resetPointer);

      const mm = gsap.matchMedia();
      mm.add({ desktop: '(min-width: 901px)', tablet: '(min-width: 561px) and (max-width: 900px)', mobile: '(max-width: 560px)' }, (match) => {
        const isDesktop = Boolean(match.conditions?.desktop);
        const isMobile = Boolean(match.conditions?.mobile);
        const distance = isDesktop ? '+=112vh' : isMobile ? '+=86vh' : '+=96vh';
        const imageScale = isDesktop ? 0.94 : isMobile ? 0.97 : 0.955;
        const imageX = isDesktop ? -28 : isMobile ? -8 : -16;
        const imageY = isDesktop ? -20 : isMobile ? -8 : -12;

        gsap.set(value, { transformOrigin: '50% 0%', y: isMobile ? 30 : 56, opacity: isMobile ? 0.94 : 0.86 });
        gsap.set([valueIntro, calculator], { y: isMobile ? 12 : 22, opacity: 0.84 });
        gsap.set([title, lede, actions, note], { transformOrigin: '50% 50%' });

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: distance,
            scrub: 0.65,
            pin: isDesktop,
            pinSpacing: isDesktop,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(media, { scale: imageScale, x: imageX, y: imageY, opacity: isMobile ? 0.38 : 0.26, duration: 0.72 }, 0.08)
          .to(copy, { y: isMobile ? -10 : -24, opacity: 0.72, duration: 0.55 }, 0.42)
          .to(title, { letterSpacing: isMobile ? '-.055em' : '-.025em', y: isMobile ? -3 : -12, duration: 0.34 }, 0.48)
          .to([lede, actions, note], { opacity: 0.3, y: isMobile ? -4 : -8, duration: 0.28 }, 0.56)
          .to(value, { y: 0, opacity: 1, duration: 0.5 }, 0.48)
          .to(valueIntro, { y: 0, opacity: 1, duration: 0.28 }, 0.68)
          .to(calculator, { y: 0, opacity: 1, scale: 1, duration: 0.28 }, 0.78);

        const revealSections = gsap.utils.toArray<HTMLElement>('.section-pad').filter((section) => section !== value);
        revealSections.forEach((section) => {
          const targets = section.querySelectorAll<HTMLElement>('.section-intro, .category, .why-card, .step, .statement h2, .statement p:not(.kicker), .explainer > div, .trust-panel, .location-copy, .location-card, .contact > div, .enquiry-form, .faq-item');
          if (!targets.length) return;
          gsap.fromTo(targets,
            { y: 30, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.055,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 86%',
                end: 'top 44%',
                scrub: 0.55,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        return () => { timeline.scrollTrigger?.kill(); timeline.kill(); };
      });

      const refresh = () => ScrollTrigger.refresh();
      const resizeObserver = new ResizeObserver(refresh);
      resizeObserver.observe(scene);
      window.addEventListener('load', refresh, { once: true });
      requestAnimationFrame(refresh);

      return () => {
        cleanupVideo?.();
        media.removeEventListener('pointermove', onPointerMove);
        media.removeEventListener('pointerleave', resetPointer);
        resizeObserver.disconnect();
        window.removeEventListener('load', refresh);
        mm.revert();
      };
    }, scene);

    return () => context.revert();
  }, []);

  return <div ref={sceneRef} className={`${styles.scene} hero-value-scene`}>{children}</div>;
}
