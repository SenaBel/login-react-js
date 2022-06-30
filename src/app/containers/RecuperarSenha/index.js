import React, { Component } from 'react'
import {Link} from "react-router-dom"

import Titulo from "../../components/Texto/Titulo";
import Input from "../../components/Inputs/Simples";
import Button from "../../components/Button/Simples";

export default class RecuperarSenha extends Component {
    state = {
        email: "",
        
    }
    onChangeInput = (field, ev) => this.setState({[field]: ev.target.value})
    render() {
        const {email} = this.state;
        return (
            <div className="RecuperarSenha flex flex-center">
                <div className="Card">
                    <div className="flex flex-center">
                        <Titulo type='h1' titulo="Recuperar Senha" />
                    </div>
                
                <br/>
                <div>
                    <p>
                        Para recuperar sua senha digite seu email abaixo.
                    </p>
                    <p>
                        Iremos enviar um link para seu email
                    </p>
                </div>
             
                <br/>
                <div>
                    <Input  
                        label="E-mail"
                        value={email}
                        onChange={(ev) => this.onChangeInput("email", ev)}
                        type="email"
                    />
                </div>
                <br/>
                <div className="flex flex-center">
                    <Button 
                        type="success"
                        rota="/resetar-senha/1"
                        label="Recuperar Senha"

                    />
                </div>
                </div>
            </div>
        )
    }
}
