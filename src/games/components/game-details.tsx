import { Button, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core'
import { mdiPencilOutline } from '@mdi/js'
import Icon from '@mdi/react'
import React, { useContext } from 'react'
import { DialogsContext } from 'components/with-context/dialogs'
import ImageCard from 'components/image-card'
import useSelectors from '../duck/selectors'
import useDialogs from '../hooks/dialogs'
import EsbrChip from './esbr-chip'
import PegiChips from './pegi-chips'
import TagsList from './tags-list'

interface GameDetailsProps {
  gameId: string
}

export const useStyles = makeStyles(theme => ({
  paper: {
    '& .MuiDialogContent-root': {
      display: 'grid',
      grid: `repeat(2, auto) / ${ theme.spacing(28) }px ${ theme.spacing(60) }px`,
      gap: theme.spacing(2, 3),
      padding: 0,
    },
    '& .MuiCardContent-root:last-child': { paddingBottom: theme.spacing(2) },
  },
  cover: {
    gridColumn: 1,
    gridRow: '1 / span 2',
    zIndex: 1,
    padding: theme.spacing(20, 0, 2, 4),
    '& > * + *': { marginTop: theme.spacing(1) },
    '& > [class*="MuiCard-root"]': { boxShadow: theme.shadows[8] },
  },
  thumbnail: {
    gridColumn: '1 / span 2',
    gridRow: 1,
    zIndex: 0,
    '& > *': {
      borderRadius: 0,
      boxShadow: theme.shadows[6],
    },
    '& [class*="MuiCardMedia-root"]': {
      boxShadow: 'inset 0px -16px 16px 0px #000000CC',
    },
  },
  content: {
    gridColumn: 2,
    gridRow: 2,
    zIndex: 1,
    padding: theme.spacing(0, 4, 2, 0),
    '& > * + *': {
      marginTop: theme.spacing(1),
      '&:last-child': { marginTop: theme.spacing(2) },
    },
  },
  description: {
    maxHeight: theme.spacing(25),
    overflow: 'auto',
  },
  header: {
    gridColumn: 2,
    gridRow: 1,
    zIndex: 1,
    padding: theme.spacing(0, 4, 1, 0),
    color: theme.palette.common.white,
    alignSelf: 'end',
    textShadow: '1px 1px 2px #000000CC',
  },
  actions: {
    padding: 0,
    flexDirection: 'row-reverse',
    '& > * + *': { marginRight: theme.spacing(1) + 'px !important' },
  },
}), { name: 'game-details' })

function GameDetails({ gameId }: GameDetailsProps) {
  const { close } = useContext(DialogsContext)
  const { open } = useDialogs()
  const { gameById } = useSelectors()
  const game = gameById(gameId)
  const styles = useStyles()

  return (
    <>
      <div className={ styles.thumbnail }>
        <ImageCard src={ game.thumbnail[0] } ratio="21:9" />
      </div>
      <div className={ styles.cover }>
        <ImageCard src={ game.cover[0] } ratio="16:21" />
        <Typography variant="subtitle2">ESBR</Typography>
        <EsbrChip esbr={ game.esrb } />
        <Typography variant="subtitle2">PEGI</Typography>
        <PegiChips pegi={ game.pegi } />
      </div>
      <header className={ styles.header }>
        <Typography variant="h4">{ game.title }</Typography>
      </header>
      <CardContent className={ styles.content }>
        <Typography variant="body2" className={ styles.description }>
          { game.description }
        </Typography>
        <Typography variant="subtitle2">Etiquetas</Typography>
        <TagsList tags={ game.tags } />
        <CardActions className={ styles.actions }>
          <Button
            variant="outlined"
            color="primary"
            endIcon={ (<Icon path={ mdiPencilOutline } size={ 0.75 } />) }
            onClick={ () => open.editGame(game.id) }
          >
            editar
          </Button>
          <Button variant="outlined" onClick={ close }>cerrar</Button>
        </CardActions>
      </CardContent>
    </>
  )
}

export default GameDetails
