import React from 'react';

import './InputField.scss';

export const InputField = props => {
  return (
    <div className="text-field">
      <label
        className="text-field-label">
        {props.label}
      </label>
      <input
        className={`text-field-input ${props.error ? 'error' : props.value ? 'no-error' : ''}`}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        autoComplete="off"
      />
      {
        props.error &&
        <p className="error-text">
          {props.errorText}
      </p>
      }
    </div>
  )
}
