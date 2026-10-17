import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import CalculateOutlined from "@mui/icons-material/CalculateOutlined";
import GridViewOutlined from "@mui/icons-material/GridViewOutlined";
import LayersOutlined from "@mui/icons-material/LayersOutlined";
import GitHub from "@mui/icons-material/GitHub";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import styles from "./Shell.module.css";

const navigation = [
  {
    label: "WORKSPACE",
    items: [
      { href: "/", title: "Overview", icon: HomeOutlined },
      { href: "/info/tech", title: "Technologies", icon: LayersOutlined },
    ],
  },
  {
    label: "PLAYGROUND",
    items: [
      { href: "/apps/calc", title: "Calculator", icon: CalculateOutlined },
      { href: "/apps/make10", title: "Make 10 Puzzle", icon: GridViewOutlined },
    ],
  },
];

export default function MenuBar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();
  const sidebar = (mobile = false) => (
    <div className={styles.sidebarInner}>
      <div className={styles.brandRow}>
        <Link
          href="/"
          className={styles.brand}
          onClick={() => setOpen(false)}
          aria-label="Research ホーム"
        >
          <span className={styles.brandMark}>
            r<span>.</span>
          </span>
          <span>
            Research<span className={styles.brandCaption}>A PERSONAL LAB</span>
          </span>
        </Link>
        {mobile && (
          <button
            className={styles.iconButton}
            onClick={() => setOpen(false)}
            aria-label="メニューを閉じる"
          >
            <CloseIcon fontSize="small" />
          </button>
        )}
      </div>
      <nav aria-label="サイトナビゲーション" className={styles.navigation}>
        {navigation.map((group) => (
          <div key={group.label} className={styles.navGroup}>
            <p className={styles.navLabel}>{group.label}</p>
            {group.items.map(({ href, title, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={pathname === href ? "page" : undefined}
                className={
                  styles.navLink +
                  (pathname === href ? " " + styles.active : "")
                }
              >
                <Icon sx={{ fontSize: 20 }} />
                <span>{title}</span>
                {pathname === href && <span className={styles.activeDot} />}
              </Link>
            ))}
          </div>
        ))}
      </nav>
      <div className={styles.sidebarBottom}>
        <a
          href="https://github.com/xryuseix/research"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.repository}
        >
          <GitHub sx={{ fontSize: 19 }} />
          <span>View source code</span>
          <ArrowOutward sx={{ fontSize: 15 }} />
        </a>
        <div className={styles.author}>
          <span className={styles.avatar}>RI</span>
          <div>
            <strong>Ryusei Ishikawa</strong>
            <span>Notes, code & experiments</span>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <aside className={styles.sidebar}>{sidebar()}</aside>
      <div className={styles.mobileBar}>
        <Link href="/" className={styles.mobileBrand}>
          Research<span>.</span>
        </Link>
        <button
          className={styles.iconButton}
          aria-label="メニューを開く"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </button>
      </div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: { sx: { width: 270, maxWidth: "90vw", background: "#fff" } },
        }}
      >
        {sidebar(true)}
      </Drawer>
    </>
  );
}
