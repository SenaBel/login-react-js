import React, { useEffect, useState} from 'react';
import moment from "moment";
import { getCliente} from '../../services/api'
import {useParams} from 'react-router-dom'

import Titulo from '../../components/Texto/Titulo';
import ButtonSimples from '../../components/Button/Simples';
import { TextoDados } from '../../components/Texto/Dados';
import InputValor from '../../components/Inputs/InputValor';


// import Voltar from '../../components/Links/Voltar';
// import AlertGeral from '../../components/Alert/Geral'

//const {detalhesDoCliente} = useContext(AuthContext)
// useEffect(() => {
//   console.log('adsf',detalhesDoCliente)
 
// },[])

  
const DetalhesCliente = () => {
    const [dados, setDados] = useState([])
    const {id} = useParams()
  
    console.log('Esse valor do Cliende pelo id:', dados)
    const cliente = {
      nome: dados.nome ? dados.nome : "" ,
      CPF:  dados.cpf ? dados.cpf : "",
      telefone: dados ? dados.telefones : "",
      dataDeNascimento: dados ? moment(dados.dataDeNascimento).format("DD/MM/YYYY") : "",
      email: dados && dados.usuario ? dados.usuario.email : "",

      endereco: "Rua teste, 125",
      bairro: "Bairro Teste",
      cidade: 'São Paulo',
      estado: 'SP',
      CEP: '14525-195',

    }
    //console.log('valores do cliente state', cliente)
useEffect(() => {
  (async () => {
      const resList = await getCliente(id)
      //console.log('Value of Client List- Detalhes Pedido', resList.data)
      setDados(resList.data.cliente )

  })()
},[])


const handleSubmit = (fild, value) => {
  setDados({[fild]: value})
}

  const renderCabecalho = () => {
    return (
       
      <div className="flex">
        <div className="flex-1 flex">
         <h3>{ cliente.nome}</h3>
          {/* <Titulo tipo="h7" titulo={nome} /> */}
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
              name="nome"
              noStyle
              erro=''
              handleSubmit={(valor) => handleSubmit("nome", valor)}
              value={cliente.nome}
            />
          }
        />
        <TextoDados
          chave="CPF"
          valor={
            <InputValor
              name="cpf"
              noStyle
              erro=''
              handleSubmit={(valor) => handleSubmit("CPF", valor)}
              value={cliente.CPF}
            />
          }
        />
        <TextoDados
          chave="Telefone"
          valor={
            <InputValor
              name="telefone"
              noStyle
              erro=''
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
              erro=''
              handleSubmit={(valor) => handleSubmit("email", valor)}
              value={cliente.email}
            />
          }
        />
        <TextoDados
          chave="Data de Nascimento"
          valor={
            <InputValor
              name="datadenascimento"
              noStyle
              erro=''
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
    );
 // }
}

export default DetalhesCliente;

