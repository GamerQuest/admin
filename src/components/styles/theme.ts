import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'
import { amber, cyan } from '@material-ui/core/colors'

const AppTheme = responsiveFontSizes(
  createMuiTheme({
    overrides: {
      MuiListItem: {
        root: {
          '.MuiList-root &:first-child': { borderRadius: '8px 8px 0 0' },
          '.MuiList-root &:last-child': { borderRadius: '0 0 8px 8px' },
          '&.Mui-selected': {
            backgroundColor: `${cyan.A200}14`,
            '&:hover': { backgroundColor: `${cyan.A700}14` },
          },
        },
        button: {
          color: cyan.A700,
          '&:hover': { backgroundColor: `${cyan.A700}14` },
        },
      },
      MuiListItemIcon: {
        root: {
          '.Mui-selected &': {
            color: cyan.A700,
          },
        },
      },
      MuiListItemText: {
        root: {
          color: 'black',
          '.Mui-selected &': {
            color: cyan['900'],
          },
        },
      },
      MuiButton: {
        root: { textTransform: 'capitalize' },
      },
      MuiBackdrop: {
        root: { backdropFilter: 'blur(4px)' },
      },
    },
    palette: {
      primary: cyan,
      secondary: amber,
    },
    typography: {
      fontFamily: ['Signika', 'sans-serif'].join(','),
    },
  }),
)

export default AppTheme
