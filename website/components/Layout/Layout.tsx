/** @format */

import { FC } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

import styles from "./Layout.module.css";

export const Layout: FC<{
  headerChild?: JSX.Element;
  home?: boolean;
}> = ({ children, headerChild, home }) => (
  <div>
    <Header>{headerChild}</Header>
    <main className={styles.main}>{children}</main>
    <Footer home={home} />
  </div>
);
