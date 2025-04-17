import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Avatar, Chip, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const dummyLawyers = [
  { id: '1', name: 'Alice Johnson', specialization: 'Intellectual Property', type: 'proBono' },
  { id: '2', name: 'Bob Smith', specialization: 'Family Law', type: 'paid' },
  { id: '3', name: 'Clara Lee', specialization: 'Corporate Law', type: 'proBono' },
  { id: '4', name: 'David Kim', specialization: 'Criminal Law', type: 'paid' }
];

const FindLawyers = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Find Lawyers
      </Typography>
      <Grid container spacing={4}>
        {dummyLawyers.map((lawyer) => (
          <Grid item xs={12} sm={6} md={3} key={lawyer.id}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mx: 'auto' }}>
                  {lawyer.name.charAt(0)}
                </Avatar>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {lawyer.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {lawyer.specialization}
                </Typography>
                <Chip
                  label={lawyer.type === 'proBono' ? 'Pro Bono' : 'Paid'}
                  color={lawyer.type === 'proBono' ? 'success' : 'primary'}
                  size="small"
                  sx={{ mt: 1 }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => navigate(`/lawyer/profile/${lawyer.id}`)}
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FindLawyers;
