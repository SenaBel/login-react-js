import React from "react";
import ButtonSimples from "../../../components/Button/Simples";

const HeaderDetalhesCliente= ({ dataCliente, onSave, onRemove }) => {

    return (
        <div className="flex">
            <div className="flex-1 flex">
           
                <h3>{dataCliente?.nome}</h3>
             
            </div>

            <div className="flex-1 flex flex-end">
                <ButtonSimples
                    rota='/detalhe-cliente'
                    onClick={() => {onSave()}}
                    label="Salvar"
                    type="success"
                />

                <ButtonSimples
                    rota='/detalhe-cliente'
                    onClick={() => {onRemove()}}
                    label="Remover"
                    type="danger"
                />
            </div>
        </div>
    );
}

export default HeaderDetalhesCliente;