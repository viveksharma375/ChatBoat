import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoaderComponent from '../../Components/CommonComponents/LoaderComponent/LoaderComponent';
// import ResetPassword from '../../Pages/Otp/Otp';
const AuthLayout = lazy(() => import("../../Layouts/AuthLayout/AuthLayout"))
const Login = lazy(() => import("../../Pages/Login/Login"));
const Signup = lazy(() => import("../../Pages/Signup/Signup"));
const ForgetPassword = lazy(() => import("../../Pages/ForgetPassword/ForgetPassword"));
const Otp = lazy(() => import("../../Pages/Otp/Otp"));
const ResetPassword = lazy(() => import("../../Pages/ResetPassword/ResetPassword"));


const PublicRoutes = () => {
    return (
        <Suspense fallback={<LoaderComponent />}>
            <Routes>
                <Route path="/" element={<AuthLayout />}>
                    <Route index element={<Login />} />
                    <Route path='signup' element={<Signup />} />
                    <Route path='forgetPassword' element={<ForgetPassword />} />
                    <Route path='otp' element={<Otp />} />
                    <Route path='resetPassword' element={<ResetPassword />} />
                </Route>
            </Routes>
        </Suspense>
    )
}

export default PublicRoutes;