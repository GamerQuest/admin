import * as Yup from 'yup'

export const SCHEMA_REQUIRED_MSG = 'Campo obligatorio'

export const optionalField = Yup.string().nullable()

export const requiredField = (msg = SCHEMA_REQUIRED_MSG) => optionalField.test(
  'required',
  msg,
  (v) => Boolean(v && typeof v === 'string' && !!v.trim())
)

export const emailField = requiredField().email()
