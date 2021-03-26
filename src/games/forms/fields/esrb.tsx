import {
  Avatar,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
} from '@material-ui/core'
import { useField } from 'formik'
import React from 'react'
import ratingAO from 'assets/Rating/AO.svg'
import ratingE from 'assets/Rating/E.svg'
import ratingE10P from 'assets/Rating/E10plus.svg'
import ratingM17P from 'assets/Rating/M.svg'
import ratingRP from 'assets/Rating/RP.svg'
import ratingT from 'assets/Rating/T.svg'
import EsbrChip from '../../components/esbr-chip'

function EsrbField() {
  const [field, { error, touched }] = useField('esrb')
  const options = ['E', 'E10P', 'T', 'M17P', 'AO', 'RP']

  const ratingImgMap: { [key: string]: string } = {
    'E': ratingE,
    'E10P': ratingE10P,
    'T': ratingT,
    'M17P': ratingM17P,
    'AO': ratingAO,
    'RP': ratingRP,
  }

  const labelsMap: { [key: string]: string } = {
    'E': 'Para todos',
    'E10P': 'Para todos desde 10 años',
    'T': 'Adolecentes',
    'M17P': 'Maduros desde 17 años',
    'AO': 'Solo Adultos',
    'RP': 'Clasificación Pendiente',
  }

  return (
    <FormControl
      error={ touched && !!error }
      variant="outlined"
      size="small"
      fullWidth
      margin="dense"
    >
      <InputLabel id="esrb-field">ESBR</InputLabel>
      <Select
        labelId="esrb-field"
        label="ESBR"
        renderValue={ (selected: any) => (<EsbrChip esbr={ selected } />) }
        placeholder="Clasificación ESRB"
        { ...field }
      >
        { options.map((opt) => (
          <MenuItem key={ opt } value={ opt }>
            <ListItemAvatar><Avatar src={ ratingImgMap[opt] } variant="rounded" /></ListItemAvatar>
            <ListItemText primary={ labelsMap[opt] } />
          </MenuItem>
        )) }
      </Select>
      { error && (<FormHelperText>{ error }</FormHelperText>) }
    </FormControl>
  )
}

export default EsrbField
