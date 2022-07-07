import axios from 'axios'

export const api = axios.create({
  baseURL: (process.env.PUBLIC_URL) ? "http://54.162.62.77:3000" : "http://54.162.62.77:3000"
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
    // .then((response) => {
    //   console.log('Esse é o kara>>>>', response.data)
    // })
    //.catch(errorHandling)
    .catch((e) => {
      callback(errorHandling(e)) 
      console.log('Valor do Callback', callback(errorHandling(e)))
    } )
    // {
    //   const error = errorHandling(e)
    //   console.log('Não deu certo error ', error)
    //   callback(error)
    // })
}