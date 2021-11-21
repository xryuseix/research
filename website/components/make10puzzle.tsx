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
    const id2idx = (id: string) => {
      switch (id) {
        case "text0":
          return 0;
        case "text1":
          return 1;
        case "text2":
          return 2;
        case "text3":
          return 3;
        default:
          return 0;
      }
    };
    const idx = id2idx(id);
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
              id="text0"
              onChange={this.handleChange}
            />
            <input
              type="text"
              value={this.state.numbers[1]}
              maxLength={1}
              id="text1"
              onChange={this.handleChange}
            />
            <input
              type="text"
              value={this.state.numbers[2]}
              maxLength={1}
              id="text2"
              onChange={this.handleChange}
            />
            <input
              type="text"
              value={this.state.numbers[3]}
              maxLength={1}
              id="text3"
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
