import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({ root: { textAlign: 'center' } }), { name: 'not-found-page' })

function NotFoundPage() {
  const styles = useStyles()

  return (
    <section className={styles.root}>
      <Typography variant="h1">404</Typography>
      <Typography variant="body1">
        Parece que el contenido que estas buscando no existe.
      </Typography>
    </section>
  )
}

export default NotFoundPage
