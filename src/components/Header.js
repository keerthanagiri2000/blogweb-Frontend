import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useStyles } from "./utils";
import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;

const Header = (props) => {
  const classes = useStyles();
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography className={classes.font} variant="h6">
        Common
      </Typography>
      <Typography
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "-10px",
          marginRight: "3rem",
        }}
      >
        Blog
      </Typography>
      <Divider />
      <Box
        style={{ display: "flex", flexDirection: "column", marginTop: "1rem" }}
      >
        <Button LinkComponent={Link} to="/" color="warning">
          Home
        </Button>

        <Button LinkComponent={Link} to="/myBlogs" color="warning">
          My Blog
        </Button>

        <Button LinkComponent={Link} to="/blogs/add" color="warning">
          Add Blog
        </Button>
      </Box>
    </Box>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" position="sticky" sx={{ background: "black" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Typography className={classes.font} variant="h5">
              Common
            </Typography>
            <Typography
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "-10px",
                fontSize: "1rem",
              }}
            >
              Blog
            </Typography>
          </Box>
          {isLoggedIn && (
            <Box
              sx={{ display: { xs: "none", sm: "block" } }}
              marginLeft={"auto"}
            >
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab
                  className={classes.font}
                  LinkComponent={Link}
                  to="/"
                  label="Home"
                />
                <Tab
                  className={classes.font}
                  LinkComponent={Link}
                  to="/myBlogs"
                  label="My Blogs"
                />
                <Tab
                  className={classes.font}
                  LinkComponent={Link}
                  to="/blogs/add"
                  label="Add Blog"
                />
              </Tabs>
            </Box>
          )}

          <Box display="flex" marginLeft="auto">
            {!isLoggedIn ? (
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Login
              </Button>
            ) : (
              <Button
                onClick={() => dispath(authActions.logout())}
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};
export default Header;
