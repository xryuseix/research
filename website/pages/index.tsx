import Link from "next/link";
import CalculateOutlined from "@mui/icons-material/CalculateOutlined";
import GridViewOutlined from "@mui/icons-material/GridViewOutlined";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { Layout } from "../components/Layout";
import styles from "../styles/Home.module.css";
const apps = [
  {
    href: "/apps/calc",
    name: "Calculator",
    description: "RustとWebAssemblyで動く、シンプルな電卓。",
    icon: CalculateOutlined,
  },
  {
    href: "/apps/make10",
    name: "Make 10 Puzzle",
    description: "4つの数字と四則演算で、10をつくるパズル。",
    icon: GridViewOutlined,
  },
];
export default function Home() {
  return (
    <Layout
      home
      title="Research Page"
      description="研究室で書いたコードや調べた内容を記録しています。"
    >
      <div className={styles.content}>
        <header className={styles.intro}>
          <h1>Research Page</h1>
          <p>研究室で書いたコードや調べた内容を記録しています。</p>
        </header>
        <section aria-labelledby="apps-heading">
          <h2 id="apps-heading" className={styles.sectionTitle}>
            Apps
          </h2>
          <div className={styles.apps}>
            {apps.map(({ href, name, description, icon: Icon }) => (
              <Link key={href} href={href} className={styles.app}>
                <span className={styles.icon}>
                  <Icon sx={{ fontSize: 22 }} />
                </span>
                <div>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
                <ArrowForward className={styles.arrow} sx={{ fontSize: 18 }} />
              </Link>
            ))}
          </div>
        </section>
        <nav className={styles.links} aria-label="関連リンク">
          <Link href="/info/tech">このサイトの技術構成</Link>
          <a
            href="https://github.com/xryuseix/research"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </nav>
      </div>
    </Layout>
  );
}
