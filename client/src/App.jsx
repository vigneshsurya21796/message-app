import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  if (!authUser) return <Navigate to="/login" replace />;
  return children;
};

const PublicRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  if (authUser) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => { checkAuth(); }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#070b14]">
        <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0e1623",
            color: "#e2e8f0",
            border: "1px solid #1e2d40",
            borderRadius: "10px",
            fontSize: "14px",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}
