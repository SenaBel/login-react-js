import React, { useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import { getCliente, getClientesPesquisa} from '../../services/api'
import DetalhesCliente from './detalhesDoCliente';

//import './styles.css'
// import Pesquisa from '../../components/Inputs/Pesquisa'
// import Tabela from '../../components/Tabela/Simples';
// import Paginacao from '../../components/Paginacao/Simples';

const Clientes = () => {
// const [dados, setDados] = useState([])
// const {id} = useParams()

//console.log('esse é o params', id)

    // useEffect(() => {
    //     (async () => {
    //         const resList = await getCliente(id)
    //         console.log('Value of Client List- Detalhes Pedido', resList.data)
    //         setDados(resList.data )

    //     })()
    // },[])
    
    return(
        <div className="Login flex flex-center">
            <div className="Card">
                <DetalhesCliente  />
            </div>
        </div>
    )
}

export default Clientes