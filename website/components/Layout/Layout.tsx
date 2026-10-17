import type { ReactNode } from "react";
import { Footer } from "./Footer";
import MenuBar from "./MenuBar";
import Header from "./Header";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: ReactNode;
  headerChild?: ReactNode;
  home?: boolean;
  title?: string;
  description?: string;
};

export function Layout({
  children,
  headerChild,
  home,
  title,
  description,
}: LayoutProps) {
  return (
    <div>
      <MenuBar>{headerChild}</MenuBar>
      <Header title={title} description={description} />
      <main className={styles.main}>{children}</main>
      <Footer home={home} />
    </div>
  );
}
