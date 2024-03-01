import { Suspense, lazy } from "react";
import { Route , Routes } from "react-router-dom";
import LoaderComponent from "../../Components/CommonComponents/LoaderComponent/LoaderComponent";
const MainLayout = lazy(()=>import("../../Layouts/MainLayout/MainLayout"))
// const ChatBox = lazy (()=> import ("../../Pages/ChatComponents/ChatBox/ChatBox"))

export const PrivateRoutes = () => {
  return (
    <>
    <Suspense fallback ={<LoaderComponent/>}>
        <Routes>
            <Route path="/auth" element={<MainLayout/>}>
                 {/* <Route path="/auth/dashboard" element ={<ChatBox/>}/> */}
            </Route>
        </Routes>
    </Suspense>
    </>
  )
}
