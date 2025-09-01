import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import Login from "../Pages/login";
import Signup from "../Pages/signup";
import VerifyEmail from "../Pages/verifyEmail";
import ForgotPassword from "../Pages/forgotPassword";
import Home from "../Pages/home";
import Dashboard from "../Pages/Dashboard";

export default function FinalRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Private routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
