import { useAuth } from "../Authentication_API/Authentication.js";

export default function Home() {
  const { user } = useAuth();
    console.log(user)
  if (!user) return null;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device Info */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Device Info</h2>
          <p><strong>Device ID:</strong> {user.device_id}</p>
          <p><strong>Status:</strong> {user.status}</p>
          <p><strong>Last Used:</strong> {user.last_session_date}</p>
        </div>

        {/* Subscription Info */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Subscription</h2>
          <p><strong>Plan:</strong> {user.plan}</p>
          <p><strong>Ends On:</strong> {new Date(user.subscription_end).toLocaleDateString()}</p>
          <p><strong>Sessions Today:</strong> {user.used_sessions} / {user.total_sessions}</p>
        </div>
      </div>
    </div>
  );
}