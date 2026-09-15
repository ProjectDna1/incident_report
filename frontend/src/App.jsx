import { Navigate, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserDashboard from "./pages/UserDashboard";
import InvestigatorDashboard from "./pages/InvestigatorDashboard";

import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AssignmentHub from "./pages/admin/AssignmentHub";
import ProgressUpdates from "./pages/admin/ProgressUpdates";

import { useAuthStore } from "./store/useAuthStore";
import PageLoader from "./components/PageLoader";

function App() {
  const {
    checkAuth,
    isCheckingAuth,
    authUser,
  } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <PageLoader />;
  }

  return (
    <>
      <Routes>
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

        <Route
          path="/admin"
          element={
            authUser?.role === "admin" ? (
              <AdminLayout />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route index element={<AdminDashboard />} />

          <Route
            path="assignments"
            element={<AssignmentHub />}
          />

          <Route
            path="progress"
            element={<ProgressUpdates />}
          />
        </Route>

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

        <Route
          path="/login"
          element={
            !authUser ? (
              <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-900 p-4">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
                <div className="absolute -left-4 top-0 size-96 bg-pink-500 opacity-20 blur-[100px]" />
                <div className="absolute -right-4 bottom-0 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
                <LoginPage />
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/signup"
          element={
            !authUser ? (
              <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-900 p-4">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
                <div className="absolute -left-4 top-0 size-96 bg-pink-500 opacity-20 blur-[100px]" />
                <div className="absolute -right-4 bottom-0 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
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