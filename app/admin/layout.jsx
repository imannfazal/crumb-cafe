'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from '../../context/AdminAuthContext';

function AuthGuard({ children }) {
  const { token, loading } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !token && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [token, loading, pathname, router]);

  if (loading) return null;
  if (!token && pathname !== '/admin/login') return null;

  return children;
}

export default function AdminLayout({ children }) {
  return (
    <AdminAuthProvider>
      <AuthGuard>{children}</AuthGuard>
    </AdminAuthProvider>
  );
}