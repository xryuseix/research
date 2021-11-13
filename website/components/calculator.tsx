/** @format */

import React from "react";
import * as wasm from "calculator";
import calcStyles from "./calculator.module.css";

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
      <div className={calcStyles.calculator_frame}>
        <div className={calcStyles.formula}>
          <input
            type="text"
            value={this.state.formula}
            onChange={this.handleChange}
          />
          {this.state.equal} {this.state.ans}
        </div>
        <table>
          <tbody>
            <tr className={calcStyles.calc_button_num}>
              {Object.keys([...Array(10)]).map((num) => (
                <td>
                  <button
                    className={calcStyles.calc_button}
                    onClick={() => this.addChar(`${num}`)}
                  >
                    {num}
                  </button>
                </td>
              ))}
            </tr>
            <tr className={calcStyles.calc_button_op}>
              {["+", "-", "*", "/", "%", "(", ")"].map((op) => (
                <td>
                  <button
                    className={calcStyles.calc_button}
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

export default CalcForm;
