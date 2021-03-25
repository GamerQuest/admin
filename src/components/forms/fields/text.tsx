import { TextField as MuiTextField } from '@material-ui/core'
import { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField/TextField'
import { useField } from 'formik'
import React from 'react'

interface TextFieldProps {
  name: string
  label: string
  maxLength?: number
}

function TextField({ name, label, maxLength, ...props }: MuiTextFieldProps & TextFieldProps) {
  const [field, { error, touched }] = useField(name)

  const lengthText = `${field.value.length} / ${maxLength}`

  return (
    <MuiTextField
      error={touched && !!error}
      fullWidth
      helperText={(maxLength && !error) ? lengthText : error}
      label={label}
      size="small"
      variant="outlined"
      {...field}
      {...props}
    />
  )
}

export default TextField
