/** @format */

import dynamic from "next/dynamic";

const Make10Form = dynamic(() => import("../../components/make10puzzle"), {
  ssr: false,
  loading: () => <p role="status">WebAssemblyを読み込み中…</p>,
});
import { Layout } from "../../components/Layout";
import styles from "../../styles/make10.module.scss";

const Make10 = () => {
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

export default Make10;
