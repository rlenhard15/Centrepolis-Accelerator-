import React, { useState, useEffect, memo } from 'react'

import useHttp from '../../hooks/useHttp.hook'

import HeaderNotification from './HeaderNotification'
import HeaderMenu from './HeaderMenu'
import { PageLogo } from '../logos/PageLogos'

import './Header.scss'

const Header = memo(props => {
  const { request } = useHttp()

  const [page, setPage] = useState(1)
  const [state, setState] = useState({ notifications: [] })

  const getNotificationRequest = async () => {
    const { notifications, total_pages: totalPages } = await request(`/api/notifications?page=${page}`)

    setState({
      notifications: [...state.notifications, ...notifications],
      totalPages,
    })
  }

  const updateNotificationsList = updatedList => setState({ ...state, notifications: updatedList })

  const handleChangePage = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    getNotificationRequest()
  }, [page])

  return (
    <header className={`header ${props.className}`}>
      <div className="header-block">
        <div className="header-block-logo">
          {props.className === 'page' ? <PageLogo type='page' /> : null}
        </div>
        <div className="header-navigation">
          <HeaderNotification
            notifications={state.notifications}
            updateNotificationsList={updateNotificationsList}
            handleChangePage={handleChangePage}
            hasMore={state.totalPages > page}
          />
          <HeaderMenu {...props} />
        </div>
      </div>
    </header>
  )
})

export default Header
