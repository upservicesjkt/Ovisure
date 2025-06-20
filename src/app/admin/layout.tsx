
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel - Ovisure Gold Official',
  description: 'Kelola konten website Ovisure Gold Official.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
