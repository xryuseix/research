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
    this.setState({ ans: ans });
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const id = event.target.id;
    const num = event.target.value;
    const idx = id.match(/[0123]{1}/) ? +id : 0;
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
          {[...Array(4)].map((_v, idx) => (
            <>
              {console.log(idx)}
              <input
                type="text"
                value={this.state.numbers[idx]}
                maxLength={1}
                id={`${idx}`}
                key={`${idx}`}
                onChange={this.handleChange}
              />
            </>
          ))}
          <div>
            {this.state.ans.map((ans) => (
              <p key={ans}>{ans}</p>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Make10Form;
