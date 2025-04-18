import React, { useState } from "react";
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

  const categories = [
    { label: "All", value: "all" },
    { label: "Criminal", value: "criminal" },
    { label: "Family", value: "family" },
    { label: "Corporate", value: "corporate" },

    { label: "ProBono", value: "probono" },
  ];

  const lawyers = [
    /**
     * Paste one or more documents here
     */
    {
      name: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      specialization: "Criminal Law",
      experience: 7,
      rating: 4.5,
      location: "Delhi",
      proBono: true,
    },

    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf3d",
      },
      name: "Diya Mehta",
      email: "diya.mehta@example.com",
      specialization: "Corporate Law",
      experience: 10,
      rating: 4.7,
      location: "Mumbai",
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf3e",
      },
      name: "Kabir Verma",
      email: "kabir.verma@example.com",
      specialization: "Family Law",
      experience: 5,
      rating: 4.2,
      location: "Bangalore",
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf3f",
      },
      name: "Nisha Reddy",
      email: "nisha.reddy@example.com",
      specialization: "Civil Law",
      experience: 12,
      rating: 4.6,
      location: "Hyderabad",
      proBono: true,
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf40",
      },
      name: "Rahul Singh",
      email: "rahul.singh@example.com",
      specialization: "IP Law",
      experience: 8,
      rating: 4.4,
      location: "Chennai",
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf41",
      },
      name: "Tanya Patel",
      email: "tanya.patel@example.com",
      specialization: "Environmental Law",
      experience: 6,
      rating: 4.3,
      location: "Ahmedabad",
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf42",
      },
      name: "Siddharth Nair",
      email: "siddharth.nair@example.com",
      specialization: "Tax Law",
      experience: 11,
      rating: 4.5,
      location: "Kochi",
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf43",
      },
      name: "Ishita Das",
      email: "ishita.das@example.com",
      specialization: "Labour Law",
      experience: 4,
      rating: 4.1,
      location: "Kolkata",
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf44",
      },
      name: "Manav Joshi",
      email: "manav.joshi@example.com",
      specialization: "Cyber Law",
      experience: 3,
      rating: 4,
      location: "Pune",
      proBono: true,
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf45",
      },
      name: "Sneha Roy",
      email: "sneha.roy@example.com",
      specialization: "Banking Law",
      experience: 9,
      rating: 4.3,
      location: "Nagpur",
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf46",
      },
      name: "Rohan Kapoor",
      email: "rohan.kapoor@example.com",
      specialization: "Corporate Law",
      experience: 13,
      rating: 4.8,
      location: "Noida",
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf47",
      },
      name: "Ananya Ghosh",
      email: "ananya.ghosh@example.com",
      specialization: "Criminal Law",
      experience: 6,
      rating: 4.2,
      location: "Patna",
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf48",
      },
      name: "Yash Chauhan",
      email: "yash.chauhan@example.com",
      specialization: "Family Law",
      experience: 7,
      rating: 4.4,
      location: "Jaipur",
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf49",
      },
      name: "Meera Iyer",
      email: "meera.iyer@example.com",
      specialization: "Civil Law",
      experience: 10,
      rating: 4.5,
      location: "Bhopal",
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf4a",
      },
      name: "Arjun Desai",
      email: "arjun.desai@example.com",
      specialization: "IP Law",
      experience: 5,
      rating: 4.3,
      location: "Surat",
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf4b",
      },
      name: "Pooja Bhatt",
      email: "pooja.bhatt@example.com",
      specialization: "Labour Law",
      experience: 4,
      rating: 4,
      location: "Lucknow",
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf4c",
      },
      name: "Vikram Malhotra",
      email: "vikram.malhotra@example.com",
      specialization: "Cyber Law",
      experience: 8,
      rating: 4.6,
      location: "Chandigarh",
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf4c",
      },
      name: "Vikram Malhotra",
      email: "vikram.malhotra@example.com",
      specialization: "Cyber Law",
      experience: 8,
      rating: 4.6,
      location: "Chandigarh",
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf4d",
      },
      name: "Neha Saxena",
      email: "neha.saxena@example.com",
      specialization: "Tax Law",
      experience: 6,
      rating: 4.1,
      location: "Indore",
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf4e",
      },
      name: "Ayaan Khan",
      email: "ayaan.khan@example.com",
      specialization: "Banking Law",
      experience: 9,
      rating: 4.2,
      location: "Kanpur",
    },
    {
      _id: {
        $oid: "6801bb02f2929f8bf4addf4f",
      },
      name: "Kiara Sen",
      email: "kiara.sen@example.com",
      specialization: "Corporate Law",
      experience: 11,
      rating: 4.7,
      location: "Thane",
    },
    // Add more lawyer data as needed
  ];

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

