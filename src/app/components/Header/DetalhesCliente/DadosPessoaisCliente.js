import React, { useState } from "react";
import InputValor from "../../../components/Inputs/InputValor";
import { TextoDados } from "../../../components/Texto/Dados";

const DadosPessoaisCliente = ({ dataCliente, handleSubmit }) => {
    return (
      <div className="Detalhes-do-Cadastro">
        <TextoDados
          chave="Nome"
          valor={(
            <InputValor
              name="nome"
              noStyle
              handleSubmit={(valor) => handleSubmit("nome", valor)}
              value= {dataCliente?.nome}
            />
          )}
        />
        <TextoDados
          chave="CPF"
          valor={(
            <InputValor
              name="cpf"
              noStyle
              handleSubmit={(valor) => handleSubmit("CPF", valor)}
              value={ dataCliente?.CPF}
            />
          )}
        />
        <TextoDados
          chave="Telefone"
          valor={(
            <InputValor
              name="telefones"
              noStyle
              handleSubmit={(valor) => handleSubmit("telefones", valor)}
              value={ dataCliente?.telefone}
            />
          )}
        />
        <TextoDados
          chave="E-mail"
          valor={(
            <InputValor
              name="email"
              noStyle
              handleSubmit={(valor) => handleSubmit("email", valor)}
              value={dataCliente?.email}
            />
          )}
        />
        <TextoDados
          chave="Data de Nascimento"
          valor={(
            <InputValor
              name="dataDeNascimento"
              noStyle
              handleSubmit={(valor) => handleSubmit("dataDeNascimento", valor)}
              value={dataCliente?.dataDeNascimento}
            />
          )}
        />
      </div>
    );
  }

  export default DadosPessoaisCliente;