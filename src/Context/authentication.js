import { createContext, useEffect, useState } from "react";


export const authContext = createContext();


export function AuthProvider({ children }) {

    const [token, setToken] = useState(null);

    useEffect(function () {
        if (localStorage.getItem('tkn') !== null) {
            setToken(localStorage.getItem('tkn'))
        }
        console.log("testing form Auth context");
    }, [])

    return <authContext.Provider value={{ token, setToken }}>

        {children}

    </authContext.Provider>








}