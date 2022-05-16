import React, { useState } from 'react'

import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import { useAuthContext } from '../../CheckAuthorization'

import { ReactComponent as LogoutIcon } from '../../images/icons/log-out.svg'
import { ReactComponent as MoreIcon } from '../../images/icons/more-vertical.svg'
import { ReactComponent as UserIcon } from '../../images/icons/user-default.svg'
import { nameOrEmail } from '../../utils/helpers';


const HeaderMenu = props => {
  const [isOpen, setIsOpen] = useState(false)
  const { logOut } = useAuthContext()

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div className="header-menu">
        <button
          className="header-menu-open"
          onClick={() => setIsOpen(!isOpen)}
        >
          <UserIcon className="header-menu-user-icon" />
          <span>{`Hi, ${nameOrEmail(props.userData.user)}`}</span>
          <MoreIcon className="header-menu-more-icon" />
        </button>
        {
          isOpen &&
          <ul className="header-menu-list">
            <li onClick={logOut}>
              <span>Log Out</span>
              <LogoutIcon className="header-menu-list-icon" />
            </li>
          </ul>
        }
      </div>
    </ClickAwayListener>
  )
}

export default HeaderMenu
