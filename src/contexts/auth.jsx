import React, {createContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {api, versao,createSession} from '../app/services/api'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user')
        if(recoveredUser){
            setUser(JSON.parse(recoveredUser))
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
      // essa é a função que vai receber os valores la do login
      const response = await createSession(email, password)

      if(response){

          console.log('Resposta Servidor: ', response.data);
          // api criar uma session
          
          const loggedUser =  response.data.usuario
          const token = response.data.usuario.token
    
          localStorage.setItem('user', JSON.stringify(loggedUser))
          localStorage.setItem('token', token)
    
          api.defaults.headers.Authorization = `Login ${token}`
    
            setUser(loggedUser)
            navigate('/')
      }
      
    }

    const logout = () => {
        console.log('logout');
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = null
        setUser(null)
        navigate('/login')
    }
    return(
        <AuthContext.Provider 
        value={{authenticated: !!user, user, loading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )   
}