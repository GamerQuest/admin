import { Button, makeStyles } from '@material-ui/core'
import PasswordField from 'components/forms/fields/password'
import TextField from 'components/forms/fields/text'
import { Form, Formik } from 'formik'
import React from 'react'
import useActions from '../duck/actions'
import { signUp as signUpValidation } from './validations'

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

function SignUpForm() {
  const { signUp } = useActions()
  const styles = useStyles()
  const initValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }

  const handleSubmit = ({ password, ...user }: { password: string } & any) => signUp(user, password)

  return (
    <Formik
      initialValues={ initValues }
      validationSchema={ signUpValidation }
      onSubmit={ handleSubmit }
    >
      <Form className={ styles.root }>
        <TextField name="firstName" label="Nombres" />
        <TextField name="lastName" label="Apellidos" />
        <TextField name="email" label="Correo Electronico" type="email" />
        <PasswordField name="password" label="Contraseña" />
        <Button type="submit">
          Registrarse
        </Button>
      </Form>
    </Formik>
  )
}

export default SignUpForm
