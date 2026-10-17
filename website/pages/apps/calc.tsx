import dynamic from "next/dynamic";
import { Layout } from "../../components/Layout";
import PageHeading from "../../components/PageHeading";
import styles from "../../styles/calc.module.css";
const CalcForm = dynamic(() => import("../../components/calculator"), {
  ssr: false,
  loading: () => (
    <p className="status" role="status">
      WebAssemblyを読み込み中…
    </p>
  ),
});
export default function Calc() {
  return (
    <Layout
      title="Calculator — Research"
      description="RustとWebAssemblyで動く電卓"
    >
      <PageHeading
        category="PLAYGROUND / 01"
        title="Calculator"
        description="思いついた数式を、そのまま。WebAssemblyがブラウザの中で計算します。"
      />
      <div className={styles.workspace}>
        <CalcForm />
        <aside className={styles.notes}>
          <span className="eyebrow">A QUICK GUIDE</span>
          <h2>Keep it simple.</h2>
          <p>
            キーボードでも、画面のボタンでも。数式を変えると答えがすぐに更新されます。
          </p>
          <dl>
            <div>
              <dt>四則演算</dt>
              <dd>+ − * /</dd>
            </div>
            <div>
              <dt>剰余</dt>
              <dd>%</dd>
            </div>
            <div>
              <dt>優先順位</dt>
              <dd>( )</dd>
            </div>
          </dl>
          <div className={styles.noteBottom}>
            <span className={styles.dot} />
            Powered by Rust & WebAssembly
          </div>
        </aside>
      </div>
    </Layout>
  );
}
