import { Layout } from "../../components/Layout";
import PageHeading from "../../components/PageHeading";
import TechnologyDiagram from "../../components/TechnologyDiagram";
import styles from "../../styles/tech.module.css";
const stack = [
  {
    title: "Next.js + React",
    label: "INTERFACE",
    description: "ページの構成と、入力に応えるインターフェース。",
  },
  {
    title: "Rust + WebAssembly",
    label: "COMPUTATION",
    description: "電卓とテンパズルの計算を、ブラウザの中で。",
  },
  {
    title: "TypeScript + Docker",
    label: "DEVELOPMENT",
    description: "型による検証と、再現できる開発環境。",
  },
];
export default function Tech() {
  return (
    <Layout
      title="Technologies — Research"
      description="このサイトを支える技術"
    >
      <PageHeading
        category="WORKSPACE / UNDER THE HOOD"
        title="Technologies"
        description="インターフェースはシンプルに。計算の仕組みは、その一歩奥に。"
      />
      <div className={styles.stack}>
        {stack.map((item, index) => (
          <section className="surface" key={item.title}>
            <span className={styles.number}>0{index + 1}</span>
            <span className="eyebrow">{item.label}</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </section>
        ))}
      </div>
      <section className={"surface " + styles.diagram}>
        <header className={styles.diagramHeader}>
          <span className="eyebrow">SITE ARCHITECTURE</span>
          <h2>How it comes together</h2>
          <p>ソースコードから公開までの流れ。</p>
        </header>
        <TechnologyDiagram />
      </section>
    </Layout>
  );
}
