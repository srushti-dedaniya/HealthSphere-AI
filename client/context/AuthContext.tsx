import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { AuthState, Role, User } from '@/types/auth';

interface AuthContextValue extends AuthState {
  login: (role: Role, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    const stored = sessionStorage.getItem('healthsphere-auth');
    if (stored) {
      try {
        return JSON.parse(stored) as AuthState;
      } catch {
        return { user: null, isAuthenticated: false };
      }
    }
    return { user: null, isAuthenticated: false };
  });

  const value = useMemo<AuthContextValue>(
    () => ({
      ...auth,
      login: (role: Role, name: string) => {
        const user: User = {
          id: `${role}-${Date.now()}`,
          name,
          role,
          email: `${name.toLowerCase().replace(/\s+/g, '.')}@healthsphere.ai`,
        };
        const next: AuthState = { user, isAuthenticated: true };
        setAuth(next);
        sessionStorage.setItem('healthsphere-auth', JSON.stringify(next));
      },
      logout: () => {
        setAuth({ user: null, isAuthenticated: false });
        sessionStorage.removeItem('healthsphere-auth');
      },
    }),
    [auth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
