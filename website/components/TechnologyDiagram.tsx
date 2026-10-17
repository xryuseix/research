import styles from "./TechnologyDiagram.module.css";
const assetPath = "/research/tech-icons/";
const technologies = [
  {
    category: "WebAssembly",
    items: [
      { name: "Rust", image: "rust.png" },
      { name: "wasm-pack", image: "wasm-pack.png" },
    ],
  },
  {
    category: "Front-end",
    items: [
      { name: "Next.js", image: "nextjs.png" },
      { name: "TypeScript", image: "typescript.png" },
    ],
  },
];
function Connector({ label }: { label: string }) {
  return (
    <div className={styles.connector} aria-hidden="true">
      <span>{label}</span>
      <i />
    </div>
  );
}
export default function TechnologyDiagram() {
  return (
    <figure className={styles.diagram}>
      <div className={styles.flow}>
        <section className={styles.source} aria-label="ソースコード">
          <a
            href="https://github.com/xryuseix/research"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.repository}
          >
            <img src={assetPath + "github.png"} alt="" width={24} height={24} />
            <div>
              <h3>GitHub</h3>
              <span>xryuseix/research ↗</span>
            </div>
          </a>
          {technologies.map(({ category, items }) => (
            <div key={category} className={styles.technologyGroup}>
              <h4>{category}</h4>
              <div className={styles.pair}>
                {items.map(({ name, image }, index) => (
                  <div key={name} className={styles.technology}>
                    {index > 0 && (
                      <span className={styles.plus} aria-hidden="true">
                        +
                      </span>
                    )}
                    <div className={styles.logoBox}>
                      <img
                        src={assetPath + image}
                        alt=""
                        width={80}
                        height={64}
                      />
                    </div>
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
        <Connector label="ビルド" />
        <section className={styles.stage} aria-label="ビルドとデプロイ">
          <img
            src={assetPath + "github-actions.png"}
            alt=""
            width={64}
            height={64}
            className={styles.stageLogo}
          />
          <h3>GitHub Actions</h3>
          <p>ビルド・デプロイ</p>
        </section>
        <Connector label="公開" />
        <section className={styles.stage} aria-label="Webサイトの公開">
          <img
            src={assetPath + "github-pages.png"}
            alt=""
            width={140}
            height={100}
            className={styles.pagesLogo}
          />
          <h3>GitHub Pages</h3>
          <a
            href="https://xryuseix.github.io/research"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.siteLink}
          >
            公開サイト ↗
          </a>
        </section>
      </div>
      <figcaption>
        GitHub上のソースコードをGitHub Actionsでビルドし、GitHub
        Pagesへ公開します。
      </figcaption>
    </figure>
  );
}
