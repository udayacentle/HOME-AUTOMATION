import type { RoleMeta, UserRole } from './types';
import { colors } from '../theme/tokens';

export const ROLE_META: Record<UserRole, RoleMeta> = {
  homeowner: {
    role: 'homeowner',
    title: 'Homeowner',
    subtitle: 'Home dashboard, forecasts, bids, and repair tracking',
    accent: colors.accent,
    screens: ['Home Dashboard', 'System Forecast', 'Bid Comparison', 'Job Tracking'],
    demoEmail: 'homeowner@ahrn.demo',
    demoPassword: 'homeowner123',
  },
  technician: {
    role: 'technician',
    title: 'Technician',
    subtitle: 'Opportunity feed, job details, and completion flow',
    accent: colors.success,
    screens: ['Opportunity Feed', 'Job Details', 'Complete Job'],
    demoEmail: 'tech@ahrn.demo',
    demoPassword: 'tech123',
  },
  admin: {
    role: 'admin',
    title: 'Admin / Platform',
    subtitle: 'Operations, disputes, and compliance visibility',
    accent: colors.warning,
    screens: ['Admin Overview', 'Disputes', 'Compliance'],
    demoEmail: 'admin@ahrn.demo',
    demoPassword: 'admin123',
  },
  superadmin: {
    role: 'superadmin',
    title: 'Super Admin / AI',
    subtitle: 'Tenants, policies, model controls, and governance',
    accent: colors.danger,
    screens: ['AI Console', 'Governance & Policies'],
    demoEmail: 'super@ahrn.demo',
    demoPassword: 'super123',
  },
};

export function validateLogin(role: UserRole, email: string, password: string): boolean {
  const meta = ROLE_META[role];
  return email.trim().toLowerCase() === meta.demoEmail && password === meta.demoPassword;
}
