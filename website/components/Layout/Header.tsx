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
import ListItem from "@mui/material/ListItem";
import List from '@mui/material/List';

import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import HomeIcon from "@material-ui/icons/Home";
import CalculateIcon from '@mui/icons-material/Calculate';

const titleStyle: { [key: string]: string | number } = {
  textTransform: "none",
  fontWeight: 600,
  fontSize: "1.2em",
  marginLeft: "1em",
};

export const Header: FC = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  // Drawer の開閉
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen); // Drawer の開閉状態を反転
  };
  return (
    <header>
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
            }
          }}
        >
          <ListItem >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <Link href="/">
              <ListItemText primary="Home" />
            </Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CalculateIcon />
            </ListItemIcon>
            <Link href="/apps/calc">
              <ListItemText
                primary="Calculator"
                secondary="Using WebAssembly"
              />
            </Link>
          </ListItem>
        </List>
      </Drawer>
      <div>{children}</div>
    </header>
  );
};
