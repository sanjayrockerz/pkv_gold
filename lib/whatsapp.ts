export const WHATSAPP_NUMBER = '9444528847';

const EMOJI = {
  sparkles: String.fromCodePoint(0x2728), wave: String.fromCodePoint(0x1f44b), money: String.fromCodePoint(0x1f4b0), pin: String.fromCodePoint(0x1f4cd), pray: String.fromCodePoint(0x1f64f), person: String.fromCodePoint(0x1f464), calendar: String.fromCodePoint(0x1f4c5), memo: String.fromCodePoint(0x1f4dd),
} as const;
export type AppointmentWhatsAppData = { name: string; location: string; date: string; remarks?: string };
const clean = (value: unknown) => String(value ?? '').trim();

export function buildWhatsAppUrl(message: string) {
  const safeMessage = String(message ?? '');
  if (safeMessage.includes('\uFFFD')) throw new Error('WhatsApp message contains an invalid replacement character.');
  const encodedMessage = encodeURIComponent(safeMessage);
  if (encodedMessage.includes('%EF%BF%BD')) throw new Error('WhatsApp message contains an invalid encoded replacement character.');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
export function buildGeneralWhatsAppMessage() { return [`${EMOJI.sparkles} Hello PKV Gold! ${EMOJI.wave}`, `${EMOJI.money} I would like to know more about your gold valuation service.`, `${EMOJI.pin} I would like to understand the valuation process, current gold rate, and next steps.`, `${EMOJI.pray} Please help me with the details.`].join('\n\n'); }
export function buildGeneralWhatsAppUrl() { return buildWhatsAppUrl(buildGeneralWhatsAppMessage()); }
function isValidISODate(value: string) { if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false; const parsed = new Date(`${value}T00:00:00Z`); return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value; }
export function buildAppointmentWhatsAppMessage(data: AppointmentWhatsAppData) {
  const name = clean(data?.name), location = clean(data?.location), date = clean(data?.date), remarks = clean(data?.remarks) || 'No additional remarks.';
  if (!name || !location || !isValidISODate(date)) throw new Error('A name, location, and valid date are required for an appointment message.');
  return [`${EMOJI.sparkles} PKV GOLD - APPOINTMENT REQUEST ${EMOJI.sparkles}`, 'Hello PKV Gold team,', `I would like to book an appointment for my gold valuation. ${EMOJI.money}`, `${EMOJI.person} Name: ${name}`, `${EMOJI.pin} Location: ${location}`, `${EMOJI.calendar} Preferred Date: ${date}`, `${EMOJI.memo} Remarks: ${remarks}`, `Please confirm my appointment.`, `${EMOJI.pray} Thank you!`].join('\n\n');
}
export function buildAppointmentWhatsAppUrl(data: AppointmentWhatsAppData) { return buildWhatsAppUrl(buildAppointmentWhatsAppMessage(data)); }
