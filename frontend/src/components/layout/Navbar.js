import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Fade,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home,
  Search,
  Description,
  Person,
  Logout,
  ArrowDropDown,
  ArrowDropUp,
  Dashboard,
  Settings,
  Chat,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";

const Navbar = ({ toggleColorMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        navigate("/login");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Clear local storage and redirect regardless of API response
      localStorage.removeItem("token");
      navigate("/login");
      handleMenuClose();
    } catch (err) {
      console.error("Logout error:", err);
      // Even if the API call fails, we should still clear the token and redirect
      localStorage.removeItem("token");
      navigate("/login");
      handleMenuClose();
    }
  };

  const menuItems = [
    {
      text: "Home",
      icon: <Home />,
      path: "/home",
      color: "#3B82F6",
    },
    {
      text: "Find Lawyers",
      icon: <Search />,
      path: "/lawyers",
      color: "#8B5CF6",
    },
    {
      text: "My Cases",
      icon: <Description />,
      path: "/cases",
      color: "#EC4899",
    },
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: "/client/dashboard",
      color: "#10B981",
    },
    {
      text: "Document Scanner",
      icon: <Description />,
      path: "/document-scanner",
      color: "#F59E0B",
    },
    {
      text: "Legal AI Assistant",
      icon: <Chat />,
      path: "/legal-chatbot",
      color: "#6366F1",
    },
  ];

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: 280,
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)"
              : "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 700,
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)"
                : "linear-gradient(135deg, #f8fafc 0%, #60a5fa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          LexConnect
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
              sx={{
                mb: 1,
                borderRadius: 2,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  background:
                    theme.palette.mode === "light"
                      ? "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)"
                      : "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                  transform: "translateX(8px)",
                },
              }}
            >
              <ListItemIcon sx={{ color: item.color }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiTypography-root": {
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  const renderDesktopMenu = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {menuItems.map((item) => (
        <Button
          key={item.text}
          startIcon={item.icon}
          onClick={() => navigate(item.path)}
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 500,
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: "50%",
              width: 0,
              height: "2px",
              background: `linear-gradient(135deg, ${
                item.color
              } 0%, ${lightenColor(item.color, 20)} 100%)`,
              transition: "all 0.3s ease-in-out",
              transform: "translateX(-50%)",
            },
            "&:hover": {
              "&::after": {
                width: "100%",
              },
            },
          }}
        >
          {item.text}
        </Button>
      ))}
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background:
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(30, 41, 59, 0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              "& .logo-text": {
                background:
                  theme.palette.mode === "light"
                    ? "linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)"
                    : "linear-gradient(135deg, #f8fafc 0%, #60a5fa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              },
            },
          }}
          onClick={() => navigate("/")}
        >
          <Typography
            variant="h5"
            className="logo-text"
            sx={{
              fontWeight: 700,
              transition: "all 0.3s ease-in-out",
            }}
          >
            LexConnect
          </Typography>
        </Box>

        {isMobile ? (
          <IconButton
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{
              color: theme.palette.text.primary,
              "&:hover": {
                background:
                  theme.palette.mode === "light"
                    ? "rgba(0, 0, 0, 0.04)"
                    : "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <>
            {renderDesktopMenu()}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                onClick={toggleColorMode}
                color="inherit"
                sx={{
                  "&:hover": {
                    background:
                      theme.palette.mode === "light"
                        ? "rgba(0, 0, 0, 0.04)"
                        : "rgba(255, 255, 255, 0.08)",
                  },
                }}
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7 />
                ) : (
                  <Brightness4 />
                )}
              </IconButton>
              <Avatar
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                  },
                }}
                onClick={handleMenuOpen}
              >
                <Person />
              </Avatar>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                TransitionComponent={Fade}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    minWidth: 200,
                    background:
                      theme.palette.mode === "light"
                        ? "rgba(255, 255, 255, 0.8)"
                        : "rgba(30, 41, 59, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/profile");
                    handleMenuClose();
                  }}
                >
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/settings");
                    handleMenuClose();
                  }}
                >
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Settings</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </>
        )}
      </Toolbar>
      {renderMobileMenu()}
    </AppBar>
  );
};

// Helper function to lighten colors
const lightenColor = (color, percent) => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

export default Navbar;
