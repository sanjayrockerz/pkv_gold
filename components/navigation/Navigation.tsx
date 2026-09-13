'use client';

import { useEffect, useState } from 'react';
import styles from './Navigation.module.css';

const links = [['Value Matrix', '#calculator'], ['The Protocol', '#protocol'], ['Sanctuary', '#sanctuary-location']];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}><div className={styles.inner}><a className={styles.brand} href="#top" aria-label="PKV Gold home"><span>PKV GOLD</span><i /><small>VALUATION MATRIX</small></a><div className={styles.actions}><a className={styles.valuate} href="#calculator"><span>VALUATE</span><b>→</b></a><button className={styles.menuTrigger} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}><span>MENU</span><i aria-hidden="true"><b /><b /><b /></i></button></div></div><div id="mobile-menu" className={`${styles.mobileMenu} ${open ? styles.open : ''}`} aria-hidden={!open}><div className={styles.mobileMenuInner}><span>PKV GOLD ATELIER</span>{links.map(([label, href]) => <a href={href} key={label} onClick={() => setOpen(false)}>{label}<b>→</b></a>)}</div></div></header>;
}
