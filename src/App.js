import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import CheckAuthorization from './CheckAuthorization';

function App() {
  return (
    <Router>
      <div className="App">
        <CheckAuthorization />
      </div>
    </Router>
  );
}

export default App;
