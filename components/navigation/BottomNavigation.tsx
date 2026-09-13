export function BottomNavigation() {
  const items = [
    ['account_balance', 'Vault', '#top'],
    ['scale', 'Matrix', '#calculator'],
    ['diamond', 'Atelier', '#protocol'],
    ['storefront', 'Sanctuary', '#sanctuary-location'],
  ];

  return <nav className="bottom-nav" aria-label="Primary mobile navigation">{items.map(([icon, label, href], index) => <a className={index === 1 ? 'active' : ''} href={href} key={label}><span className="material-symbols-outlined">{icon}</span><span>{label}</span></a>)}</nav>;
}
