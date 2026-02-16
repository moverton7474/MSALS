import MdalsTestPanel from '../components/mdals/MdalsTestPanel';
import { useAuth } from '../hooks/useAuth';

export default function DashboardPage() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-white">MSALS</h1>
          <span className="text-xs text-gray-400 hidden sm:inline">
            Music-Driven Adaptive Learning
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 hidden sm:inline">
            {user.email}
          </span>
          <button
            onClick={signOut}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
      <MdalsTestPanel userId={user.id} />
    </div>
  );
}
