import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
const Dashboard = lazy(() => import("../Pages/Dashboard/Dashboard"));
const Login = lazy(() => import("../Pages/Login/Login"));
const Register = lazy(() => import("../Pages/Register/Register"));
const Profile = lazy(() => import("../Pages/Profile/Profile"));

const MainRouter = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </Suspense>
  );
};

export default MainRouter;
