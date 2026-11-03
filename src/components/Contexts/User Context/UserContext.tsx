
import { createContext, useContext, useEffect, useState, type Dispatch } from 'react';
import type { userProfileType } from '../../../types/user.type';
import { getMyProfile } from '../../../services/profile.service';
import { useAuth } from '../Token Context/token.context';
export type UserContextType ={
    userDetails: userProfileType | null
    setUserDetails:Dispatch<React.SetStateAction<userProfileType | null>>
}
// export const  UserContext = createContext({})
export const  UserContext = createContext<UserContextType | null>(null)
export default function UserContextProvider({children}:{children:React.ReactNode}) {
    const {token} = useAuth()
    const [userDetails, setUserDetails] = useState<userProfileType | null>(null)
    async function getUserProfile(){
    try {
        const {data} = await getMyProfile();
        console.log(data)
        setUserDetails(data.data.user)
    } catch (error) {
        console.log(error)
    }
}
useEffect(()=>{if(token){
    getUserProfile()
}},[token])
    return (
        <>
        <UserContext.Provider value={{userDetails,setUserDetails}}>
            {children}
        </UserContext.Provider>
        </>
    )
}
