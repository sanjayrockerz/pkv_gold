import { contact } from '@/lib/constants';
import { buildGeneralWhatsAppUrl } from '@/lib/whatsapp';
import styles from './FloatingContactActions.module.css';

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.9 3.5 9.2 3l2 4.3-1.8 1.5a13.3 13.3 0 0 0 5.8 5.8l1.5-1.8 4.3 2-.5 2.3a2.4 2.4 0 0 1-2.6 1.9A16.1 16.1 0 0 1 5 6.1a2.4 2.4 0 0 1 1.9-2.6Z" /></svg>;
}

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3.2a8.7 8.7 0 0 0-7.5 13.2L3.3 20.7l4.4-1.1A8.7 8.7 0 1 0 12 3.2Zm0 15.8a7 7 0 0 1-3.6-1l-.3-.2-2.6.7.7-2.5-.2-.3A7 7 0 1 1 12 19Zm3.9-5.2c-.2-.1-1.3-.7-1.5-.8-.2-.1-.3-.1-.5.1l-.7.9c-.1.1-.2.2-.4.1a5.7 5.7 0 0 1-2.9-2.5c-.1-.2 0-.3.1-.4l.4-.5.2-.3a.4.4 0 0 0 0-.4l-.7-1.7c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3a8.2 8.2 0 0 0 3.2 3c.4.2 1.5.6 1.8.6.3 0 1.3-.5 1.5-.9.2-.4.2-.8.1-.9-.1-.2-.3-.3-.5-.4Z" /></svg>;
}

export function FloatingContactActions() {
  const actions = [
    { href: `tel:${contact.phone}`, label: 'Call', className: 'call', icon: <PhoneIcon /> },
    { href: buildGeneralWhatsAppUrl(), label: 'WhatsApp', className: 'whatsapp', icon: <WhatsAppIcon />, external: true },
  ];

  return <aside className={styles.actions} aria-label="Contact PKV Gold">
    {actions.map(({ href, label, className, icon, external }) => <a className={`${styles.action} ${styles[className]}`} href={href} key={label} aria-label={`${label} PKV Gold`} title={`${label} PKV Gold`} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </a>)}
  </aside>;
}
