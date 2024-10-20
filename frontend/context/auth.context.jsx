import { createContext, useState } from 'react'

export const authCtx = createContext()

function AuthContext(props) {
    const [token,setToken] = useState()
    const [login,setLogin] = useState()
    const [name,setName] = useState(null)
    const [id,setId] = useState(null)
    return <authCtx.Provider value={{token,setToken,login,setLogin,name,setName,id,setId}}>
        {props.children}
    </authCtx.Provider>
}

export default AuthContext