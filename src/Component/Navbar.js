import { useAuth } from "../Authentication_API/Authentication.js";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center bg-green-700 text-white px-6 py-4 shadow-lg">
      <div className="font-bold text-lg">🌱 AgriSystem</div>

      {user && (
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="font-semibold">{user.username}</p>
            <p className="text-sm">{user.email}</p>
            <p className="text-xs">{user.phone}</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
