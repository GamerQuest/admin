import * as Yup from 'yup'
import { requiredField, SCHEMA_REQUIRED_MSG } from 'components/forms/field-schemas'

const validations = Yup.object().shape({
  cover: Yup.array().of(Yup.string())
  .min(1, 'Ingrese al menos 1 elemento')
  .required(SCHEMA_REQUIRED_MSG),
  description: requiredField().max(5000),
  esrb: requiredField(),
  pegi: Yup.array().of(Yup.string())
  .min(1, 'Seleccione al menos 1 elemento')
  .required(SCHEMA_REQUIRED_MSG),
  tags: requiredField()
  .max(500, 'Maximo 500 caracteres')
  .matches(/[\w ]*,?/),
  thumbnail: Yup.array().of(Yup.string())
  .min(1, 'Ingrese al menos 1 elemento')
  .required(SCHEMA_REQUIRED_MSG),
  title: requiredField(),
})

export default validations
