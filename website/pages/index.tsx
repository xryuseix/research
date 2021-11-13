/** @format */

import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "../components/Layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Layout
      home
      title="Research Home Page"
      description="研究室で書いたコードや調べた内容などをこのサイトに記録します"
    >
      <div className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href="/apps/calc">Next.js!</Link>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>
      </div>
    </Layout>
  );
};

export default Home;
