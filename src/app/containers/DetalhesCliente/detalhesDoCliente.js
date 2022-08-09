import React, { useEffect, useState} from 'react';
import moment from "moment";
import { getCliente} from '../../services/api'
import {useParams} from 'react-router-dom'

import ButtonSimples from '../../components/Button/Simples';
import { TextoDados } from '../../components/Texto/Dados';
import InputValor from '../../components/Inputs/InputValor';

import ClockLoader from "react-spinners/ClockLoader"

const DetalhesCliente = () => {
  const {id} = useParams()
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState([])

  const cliente = {
      nome: dados ? dados.nome : "",
      CPF:  dados ? dados.cpf : "",
      telefone: dados ? dados.telefones : "",
      dataDeNascimento: dados ? moment(dados.dataDeNascimento).format("DD/MM/YYYY") : "",
      email: dados && dados.usuario ? dados.usuario.email : "",

      endereco: dados.endereco ? `${dados.endereco.local}, ${dados.endereco.numero}` : "",
      bairro: dados.endereco ? dados.endereco.bairro :  "",
      cidade: dados.endereco ? dados.endereco.cidade : "",
      estado: dados.endereco ? dados.endereco.estado : "",
      CEP: dados.endereco ? dados.endereco.CEP : "",
    }

    useEffect(() => {
      (async () => {
        const resList = await getCliente(id)
        const data = resList.data.cliente
        setDados(data)
        console.log('Value of Client List- Detalhes Cliente', data)
        
      })()
    },[])

   useEffect(() => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
   }, [])
    


   

const handleSubmit = (fild, value) => {
  setDados({[fild]: value})
}



  const renderCabecalho = () => {
    return (
     
      <div className="flex">
        <div className="flex-1 flex">
         <h3>{ cliente.nome}</h3>
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
          valor={
            <InputValor
              name="Nome"
              noStyle
              erro='asdf'
              handleSubmit={(valor) => handleSubmit("Nome", valor)}
              value= {cliente.nome}
            />
          }
        />
        <TextoDados
          chave="CPF"
          valor={
            <InputValor
              name="cpf"
              noStyle
              erro='asdf'
              handleSubmit={(valor) => handleSubmit("cpf", valor)}
              value={cliente.CPF}
            />
          }
        />
        <TextoDados
          chave="Telefone"
          valor={
            <InputValor
              name="Telefone"
              noStyle
              erro='asdf'
              handleSubmit={(valor) => handleSubmit("telefone", valor)}
              value={cliente.telefone}
            />
          }
        />
        <TextoDados
          chave="E-mail"
          valor={
            <InputValor
              name="email"
              noStyle
              erro='asdf'
              handleSubmit={(valor) => handleSubmit("email", valor)}
              value={cliente.email}
            />
          }
        />
        <TextoDados
          chave="Data de Nascimento"
          valor={
            <InputValor
              name="dataDeNascimento"
              noStyle
              erro='asdf'
              handleSubmit={(valor) =>  handleSubmit("dataDeNascimento", valor)}
              value={cliente.dataDeNascimento}
            />
          }
        />
      </div>
    );
  }

  const renderDetalhesEntrega = () => {
    //const { endereco, bairro, cidade, estado, CEP} = this.state;
    return (
      <div className="Detalhes-da-Entrega">
        <TextoDados
          chave="Endereço"
          valor={
            <InputValor
              name="endereco"
              noStyle
              
              handleSubmit={(valor) => handleSubmit("endereco", valor)}
              value={cliente.endereco}
            />
          }
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
          valor={
            <InputValor
              name="bairro"
              noStyle
             
              handleSubmit={(valor) => handleSubmit("bairro", valor)}
              value={cliente.bairro}
            />
          }
        />
        <TextoDados
          chave="Cidade"
          valor={
            <InputValor
              name="cidade"
              noStyle
           
              handleSubmit={(valor) => handleSubmit("cidade", valor)}
              value={cliente.cidade}
            />
          }
        />
        <TextoDados
          chave="Estado"
          valor={
            <InputValor
              name="estado"
              noStyle
          
              handleSubmit={(valor) => handleSubmit("estado", valor)}
              value={cliente.estado}
            />
          }
        />
        <TextoDados
          chave="CEP"
          valor={
            <InputValor
              name="cep"
              noStyle
          
              handleSubmit={(valor) => handleSubmit("cep", valor)}
              value={cliente.CEP}
            />
          }
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

