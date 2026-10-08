import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { ProtectedRoute } from './admin/ProtectedRoute';
import { AdminProvider } from './admin/AdminContext';

/**
 * Top-level router.
 *   /                  → existing public Green Campus single-page website (App)
 *   /admin             → Admin login page
 *   /admin/dashboard   → Protected admin dashboard (requires auth + admin_users)
 *
 * AdminProvider wraps only admin routes so the public site is unaffected.
 */
export const RootRouter: React.FC = () => (
  <Routes>
    {/* Public website — completely unchanged */}
    <Route path="/" element={<App />} />

    {/* Admin Portal — wrapped in AdminProvider for auth context */}
    <Route
      path="/admin"
      element={
        <AdminProvider>
          <AdminLogin />
        </AdminProvider>
      }
    />
    <Route
      path="/admin/dashboard"
      element={
        <AdminProvider>
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        </AdminProvider>
      }
    />

    {/* Catch-all redirect to public website */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

