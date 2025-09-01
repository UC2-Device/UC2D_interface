import { useState } from "react";
import AuthService from "../Authentication_API/authenticationFunction";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [token, setToken] = useState("");

    const handleSendOtp = async (e) => {
        try {
            e.preventDefault();
            const res = await AuthService.forgotPassword(email);
            setOtpSent(true);
            setToken(res.token);
        } catch (error) {
            alert(error);
        }
    };

    const handleReset = async (e) => {
      try {
          e.preventDefault();
        await AuthService.resetPassword(email, otp, newPassword , token);
        alert("Password reset successful. Please login.");
        window.location.href = "/login";
      } catch (error) {
        alert(error);
      }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {!otpSent ? (
                <form
                    onSubmit={handleSendOtp}
                    className="bg-white p-6 rounded-xl shadow-lg w-96"
                >
                    <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full mb-3 p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Send OTP
                    </button>
                </form>
            ) : (
                <form
                    onSubmit={handleReset}
                    className="bg-white p-6 rounded-xl shadow-lg w-96"
                >
                    <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        className="w-full mb-3 p-2 border rounded"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full mb-3 p-2 border rounded"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                        Reset Password
                    </button>
                </form>
            )}
        </div>
    );
}
