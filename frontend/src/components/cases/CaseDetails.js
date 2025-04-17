import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
  Divider,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  TextField
} from '@mui/material';
import { useParams } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ChatIcon from '@mui/icons-material/Chat';

const CaseDetails = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch case details from backend
    // Mock data
    setCaseData({
      id: '1',
      title: 'Intellectual Property Dispute',
      description: 'We are seeking legal representation for a patent infringement case involving our technology product. The case requires expertise in intellectual property law and experience with technology patents.',
      category: 'Intellectual Property',
      type: 'paid',
      status: 'open',
      budget: 5000,
      createdAt: '2023-04-15',
      client: {
        name: 'Tech Corp',
        email: 'contact@techcorp.com'
      },
      documents: [
        { name: 'Patent Documentation.pdf', url: '#' },
        { name: 'Prior Art Evidence.pdf', url: '#' }
      ],
      updates: [
        {
          date: '2023-04-15',
          content: 'Case created and posted',
          author: 'System'
        }
      ]
    });
    setLoading(false);
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" gutterBottom>
                {caseData.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip
                  label={caseData.category}
                  color="primary"
                />
                <Chip
                  label={caseData.type === 'proBono' ? 'Pro Bono' : 'Paid'}
                  color={caseData.type === 'proBono' ? 'secondary' : 'default'}
                />
                <Chip
                  label={caseData.status.charAt(0).toUpperCase() + caseData.status.slice(1)}
                  color="success"
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 2 }}>
                <AccessTimeIcon sx={{ mr: 1 }} />
                <Typography variant="body2">
                  Posted on {new Date(caseData.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>

            <Typography variant="h6" gutterBottom>
              Case Description
            </Typography>
            <Typography paragraph>
              {caseData.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Documents
            </Typography>
            <List>
              {caseData.documents.map((doc, index) => (
                <ListItem
                  key={index}
                  button
                  component="a"
                  href={doc.url}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <AttachFileIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={doc.name} />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Case Updates
            </Typography>
            <List>
              {caseData.updates.map((update, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={update.content}
                    secondary={`${update.author} - ${new Date(update.date).toLocaleDateString()}`}
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
                Client Information
              </Typography>
              <Typography variant="body1">
                {caseData.client.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {caseData.client.email}
              </Typography>
              <Button
                variant="contained"
                startIcon={<ChatIcon />}
                fullWidth
                sx={{ mt: 2 }}
              >
                Contact Client
              </Button>
            </CardContent>
          </Card>

          {caseData.type === 'paid' && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Budget
                </Typography>
                <Typography variant="h4" color="primary">
                  ${caseData.budget}
                </Typography>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Take Action
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mb: 2 }}
              >
                Apply for Case
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
              >
                Save for Later
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CaseDetails;
