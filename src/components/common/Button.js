import React from 'react';

import './Button.scss';

export const Button = props => {
  return (
    <button
      className={`button`}
      type={props.type}
      onClick={props.handleClick}
    >
      {props.label}
    </button>
  )
}
