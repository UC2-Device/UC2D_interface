import { URL } from "../Constants/API_URL";
const API_URL = URL;

const AuthService = {
  async login(username, password) {
    console.log("api");
    
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
       headers: {
      "Content-Type": "application/json",   // 👈 Tell server we are sending JSON
    },
    body: JSON.stringify({ username, password }),
    });
    
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();

    console.log(data);
    localStorage.setItem("token", data.token);
    return data;
  },

  async signup(userData) {
    // signup step: just sends OTP
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error("Signup failed");
    return res.json();
  },

  async verifySignup(otp, userData , token) {
    const res = await fetch(`${API_URL}/verify_otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp, userData , token}),
    });
    if (!res.ok) throw new Error("Verification failed");
    return res.json();
  },

  async forgotPassword(email) {
    const res = await fetch(`${API_URL}/forgot_password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error("Failed to send reset OTP");
    return res.json();
  },

  async resetPassword(email, otp, newPassword , token) {
    const res = await fetch(`${API_URL}/reset_password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword , token}),
    });
    if (!res.ok) throw new Error("Failed to reset password");
    return res.json();
  },

  async checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");

    const res = await fetch(`${API_URL}/authenticate_user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!res.ok) throw new Error("Not authenticated");
    return res.json();
  },

  logout() {
    localStorage.removeItem("token");
  },
};

export default AuthService;
