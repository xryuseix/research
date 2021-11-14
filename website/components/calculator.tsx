/** @format */

import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import * as wasm from "calculator";

import calcStyles from "./calculator.module.scss";
import gamingStyles from "../styles/gaming.module.css";

import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

type Props = {
  title: string;
};

interface State {
  formula: string;
  ans: string;
  alignment: string | null;
  styleMode: string | null;
}

class CalcForm extends React.Component<{}, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      formula: "((1+3)*-2)*3",
      ans: "-24",
      alignment: "normal",
      styleMode: "",
    };
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

  modeChange = (event: React.MouseEvent<HTMLElement>) => {
    let value = event.currentTarget.getAttribute("value");
    this.setState({ alignment: value });
    if (value == "normal") {
      this.setState({ styleMode: "" });
    } else if (value == "gaming1") {
      this.setState({ styleMode: gamingStyles.gaming1 });
    } else if (value == "gaming2") {
      this.setState({ styleMode: gamingStyles.gaming2 });
    }
  };

  render() {
    const buttonPrints = [
      ["(", ")", "%", "/"],
      ["7", "8", "9", "*"],
      ["4", "5", "6", "-"],
      ["1", "2", "3", "+", ""],
      ["0", "del", ""],
    ];

    return (
      <>
        <ToggleButtonGroup
          color="primary"
          value={this.state.alignment}
          exclusive
          onChange={this.modeChange}
        >
          <ToggleButton value="normal">
            <RadioButtonCheckedIcon />
          </ToggleButton>
          <ToggleButton value="gaming1">
            <VideogameAssetIcon />
          </ToggleButton>
          <ToggleButton value="gaming2">
            <SportsEsportsIcon/>
          </ToggleButton>
        </ToggleButtonGroup>
        <div
          className={`${calcStyles.calculator_frame} ${this.state.styleMode}`}
        >
          <div className={calcStyles.formula}>
            <input
              type="text"
              value={this.state.formula}
              onChange={this.handleChange}
              className={`${calcStyles.input} ${this.state.styleMode}`}
            />
            <div className={calcStyles.formula_ans}>= {this.state.ans}</div>
          </div>
          <div>
            {buttonPrints.map((buttonsRow) => {
              return (
                <div key={buttonsRow.toString()}>
                  {buttonsRow.map((button) => {
                    let buttonClassName = `${calcStyles.calc_button}`;
                    if (button == "+") {
                      buttonClassName += ` ${calcStyles.calc_button_add}`;
                    } else if (button == "del") {
                      buttonClassName += ` ${calcStyles.calc_button_del}`;
                    } else if (button == "") {
                      buttonClassName += ` ${calcStyles.calc_button_null}`;
                    }
                    return (
                      <button
                        className={`${buttonClassName} ${this.state.styleMode}`}
                        onClick={() =>
                          button != "del"
                            ? this.addChar(`${button}`)
                            : this.deleteChar()
                        }
                        key={button}
                      >
                        {button}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default CalcForm;
