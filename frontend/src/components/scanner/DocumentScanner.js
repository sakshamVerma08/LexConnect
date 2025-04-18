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
import api from '../../api/axios';
import DashboardLayout from '../layout/DashboardLayout';

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

      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('document', file);

      console.log('Sending file:', file);
      const response = await api.post('/document-scanner/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          console.log('Upload Progress:', Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      });

      setAnalysis(response.data.analysis);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Error processing document';
      console.error('Document analysis error:', errorMessage);
      setError(errorMessage);
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
      {/* Main content area with specific margin to prevent sidebar overlap */}
      <Box 
        component="main" 
        sx={{
          flexGrow: 1,
          marginLeft: { xs: '16px', sm: '24px', md: '240px' }, // Adjust based on your sidebar width
          paddingLeft: { xs: 2, sm: 3, md: 4 },
          paddingRight: { xs: 2, sm: 3, md: 4 },
          paddingTop: 4,
          paddingBottom: 4,
          maxWidth: '100%'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Legal Document Scanner
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Upload your legal document and get an easy-to-understand explanation
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {/* Upload Section */}
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: file ? 'background.paper' : 'grey.50'
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
                    p: 3,
                    minHeight: 300
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
                <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                        height: 250,
                        overflow: 'hidden',
                        borderRadius: 1,
                        mb: 2,
                        border: `1px solid ${theme.palette.divider}`,
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

                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleAnalyze}
                      disabled={loading}
                      startIcon={loading && <CircularProgress size={20} />}
                    >
                      {loading ? 'Analyzing...' : 'Analyze Document'}
                    </Button>
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Analysis Results */}
            <Paper 
              elevation={2}
              sx={{ 
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
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

              {analysis ? (
                <Card variant="outlined" sx={{ flexGrow: 1 }}>
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
                    flexGrow: 1,
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
      </Box>
    </DashboardLayout>
  );
};

export default DocumentScanner;