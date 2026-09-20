'use client';

import { FormEvent, useState } from 'react';
import { buildAppointmentWhatsAppUrl } from '@/lib/whatsapp';
import { contact } from '@/lib/constants';

export function AppointmentForm() {
  const [error, setError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = { name: String(form.get('name') || '').trim(), location: String(form.get('location') || '').trim(), date: String(form.get('date') || ''), remarks: String(form.get('remarks') || '').trim() };
    if (!values.name || !values.location || !values.date) { setError('Please complete your name, location, and preferred date.'); return; }
    setError('');
    window.location.href = buildAppointmentWhatsAppUrl(values);
  }
  return <form className="appointment-form" onSubmit={submit}>
    <label>Name<input name="name" autoComplete="name" required placeholder="Your name" /></label>
    <label>Location<input name="location" defaultValue={contact.locationLabel} required placeholder="Your location" /></label>
    <label>Date<input name="date" type="date" required /></label>
    <label className="wide">Remarks<textarea name="remarks" rows={3} placeholder="Anything you would like us to know?" /></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="button button-gold wide" type="submit">SEND APPOINTMENT REQUEST <span>→</span></button>
  </form>;
}
