import axios from 'axios'
import { transformeDate } from '../actions/index';

export const api = axios.create({
  baseURL: (process.env.PUBLIC_URL) ? "https://api.abelsena.com.br" : "https://api.abelsena.com.br"
  //baseURL: (process.env.PUBLIC_URL) ? "http://localhost:3000" : "http://localhost:3000"
}) 
export const versao = "v1"

//ERROR HANDLING
const errorHandling = (error) => {
  if(!error.response || !error.response.data) {
      return{status: 500, message: "Ocorreu um erro no servidor. Tente novamente."}
  }
  if(error.response.data.status === 401) return {status: 401, message: "Você não tem autorização"}

  if(error.response.data.errors)return {status: 400, message: error.response.data.errors}
  // console.log("Error 500", error.response.data);
}

const errorHandRegister = (error) => {
  if(error.response.data.errors ) return {status: 422, message: "Já existe usuário com este email!"}
}

const successRegister = (suss) => {
  if(suss.status === 200) return {status: 200, message: "Usuário cadastrado com sucesso!"}
} 

export const createSession = async ({email, password}, callback) => {
    return api.post(`/${versao}/api/usuarios/login`, {email, password})

    .catch((e) => {
      callback(errorHandling(e)) 
      console.log('Valor do Callback', callback(errorHandling(e)))
    } )

}

export const createUserSession = async ({nome, email, password, loja}, callback) => {
  return api.post(`/${versao}/api/usuarios/registrar`, {nome, email, password, loja})
  .then(suss => {
    callback(successRegister(suss))
    console.log('Valor do Sucesso', callback(successRegister(suss)))
 })
  .catch((e) => {
    // e.message = 'Usuario Ja existe'
     console.log("asdfasd", e)
    callback(errorHandRegister(e))  
    console.log('Valor do Callback hoje', errorHandRegister(e))
  } )

}
export const getClientes = (atual , limit, loja = '62d990fa26419b4a5b7a4281') => {
  //atual = 0, limit = 20, loja = "62d990fa26419b4a5b7a4281"
  const token = localStorage.getItem('token')
  return  api.get(`/${versao}/api/clientes?offset=${atual}&limit=${limit}&loja=${loja}`,
    { headers: {'Authorization': `Login ${token}`} })
    //.then(res => console.log("Lista Clientes", res))

    // .catch((e) => {
    //   callback(errorHandling(e)) 
    //   console.log('Valor do Callback', callback(errorHandling(e)))
    // } )
  }

export const getClientesPesquisa = (termo, atual, limit, loja = '62d990fa26419b4a5b7a4281') => {
  const token = localStorage.getItem('token')
  return api.get(`/${versao}/api/clientes/search/${termo}?offset=${atual}&limit=${limit}&loja=${loja}`,
  { headers: {'Authorization': `Login ${token}`} })
  //.then(res => console.log("Lista Clientes", res))
}

export const getCliente = (id, loja = '62d990fa26419b4a5b7a4281') => {
  const token = localStorage.getItem('token')
  return api.get(`/${versao}/api/clientes/admin/${id}?loja=${loja}`,
  { headers: {'Authorization': `Login ${token}`} })
}

export const updateCliente = (cliente, id, loja, cb) => {
  const token = localStorage.getItem('token')
  return api.put(`/${versao}/api/clientes/admin/${id}?loja=${loja}`,
  { headers: {'Authorization': `Login ${token}`} },
  {
    nome: cliente.nome,
    cpf: cliente.CPF,
    email: cliente.email,
    telefones: [cliente.telefone],
    endereco: {
        local: cliente.endereco,
        numero: cliente.numero,
        bairro: cliente.bairro,
        cidade: cliente.cidade,
        estado: cliente.estado,
        CEP: cliente.cep
        },
  dataDeNascimento: transformeDate(cliente.dataDeNascimento, "/", "YYYY-MM-DD")
}
  )
}

export const removerCliente = (id, loja, cb) => {
  const token = localStorage.getItem('token')
  return api.delete(`/${versao}/api/clientes/admin/${id}?loja=${loja}`,
  { headers: {'Authorization': `Login ${token}`} },
 
  )
}