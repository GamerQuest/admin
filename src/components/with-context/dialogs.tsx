import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@material-ui/core'
import React, { createContext, PropsWithChildren, ReactElement, useState } from 'react'

interface DialogT {
  title?: string
  content: ReactElement
  actions?: ReactElement[]
  customProps?: DialogProps
}

interface Context {
  close: () => void
  open: (dialog: DialogT) => void
}

export const DialogsContext = createContext<Context>({
  open: dialog => {
  },
  close: () => {
  },
})

function DialogsProvider({ children }: PropsWithChildren<any>) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState<string>()
  const [content, setContent] = useState<ReactElement>()
  const [actions, setActions] = useState<ReactElement[]>([])
  const [customProps, setCustomProps] = useState<DialogProps>()

  const close = () => {
    setIsOpen(false)
    setTimeout(() => {
      setActions([])
      setContent(undefined)
      setTitle('')
      setCustomProps(undefined)
    }, 300)
  }
  const open = ({ actions, content, title, customProps }: DialogT) => {
    setCustomProps(customProps)
    setActions(actions ?? [])
    setContent(content)
    setTitle(title)
    setIsOpen(true)
  }

  return (
    <DialogsContext.Provider value={ { open, close } }>
      { children }
      <Dialog
        onClose={ close }
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="md"
        { ...customProps }
        open={ isOpen }
      >
        { title && (<DialogTitle>{ title }</DialogTitle>) }
        { content && (<DialogContent>{ content }</DialogContent>) }
        { !!actions.length && (<DialogActions>{ actions }</DialogActions>) }
      </Dialog>
    </DialogsContext.Provider>
  )
}

export default DialogsProvider
