/** @format */

import { FC } from "react";
import React from "react";

import Link from "next/link";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { listItemClasses } from "@mui/material/ListItem";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";

import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import HomeIcon from "@material-ui/icons/Home";
import CalculateIcon from "@mui/icons-material/Calculate";
import InfoIcon from "@mui/icons-material/Info";
import CodeIcon from "@mui/icons-material/Code";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const titleStyle: { [key: string]: string | number } = {
  textTransform: "none",
  fontWeight: 600,
  fontSize: "1.2em",
  marginLeft: "1em",
};

type LinkListItemProps = Omit<
  ListItemProps<"a", { href: string }>,
  "component" | "button"
>;

const LinkListItem = React.forwardRef<HTMLAnchorElement, LinkListItemProps>(
  function LinkListItem(props, forwardedRef) {
    const { href, ...other } = props;
    if (href.startsWith("http")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "#212121" }}
        >
          <ListItem component="a" button ref={forwardedRef} {...other} />
        </a>
      );
    } else {
      return (
        <Link href={href} passHref>
          <ListItem component="a" button ref={forwardedRef} {...other} />
        </Link>
      );
    }
  }
);

const MenuBar: FC = ({ children }) => {
  // Drawer の開閉
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // ネストされたリスト の開閉
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/" passHref>
              <Button color="inherit" style={titleStyle}>
                Research Related Page
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <List
          sx={{
            [`& .active, & .${listItemClasses.root}:hover`]: {
              fontWeight: "bold",
              "& svg": {
                fill: "#474b42",
              },
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <LinkListItem href="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" style={{ width: "1em" }} />
          </LinkListItem>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Info" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding style={{ marginLeft: "1em" }}>
              <LinkListItem href="/info/tech">
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Tech"
                  secondary="このサイトを構成する技術"
                  style={{ width: "0em" }}
                />
              </LinkListItem>
              <LinkListItem href="https://github.com/xryuseix/research">
                <ListItemIcon>
                  <GitHubIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Repository"
                  secondary="xryuseix/research"
                  style={{ width: "0em" }}
                  className="noLinkCSS"
                />
              </LinkListItem>
            </List>
          </Collapse>
          <LinkListItem href="/apps/calc">
            <ListItemIcon>
              <CalculateIcon />
            </ListItemIcon>
            <ListItemText
              primary="Calculator"
              secondary="Computing with WebAssembly"
              style={{ width: "13em" }}
            />
          </LinkListItem>
        </List>
      </Drawer>
      <div>{children}</div>
    </>
  );
};

export default MenuBar;
