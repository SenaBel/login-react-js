import React, {createContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {api, createSession, createUserSession, getClientes, getCliente} from '../app/services/api'

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

    const createUser = async(nome, email, password) => {
        const response = await createUserSession(nome, email, password)
      if(response){
          console.log('Resposta servidor register', response)
          //alert('Sucesso')
      }
    }

    // const detalhesDoCliente = async(id) => {
    //     const response = await getCliente(id)
    //   console.log('Resposta Detalhes Hoje quinta', response) 
    // }
  

    // const listClient = async (
    //     // atual = 0, limit = 20, loja = "62d990fa26419b4a5b7a4281"
    // ) => {
    //     await getClientes()
       
    // }

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
        value={{authenticated: !!user, user, loading, login, logout, createUser, getClientes }}
        >
            {children}
        </AuthContext.Provider>
    )   
}