import { useMemo, useState } from "react";
import * as wasm from "make10puzzle";
import styles from "./make10puzzle.module.scss";

export default function Make10Form() {
  const [numbers, setNumbers] = useState(["1", "3", "3", "7"]);
  const answers = useMemo(() => {
    if (!numbers.every((number) => /^\d$/.test(number))) return ["[ERROR]"];
    return wasm
      .calc(new Int32Array(numbers.map(Number)))
      .split("\n")
      .filter(Boolean);
  }, [numbers]);

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.onboard_text + " " + styles.title}>
          Make 10 Puzzle
        </h1>
        <figure className={styles.onboard_text + " " + styles.quote}>
          <p>
            テンパズル（10パズル）は、4桁の数字を一桁の数字4つとみなし、これに四則演算などを用いて10を作る遊び。
            <br />
            <a
              href="https://ja.wikipedia.org/wiki/%E3%83%86%E3%83%B3%E3%83%91%E3%82%BA%E3%83%AB"
              className={styles.quote_link}
              rel="noopener noreferrer"
            >
              —Wikipedia, <cite>テンパズル</cite>
            </a>
          </p>
        </figure>
        <div className={styles.inputs}>
          {numbers.map((number, index) => (
            <input
              key={index}
              type="number"
              min={0}
              max={9}
              step={1}
              aria-label={String(index + 1) + "桁目"}
              value={number}
              onChange={(event) =>
                setNumbers((current) =>
                  current.map((value, position) =>
                    position === index ? event.target.value : value,
                  ),
                )
              }
              className={styles.number}
            />
          ))}
          <div
            className={styles.ans + " " + styles.onboard_text}
            aria-live="polite"
          >
            {answers.length ? (
              answers.map((answer, index) => <p key={index}>{answer}</p>)
            ) : (
              <p>解がありません</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.drops} aria-hidden="true">
        {[1, 2, 3, 4, 5].map((number) => (
          <div
            key={number}
            className={styles.drop + " " + styles["drop_" + number]}
          />
        ))}
      </div>
    </div>
  );
}
