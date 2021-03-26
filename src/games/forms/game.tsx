import { Button, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import { uid } from 'uid'
import { DialogsContext } from 'components/with-context/dialogs'
import ImageField from 'components/forms/fields/image'
import TagsField from 'components/forms/fields/tags'
import InputText from 'components/forms/fields/text'
import useContentStyles from 'components/styles/content'
import useActions from '../duck/actions'
import useSelectors from '../duck/selectors'
import { Game } from '../duck/store'
import useDialogs from '../hooks/dialogs'
import EsrbField from './fields/esrb'
import PegiField from './fields/pegi'
import validations from './validations'

interface GamesFormProps {
  gameId?: string
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    grid: `repeat(2, auto) / ${ theme.spacing(60) }px ${ theme.spacing(30) }px`,
    gap: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  content: { gridColumn: 1, gridRow: 1 },
  cover: { gridColumn: 2, gridRow: 1, justifySelf: 'center' },
  actions: { gridColumn: '1 / span 2', gridRow: 2, justifySelf: 'end' },
}), { name: 'games-form' })

function GamesForm({ gameId }: GamesFormProps) {
  const actions = useActions()
  const { gameById } = useSelectors()
  const { close } = useContext(DialogsContext)
  const { open } = useDialogs()
  const contentStyles = useContentStyles()
  const styles = useStyles()

  const initValues: Game = !!gameId ? gameById(gameId) : {
    cover: [],
    thumbnail: [],
    description: '',
    esrb: '',
    title: '',
    pegi: [],
    tags: 'xbox,one,series,x,s,ps,play station,4,5,nintendo,switch,pc,gameplay,gamer,quest,',
    id: uid(28),
  }

  const handleSubmit = (game: Game) => {
    actions.create(game)
    gameId ? open.gameDetails(gameId) : close()
  }

  return (
    <Formik initialValues={ initValues } onSubmit={ handleSubmit } validationSchema={ validations }>
      <Form className={ styles.root }>
        <div className={ clsx(styles.content, contentStyles.verticalSpacing) }>
          <InputText name="title" label="Título" />
          <InputText name="description" label="Descripción" multiline rows={ 6 }
                     maxLength={ 5000 } />
          <EsrbField />
          <PegiField />
          <TagsField />
        </div>
        <div className={ clsx(styles.cover, contentStyles.verticalSpacing) }>
          <ImageField name="cover" label="Portada" ratio="3:4" />
          <ImageField name="thumbnail" label="Miniatura" ratio="16:9" />
        </div>
        <div className={ clsx(styles.actions, contentStyles.horizontalSpacing) }>
          <Button
            type="button"
            variant="outlined"
            onClick={ () => gameId ? open.gameDetails(gameId) : close() }>
            Cancelar
          </Button>
          <Button type="submit" variant="outlined" color="primary">
            Guardar
          </Button>
        </div>
      </Form>
    </Formik>
  )
}

export default GamesForm
