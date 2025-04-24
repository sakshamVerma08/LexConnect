import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import axios from "axios";

const LawyerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    experience: "",
    rating: "",
    location: "",
    language: "English",
    proBono: true,
    availability: true,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: e.target.type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/lawyer-register",
        formData
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      navigate("/lawyer/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const specialization = [
    "Criminal Law",
    "Family Law",
    "Corporate Law",
    "Intellectual Property Law",
    "Tax Law",
    "Labor Law",
    "Environmental Law",
  ];

  const language = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Arabic",
  ];

  return (
    <Container component="main" maxWidth="md">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          marginBottom: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "primary.main",
            borderRadius: "50%",
            padding: 1,
            marginBottom: 2,
          }}
        >
          <PersonAddIcon sx={{ color: "white" }} />
        </Box>
        <Typography component="h1" variant="h5">
          Lawyer Registration
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
            {error}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: "100%" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Specialization</InputLabel>
                <Select
                  name="specialization"
                  value={formData.specialization}
                  label="Specialization"
                  onChange={handleChange}
                >
                  {specialization.map((spec) => (
                    <MenuItem key={spec} value={spec}>
                      {spec}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Years of Experience"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rating (0-5)"
                name="rating"
                type="number"
                inputProps={{ min: 0, max: 5, step: 0.1 }}
                value={formData.rating}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Languages</InputLabel>
                <Select
                  name="languages"
                  value={formData.language}
                  label="Languages"
                  onChange={handleChange}
                >
                  {language.map((lang) => (
                    <MenuItem key={lang} value={lang}>
                      {lang}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.proBono}
                    onChange={handleChange}
                    name="proBono"
                  />
                }
                label="Pro Bono Services"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.availability}
                    onChange={handleChange}
                    name="availability"
                  />
                }
                label="Currently Available"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register as Lawyer
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Link href="/lawyer-login" variant="body2">
              Already have an account? Sign In
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LawyerRegister;
