import React, { Component } from 'react'

import Titulo from "../../components/Texto/Titulo";
import Input from "../../components/Inputs/Simples";
import Button from "../../components/Button/Simples";

export default class ResetarSenha extends Component {
    state = {
        senha: "",
        confirmarSenha: ""
    }
    onChangeInput = (field, ev) => this.setState({[field]: ev.target.value})

    render() {
        const {senha, confirmarSenha} = this.state;
        return (
            <div className="ResetarSenha flex flex-center">
                <div className="Card">
                    <div className="flex flex-center">
                        <Titulo type='h1' titulo="Resetar Senha" />
                    </div>
                
                <br/>
                <div>
                    <p>
                        Digite uma nova senha.
                    </p>
                </div>
                <div>
                    <Input  
                        label="Senha"
                        value={senha}
                        onChange={(ev) => this.onChangeInput("senha", ev)}
                        type="password"
                    />
                </div>
                    <br/>
                <div>
                    <Input  
                        label="Confirme a Senha"
                        value={confirmarSenha}
                        onChange={(ev) => this.onChangeInput("confirmarSenha", ev)}
                        type="password"
                    />
               </div>
               <br/>
               <div className="flex flex-center">
                    <Button 
                        type="success"
                        rota="/login"
                        label="Enviar Nova Senha"
                    />
                </div>
                </div>
            </div>
        )
    }
}
