import React, { Component, useState } from 'react';

import DatePicker from 'react-datepicker';

import './Calendar.scss';
import 'react-datepicker/dist/react-datepicker.css';

class CalendarField extends Component {
  render() {
    // If some field from create task form is empty and user don't select date, field will have error class
    return (
      <div
        className={`calendar-field ${this.props.open
          ? 'open'
          : ''} ${this.props.error && !this.props.date ? 'error' : ''}`}
        onClick={this.props.onClick}
      >
        <span>{this.props.date || 'Select date'}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8333 3.33325H4.16667C3.24619 3.33325 2.5 4.07944 2.5 4.99992V16.6666C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6666V4.99992C17.5 4.07944 16.7538 3.33325 15.8333 3.33325Z"
            stroke="#4971FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.3333 1.66675V5.00008"
            stroke="#4971FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.66675 1.66675V5.00008"
            stroke="#4971FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.5 8.33325H17.5"
            stroke="#4971FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
}

function Calendar(props) {
  const [open, setOpen] = useState(false);

  const formateDateInput = () => {
    if (props.date) {
      const formateMonth = `${(`0${props.date.getMonth() + 1}`).slice(-2)}`;
      const formateDays = `${(`0${props.date.getDate()}`).slice(-2)}`;
      const formateYear = props.date.getFullYear()
        .toString()
        .slice(-2);
      return `${formateDays}/${formateMonth}/${formateYear}`;
    }
  };

  const customInput = (
    <CalendarField
      date={formateDateInput(props.date)}
      onClick={props.onClick}
      open={open}
      error={props.error}
    />
  );

  return (
    <DatePicker
      minDate={new Date()}
      customInput={customInput}
      selected={props.date}
      onChange={date => props.handleDateChange(date)}
      onCalendarOpen={() => setOpen(true)}
      onCalendarClose={() => setOpen(false)}
    />
  );
}

export default Calendar;
