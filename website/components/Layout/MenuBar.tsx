import { useState, type ReactNode } from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CalculateIcon from "@mui/icons-material/Calculate";
import InfoIcon from "@mui/icons-material/Info";
import CodeIcon from "@mui/icons-material/Code";
import GitHubIcon from "@mui/icons-material/GitHub";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExtensionIcon from "@mui/icons-material/Extension";

type NavigationItem = {
  href: string;
  label: string;
  description?: string;
  icon: ReactNode;
};
const home: NavigationItem = { href: "/", label: "Home", icon: <HomeIcon /> };
const info: NavigationItem[] = [
  {
    href: "/info/tech",
    label: "Tech",
    description: "このサイトを構成する技術",
    icon: <CodeIcon />,
  },
  {
    href: "https://github.com/xryuseix/research",
    label: "Repository",
    description: "xryuseix/research",
    icon: <GitHubIcon />,
  },
];
const apps: NavigationItem[] = [
  {
    href: "/apps/calc",
    label: "Calculator",
    description: "Computing with WebAssembly",
    icon: <CalculateIcon />,
  },
  {
    href: "/apps/make10",
    label: "Make10Puzzle",
    description: "(7/3+1)*3=10",
    icon: <ExtensionIcon />,
  },
];

function NavigationLink({
  item,
  onNavigate,
}: {
  item: NavigationItem;
  onNavigate: () => void;
}) {
  const content = (
    <>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.label} secondary={item.description} />
    </>
  );
  if (item.href.startsWith("https://")) {
    return (
      <ListItemButton
        component="a"
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        {content}
      </ListItemButton>
    );
  }
  return (
    <ListItemButton component={Link} href={item.href} onClick={onNavigate}>
      {content}
    </ListItemButton>
  );
}

export default function MenuBar({ children }: { children?: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="メニューを開く"
            aria-expanded={drawerOpen}
            aria-controls={drawerOpen ? "site-navigation" : undefined}
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Button
            component={Link}
            href="/"
            color="inherit"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1.2em",
              ml: "1em",
            }}
          >
            Research Page
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" open={drawerOpen} onClose={closeDrawer}>
        <List
          component="nav"
          id="site-navigation"
          aria-label="サイトナビゲーション"
          sx={{ width: 320, maxWidth: "100vw" }}
        >
          <NavigationLink item={home} onNavigate={closeDrawer} />
          <ListItemButton
            onClick={() => setInfoOpen((open) => !open)}
            aria-expanded={infoOpen}
            aria-controls="info-navigation"
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Info" />
            {infoOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={infoOpen}
            timeout="auto"
            unmountOnExit
            id="info-navigation"
          >
            <List component="div" disablePadding sx={{ pl: 2 }}>
              {info.map((item) => (
                <NavigationLink
                  key={item.href}
                  item={item}
                  onNavigate={closeDrawer}
                />
              ))}
            </List>
          </Collapse>
          {apps.map((item) => (
            <NavigationLink
              key={item.href}
              item={item}
              onNavigate={closeDrawer}
            />
          ))}
        </List>
      </Drawer>
      {children}
    </>
  );
}
