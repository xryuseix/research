import Link from "next/link";
import CalculateOutlined from "@mui/icons-material/CalculateOutlined";
import GridViewOutlined from "@mui/icons-material/GridViewOutlined";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import { Layout } from "../components/Layout";
import styles from "../styles/Home.module.css";
const experiments = [
  {
    href: "/apps/calc",
    number: "01",
    name: "Calculator",
    label: "EVERYDAY MATH",
    description:
      "数式を入力するだけで、答えをすぐに。RustとWebAssemblyで動くシンプルな電卓。",
    icon: CalculateOutlined,
    color: "blue",
    tag: "Interactive tool",
  },
  {
    href: "/apps/make10",
    number: "02",
    name: "Make 10 Puzzle",
    label: "A LITTLE CHALLENGE",
    description:
      "4つの数字と四則演算で、10をつくる。思いつかなかった組み合わせを見つけよう。",
    icon: GridViewOutlined,
    color: "orange",
    tag: "Puzzle solver",
  },
];
export default function Home() {
  return (
    <Layout
      home
      title="Research — A Personal Lab"
      description="研究から生まれた、小さな実験とツール。"
    >
      <section className={styles.hero}>
        <span className="eyebrow">WELCOME TO MY PERSONAL LAB</span>
        <h1>
          Small experiments.
          <br />
          <span>Useful discoveries.</span>
        </h1>
        <p>
          研究から生まれた、小さな実験とツール。
          <br />
          気になることを試して、つくって、ここに残しています。
        </p>
        <a
          href="https://github.com/xryuseix/research"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.heroLink}
        >
          Explore the source
          <ArrowOutward sx={{ fontSize: 16 }} />
        </a>
        <div className={styles.heroArt} aria-hidden="true">
          <span className={styles.orbit} />
          <span className={styles.artSquare} />
          <span className={styles.artDot} />
          <span className={styles.artFormula}>
            make
            <br />
            <b>10.</b>
          </span>
          <span className={styles.artLabel}>IDEAS INTO CODE</span>
        </div>
      </section>
      <section>
        <div className={styles.sectionHeading}>
          <div>
            <span className="eyebrow">EXPLORE & EXPERIMENT</span>
            <h2>The playground</h2>
          </div>
          <span className={styles.sectionNote}>Try something out.</span>
        </div>
        <div className={styles.grid}>
          {experiments.map(
            ({
              href,
              number,
              name,
              label,
              description,
              icon: Icon,
              color,
              tag,
            }) => (
              <Link href={href} key={href} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.cardIcon + " " + styles[color]}>
                    <Icon sx={{ fontSize: 27 }} />
                  </span>
                  <span className={styles.cardNumber}>/ {number}</span>
                </div>
                <span className={styles.cardEyebrow}>{label}</span>
                <h3>{name}</h3>
                <p>{description}</p>
                <div className={styles.cardBottom}>
                  <span>{tag}</span>
                  <span className={styles.arrow}>
                    <ArrowForward sx={{ fontSize: 18 }} />
                  </span>
                </div>
              </Link>
            ),
          )}
        </div>
      </section>
      <Link href="/info/tech" className={styles.techLink}>
        <div>
          <span className="eyebrow">UNDER THE HOOD</span>
          <h2>A look behind the experiments</h2>
          <p>このサイトを支える技術について。</p>
        </div>
        <span className={styles.techAction}>
          Technologies <ArrowForward sx={{ fontSize: 18 }} />
        </span>
      </Link>
    </Layout>
  );
}
