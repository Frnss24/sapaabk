import { useApp } from '../context/AppContext';
import ParentDashboard from './ParentDashboard';
import TherapistDashboard from './TherapistDashboard';
import AdminPanel from './AdminPanel';

export function DashboardRouter() {
  const { user } = useApp();
  if (!user) return null;
  if (user.role === 'therapist') return <TherapistDashboard />;
  if (user.role === 'admin') return <AdminPanel />;
  return <ParentDashboard />;
}
