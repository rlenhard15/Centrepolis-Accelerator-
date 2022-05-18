import React from 'react';

import './Loader.scss';

function Loader(props) {
  return (
    <div className="loader">
      <div className="loader-block">
        <div className="loader-circle" />
      </div>
    </div>
  );
}

export default Loader;
