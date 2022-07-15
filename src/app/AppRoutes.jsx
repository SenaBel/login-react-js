import React, {useState, useContext} from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

import Login from './containers/Login'
import Restrita from './containers/Restrita'
import RegistroUsuario from './containers/RegistroUsuario'

import {AuthProvider, AuthContext} from '../../src/contexts/auth'
import Header from './components/Header'


const AppRoutes = () => {
    const Private = ({children}) => {
        const {authenticated, loading} = useContext(AuthContext)
        if(loading){
            return <div className="loading"> Carregando...</div>
        }
        if(!authenticated){
            return <Navigate to="/login" />
        }
        return children
    }

    return (
       <Router>
           <AuthProvider>
           <Routes>
           <Route path="/login" element={<Login/>} />
           <Route path="/" element={ <Private> <Header/><Restrita/></Private>} />
           <Route path="/registro-user" element={<Private> <Header/> <RegistroUsuario/> </Private>} />
           </Routes>
           </AuthProvider>
       </Router>
    )
}

export default AppRoutes
