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
        <h1 className={styles.title}>Welcome to My Research Page!</h1>

        <p className={styles.description}>
          Programs and Document related to the Research.
        </p>
      </div>
    </Layout>
  );
};

export default Home;
