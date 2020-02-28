import React from 'react';
import { Route } from 'react-router-dom';
import SkuOneContainer from './SkuOneContainer';
import ConfirmContainer from './ConfirmContainer';

const App = () => (
  <div>
    <Route exact path="/update" component={SkuOneContainer} />
    <Route exact path="/confirm" component={ConfirmContainer} />
  </div>
);

export default App;