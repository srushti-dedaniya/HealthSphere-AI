import type { Role } from '@/types/auth';

export interface DemoUser {
  email: string;
  password: string;
  name: string;
  role: Role;
}

export const DEMO_USERS: DemoUser[] = [
  { email: 'patient@healthsphere.ai', password: 'patient123', name: 'Alex Thompson', role: 'patient' },
  { email: 'doctor@healthsphere.ai', password: 'doctor123', name: 'Dr. Julianne Smith', role: 'doctor' },
  { email: 'admin@healthsphere.ai', password: 'admin123', name: 'Sarah Mitchell', role: 'admin' },
];
