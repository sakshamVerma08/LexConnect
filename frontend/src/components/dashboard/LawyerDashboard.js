import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider
} from '@mui/material';
import CaseIcon from '@mui/icons-material/Gavel';
import RatingIcon from '@mui/icons-material/Star';
import ClientIcon from '@mui/icons-material/People';

const LawyerDashboard = () => {
  const [stats, setStats] = useState({
    activeCases: 0,
    completedCases: 0,
    rating: 0,
    totalClients: 0
  });

  const [recentCases, setRecentCases] = useState([]);

  useEffect(() => {
    // TODO: Fetch lawyer's dashboard data
    // Mock data
    setStats({
      activeCases: 3,
      completedCases: 12,
      rating: 4.8,
      totalClients: 15
    });

    setRecentCases([
      {
        id: 1,
        title: 'Corporate Contract Review',
        client: 'Tech Corp',
        status: 'inProgress',
        type: 'paid',
        updatedAt: '2023-04-15'
      },
      {
        id: 2,
        title: 'Family Court Representation',
        client: 'John Doe',
        status: 'assigned',
        type: 'proBono',
        updatedAt: '2023-04-14'
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      assigned: 'primary',
      inProgress: 'warning',
      completed: 'success',
      closed: 'error'
    };
    return colors[status] || 'default';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lawyer Dashboard
      </Typography>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CaseIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Active Cases</Typography>
              </Box>
              <Typography variant="h3">{stats.activeCases}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CaseIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Completed</Typography>
              </Box>
              <Typography variant="h3">{stats.completedCases}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'warning.main', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <RatingIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Rating</Typography>
              </Box>
              <Typography variant="h3">{stats.rating}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'secondary.main', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ClientIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Total Clients</Typography>
              </Box>
              <Typography variant="h3">{stats.totalClients}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Cases */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Cases
            </Typography>
            <List>
              {recentCases.map((case_, index) => (
                <React.Fragment key={case_.id}>
                  {index > 0 && <Divider />}
                  <ListItem
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      py: 2
                    }}
                  >
                    <ListItemText
                      primary={case_.title}
                      secondary={`Client: ${case_.client}`}
                      sx={{ mb: { xs: 1, sm: 0 } }}
                    />
                    <Box sx={{ display: 'flex', gap: 1, ml: { sm: 2 } }}>
                      <Chip
                        label={case_.type === 'proBono' ? 'Pro Bono' : 'Paid'}
                        color={case_.type === 'proBono' ? 'secondary' : 'default'}
                        size="small"
                      />
                      <Chip
                        label={case_.status.charAt(0).toUpperCase() + case_.status.slice(1)}
                        color={getStatusColor(case_.status)}
                        size="small"
                      />
                    </Box>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button variant="outlined" color="primary">
                View All Cases
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
              >
                Browse New Cases
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
              >
                Update Profile
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
              >
                View Messages
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LawyerDashboard;
