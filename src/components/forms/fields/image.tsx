import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  OutlinedInput,
} from '@material-ui/core'
import { mdiImageOutline } from '@mdi/js'
import Icon from '@mdi/react'
import { useField, useFormikContext } from 'formik'
import React, { ChangeEvent, useEffect, useState } from 'react'
import ImageCard from '../../image-card'

interface ImageFieldProps {
  name: string
  label: string
  multiple?: boolean
  ratio?: '16:9' | '9:16' | '4:3' | '3:4' | '3:2' | '2:3' | '1.6180:1' | '1:1'
}

const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(0.5625, 3.5),
    width: `calc(100% - ${ theme.spacing(3.5) }px)`,
  },
  root: {
    display: 'grid',
    grid: 'minmax(0, auto) auto / 1fr',
  },
  gallery: {
    gridColumn: 1,
    gridRow: 1,
    zIndex: 3,
    width: `calc(100% - ${ theme.spacing(3.5) }px)`,
    justifySelf: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    '& > *': { marginTop: theme.spacing(1) },
  },
  button: { gridColumn: 1, gridRow: 2, zIndex: 1 },
  inputContainer: { gridColumn: 1, gridRow: '1 / span 2', zIndex: 2 },
  input: { opacity: 0, height: '100%', cursor: 'pointer' },
}), { name: 'image-field' })

function ImageField({ name, label, multiple = false, ratio = '4:3' }: ImageFieldProps) {
  const [field, { touched, error }] = useField(name)
  const { setFieldValue } = useFormikContext()
  const [files, setFiles] = useState<string[]>(field.value)
  const styles = useStyles()

  useEffect(() => {
    setFieldValue(name, files)
  }, [name, files, setFieldValue])

  const readFiles = (files: FileList) => {
    const nextFiles: string[] = []
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        nextFiles.push(reader.result as string)
        setFiles(nextFiles)
      }
      reader.readAsDataURL(file)
    })
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = event
    if (files && !!files.length) readFiles(files)
  }

  return (
    <FormControl
      className={ styles.root }
      error={ touched && !!error }
      fullWidth
      size="small"
      variant="outlined"
    >
      <InputLabel shrink={ true } htmlFor={ `${ name }-input` }>{ label }</InputLabel>
      <div className={ styles.gallery }>
        { files.map((file, index) => (
          <ImageCard
            src={ file }
            index={ index }
            ratio={ !index ? ratio : '1.6180:1' }
          />
        )) }
      </div>
      <Button
        className={ styles.button }
        color="primary"
        variant="text"
        size="small"
        startIcon={ (<Icon path={ mdiImageOutline } size={ 0.8 } />) }
        fullWidth
      >
        Cargar imagen
      </Button>
      <OutlinedInput
        className={ styles.inputContainer }
        id={ `${ name }-input` }
        inputProps={ { multiple, accept: 'image/*', className: styles.input } }
        label={ label }
        notched
        type="file"
        onChange={ handleOnChange }
      />
      { (touched && !!error) && (<FormHelperText>{ error }</FormHelperText>) }
    </FormControl>
  )
}

export default ImageField
