import React, {useEffect, useState} from 'react'
import { getClientes, getClientesPesquisa} from '../../services/api'

import './styles.css'
import Alert from 'react-bootstrap/Alert';
import Pesquisa from '../../components/Inputs/Pesquisa'
import Tabela from '../../components/Tabela/Simples';
import Paginacao from '../../components/Paginacao/Simples';
import ClockLoader from "react-spinners/ClockLoader"

const Clientes = () => {
    const [dados, setDados] = useState([])
    const [pesquisa, setPesquisa] = useState("");
    const [atual, setAtual] = useState(0);
    const [resCliente, setResCliente] = useState()
    const [limit, setLimit] = useState(2);
    const [finishedTimeout, setFinishedTimeout] = useState(false);
    const [loading, setLoading] = useState(false);

useEffect(() => {
    (async () => {
      if(pesquisa){
        const resPesquisa = await getClientesPesquisa(pesquisa, atual, limit)
        setResCliente(resPesquisa.data.clientes)
        setDados(resPesquisa.data.clientes.docs )
        console.log("pesquisa hoje 08", dados)
      }
      else{
        const resList = await getClientes(atual, limit)
        setResCliente(resList.data.clientes)
        console.log('Value of Client List- Abel Sena', resList.data.clientes.docs)
        setDados(resList.data.clientes.docs )
      }
      })()
    },[atual, pesquisa])

useEffect(() => {
    const id = setTimeout(() => {
      setFinishedTimeout(true)
    }, 2000);
    return () => clearTimeout(id)
}, []);

useEffect(() => {
  setLoading(true)
  setTimeout(() => {
    setLoading(false)
  }, 2000)
}, [])

const clientes = []
  dados.map((item) => {
      clientes.push({
        'Cliente': item.nome,
        'E-mail': item.usuario ? item.usuario.email : null,
        "Telefone": item.telefones[0],
        "CPF": item.cpf,
        "botaoDetalhes": `/detalhe-cliente/${item._id}`
      })
  })
       
const  changeNumeroAtual = (atual)  => {setAtual(atual,  () =>  getClientes())}
    
    return(
      <div  className="flex flex-center"> 
       
         {
          loading ?
          <div style={{width:'60%'}} className="Card">
          <ClockLoader color={"#36D7B7"} loading={loading}  size={150} />
          </div>
          :
          <div style={{width:'60%'}} className="Card">
            <div className="">
              <h2>Meus Clientes</h2>
            </div>
      <Pesquisa
        valor={pesquisa}
        placeholder={"Pesquisa aqui pleo nome do cliente"}
        onChange={(e) => setPesquisa(e.target.value)}
        //onClick={() => handleSubmitPesquisa()} 
      />
      
           <br/> 
      {!resCliente && (
        finishedTimeout &&
        <Alert variant="warning" > Nenhum Registro Encontrado... </Alert>
        ) 
      }

      
      <Tabela 
        cabecalho={["Cliente", "E-mail", "Telefone", "CPF"]}
        dados={clientes}
      />
      <Paginacao 
        atual={atual} 
        total={resCliente ? resCliente.total : 0}
        limite={limit} 
        onClick={(numeroAtual) => changeNumeroAtual(numeroAtual)}
      /> 

      </div>
}
    </div>
    
    )
}

export default Clientes