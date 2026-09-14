export const WHATSAPP_NUMBER = '9444528847';

export type AppointmentWhatsAppData = {
  name: string;
  location: string;
  date: string;
  remarks?: string;
};

const clean = (value: unknown) => String(value ?? '').trim();

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(String(message ?? ''))}`;
}

export function buildGeneralWhatsAppMessage() {
  return [
    '✨ Hello PKV Gold! 👋',
    '💰 I\'d like to know more about your gold valuation service.',
    '📍 I\'d like to understand the valuation process, current gold rate, and next steps.',
    '🙏 Please help me with the details.',
  ].join('\n\n');
}

function isValidISODate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export function buildAppointmentWhatsAppMessage(data: AppointmentWhatsAppData) {
  const name = clean(data?.name);
  const location = clean(data?.location);
  const date = clean(data?.date);
  const remarks = clean(data?.remarks) || 'No additional remarks.';

  if (!name || !location || !isValidISODate(date)) {
    throw new Error('A name, location, and valid date are required for an appointment message.');
  }

  return [
    '✨ PKV GOLD — APPOINTMENT REQUEST ✨',
    'Hello PKV Gold team,',
    'I\'d like to book an appointment for my gold valuation. 💰',
    `👤 Name: ${name}`,
    `📍 Location: ${location}`,
    `📅 Preferred Date: ${date}`,
    `📝 Remarks: ${remarks}`,
    'Looking forward to getting the best value for my gold! ✨',
    '🙏 Thank you!',
  ].join('\n\n');
}

export function buildAppointmentWhatsAppUrl(data: AppointmentWhatsAppData) {
  return buildWhatsAppUrl(buildAppointmentWhatsAppMessage(data));
}
