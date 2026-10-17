import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import * as wasm from "calculator";
import calcStyles from "./calculator.module.scss";
import gamingStyles from "../styles/gaming.module.css";

const buttonRows = [
  ["(", ")", "%", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+", ""],
  ["0", "del", ""],
];
const modes = [
  { value: 0, label: "Normal" },
  { value: 1, label: "Gaming1" },
  { value: 2, label: "Gaming2" },
];
const modeClasses = ["", gamingStyles.gaming1, gamingStyles.gaming2];

export default function CalcForm() {
  const [formula, setFormula] = useState("((1+3)*-2)*3");
  const [mode, setMode] = useState(0);
  const modeClass = modeClasses[mode];
  const answer = formula.trim() ? wasm.calc(formula) : "0";

  return (
    <>
      <Box sx={{ width: 300, maxWidth: "100%" }}>
        <Slider
          aria-label="表示モード"
          value={mode}
          min={0}
          max={2}
          step={1}
          marks={modes}
          onChange={(_, value) => setMode(value as number)}
        />
      </Box>
      <div className={calcStyles.calculator_frame + " " + modeClass}>
        <div className={calcStyles.formula}>
          <input
            aria-label="計算式"
            type="text"
            value={formula}
            onChange={(event) => setFormula(event.target.value)}
            className={calcStyles.input + " " + modeClass}
          />
          <div className={calcStyles.formula_ans} aria-live="polite">
            = {answer}
          </div>
        </div>
        <div>
          {buttonRows.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((button, columnIndex) => {
                const modifier =
                  button === "+"
                    ? calcStyles.calc_button_add
                    : button === "del"
                      ? calcStyles.calc_button_del
                      : button === ""
                        ? calcStyles.calc_button_null
                        : "";
                return (
                  <button
                    key={columnIndex}
                    type="button"
                    disabled={!button}
                    aria-hidden={!button || undefined}
                    aria-label={button === "del" ? "一文字削除" : undefined}
                    className={[
                      calcStyles.calc_button,
                      modifier,
                      modeClass,
                    ].join(" ")}
                    onClick={() =>
                      setFormula((current) =>
                        button === "del"
                          ? current.slice(0, -1)
                          : current + button,
                      )
                    }
                  >
                    {button}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
