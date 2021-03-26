import { Avatar, Chip } from '@material-ui/core'
import React from 'react'
import ratingAO from 'assets/Rating/AO.svg'
import ratingE from 'assets/Rating/E.svg'
import ratingE10P from 'assets/Rating/E10plus.svg'
import ratingM17P from 'assets/Rating/M.svg'
import ratingRP from 'assets/Rating/RP.svg'
import ratingT from 'assets/Rating/T.svg'

function EsbrChip({ esbr }: { esbr: string }) {
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
    <Chip
      avatar={ (<Avatar src={ ratingImgMap[esbr] } variant="rounded" />) }
      label={ labelsMap[esbr] }
      size="small"
    />
  )
}

export default EsbrChip
