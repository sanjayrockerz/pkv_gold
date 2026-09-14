import { contact } from '@/lib/constants';
import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { LocationMap } from './LocationMap';

export function Location() {
  return <section className="location-scene scene scene-deep" id="sanctuary-location"><div className="location-copy"><span className="scene-index">11 / THE PHYSICAL STORE</span><h2>COME TO<br /><em>{contact.locationLabel}.</em></h2><p>A place at {contact.locationLabel} for a precise, private conversation about your gold.</p><div className="location-details"><span>{contact.businessName.toUpperCase()}</span><strong>{contact.locationLabel}</strong><small>{contact.address}</small></div><div className="contact-actions"><a className="button button-gold" href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">Get Directions <span>→</span></a><a className="button button-outline" href={buildWhatsAppUrl(buildGeneralWhatsAppMessage())} target="_blank" rel="noopener noreferrer">WhatsApp PKV Gold <span>→</span></a></div></div><LocationMap /></section>;
}
