import React, { useState, useEffect } from 'react';
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
  CardContent
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useParams } from 'react-router-dom';

const LawyerProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch lawyer profile from backend
    // This is mock data
    setProfile({
      user: {
        name: 'John Doe',
        email: 'john@example.com'
      },
      barId: 'BAR123456',
      specializations: ['Criminal Law', 'Family Law', 'Corporate Law'],
      experience: 8,
      education: [
        {
          institution: 'Harvard Law School',
          degree: 'Juris Doctor',
          year: 2015
        }
      ],
      proBono: {
        available: true,
        casesPerMonth: 2
      },
      hourlyRate: 200,
      rating: 4.5,
      totalReviews: 28,
      location: {
        city: 'New York',
        state: 'NY',
        country: 'USA'
      },
      bio: 'Experienced lawyer specializing in criminal and family law with a strong track record of successful cases.',
      languages: ['English', 'Spanish']
    });
    setLoading(false);
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
              background: 'linear-gradient(to right, #2196f3, #1976d2)',
              color: 'white'
            }}
          >
            <Grid container alignItems="center" spacing={3}>
              <Grid item>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: 'secondary.main'
                  }}
                >
                  {profile.user.name[0]}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h4">{profile.user.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <LocationOnIcon sx={{ mr: 1 }} />
                  <Typography>
                    {`${profile.location.city}, ${profile.location.state}`}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Rating value={profile.rating} readOnly precision={0.5} />
                  <Typography sx={{ ml: 1 }}>
                    ({profile.totalReviews} reviews)
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  Contact Lawyer
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              About
            </Typography>
            <Typography paragraph>{profile.bio}</Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              Specializations
            </Typography>
            <Box sx={{ mb: 3 }}>
              {profile.specializations.map((spec) => (
                <Chip
                  key={spec}
                  label={spec}
                  sx={{ mr: 1, mb: 1 }}
                  color="primary"
                />
              ))}
            </Box>

            <Typography variant="h6" gutterBottom>
              Education
            </Typography>
            <List>
              {profile.education.map((edu, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={edu.degree}
                    secondary={`${edu.institution} - ${edu.year}`}
                    icon={<SchoolIcon />}
                  />
                </ListItem>
              ))}
            </List>
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
                    secondary={`${profile.experience} years`}
                  />
                </ListItem>
                <ListItem>
                  <VolunteerActivismIcon sx={{ mr: 2 }} />
                  <ListItemText
                    primary="Pro Bono Cases"
                    secondary={`${profile.proBono.casesPerMonth} per month`}
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
                ${profile.hourlyRate}/hr
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Languages
              </Typography>
              {profile.languages.map((lang) => (
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
