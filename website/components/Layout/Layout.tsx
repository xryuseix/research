import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Footer } from "./Footer";
import MenuBar from "./MenuBar";
import Header from "./Header";
import styles from "./Shell.module.css";
const pageNames: Record<string, string> = {
  "/": "Overview",
  "/apps/calc": "Calculator",
  "/apps/make10": "Make 10 Puzzle",
  "/info/tech": "Technologies",
};
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
  title,
  description,
}: LayoutProps) {
  const { pathname } = useRouter();
  return (
    <div className={styles.shell}>
      <a href="#main-content" className="skip-link">
        本文へスキップ
      </a>
      <Header title={title} description={description} />
      <MenuBar />
      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <div className={styles.breadcrumb}>
            <Link href="/">Workspace</Link>
            <span>/</span>
            <span>{pageNames[pathname] ?? title}</span>
          </div>
          <span className={styles.labBadge}>
            <i />
            Personal research
          </span>
        </header>
        <main id="main-content" className={styles.main}>
          {headerChild}
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
