import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core'

const CARD_WIDTH = 8 * 22

const useStyles = makeStyles(theme => ({
  root: {
    width: CARD_WIDTH,
    display: 'grid',
    grid: '1fr auto / 1fr',
    boxShadow: theme.shadows[0],
    color: theme.palette.primary.light,
    '&:hover': { boxShadow: theme.shadows[6] },
  },
  media: {
    height: (CARD_WIDTH / 16) * 21,
    gridColumn: 1,
    gridRow: '1 / span 2',
    zIndex: 0,
  },
  title: {
    padding: theme.spacing(2, 1.5),
    gridColumn: 1,
    gridRow: 2,
    zIndex: 1,
    backgroundImage: 'linear-gradient(to top, #000000E0 32%, #00000000)',
    '&:last-child': { paddingBottom: theme.spacing(1.5) },
    color: theme.palette.common.white,
  },
}), { name: 'game-card' })

interface GameCardProps {
  cover: string
  title: string
  onClick: () => void
}

function GameCard({ cover, title, onClick }: GameCardProps) {
  const styles = useStyles()

  return (
    <Card key={ title }>
      <CardActionArea className={ styles.root } onClick={ onClick }>
        <CardMedia image={ cover } title={ title } className={ styles.media } />
        <CardContent className={ styles.title }>
          <Typography variant="subtitle1">{ title }</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default GameCard
