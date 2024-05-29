import React, { createContext, useEffect, useState } from "react";
import api from '../config/configApi.js'
import { useNavigate } from "react-router-dom";
const Context = createContext()

function AuthProvider({ children }) {

    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getLogin = async () => {
            const token = localStorage.getItem('token')

            if (token && valUser()) {
                api.defaults.headers.Authorization = `Bearer ${(token)}`;
                setAuthenticated(true)
            }
            setLoading(false)
        }
        getLogin()
    }, [])

    const valUser = async () => {

        const valueToken = localStorage.getItem('token');
        const headers = {

            'headers': {

                'Authorization': 'Bearer ' + valueToken

            }

        }

        await api.get("/val-token", headers)

            .then(() => {

                return true;

            }).catch(() => {

                setAuthenticated(false);

                localStorage.removeItem('token');

                api.defaults.headers.Authorization = undefined;

                return false;

            })

    }

    async function singIn(situacao) {
        setAuthenticated(true)
    }

    function handleLogout() {
        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined

    }
    if(loading){
        return <h1>carregando</h1>
    }

    return (
        <Context.Provider value={{ authenticated, singIn, handleLogout }}>
            {children}
        </Context.Provider>
    )
}

export { AuthProvider, Context }