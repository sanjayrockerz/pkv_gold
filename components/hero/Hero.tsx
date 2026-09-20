'use client';

import Image from 'next/image';
import { contact } from '@/lib/constants';
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp';
import styles from './Hero.module.css';

function Icon({ name }: { name: 'scale' | 'diamond' | 'coins' | 'phone' | 'whatsapp' }) {
  const paths = {
    scale: <><path d="M12 4v15M6 20h12M4 7h16M7 7l-3 6h6L7 7Zm10 0-3 6h6l-3-6Z" /></>,
    diamond: <path d="m4 8 4-4h8l4 4-8 12L4 8Zm0 0h16M8 4l4 4 4-4" />,
    coins: <><ellipse cx="9" cy="7" rx="5" ry="2.5" /><path d="M4 7v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7M14 10c2.8 0 5 1.1 5 2.5v4c0 1.4-2.2 2.5-5 2.5s-5-1.1-5-2.5" /><path d="M14 10c2.8 0 5-1.1 5-2.5S16.8 5 14 5" /></>,
    phone: <path d="M7.2 3.5 9.7 3l2 4.8-1.9 1.5a14.5 14.5 0 0 0 4.9 4.9l1.5-1.9 4.8 2-.5 2.5a2 2 0 0 1-2.1 1.6A15.4 15.4 0 0 1 5.6 5.6a2 2 0 0 1 1.6-2.1Z" />,
    whatsapp: <path d="M19.2 4.8A9.9 9.9 0 0 0 3.6 16.7L3 21l4.4-1.1a9.9 9.9 0 0 0 11.8-15.1Zm-7.1 14.1a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.6.7.7-2.5-.2-.3a8.2 8.2 0 1 1 6.6 3.5Z" />,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24">{paths[name]}</svg>;
}

const valuePoints = [
  ['scale', 'ACCURATE', 'ASSESSMENT', 'Fair evaluation'],
  ['diamond', 'PURITY', 'CHECK', 'Clear assessment'],
  ['coins', 'CLEAR &', 'TRANSPARENT VALUE', 'Honest process'],
] as const;

const OWNER_HERO_ASSET = '/images/owner hero.png';

export function Hero() {
  return <section className={`${styles.hero} hero pkv-hero`} aria-labelledby="hero-title">
    <div className={`${styles.heroScene} hero-scene`}>
      <div className={`${styles.heroInner} hero-content-scene`}>
      <div className={`${styles.content} hero-copy pkv-hero-copy`}>
      <p className={styles.eyebrow}>CASH FOR GOLD</p>
      <h1 id="hero-title" className="hero-headline">Your gold.<br /><em>Our Loyal Valuation.</em></h1>
      <p className={`${styles.lede} hero-supporting`}>We assess the gold you already own with care, clarity and transparency.</p>
      <div className={styles.valuePoints} aria-label="PKV Gold value points">
        {valuePoints.map(([icon, lineOne, lineTwo, detail], index) => <div className={styles.valuePoint} key={lineOne}>
          <span className={styles.valueIcon}><Icon name={icon} /></span>
          <strong>{lineOne}<br />{lineTwo}</strong>
          <small>{detail}</small>
          {index < valuePoints.length - 1 && <span className={styles.divider} aria-hidden="true" />}
        </div>)}
      </div>
      <div className={styles.actions}>
        <a className={styles.primaryAction} href="#value">Calculate My Value <span aria-hidden="true">→</span></a>
        <a className={styles.secondaryAction} href="#location">Visit Our Store</a>
      </div>
      <div className={styles.contactRow}>
        <a href={`tel:${contact.phone}`} aria-label="Call PKV Gold"><span className={styles.contactIcon}><Icon name="phone" /></span><span><strong>{contact.displayPhone.replace('+91 ', '')}</strong><small>CALL US TODAY</small></span></a>
        <a href={buildGeneralWhatsAppUrl()} target="_blank" rel="noopener noreferrer" aria-label="Contact PKV Gold on WhatsApp"><span className={`${styles.contactIcon} ${styles.whatsappIcon}`}><Icon name="whatsapp" /></span><span><strong>{contact.displayPhone.replace('+91 ', '')}</strong><small>WHATSAPP US</small></span></a>
      </div>
      <div className={styles.trustBlock}><div><strong>TRUSTED GOLD VALUATION</strong><small>Clear process</small></div><span /><div><strong>LOCAL SERVICE</strong><small>Personal attention</small></div></div>
      </div>
      <div className={`${styles.ownerStage} pkv-hero-media`} aria-label="PKV Gold owner portrait">
        <Image className={`${styles.ownerImage} pkv-hero-owner`} src={OWNER_HERO_ASSET} alt="PKV Gold owner" fill sizes="(max-width: 900px) 100vw, 55vw" unoptimized priority />
        <div className={styles.sideStatement}><strong>PEOPLE TRUST<br />PKV GOLD</strong><i /><span>VALUE<br />HONESTY<br />SERVICE</span></div>
      </div>
      </div>
      <div className={`${styles.heroAtmosphere} pkv-hero-atmosphere`} aria-hidden="true" />
      <div className={`${styles.heroTransitionLayer} pkv-hero-transition-layer`} aria-hidden="true" />
    </div>
  </section>;
}
