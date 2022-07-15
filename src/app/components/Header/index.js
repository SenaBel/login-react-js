import React, { useState } from 'react'
import { ContainerRestrita, Title } from './styles'
import { FaBars } from 'react-icons/fa'
import Sidebar from '../Sidebar'



const Header = () => {
  const [sidebar, setSidebar] = useState(false)

  const showSiderbar = () => setSidebar(!sidebar)

  return (
    <ContainerRestrita>
      <FaBars onClick={showSiderbar} />
       <Title> Admin </Title>
      {sidebar && <Sidebar active={setSidebar} />}
    </ContainerRestrita>
  )
}

export default Header