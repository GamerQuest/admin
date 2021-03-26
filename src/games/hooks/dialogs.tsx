import { useContext } from 'react'
import { DialogsContext } from 'components/with-context/dialogs'
import GameDetails, { useStyles as useGameDetailsStyles } from '../components/game-details'
import GamesForm from '../forms/game'

function useDialogs() {
  const gameDetailsStyles = useGameDetailsStyles()
  const { open } = useContext(DialogsContext)

  const newGame = () => open({
    title: 'Nuevo Juego',
    content: <GamesForm />,
  })

  const editGame = (id: string) => open({
    title: 'Editar Juego',
    content: (<GamesForm gameId={ id } />),
  })

  const gameDetails = (gameId: string) => open({
    content: (<GameDetails gameId={ gameId } />),
    customProps: {
      disableBackdropClick: false,
      open: false,
      maxWidth: 'lg',
      PaperProps: { className: gameDetailsStyles.paper },
    },
  })

  return { open: { newGame, gameDetails, editGame } }
}

export default useDialogs
