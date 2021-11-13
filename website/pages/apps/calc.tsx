/** @format */

import CalcForm from "../../components/calculator";
import { Layout } from "../../components/Layout";

const Calc = () => {
  return (
    <Layout
      title="Calculator"
      description="Rustで書いたWebAssemblyを用いた高速で安全な電卓"
    >
      <h1>Calculator</h1>
      <CalcForm />
    </Layout>
  );
};

export default Calc;
