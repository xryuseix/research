/** @format */

import utilStyles from "../../styles/utils.module.css";
import styles from "./layout.module.css";
import Link from "next/link";
import Image from "next/image";

interface Props {
  home?: boolean;
}

export const Footer: React.FC<Props> = ({ home }: Props) => {
  return (
    <footer className={styles.footer}>
      {!home && (
        <div className={utilStyles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <a
        href="https://xryuseix.github.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <span className={styles.logo}>
          <img
            src="/research/favicon.ico"
            alt="xryuseix Logo"
            width={20}
            height={20}
          />
        </span>
      </a>
    </footer>
  );
};
