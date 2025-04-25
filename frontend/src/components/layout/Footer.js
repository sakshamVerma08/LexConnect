import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
  Divider,
  Paper,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { motion } from 'framer-motion';

const Footer = () => {
  const theme = useTheme();

  const teamMembers = [
    {
      name: "Nitin Aswal",
      email: "nitinaswal2002@gmail.com",
      linkedin: "https://www.linkedin.com/in/nitin-aswal-62a32b250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Saksham Verma",
      email: "sakshamverma1000@gmail.com",
      linkedin: "https://www.linkedin.com/in/sakshamverma08?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Prateek Dubey",
      email: "prateekdubey2663@gmail.com",
      linkedin: "https://www.linkedin.com/in/prateek-dubey-14b26b217?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Harshit Malik",
      email: "harshitmalik29@gmail.com",
      linkedin: "https://www.linkedin.com/in/harshitmalik22?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Soumya Gupta",
      email: "soumya.gupta@example.com",
      linkedin: "https://linkedin.com/in/soumya-gupta",
    },
  ];

  return (
    <Paper
      component="footer"
      elevation={0}
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
          : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderTop: `1px solid ${theme.palette.divider}`,
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
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4}>
            {/* Contact Us Section */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 700,
                    color: 'text.primary',
                  }}
                >
                  Contact Us
                </Typography>
                <Grid container spacing={2}>
                  {teamMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          background: theme.palette.mode === 'light'
                            ? 'rgba(255, 255, 255, 0.8)'
                            : 'rgba(30, 41, 59, 0.8)',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          },
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            mb: 1,
                            color: 'primary.main',
                          }}
                        >
                          {member.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            component="a"
                            href={`mailto:${member.email}`}
                            size="small"
                            sx={{
                              color: theme.palette.primary.main,
                              '&:hover': { transform: 'scale(1.1)' },
                            }}
                          >
                            <EmailIcon fontSize="small" />
                          </IconButton>
                          <Typography variant="caption" color="text.secondary">
                            {member.email}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <IconButton
                            component="a"
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            sx={{
                              color: theme.palette.primary.main,
                              '&:hover': { transform: 'scale(1.1)' },
                            }}
                          >
                            <LinkedInIcon fontSize="small" />
                          </IconButton>
                          <Typography variant="caption" color="text.secondary">
                            LinkedIn
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Grid>

            {/* Quick Links Section */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 700,
                    color: 'text.primary',
                  }}
                >
                  Quick Links
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { text: 'Privacy Policy', href: '/privacy-policy' },
                    { text: 'Terms of Service', href: '/terms' },
                    { text: 'FAQ', href: '/faq' },
                  ].map((link, index) => (
                    <Grid item xs={6} key={index}>
                      <Link
                        href={link.href}
                        sx={{
                          display: 'block',
                          p: 2,
                          borderRadius: 2,
                          background: theme.palette.mode === 'light'
                            ? 'rgba(255, 255, 255, 0.8)'
                            : 'rgba(30, 41, 59, 0.8)',
                          backdropFilter: 'blur(10px)',
                          color: 'text.secondary',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateX(4px)',
                            color: 'primary.main',
                            background: theme.palette.mode === 'light'
                              ? 'rgba(255, 255, 255, 0.9)'
                              : 'rgba(30, 41, 59, 0.9)',
                          },
                        }}
                      >
                        {link.text}
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Grid>
          </Grid>

          {/* Copyright Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Divider sx={{ my: 3 }} />
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{
                fontSize: '0.8rem',
                opacity: 0.8,
              }}
            >
              © {new Date().getFullYear()} LexConnect. All rights reserved.
            </Typography>
          </motion.div>
        </Box>
      </Container>
    </Paper>
  );
};

export default Footer; 