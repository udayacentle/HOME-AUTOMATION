export type UserRole = 'homeowner' | 'technician' | 'admin' | 'superadmin';

export type AuthUser = {
  role: UserRole;
  email: string;
  displayName: string;
};

export type RoleMeta = {
  role: UserRole;
  title: string;
  subtitle: string;
  accent: string;
  screens: string[];
  demoEmail: string;
  demoPassword: string;
};
