import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Wraps any admin route. Redirects to /admin if:
 *   - Session is still loading (shows spinner instead)
 *   - User is not authenticated, or
 *   - User is not in admin_users
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { adminUser, isAdminVerified, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030d08] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-lime-400 border-t-transparent animate-spin" />
          <p className="text-[11px] font-mono text-slate-400 tracking-widest uppercase">
            Verifying session…
          </p>
        </div>
      </div>
    );
  }

  if (!adminUser || !isAdminVerified) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};
