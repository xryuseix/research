import { useState } from "react";
import BackspaceOutlined from "@mui/icons-material/BackspaceOutlined";
import * as wasm from "calculator";
import styles from "./calculator.module.scss";
import gamingStyles from "../styles/gaming.module.css";
const keys = [
  "(",
  ")",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  "del",
];
const modeClasses = ["", gamingStyles.gaming1, gamingStyles.gaming2];
export default function CalcForm() {
  const [formula, setFormula] = useState("((1+3)*-2)*3");
  const [mode, setMode] = useState(0);
  const answer = formula.trim() ? wasm.calc(formula) : "0";
  return (
    <section
      aria-label="電卓"
      className={styles.calculator + " " + modeClasses[mode]}
    >
      <div className={styles.top}>
        <span>THE CALCULATOR</span>
        <span className={styles.version}>WASM / 01</span>
      </div>
      <div className={styles.display}>
        <label htmlFor="formula">EXPRESSION</label>
        <input
          id="formula"
          aria-label="計算式"
          type="text"
          value={formula}
          autoComplete="off"
          spellCheck={false}
          onChange={(event) => setFormula(event.target.value)}
        />
        <div className={styles.result}>
          <span>=</span>
          <output aria-live="polite">{answer}</output>
        </div>
      </div>
      <div className={styles.keypad}>
        {keys.map((key) => (
          <button
            key={key}
            type="button"
            aria-label={key === "del" ? "一文字削除" : key}
            className={[
              styles.key,
              "+-*/%()".includes(key) ? styles.operator : "",
              key === "+" ? styles.plus : "",
              key === "0" ? styles.zero : "",
              key === "del" ? styles.delete : "",
            ].join(" ")}
            onClick={() =>
              setFormula((current) =>
                key === "del" ? current.slice(0, -1) : current + key,
              )
            }
          >
            {key === "del" ? (
              <BackspaceOutlined sx={{ fontSize: 20 }} />
            ) : key === "*" ? (
              "×"
            ) : key === "/" ? (
              "÷"
            ) : key === "-" ? (
              "−"
            ) : (
              key
            )}
          </button>
        ))}
      </div>
      <div className={styles.modes}>
        <span>Appearance</span>
        <div role="group" aria-label="表示モード">
          {["Normal", "Gaming 1", "Gaming 2"].map((label, index) => (
            <button
              key={label}
              type="button"
              aria-pressed={mode === index}
              onClick={() => setMode(index)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
