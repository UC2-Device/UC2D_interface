import { useState } from "react";
import AuthService from "../Authentication_API/authenticationFunction";
import { QrReader } from "react-qr-reader"; // 👈 install via: npm install react-qr-reader

export default function Signup() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        phone: "",
        device_id: "",
        password: "",
    });

    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [scanning, setScanning] = useState(false);
    const [token, setToken] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSignup = async (e) => {
        try {
            e.preventDefault();
            const res = await AuthService.signup(form);
            setToken(res.token);
            setOtpSent(true);
        } catch (error) {
            alert(error);
        }
    };

    const handleVerify = async (e) => {
        try {
            e.preventDefault();
            await AuthService.verifySignup(otp, form, token);
            alert("Signup successful. Please login.");
            window.location.href = "/login";
        } catch (error) {
            alert(error);
        }
    };

    // ✅ When QR scanned successfully
    const handleScan = (data) => {
        if (data) {
            setForm({ ...form, device_id: data });
            setScanning(false);
        }
    };

    const handleError = (err) => {
        console.error("QR Scan Error:", err);
        setScanning(false);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {!otpSent ? (
                <form
                    onSubmit={handleSignup}
                    className="bg-white p-6 rounded-xl shadow-lg w-96"
                >
                    <h2 className="text-2xl font-bold mb-4">Signup</h2>

                    <input
                        name="username"
                        placeholder="Username"
                        className="w-full mb-3 p-2 border rounded"
                        value={form.username}
                        onChange={handleChange}
                    />
                    <input
                        name="email"
                        placeholder="Email"
                        className="w-full mb-3 p-2 border rounded"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <input
                        name="phone"
                        placeholder="Phone"
                        className="w-full mb-3 p-2 border rounded"
                        value={form.phone}
                        onChange={handleChange}
                    />
                    <div className="flex items-center gap-2 mb-3">
                        <input
                            name="device_id"
                            placeholder="Device ID"
                            className="w-full p-2 border rounded"
                            value={form.device_id}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={() => setScanning(true)}
                            className="px-3 py-2 bg-blue-600 text-white rounded"
                        >
                            Scan
                        </button>
                    </div>

                    {scanning && (
                        <div className="mb-3">
                            <QrReader
                                delay={300}
                                onError={handleError}
                                onScan={handleScan}
                                constraints={{ facingMode: "environment" }}   // 👈 required
                                style={{ width: "100%" }}
                            />
                            <button
                                type="button"
                                onClick={() => setScanning(false)}
                                className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    )}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full mb-3 p-2 border rounded"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                        Send OTP
                    </button>
                </form>
            ) : (
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
            )}
        </div>
    );
}
