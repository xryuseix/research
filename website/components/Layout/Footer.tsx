import styles from "./Shell.module.css";
export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} Ryusei Ishikawa</span>
      <span>Made with curiosity.</span>
    </footer>
  );
}
