import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lawyer/dashboard" element={<LawyerDashboard />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/lawyer/profile/:id" element={<LawyerProfile />} />
          <Route path="/cases" element={<CaseList />} />
          <Route path="/lawyers" element={<FindLawyers />} />
          <Route path="/case/:id" element={<CaseDetails />} />
          <Route path="/document-scanner" element={<DocumentScanner />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
