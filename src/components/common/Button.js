import React from 'react';

import Button from '@material-ui/core/Button';

import './Button.scss';

export function CustomButton(props) {
  return (
    <Button
      className={`${props.className} button`}
      type={props.type}
      variant={props.variant}
      disabled={props.disabled}
      onClick={props.handleClick}
    >
      {props.label}
    </Button>
  );
}
