import type { Role } from '@/types/auth';

export interface NavItem {
  key: string;
  label: string;
  icon: string;
  href: string;
}

export const DOCTOR_NAV: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '/doctor' },
  { key: 'patients', label: 'Patients', icon: 'group', href: '/doctor/patients' },
  { key: 'analytics', label: 'Analytics', icon: 'monitoring', href: '/doctor/analytics' },
  { key: 'protocols', label: 'Protocols', icon: 'medical_services', href: '/doctor/protocols' },
  { key: 'settings', label: 'Settings', icon: 'settings', href: '/doctor/settings' },
];

export const PATIENT_NAV: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '/patient' },
  { key: 'reports', label: 'Reports', icon: 'description', href: '/patient/reports' },
  { key: 'appointments', label: 'Appointments', icon: 'calendar_today', href: '/patient/appointments' },
  { key: 'prescriptions', label: 'Prescriptions', icon: 'prescriptions', href: '/patient/prescriptions' },
  { key: 'settings', label: 'Settings', icon: 'settings', href: '/patient/settings' },
];

export const ADMIN_NAV: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '/admin' },
  { key: 'patients', label: 'Patients', icon: 'group', href: '/admin/patients' },
  { key: 'analytics', label: 'Analytics', icon: 'monitoring', href: '/admin/analytics' },
  { key: 'protocols', label: 'Protocols', icon: 'medical_services', href: '/admin/protocols' },
  { key: 'settings', label: 'Settings', icon: 'settings', href: '/admin/settings' },
];

export const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  doctor: DOCTOR_NAV,
  patient: PATIENT_NAV,
  admin: ADMIN_NAV,
};

export const ROLE_META: Record<Role, { title: string; brand: string }> = {
  doctor: { title: 'Enterprise Health', brand: 'Enterprise Health' },
  patient: { title: 'Enterprise Health', brand: 'Enterprise Health' },
  admin: { title: 'Enterprise Health', brand: 'Enterprise Health' },
};
