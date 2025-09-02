import { useState } from "react";
import AuthService from "../Authentication_API/authenticationFunction.js";

export default function VerifyEmail({ userData }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError(null); // Reset error on new submission
    setIsLoading(true);

    try {
      await AuthService.verifySignup(otp, userData);
      // On success, redirect to login with a success indicator
      window.location.href = "/login?verified=true";
    } catch (err) {
      // Set a user-friendly error message
      setError("Invalid or expired OTP. Please check the code and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-xl">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Check Your Email</h1>
          <p className="mt-2 text-gray-500">
            We've sent a 6-digit verification code to <br />
            <span className="font-medium text-gray-800">{userData?.email || 'your email address'}</span>.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
            <p>{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleVerify}>
          <div>
            <label htmlFor="otp" className="text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <div className="mt-1">
              <input
                id="otp"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}