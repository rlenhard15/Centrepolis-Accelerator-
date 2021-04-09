import React from 'react';
import { NavLink, Route, } from 'react-router-dom';

export const AssessmentTabs = ({ children, baseUrl }) => {
  return (
    <>
      <ul className="assessment-tabs">
        {React.Children.map(children, tab => (
          <li>{React.cloneElement(tab, {baseUrl})}</li>
        ))}
      </ul>
      <div className="assessment-tabs-content">
        {React.Children.map(children, ({props}) => <Route exact path={`${baseUrl}/${props.tab}`}>{props.children}</Route>)}
      </div>
    </>
  );
};

export const AssessmentTab = ({ tab, label, baseUrl }) => {
  return (
    <NavLink to={`${baseUrl}/${tab}`} exact>
      {label}
    </NavLink>
  );
};

export default AssessmentTabs;
