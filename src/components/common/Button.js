import React from 'react';

import './Button.scss';

export const Button = props => {
  return (
    <button
      className={`button`}
      type={props.type}
      disabled={props.disabled}
      onClick={props.handleClick}
    >
      {props.label}
    </button>
  )
}
