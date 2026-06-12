import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { validateLogin } from '../auth/credentials';
import type { AuthUser, UserRole } from '../auth/types';

type AuthContextValue = {
  user: AuthUser | null;
  pendingRole: UserRole | null;
  selectRole: (role: UserRole) => void;
  clearPendingRole: () => void;
  login: (role: UserRole, email: string, password: string) => string | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const displayNames: Record<UserRole, string> = {
  homeowner: 'Maple Street Home',
  technician: 'CoolAir Pro Tech',
  admin: 'AHRN Platform Ops',
  superadmin: 'AHRN Super Admin',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);

  const selectRole = useCallback((role: UserRole) => setPendingRole(role), []);
  const clearPendingRole = useCallback(() => setPendingRole(null), []);

  const login = useCallback((role: UserRole, email: string, password: string) => {
    if (!validateLogin(role, email, password)) {
      return 'Invalid email or password for this role.';
    }
    setUser({ role, email: email.trim().toLowerCase(), displayName: displayNames[role] });
    setPendingRole(null);
    return null;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setPendingRole(null);
  }, []);

  const value = useMemo(
    () => ({ user, pendingRole, selectRole, clearPendingRole, login, logout }),
    [user, pendingRole, selectRole, clearPendingRole, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
