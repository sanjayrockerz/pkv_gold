'use client';

import { useEffect, useState } from 'react';
import { buildMapEmbedUrl, contact } from '@/lib/constants';
import styles from './LocationMap.module.css';

type MapState = 'loading' | 'ready' | 'fallback';

export function LocationMap() {
  const [state, setState] = useState<MapState>('loading');

  useEffect(() => {
    const timeout = window.setTimeout(() => setState((current) => current === 'loading' ? 'fallback' : current), 9000);
    return () => window.clearTimeout(timeout);
  }, []);

  const directions = <a className={styles.directions} href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">Get Directions <span aria-hidden="true">→</span></a>;

  return <div className={styles.frame} data-map-state={state}>
    {state === 'loading' && <div className={styles.loading} role="status" aria-live="polite"><span className={styles.spinner} aria-hidden="true" /><strong>Preparing your map</strong><small>Locating {contact.businessName}</small></div>}
    {state === 'fallback' && <div className={styles.fallback} role="status"><span className={styles.fallbackKicker}>VISIT {contact.businessName.toUpperCase()}</span><strong>{contact.locationLabel}</strong><p>{contact.address}</p>{directions}</div>}
    <iframe className={styles.iframe} title={`${contact.businessName} location map`} src={buildMapEmbedUrl()} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen onLoad={() => setState('ready')} onError={() => setState('fallback')} />
  </div>;
}
