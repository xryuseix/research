/** @format */

import React from "react";
import * as wasm from "calculator";
import calcStyles from "./calculator.module.scss";

type Props = {
  title: string;
};

interface State {
  formula: string;
  ans: string;
}

class CalcForm extends React.Component<{}, State> {
  constructor(props: Props) {
    super(props);
    this.state = { formula: "((1+3)*-2)*3", ans: "-24" };
    this.handleChange = this.handleChange.bind(this);
  }

  reCalc(formula: string) {
    if (formula.length > 0) {
      let ans = wasm.calc(formula);
      this.setState({ ans: ans });
    } else {
      this.setState({ ans: "0" });
    }
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let formula = event.target.value;
    this.setState({ formula: formula });
    this.reCalc(formula);
  }

  addChar(c: string) {
    let formula = this.state.formula + c;
    this.setState({ formula: formula });
    this.reCalc(formula);
  }

  deleteChar() {
    if (this.state.formula.length > 0) {
      let formula = this.state.formula.slice(0, -1);
      this.setState({ formula: formula });
      this.reCalc(formula);
    }
  }

  render() {

    return (
      <div className={calcStyles.calculator_frame}>
        <div className={calcStyles.formula}>
          <input
            type="text"
            value={this.state.formula}
            onChange={this.handleChange}
            className={calcStyles.input}
          />
          <div className={calcStyles.formula_ans}>= {this.state.ans}</div>
        </div>
        <div>
          <div className={calcStyles.calc_button_num}>
            {Object.keys([...Array(10)]).map((num) => (
              <button
                className={calcStyles.calc_button}
                onClick={() => this.addChar(`${num}`)}
                key={num}
              >
                {num}
              </button>
            ))}
          </div>
          <div className={calcStyles.calc_button_op}>
            {["+", "-", "*", "/", "%", "(", ")"].map((op) => (
              <button
                className={calcStyles.calc_button}
                onClick={() => this.addChar(op)}
                key={op}
              >
                {op}
              </button>
            ))}
            <button
              className={`${calcStyles.calc_button} ${calcStyles.red}`}
              onClick={() => this.deleteChar()}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcForm;
