/** @format */

import React from "react";
import * as wasm from "calculator";
import "./calculator.css";

type Props = {
  title: string;
};

interface State {
  formula: string;
  ans: string;
  equal: string;
}

class CalcForm extends React.Component<{}, State> {
  constructor(props: Props) {
    super(props);
    this.state = { formula: "((1+3)*-2)*3", ans: "24", equal: "=" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let formula = event.target.value;
    this.setState({ formula: formula });
    this.setState({ equal: formula.length ? "=" : "" });
    this.setState({ ans: wasm.calc(formula) });
  }

  addChar(c: string) {
    let formula = this.state.formula + c;
    this.setState({ formula: formula });
    this.setState({ ans: wasm.calc(formula) });
  }

  render() {
    return (
      <div className="calculator_frame">
        <div className="formula">
          <input
            type="text"
            value={this.state.formula}
            onChange={this.handleChange}
          />
          {this.state.equal} {this.state.ans}
        </div>
        <table>
          <tbody>
            <tr>
              {Object.keys([...Array(10)]).map((num) => (
                <td>
                  <button
                    className="calc_button"
                    onClick={() => this.addChar(`${num}`)}
                  >
                    {num}
                  </button>
                </td>
              ))}
            </tr>
            <tr>
              {["+", "-", "*", "/", "%", "(", ")"].map((op) => (
                <td>
                  <button
                    className="calc_button"
                    onClick={() => this.addChar(op)}
                  >
                    {op}
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const Calc = () => {
  return (
    <div>
      <h1>Calculator</h1>
      <CalcForm />
    </div>
  );
};

export default Calc;
