import axios from 'axios'

export const api = axios.create({
  baseURL: (process.env.PUBLIC_URL) ? "https://api.abelsena.com.br" : "https://api.abelsena.com.br"
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

export const createSession = async ({email, password}, callback) => {
    return api.post(`/${versao}/api/usuarios/login`, {email, password})

    .catch((e) => {
      callback(errorHandling(e)) 
      console.log('Valor do Callback', callback(errorHandling(e)))
    } )

}

export const createUserSession = async ({nome, email, password}, callback) => {
  return api.post(`/${versao}/api/usuarios/registrar`, {nome, email, password})

  .catch((e) => {
    callback(errorHandling(e)) 
    console.log('Valor do Callback', callback(errorHandling(e)))
  } )

}