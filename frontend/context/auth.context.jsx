import { createContext, useState } from 'react'

export const authCtx = createContext()

function AuthContext(props) {
    const [token,setToken] = useState()
    const [login,setLogin] = useState()
    return <authCtx.Provider value={{token,setToken,login,setLogin}}>
        {props.children}
    </authCtx.Provider>
}

export default AuthContext