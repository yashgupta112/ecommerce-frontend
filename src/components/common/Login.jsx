import React, { useState } from 'react';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useUser } from '../../contexts/UserContext';
import BackgroundContainer from '../parts/BackgroundContainer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      login({ username, password }); // Update context
      navigate('/profile'); // Navigate to profile after successful login
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <BackgroundContainer>
      <Container maxWidth="xs">
        <Box sx={{}} maxWidth="xs">
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
          <Typography variant="subtitle1" sx={{ textAlign: 'center', mt: 3 }}>
            Don't have an account?
          </Typography>
          <Box textAlign='center'>
            <Button type="button" variant="contained" color="error" component={Link} to='/register'>
              Register now
            </Button>
          </Box>
        </Box>
      </Container>
    </BackgroundContainer>
  );
};

export default Login;
