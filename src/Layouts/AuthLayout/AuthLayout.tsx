import { Outlet } from "react-router-dom"
 const AuthLayout = () => {
  return (
    <div className="auth_layout">
      <Outlet/>
    </div>
  )
}
export default AuthLayout;

