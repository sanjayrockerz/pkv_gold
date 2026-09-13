export function Divider({ vertical = false }: { vertical?: boolean }) {
  return <div className={vertical ? 'vertical-rule' : 'short-rule'} aria-hidden="true" />;
}
