/** @format */

import CalcForm from "../../components/calculator";
import { Layout } from "../../components/Layout";
import style from "../../styles/calc.module.css";

const Calc = () => {
  return (
    <Layout
      title="Calculator"
      description="Rustで書いたWebAssemblyを用いた高速で安全な電卓"
    >
      <div className={style.calc}>
        <h1>Calculator</h1>
        <div className={style.calc_frame}>
          <CalcForm />
        </div>
      </div>
    </Layout>
  );
};

export default Calc;
