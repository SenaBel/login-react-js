import React, { useEffect, useState, useCallback} from 'react';
import moment from "moment";
import { getCliente} from '../../services/api'
import {useParams} from 'react-router-dom'

import ButtonSimples from '../../components/Button/Simples';
import { TextoDados } from '../../components/Texto/Dados';
import InputValor from '../../components/Inputs/InputValor';

import ClockLoader from "react-spinners/ClockLoader"

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
    
const handleSubmit = (name, value) => {
  let obj = {[name] : value}
  setDataCliente((prev) => ({...prev, ...obj}))
}

const handleSubmitEndereco = (name, value) => {
  let obj = {[name] : value}
  setDataEndereco((prev) => ({...prev, ...obj}))
}
    

  const renderCabecalho = () => {
 
    return (
     
      <div className="flex">
        <div className="flex-1 flex">
         <h3>{dataCliente.nome}</h3>
        </div>
       
          <div className="flex-1 flex flex-end">
            <ButtonSimples
              rota='/detalhe-cliente'
              onClick={() => alert('salvo"')}
              label="Salvar"
              type="success"
            />

            <ButtonSimples
              rota='/detalhe-cliente'
              onClick={() => alert('removido')}
              label="Remover"
              type="danger"
            />
          </div>
        
      </div>
    );
  }

  const renderDetalhesCadastro = () => {
  
    return (
      <div className="Detalhes-do-Cadastro">
        <TextoDados
          chave="Nome"
          valor={(
            <InputValor
              name="nome"
              noStyle
              //erro='asdf'
              handleSubmit={(valor) => handleSubmit("nome", valor)}
              value= {cliente.nome}
            />
          )}
        />
        <TextoDados
          chave="CPF"
          valor={(
            <InputValor
              name="cpf"
              noStyle
              //erro='asdf'
              handleSubmit={(valor) => handleSubmit("cpf", valor)}
              value={ cliente.CPF}
            />
          )}
        />
        <TextoDados
          chave="Telefone"
          valor={(
            <InputValor
              name="telefones"
              noStyle
              //erro='asdf'
              handleSubmit={(valor) => handleSubmit("telefones", valor)}
              value={ cliente.telefone}//cliente?.telefone?.length > 0 ? cliente.telefone[0] : ""}
            />
          )}
        />
        <TextoDados
          chave="E-mail"
          valor={(
            <InputValor
              name="email"
              noStyle
              //erro='asdf'
              handleSubmit={(valor) => handleSubmit("email", valor)}
              value={cliente.email}
            />
          )}
        />
        <TextoDados
          chave="Data de Nascimento"
          valor={(
            <InputValor
              name="dataDeNascimento"
              noStyle
              //erro='asdf'
              handleSubmit={(valor) =>  handleSubmit("dataDeNascimento", valor)}
              value={cliente.dataDeNascimento}
            />
          )}
        />
      </div>
    );
  }

  const renderDetalhesEntrega = () => {
   
    return (
      <div className="Detalhes-da-Entrega">
        <TextoDados
          chave="Endereço"
          valor={(
            <InputValor
              name="local"
              noStyle
              //erro='asdf'
              handleSubmit={(valor) => handleSubmitEndereco("local", valor)}
              value={enderecoCliente.local}
            />
          )}
        />
        {/* <TextoDados
          chave="Numero"
          valor={
            <InputValor
              name="numero"
              noStyle
         
              handleSubmit={(valor) => this.handleSubmit("numero", valor)}
              value={numero}
            />
          }
        /> */}
        <TextoDados
          chave="Bairro"
          valor={(
            <InputValor
              name="bairro"
              noStyle
              //erro='asdf'
              handleSubmit={(valor) => handleSubmitEndereco("bairro", valor)}
              value={enderecoCliente.bairro}
            />
          )}
        />
        <TextoDados
          chave="Cidade"
          valor={(
            <InputValor
              name="cidade"
              noStyle
              //erro='asdf'
              handleSubmit={(valor) => handleSubmitEndereco("cidade", valor)}
              value={enderecoCliente.cidade}
            />
          )}
        />
        <TextoDados
          chave="Estado"
          valor={(
            <InputValor
              name="estado"
              noStyle
              //erro='asdf'
              handleSubmit={(valor) => handleSubmitEndereco("estado", valor)}
              value={enderecoCliente.estado}
            />
          )}
        />
        <TextoDados
          chave="CEP"
          valor={(
            <InputValor
              name="CEP"
              noStyle
              //erro='df'
              handleSubmit={(valor) => handleSubmitEndereco("CEP", valor)}
              value={enderecoCliente.CEP}
            />
          )}
        />
      </div>
    );
  }


  //const render() {
    
    return (
      
       
      <div className="DetalhescarDoCliente">
         {
          loading ? 
          <ClockLoader color={"#36D7B7"} loading={loading}  size={150} />
          :
        
        <div className="DetalhescarDoCliente">
        {renderCabecalho()}
      
        <div className="flex horizontal">
          <div className="flex-1 flex vertical">
            {renderDetalhesCadastro()}
          </div>
          <div className="flex-1 flex vertical">
            {renderDetalhesEntrega()}
          </div>
        </div>

      </div>
}
      </div>
        
    )
  
}

export default DetalhesCliente;

