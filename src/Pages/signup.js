import { useState } from "react";
import AuthService from "../Authentication_API/authenticationFunction";
import QrScannerModal from "../Component/Qrcodescanner.js";

// --- Self-contained SVG Icons ---
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

const QrCodeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
    </svg>
);

export default function Signup() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        phone: "",
        device_id: "",
        password: "",
    });
    const [otp, setOtp] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const res = await AuthService.signup(form);
            setToken(res.token);
            setOtpSent(true);
        } catch (err) {
            setError(err.message || "An unexpected error occurred during signup.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await AuthService.verifySignup(otp, form, token);
            // On success, you might want to redirect with a success message
            window.location.href = "/login?signup=success";
        } catch (err) {
            setError(err.message || "Invalid OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleScan = (data) => {
        if (data) {
            setForm({ ...form, device_id: data });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-xl">
                {!otpSent ? (
                    <>
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
                            <p className="mt-2 text-gray-500">Get started with a free account.</p>
                        </div>

                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                                <p>{error}</p>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSignup}>
                            {/* Input Fields */}
                            <div>
                                <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
                                <input id="username" name="username" type="text" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={form.username} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                                <input id="email" name="email" type="email" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={form.email} onChange={handleChange} />
                            </div>
                             <div>
                                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
                                <input id="phone" name="phone" type="tel" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={form.phone} onChange={handleChange} />
                            </div>

                            <div>
                                <label htmlFor="device_id" className="text-sm font-medium text-gray-700">Device ID</label>
                                <div className="mt-1 flex items-center gap-2">
                                    <input id="device_id" name="device_id" type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={form.device_id} onChange={handleChange} />
                                    <button type="button" onClick={() => setIsScannerOpen(true)} className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                        <QrCodeIcon/>
                                    </button>
                                </div>
                            </div>

                            <div className="relative">
                                <label htmlFor="password"className="text-sm font-medium text-gray-700">Password</label>
                                <div className="mt-1">
                                    <input id="password" name="password" type={showPassword ? "text" : "password"} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={form.password} onChange={handleChange}/>
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500" style={{ top: '1.75rem' }}>
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" disabled={isLoading} className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>
                                {isLoading ? "Sending OTP..." : "Send OTP"}
                            </button>
                        </form>
                         <p className="text-center text-sm text-gray-500">
                           Already have an account?{' '}
                           <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                             Sign In
                           </a>
                         </p>
                    </>
                ) : (
                    <>
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900">Verify Your Email</h1>
                            <p className="mt-2 text-gray-500">An OTP has been sent to {form.email}.</p>
                        </div>
                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                                <p>{error}</p>
                            </div>
                        )}
                        <form className="space-y-6" onSubmit={handleVerify}>
                            <div>
                                <label htmlFor="otp" className="text-sm font-medium text-gray-700">One-Time Password (OTP)</label>
                                <input id="otp" type="text" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={otp} onChange={(e) => setOtp(e.target.value)}/>
                            </div>
                            <button type="submit" disabled={isLoading} className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>
                                {isLoading ? "Verifying..." : "Verify & Sign Up"}
                            </button>
                        </form>
                    </>
                )}
            </div>

            {isScannerOpen && (
                <QrScannerModal
                    onClose={() => setIsScannerOpen(false)}
                    onScan={handleScan}
                />
            )}
        </div>
    );
}