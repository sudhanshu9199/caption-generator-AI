import { Routes, Route } from "react-router";
import { lazy } from "react";
import { ProtectedRoute, PublicRoute } from "../components/AuthWrapper";
const Dashboard = lazy(() => import("../Pages/Dashboard/Dashboard"));
const Login = lazy(() => import("../Pages/Login/Login"));
const Register = lazy(() => import("../Pages/Register/Register"));
const Profile = lazy(() => import("../Pages/Profile/Profile"));

const MainRouter = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;
