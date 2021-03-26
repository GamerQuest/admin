import { Button, makeStyles } from '@material-ui/core'
import { Form, Formik } from 'formik'
import React from 'react'
import PasswordField from 'components/forms/fields/password'
import TextField from 'components/forms/fields/text'
import useActions from '../duck/actions'
import { signIn as signInValidation } from './validations'

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: theme.spacing(45),
    margin: '0 auto',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}), { name: 'oat-form' })

function SignInForm() {
  const { signIn } = useActions()
  const styles = useStyles()
  const initValues = {
    email: '',
    password: '',
  }

  const handleSubmit = ({ email, password }: { [key: string]: string }) => signIn(email, password)

  return (
    <Formik
      initialValues={ initValues }
      validationSchema={ signInValidation }
      onSubmit={ handleSubmit }
    >
      <Form className={ styles.root }>
        <TextField name="email" label="Correo Electronico" type="email" />
        <PasswordField name="password" label="Contraseña" />
        <Button type="submit">
          Ingresar
        </Button>
      </Form>
    </Formik>
  )
}

export default SignInForm
