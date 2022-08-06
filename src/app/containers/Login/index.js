import React, {useState, useContext} from 'react'

import Titulo from "../../components/Texto/Titulo";
import Input from "../../components/Inputs/Simples";
import Alert from '../../components/Alert/Danger'

import {AuthContext} from '../../../contexts/auth'

//inicio
const Login = () => {
  const {login} = useContext(AuthContext)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorForm, setErrorForm] = useState("");

  const api =  (process.env.PUBLIC_URL) ? "https://api.abelsena.com.br" : "https://api.abelsena.com.br"
  //const api =  (process.env.PUBLIC_URL) ? "http://localhost:3000" : "http://localhost:3000"
  const versao = "v1"
  

  const onChangeEmail = (ev) => {
    setEmail(ev.target.value)
    setErrorEmail("")
    setErrorForm("")
  };
  
  const onChangePassword = (ev) => {
    setPassword(ev.target.value)
    setErrorPassword("")
    setErrorForm("")
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    // email: !email ? setErrorEmail("Digite seu email...") : !password

    if (!email | !password) {
      setErrorEmail("Preencha aqui com o seu e-mail");
      setErrorPassword("Preecha aqui com a sua senha");
      return;
    }
   
    console.log('Submite do form', {email, password})
 
    login({email, password}, (error) => {
      setErrorForm(error.message)
      //alert(error.message)
    })
  
    
  }
   
      return (
        <div className="Login flex flex-center">
          <form className="Card" onSubmit={handleSubmit}>
            <div className="flex vertical flex-center">
              <Titulo tipo="h1" titulo="Estudando Programação" />
              <p>Digite seu Login...</p>
              {/* <p>{String(authenticated)}</p> */}
            </div>
            <br />
            <br />

            <Alert error={errorForm}/>
  
            <Input
              label="E-mail"
              value={email}
              type="email"
              error={`${!email ? errorEmail : ""}`}
              onChange={(e) => onChangeEmail( e)}
            />
            <br />
  
            <Input
              label="Senha"
              value={password}
              type="password"
              error={`${!password ? errorPassword : ""}`}
              onChange={(e) => onChangePassword(e)}
              
            />
            {/* <small className="small-danger">{error}</small> */}
            <br />
            <br />
  
            <div className="flex">
            
              <div className="flex-1 flex flex-end">
                {/* <Link to="/recuperar-senha">
                  <small>Esqueci minha senha</small>
                </Link> */}
                <a href={`${api}/${versao}/api/usuarios/recuperar-senha`} rel="noreferrer" target="_blank">
                <small>Esqueci minha senha</small>
              </a>
              </div>
            </div>
            <br />
            <br />
            <div className="flex flex-center Button">
              <button className="btt"  rota="/restrita" label="Entrar">
                Entrar
              </button>
            </div>
          </form>
        </div>
      );
   
  }
//fim
  export default Login