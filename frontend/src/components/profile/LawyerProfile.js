import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  Avatar,
  Rating,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useParams } from "react-router-dom";
import axios from "axios";
const LawyerProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const editAbout = () => {
    // Write code to open prompt section to enter about here
  };

  const editSpecialization = () => {
    // Write code to open prompt section to enter Specialization here
  };

  const getLawyerProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/lawyers/profile/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        setProfile(response.data.data);
      }

      console.log("PROFILE =", response.data.data);
    } catch (err) {
      console.error(err);
      return;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getLawyerProfile();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              background: "linear-gradient(to right, #2196f3, #1976d2)",
              color: "white",
            }}
          >
            <Grid container alignItems="center" spacing={3}>
              <Grid item>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "secondary.main",
                  }}
                >
                  {/*Lawyer Image*/}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h4">{profile?.name}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <LocationOnIcon sx={{ mr: 1 }} />
                  <Typography>{`${profile?.location}`}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Rating value={profile?.rating} readOnly precision={0.5} />
                  <Typography sx={{ ml: 1 }}>
                    ({profile?.rating} reviews)
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" size="large">
                  Contact Lawyer
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                {" "}
                <Typography variant="h6" gutterBottom>
                  About
                </Typography>
                <Typography paragraph>{profile?.bio}</Typography>
              </Box>

              <Button sx={{ border: "rounded" }} onClick={editAbout}>
                Add About +{" "}
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Specializations
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Chip
                    key={profile?.specialization}
                    label={profile?.specialization}
                    sx={{ mr: 1, mb: 1 }}
                    color="primary"
                  />
                </Box>
              </Box>

              <Button onClick={editSpecialization}>Add Specialization +</Button>
            </Box>

            <Typography variant="h6" gutterBottom>
              Education
            </Typography>
            {/*<List>
              {profile.education.map((edu, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={edu.degree}
                    secondary={`${edu.institution} - ${edu.year}`}
                    icon={<SchoolIcon />}
                  />
                </ListItem>
              ))}
            </List>*/}
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Professional Info
              </Typography>
              <List>
                <ListItem>
                  <WorkIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Experience"
                    secondary={`${profile?.experience} years`}
                  />
                </ListItem>
                <ListItem>
                  <VolunteerActivismIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Pro Bono Cases"
                    secondary={`${profile?.proBono} per month`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rates & Languages
              </Typography>
              <Typography variant="h4" color="primary" gutterBottom>
                ${profile?.cost}/hr
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Languages
              </Typography>
              {profile?.languages.map((lang) => (
                <Chip
                  key={lang}
                  label={lang}
                  sx={{ mr: 1, mb: 1 }}
                  variant="outlined"
                />
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LawyerProfile;
