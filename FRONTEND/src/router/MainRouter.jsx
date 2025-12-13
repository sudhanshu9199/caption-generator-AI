import { Routes, Route } from 'react-router';
import { lazy } from 'react';
const Dashboard = lazy(() => import('../Pages/Dashboard/Dashboard'))
const Login = lazy(() => import('../Pages/Login/Login'))
const Register = lazy(() => import('../Pages/Register/Register'))

const MainRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/register' element={<Register />} />
    </Routes>
  )
}

export default MainRouter