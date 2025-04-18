import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import LawyerDashboard from './components/dashboard/LawyerDashboard';
import ClientDashboard from './components/dashboard/ClientDashboard';
import LawyerProfile from './components/profile/LawyerProfile';
import CaseList from './components/cases/CaseList';
import CaseDetails from './components/cases/CaseDetails';
import DocumentScanner from './components/scanner/DocumentScanner';
import FindLawyers from './components/pages/FindLawyers';
import LegalChatbot from './components/pages/LegalChatbot';

const AppContent = ({ toggleColorMode }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/';

  return (
    <>
      {!hideNavbar && <Navbar toggleColorMode={toggleColorMode} />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/lawyer/dashboard" element={<LawyerDashboard />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/lawyer/profile/:id" element={<LawyerProfile />} />
        <Route path="/cases" element={<CaseList />} />
        <Route path="/lawyers" element={<FindLawyers />} />
        <Route path="/case/:id" element={<CaseDetails />} />
        <Route path="/document-scanner" element={<DocumentScanner />} />
        <Route path="/legal-chatbot" element={<LegalChatbot toggleColorMode={toggleColorMode} />} />
      </Routes>
    </>
  );
};

function App() {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: {
              default: '#ffffff',
              paper: '#f5f5f5',
            },
            text: {
              primary: '#000000',
              secondary: '#666666',
            },
          }
        : {
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            text: {
              primary: '#ffffff',
              secondary: '#b3b3b3',
            },
          }),
      primary: {
        main: '#2196f3',
        light: '#64b5f6',
        dark: '#1976d2',
      },
      secondary: {
        main: '#f50057',
        light: '#ff4081',
        dark: '#c51162',
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
            color: mode === 'light' ? '#000000' : '#ffffff',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: mode === 'light' ? '#000000' : '#ffffff',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
          contained: {
            color: '#ffffff',
          },
          outlined: {
            color: mode === 'light' ? '#000000' : '#ffffff',
            borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
            '&:hover': {
              borderColor: mode === 'light' ? '#000000' : '#ffffff',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
            color: mode === 'light' ? '#000000' : '#ffffff',
          },
        },
      },
    },
  }), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent toggleColorMode={toggleColorMode} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
