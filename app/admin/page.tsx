import type { Metadata } from 'next';
import AdminPage from './AdminPage';

export const metadata: Metadata = {
  title: 'Admin Panel',
  robots: { index: false, follow: false },
};

export default AdminPage;
