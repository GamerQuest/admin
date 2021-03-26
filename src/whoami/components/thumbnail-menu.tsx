import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import useActions from '../duck/actions'

function ThumbnailMenu() {
  const { signOut } = useActions()
  const [anchor, setAnchor] = useState<(EventTarget & HTMLButtonElement) | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget)
  }

  const handleClose = (key: 'logout' | string) => {
    setAnchor(null)
    if (key === 'logout') signOut()
  }

  return (
    <>
      <IconButton onClick={ handleOpen }>
        <Avatar
          alt="Avatar de usuario"
          src=""
        />
      </IconButton>
      <Menu
        anchorEl={ anchor }
        keepMounted
        open={ !!anchor }
        onClose={ handleClose }
        getContentAnchorEl={ null }
        anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
        transformOrigin={ { vertical: 'top', horizontal: 'center' } }
      >
        <MenuItem onClick={ () => handleClose('logout') }>Cerrar Sesión</MenuItem>
      </Menu>
    </>
  )
}

export default ThumbnailMenu
