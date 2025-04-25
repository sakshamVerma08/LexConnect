// import React, { useState } from 'react';
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   Alert,
//   Link,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import axios from 'axios';

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: ''
//   });
//   const [error, setError] = useState('');

//   const { name, email, password, confirmPassword, role } = formData;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/register",formData);

//       if(response.data.token){
//         localStorage.setItem('token',response.data.token);
//       }

      
//       navigate('/client/dashboard');
//     } catch (err) {
//       setError(err.response.data.message);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper
//         elevation={6}
//         sx={{
//           marginTop: 8,
//           padding: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Box
//           sx={{
//             backgroundColor: 'primary.main',
//             borderRadius: '50%',
//             padding: 1,
//             marginBottom: 2
//           }}
//         >
//           <PersonAddIcon sx={{ color: 'white' }} />
//         </Box>
//         <Typography component="h1" variant="h5">
//           Create Account
//         </Typography>
//         {error && (
//           <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
//             {error}
//           </Alert>
//         )}
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="name"
//             label="Full Name"
//             name="name"
//             autoComplete="name"
//             autoFocus
//             value={name}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             value={email}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             value={password}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="confirmPassword"
//             label="Confirm Password"
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={handleChange}
//           />
//           <FormControl fullWidth margin="normal">
//             <InputLabel id="role-label">Role</InputLabel>
//             <Select
//               labelId="role-label"
//               id="role"
//               name="role"
//               value={role}
//               label="Role"
//               onChange={handleChange}
//               required
//             >
//               <MenuItem value="client">Client</MenuItem>
//               <MenuItem value="lawyer">Lawyer</MenuItem>
//             </Select>
//           </FormControl>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Register
//           </Button>
//           <Box sx={{ textAlign: 'center' }}>
//             <Link href="/login" variant="body2">
//               Already have an account? Sign In
//             </Link>
//           </Box>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default Register;
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { name, email, password, confirmPassword, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role
      });

      if (response.data.token) {
        // Store token and role in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', role);

        // Redirect based on role
        if (role === 'lawyer') {
          navigate('/lawyer/dashboard');
        } else {
          navigate('/client/dashboard');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'primary.main',
            borderRadius: '50%',
            padding: 1,
            marginBottom: 2
          }}
        >
          <PersonAddIcon sx={{ color: 'white' }} />
        </Box>
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            value={email}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={role}
              label="Role"
              onChange={handleChange}
              required
              disabled={loading}
            >
              <MenuItem value="client">Client</MenuItem>
              <MenuItem value="lawyer">Lawyer</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link href="/login" variant="body2">
              Already have an account? Sign In
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
