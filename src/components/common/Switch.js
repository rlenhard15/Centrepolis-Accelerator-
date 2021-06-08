import React from 'react'

import Switch from '@material-ui/core/Switch'

import './Switch.scss'

export const CustomSwitch = props => {
  const {
    className = '',
    checked = false,
    disabled = false,
    handleClick,
    label,
  } = props

  return (
    <>
      <Switch
        className={`switch ${className}`}
        checked={checked}
        disabled={disabled}
        onChange={handleClick}
        color="default"
      />
      {label && <label className="switch-label">{label}</label>}
    </>
  )
}
