import { makeStyles, TextField } from '@material-ui/core'
import { useField } from 'formik'
import React, { ChangeEvent, useEffect, useState } from 'react'
import TagsList from 'games/components/tags-list'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > input': { width: `calc(100% - ${ theme.spacing(3.5) }px)` },
    '& > [class*="tags-field-root"]': { padding: theme.spacing(1.3125, 1.75, 0) },
  },
}), { name: 'tags-field' })

function InputComponent({ onChange, value, ...inputProps }: any) {
  const [fieldValue, setFieldValue] = useState('')
  const [tags, setTags] = useState([])

  useEffect(() => {
    setTags(value.trim().split(',').filter((el: string) => !!el))
  }, [value])

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value: eventValue, name } } = event
    if (eventValue.endsWith(',')) {
      onChange({ target: { value: [...tags, eventValue.trim()].join(','), name } })
      setFieldValue('')
    } else {
      setFieldValue(eventValue)
    }
  }

  const handleRemoveTags = (index: number) => {
    tags.splice(index, 1)
    setTags(tags)
    onChange({ target: { value: tags.join(','), name: 'tags' } })
  }

  return (
    <>
      { !!tags.length && (<TagsList tags={ tags.join(',') } onDelete={ handleRemoveTags } />) }
      <input
        { ...inputProps }
        onChange={ handleOnChange }
        value={ fieldValue }
        placeholder="Etiquetas separadas por coma (,)"
      />
    </>
  )
}

function TagsField() {
  const [{ onBlur, ...field }, { error, touched }] = useField('tags')
  const styles = useStyles()
  const [isFocused, setIsFocused] = useState(false)

  const lengthText = `${ field.value.length } / 500`

  const handleBlur = (e: any) => {
    setIsFocused(false)
    onBlur(e)
  }

  return (
    <TextField
      error={ touched && !!error }
      fullWidth
      helperText={ (!error) ? lengthText : error }
      label="Etiquetas"
      size="small"
      variant="outlined"
      InputLabelProps={ { shrink: !!field.value || isFocused } }
      InputProps={ { inputComponent: InputComponent, className: styles.root } }
      onBlur={ handleBlur }
      onFocus={ () => setIsFocused(true) }
      { ...field }
    />
  )
}

export default TagsField
