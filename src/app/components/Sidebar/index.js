import React, { useState, useContext } from 'react'
import { Container, Content } from './styles'
import { 
  FaTimes, 
  FaHome, 
  FaRegSun, 
  FaUserAlt, 
} from 'react-icons/fa'

import SidebarItem from '../SidebarItem'
import {useNavigate, Link } from 'react-router-dom'
import {AuthContext} from '../../../contexts/auth'

const Sidebar = ({ active }) => {
  const {logout} = useContext(AuthContext)
  const navigate = useNavigate()
  const closeSidebar = () => {
    active(false)
  }

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />  
      <Content>
        <Link to='/' style={{textDecoration: 'none'}} onClick={closeSidebar}>
        <SidebarItem Icon={FaHome} Text="Home" />
        </Link>
        <Link to="/registro-user" style={{textDecoration: 'none'}}>
        <SidebarItem Icon={FaUserAlt} Text="Cadastrar Usuário" onClick={closeSidebar}/>
        </Link>
        <SidebarItem Icon={FaRegSun} Text="Sair" onClick={logout}/>
      </Content>
    </Container>
  )
}

export default Sidebar