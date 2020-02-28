import React from 'react';
import { Route } from 'react-router-dom';
import SupportContainer from './SupportContainer';
import ConfirmContainer from './ConfirmContainer';

const App = () => (
  <div>
    <Route exact path="/update" component={SupportContainer} />
    <Route exact path="/confirm" component={ConfirmContainer} />
  </div>
);

export default App;