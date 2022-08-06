import React, { useContext, useEffect} from 'react'
//import {AuthContext} from '../../../contexts/auth'

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputMask from 'react-input-mask'



import './styles.css'
//import Alert from 'react-bootstrap/Alert';


const schema = yup.object({
    nome: yup.string().required("Nome é um campo é obrigatório."),
    password: yup.string().required("Senha é um campo é obrigatório."),
    email: yup.string().required("Email é um campo é obrigatório."),
    cpf: yup.string().required("Obrigatório"),
    dataDeNascimento: yup.string().required("Obrigatório"),
    
    //loja: yup.string()
  }).required();

const CadastrarClientes = () => {
    //const {listClient } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        //listClient()
    },[])

const onSubmitFormulario = data => {
       // console.log('List Cliente', listClient)
        console.log('client', data)
    }



    return(
        <div className="Login flex flex-center">
        <form className="Card" onSubmit={handleSubmit(onSubmitFormulario)}>
           
           
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
            <label>Senha: 
                <input type="password" {...register("password")} />
                <p>{errors.password?.message}</p>
            </label>
        </div>

        <div className='field' >
            <label>Email: 
                <input type="email" {...register("email")}/>
                <p>{errors.email?.message}</p>
            </label>
        </div>

        <div className='field' >
            <label>CPF: 
                <input type="cpf" {...register("cpf")} />
                <p>{errors.cpf?.message}</p>
            </label>
        </div>

        <div className='field' >
            <label>Data de Nascimento: 
                <input type="dataDeNascimento" {...register("dataDeNascimento")} />
                <p>{errors.dataDeNascimento?.message}</p>
            </label>
        </div>

          <button className="btt" type='submit'>SALVAR</button>
        </form>
      </div>
    )
}

export default CadastrarClientes