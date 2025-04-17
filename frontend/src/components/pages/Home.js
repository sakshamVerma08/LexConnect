import React, { useState } from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, Avatar, Chip, TextField, InputAdornment, FormControlLabel, Switch } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [proBonoOnly, setProBonoOnly] = useState(false);

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            Find the Right Legal Help
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Connect with experienced lawyers for pro bono and paid legal services
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="secondary" size="large" onClick={() => navigate('/register')} sx={{ mr: 2 }}>
              Get Started
            </Button>
            <Button variant="outlined" color="inherit" size="large" onClick={() => navigate('/cases')}>
              Browse Cases
            </Button>
          </Box>
          <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Search lawyers"
              value={query}
              onChange={e => setQuery(e.target.value)}
              InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
            />
            <FormControlLabel control={<Switch checked={proBonoOnly} onChange={e => setProBonoOnly(e.target.checked)} color="secondary" />} label="Pro Bono only" />
            <Button variant="contained" color="secondary" size="medium" onClick={() => navigate(`/cases?query=${encodeURIComponent(query)}&proBono=${proBonoOnly}`)}>
              Search Lawyers
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Pro Bono Services
                </Typography>
                <Typography variant="body1">
                  Find lawyers willing to take cases pro bono and make legal help accessible to everyone.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Specialized Expertise
                </Typography>
                <Typography variant="body1">
                  Connect with lawyers specialized in various legal categories and find the right match for your case.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Verified Profiles
                </Typography>
                <Typography variant="body1">
                  Browse through verified lawyer profiles with ratings, reviews, and detailed experience information.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>How It Works</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card><CardContent><Typography variant="h5">1. Sign Up</Typography><Typography>Create a free client or lawyer account.</Typography></CardContent></Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card><CardContent><Typography variant="h5">2. Find Lawyers</Typography><Typography>Search by specialty and filter Pro Bono options.</Typography></CardContent></Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card><CardContent><Typography variant="h5">3. Connect & Consult</Typography><Typography>Message lawyers and schedule consultations.</Typography></CardContent></Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Lawyers Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>Featured Lawyers</Typography>
          <Grid container spacing={4}>
            {[
              { id: '1', name: 'Alice Johnson', specialization: 'Intellectual Property', type: 'proBono' },
              { id: '2', name: 'Bob Smith', specialization: 'Family Law', type: 'paid' },
              { id: '3', name: 'Clara Lee', specialization: 'Corporate Law', type: 'proBono' },
              { id: '4', name: 'David Kim', specialization: 'Criminal Law', type: 'paid' }
            ].map((lawyer) => (
              <Grid item xs={12} sm={6} md={3} key={lawyer.id}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mx: 'auto' }}>{lawyer.name.charAt(0)}</Avatar>
                    <Typography variant="h6" sx={{ mt: 1 }}>{lawyer.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{lawyer.specialization}</Typography>
                    <Chip label={lawyer.type === 'proBono' ? 'Pro Bono' : 'Paid'} color={lawyer.type === 'proBono' ? 'success' : 'primary'} size="small" sx={{ mt: 1 }} />
                    <Button variant="outlined" size="small" sx={{ mt: 1 }} onClick={() => navigate(`/lawyer/profile/${lawyer.id}`)}>View Profile</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
