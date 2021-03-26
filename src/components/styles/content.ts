import { makeStyles } from '@material-ui/core'

const useContentStyles = makeStyles(theme => ({
  verticalSpacing: { '& > * + *': { marginTop: theme.spacing(1.5) } },
  horizontalSpacing: { '& > * + *': { marginLeft: theme.spacing(1.5) } },
}), { name: 'content-styles' })

export default useContentStyles
