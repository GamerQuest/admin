import * as yup from 'yup'
import { emailField, requiredField } from 'components/forms/field-schemas'

export const signUp = yup.object().shape({
  firstName: requiredField('Cual es tu nombre?'),
  lastName: requiredField('Cual es tu apellido?'),
  email: emailField,
  password: requiredField('Usa una contraseña segura'),
})

export const signIn = yup.object().shape({
  email: emailField,
  password: requiredField(),
})
