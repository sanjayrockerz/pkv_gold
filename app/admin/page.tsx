'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';

type Karat = '24' | '22' | '18';
type GoldRate = { rates: Record<Karat, number>; updatedAt: string };
const karats: Karat[] = ['24', '22', '18'];
const emptyRates: Record<Karat, string> = { '24': '', '22': '', '18': '' };

function formatRate(value: number) { return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`; }
function formatDate(value: string) { return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)); }

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rates, setRates] = useState(emptyRates);
  const [current, setCurrent] = useState<GoldRate | null>(null);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function loadRates() {
    const response = await fetch('/api/admin/rate', { cache: 'no-store' });
    if (response.status === 401) { setAuthenticated(false); return; }
    if (!response.ok) throw new Error('Unable to load current rates.');
    const data = await response.json() as GoldRate;
    setCurrent(data);
    setRates({ '24': String(data.rates['24']), '22': String(data.rates['22']), '18': String(data.rates['18']) });
    setAuthenticated(true);
  }

  useEffect(() => { loadRates().catch(() => setAuthenticated(false)); }, []);

  async function login(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage(null);
    try {
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error ?? 'Unable to sign in.');
      setPassword(''); await loadRates();
    } catch (error) { setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Unable to sign in.' }); }
    finally { setBusy(false); }
  }

  async function save(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage(null);
    try {
      const parsed = Object.fromEntries(karats.map((karat) => [karat, Number(rates[karat])]));
      if (karats.some((karat) => !rates[karat].trim() || !Number.isFinite(parsed[karat]) || parsed[karat] <= 0 || parsed[karat] > 1000000 || !/^\d+(\.\d{1,2})?$/.test(rates[karat].trim()))) throw new Error('Enter a positive rate with no more than two decimal places for every karat.');
      const response = await fetch('/api/admin/rate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rates: parsed }) });
      const data = await response.json().catch(() => ({}));
      if (response.status === 401) { setAuthenticated(false); throw new Error('Your session has expired. Please sign in again.'); }
      if (!response.ok) throw new Error(data.error ?? 'Could not update the rates.');
      setCurrent(data); setMessage({ type: 'success', text: 'Gold rates updated successfully' });
    } catch (error) { setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Could not update the rates.' }); }
    finally { setBusy(false); }
  }

  async function logout() { await fetch('/api/admin/logout', { method: 'POST' }); setAuthenticated(false); setCurrent(null); setRates(emptyRates); setMessage(null); }

  return <main className="admin-shell">
    <header className="admin-topbar"><Link className="admin-brand" href="/"><Image src="/images/PKV%20LOGO.png" alt="PKV Gold" width={56} height={56} /><span>PKV GOLD<small>ADMIN PANEL</small></span></Link>{authenticated && <button className="admin-logout" type="button" onClick={logout}>LOG OUT</button>}</header>
    {authenticated === null ? <div className="admin-loading">Loading secure admin access…</div> : authenticated ? <section className="admin-dashboard" aria-labelledby="admin-title">
      <div className="admin-heading"><div><p className="admin-kicker">PRIVATE CONTROL ROOM</p><h1 id="admin-title">Gold Rate Management</h1><p>Update the live per-gram rates used by the PKV Gold calculator.</p></div>{current && <div className="admin-updated"><span>LAST UPDATED</span><strong>{formatDate(current.updatedAt)}</strong></div>}</div>
      <div className="current-rates"><p className="admin-kicker">CURRENT GOLD RATES</p><div className="current-rate-grid">{karats.map((karat) => <div key={karat}><span>{karat}K</span><strong>{current ? formatRate(current.rates[karat]) : '—'} <small>/ g</small></strong></div>)}</div></div>
      <form className="rates-form" onSubmit={save}><div className="rate-card-grid">{karats.map((karat) => <label className="rate-card" key={karat}><span>{karat}K GOLD</span><div><b>₹</b><input aria-label={`${karat}K gold rate per gram`} value={rates[karat]} onChange={(event) => setRates({ ...rates, [karat]: event.target.value })} inputMode="decimal" type="text" placeholder="0.00" /></div><small>Rate per gram</small></label>)}</div><button className="admin-save" type="submit" disabled={busy}>{busy ? 'SAVING…' : 'SAVE RATES'} <span aria-hidden="true">→</span></button>{message && <p className={`admin-feedback ${message.type}`} role="status">{message.type === 'success' ? '✓ ' : ''}{message.text}{message.type === 'success' && current ? <><br /><small>Last updated: {formatDate(current.updatedAt)}</small></> : null}</p>}</form>
    </section> : <form className="admin-login-card" onSubmit={login}><Image className="admin-login-logo" src="/images/PKV%20LOGO.png" alt="PKV Gold" width={78} height={78} /><p className="admin-kicker">PKV GOLD</p><h1>ADMIN PANEL</h1><p className="admin-login-copy">Sign in to manage the live gold rates.</p><label>Username<input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required /></label><label>Password<input value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" type="password" required /></label><button className="admin-save" type="submit" disabled={busy}>{busy ? 'SIGNING IN…' : 'SIGN IN'} <span aria-hidden="true">→</span></button>{message && <p className="admin-feedback error" role="alert">{message.text}</p>}</form>}
  </main>;
}
