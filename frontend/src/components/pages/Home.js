import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Stack,
  useTheme,
  useMediaQuery,
  Avatar,
  CardContent,
  Fade,
} from '@mui/material';
import {
  Search,
  Description,
  Security,
  Speed,
  PostAdd,
  ConnectWithoutContact,
  Gavel,
  DocumentScanner,
  VerifiedUser,
  Lock,
  Star,
  Category,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Search sx={{ fontSize: 40 }} />,
    title: 'Find the Right Lawyer',
    description: 'Connect with experienced lawyers who specialize in your specific legal needs.',
  },
  {
    icon: <Description sx={{ fontSize: 40 }} />,
    title: 'Document Management',
    description: 'Securely store and manage your legal documents in one place.',
  },
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: 'Secure Communication',
    description: 'Communicate with your lawyer through our encrypted messaging system.',
  },
  {
    icon: <Speed sx={{ fontSize: 40 }} />,
    title: 'Quick Case Updates',
    description: 'Stay informed about your case progress with real-time updates.',
  },
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
            : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    background: theme.palette.mode === 'light'
                      ? 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)'
                      : 'linear-gradient(135deg, #f8fafc 0%, #60a5fa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                  }}
                >
                  Connect with the Right Legal Expertise
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    maxWidth: '600px',
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    lineHeight: 1.6,
                  }}
                >
                  LexConnect brings together clients and lawyers in a secure, efficient platform designed to simplify your legal journey.
                </Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ mb: 4 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/')}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -2px rgba(59, 130, 246, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                          boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.4), 0 4px 6px -4px rgba(59, 130, 246, 0.4)',
                        },
                      }}
                    >
                      Get Started
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/lawyers')}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        '&:hover': {
                          borderColor: 'primary.dark',
                          color: 'primary.dark',
                          background: 'rgba(59, 130, 246, 0.04)',
                        },
                      }}
                    >
                      Find Lawyers
                    </Button>
                  </motion.div>
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                      zIndex: 0,
                    },
                  }}
                >
                  <Card
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                      height: 400,
                      background: theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)'
                        : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/legal-consultation.svg"
                      alt="Legal consultation"
                      sx={{
                        width: '80%',
                        height: 'auto',
                        objectFit: 'contain',
                      }}
                    />
                  </Card>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Fade in timeout={1000}>
          <Box>
            <Typography
              variant="h2"
              align="center"
              sx={{
                mb: 2,
                fontWeight: 700,
                background: theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)'
                  : 'linear-gradient(135deg, #f8fafc 0%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              How LexConnect Works
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{
                mb: 8,
                color: 'text.secondary',
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Connecting those in need with legal professionals who care
            </Typography>
            
            <Grid container spacing={4}>
              {[
                {
                  icon: <PostAdd sx={{ fontSize: 32 }} />,
                  title: 'Post Your Case',
                  description: 'Share your legal situation and requirements. Our platform ensures your privacy while connecting you with the right legal professionals.',
                  color: '#3B82F6',
                },
                {
                  icon: <ConnectWithoutContact sx={{ fontSize: 32 }} />,
                  title: 'Connect with Lawyers',
                  description: 'Get matched with experienced lawyers who specialize in your type of case. Choose between pro bono services or paid consultations.',
                  color: '#8B5CF6',
                },
                {
                  icon: <Gavel sx={{ fontSize: 32 }} />,
                  title: 'Get Legal Help',
                  description: 'Communicate securely through our platform, receive legal advice, and work with your chosen lawyer to resolve your case effectively.',
                  color: '#EC4899',
                },
                {
                  icon: <DocumentScanner sx={{ fontSize: 32 }} />,
                  title: 'Document Scanning',
                  description: 'Upload your legal documents and our AI-powered system will analyze and explain them in simple, easy-to-understand terms.',
                  color: '#10B981',
                },
              ].map((step, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 4,
                      transition: 'all 0.3s ease-in-out',
                      background: theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
                        : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        background: `linear-gradient(135deg, ${step.color} 0%, ${lightenColor(step.color, 20)} 100%)`,
                        color: 'white',
                        boxShadow: `0 4px 6px -1px ${step.color}40, 0 2px 4px -2px ${step.color}40`,
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 2,
                        fontWeight: 600,
                        color: 'text.primary',
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.6,
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Fade in timeout={1500}>
          <Box>
            <Typography
              variant="h2"
              align="center"
              sx={{
                mb: 2,
                fontWeight: 700,
                background: theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)'
                  : 'linear-gradient(135deg, #f8fafc 0%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Why Choose LexConnect?
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{
                mb: 8,
                color: 'text.secondary',
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Our platform is designed to make legal services more accessible and efficient for everyone.
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  icon: <VerifiedUser sx={{ fontSize: 40 }} />,
                  title: 'Pro Bono Services',
                  description: 'Find lawyers willing to take cases pro bono and make legal help accessible to everyone.',
                  color: '#3B82F6',
                },
                {
                  icon: <Category sx={{ fontSize: 40 }} />,
                  title: 'Specialized Expertise',
                  description: 'Connect with lawyers specialized in various legal categories and find the right match for your case.',
                  color: '#8B5CF6',
                },
                {
                  icon: <Star sx={{ fontSize: 40 }} />,
                  title: 'Verified Profiles',
                  description: 'Browse through verified lawyer profiles with ratings, reviews, and detailed experience information.',
                  color: '#EC4899',
                },
                {
                  icon: <Lock sx={{ fontSize: 40 }} />,
                  title: 'Secure Communication',
                  description: 'Exchange messages and documents with lawyers through our encrypted platform, ensuring your sensitive information stays confidential.',
                  color: '#10B981',
                },
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 4,
                      transition: 'all 0.3s ease-in-out',
                      background: theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
                        : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        background: `linear-gradient(135deg, ${feature.color} 0%, ${lightenColor(feature.color, 20)} 100%)`,
                        color: 'white',
                        boxShadow: `0 4px 6px -1px ${feature.color}40, 0 2px 4px -2px ${feature.color}40`,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 2,
                        fontWeight: 600,
                        color: 'text.primary',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
            : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="md">
          <Card
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              background: theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.8)'
                : 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                mb: 3,
                fontWeight: 700,
              }}
            >
              Ready to Get Started?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                color: 'text.secondary',
              }}
            >
              Join thousands of clients and lawyers who trust LexConnect for their legal needs.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/')}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.1rem',
              }}
            >
              Create Your Account
            </Button>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

// Helper function to lighten colors
const lightenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
};

export default Home;
