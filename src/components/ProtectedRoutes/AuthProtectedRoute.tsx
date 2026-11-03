import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { TokenContext } from '../Contexts/Token Context/token.context';


function AuthProtectedRoute({children}:{children:React.ReactNode}) {
    const{token}= useContext(TokenContext)
    return token ? <Navigate to="/main/feed" replace/> : <>{children}</>
}

export default AuthProtectedRoute
