import type { PropsWithChildren } from 'react';

export function Container({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <div className={`scene ${className}`}>{children}</div>;
}
