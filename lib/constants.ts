export const contactConfig = {
  phone: '+919444528847',
  whatsapp: '+919444528847',
  displayPhone: '+91 94445 28847',
  address: 'No.9/7, Balagi Nagar Main Rd, Velavan Nagar, Kolathur, Chennai, Tamil Nadu 600099',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=No.9%2F7%2C%20Balagi%20Nagar%20Main%20Rd%2C%20Velavan%20Nagar%2C%20Kolathur%2C%20Chennai%2C%20Tamil%20Nadu%20600099',
};
export const contact = contactConfig;
export const defaultWhatsAppMessage = `\u{1F44B} Hello PKV Gold! \u{1F49B}

I\u2019d like to know more about your gold valuation service. \u2728`;
export function buildWhatsAppUrl(message?: string) { const phone = contactConfig.whatsapp.replace(/\D/g, ''); return `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`; }
export const whatsappUrl = buildWhatsAppUrl(defaultWhatsAppMessage);
export function buildAppointmentMessage({ name, location, date, remarks }: { name: string; location: string; date: string; remarks: string }) { return `\u2728 PKV GOLD \u2014 APPOINTMENT REQUEST \u2728

\u{1F44B} Hello PKV Gold!

I\u2019d like to book an appointment for my gold valuation. \u{1F49B}

\u{1F464} Name: ${name}
\u{1F4CD} Location: ${location}
\u{1F4C5} Preferred Date: ${date}
\u{1F4DD} Remarks: ${remarks}

\u{1F4B0} Looking forward to getting the best value for my gold!

\u{1F64F} Thank you!`; }
export function buildAppointmentWhatsAppUrl(formData: { name: string; location: string; date: string; remarks: string }) { return buildWhatsAppUrl(buildAppointmentMessage(formData)); }
export const businessDataStatus = { contactConfigured: true, addressConfigured: true, whatsappConfigured: true };
export const imagery = { hero: '/images/gold-hero.jpg', location: '/images/location.jpg' };
export const purityOptions = [
  { karat: 24, purity: 99.9, factor: 0.999 }, { karat: 22, purity: 91.6, factor: 0.916 },
  { karat: 18, purity: 75, factor: 0.75 }, { karat: 14, purity: 58.5, factor: 0.585 },
] as const;
