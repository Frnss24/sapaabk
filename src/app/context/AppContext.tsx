import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'parent' | 'therapist' | 'admin';

export interface AppUser {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

interface AppContextType {
  user: AppUser | null;
  login: (user: AppUser) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = 'sapa_abk_user';

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (u: AppUser) => setUser(u);
  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{ user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
