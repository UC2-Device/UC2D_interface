// src/pages/Home.jsx
import { useContext } from "react";
import { AuthContext } from "../Authentication_API/Authentication";

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user?.username || "User"} 🎉
      </h1>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
