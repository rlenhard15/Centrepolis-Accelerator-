import React from 'react';

import './InputField.scss';

export function InputField(props) {
  return (
    <div className="text-field flex flex-col justify-center">
      {props.label && (
        <label
          className="text-field-label"
        >
          {props.label}
        </label>
      )}
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
        props.error
        && (
          <p className="error-text">
            {props.errorText}
          </p>
        )
      }
    </div>
  );
}
