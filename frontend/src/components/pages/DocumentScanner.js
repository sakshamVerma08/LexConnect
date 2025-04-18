import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  Upload as UploadIcon, 
  Camera as CameraIcon,
  RotateLeft as RotateLeftIcon,
  RotateRight as RotateRightIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import Tesseract from 'tesseract.js';

export default function DocumentScanner() {
  const theme = useTheme();
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('eng');
  const [rotation, setRotation] = useState(0);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const workerRef = useRef(null);

  useEffect(() => {
    // Initialize Tesseract worker when component mounts
    const initializeWorker = async () => {
      try {
        workerRef.current = await Tesseract.createWorker();
        await workerRef.current.loadLanguage(language);
        await workerRef.current.initialize(language);
      } catch (err) {
        console.error('Worker initialization error:', err);
        setError('Failed to initialize OCR engine. Please refresh the page.');
      }
    };

    initializeWorker();

    // Cleanup worker when component unmounts
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, [language]);

  const languages = [
    { code: 'eng', name: 'English' },
    { code: 'hin', name: 'Hindi' },
    { code: 'spa', name: 'Spanish' },
    { code: 'fra', name: 'French' },
    { code: 'deu', name: 'German' },
  ];

  const preprocessImage = (imageData) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Apply rotation
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.translate(-canvas.width/2, -canvas.height/2);
        
        // Draw image
        ctx.drawImage(img, 0, 0);
        
        // Apply image processing for better OCR
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Increase contrast
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Convert to grayscale
          const gray = (r + g + b) / 3;
          
          // Increase contrast
          const contrast = 1.5;
          const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
          const newGray = factor * (gray - 128) + 128;
          
          data[i] = data[i + 1] = data[i + 2] = newGray;
        }
        
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = reject;
      img.src = imageData;
    });
  };

  const processImage = async (imageData) => {
    if (!workerRef.current) {
      setError('OCR engine not initialized. Please refresh the page.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Preprocess the image
      const processedImage = await preprocessImage(imageData);

      // Set worker parameters
      await workerRef.current.setParameters({
        tessedit_pageseg_mode: '1',
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?@#$%&*()[]{}:;+\'"-_=<>/\\ ',
        preserve_interword_spaces: '1',
        textord_heavy_nr: '1',
        tessedit_do_invert: '0',
      });

      // Process the image
      const result = await workerRef.current.recognize(processedImage);

      if (!result.data.text.trim()) {
        throw new Error('No text detected. Please try with a clearer image.');
      }

      setText(result.data.text);
    } catch (err) {
      console.error('OCR Error:', err);
      setError('Failed to process image. Please ensure the image is clear and well-lit.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    if (!file.type.match(/image\/(jpeg|png|jpg|bmp|tiff)/)) {
      setError('Please upload an image file (JPEG, PNG, JPG, BMP, or TIFF)');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const img = new Image();
        img.onload = () => {
          if (img.width < 100 || img.height < 100) {
            setError('Image is too small. Please upload a larger image.');
            return;
          }
          setImage(e.target.result);
          processImage(e.target.result);
        };
        img.onerror = () => {
          setError('Error loading image. Please try another file.');
        };
        img.src = e.target.result;
      };
      reader.onerror = () => {
        setError('Error reading file. Please try again.');
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('File upload error:', err);
      setError('Error processing file. Please try again.');
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Error accessing camera: ' + err.message);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.rotate(rotation * Math.PI / 180);
      ctx.translate(-canvas.width/2, -canvas.height/2);
      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setImage(imageData);
      processImage(imageData);
      stopCamera();
    }
  };

  const rotateImage = (degrees) => {
    setRotation(prev => (prev + degrees) % 360);
    if (image) {
      const canvas = document.createElement('canvas');
      const img = new Image();
      img.src = image;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(degrees * Math.PI / 180);
        ctx.translate(-canvas.width/2, -canvas.height/2);
        ctx.drawImage(img, 0, 0);
        const rotatedImage = canvas.toDataURL('image/jpeg', 0.8);
        setImage(rotatedImage);
        processImage(rotatedImage);
      };
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  const clearAll = () => {
    setImage(null);
    setText('');
    setError(null);
    setRotation(0);
    stopCamera();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 4,
        }}
      >
        Document Scanner
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            elevation={3}
            sx={{
              height: '100%',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)'
                : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            }}
          >
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Select Language</InputLabel>
                  <Select
                    value={language}
                    label="Select Language"
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {languages.map((lang) => (
                      <MenuItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<UploadIcon />}
                  sx={{
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                    },
                  }}
                >
                  Upload Document
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                  />
                </Button>

                {!stream ? (
                  <Button
                    variant="contained"
                    startIcon={<CameraIcon />}
                    onClick={startCamera}
                    sx={{
                      background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #388E3C 30%, #66BB6A 90%)',
                      },
                    }}
                  >
                    Open Camera
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<CameraIcon />}
                    onClick={captureImage}
                    sx={{
                      background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #388E3C 30%, #66BB6A 90%)',
                      },
                    }}
                  >
                    Capture Image
                  </Button>
                )}
              </Box>

              {stream && (
                <Box sx={{ mb: 3, position: 'relative' , 'width':'100%',height:'100%',display:'flex', flexDirection:'column'}}>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{
                      width: '100%',
                      maxHeight: '400px',
                      borderRadius: '8px',
                    }}
                  />
                </Box>
              )}

              {image && (
                <Box sx={{ mb: 3, position: 'relative' }}>
                  <img
                    src={image}
                    alt="Uploaded document"
                    style={{
                      width: '100%',
                      maxHeight: '400px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      transform: `rotate(${rotation}deg)`,
                    }}
                  />
                  <Box sx={{ 
                    position: 'absolute', 
                    bottom: 16, 
                    right: 16,
                    display: 'flex',
                    gap: 1,
                    background: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: 2,
                    p: 1,
                  }}>
                    <Tooltip title="Rotate Left">
                      <IconButton onClick={() => rotateImage(-90)} sx={{ color: 'white' }}>
                        <RotateLeftIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Rotate Right">
                      <IconButton onClick={() => rotateImage(90)} sx={{ color: 'white' }}>
                        <RotateRightIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Clear">
                      <IconButton onClick={clearAll} sx={{ color: 'white' }}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              )}

              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                  <CircularProgress />
                </Box>
              )}

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            elevation={3}
            sx={{
              height: '100%',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)'
                : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Extracted Text</Typography>
                {text && (
                  <Tooltip title="Copy to Clipboard">
                    <IconButton onClick={copyToClipboard} color="primary">
                      <CopyIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
              <TextField
                fullWidth
                multiline
                rows={12}
                value={text}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.05)',
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
} 