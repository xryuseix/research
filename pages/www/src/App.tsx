/** @format */

import React from "react";
import * as wasm from "calculator";

const App = () => {
  let formula = "( ( 1 + 3 ) * 2 ) * 3";
  let ans = wasm.calc(formula);
  return (
    <div>
      <h1>Calculator</h1>
      <h2>{formula} = {ans}</h2>
    </div>
  );
};

export default App;
