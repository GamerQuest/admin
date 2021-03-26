import { makeStyles } from '@material-ui/core'
import React, { PropsWithChildren } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    grid: `1fr / ${theme.spacing(30)}px 1fr`,
    gap: theme.spacing(2),
  },
  sideNav: { gridColumn: 1, gridRow: 1 },
  content: { gridColumn: 2, gridRow: 1 },
}), { name: 'side-nav-layout' })

function SideNavLayout({ children, sideNav }: PropsWithChildren<{ sideNav: React.ReactElement }>) {
  const styles = useStyles()

  return (
    <section className={styles.root}>
      <section className={styles.sideNav}>{sideNav}</section>
      <section className={styles.content}>{children}</section>
    </section>
  )
}

export default SideNavLayout
