'use client';
import { buildWhatsAppUrl, contact, defaultWhatsAppMessage } from '@/lib/constants';
export function ContactActions({ onAppointment, compact = false }: { onAppointment?: () => void; compact?: boolean }) {
  return <div className={`contact-actions ${compact ? 'contact-actions-compact' : ''}`}>
    <a className="btn btn-call" href={`tel:${contact.phone}`} aria-label="Call PKV Gold" title="Call PKV Gold">CALL PKV GOLD <b>&rarr;</b></a>
    <a className="btn btn-whatsapp" href={buildWhatsAppUrl(defaultWhatsAppMessage)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp PKV Gold" title="WhatsApp PKV Gold">WHATSAPP PKV GOLD <b>&rarr;</b></a>
    {onAppointment && <button className="btn btn-gold" type="button" onClick={onAppointment}>BOOK AN APPOINTMENT <b>&rarr;</b></button>}
  </div>;
}
