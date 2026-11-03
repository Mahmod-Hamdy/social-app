import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import MainLayout from './layouts/MainLayout'
import Newsfeed from './pages/Newsfeed/Newsfeed'
import Profile from './pages/Profile/Profile'
import Notification from './pages/Notification/Notification'
import NotFound from './pages/NotFound/NotFound'
import { Toaster } from 'react-hot-toast'
import AppProtectedRoute from './components/ProtectedRoutes/AppProtectedRoute'
import AuthProtectedRoute from './components/ProtectedRoutes/AuthProtectedRoute'
import PostDetails from './pages/PostDetails/PostDetails'
const router = createBrowserRouter([
    {path:"/",element:<Navigate to="/auth/login" replace/>},
    {path:"/auth",element:<AuthProtectedRoute><AuthLayout/></AuthProtectedRoute>,children:[
      {index:true ,element:<Navigate to="login" replace/>},
      {path:"login" ,element:<Login/>},
      {path:"register",element:<Register/>}
    ]},
    {path:"/main", element:<AppProtectedRoute><MainLayout/></AppProtectedRoute>,children:[
      {index:true,element:<Navigate to="feed" replace/>},
      {path:"feed",element:<Newsfeed/>},
      {path:"profile",element:<Profile/>},
      {path:"notification",element:<Notification/>},
      {path:"postDetails/:id",element:<PostDetails/>},
    ]},
    {path:"*",element:<NotFound/>},
  ])

export default function App() {
  return (
    <>
      <RouterProvider router={router}/>
      <Toaster />
    </>
  )
}
