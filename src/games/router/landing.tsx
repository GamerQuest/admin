import { Button, Typography } from '@material-ui/core'
import React from 'react'
import ContentLayout from '../../layouts/content'
import GamesList from '../components/game-list'
import useSelectors from '../duck/selectors'
import useDialogs from '../hooks/dialogs'


function LandingPage() {
  const { open } = useDialogs()
  const { isEmpty, games } = useSelectors()

  return (
    <ContentLayout
      actions={ (
        <Button variant="outlined" color="primary" onClick={ open.newGame }>
          Crear juego nuevo
        </Button>
      ) }
      header={ (<Typography variant="h4"> Juegos </Typography>) }
    >
      { isEmpty ? (
        <Typography variant="body1">
          No hay juegos creados aún
        </Typography>
      ) : (<GamesList games={ games } />) }
    </ContentLayout>
  )
}

export default LandingPage
