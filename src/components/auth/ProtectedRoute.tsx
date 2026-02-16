import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import LoginPage from '../../pages/LoginPage';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user) return <LoginPage />;

  return <>{children}</>;
}
