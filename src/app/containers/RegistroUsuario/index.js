import React, { useContext, useState} from 'react'
import './styles.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {AuthContext} from '../../../contexts/auth'
import Alert from 'react-bootstrap/Alert';


const schema = yup.object({
    nome: yup.string().required("Nome é um campo é obrigatório."),
    email: yup.string().required("Email é um campo é obrigatório."),
    password: yup.string().required("Senha é um campo é obrigatório.")
  }).required();
  

const RegistrarUsuario = () => {
    const {createUser } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [errorForm, setErrorForm] = useState("");
    const [sussForm, setSussForm] = useState("");

    const onSubmitForm = data =>{
        createUser(data, resposta  => {
            if(resposta.status === 422){
                setErrorForm(resposta.message)
                setTimeout(() => {
                    setErrorForm("")
                },5000)
            }
            if(resposta.status === 200){
                setSussForm(resposta.message)
                reset()
                setTimeout(() => {
                    setSussForm("")
                },5000)
            }
            console.log('VALOR DO ERROR', resposta.message)
            console.log('Valores')
     
        })
        console.log('Valores', data)
    }
        return (
            <>
            
            <div className="Login flex flex-center">
            <form className="Card" onSubmit={handleSubmit(onSubmitForm)}>
               
                {errorForm && (
                    <Alert variant="danger" > {errorForm} </Alert>
                  ) 
                }
                {sussForm && (
                     <Alert variant="success" > {sussForm} </Alert>
                )}
                
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
					<input type="email" {...register("email")} onClick={() => setErrorForm("") }/>
                    <p>{errors.email?.message}</p>
                </label>
			</div>

            <div className='field' >
				<label>Senha: 
					<input type="password" {...register("password")} />
                    <p>{errors.password?.message}</p>
                </label>
			</div>
              <button className="btt" type='submit'>SALVAR</button>
            </form>
          </div>
    </>
        )
}

export default RegistrarUsuario