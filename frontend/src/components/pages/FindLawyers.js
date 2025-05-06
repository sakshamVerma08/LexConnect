import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
  Avatar,
  Rating,
  Fade,
} from "@mui/material";
import {
  Search,
  LocationOn,
  Work,
  Star,
  FilterList,
  ArrowForward,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const FindLawyers = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lawyers, setLawyers] = useState([]);
  const navigate = useNavigate();

  const categories = [
    { label: "All", value: "all" },
    { label: "Criminal", value: "criminal" },
    { label: "Family", value: "family" },
    { label: "Corporate", value: "corporate" },

    { label: "ProBono", value: "probono" },
  ];

  const getLawyers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/lawyers/get-lawyers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setLawyers(response.data.data);
      } else {
        console.error("Failed to fetch lawyers:", response.data.message);
        setLawyers([]);
      }
    } catch (error) {
      console.error("Error fetching lawyers:", error);
      if (error.response?.status === 401) {
        // Token expired or invalid, redirect to login
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setLawyers([]);
      }
    }
  };

  const handleViewProfile = (lawyerID) => {
    navigate(`/lawyer/profile/${lawyerID}`);
  };

  useEffect(() => {
    getLawyers();
  }, [navigate, searchQuery, selectedCategory]);

  // Filter lawyers based on search query and selected category
  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch =
      searchQuery === "" ||
      lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "probono"
        ? lawyer.proBono
        : lawyer.specialization
            .toLowerCase()
            .includes(selectedCategory.toLowerCase()));

    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)"
              : "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              align="center"
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
              Find the Right Lawyer
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{
                mb: 6,
                color: "text.secondary",
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              Connect with experienced legal professionals who specialize in
              your specific needs
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box
              sx={{
                maxWidth: 800,
                mx: "auto",
                mb: 6,
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by name, specialization, or location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    background:
                      theme.palette.mode === "light"
                        ? "rgba(255, 255, 255, 0.8)"
                        : "rgba(30, 41, 59, 0.8)",
                    backdropFilter: "blur(10px)",
                  },
                }}
              />
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {categories.map((category) => (
                  <Chip
                    key={category.value}
                    label={category.label}
                    onClick={() => setSelectedCategory(category.value)}
                    sx={{
                      background:
                        selectedCategory === category.value
                          ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                          : theme.palette.mode === "light"
                          ? "rgba(0, 0, 0, 0.08)"
                          : "rgba(255, 255, 255, 0.08)",
                      color:
                        selectedCategory === category.value
                          ? "white"
                          : "inherit",
                      "&:hover": {
                        background:
                          selectedCategory === category.value
                            ? "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
                            : theme.palette.mode === "light"
                            ? "rgba(0, 0, 0, 0.12)"
                            : "rgba(255, 255, 255, 0.12)",
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Lawyers List */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {filteredLawyers.map((lawyer, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease-in-out",
                    background:
                      theme.palette.mode === "light"
                        ? "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)"
                        : "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow:
                        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Avatar
                        src={lawyer.image}
                        sx={{
                          width: 80,
                          height: 80,
                          mr: 2,
                          border: `2px solid ${theme.palette.primary.main}`,
                        }}
                      />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {lawyer.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {lawyer.specialization}
                        </Typography>
                      </Box>
                    </Box>
                    <Stack spacing={2} sx={{ mb: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationOn
                          fontSize="small"
                          sx={{ mr: 1, color: "text.secondary" }}
                        />
                        <Typography variant="body2">
                          {lawyer.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Work
                          fontSize="small"
                          sx={{ mr: 1, color: "text.secondary" }}
                        />
                        <Typography variant="body2">
                          {lawyer.experience} experience
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Star
                          fontSize="small"
                          sx={{ mr: 1, color: "text.secondary" }}
                        />
                        <Rating
                          value={lawyer.rating}
                          precision={0.1}
                          readOnly
                        />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          ({lawyer.rating})
                        </Typography>
                      </Box>
                    </Stack>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForward />}
                      fullWidth
                      sx={{
                        background:
                          "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                        },
                      }}
                      onClick={() => handleViewProfile(lawyer._id)}
                    >
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FindLawyers;
