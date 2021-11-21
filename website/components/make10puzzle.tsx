/** @format */

import React from "react";
import * as wasm from "make10puzzle";
import styles from "./make10puzzle.module.scss";

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
      <div className={`${styles.body}`}>
        <div className={`${styles.container}`}>
          <h1 className={`${styles.onboard_text} ${styles.title}`}>
            Make 10 Puzzle
          </h1>
          <figure className={`${styles.onboard_text} ${styles.quote}`}>
            <p>
              テンパズル（10パズル）は、4桁の数字を一桁の数字4つとみなし、これに四則演算などを用いて10を作る遊び。メイクテン（make10）とも呼ばれる。
            </p>
            <figcaption>
              <a
                href="https://ja.wikipedia.org/wiki/%E3%83%86%E3%83%B3%E3%83%91%E3%82%BA%E3%83%AB"
                className={styles.quote_link}
              >
                —Wikipedia, <cite>テンパズル</cite>
              </a>
            </figcaption>
          </figure>
          <div>
            <div>
              {[...Array(4)].map((_v, idx) => (
                <input
                  type="text"
                  value={this.state.numbers[idx]}
                  maxLength={1}
                  id={`${idx}`}
                  key={`${idx}`}
                  onChange={this.handleChange}
                  className={styles.number}
                />
              ))}
              <div>
                {this.state.ans.map((ans) => (
                  <p key={ans} className={`${styles.onboard_text}`}>
                    {ans}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.drops}>
          <div className={`${styles.drop} ${styles.drop_1}`}></div>
          <div className={`${styles.drop} ${styles.drop_2}`}></div>
          <div className={`${styles.drop} ${styles.drop_3}`}></div>
          <div className={`${styles.drop} ${styles.drop_4}`}></div>
          <div className={`${styles.drop} ${styles.drop_5}`}></div>
        </div>
      </div>
    );
  }
}

export default Make10Form;
