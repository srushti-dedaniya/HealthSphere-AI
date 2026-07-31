import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md overflow-x-hidden">
      <Outlet />
    </div>
  );
}
