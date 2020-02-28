import React from 'react';
import SkuOneContainer from './SkuOneContainer';
import { Route } from 'react-router-dom';

const App = () => (
  <Route exact path="/update" component={SkuOneContainer} />
)

export default App;