import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ROUTE_PATHS } from 'router/routes'
import BrandLogo from 'components/brand-logo'
import SideBar from 'components/sidebar'
import ThumbnailMenu from 'whoami/components/thumbnail-menu'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    grid: `${ theme.spacing(8) }px 1fr / auto 1fr`,
    gap: theme.spacing(2),
    maxWidth: '100vw',
    maxHeight: '100vh',
    padding: theme.spacing(2),
    overflow: 'hidden',
  },
  brand: { gridColumn: 1, gridRow: 1, justifySelf: 'center' },
  topBar: { gridColumn: 2, gridRow: 1, justifySelf: 'end' },
  sideBar: {
    gridColumn: 1,
    gridRow: 2,
    width: theme.spacing(30),
    justifySelf: 'center',
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  closed: { width: theme.spacing(7) },
  content: { gridColumn: 2, gridRow: 2, overflow: 'hidden auto' },
}), { name: 'main-layout' })

function MainLayout({ children }: PropsWithChildren<any>) {
  const { pathname } = useLocation()
  const [isClosed, setIsClosed] = useState(false)
  const styles = useStyles()

  useEffect(() => {
    setIsClosed(() => (pathname !== ROUTE_PATHS.LANDING))
  }, [pathname])

  return (
    <div className={ styles.root }>
      <section className={ styles.brand }>
        <BrandLogo small={ isClosed } />
      </section>
      <section className={ styles.topBar }>
        <ThumbnailMenu />
      </section>
      <section className={ clsx(styles.sideBar, { [styles.closed]: isClosed }) }>
        <SideBar closed={ isClosed } closeHandler={ setIsClosed } />
      </section>
      <section className={ styles.content }>{ children }</section>
    </div>
  )
}

export default MainLayout
