import React from 'react'
import { Container } from './styles'

import {useNavigate } from 'react-router-dom'

const SidebarItem = ({ Icon, Text, onClick}) => {
  const navigate = useNavigate()

  return (
    <Container onClick={onClick}>
      <Icon />
      {Text}
    </Container>
  )
}

export default SidebarItem