import { useMemo, useState } from "react";
import ArrowForward from "@mui/icons-material/ArrowForward";
import * as wasm from "make10puzzle";
import styles from "./make10puzzle.module.scss";
export default function Make10Form() {
  const [numbers, setNumbers] = useState(["1", "3", "3", "7"]);
  const valid = numbers.every((number) => /^\d$/.test(number));
  const answers = useMemo(() => {
    if (!numbers.every((number) => /^\d$/.test(number))) return [];
    return wasm
      .calc(new Int32Array(numbers.map(Number)))
      .split("\n")
      .filter(Boolean);
  }, [numbers]);
  return (
    <div className={styles.workspace}>
      <section className={"surface " + styles.inputPanel}>
        <span className="eyebrow">YOUR FOUR NUMBERS</span>
        <h2>Start with a few digits.</h2>
        <p>0〜9の数字を、ひとつずつ入力してください。</p>
        <div className={styles.inputs}>
          {numbers.map((number, index) => (
            <div key={index}>
              <label htmlFor={"digit-" + index}>0{index + 1}</label>
              <input
                id={"digit-" + index}
                type="number"
                inputMode="numeric"
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
              />
            </div>
          ))}
        </div>
        <div className={styles.target}>
          <span>TARGET NUMBER</span>
          <ArrowForward sx={{ fontSize: 18 }} />
          <strong>10</strong>
        </div>
        <div className={styles.instructions}>
          <span className="eyebrow">HOW IT WORKS</span>
          <p>
            4つの数字をそれぞれ一度ずつ使い、四則演算と括弧を組み合わせて10をつくります。入力に合わせて、見つかった解を表示します。
          </p>
          <a
            href="https://ja.wikipedia.org/wiki/%E3%83%86%E3%83%B3%E3%83%91%E3%82%BA%E3%83%AB"
            target="_blank"
            rel="noopener noreferrer"
          >
            テンパズルについて ↗
          </a>
        </div>
      </section>
      <section className={"surface " + styles.results} aria-label="計算結果">
        <div className={styles.resultsHeader}>
          <div>
            <span className="eyebrow">THE POSSIBILITIES</span>
            <h2>Solutions</h2>
          </div>
          <span className={styles.count}>
            {valid ? answers.length : "—"} found
          </span>
        </div>
        <div className={styles.answerList} aria-live="polite">
          {!valid ? (
            <div className={styles.empty}>
              <strong>数字を確認してください</strong>
              <p>0〜9の数字を4つ入力すると、解が表示されます。</p>
            </div>
          ) : answers.length ? (
            <ol>
              {answers.map((answer, index) => (
                <li key={index}>
                  <span className={styles.answerIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <code>{answer}</code>
                  <span className={styles.equals}>= 10</span>
                </li>
              ))}
            </ol>
          ) : (
            <div className={styles.empty}>
              <strong>解がありません</strong>
              <p>別の数字の組み合わせを試してみましょう。</p>
            </div>
          )}
        </div>
        <div className={styles.resultFooter}>
          <span className={styles.statusDot} />
          Computed locally with WebAssembly
        </div>
      </section>
    </div>
  );
}
