import { URL } from "../Constants/API_URL";
const API_URL = URL;

const AuthService = {
  async login(username, password) {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",   // 👈 Tell server we are sending JSON
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async signup(userData) {
    // signup step: just sends OTP
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json(); // parse response body

      if (!res.ok) {
        throw new Error(data.error);
      }

      console.log(data);
      return data; // success
    } catch (error) {
      throw new Error(error);
    }

  },

  async verifySignup(otp, userData, token) {
    try {
      const res = await fetch(`${API_URL}/verify_otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, userData, token }),
      });
      const data = await res.json(); // parse response body

      if (!res.ok) {
        throw new Error(data.error);
      }

      console.log(data);
      return data; // success
    } catch (error) {
      throw new Error(error);
    }
  },

  async forgotPassword(email) {
    try {
      const res = await fetch(`${API_URL}/forgot_password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json(); // parse response body

      if (!res.ok) {
        throw new Error(data.error);
      }

      console.log(data);
      return data; // success
    } catch (error) {
      throw new Error(error);
    }
  },

  async resetPassword(email, otp, newPassword, token) {
    try {
      const res = await fetch(`${API_URL}/reset_password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword, token }),
      });
      const data = await res.json(); // parse response body

      if (!res.ok) {
        throw new Error(data.error);
      }

      console.log(data);
      return data; // success
    } catch (error) {
      throw new Error(error);
    }
  },

  async checkAuth() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const res = await fetch(`${API_URL}/authenticate_user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json(); // parse response body

      if (!res.ok) {
        throw new Error(data.error);
      }

      console.log(data);
      return data; // success
    } catch (error) {
      throw new Error(error);
    }
  },

  logout() {
    localStorage.removeItem("token");
  },
};

export default AuthService;
