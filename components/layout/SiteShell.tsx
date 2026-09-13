import type { PropsWithChildren } from 'react';
import { Navigation } from '@/components/navigation/Navigation';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';

export function SiteShell({ children }: PropsWithChildren) {
  return <div className="site-shell"><Navigation /><main>{children}</main><BottomNavigation /></div>;
}
