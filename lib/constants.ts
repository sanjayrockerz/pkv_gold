export const contactConfig = {
  businessName: 'PKV Gold',
  phone: '+919444528847',
  displayPhone: '+91 94445 28847',
  email: 'pkvgold2025@gmail.com',
  address: 'No.9/7, Balagi Nagar Main Rd, Velavan Nagar, Kolathur, Chennai, Tamil Nadu 600099, India',
  locationLabel: 'Kolathur, Chennai',
  latitude: 13.1243414,
  longitude: 80.2244046,
  mapZoom: 15,
  mapsUrl: 'https://maps.app.goo.gl/W3uqVZXjdqP7adwA7',
};
export const contact = contactConfig;
export function buildMapEmbedUrl() { return `https://www.google.com/maps?q=${contactConfig.latitude},${contactConfig.longitude}&z=${contactConfig.mapZoom}&output=embed`; }
export const businessDataStatus = { contactConfigured: true, addressConfigured: true, whatsappConfigured: true };
export const imagery = { hero: '/images/gold-hero.jpg', location: '/images/location.jpg' };
export const purityOptions = [
  { karat: 24, purity: 99.9 }, { karat: 22, purity: 91.6 }, { karat: 18, purity: 75 },
] as const;
