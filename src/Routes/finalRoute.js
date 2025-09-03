import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoute";

// Lazy load all the page components
const Login = lazy(() => import("../Pages/login.js"));
const Signup = lazy(() => import("../Pages/signup"));
const VerifyEmail = lazy(() => import("../Pages/verifyEmail"));
const ForgotPassword = lazy(() => import("../Pages/forgotPassword"));
const Home = lazy(() => import("../Pages/home"));
const Dashboard = lazy(() => import("../Pages/Dashboard"));
const Buypack = lazy(() => import("../Pages/Buypack.js"));

// A simple fallback component to show while pages are loading
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <p className="text-xl font-semibold text-gray-600">Loading...</p>
  </div>
);

export default function FinalRoutes() {
  return (
    // Wrap the entire Routes component in Suspense
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify/email" element={<VerifyEmail />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />

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
        <Route
          path="/purchase/session"
          element={
            <PrivateRoute>
              <Buypack paymentfor="sessionupgrade" />
            </PrivateRoute>
          }
        />
        <Route
          path="/purchase/prenium"
          element={
            <PrivateRoute>
              <Buypack paymentfor="planupgrade" />
            </PrivateRoute>
          }
        />
        <Route
          path="/purchase/plan"
          element={
            <PrivateRoute>
              <Buypack paymentfor="purchaseplan" />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}