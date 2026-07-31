export type Role = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
