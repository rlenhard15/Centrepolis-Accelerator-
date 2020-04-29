import React from 'react';

import Select from 'react-select'

import './Select.scss';

const CustomSelect = props => {
  const customStyles = {
    indicatorSeparator: () => ({
      display: 'none'
    }),
    placeholder: () => ({
      paddingLeft: 5,
      color: props.isDisable ? 'rgba(10, 14, 46, 0.5)' : '#0A0E2E'
    }),
    menu: (provided) => ({
      ...provided,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      marginTop: '-3px',
      marginBottom: 0,
      boxShadow: 'none',
      border: '1px solid #D3D3D3',
      zIndex: 10
    }),
    option: (provided) => ({
      ...provided,
      padding: '10px 13px',
      borderBottom: '1px solid #D3D3D3',
      fontSize: '0.8889rem'
    }),
    singleValue: (provided) => ({
      ...provided,
      marginLeft: 5
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
      paddingRight: 10,
      transition: 'all .2s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null
    }),
    input: (provided) => ({
      ...provided,
      marginLeft: 5
    })
  }

  return (
    <div className="custom-select">
      <p className="custom-select-label">{props.label}</p>
      <Select
        className={`select ${props.error ? 'error' : ''}`}
        styles={customStyles}
        placeholder={props.placeholder}
        options={props.options}
        value={props.value}
        onChange={props.onChange}
        isDisabled={props.isDisabled}
      />
    </div>
  )
}

export default CustomSelect