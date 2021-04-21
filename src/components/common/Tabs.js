import React from 'react';
import { NavLink, Route, } from 'react-router-dom';

import './Tabs.scss';

export const Tabs = ({ children, baseUrl }) => {
  return (
    <>
      <ul className="custom-tabs">
        {React.Children.map(children, tab => (
          <li>{React.cloneElement(tab, {baseUrl})}</li>
        ))}
      </ul>
      <div className="custom-tabs-content">
        {React.Children.map(children, ({props}) => <Route exact path={`${baseUrl}/${props.tab}`}>{props.children}</Route>)}
      </div>
    </>
  );
};

export const Tab = ({ tab, label, baseUrl }) => {
  return (
    <NavLink to={`${baseUrl}/${tab}`} exact>
      {label}
    </NavLink>
  );
};

export default Tabs;
