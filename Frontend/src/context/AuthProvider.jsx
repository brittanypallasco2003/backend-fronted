import axios from "axios"
import { createContext, useEffect, useState } from "react"
//CREACIÓN DEL GRUPO DE WHATSAPP (AUTHCONTEXT)
const AuthContext = createContext()
//CONTENIDO DLE MENSAJE A SER ENVIADO
                        //componentes - estudiantes
const AuthProvider = ({ children }) => {
    //creación del usestate para el perfil del usuario que va a iniciar sesión
    const [auth, setAuth] = useState({})
//CREAR LA FUNCIÓN OBTENER EL USUARIO DEL ENDPOINT PARA EL PERFIL DEL USUARIO
    const perfil = async(token) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/perfil`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta= await axios.get(url,options)
            setAuth(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    }
    //CREACIÓN DEL useffect para uq se ejecute la función perfil
    //cuando el componente se cargue
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token)
        {
            perfil(token)
        }
    }, [])
    //RETORNA EN EL CONTENIDO DEL MENSAJE
    return (
        <AuthContext.Provider value={
            //el mensaje a ser enviado
            {
                auth,
                setAuth              
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}
export default AuthContext