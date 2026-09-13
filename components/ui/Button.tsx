import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';

export function Button({ children, className = '', ...props }: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) {
  return <a className={`button ${className}`.trim()} {...props}>{children}</a>;
}
