import { Chip, makeStyles } from '@material-ui/core'
import React from 'react'

interface TagsListProps {
  tags: string
  onDelete?: (index: number) => void
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: `calc(100% - ${ theme.spacing(3.5) }px)`,
    '& > *': {
      marginBottom: theme.spacing(0.5),
      '&:not(:last-child)': { marginRight: theme.spacing(0.5) },
    },
  },
}), { name: 'tags-field' })

function TagsList({ tags, onDelete }: TagsListProps) {
  const styles = useStyles()

  return (
    <div className={ styles.root }>
      { tags.split(',').filter(el => !!el).map((tag: string, i: number) => (
        <Chip
          key={ `${ tag }-${ i }` }
          label={ tag }
          size="small"
          onDelete={ onDelete }
        />
      )) }
    </div>
  )
}

export default TagsList
