import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Notfound from "./Notfound";

// This stateless functional component handles routing.

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route component={Notfound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
