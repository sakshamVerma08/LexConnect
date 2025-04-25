import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  IconButton,
  useTheme,
  Grid
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import { analyzeDocument } from '../../api/documentScanner';
import DashboardLayout from '../layout/DashboardLayout';
import logger from '../../utils/logger';

const DocumentScanner = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size should not exceed 5MB');
        return;
      }

      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Only PDF, JPEG, and PNG files are allowed');
        return;
      }

      setFile(selectedFile);
      setError(null);
      setAnalysis(null);

      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a document first');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setAnalysis(null);

      const result = await analyzeDocument(file);
      
      if (result.analysis) {
        setAnalysis(result.analysis);
      } else {
        throw new Error('No analysis was generated');
      }
    } catch (err) {
      logger.error('Document analysis error:', err);
      setError(err.message || 'Error analyzing document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setAnalysis(null);
    setError(null);
  };

  return (
    <DashboardLayout>
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 4, 
          px: { xs: 2, sm: 3, md: 4 },
          ml: { md: '240px' },
          width: { md: 'calc(100% - 240px)' }
        }}
      >
        <Box sx={{ 
          textAlign: 'center', 
          mb: 6,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -16,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '4px',
            background: 'linear-gradient(90deg, #2196F3, #21CBF3)',
            borderRadius: '2px'
          }
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Legal Document Scanner
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Upload your legal document and get an easy-to-understand explanation of its contents
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: 400,
                backgroundColor: file ? 'background.paper' : 'grey.50',
                boxShadow: theme.shadows[3],
                borderRadius: 2,
                ml: { md: 4 }
              }}
            >
              {!file ? (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed',
                    borderColor: 'grey.300',
                    borderRadius: 1,
                    p: 3
                  }}
                >
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="document-upload"
                  />
                  <label htmlFor="document-upload">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                      size="large"
                    >
                      Upload Document
                    </Button>
                  </label>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Supports PDF, JPEG, and PNG (max 5MB)
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {file.type === 'application/pdf' ? (
                        <PictureAsPdfIcon color="primary" sx={{ mr: 1 }} />
                      ) : (
                        <ImageIcon color="primary" sx={{ mr: 1 }} />
                      )}
                      <Typography noWrap sx={{ maxWidth: 200 }}>
                        {file.name}
                      </Typography>
                    </Box>
                    <IconButton onClick={handleClear} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>

                  {preview && (
                    <Box
                      sx={{
                        width: '100%',
                        height: 300,
                        overflow: 'hidden',
                        borderRadius: 1,
                        mb: 2
                      }}
                    >
                      <img
                        src={preview}
                        alt="Document preview"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </Box>
                  )}

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleAnalyze}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                  >
                    {loading ? 'Analyzing...' : 'Analyze Document'}
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper 
              sx={{ 
                p: 3, 
                minHeight: 400,
                boxShadow: theme.shadows[3],
                borderRadius: 2,
                mr: { md: 4 }
              }}
            >
              <Typography variant="h6" gutterBottom>
                Analysis Results
              </Typography>
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {loading ? (
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CircularProgress />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Analyzing document... This may take a few moments
                  </Typography>
                </Box>
              ) : analysis ? (
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Simple Explanation
                    </Typography>
                    <Typography paragraph>
                      {analysis}
                    </Typography>
                  </CardContent>
                </Card>
              ) : (
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography color="text.secondary">
                    Upload a document to see the analysis
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};

export default DocumentScanner;

