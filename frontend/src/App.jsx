import { Navigate, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import InvestigatorDashboard from "./pages/InvestigatorDashboard";

import { useAuthStore } from "./store/useAuthStore";
import PageLoader from "./components/PageLoader";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <PageLoader />;
  }

  return (
    <>
      <Routes>

        {/* DEFAULT ROUTE */}
        <Route
          path="/"
          element={
            !authUser ? (
              <Navigate to="/login" replace />
            ) : authUser.role === "admin" ? (
              <Navigate to="/admin" replace />
            ) : authUser.role === "investigator" ? (
              <Navigate to="/investigator" replace />
            ) : (
              <Navigate to="/user" replace />
            )
          }
        />

        {/* USER DASHBOARD */}
        <Route
          path="/user"
          element={
            authUser?.role === "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            authUser?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* INVESTIGATOR DASHBOARD */}
        <Route
          path="/investigator"
          element={
            authUser?.role === "investigator" ? (
              <InvestigatorDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            !authUser ? (
              <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">

                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />

                <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />

                <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

                <LoginPage />
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* SIGN UP */}
        <Route
          path="/signup"
          element={
            !authUser ? (
              <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">

                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />

                <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />

                <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

                <SignUpPage />
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

      </Routes>

      <Toaster />
    </>
  );
}

export default App;