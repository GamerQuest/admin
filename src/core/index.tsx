import { MuiThemeProvider } from '@material-ui/core'
import AppTheme from 'components/styles/theme'
import DialogsProvider from 'components/with-context/dialogs'
import React, { PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'
import * as ducks from './ducks'
import FirebaseProvider from './firebase'
import StoreProvider from './store'

function AppCore({ children }: PropsWithChildren<any>) {
  return (
    <FirebaseProvider>
      <MuiThemeProvider theme={ AppTheme }>
        <StoreProvider { ...ducks }>
          <DialogsProvider>
            <BrowserRouter>
              { children }
            </BrowserRouter>
          </DialogsProvider>
        </StoreProvider>
      </MuiThemeProvider>
    </FirebaseProvider>
  )
}

export default AppCore
