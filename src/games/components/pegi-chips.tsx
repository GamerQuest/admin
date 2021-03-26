import { Avatar, Chip, makeStyles } from '@material-ui/core'
import React from 'react'
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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      marginBottom: theme.spacing(0.5),
      '&:not(:last-child)': { marginRight: theme.spacing(0.5) },
    },
  },
}), { name: 'pegi-chips' })

function PegiChips({ pegi }: { pegi: string[] }) {
  const styles = useStyles()

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
    <div className={ styles.root }>
      { (pegi as string[]).map(rate => (
        <Chip
          avatar={ (
            <Avatar
              src={ Object.keys(ratingImgMap.year).includes(rate)
                ? ratingImgMap.year[rate]
                : ratingImgMap.content[rate] }
              variant="rounded"
            />
          ) }
          label={ Object.keys(labelsMap.year).includes(rate) ? labelsMap.year[rate] : labelsMap.content[rate] }
          size="small"
        />
      )) }
    </div>
  )
}

export default PegiChips
