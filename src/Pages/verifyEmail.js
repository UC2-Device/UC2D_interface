import { useState } from "react";
import AuthService from "../Authentication_API/authenticationFunction.js";

export default function VerifyEmail({ userData }) {
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    await AuthService.verifySignup(otp, userData);
    alert("Email verified! You can now login.");
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleVerify}
        className="bg-white p-6 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Verify Email</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full mb-3 p-2 border rounded"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Verify
        </button>
      </form>
    </div>
  );
}
