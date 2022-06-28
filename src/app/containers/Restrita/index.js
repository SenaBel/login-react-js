import React, { Component, useContext } from 'react'
import {AuthContext} from '../../../contexts/auth'

const Restrita = () => {
    const {logout} = useContext(AuthContext)
    
        return (
            <div>
                <h1>Entrou no sistema</h1>
                <button className="button button-success" onClick={logout}>Sair</button>
            </div>
        )
    
}

export default Restrita
