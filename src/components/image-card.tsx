import { Card, CardMedia } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'

interface ImageCardProps {
  src: string
  index?: number
  ratio?: string
}

function ImageCard({ src, index = 0, ratio = '1.6180:1' }: ImageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const { current } = cardRef
    if (current) {
      const [wR, hR] = ratio.split(':')
      setHeight((current.offsetWidth / parseInt(wR, 10)) * parseInt(hR, 10))
    }
  }, [ratio])

  return (
    <Card
      key={ `card-img-${ index }` }
      ref={ cardRef }
      style={ { flex: !index ? '0 2 100%' : '0 1 100px' } }
    >
      <CardMedia
        style={ { height } }
        image={ src }
        title={ `card-img-${ index }` }
      />
    </Card>
  )
}

export default ImageCard
