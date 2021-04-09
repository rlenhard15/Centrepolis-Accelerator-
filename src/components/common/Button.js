import React from 'react';

import Button from '@material-ui/core/Button';

import './Button.scss';

export const CustomButton = props => {
  return (
    <Button
      className={`button ${props.className}`}
      type={props.type}
      variant={props.variant}
      disabled={props.disabled}
      onClick={props.handleClick}
    >
      {props.label}
    </Button>
  )
}
