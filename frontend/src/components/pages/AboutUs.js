import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
          : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h2"
              align="center"
              sx={{
                mb: 4,
                fontWeight: 800,
                background: theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)'
                  : 'linear-gradient(135deg, #f8fafc 0%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              About Us
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {/* Introduction */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    background: theme.palette.mode === 'light'
                      ? 'rgba(255, 255, 255, 0.8)'
                      : 'rgba(30, 41, 59, 0.8)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.8,
                      color: 'text.primary',
                    }}
                  >
                    LexConnect was born at the LexHack 1.0 hackathon hosted by Bennett University in April 2025, where our diverse team of programmers and legal expertise came together to build the premier professional networking platform for the legal community.
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 2,
                      fontSize: '1.1rem',
                      lineHeight: 1.8,
                      color: 'text.primary',
                    }}
                  >
                    Our vision was simple but powerful: create a LinkedIn-like platform specifically designed for legal professionals to connect, collaborate, and grow their practices. This vision resonated with the judges, earning us first place at the hackathon.
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>

            {/* Team Section */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    mb: 3,
                    fontWeight: 700,
                    color: 'text.primary',
                  }}
                >
                  Our Team
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { name: 'Nitin Aswal', role: 'Software Developer' },
                    { name: 'Saksham Verma', role: 'Software Developer' },
                    { name: 'Harshit Malik', role: 'Software Developer' },
                    { name: 'Prateek Dubey', role: 'Software Developer' },
                    { name: 'Soumya Gupta', role: 'Legal Consultant' },
                  ].map((member, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          background: theme.palette.mode === 'light'
                            ? 'rgba(255, 255, 255, 0.8)'
                            : 'rgba(30, 41, 59, 0.8)',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                          },
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: 'primary.main',
                          }}
                        >
                          {member.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {member.role}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 4,
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: 'text.primary',
                  }}
                >
                  Our team brings together strong technical expertise with practical legal knowledge. While Nitin, Saksham, Harshit, and Prateek handled the technical architecture and development of the platform, Soumya's legal background provided invaluable insights into the specific needs and challenges of the legal profession.
                </Typography>
              </motion.div>
            </Grid>

            {/* Hackathon Journey */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    mb: 3,
                    fontWeight: 700,
                    color: 'text.primary',
                  }}
                >
                  Our Hackathon Journey
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    background: theme.palette.mode === 'light'
                      ? 'rgba(255, 255, 255, 0.8)'
                      : 'rgba(30, 41, 59, 0.8)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.8,
                      color: 'text.primary',
                    }}
                  >
                    Our journey to create LexConnect unfolded through three challenging rounds at LexHack 1.0:
                  </Typography>
                  <Box component="ul" sx={{ mt: 2, pl: 3 }}>
                    {[
                      'Round 1: Develop the Code (14+ hours) - We worked through the night transforming our concept into a functional prototype. This intensive coding sprint laid the foundation for our platform, creating the core networking features, document analysis system, and AI assistant integration.',
                      'Mentoring Session - During the early morning hours, we received valuable feedback from industry mentors who helped us refine our approach and focus on the most impactful features.',
                      'Round 2: Defend the Code - We presented our technical solution to a panel of judges, explaining our architecture decisions, demonstrating our platform\'s security features, and showcasing how we addressed potential challenges in connecting legal professionals with clients.',
                      'Round 3: Pitch to the Sharks - In the final round, we pitched LexConnect\'s business potential, highlighting how our platform democratizes access to legal services while creating value for legal professionals of all specialties.',
                    ].map((item, index) => (
                      <Typography
                        key={index}
                        component="li"
                        sx={{
                          mb: 2,
                          fontSize: '1.1rem',
                          lineHeight: 1.8,
                          color: 'text.primary',
                        }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 3,
                      fontSize: '1.1rem',
                      lineHeight: 1.8,
                      color: 'text.primary',
                    }}
                  >
                    This perfect synergy of technical skills and industry knowledge allowed us to build a platform that truly addresses the unique networking requirements of lawyers and legal professionals while making legal help accessible to those who need it most.
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 3,
                      fontSize: '1.1rem',
                      lineHeight: 1.8,
                      color: 'text.primary',
                      fontWeight: 600,
                    }}
                  >
                    Join us as we revolutionize networking in the legal industry and bridge the gap between legal professionals and the people they serve!
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs; 