import { Route, Routes } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

import Home from '@/pages/public/Home';
import NotFound from '@/pages/public/NotFound';

import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import VerificationPending from '@/pages/auth/VerificationPending';

import PatientDashboard from '@/pages/patient/Dashboard';
import DoctorDashboard from '@/pages/doctor/Dashboard';
import AdminDashboard from '@/pages/admin/Dashboard';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification-pending" element={<VerificationPending />} />
      </Route>

      <Route
        path="/patient"
        element={
          <ProtectedRoute roles={['patient']}>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor"
        element={
          <ProtectedRoute roles={['doctor']}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
