/** @format */

import React from "react";
import * as wasm from "make10puzzle";

type Props = {};

interface State {
  numbers: string[];
  ans: string[];
}

class Make10Form extends React.Component<{}, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      numbers: ["1", "3", "3", "7"],
      ans: [
        "(1 + 7 / 3) * 3",
        "(7 / 3 + 1) * 3",
        "3 * (1 + 7 / 3)",
        "3 * (7 / 3 + 1)",
      ],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  reCalc(numbers: Int32Array) {
    const ans = wasm.calc(numbers).split("\n");
    console.log(ans);
    this.setState({ ans: ans });
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const num = event.target.value;
    const idx = 0;
    let currentNumbers = this.state.numbers;
    currentNumbers[idx] = num;
    this.setState({ numbers: currentNumbers });

    if (
      currentNumbers.includes("") ||
      currentNumbers.filter((num) => num.match(/\d{1}/)).length !== 4
    ) {
      this.setState({ ans: ["[ERROR]"] });
      return;
    }

    const newNumbers = new Int32Array(currentNumbers.map((num) => +num));
    this.reCalc(newNumbers);
  }

  render() {
    return (
      <>
        <div>
          <div>
            <input
              type="text"
              value={this.state.numbers[0]}
              maxLength={1}
              onChange={this.handleChange}
            />
            <input
              type="text"
              value={this.state.numbers[1]}
              maxLength={1}
              onChange={this.handleChange}
            />
            <input
              type="text"
              value={this.state.numbers[2]}
              maxLength={1}
              onChange={this.handleChange}
            />
            <input
              type="text"
              value={this.state.numbers[3]}
              maxLength={1}
              onChange={this.handleChange}
            />
            <div>
              {this.state.ans.map((ans) => (
                <p key={ans}>{ans}</p>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Make10Form;
