import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Avatar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useNavigate } from 'react-router-dom';

const CaseList = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    status: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const dummyLawyers = [
    { id: '1', name: 'Alice Johnson', specialization: 'Intellectual Property', type: 'proBono' },
    { id: '2', name: 'Bob Smith', specialization: 'Family Law', type: 'paid' },
    { id: '3', name: 'Clara Lee', specialization: 'Corporate Law', type: 'proBono' },
    { id: '4', name: 'David Kim', specialization: 'Criminal Law', type: 'paid' }
  ];

  useEffect(() => {
    // TODO: Fetch cases from backend
    // Mock data
    setCases([
      {
        id: '1',
        title: 'Intellectual Property Dispute',
        description: 'Need assistance with patent infringement case...',
        category: 'Intellectual Property',
        type: 'paid',
        status: 'open',
        budget: 5000,
        createdAt: '2023-04-15',
        client: { name: 'Tech Corp' }
      },
      {
        id: '2',
        title: 'Family Court Representation',
        description: 'Seeking pro bono help for custody case...',
        category: 'Family Law',
        type: 'proBono',
        status: 'open',
        createdAt: '2023-04-16',
        client: { name: 'Jane Smith' }
      }
    ]);
  }, []);

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      open: 'success',
      assigned: 'primary',
      inProgress: 'warning',
      completed: 'info',
      closed: 'error'
    };
    return colors[status] || 'default';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Legal Cases
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Browse and find cases that match your expertise
        </Typography>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    label="Category"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Criminal">Criminal Law</MenuItem>
                    <MenuItem value="Civil">Civil Law</MenuItem>
                    <MenuItem value="Family">Family Law</MenuItem>
                    <MenuItem value="Corporate">Corporate Law</MenuItem>
                    <MenuItem value="IP">Intellectual Property</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    label="Type"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="proBono">Pro Bono</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    label="Status"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="open">Open</MenuItem>
                    <MenuItem value="assigned">Assigned</MenuItem>
                    <MenuItem value="inProgress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Featured Lawyers */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>Featured Lawyers</Typography>
        <Grid container spacing={3}>
          {dummyLawyers.map((lawyer) => (
            <Grid item xs={12} sm={6} md={3} key={lawyer.id}>
              <Card sx={{ textAlign: 'center', p: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mx: 'auto' }}>{lawyer.name.charAt(0)}</Avatar>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>{lawyer.name}</Typography>
                <Typography variant="body2" color="text.secondary">{lawyer.specialization}</Typography>
                <Chip label={lawyer.type === 'proBono' ? 'Pro Bono' : 'Paid'} color={lawyer.type === 'proBono' ? 'success' : 'primary'} size="small" sx={{ mt: 1 }} />
                <Button size="small" sx={{ mt: 1 }} onClick={() => navigate(`/lawyer/profile/${lawyer.id}`)}>View Profile</Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Case Cards */}
      <Grid container spacing={3}>
        {cases.map((case_) => (
          <Grid item xs={12} key={case_.id}>
            <Card 
              sx={{ 
                '&:hover': { 
                  boxShadow: 6,
                  cursor: 'pointer'
                }
              }}
              onClick={() => navigate(`/case/${case_.id}`)}
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6" gutterBottom>
                      {case_.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {case_.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={case_.category}
                        color="primary"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={case_.type === 'proBono' ? 'Pro Bono' : 'Paid'}
                        color={case_.type === 'proBono' ? 'secondary' : 'default'}
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={case_.status.charAt(0).toUpperCase() + case_.status.slice(1)}
                        color={getStatusColor(case_.status)}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Posted by
                        </Typography>
                        <Typography variant="subtitle1">
                          {case_.client.name}
                        </Typography>
                      </Box>
                      {case_.type === 'paid' && (
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Budget
                          </Typography>
                          <Typography variant="h6" color="primary">
                            ${case_.budget}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Posted on {new Date(case_.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CaseList;
