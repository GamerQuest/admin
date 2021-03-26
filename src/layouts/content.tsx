import { makeStyles } from '@material-ui/core'
import React, { PropsWithChildren, ReactElement } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    grid: 'auto 1fr auto / repeat(2, 1fr)',
    gap: theme.spacing(2),
  },
  header: { gridColumn: 1, gridRow: 1 },
  aside: { gridColumn: 2, gridRow: 1, justifySelf: 'end' },
  main: { gridColumn: '1 / span 2', gridRow: 2 },
  footer: { gridColumn: '1 / span 2', gridRow: 3 },
}), { name: 'content-layout' })

interface ContentLayoutProps {
  header?: ReactElement
  actions?: ReactElement
  footer?: ReactElement
}

function ContentLayout({ actions, children, footer, header }: PropsWithChildren<ContentLayoutProps>) {
  const styles = useStyles()

  return (
    <section className={styles.root}>
      <header className={styles.header}>{header}</header>
      <aside className={styles.aside}>{actions}</aside>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>{footer}</footer>
    </section>
  )
}

export default ContentLayout
