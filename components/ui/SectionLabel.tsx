export function SectionLabel({ number, label, tone = 'muted' }: { number?: string; label: string; tone?: 'muted' | 'gold' }) {
  return <div className={`section-mark ${tone === 'gold' ? 'gold' : ''}`}>{number ? <span>[ {number} ]</span> : null}<span>{label}</span></div>;
}
