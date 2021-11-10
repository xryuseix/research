/** @format */

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Calc from "./calculator";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Calc} />
        <Route path="/calc" component={Calc} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
