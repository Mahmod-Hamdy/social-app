import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { TokenContext } from '../Contexts/Token Context/token.context';



function AppProtectedRoute({children}:{children:React.ReactNode}) {
    const{token}= useContext(TokenContext)
    return token ? <>{children}</> : <Navigate to="/auth/login" replace/>
}

export default AppProtectedRoute
