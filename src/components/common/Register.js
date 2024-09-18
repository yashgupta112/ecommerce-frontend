import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container, MenuItem, Alert } from '@mui/material';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/users/register', { username, password, email, role });
      navigate('/profile'); // Redirect after successful registration
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h4">Register</Typography>
        </Grid>
        <Grid item>
          <form onSubmit={handleRegister}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Role"
                  select
                  fullWidth
                  variant="outlined"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <MenuItem value="CUSTOMER">Customer</MenuItem>
                  <MenuItem value="SELLER">Seller</MenuItem>
                </TextField>
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
