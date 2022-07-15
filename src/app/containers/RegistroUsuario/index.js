import React, { Component, useContext } from 'react'
import './styles.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {AuthContext} from '../../../contexts/auth'


const schema = yup.object({
    nome: yup.string().required("Nome é um campo é obrigatório."),
    email: yup.string().required("Email é um campo é obrigatório."),
    password: yup.string().required("Senha é um campo é obrigatório.")
  }).required();
  

const RegistrarUsuario = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const {createUser } = useContext(AuthContext)
    
    const onSubmitForm = data =>{
        createUser(data)
        console.log('Valores', data)
    }
        return (
            <div className="Login flex flex-center">
            <form className="Card" onSubmit={handleSubmit(onSubmitForm)}>
              <div className="flex vertical flex-center">
              <h2>Criar Novo Usuário</h2>
              </div>

            <div className='field' >
				<label>Nome: 
					<input type="text" {...register("nome")} />
                    <p>{errors.nome?.message}</p>
                </label>
			</div>

            <div className='field' >
				<label>Email: 
					<input type="email" {...register("email")}/>
                    <p>{errors.email?.message}</p>
                </label>
			</div>

            <div className='field' >
				<label>Senha: 
					<input type="password" {...register("password")} />
                    <p>{errors.password?.message}</p>
                </label>
			</div>
              <button type='submit'>SALVAR</button>
            </form>
          </div>
        )
    
}

export default RegistrarUsuario