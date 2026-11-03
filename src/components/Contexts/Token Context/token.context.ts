import { createContext, useContext, type Dispatch } from "react"

export type tokenContextType={
    token:string | null,
    setToken:Dispatch<React.SetStateAction<string | null>>
}
export const TokenContext=createContext<tokenContextType|null>(null)

export function useAuth(){
    const context =useContext(TokenContext);
    if(!context){
        throw new Error ("useAuth must be used inside AuthContextProvider")
    }
    return context;
}