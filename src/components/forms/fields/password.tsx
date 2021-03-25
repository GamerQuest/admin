import { IconButton, InputAdornment, TextField } from '@material-ui/core'
import { TextFieldProps } from '@material-ui/core/TextField/TextField'
import { mdiEye, mdiEyeOff } from '@mdi/js'
import Icon from '@mdi/react'
import { useField } from 'formik'
import React, { useState } from 'react'

interface PasswordFieldProps {
  name: string
  label: string
}

function PasswordField({ name, label, ...props }: TextFieldProps & PasswordFieldProps) {
  const [field, { error, touched }] = useField(name)
  const [isSecret, setIsSecret] = useState(true)

  const toggleSecret = () => setIsSecret(prevState => !prevState)

  return (
    <TextField
      error={ touched && !!error }
      fullWidth
      label={ label }
      size="small"
      variant="outlined"
      type={ isSecret ? 'password' : 'text' }
      InputProps={ {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={ toggleSecret }>
              <Icon size={ 1 } path={ isSecret ? mdiEye : mdiEyeOff } />
            </IconButton>
          </InputAdornment>
        ),
      } }
      { ...field }
      { ...props }
    />
  )
}

export default PasswordField
