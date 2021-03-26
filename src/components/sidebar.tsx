import { List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core'
import { mdiViewDashboardOutline } from '@mdi/js'
import Icon from '@mdi/react'
import React, { Dispatch, SetStateAction } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTE_PATHS } from 'router/routes'

const MENU_ITEMS = [
  { icon: mdiViewDashboardOutline, label: 'Inicio', path: ROUTE_PATHS.LANDING },
  // { icon: mdiGoogleController, label: 'Juegos', path: GAMES_ROUTES.BASE },
  // { icon: mdiYoutubeStudio, label: 'YouTube', path: APP_ROUTES_PATHS.YOUTUBE },
  // { icon: mdiFacebook, label: 'Facebook', path: APP_ROUTES_PATHS.FACEBOOK },
  // { icon: mdiTwitter, label: 'Twitter', path: APP_ROUTES_PATHS.TWITTER },
  // { icon: mdiTwitch, label: 'Twitch', path: APP_ROUTES_PATHS.TWITCH },
  // { icon: mdiCalendarMultiple, label: 'Calendarios', path: APP_ROUTES_PATHS.CALENDARS },
  // { icon: mdiStorefrontOutline, label: 'Tienda', path: APP_ROUTES_PATHS.STORE },
  // { icon: mdiAccountMultipleOutline, label: 'Usuarios', path: APP_ROUTES_PATHS.USERS },
  // { icon: mdiTicket, label: 'Progamas de Lealtad', path: APP_ROUTES_PATHS.LOYALTY },
  // { icon: mdiChartBoxOutline, label: 'Estadisticas', path: APP_ROUTES_PATHS.ANALYTICS },
  // { icon: mdiBriefcaseAccountOutline, label: 'Empleados', path: APP_ROUTES_PATHS.EMPLOYEES },
  // { icon: mdiFolderTableOutline, label: 'Contabilidad', path: APP_ROUTES_PATHS.ACCOUNTING },
  // { icon: mdiFolderTextOutline, label: 'PQRs', path: APP_ROUTES_PATHS.PQRS },
]

function SideBar(
  { closed, closeHandler }: { closed: boolean, closeHandler: Dispatch<SetStateAction<boolean>> },
) {
  const { pathname } = useLocation()

  const handleClose = (path: string) =>
    path === ROUTE_PATHS.LANDING
      ? closeHandler(false)
      : closeHandler(true)

  return (
    <List>
      { MENU_ITEMS.map(item => (
        <Tooltip
          key={ item.path }
          title={ item.label }
          placement="right"
          disableHoverListener={ !closed }
        >
          <ListItem
            button
            selected={ pathname === item.path }
            component={ Link }
            to={ item.path }
            onClick={ () => handleClose(item.path) }
          >
            <ListItemIcon>
              <Icon path={ item.icon } size={ 1 } />
            </ListItemIcon>
            { !closed && (<ListItemText primary={ item.label } />) }
          </ListItem>
        </Tooltip>
      )) }
    </List>
  )
}

export default SideBar
