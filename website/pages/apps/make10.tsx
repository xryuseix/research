/** @format */

import Make10Form from "../../components/make10puzzle";
import { Layout } from "../../components/Layout";
import style from "../../styles/calc.module.css";

const Calc = () => {
  return (
    <Layout title="Make 10 Puzzle" description="Make 10 Puzzleを解くプログラム">
      <div className={style.calc}>
        <h1>Make 10 Puzzle</h1>
        <figure>
          <blockquote cite="https://ja.wikipedia.org/wiki/%E3%83%86%E3%83%B3%E3%83%91%E3%82%BA%E3%83%AB">
            <p>
              テンパズル（10パズル）は、4桁の数字を一桁の数字4つとみなし、これに四則演算などを用いて10を作る遊び。メイクテン（make10）とも呼ばれる。
            </p>
          </blockquote>
          <figcaption>
            —Wikipedia, <cite>テンパズル</cite>
          </figcaption>
        </figure>
        <div className={style.calc_frame}>
          <Make10Form />{" "}
        </div>
      </div>
    </Layout>
  );
};

export default Calc;
