/** @format */

import React from "react";
import * as wasm from "calculator";
import "./Calculator.css";

type Props = {
  title: string;
};

interface State {
  formula: string;
  ans: string;
  equal: string;
}

class NameForm extends React.Component<{}, State> {
  constructor(props: Props) {
    super(props);
    this.state = { formula: "( ( 1 + 3 ) * 2 ) * 3", ans: "24", equal: "=" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ formula: event.target.value });
    this.setState({ equal: event.target.value.length > 0 ? "=" : "" });
    this.setState({ ans: wasm.calc(event.target.value) });
  }

  render() {
    return (
      <div className="formula">
        <input
          type="text"
          value={this.state.formula}
          onChange={this.handleChange}
        />
        {this.state.equal} {this.state.ans}
      </div>
    );
  }
}

const Calc = () => {
  return (
    <div>
      <h1>Calculator</h1>
      <NameForm />
    </div>
  );
};

export default Calc;
