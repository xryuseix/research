/** @format */

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Calc from "./components/calculator";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/research/" component={Home} />
        <Route exact path="/research/calc/" component={Calc} />
        <Redirect to="/reasearch/" />
      </Switch>
    </div>
  );
};

export default App;
