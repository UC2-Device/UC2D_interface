import { useState } from "react";
import AuthService from "../Authentication_API/authenticationFunction";

// --- Self-contained SVG Icons for password visibility ---
const EyeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
);

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [token, setToken] = useState("");
    
    const [otpSent, setOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const res = await AuthService.forgotPassword(email);
            setToken(res.token);
            setOtpSent(true);
        } catch (err) {
            setError(err.message || "Failed to send OTP. Please check the email and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await AuthService.resetPassword(email, otp, newPassword, token);
            window.location.href = "/login?reset=success";
        } catch (err) {
            setError(err.message || "Failed to reset password. The OTP may be invalid or expired.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-xl">
                {!otpSent ? (
                    <>
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900">Forgot Your Password?</h1>
                            <p className="mt-2 text-gray-500">No worries! Enter your email and we'll send you a reset code.</p>
                        </div>

                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                                <p>{error}</p>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSendOtp}>
                            <div>
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                                <input id="email" type="email" autoComplete="email" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <button type="submit" disabled={isLoading} className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>
                                {isLoading ? "Sending..." : "Send Reset Code"}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900">Create a New Password</h1>
                            <p className="mt-2 text-gray-500">A reset code was sent to <span className="font-medium text-gray-800">{email}</span>. Please enter it below.</p>
                        </div>
                        
                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                                <p>{error}</p>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleReset}>
                            <div>
                                <label htmlFor="otp" className="text-sm font-medium text-gray-700">Reset Code (OTP)</label>
                                <input id="otp" type="text" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={otp} onChange={(e) => setOtp(e.target.value)} />
                            </div>
                            <div className="relative">
                                <label htmlFor="new-password"className="text-sm font-medium text-gray-700">New Password</label>
                                <div className="mt-1">
                                    <input id="new-password" type={showPassword ? "text" : "password"} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500" style={{ top: '1.75rem' }}>
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" disabled={isLoading} className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>
                                {isLoading ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    </>
                )}
                 <p className="text-center text-sm text-gray-500">
                    Remember your password?{' '}
                    <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    );
}