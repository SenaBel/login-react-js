import React, { useEffect, useState, useCallback} from 'react';
import moment from "moment";
import { getCliente} from '../../services/api'
import {useParams} from 'react-router-dom'

import ClockLoader from "react-spinners/ClockLoader"
import HeaderDetalhesCliente from '../../components/Header/DetalhesCliente/HeaderDetalhesCliente';
import DadosPessoaisCliente from '../../components/Header/DetalhesCliente/DadosPessoaisCliente';
import DadosEntregaCliente from '../../components/Header/DetalhesCliente/DadosEntregaCliente';

const initialCliente = [{
  nome:  "",
  CPF:   "",
  telefone:  [],
  dataDeNascimento: "",
  email: ""
}]

const initialEndereco = {
  local: "",
  bairro: "",
  cidade: "",
  estado: "",
  CEP:  "",
}


const DetalhesCliente = () => {

  const {id} = useParams()
  const [dataCliente, setDataCliente] = useState(initialCliente)
  const [dataEndereco, setDataEndereco] = useState(initialEndereco)
  const [loading, setLoading] = useState(false);

  console.log('DADOS DO CLIENTE', dataCliente)
  console.log('DADOS DO ENDEREÇO', dataEndereco)

  const cliente = {
      nome: dataCliente ? dataCliente.nome : "",
      CPF:  dataCliente ? dataCliente.cpf : "",
      telefone: dataCliente ? dataCliente.telefones : "",
      dataDeNascimento: dataCliente ? moment(dataCliente.dataDeNascimento).format("DD/MM/YYYY") : "",
      email: dataCliente && dataCliente.usuario ? dataCliente.usuario.email : "",
    }
  const enderecoCliente= {
      local: dataEndereco && dataEndereco ? dataEndereco.local : "",
      bairro: dataEndereco && dataEndereco ? dataEndereco.bairro :  "",
      cidade: dataEndereco && dataEndereco ? dataEndereco.cidade : "",
      estado: dataEndereco && dataEndereco ? dataEndereco.estado : "",
      CEP: dataEndereco && dataEndereco? dataEndereco.CEP : "",
    }

    const fetchData = useCallback(async () => {
      const resList = await getCliente(id)
      const dadosCliente = resList.data
      const dadosEntrega = resList.data.cliente.endereco
      if(dadosCliente){
        setDataCliente((prev) => ({...prev, ...dadosCliente.cliente}))
      }
      if(dadosEntrega){
        setDataEndereco((prev) => ({...prev, ...dadosEntrega}))
      }
     
    }, [])
 
    useEffect(() => {
      fetchData()
    },[fetchData])
   

   useEffect(() => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
   }, [])
    
const handleSubmitCliente = (name, value) => {
  let obj = {[name] : value}
  setDataCliente((prev) => ({...prev, ...obj}))
}

const handleSubmitEndereco = (name, value) => {
  let obj = {[name] : value}
  setDataEndereco((prev) => ({...prev, ...obj}))
}


const onSave = () => {
  console.log('salvo')
}

const onRemove = () => {
    console.log('removido')
}

const onUpdate = () => {
  console.log('atualizado')
}

 
    
    return (
       
      <div className="DetalhescarDoCliente">
         {
          loading ? 
          <ClockLoader color={"#36D7B7"} loading={loading}  size={150} />
          :
        
        <div className="DetalhescarDoCliente">
        <HeaderDetalhesCliente onRemove={()=> {}} onSave={() => {}} dataCliente={cliente}/>
      
        <div className="flex horizontal">
          <div className="flex-1 flex vertical">
            <DadosPessoaisCliente handleSubmit={handleSubmitCliente} dataCliente={cliente}/>
       
          </div>
          <div className="flex-1 flex vertical">
            <DadosEntregaCliente handleSubmit={handleSubmitEndereco} dataEndereco={enderecoCliente}/>
        
          </div>
        </div>

      </div>
}
      </div>
        
    )
  
}

export default DetalhesCliente;

