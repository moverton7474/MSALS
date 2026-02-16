import { ProtectedRoute } from './components/auth/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
}
