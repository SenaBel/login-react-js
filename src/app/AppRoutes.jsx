import React, {useState, useContext} from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

import Login from './containers/Login'
import Restrita from './containers/Restrita'

import {AuthProvider, AuthContext} from '../../src/contexts/auth'


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
           <Route path="/" element={<Private> <Restrita/> </Private>} />
           </Routes>
           </AuthProvider>
       </Router>
    )
}

export default AppRoutes
