import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Send as SendIcon, Brightness4, Brightness7 } from '@mui/icons-material';

const AI_RESPONSE_KEY = 'AIzaSyBswUJc4oun9uKIzC4w0h6AbshdB1KRbXQ';

export default function LegalChatbot({ toggleColorMode }) {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showDisclaimer, setShowDisclaimer] = useState(true);
    const theme = useTheme();
    const navigate = useNavigate();

    const fetchAIResponse = useCallback(async (prompt) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${AI_RESPONSE_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{ 
                                text: `You are a legal AI assistant. Please provide general legal information about: ${prompt}. 
                                Always include a disclaimer that this is not legal advice and users should consult a qualified attorney. 
                                Keep responses clear, concise, and focused on general information only.`
                            }]
                        }]
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Error fetching AI response:', error);
            setError('Failed to get response. Please try again.');
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = inputMessage.trim();
        setInputMessage('');
        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);

        const aiResponse = await fetchAIResponse(userMessage);
        if (aiResponse) {
            setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* App Bar with Theme Toggle */}
            <AppBar position="static" color="default" elevation={1}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Legal AI Assistant
                    </Typography>
                    <IconButton 
                        onClick={toggleColorMode}
                        color="inherit"
                    >
                        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ py: 4 }}>
                {/* Disclaimer Dialog */}
                <Dialog
                    open={showDisclaimer}
                    onClose={() => setShowDisclaimer(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>Important Legal Disclaimer</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1" paragraph>
                            This AI chatbot provides general legal information only and does not constitute legal advice.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            The information provided by this chatbot:
                        </Typography>
                        <ul>
                            <li>Is for general informational purposes only</li>
                            <li>Should not be considered legal advice</li>
                            <li>May not reflect current legal developments</li>
                            <li>Does not create an attorney-client relationship</li>
                        </ul>
                        <Typography variant="body1" paragraph>
                            For specific legal advice, please consult with a qualified attorney in your jurisdiction.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowDisclaimer(false)} color="primary">
                            I Understand
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Chat Interface */}
                <Paper 
                    elevation={3} 
                    sx={{ 
                        height: '70vh', 
                        display: 'flex', 
                        flexDirection: 'column',
                        borderRadius: 2,
                        overflow: 'hidden',
                    }}
                >
                    {/* Messages Area */}
                    <Box 
                        sx={{ 
                            flex: 1, 
                            overflowY: 'auto', 
                            p: 2,
                            background: theme.palette.mode === 'light' 
                                ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
                                : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                        }}
                    >
                        {messages.map((message, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                    mb: 2,
                                }}
                            >
                                <Paper
                                    elevation={1}
                                    sx={{
                                        p: 2,
                                        maxWidth: '70%',
                                        borderRadius: 2,
                                        background: message.sender === 'user'
                                            ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                                            : theme.palette.background.paper,
                                        color: message.sender === 'user' ? 'white' : 'text.primary',
                                    }}
                                >
                                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                        {message.text}
                                    </Typography>
                                </Paper>
                            </Box>
                        ))}
                        {isLoading && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                                <Paper
                                    elevation={1}
                                    sx={{
                                        p: 2,
                                        maxWidth: '70%',
                                        borderRadius: 2,
                                    }}
                                >
                                    <CircularProgress size={20} />
                                </Paper>
                            </Box>
                        )}
                    </Box>

                    {/* Input Area */}
                    <Box 
                        sx={{ 
                            p: 2, 
                            borderTop: 1, 
                            borderColor: 'divider',
                            background: theme.palette.background.paper,
                        }}
                    >
                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Ask a legal question..."
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                                multiline
                                maxRows={4}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    },
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleSendMessage}
                                disabled={isLoading || !inputMessage.trim()}
                                sx={{
                                    minWidth: 'auto',
                                    px: 2,
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                    },
                                }}
                            >
                                <SendIcon />
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
} 