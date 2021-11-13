/** @format */
import Link from "next/link";

import styles from "./Layout.module.css";

interface Props {
  home?: boolean;
}

export const Footer: React.FC<Props> = ({ home }: Props) => {
  return (
    <footer className={styles.footer}>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <div className={styles.footerName}>
        © 2021,{" "}
        <a
          href="https://xryuseix.github.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/research/favicon.ico"
            alt="xryuseix Logo"
            width={20}
            height={20}
            className={styles.logo}
          />
          Ryusei Ishikawa
        </a>{" "}
        All Right Reserved.
      </div>
    </footer>
  );
};
