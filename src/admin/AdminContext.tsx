import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { adminAuthService } from '../lib/supabase';

interface AdminContextType {
  adminUser: User | null;
  isAdminVerified: boolean;
  isLoading: boolean;
  setAdminUser: (user: User | null) => void;
}

const AdminContext = createContext<AdminContextType>({
  adminUser: null,
  isAdminVerified: false,
  isLoading: true,
  setAdminUser: () => {},
});

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUserState] = useState<User | null>(null);
  const [isAdminVerified, setIsAdminVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On mount, check if there is an existing valid session
    const checkSession = async () => {
      try {
        const { data } = await adminAuthService.getSession();
        if (data.session?.user) {
          const isAdmin = await adminAuthService.checkIsAdmin(data.session.user.id);
          if (isAdmin) {
            setAdminUserState(data.session.user);
            setIsAdminVerified(true);
          }
        }
      } catch {
        // Session check failed silently — user will stay on login page
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  const setAdminUser = (user: User | null) => {
    setAdminUserState(user);
    setIsAdminVerified(user !== null);
  };

  return (
    <AdminContext.Provider value={{ adminUser, isAdminVerified, isLoading, setAdminUser }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminContext);
