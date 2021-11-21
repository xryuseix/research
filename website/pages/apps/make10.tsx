/** @format */

import Make10Form from "../../components/make10puzzle";
import { Layout } from "../../components/Layout";
import styles from "../../styles/make10.module.scss";

const Calc = () => {
  return (
    <Layout title="Make 10 Puzzle" description="Make 10 Puzzleを解くプログラム">
      <div className={styles.body}>
        <div className={styles.container}>
        <Make10Form />
        </div>
      </div>
    </Layout>
  );
};

export default Calc;
