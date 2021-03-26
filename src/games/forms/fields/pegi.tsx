import {
  Avatar,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
} from '@material-ui/core'
import pegiLanguageImg from 'assets/PEGI/Descriptions/bad-language-black-EN.jpg'
import pegiDiscrimationImg from 'assets/PEGI/Descriptions/discrimination-black-EN.jpg'
import pegiDrugsImg from 'assets/PEGI/Descriptions/drugs-black-EN.jpg'
import pegiFearImg from 'assets/PEGI/Descriptions/fear-black-EN.jpg'
import pegiGamblingImg from 'assets/PEGI/Descriptions/gambling-black-EN.jpg'
import pegiPurchaseImg from 'assets/PEGI/Descriptions/in-game-purchase-black-EN_1.jpg'
import pegiSexImg from 'assets/PEGI/Descriptions/sexual-content-black-EN.jpg'
import pegiViolenceImg from 'assets/PEGI/Descriptions/violence-black-EN.jpg'
import pegi12img from 'assets/PEGI/Labels/age-12-black.jpg'
import pegi16img from 'assets/PEGI/Labels/age-16-black.jpg'
import pegi18img from 'assets/PEGI/Labels/age-18-black 2_0.jpg'
import pegi3img from 'assets/PEGI/Labels/age-3-black_0.jpg'
import pegi7img from 'assets/PEGI/Labels/age-7-black.jpg'
import { useField } from 'formik'
import React from 'react'
import PegiChips from '../../components/pegi-chips'

function PegiField() {
  const [field, { error, touched }] = useField('pegi')
  const options: { [key: string]: string[] } = {
    year: ['PEGI 3', 'PEGI 7', 'PEGI 12', 'PEGI 16', 'PEGI 18'],
    content: [
      'PEGI VIOLENCE', 'PEGI BAD LANGUAGE', 'PEGI FEAR', 'PEGI GAMBLING', 'PEGI SEX', 'PEGI DRUGS',
      'PEGI DISCRIMATION', 'PEGI PURCHASES',
    ],
  }

  const ratingImgMap: { [key: string]: { [key: string]: string } } = {
    year: {
      'PEGI 3': pegi3img,
      'PEGI 7': pegi7img,
      'PEGI 12': pegi12img,
      'PEGI 16': pegi16img,
      'PEGI 18': pegi18img,
    },
    content: {
      'PEGI VIOLENCE': pegiViolenceImg,
      'PEGI BAD LANGUAGE': pegiLanguageImg,
      'PEGI FEAR': pegiFearImg,
      'PEGI GAMBLING': pegiGamblingImg,
      'PEGI SEX': pegiSexImg,
      'PEGI DRUGS': pegiDrugsImg,
      'PEGI DISCRIMATION': pegiDiscrimationImg,
      'PEGI PURCHASES': pegiPurchaseImg,
    },
  }

  const labelsMap: { [key: string]: { [key: string]: string } } = {
    year: {
      'PEGI 3': 'PEGI 3',
      'PEGI 7': 'PEGI 7',
      'PEGI 12': 'PEGI 12',
      'PEGI 16': 'PEGI 16',
      'PEGI 18': 'PEGI 18',
    },
    content: {
      'PEGI VIOLENCE': 'Violencia',
      'PEGI BAD LANGUAGE': 'Lenguaje soez',
      'PEGI FEAR': 'Temor',
      'PEGI GAMBLING': 'Azar',
      'PEGI SEX': 'Insinuaciones sexuales',
      'PEGI DRUGS': 'Drogas',
      'PEGI DISCRIMATION': 'Discriminación',
      'PEGI PURCHASES': 'Compra dentro del juego',
    },
  }

  return (
    <FormControl
      error={ touched && !!error }
      variant="outlined"
      size="small"
      fullWidth
      margin="dense"
    >
      <InputLabel id="esrb-field">PEGI</InputLabel>
      <Select
        labelId="pegi-field"
        label="PEGI"
        multiple
        variant="outlined"
        renderValue={ (selected: any) => (<PegiChips pegi={ selected } />) }
        placeholder="Clasificación ESRB"
        { ...field }
      >
        { Object.keys(options).map((optGroupKey: string) => ([
          (<ListSubheader key={ optGroupKey }>
            { optGroupKey === 'year' ? 'Etiquetas de edad' : 'Descriptores de contenido' }
          </ListSubheader>),
          options[optGroupKey].map((opt) => (
            <MenuItem key={ `${ optGroupKey }-${ opt }` } value={ opt }>
              <ListItemAvatar><Avatar
                src={ ratingImgMap[optGroupKey][opt] }
                variant="rounded"
              /></ListItemAvatar>
              <ListItemText primary={ labelsMap[optGroupKey][opt] } />
            </MenuItem>
          )),
        ])) }
      </Select>
      { error && (<FormHelperText>{ error }</FormHelperText>) }
    </FormControl>
  )
}

export default PegiField
