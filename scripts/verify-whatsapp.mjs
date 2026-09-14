import assert from 'node:assert/strict';
import { buildAppointmentWhatsAppUrl, buildGeneralWhatsAppMessage, buildGeneralWhatsAppUrl, buildWhatsAppUrl, WHATSAPP_NUMBER } from '../lib/whatsapp.ts';

const requiredGeneralEmojis = ['✨', '👋', '💰', '📍', '🙏'];
const requiredAppointmentEmojis = ['✨', '💰', '👤', '📍', '📅', '📝', '🙏'];
const hasBadValue = (message) => message.includes('\uFFFD') || message.includes('undefined') || message.includes('null') || message.includes('[object Object]');
const decode = (url) => new URL(url).searchParams.get('text') ?? '';
const verifyUrl = (url, expectedMessage) => {
  assert.equal(new URL(url).pathname, `/${WHATSAPP_NUMBER}`);
  assert.equal(decode(url), expectedMessage);
  assert.equal(hasBadValue(expectedMessage), false);
  assert.equal(url.includes('%EF%BF%BD'), false);
};

const generalMessage = buildGeneralWhatsAppMessage();
const generalUrl = buildGeneralWhatsAppUrl();
verifyUrl(generalUrl, generalMessage);
for (const emoji of requiredGeneralEmojis) assert.equal(generalMessage.includes(emoji), true);

const appointmentData = { name: 'San Sat', location: 'Kolathur, Chennai', date: '2026-09-15', remarks: 'scd' };
const appointmentUrl = buildAppointmentWhatsAppUrl(appointmentData);
const appointmentMessage = decode(appointmentUrl);
verifyUrl(appointmentUrl, appointmentMessage);
for (const emoji of requiredAppointmentEmojis) assert.equal(appointmentMessage.includes(emoji), true);
for (const value of Object.values(appointmentData)) assert.equal(appointmentMessage.includes(value), true);

assert.equal(appointmentMessage.includes('\uFFFD'), false);
assert.equal(generalMessage.includes('\uFFFD'), false);
assert.equal(appointmentMessage.includes('undefined'), false);
assert.equal(appointmentMessage.includes('null'), false);
assert.equal(appointmentMessage.includes('[object Object]'), false);
assert.equal(new URL(generalUrl).pathname, '/9444528847');
assert.equal(new URL(appointmentUrl).pathname, '/9444528847');

console.log('WHATSAPP VERIFICATION PASS');
console.log(JSON.stringify({ generalUrl, appointmentUrl, generalMessage, appointmentMessage }, null, 2));
