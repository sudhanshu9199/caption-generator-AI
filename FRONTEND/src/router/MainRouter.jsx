import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
const Dashboard = lazy(() => import("../Pages/Dashboard/Dashboard"));
const Login = lazy(() => import("../Pages/Login/Login"));
const Register = lazy(() => import("../Pages/Register/Register"));
const Profile = lazy(() => import("../Pages/Profile/Profile"));

const MainRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </Suspense>
  );
};

export default MainRouter;
