import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from './App';

const Root = ({store}) => (
  // Root takes in store
  // Provider
  // HashRouter
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;

