import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import Login from "../Pages/login";
import Signup from "../Pages/signup";
import VerifyEmail from "../Pages/verifyEmail";
import ForgotPassword from "../Pages/forgotPassword";
import Home from "../Pages/home";
import Dashboard from "../Pages/Dashboard";
import Buypack from "../Pages/Buypack.js";

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

      <Route path="/purchase/session" element={<PrivateRoute><Buypack paymentfor="sessionupgrade"/></PrivateRoute>} />
      <Route path="/purchase/prenium" element={<PrivateRoute><Buypack paymentfor="planupgrade"/></PrivateRoute>} />
      <Route path="/purchase/plan" element={<PrivateRoute><Buypack paymentfor="purchaseplan"/></PrivateRoute>} />
    </Routes>
  );
}
