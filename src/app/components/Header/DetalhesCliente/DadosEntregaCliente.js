import React from "react";
import InputValor from "../../../components/Inputs/InputValor";
import { TextoDados } from "../../../components/Texto/Dados";

const DadosEntregaCliente = ({ dataEndereco, handleSubmit }) => {
    return (
      <div className="Detalhes-da-Entrega">
        <TextoDados
          chave="Endereço"
          valor={(
            <InputValor
              name="local"
              noStyle
              handleSubmit={(valor) => handleSubmit("local", valor)}
              value={dataEndereco?.local}
            />
          )}
        />
        <TextoDados
          chave="Bairro"
          valor={(
            <InputValor
              name="bairro"
              noStyle
              handleSubmit={(valor) => handleSubmit("bairro", valor)}
              value={dataEndereco?.bairro}
            />
          )}
        />
        <TextoDados
          chave="Cidade"
          valor={(
            <InputValor
              name="cidade"
              noStyle
              handleSubmit={(valor) => handleSubmit("cidade", valor)}
              value={dataEndereco?.cidade}
            />
          )}
        />
        <TextoDados
          chave="Estado"
          valor={(
            <InputValor
              name="estado"
              noStyle
              handleSubmit={(valor) => handleSubmit("estado", valor)}
              value={dataEndereco?.estado}
            />
          )}
        />
        <TextoDados
          chave="CEP"
          valor={(
            <InputValor
              name="CEP"
              noStyle
              handleSubmit={(valor) => handleSubmit("CEP", valor)}
              value={dataEndereco?.CEP}
            />
          )}
        />
      </div>
    );
  }

  export default DadosEntregaCliente;