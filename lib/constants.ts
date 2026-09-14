export const contactConfig = {
  businessName: 'PKV Gold',
  phone: '+919444528847',
  displayPhone: '+91 94445 28847',
  address: 'No.9/7, Balagi Nagar Main Rd, Velavan Nagar, Kolathur, Chennai, Tamil Nadu 600099',
  locationLabel: 'Kolathur, Chennai',
  latitude: 13.118,
  longitude: 80.214,
  mapZoom: 15,
  mapsUrl: 'https://maps.app.goo.gl/W3uqVZXjdqP7adwA7',
};
export const contact = contactConfig;
export function buildMapEmbedUrl() { return `https://www.google.com/maps?q=${contactConfig.latitude},${contactConfig.longitude}&z=${contactConfig.mapZoom}&output=embed`; }
export const businessDataStatus = { contactConfigured: true, addressConfigured: true, whatsappConfigured: true };
export const imagery = { hero: '/images/gold-hero.jpg', location: '/images/location.jpg' };
export const purityOptions = [
  { karat: 24, purity: 99.9, factor: 0.999 }, { karat: 22, purity: 91.6, factor: 0.916 },
  { karat: 18, purity: 75, factor: 0.75 }, { karat: 14, purity: 58.5, factor: 0.585 },
] as const;
