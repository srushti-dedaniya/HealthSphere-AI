import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import type { Role } from '@/types/auth';

interface RoleRouteProps {
  role: Role;
  children: ReactNode;
}

export function RoleRoute({ role, children }: RoleRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== role) {
    return <Navigate to={`/${user?.role}`} replace />;
  }

  return <>{children}</>;
}
